---
title: "Designing a URL Shortener"
description: "A deep dive into building a production-grade URL shortening service — from hashing strategies and DB schema to caching layers and horizontal scaling."
pubDate: 2026-05-06
tags: ["Distributed Systems", "Caching", "Databases", "Scalability"]
difficulty: "Medium"
draft: false
---

A URL shortener converts a long URL into a compact alias (e.g. `https://bit.ly/3xK9m2`). Simple on the surface — but building one that handles billions of redirects with sub-10ms latency exposes almost every core distributed systems concept.

## Requirements

### Functional
- Given a long URL, generate a unique short code
- Redirect `short.ly/<code>` to the original URL
- Optional: custom aliases, expiry dates, click analytics

### Non-Functional
- **Read-heavy**: 100:1 read-to-write ratio is typical
- **Low latency**: redirects must be fast (< 10ms P99)
- **High availability**: 99.99% uptime
- **Durability**: no data loss; shortened links must be permanent unless explicitly expired

## Capacity Estimation

Assuming 100M new URLs/day and 10B redirects/day:

| Metric | Value |
|--------|-------|
| Write RPS | ~1,200 |
| Read RPS | ~115,000 |
| Storage (5 yr, 500 bytes/row) | ~90 TB |
| Cache (20% hot URLs) | ~170 GB |

The 100:1 read-to-write ratio drives the architecture heavily toward caching.

## API Design

```http
POST /api/shorten
Content-Type: application/json
{ "url": "https://example.com/very/long/path", "alias": "my-link", "ttl_days": 30 }

→ 201 Created
{ "short_url": "https://short.ly/abc123", "code": "abc123" }
```

```http
GET /:code
→ 301 Moved Permanently  (or 302 for analytics tracking)
Location: https://example.com/very/long/path
```

Use **301** for permanent redirects (browser-cached, fewer server hits). Use **302** when you need to log every click server-side.

## Database Schema

```sql
CREATE TABLE urls (
  id          BIGSERIAL PRIMARY KEY,
  code        VARCHAR(8)   NOT NULL UNIQUE,
  original    TEXT         NOT NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ,
  user_id     BIGINT       REFERENCES users(id)
);

CREATE INDEX idx_urls_code ON urls (code);
```

`code` is the only lookup key. Keep it `VARCHAR(8)` — that gives 62⁸ ≈ 218 trillion combinations with `[a-zA-Z0-9]`.

## Core Algorithm: Short Code Generation

### Option A — Base62 Counter

Auto-increment a global ID, then Base62-encode it.

```python
CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

def encode(n: int) -> str:
    result = []
    while n:
        result.append(CHARS[n % 62])
        n //= 62
    return "".join(reversed(result)) or CHARS[0]
```

**Pros**: no collisions, predictable, simple.  
**Cons**: sequential codes are guessable (`abc001`, `abc002`...).

### Option B — Hash + Truncate

SHA-256 the URL, take the first 7 characters.

```python
import hashlib, base64

def shorten(url: str) -> str:
    digest = hashlib.sha256(url.encode()).digest()
    return base64.urlsafe_b64encode(digest)[:7].decode()
```

**Pros**: non-sequential.  
**Cons**: collision probability rises at scale (~1% after 3.5B URLs with 7-char codes). Needs a collision-retry loop.

### Option C — Pre-generated Pool (Recommended)

A background job pre-generates millions of random codes and stores them in a `code_pool` table. The write path atomically claims one.

```sql
CREATE TABLE code_pool (
  code     VARCHAR(8) PRIMARY KEY,
  claimed  BOOLEAN NOT NULL DEFAULT false
);
```

```python
# Atomic claim using SELECT FOR UPDATE SKIP LOCKED
def claim_code(conn) -> str:
    with conn.transaction():
        row = conn.execute("""
            SELECT code FROM code_pool
            WHERE claimed = false
            LIMIT 1
            FOR UPDATE SKIP LOCKED
        """).fetchone()
        conn.execute(
            "UPDATE code_pool SET claimed = true WHERE code = %s",
            [row["code"]]
        )
        return row["code"]
```

**Pros**: zero collision risk, O(1) write path, no coordination between app servers.  
**Cons**: pool must be replenished; adds operational complexity.

## High-Level Architecture

```
Client
  │
  ▼
Load Balancer (Nginx / AWS ALB)
  │
  ├──▶ Write Service  ──▶  PostgreSQL (primary)
  │
  └──▶ Read Service   ──▶  Redis Cache
                            │  miss
                            ▼
                        PostgreSQL (read replica)
```

**Write Service**: validates URL, claims code from pool, writes to Postgres.

**Read Service**: checks Redis first. On miss, queries the read replica, warms the cache, issues the redirect. The hottest 20% of URLs absorb ~80% of traffic once cached (Zipf distribution).

## Caching Strategy

Cache key: `url:<code>` → original URL string.

```
Cache-Aside (Lazy Loading)
  1. Read:  check Redis → miss → query DB → SET url:<code> <url> EX 86400
  2. Write: INSERT to DB → no pre-warming (lazy loading is fine given read skew)
  3. Expiry: short TTL for overridable aliases; no TTL for permanent links
```

At 170 GB for 20% of URLs, use a **Redis Cluster** with consistent hashing. Eviction policy: `allkeys-lru`.

## Scaling Considerations

### Database
- **Read replicas** handle the 100:1 read load — writes go to primary only
- **Sharding** by `code` hash once a single Postgres instance saturates write throughput
- **PgBouncer** for connection pooling in front of all app servers

### Application
- Stateless write and read services → horizontal scale behind the load balancer
- Rate-limit write endpoint per IP using a token bucket stored in Redis

### Analytics
Separate analytics entirely from the redirect path. Emit a click event to **Kafka** on each `GET`; a consumer aggregates into a **ClickHouse** time-series table. Never let analytics slow down a redirect.

```
Read Service
  │
  ├──▶ Redis (cache hit → redirect immediately)
  │
  └──▶ Kafka producer (fire-and-forget click event)
           │
           ▼
       Kafka Consumer
           │
           ▼
       ClickHouse (analytics aggregation)
```

## Trade-offs & Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Redirect type | 302 (temporary) | Preserves server-side click counts |
| Code generation | Pre-generated pool | Zero collision, no inter-service coordination |
| Cache eviction | LRU | URL access is heavily Zipf-distributed |
| Analytics path | Async via Kafka | Keeps P99 redirect latency low |
| Primary database | PostgreSQL | ACID guarantees for code uniqueness; simpler ops than Cassandra at this scale |

---

Designing for 10B redirects/day sounds intimidating, but the architecture is mostly cache + read replicas. The real complexity is in code generation strategy and keeping analytics out of the hot redirect path.
