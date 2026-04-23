---
title: "I spent a day turning a frustration into a shipped VS Code extension"
description: "How Session Bridge AI grew from a simple context-saving tool into something with a full token dashboard — and what I learned building it in one long session."
pubDate: 2026-04-23
tags: ["Building in Public", "VS Code", "AI Tools", "Open Source"]
draft: false
---

I want to tell you about a specific feeling.

You're deep in a coding session. You've spent 20 minutes explaining your entire codebase to Claude Code — the architecture, the bug, what you've already tried. The AI finally gets it. You're in flow. Real progress is happening.

Then credits run out. Not a warning. Not a graceful exit. Just — nothing. Mid-sentence.

You open Gemini. And you stare at a blank chat box knowing you have to explain everything again. From scratch. Every single time.

I hit this wall so many times I stopped counting. At some point I got frustrated enough to do something about it. That something turned into [Session Bridge AI](https://marketplace.visualstudio.com/items?itemName=RajatJog.session-bridge-ai) — a VS Code extension that maintains a running `SESSION.md` in your project so any AI tool can pick up exactly where the last one left off.

I shipped the first version last week. Today I shipped v0.5.0. Here's what's in it and what I learned building it.

---

## What the extension actually does

The core is simple. Every time you save context, Session Bridge captures your git diff, your currently open files, and whatever progress notes you've typed. It sends all of that to your AI provider — Gemini, Claude, or OpenAI — and generates a structured handoff document.

When your current AI tool dies, you open `SESSION.md`, paste it into the next tool, and continue. No re-explaining. No starting over.

One thing I added in this version that turned out to be surprisingly useful: the AI now analyzes your task and recommends which model to use. Haiku for simple things, Sonnet for standard development work, Opus for genuinely complex architecture problems. Small thing. Saves a surprising amount of mental overhead when you're not sure which model to reach for.

---

## The thing I'm most proud of

Somewhere in the middle of building this, I was debugging something unrelated and stumbled onto something interesting. Claude Code writes detailed JSONL telemetry logs to `~/.claude/projects/` on your local machine. Every session, every turn, every token — all logged locally. Nobody told me this. I just found it while poking around.

So I built a token dashboard that reads those files.

Open it with `Ctrl+Shift+P → Session Bridge: Open Token Dashboard` and you get a full breakdown — total tokens burned in the last 30 days, which projects are eating your budget, which models you're actually using, daily usage over time, and estimated cost in real dollars.

When I loaded it on my own machine for the first time I saw 6.48 million tokens burned in 30 days across 868 turns. Estimated cost: $33.61.

I knew I was using Claude a lot. I didn't know it was *that* much. And more importantly I could see exactly which projects were responsible. One project alone accounted for over half my total usage. That's the kind of information that actually changes how you work.

---

## A few smaller things that shipped today

Keyboard shortcuts for the most-used commands. Before this you had to open the command palette every time which sounds minor but the friction adds up across a whole day. `Ctrl+Alt+L` to log progress, `Ctrl+Alt+S` to save context, `Ctrl+Alt+N` to copy the handoff prompt to clipboard.

A proper onboarding screen for new installs. The first version showed people nothing after they installed it. No indication of what to do next. That's a bad first impression and I should have caught it earlier.

A peak hour warning. Claude's rolling 5-hour usage window drains faster during peak server hours — roughly 8am to 2pm Eastern. The extension now nudges you to save context early when you're working during those hours so you're not caught off guard mid-session.

Custom pricing overrides in settings so the cost estimates don't go stale as Anthropic adjusts rates.

---

## What surprised me during this build

The hardest bug was the most embarrassing. After shipping the first version, the extension completely failed to activate for anyone who installed it. The error was `Cannot find module 'axios'`. My local environment had it in `node_modules` but the published package didn't include it because of `.vscodeignore`. The fix was switching from `tsc` to `esbuild` for bundling — which compiles everything into a single file with no external dependencies. Obvious in hindsight. Painful in the moment.

The other thing: I had no idea how much data Claude Code was logging locally. Every tool you use is probably doing something similar. It's worth periodically checking what your tools are writing to disk — both for privacy reasons and because sometimes there's genuinely useful data sitting right there.

And the irony never gets old. I used Claude Code to build an extension that helps you survive Claude Code running out of credits. Claude ran out of credits twice during development. Both times, Session Bridge saved my context and let me continue in Gemini without losing more than a few messages. The tool worked while I was building it.

---

## What's next

Automatic chat interception — no manual logging, the extension reads AI tool output directly. Team sharing via git for collaborative sessions. Budget alerts before you hit a limit. A weekly digest of your AI usage patterns.

The token dashboard in particular feels like it could grow into something much bigger. Most developers I've talked to have no idea how many tokens they're burning or what it's actually costing them. There's a real product in giving people that visibility.

---

If you've ever lost your AI context mid-session, [install it](https://marketplace.visualstudio.com/items?itemName=RajatJog.session-bridge-ai). Setup takes two minutes — install the extension, grab a free Gemini API key from Google AI Studio, done.

The [GitHub repo](https://github.com/RJ-Gamer/session-bridge-ai) is public and PRs are welcome. And if it saves you time, a star means a lot.