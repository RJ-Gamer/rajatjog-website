---
title: "From Zero to Production: Everything We Shipped in Session Bridge AI"
description: "Every time I switched AI tools mid-session, I lost all context. So I built Session Bridge AI — a VS Code extension that maintains a live SESSION.md your next AI tool can pick up instantly."
pubDate: 2026-04-29
tags: ["Building in Public", "VSCode", "AI Tools"]
draft: false
---

I've been quietly shipping updates to Session Bridge AI over the past few days. What started as a simple "save my AI context" VS Code extension has grown into something I genuinely use every day. This post covers everything that's shipped since the initial release — what we built, why we built it, and what broke along the way.

If you haven't heard of Session Bridge AI — the short version is this: it solves the problem of losing your AI coding context when Claude, Gemini, or any other tool runs out of credits mid-session. It maintains a `SESSION.md` in your project and generates a structured handoff document you can paste into any AI tool to continue exactly where you left off.

Here's everything that's changed since v0.1.0.

---

## The Bug That Broke Everything (v0.4.1)

Before I talk about features, I need to talk about the most embarrassing bug we shipped.

After the initial release, the extension worked perfectly in development. Press F5, run commands, everything works. But every user who installed it from the Marketplace got this:

```
Command 'Session Bridge: Set AI Provider & API Key' resulted in an error
command 'session-bridge.setApiKey' not found
```

Silent activation failure. No error message. No warning. Commands that simply didn't exist.

The root cause was `axios`. Our extension uses axios for API calls to Gemini, Claude, and OpenAI. In development, axios lives in `node_modules`. But published VS Code extensions don't include `node_modules` — they're not packaged. So the extension would load, try to require axios, fail silently, and never finish activating.

The fix was switching from TypeScript's `tsc` compiler to `esbuild` for bundling:

```javascript
esbuild.build({
  entryPoints: ['src/extension.ts'],
  bundle: true,
  outfile: 'out/extension.js',
  external: ['vscode'],
  format: 'cjs',
  platform: 'node',
});
```

This compiles everything — including all dependencies — into a single 479KB file. No external dependencies at runtime. The extension now activates on Windows, Mac, and Ubuntu without issues.

**Lesson learned:** Always test by installing the actual `.vsix` file before publishing. The F5 development workflow doesn't catch packaging bugs.

---

## Multi-Provider Support (v0.1.0)

The original extension only supported Gemini. That was fine for me — I use Gemini's free tier for summarization. But not everyone wants to use Gemini, and the whole point of Session Bridge is to work across tools.

We added full support for Claude and OpenAI alongside Gemini. Each provider has its own secure API key stored in VS Code's secret storage — never in plaintext, never in `settings.json`.

The provider selection is a quick pick:

```
Ctrl+Shift+P → Session Bridge: Set AI Provider & API Key
```

You pick Gemini, Claude, or OpenAI, paste your key, and the extension remembers it securely. Switching providers is the same command.

| Provider | Free Tier | Best For |
|----------|-----------|----------|
| Gemini | ✅ Yes | Daily use, no cost |
| Claude | ❌ Credits needed | Best summarization quality |
| OpenAI | ❌ Credits needed | Alternative to Claude |

---

## Automatic Code Context (v0.1.0)

The original SESSION.md was shallow — it only contained what you manually typed. That was better than nothing but missed the point. The most valuable context isn't what you *say* you're doing, it's what your code *shows* you're doing.

We added two automatic captures:

**Git diff** — every save includes your recent code changes:

```typescript
const diff = cp.execSync('git diff HEAD -- .', {
  cwd: workspacePath,
  timeout: 5000
}).toString().trim();
```

**Open files** — the extension reads the first 50 lines of every file you currently have open in your editor, along with the filename, language, and line count.

Combined, this means SESSION.md now tells the next AI tool not just "I'm working on auth" but exactly what changed in `authenticate.ts` and what `routes/login.ts` currently looks like.

---

## One-Click Session Handoff (v0.2.0)

The original workflow required you to manually open SESSION.md, select all, copy, and paste. Four steps when you're already frustrated from losing credits.

`Start New Session` reduces this to one keystroke:

```
Ctrl+Alt+N
```

It reads SESSION.md, wraps it in a structured handoff prompt, and copies everything to clipboard. The prompt looks like this:

```
I'm continuing a coding session. Here is my full context from my 
previous AI session. Please read it carefully and confirm you 
understand before I give you the next instruction.

[SESSION.md contents]

Please acknowledge you've read this and tell me:
1. What problem I was solving
2. What has already been completed  
3. What the immediate next step is

Then wait for my instruction.
```

That last part — asking the AI to confirm understanding before proceeding — turned out to be more important than I expected. Without it, AI tools tend to jump straight into generating code based on incomplete understanding. With it, you get a proper briefing acknowledgment before continuing.

---

## Token Dashboard (v0.3.0 → v0.4.0)

This one surprised me.

While debugging something else, I discovered that Claude Code writes detailed JSONL telemetry logs to `~/.claude/projects/` on your local machine. Every session, every turn, every token — all logged locally. The structure looks like this:

```json
{
  "type": "assistant",
  "message": {
    "model": "claude-sonnet-4-6",
    "usage": {
      "input_tokens": 3,
      "cache_creation_input_tokens": 5529,
      "cache_read_input_tokens": 21380,
      "output_tokens": 1581
    }
  },
  "timestamp": "2026-04-10T08:39:55.413Z",
  "cwd": "d:\\DSA"
}
```

So I built a dashboard that reads those files.

Open it with `Ctrl+Shift+P → Session Bridge: Open Token Dashboard` and you see your actual token usage — by project, by model, by day — with estimated costs.

When I first loaded it on my own machine: **9.30 million tokens in 30 days. $52.89.**

I had no idea. The `rajatjog-website` project alone had burned 3.29 million tokens at $22.90. That's a website repo. That's a lot of AI conversation about CSS.

The dashboard went through several iterations:

**v0.3.0** — Basic working version. Synchronous file reading — froze VS Code on large files (some of mine were 47MB).

**v0.4.0** — Production grade. Async reading using `setImmediate` to yield between project directories. `CLAUDE_CONFIG_DIR` environment variable support for custom installations. Proper error states when Claude Code isn't installed. Refresh button. Date range selector (7/14/30/60/90 days). Fixed cache read token billing — it's 10% of input rate, not free.

The date range selector alone changed how I use the dashboard. Switching to "Last 7 days" gives you a much clearer picture of current burn rate than the 30-day default.

---

## Model Recommendation (v0.5.0)

Every time you save context, SESSION.md now includes a model recommendation:

```markdown
## Recommended Model
Claude Sonnet — standard development task involving multiple
files and API design. Haiku would suffice for simple edits.
```

The AI analyzes your task complexity and recommends Haiku (simple edits, quick questions), Sonnet (standard development), or Opus (complex architecture, hard bugs). It explains why in one sentence.

This is more useful than it sounds. After a long session, it's easy to forget that you were doing something simple enough for Haiku. The recommendation prevents the habit of defaulting to the most expensive model for everything.

---

## Keyboard Shortcuts + Onboarding (v0.5.0)

Two polish items that made a real difference.

**Keyboard shortcuts:**
```
Ctrl+Alt+M  →  Log current progress
Ctrl+Alt+S  →  Save context now  
Ctrl+Alt+N  →  Copy handoff prompt to clipboard
```

Note: it's `Ctrl+Alt+M` not `L`. The original `Ctrl+Alt+L` conflicted with the REST Client extension which claimed that shortcut for HTTP file editing. Changed to M (for Message) to avoid the conflict.

**Onboarding panel** — new installs now see a proper welcome screen that walks through the four setup steps with the keyboard shortcuts. Before this, users installed the extension and saw nothing. The extension just silently activated with no indication of what to do next.

---

## Peak Hour Warning (v0.5.0)

This came from some research into how Claude's rolling usage limits work.

The 5-hour rolling window drains significantly faster during peak server hours — roughly 8AM to 2PM Eastern time. The exact same query costs more "limit equity" at 9AM than at 4PM.

The extension now detects when you're working during peak hours and shows a warning:

> ⚠️ Peak Claude hours (9:00 PT / 12:00 ET) — token limits drain faster. Consider saving context frequently or switching to off-peak hours for heavy tasks.

Two actions: `Save Context Now` or `Dismiss`. Fires at most once every 4 hours to avoid becoming annoying.

---

## Budget Alerts (v0.6.0)

After the token dashboard revealed how much I was actually spending, the obvious next feature was budget tracking.

Set a daily and/or weekly budget in settings:

```json
"session-bridge.dailyBudget": 2.00,
"session-bridge.weeklyBudget": 10.00
```

The extension checks your actual spend from the JSONL telemetry and fires warnings at 50%, 80%, and 100% of each budget. Each threshold fires exactly once per period.

The status bar shows your current spend at a glance:

```
$(info) $1.34/$2.00 today   $(check) $4.20/$10.00 week
```

The icon changes as you approach the limit — checkmark at under 50%, info at 50%+, warning at 80%+, error at 100%.

Midnight cleanup runs automatically to remove old alert records and prevent stale state from carrying over across days.

---

## Status Bar Buffer Count (v0.7.0)

Small but surprisingly satisfying.

The status bar now shows how close you are to auto-save:

```
Save Context (3/5)
```

Before this, there was no indication that anything was accumulating. Users would log messages with no feedback about when the auto-save would trigger. Now you always know where you stand.

Resets to `Save Context` after every save — manual or automatic.

---

## SESSION.md History (v0.8.0)

Every time SESSION.md is saved, the extension now creates a timestamped snapshot in `.session-history/`:

```
.session-history/
├── SESSION-2026-04-29T14-30-00.md
├── SESSION-2026-04-29T15-45-22.md
└── SESSION-2026-04-29T17-12-08.md
```

If SESSION.md gets corrupted, overwritten with bad content, or you just want to go back to an earlier context, you can restore any snapshot:

```
Ctrl+Shift+P → Session Bridge: Restore Session from History
```

This opens a quick pick with all snapshots listed by timestamp and file size. Selecting one shows a confirmation dialog before overwriting — and crucially, it backs up your current SESSION.md as a snapshot before restoring, so you can undo the restore if needed.

The history auto-prunes to keep the last 20 snapshots. Old ones are deleted automatically.

And because `.session-history/` shouldn't be committed to git, the extension automatically adds it to `.gitignore` the first time the history directory is created — only if it's not already there.

---

## What's Next

The features that feel most important now:

**Inactivity detection** — nudge to save after N minutes without logging. We tried to build this but VS Code's event model didn't fire reliably for "nothing happened." There's a better approach using file system watchers that we'll revisit.

**Budget UI in dashboard** — right now budget is only configurable via settings. Adding input fields directly to the Token Dashboard would make it accessible to everyone without knowing where settings are.

**Multi-workspace support** — the extension currently picks the first workspace folder in multi-root setups. Needs a workspace picker for teams working across repos.

---

## The Numbers

Here's where the extension stands right now:

| Version | What shipped |
|---------|-------------|
| v0.1.0 | Multi-provider, git diff, open files, modular architecture |
| v0.2.0 | One-click handoff |
| v0.3.0 | Token Dashboard |
| v0.4.0 | Production dashboard — async, error states, date range |
| v0.4.1 | Fixed axios bundling — worked on all platforms |
| v0.5.0 | Keyboard shortcuts, onboarding, model recommendation, peak hour warning |
| v0.5.1 | Clean bundle republish |
| v0.6.0 | Budget alerts with status bar |
| v0.7.0 | Status bar buffer count, keyboard shortcut fix |
| v0.8.0 | SESSION.md history with restore and auto-gitignore |

---

## Try It

Session Bridge AI is free and open source. Setup takes about 2 minutes — install the extension, grab a free Gemini API key from Google AI Studio, and you're done.

- 🔌 [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=RajatJog.session-bridge-ai)
- 💻 [GitHub](https://github.com/RJ-Gamer/session-bridge-ai)
- 🌐 [My Website](https://rj-gamer.github.io/rajatjog-website/)
- ❤️ [Sponsor](https://github.com/sponsors/RJ-Gamer)

If you've been hitting the lost context problem, give it a try. And if something's broken or missing for your workflow, open an issue — the repo is active.

---

*Rajat Jog builds developer tools and writes about the process. Find more at [rj-gamer.github.io/rajatjog-website](https://rj-gamer.github.io/rajatjog-website/).*