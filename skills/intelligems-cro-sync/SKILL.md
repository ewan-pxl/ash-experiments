---
name: intelligems-cro-sync
description: Pulls A/B test results from Intelligems and writes them into the matching project rows of a CRO Lab Notion database. Use this skill any time the user wants to "sync test results", "pull metrics", "update the CRO Lab", "sync the CRO Lab", "log results for [client]", "update the [brand] tests", or names a CRO Lab / client and asks to bring it up to date. The skill is self-driven once it knows the client — it finds unsynced tests itself, confirms the list with the user, then syncs everything in one batch. Triggers for ANC brands (MASA Chips, Vandy Crisps) and any future CRO Lab the user references — assume the workflow is the same unless explicitly told otherwise.
---

# Intelligems → CRO Lab Notion Sync

Pulls test results from Intelligems and writes them into matching project pages in a CRO Lab Notion database. The skill is self-led: once it knows which client/CRO Lab to work in, it finds unsynced tests, confirms with the user, then syncs.

## When to use this

User says something like:
- "sync the ANC CRO Lab"
- "update the MASA tests in Notion" / "update MASA"
- "pull in any new test results for Vandy"
- "the CRO Lab needs updating"
- "log the latest results"
- "sync test 19" (single-test mode also works)

If the user says "sync the CRO Lab" without naming a client, ask which client first.

## Two modes

The skill operates in one of two modes depending on what the user gives you:

**Auto mode (default)** — User names a client/CRO Lab. Skill finds all unsynced tests itself, confirms the list, syncs.

**Targeted mode** — User names specific tests by number/name. Skip the discovery step, go straight to syncing those tests.

If unclear, default to auto mode.

## Auto mode workflow

### 1. Identify the CRO Lab

User said "ANC", "MASA", "Vandy", "the CRO Lab", etc. Resolve to a Notion DB and Intelligems org(s). See `references/orgs.md` for the mapping table — read it now if this is the first sync of the conversation.

If the client maps to multiple Intelligems orgs (ANC has MASA Chips and Vandy Crisps), and the user named the holding co rather than a specific brand, sync **both** brands in the same run. Don't ask.

If the user named a specific brand, only sync that brand.

### 2. Find unsynced tests in Notion

Query the CRO Lab database. A test "needs syncing" when:
- `Status` is one of: `Ended`, `Analysing`, `Concluded`
- AND any of the lift fields is empty (`CVR Lift`, `AOV Lift`, `RPV Lift`, `sRPV Lift`, `Sub Opt In Lift`)

Use `Notion:notion-fetch` on the data source URL to get the schema, then query. The data source ID is in `references/orgs.md`.

For ANC specifically, the "Complete" view already filters to concluded tests but *also* includes Landing Pages (Type=Landing Page). For this skill, exclude Type=`Landing Page` and Type=`Pre-Post Analysis` — only sync `Split Test` rows.

### 3. Show the user the list and confirm

Output a short table of the tests found:

```
Found 4 tests in ANC - CRO Lab that need syncing:

| # | Project Name | Brand | Status |
|---|---|---|---|
| 19 | Full page redesign | MASA Chips | Concluded |
| 23 | AOV optimisation (MVT) | MASA Chips | Concluded |
| 28 | 30/45/60 day offer rework | MASA Chips | Concluded |
| 35 | Full page redesign | Vandy Crisps | Concluded |

Sync all of these? (y / n / specify which)
```

Wait for confirmation. Accept: "yes", "y", "go", "sync all", or a subset like "just 19 and 23", or "skip 35".

If the list is empty, say so plainly: "Nothing to sync in [client] — all concluded tests already have lift data."

### 4. For each confirmed test, sync (silently)

Run the sync steps in `## Sync steps` below for each test. Don't narrate each one — just do them.

### 5. Output the summary table

After all syncs are done (or skipped/errored), output one summary table covering everything attempted. Format in `## Summary output` below.

## Targeted mode workflow

User named specific tests: `"sync test 19"`, `"sync tests 19, 23, 28"`, `"update the full page redesign result"`.

Skip steps 2-3. Go straight to the sync steps for each named test. Still output the summary table at the end.

If the user names a test you can't find in Notion, flag it in the summary — don't ask mid-batch.

## Sync steps (per test)

These run for each test the user has confirmed.

### A. Find the test in Intelligems

Use `Intelligems:list_experiments` with `nameContains` set to a distinctive substring of the test name. The bridge between Notion's `Identifier` (e.g. `19`) and Intelligems' test name (e.g. `"19 - Masa - /4freeflavours"`) is the number prefix. Search `"19 - "` (with hyphen-space) to avoid matching "190".

Other good search strings: the page slug (`"4freeflavours"`), a keyword from the project name.

The status emoji (🟢 🔴 ⚪) at the start of the IG name is unstable — users edit it. Don't search by it.

If no IG test matches → flag in summary as "Found in Notion, missing in Intelligems" and skip. Do not ask, do not write to Notion. Move on.

If multiple match, prefer the one whose name starts with `"<N> -"` where N is the Identifier.

### B. Pull the analytics

Call `Intelligems:analyze_experience` with `view: "overview"`. Pass the correct `organization` parameter (the brand name from the Notion row, e.g. `"MASA Chips"` or `"Vandy Crisps"`).

The metrics array contains one block per variation. The control has no `uplift` field (it IS the baseline). Variants have `uplift.value`, `uplift.ci_low`, `uplift.ci_high`, `p2bb`.

The metrics you need from each variation block:
- `conversion_rate` → CVR
- `net_revenue_per_order` → AOV
- `net_revenue_per_visitor` → RPV
- `subscription_revenue_per_visitor` → sRPV
- `subscription_orders_per_visitor` → Sub Opt In
- `n_visitors` → for sample-imbalance check

### C. Pick the winning variant

This is where most of the judgement lives. Walk through it in order:

**C1. Filter by traffic.** If a non-control variant has dramatically less traffic than the others (`percentage` is 0 in the variations array, or `n_visitors` is <50% of the largest), discount it — that's almost always a misconfigured allocation, not a fair comparison. Note this for the summary.

**C2. Pick the candidate variant.** Among the surviving non-control variants, pick the one with the largest absolute lift across CVR, AOV, RPV, sRPV, Sub Opt In. The user's rule: *"if it's a 50% CVR increase and a 5% sRPV increase, go with CVR as the metric obviously"*. Biggest swing wins.

If two variants are close, pick the one with the higher `p2bb` on its primary metric.

See `references/winner-logic.md` for tricky cases.

**C3. Determine `Winning Variant` field value.** Three options based on `p2bb` of the candidate's primary metric:
- `"Variant"` — `p2bb ≥ 0.85`
- `"Control"` — `p2bb ≤ 0.15` (control significantly better)
- `"Inconclusive"` — `0.15 < p2bb < 0.85`

Write the lift values to Notion **regardless of significance**. Significance only changes the Winning Variant field.

### D. Write to Notion

Use `Notion:notion-update-page` with `command: "update_properties"`. Write only:

```
CVR Lift          → uplift.value of conversion_rate (decimal, e.g. -0.0466)
AOV Lift          → uplift.value of net_revenue_per_order
RPV Lift          → uplift.value of net_revenue_per_visitor
sRPV Lift         → uplift.value of subscription_revenue_per_visitor
Sub Opt In Lift   → uplift.value of subscription_orders_per_visitor
Winning Variant   → "Variant" | "Control" | "Inconclusive"
Intelligems Link  → https://app.intelligems.io/experiments/<experienceId>
```

Notion percent-formatted columns expect raw decimals (`0.1185` = 11.85%). Pass as JS numbers, not strings.

Do **NOT** write `Inc. Revenue ($)`, `Status`, or anything else. The user manages those manually.

The `content_updates` parameter on `notion-update-page` is required by schema even when empty — pass `[]`.

## Summary output

After the batch finishes, output one table:

```
Synced 3 of 4 tests in ANC - CRO Lab.

| # | Test | Winner | CVR | AOV | RPV | sRPV | Sub Opt | Notes |
|---|---|---|---|---|---|---|---|---|
| 19 | Full page redesign | Variant | -4.7% | +11.9% | +6.6% | +572.6% | +729.1% | ⚠️ RPV not sig (p2bb 0.69); sub lifts huge — sanity check baseline |
| 23 | AOV optimisation (MVT) | Inconclusive | +0.8% | +3.2% | +4.1% | +2.0% | +1.5% | All p2bb 0.5–0.7, no clear winner |
| 28 | 30/45/60 day offer rework | Variant | +12.3% | +4.5% | +17.8% | +8.2% | +6.1% | Clean win |
| 35 | Full page redesign | — | — | — | — | — | — | ⚠️ Found in Notion (Vandy #35), missing in Intelligems — manual check needed |
```

Below the table, a short bulleted list of anything genuinely actionable:
- Tests that couldn't be matched (Notion → IG)
- Brand mismatches that were skipped
- Sample imbalance that affected winner pick
- Subscription lifts above 100% (real but worth flagging)
- Tests that landed on "Inconclusive"

Keep it short. The table is the output, the bullets are footnotes.

End with: link(s) to the updated Notion pages, or just to the CRO Lab DB.

## Output discipline

- Show the list and ask before syncing in auto mode. Don't auto-sync.
- Don't narrate routine steps. Tool calls happen silently.
- Do flag the things that change a decision: sample imbalance, marginal significance, subscription anomalies, brand mismatches, missing IG tests.
- One summary table per batch. One row per test. One Notes column for caveats.
- For batches >5 tests: still one table.

## Reference files

- **`references/orgs.md`** — Client/brand → Intelligems org → Notion DB mapping. Read this once at the start of any sync.
- **`references/notion-schema.md`** — Exact Notion property names and value formats. Read if you hit a property write error.
- **`references/winner-logic.md`** — Worked examples of winner-selection for tricky cases. Read if a test isn't a clean win/loss.

## Common failure modes to avoid

1. **Auto-syncing without confirming.** Always show the list first in auto mode and wait for "yes" or a subset selection.

2. **Searching Intelligems by status emoji** (🟢 / 🔴). The prefix changes when anyone touches the test. Use the slug or `"<N> - "` prefix.

3. **Writing percent values as `11.85` instead of `0.1185`.** Notion will display 1185% and the user will be quietly furious. Always decimal.

4. **Picking a variant with 0% traffic allocation as the winner** because its uplift number is mathematically the biggest. Check `percentage` in `variations` and `n_visitors` in metrics.

5. **Auto-setting Status → Concluded.** Don't. The user manages status.

6. **Writing `Inc. Revenue ($)`.** Don't. The user calculates this manually.

7. **Creating new Notion pages.** Don't. If a page doesn't exist for an Intelligems test, the user creates it manually as part of test setup.

8. **Updating the wrong page.** Match on `Identifier` AND `Brand`. Identifier alone is not unique across brands in multi-brand DBs (ANC).

9. **Asking the user mid-batch.** If something fails for one test, flag it in the summary at the end. Don't pause to ask.

10. **Treating uplift sign wrong.** `uplift.value = -0.0466` means -4.66% (variant worse than control). Don't flip the sign.
