---
name: website-qa
description: Run a structured QA pass on a website with Playwright MCP — black-box checks of functional flows, responsive breakpoints, console/network errors, and visual layout — then save a timestamped run (screenshots, report, captured state) under ~/.claude/QA/ and diff it against a saved baseline to surface regressions (New / Fixed / Regressed / Unchanged). Use this whenever the user wants to QA, test, smoke-test, sanity-check, audit, or "check" a live or preview website/URL — e.g. "QA this URL", "test the cart flow on staging", "check the homepage on mobile", "did anything regress since last time", "run a QA pass on example.com", "check the product page for console errors", "is the checkout still working". Trigger even when terse ("qa this", "check the site looks right") as long as a website or URL is the subject. Do NOT trigger for writing unit/integration test suites, test-strategy planning, code review, or verifying one specific local code change via the app (those are other skills).
---

# Website QA

Run a repeatable, black-box QA pass on a website using the Playwright MCP browser, save the run under `~/.claude/QA/`, and compare it against a saved baseline so regressions are caught instead of re-discovered.

**Test the way a real visitor would.** Interact like a shopper, not a script — and judge what you find by its impact on someone trying to browse and buy: would this confuse, annoy, mislead, or block them? That lens decides both what's worth flagging and how severe it is.

## Resolve your paths first (cross-platform)

This skill stores everything under the **QA root**: the `.claude/QA` folder inside the *current* user's home directory. It is not tied to any one machine or account — resolve these placeholders to real absolute paths for whatever box you're on before running anything. Commands and Playwright MCP need real absolute paths, not `~` (Playwright rejects `~` and relative paths):

- `<HOME>` — the current user's home directory. Windows: `%USERPROFILE%` (e.g. `C:\Users\alice`). macOS/Linux: `$HOME` (e.g. `/Users/alice`). If unsure, get it with `python -c "import pathlib; print(pathlib.Path.home())"`.
- `<QA>` — `<HOME>/.claude/QA` — the QA root, where all runs, baselines, and the dump folder live.
- `<DUMP>` — `<QA>/dump` — the Playwright `--output-dir` staging folder.
- `<SKILL>` — this skill's own folder (the "Base directory for this skill" printed when it loaded), e.g. `<HOME>/.claude/skills/website-qa`.

Build the real paths with your platform's native separator — `\` on Windows (`C:\Users\alice\.claude\QA\...`), `/` on macOS/Linux (`/Users/alice/.claude/QA/...`). Every `<QA>`, `<DUMP>`, and `<SKILL>` below is one of these placeholders — substitute the resolved absolute path before you run the command.

## Hard scope: a QA run never edits code

A QA run is **read-only with respect to every repo**. The only place it writes is the QA root, `<QA>`.

- Never edit, create, or delete files outside the QA folder. Not to "fix" a finding, not to add a test, not anything.
- You **may read the project's source** to diagnose a finding — but only after confirming the URL under test corresponds to the current repo (see step 1). If they don't match, stay a pure black-box checker and don't read code.
- Findings get *reported*, never fixed, during a QA run. If the user wants a fix, that's a separate task after the run.

## What a QA run checks

Four independent check types — a run can use any subset (you confirm which, and how wide, in **step 2**):

| Check type | What it covers |
|---|---|
| `functional` | Clicks, navigation, forms, cart/checkout, menus, accordions — does interactive stuff work |
| `responsive` | Layout across breakpoints; overflow, broken stacking, cut-off content |
| `console_network` | JS console errors/warnings, failed requests, 4xx/5xx, broken images/assets |
| `visual` | Screenshots + content presence; spacing, alignment, things rendering correctly |

All four = a *full run*; any subset is *partial*. This matters for the baseline (see end).

## Where everything is saved

```
<QA>\                                       (= <HOME>\.claude\QA)
├── dump\                                  Playwright --output-dir staging (transient: contents moved into the run, then emptied — never delete the folder)
└── <project>\                              one folder per project (see step 1)
    ├── baseline\                           the "current state" — last blessed snapshot
    │   ├── state.json                      text-comparable facts, keyed by slice
    │   └── screenshots\                    baseline images for visual comparison
    ├── acknowledged.json                   ignore-list: findings you marked "not an issue" (survives baseline rebuilds)
    ├── runs\
    │   └── 2026-05-29_143005_cart-flow\    <timestamp>_<purpose-slug>
    │       ├── report.md                   purpose, scope, findings, regression diff
    │       ├── state.json                  what this run captured
    │       ├── screenshots\                page + functional step shots
    │       └── artifacts\                  console / network / DOM logs
    └── history.md                          one line per run: when · purpose · scope · result
```

The scripts in `scripts/` handle the folder layout, timestamps, diffing, and baseline promotion — use them rather than hand-rolling paths or comparison logic. Run them with `python`.

## First-run setup: Playwright output directory (automatic)

Playwright MCP only writes inside its **allowed roots** and rejects any path outside them. Two roots are allowed: the configured `--output-dir` (the `dump` staging folder in the QA tree) **and the server's cwd — which is the repo root**. To keep captures out of the repo, Playwright MCP must be launched with `--output-dir` pointing at `<DUMP>` (`= <HOME>/.claude/QA/dump`).

**This is checked for you — don't hand-edit the config.** At the very start of every run (**step 0** below) run `scripts/setup_playwright.py`. It is cross-platform and idempotent: it resolves the current user's `<QA>` and `<DUMP>` (creating them if missing), then **searches the known MCP config locations** for an existing `playwright` server — Claude Desktop's per-OS config, any project-level `.mcp.json` up from the cwd, and the user-level `.claude.json` — and points that server's `--output-dir` at `<DUMP>` (backing up the file first if it changes anything). It does **not** install Playwright MCP; it only adjusts an existing server.

It prints a JSON status. The fields that drive what you do next:

- `playwright_found: false` → **no Playwright MCP server is configured anywhere.** The script changed nothing. **Stop and ask the user to set up the Playwright MCP server first**, then re-run the skill. Don't try to add the server yourself or run any browser tool — there's nothing to drive. (Point them at the Playwright MCP package `@playwright/mcp` added under `mcpServers.playwright`; once it exists, this script will wire its `--output-dir` automatically on the next run.)
- `already_correct: true` → the found server already writes to `<DUMP>`; nothing to do, continue with the run.
- `restart_required: true` → an existing server's `--output-dir` was just changed (a `.bak` backup was written to the same file). **Stop here.** Captures won't land in `<DUMP>` until the Playwright MCP server reloads, which only happens when the app restarts. Tell the user exactly that: *"I've pointed your Playwright MCP server at `<DUMP>` and created the QA folders. Please fully quit and reopen Claude, then ask me to run the QA again — the browser captures won't be staged correctly until the MCP server reloads."* Do not proceed with browser captures in the same session.

Editing the MCP config is the **only** write this skill makes outside `<QA>`, and only during this setup to fix an existing server's `--output-dir` — never during an actual QA run (see *Hard scope*).

A correct `playwright` server looks like (Windows) `command: "cmd"`, `args: ["/c","npx","@playwright/mcp@latest","--output-dir","<DUMP>"]`; (macOS/Linux) `command: "npx"`, `args: ["@playwright/mcp@latest","--output-dir","<DUMP>"]`. The script only manages the `--output-dir` value — the rest is the user's own server definition.

**Important — `--output-dir` governs only *auto-generated* filenames.** When you pass an explicit `filename` to a Playwright save, a **relative** name resolves against the cwd (**the repo root**), *not* `--output-dir` — that's exactly how stray captures end up polluting the repo. So **every manual save must use an absolute path under `dump`** (see step 4). And note the per-run `artifacts\`/`screenshots\` folders are **not** allowed roots — you cannot save into them directly (rejected as "outside allowed roots"); you stage in `dump` and move.

## Execution model: adaptive concurrency

**One browser, one driver.** Playwright MCP controls a single shared browser, so the browser has exactly one driver: you, the main agent. Subagents must **never** call `mcp__playwright__browser_*` — concurrent driving races and corrupts evidence (one agent resizes to mobile mid-screenshot of another's desktop view). This invariant holds in every mode.

Choose the mode at the start of the run from the **slice count** (pages × breakpoints × check-types in scope):

- **Small run (roughly ≤ 6 slices) → fully sequential.** Capture and analyze each slice inline. Simpler and usually just as fast, because the browser work is serial regardless. (Slice count comes from the page coverage decided in step 2 — don't shortcut it by assuming one page.)
- **Large sweep (many pages × breakpoints) → hybrid, in phases:**
  1. **Capture (serial, you only):** drive the browser through every slice and save raw evidence — screenshots, console logs, network logs, DOM snapshots, overflow measurements — to predictable absolute `dump`-rooted paths (step 4). (It lands in `dump`; move it into the run folder per step 4 so analyzers can read it.)
  2. **Analyze (parallel subagents):** fan out subagents over the captured artifacts (grouped by page or by check-type). Each reads only saved files, returns findings in the state-schema shape, and may return `needs_followup` requests — browser actions it couldn't perform itself.
  3. **Escalate (back to serial):** collect the `needs_followup` requests and drive the browser yourself to perform those focused captures. Their output lands in `dump` like any capture — move it into the run folder and clear `dump`'s contents (step 4 — contents only, never the folder), then re-analyze (inline or by re-dispatching). Repeat until there are no new followups or you've done ~2 rounds — enough to dig into a real issue without looping forever.

The escalation step is what makes this more than a speed trick: an analyzer that spots a suspicious console error can ask for a deeper capture ("click add-to-cart, then grab console + network + the cart badge value"), and you go back to the browser and get it. See `references/parallel-analysis.md` for the analyzer prompt and the `needs_followup` shape.

## Workflow

### 0. First-run setup check (every run, before anything else)

```bash
python "<SKILL>\scripts\setup_playwright.py"
```

Read the JSON it prints (see *First-run setup* above) and branch on it:
- `playwright_found: false` → **stop and ask the user to set up the Playwright MCP server first**; re-run once they have. Don't run any browser tool — there's no server to drive.
- `restart_required: true` → an existing server's `--output-dir` was just fixed — **stop and ask the user to fully restart Claude**, then re-run; don't attempt browser captures until the MCP server has reloaded.
- `already_correct: true` → continue straight to step 1.

(Pass `--check` to inspect without modifying.)

### 1. Resolve the project and check URL ↔ repo

- **Project name** = the basename of the current working directory (e.g. `VanManTheme`). This is the `<project>` folder under `~/.claude/QA/`. If you're not inside a project, ask the user for a project name.
- **Verify whether the URL under test is *this* project's site.** Look for the store/domain in the repo (Shopify: `config/settings_data.json`, `.shopify` / theme config, a `*.myshopify.com` reference). If it matches, you're allowed to read source to diagnose findings. If you can't confirm a match, ask the user once; if still unsure, treat it as black-box and say so in the report.

### 2. Determine page coverage, then check types

**Page coverage — ask when the target is an index page.** A site-level "full QA" almost never means "only the exact URL string I was handed." Decide coverage from the URL type *before* running:

- **Index / listing page** — homepage `/`, a collection, a blog, `list-collections`, search results. The number of pages to QA is ambiguous here, so **ask the user how wide to go** rather than assuming. Offer:
  - *Just this page* — only the index page itself.
  - *The things it lists* — this page plus the items it links to (a collection's products; a homepage's nav targets and featured collections/products).
  - *The whole store* — a representative **sample of each unique page type**, found by exploration (see below). Not every page — cover the distinct templates/layouts and sample the repeated ones.
  - *A set they specify* — a custom list of URLs or page types.
- **Leaf page** — a single product, article, or content page. Scope is just that page; no need to ask unless the request is vague.

Never silently equate "full QA on `<home/collection URL>`" with a single page — surface the choice.

**Discovering the page set (for "the whole store" or any broad run).** Don't hand-type a guess and don't grind every page — explore first, then sample:

1. **Crawl for links.** Start at the given URL and collect links from the **nav/header, footer, and in-page content**. Follow into a few hub pages (a collection, the blog index, the page/policy lists) to surface links the homepage doesn't show — you'll often need a second hop to find everything. (Shopify: `/sitemap.xml` and the repo's `templates/` also enumerate what exists.) Keep only **same-domain** links as QA candidates — external links (social, partners, payment) are out of scope (see the domain guardrail in step 4).
2. **Group by page *type*, not URL.** Bucket the links: home, collection/listing, product, blog index, article, content page (`/pages/*`), policy (`/policies/*`), cart, search, account/login, etc. Distinct **templates** count as distinct types — a bundle product, a standard product, and a landing-page product render differently and are each worth one sample.
3. **Sample, don't exhaust.** Take a small representative set per type — e.g. **1–2 collections, 2–3 products across different templates** (standard + bundle + any custom layout), **1–2 content pages, 1–2 policy pages** — plus the one-of-a-kind pages (cart, search, contact, blog index). Skip the remaining near-duplicates of each repeated type.
4. **Report what you sampled and skipped**, e.g. "covered 3 of ~70 products (standard, bundle, landing) and 2 of 6 policy pages" — so coverage reads as honest sampling, not implied-complete.

**Check types** — confirm which of the four to run; **ask (AskUserQuestion, multi-select) if the user didn't specify** — don't assume "everything". All four = a *full run*; any subset = *partial* (matters for the baseline).

**Purpose** — get a short purpose (e.g. "cart flow + mobile layout"); it becomes the folder slug and report title. Then list the concrete **URL(s)** the run will cover.

### 3. Scaffold the run folder

```bash
python "<SKILL>\scripts\new_run.py" --project "<project>" --purpose "<purpose>"
```

It prints JSON with `run_dir`, `run_state` (path to this run's `state.json`), `screenshots_dir`, `baseline_state`, and `baseline_exists`. Use those paths for everything below.

### 4. Run the checks with Playwright MCP

**Reset to a clean browser state first.** The Playwright browser persists between sessions — a stray tab, a prior viewport, a logged-in or mid-cart state can silently corrupt a run (you think you're on the homepage at 1440px, but the active tab is a cart page at 375px). Before you trust any capture: navigate to the target URL, then **verify you're actually there and sized right** — read `document.location.href`, `document.title`, and `window.innerWidth` and confirm they match what you intend. Check `browser_tabs` for stray tabs. Re-verify after every `browser_navigate` / `browser_resize`. Also watch for the URL silently redirecting to a preview/proxy domain (e.g. `*.shopifypreview.com`) — that's fine to QA, but note it in the report so findings aren't mistaken for the public site.

**Stay on the site's domain.** After every navigation or link click, check the page's hostname. If it no longer matches the site under test — allowing for its expected variants (`www.`, the `*.myshopify.com` / `*.shopifypreview.com` host it's actually served from) and platform domains it legitimately hands off to (checkout, `shop.app`, the account/login domain) — then **you've left the site. Stop: this is not part of the QA. Go back** (`browser_navigate_back`, or re-navigate to the target) and carry on. Never QA an external site.
Before deciding whether it's a problem, **look at the link that took you there** — its visible text/label, icon, and `href` — and judge whether that destination makes sense *for that link*:
- If the link's **name made the destination reasonable** — "Instagram", "Reviews", "Find us on…", a partner/app name, "Pay", an external blog — then leaving is fine; skip it, no finding.
- If **nothing about the link suggested it would leave the site** — an internal-looking label like "Shop All", "Returns", "About Us" landing on an unrelated domain — **record it as a finding** (broken/misconfigured redirect, wrong target, possible hijack): note the link text, its `href`, where it should have gone, and where it actually landed.

Run per the **execution model** above — sequential for a small run, hybrid for a large sweep — but always with you as the sole browser driver.

Read `references/playwright-recipes.md` for exactly how to perform each check type with the `mcp__playwright__browser_*` tools, including the default breakpoints and how to detect overflow.

**Where artifacts land (staging → run folder).** Playwright MCP writes only inside its **allowed roots**: the `--output-dir` staging folder `<DUMP>` **and the server's cwd, the repo root** (see *One-time setup* above). The per-run `artifacts\`/`screenshots\` folders are *not* allowed roots, so you cannot save into them directly. Two consequences that decide how you save:
- A **bare relative filename resolves against the cwd = the repo root**, silently dropping the file into the repo. Never use one.
- So **always pass an absolute path rooted in `dump`** for every manual save: `<DUMP>\<page>-<breakpoint>.png` for the per-breakpoint page shot (shared by responsive + visual), `<DUMP>\<page>-console.txt`, `<DUMP>\<page>-network.txt`, `<DUMP>\<page>-dom.txt`, and `<DUMP>\<page>-<label>.png` for functional step shots.

This keeps manual saves out of the repo and puts them alongside the auto-saved navigation artifacts (which Playwright drops in `dump` on its own), so a single move step relocates everything.

**Every capture round writes to `dump` — the initial page sweep *and* any follow-up captures triggered later during analysis.** After each round, **move** the files from `dump\` into this run's `screenshots\` / `artifacts\`, then **clear `dump\`'s _contents_** so the next round starts clean (and same-named files don't collide). **Clear the contents only — never delete the `dump\` folder itself:** it's Playwright's `--output-dir`, and removing it breaks every subsequent auto-save until the folder is recreated (and the path may be protected from removal anyway). Clear with the contents glob, not the folder — e.g. `Remove-Item "<DUMP>\*" -Recurse -Force` (PowerShell) or `rm -rf "<DUMP>/"*` (bash), with the resolved absolute path, never `Remove-Item <DUMP>` / `rm -rf <DUMP>`. Analyzer subagents only ever read the already-moved files in the run folder — they never touch `dump` or the browser (see `references/parallel-analysis.md`).

Two guardrails, because a QA run must never leave files in a repo:
- **Always use an absolute `dump`-rooted path for manual saves** — never a bare relative filename (it lands in the repo root) and never the run's `artifacts\`/`screenshots\` path directly (rejected — not an allowed root). Files reach the run folder only via the move step above.
- **Backstop:** after moving, **verify the repo working tree is clean** (`git status`) and relocate any stray artifacts. Auto-saved navigation artifacts normally land in `dump`, but if `--output-dir` isn't in effect (config changed without an MCP restart) they can fall back to the repo root — so check, don't assume.

Default breakpoints: `mobile-375` (375×812), `tablet-768` (768×1024), `desktop-1440` (1440×900). `responsive` and `visual` run across all three; `console_network` at `desktop-1440`. **`functional` is discovery-driven, not tied to a breakpoint** — exercise each interactable once on the breakpoint that matters (default desktop), with one exception: the **nav is always tested on both desktop and mobile** (mega-menu vs hamburger are different components). Global components (nav, footer, cart drawer) are tested once on the homepage by the main agent; page-specific interactables are discovered per page and deduped by type — see the functional recipe.

### 5. Record findings into the run's state.json

For each **slice** you checked (`check_type · url · breakpoint`), write an entry into the run `state.json`. Each problem is a **finding** with a stable `signature` so it can be matched across runs. See `references/state-schema.md` for the exact structure and how to build keys and signatures. A slice with no problems has an empty `findings` list — record it anyway, so the baseline knows that slice was clean.

### 6. Diff against the baseline

```bash
python "<SKILL>\scripts\diff_state.py" --baseline "<baseline_state>" --run "<run_state>" --acknowledged "<project>\acknowledged.json"
```

`--acknowledged` (optional) pre-filters findings you've previously marked "not an issue" out of *both* sides before classifying, so known noise never reaches the report — it's summarized as a suppressed count instead. It classifies every remaining finding in the slices this run covered:

- **Regressed** — a finding in a slice the baseline covered and had clean (worked before, broken now). This is the alarm bell.
- **New** — a finding in a slice with no prior baseline coverage (can't tell if it's a regression).
- **Fixed** — a baseline finding that's no longer present.
- **Unchanged** — present in both baseline and now.

If no baseline exists yet, everything is reported as initial findings (no diff possible).

### 7. Triage findings — real issue or not?

Let the user dismiss findings that aren't real issues, so future runs stop re-flagging known noise — without this, a real store's third-party chatter buries what matters.

**First, show the findings as a table — don't make the user judge from short labels.** A terse list (or the options inside a yes/no prompt) isn't enough to decide from; lay every finding out with the context needed to evaluate it before you ask anything:

| # | Sev | Where (page · breakpoint · check) | What | Why it might / might not matter · how to repro | Evidence |
|---|-----|-----------------------------------|------|-----------------------------------------------|----------|
| 1 | med | /cart · desktop · functional | Header cart badge stale after qty change | Server count→3 + subtotal update, but header stays "2"; updates fine on add-to-cart → likely real | cart-desktop-1440.png |
| 2 | — | site-wide · console/network | 12× web-pixel 404 on preview domain | Third-party Shopify pixel sandbox, not the store's code → likely noise | home-network.txt |

- **Group near-identical findings into one row with a count** ("12×…") so triage isn't tedious — one yes/no, not twelve.
- **Flag each row as likely *store bug* vs likely *third-party noise*** to orient the decision.

**Then ask, per finding/group — "real issue, or not?"** — referencing the table rows. Keep the real ones; for each dismissal, capture a one-line reason.

**The table holds any number of rows, but each prompt can't — so batch the selects.** `AskUserQuestion` shows at most **4 options per question** (up to 4 questions per call), with no scrolling. When there are more dismissable groups than fit, present them as **multi-selects back to back** — batches of ≤4 options each — until every finding has been triaged. Keep it clickable selects; don't fall back to free text. (Grouping near-identical findings into one row keeps the number of batches down.)
- **Scope each dismissal with a smart default the user can override:**
  - Third-party / global noise (tracking-pixel 404s, CSP warnings, vendor scripts) → `store` (suppress everywhere).
  - Layout / content / functional issues tied to a page → that page's `url`.
  - State the default you're applying; let the user widen or narrow it (`store` / `url` / exact `slice`).
- Write the dismissals to the project's `acknowledged.json`:

```bash
python "<SKILL>\scripts\acknowledge.py" --file "<project>\acknowledged.json" --add "<entries.json>"
```

where `<entries.json>` is a small list you write of `{signature, scope, url|slice_key, reason}` objects (schema in `references/state-schema.md`). Then re-run the step-6 diff so the report reflects the new suppressions.

Skip triage only if the user opts out or the run is unattended — in that case report everything and note that nothing was triaged.

### 8. Write the report and update history

Write `report.md` in the run folder using the template below, then append one line to the project's `history.md`.

### 9. Offer to promote to baseline (always ask)

Never update the baseline silently — the run may be against a non-live or half-built environment. Tell the user **exactly what would change** and ask. Because the baseline is keyed per slice, a partial run only patches the slices it covered (a "partial baseline addition") and leaves every other baseline entry untouched.

- **First run / no baseline:** "No baseline exists yet for `<project>`. Save this run as the initial baseline? (recommended)"
- **Subsequent runs:** "Promote N slices to the baseline? — `functional · /cart · desktop-1440` (from `staging.site.com`, captured 14:30:05), …"

On a yes:

```bash
python "<SKILL>\scripts\promote_baseline.py" --baseline "<baseline_state>" --run "<run_state>"
```

(Pass `--keys "<key1>,<key2>"` to promote only specific slices.) It copies the covered slices' state and their screenshots into `baseline/`, leaving uncovered baseline entries intact.

## Report template

Use this structure for `report.md`:

```markdown
# QA — <project> — <purpose>

- **When:** <timestamp>
- **Scope:** <check types run>
- **Coverage:** <pages / page-types covered; for broad runs, what was sampled vs skipped>
- **URL(s):** <urls>
- **Environment match:** <"matches this repo" | "could not confirm — treated as black-box">
- **Served from:** <note if the URL redirected to a preview/proxy domain, e.g. *.shopifypreview.com; else "public site">
- **Baseline:** <"compared against baseline" | "no baseline — initial run">

## Summary

<1–3 sentences. Lead with regressions if any.>

## Regressions (worked before, broken now)
<table or "None">

## New findings (no baseline coverage)
<table or "None">

## Fixed since baseline
<list or "None">

## Still present (unchanged)
<list or "None">

## Suppressed (acknowledged)
<count + a one-line list of what's muted and why, or "None". Don't expand these as active issues — they're here for transparency only.>

## Findings detail

For each finding: severity · where (url + breakpoint) · what · how to reproduce · evidence (screenshot path).
```

**Severity is user/conversion impact** — the cost of a bug is the friction or lost trust it creates for a real visitor trying to browse and buy:
- `high` — blocks or misleads a shopper: broken add-to-cart/checkout, dead flows, a JS error that kills a feature, a wrong or missing price, missing content.
- `medium` — degrades the experience but still usable: a clumsy interaction, an awkward-but-not-broken layout, a slow/janky element.
- `low` — cosmetic and largely unnoticed: a few px of misalignment, a benign warning.

## Baseline vs ignore-list (recap)

Two separate mechanisms — don't conflate them:

- **Baseline** (`baseline/state.json`) = "this is the site's current state; tell me when it *changes*." A regression detector. A finding in the baseline still gets reported as *unchanged* every run.
  - Composite, keyed by slice (`check_type · url · breakpoint`), not one snapshot.
  - A **full run** refreshes every slice it touches; a **partial run** patches only its slices.
  - **Always ask before promoting**, and state which slices and from which URL — the environment may be non-live.
- **Ignore-list** (`acknowledged.json`) = "this finding isn't worth flagging; never show it again, even though it's still present." A noise filter, set during triage (step 7), applied at diff time. Signature-based and scoped (`store` / `url` / `slice`), so a different future problem with a different signature still surfaces. Human-editable — delete an entry to start flagging it again.

## Reference files

- `references/playwright-recipes.md` — how to perform each check type with Playwright MCP, breakpoints, overflow detection.
- `references/state-schema.md` — exact `state.json` structure, slice keys, finding signatures.
- `references/parallel-analysis.md` — hybrid mode: capturing raw evidence to files, dispatching analyzer subagents, the `needs_followup` escalation shape.
