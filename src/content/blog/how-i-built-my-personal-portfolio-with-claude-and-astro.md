---
title: "How I built my personal portfolio with Claude and Astro"
description: "I had zero frontend experience and a full-time job. Here is how I shipped a complete portfolio site in a few evenings using Claude as my pair programmer and Astro as the framework."
pubDate: 2026-04-22
tags: ["Building in Public", "Astro", "AI Tools", "Career"]
draft: false
---

I'll be honest with you.

I'm a backend engineer. Python, Django, PostgreSQL — that's my world.
CSS has always felt like a foreign language I never quite learned.
Every time I tried to build a personal website, I'd spend three hours
fighting flexbox, get frustrated, and close the laptop.

This time was different.

---

## Why I finally did it

I'd been putting off having a personal website for years. I had a
LinkedIn profile. I had GitHub. That felt like enough.

Then I got rejected from a job interview.

Not because my skills were weak — I've been building production Django
systems for 7 years. But because nobody could see any of it. My GitHub
had three open source libraries that solved real production problems.
My LinkedIn had metrics. But there was no single place that told the
story of what I actually do and why it matters.

That rejection was the push I needed.

---

## Why Astro

I didn't spend a week researching frameworks. I asked Claude what
the simplest way to build a fast static portfolio with a blog was,
and it said Astro without hesitation.

Turns out that was the right call. Astro is genuinely designed for
exactly this — content-heavy sites that need to be fast and simple.
No backend. No database. Just files that build into static HTML.

The blog template gave me routing, markdown support, and RSS out of
the box. I had something running on localhost in about ten minutes.

If you want to try it yourself: [astro.build](https://astro.build)

---

## How Claude actually helped

Here's the thing people don't tell you about using AI to build
something: it's not magic. You still have to know what you want.
You still have to make decisions. You still have to debug.

What Claude changed is the cost of those decisions.

Before, if I wanted to add a dark mode toggle, I'd spend an hour
reading MDN docs and Stack Overflow threads. With Claude I described
what I wanted, got working code, and moved on. The decision cost
five minutes instead of sixty.

We built the whole site file by file. I'd describe a page, Claude
would write it, I'd paste it in, check localhost, and either say
"looks good, next" or "the footer is invisible on mobile, fix it."

That loop — describe, build, check, fix — is genuinely how the
whole site came together.

---

## What the site actually contains

The final site has six pages:

**Home** — hero with a typewriter effect cycling through what I do,
a skills section, featured projects, and latest writing.

**Projects** — four things I've built. Three open source Django
libraries on PyPI and [Session Bridge AI](https://marketplace.visualstudio.com/items?itemName=RajatJog.session-bridge-ai),
a VS Code extension I shipped recently. Each project card has a
"why it exists" tagline — not what it does, but why I built it.
That framing makes a bigger difference than I expected.

**Blog** — where this post lives. Markdown files that Astro turns
into pages automatically. Adding a new post is just creating a
new `.md` file.

**Now** — a [/now page](https://nownownow.com/about) showing what
I'm currently focused on. Updated monthly. Stolen shamelessly
from Derek Sivers.

**About** — full experience timeline, certifications, and what
I'm looking for.

**Contact** — no contact form. Just links. Email, LinkedIn, GitHub,
PyPI. Clean and direct.

---

## The parts that were still hard

I want to be real about this because most "I built X with AI"
posts make it sound effortless.

Copy-pasting code from Claude into VS Code sometimes corrupted
HTML tags. Opening `<a` tags would go missing, leaving just the
attributes floating in the file. Astro would throw cryptic esbuild
errors pointing at a character position that made no sense until I
realised the tag was simply missing. The fix was to type the tag
manually instead of copy-pasting. Small thing, took longer than
it should have to figure out.

Dark mode was more involved than expected. CSS variables worked
fine but the toggle persistence across pages required JavaScript
that runs before the page renders to avoid a flash of the wrong
theme. The kind of thing that takes longer than you expect.

Deployment to GitHub Pages had one gotcha: Astro needs a `base`
path configured when it's not deployed to a root domain. Every
internal link needs that prefix or the site breaks in production
while working perfectly on localhost. Found this out the hard way
after the first deployment showed a completely broken navigation.

None of these were blockers. All of them were just the normal
friction of building something.

---

## The stack if you want to copy it

- **[Astro](https://astro.build)** — framework, blog template as starting point
- **Tailwind CSS** — via `@tailwindcss/vite` (Astro 6 changed how this works,
  [see this if you hit peer dependency errors](https://github.com/RJ-Gamer/rajatjog-website))
- **GitHub Pages** — free hosting, deploys automatically on every push
- **GitHub Actions** — the deploy workflow, about 30 lines of YAML

The whole repo is public:
[github.com/RJ-Gamer/rajatjog-website](https://github.com/RJ-Gamer/rajatjog-website)

If you're a backend engineer who has been putting off building a
personal site — fork it. Replace the content. Ship it. The hardest
part is starting.

---

## What surprised me

The site took maybe five evenings spread across two weeks.

That's less time than I've spent on some individual debugging
sessions. And the result is something I actually want to share —
a real URL with my name on it that shows what I build and how I
think.

The other thing that surprised me: having a website changed how
I write on LinkedIn. When every post can link back to a longer
version on the blog, writing gets easier. The post becomes a teaser.
The blog is where the full thinking lives.

I wrote about two other things I shipped recently — both link back
here now:

- [Why I stopped using Django signals for audit logging](/blog/why-i-built-django-system-audit)
- [Session Bridge AI — a VS Code extension for preserving AI context](/blog/session-bridge-ai-vscode-extension)

---

## One thing I'd do differently

I'd set up the GitHub Actions deploy workflow before writing a
single line of the actual site. I spent time tweaking things
locally that looked completely different in production because
of the base path issue. Deploy first, build second. You catch
environment differences immediately instead of at the end.

---

The site is live at
[project-4ir8l.vercel.app](https://project-4ir8l.vercel.app).

If you're building something similar — or if you're a backend
engineer who has been avoiding frontend for years — I'd genuinely
like to hear about it.
