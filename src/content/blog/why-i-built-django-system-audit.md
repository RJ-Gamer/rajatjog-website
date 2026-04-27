---
title: "Why I built django-system-audit"
description: "Signal-based audit logging is architecturally broken for compliance systems. Here is what I built instead."
pubDate: 2026-04-20
tags: ["Django", "Open Source", "System Design"]
draft: false
---

Most Django audit libraries rely heavily on signals.

Signals are great for detecting that something happened. But they struggle to answer a more important question: **why did it happen?**

While working on compliance-heavy systems — regulated platforms with strict audit requirements, fintech systems with SOC2 obligations — this caused real problems:

- Duplicate audit logs from multiple signals firing on the same event
- Confusing actor attribution — was this the API, the Admin panel, or a background job?
- Missing request context like IP address or endpoint
- Audit trails that were hard to trust when debugging incidents

The question that kept coming up during compliance reviews: *"Who did this, from where, and why?"* Signals couldn't answer it.

## The core architectural problem

Signals capture **effects**. When you save a model, a signal fires. But the signal doesn't know what triggered the save — it just knows the save happened.

This means:

```python
# A signal-based audit logger sees this:
# "Order #1234 was updated"

# What compliance actually needs:
# "Order #1234 was updated by user@example.com
#  via PUT /api/orders/1234/
#  from IP 192.168.1.1
#  because the payment status changed"
```

The difference isn't cosmetic. In a compliance audit, "the record was updated" is useless. "The record was updated by this actor, through this interface, with this context" is what makes an audit trail legally defensible.

## What I built instead

`django-system-audit` takes a different approach: **explicit, intent-aware logging**.

Instead of relying on signals, views and admin actions record audit events directly through a central service:

```python
from system_audit import audit


class OrderViewSet(viewsets.ModelViewSet):
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)

        audit.log(
            actor=request.user,
            action="order.updated",
            target=self.get_object(),
            context={"ip": request.META.get("REMOTE_ADDR")},
        )

        return response
```

Signals still exist as a fallback — but they are no longer the primary mechanism. Views capture intent. Signals catch what slips through.

## The result

Cleaner audit trails. Correct actor attribution. Full request context. And when a compliance team asks "who changed this record and why" — you have an actual answer.

The library is on PyPI:

```bash
pip install django-system-audit
```

GitHub: [django-system-audit](https://github.com/RJ-Gamer/django-system-audit)

If you are building in fintech, SaaS, or any compliance-sensitive domain — I would love to hear how you handle audit logging and whether this approach resonates.
