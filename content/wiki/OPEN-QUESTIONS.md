# Open Questions and Decisions

The decisions we need from a human to make the knowledge base fully canonical, and the ones already
made. Distilled from every doc's open-questions note on 2026-05-30. Run the "still needed" list past
Graham and Baraka, action the Notion fixes, and this repo is settled.

## Decided (2026-05-30, by Ash)

- **Growth tier price: $9,800/month.** The $10,000 in the source-doc headers is stale.
- **Weekly Slack update: Monday and Thursday.** The Notion doc's Friday label is stale.
- **Project tracker: Monday.com** (over Asana).
- **Diagnosis vocabulary: keep all three, use whichever fits.** Six lenses for element diagnosis,
  MVIFA for whole-page scoring, four levers for the hypothesis-table grouping. No single forced set.
- **Test-conclusion bar: 50+ orders per variant.**
- **Positioning: post-click is a peer in one growth engine,** alongside media and creative, owning
  the after-the-click layer. Not "exists to serve the Growth team".

## Decisions still needed

- **Is "Post-Click Revenue Maximisation" the public category name?** It comes from the March deck
  audit as a recommendation, not yet confirmed live in client materials. `00-positioning/`.
- **"How we'd approach [Brand]" is two different documents under one name** (a ~700-word shorthand
  doc, and a full page-by-page CRO audit). Keep one name with two layouts, or split them into
  "how-we'd-approach" vs "CRO audit recommendations"? `04-sales/how-we-d-approach.md`.
- **Is the 7-section Brand Audit template actually used,** or does the team jump straight to the
  client-facing recommendations doc? No filled-in internal example exists. Also confirm whether the
  audit is post-click-owned or a shared Growth-team tool (it currently lives in the Growth Incubator
  tree and its options span beyond post-click). `04-sales/brand-audit.md`.
- **ICE scoring: numeric or qualitative?** Named in the SOP as impact/confidence/ease but with no
  documented scale, and it overlaps with the hypothesis table's primary/secondary/tertiary lever
  field. `02-methodology/hypotheses-and-prioritization.md`.
- **Sprint test-slot counts (4/6/8 per tier): built or concluded?** They sit above what one analyst
  runs to conclusion at a 7-day minimum. Confirm the canonical promise is slots *built/queued*, not
  *concluded* per sprint. `02-methodology/testing-methods.md`.
- **Where do the "F\*ck it" Moments (8 decision triggers) belong?** Closer to copy/offer strategy
  than research. Probably `90-reference/`, not yet placed. `02-methodology/research-sop.md`.
- **Are tax economics and price integrity in the weekly report dead or parked?** They are written
  into the SOP but struck through. Decide before they get promised to a client. `03-delivery/reporting.md`.
- **The $8k Growth trial scope is still disputed in Slack** (1 vs 2 LPs/month, how many split tests
  built vs live). The repo uses Ash's last word; confirm before quoting. `04-sales/sow-playbook.md`.

## Fixes to make at source (outside this repo)

- Correct the Growth price headers ($10,000 to $9,800) in the Notion Deliverables and Services docs.
- Correct the "Weekly Update on Slack" doc's second template label (Friday to Thursday).
- Raise the n8n Intelligems digest bot's order minimum from 25 to 50 so the automated read matches
  the human bar.
- Clean up the stale "Who are we?" identity page (still says "Soar With Us, Leeds"). It is not
  canonical Pixel Theory identity and was not imported.
- Resolve SOW template hygiene: the "Development SOW" template is headers-only, the "*Scrappy
  Proposal" is blank, and there is a duplicate Nov-2025 fork of the Artzabox SOW
  (`2a6b4e6a-dca1-81c0-a6b5-d50178bf2881`). Pick one canonical version and delete or merge the rest.
- Refresh the VanMan onboarding intro-message roster (it still names Arthur, who has left).

## Known gaps to fill (lower priority, mostly internal)

- **Asset-creation SOP** (custom icon packs, illustrations) was explicitly requested and is ramping
  for Turnkey, but is not written yet. `03-delivery/design-dev-sop.md`.
- **Two colour themes missing.** The Figma token export carries `base` and `inverse` modes; the offering
  promises four (light, dark, inverse, dark inverse). The other two still need exporting into
  `branding/pixel-theory/tokens/foundation/colors/`. (The spacing scale, previously flagged here as undocumented, is
  now in those tokens and documented in `03-delivery/design-dev-sop.md`.)
- **Six-lenses to four-levers mapping** is not pinned, so the hypothesis "Lever" field can be filled
  inconsistently. `02-methodology/`.
- **Daily Vitals developer questions** (API version pinning, partial-failure policy, N8N hosting, AI
  cost ceiling) are open in the build brief; the live automation runs a simplified version, so these
  are refinements, not blockers. `03-delivery/reporting.md`, `tooling.md`.
- **Prompt library scope:** two of the four prompts are third-party and lean pre-click. Decide
  whether `90-reference/` keeps creative prompts or scopes strictly to post-click. `90-reference/prompt-library.md`.
- **Headline runtime statement:** state once, canonically, that it is 7 days to act and 14 to declare
  a winner, so nobody splits the difference. `02-methodology/testing-methods.md`.

## On the results numbers (do not over-claim)

These are flagged in the case studies but worth pulling into one place, because they are the most
likely thing to get misquoted in a pitch:

- **Hume's "~$12M / 10 weeks"** is 14 days measured ($2.98M BFCM lift) plus 55 days projected
  ($8.73M). Only the $2.98M is defensible as measured. The "10 weeks" in the title does not map
  cleanly to the timeline.
- **MASA's $5.75M and $7.85M** are models on trailing-12-month sessions and a fixed LTV, not banked
  revenue. Quote as projections.
- **Vanman's free-gift result (+25% RPV)** was still inside its run window when pulled. Confirm the
  closed-out figure before quoting.
- **Hume Coupon Activation ($56K/month)** is a team estimate, not a closed-out actual.

---

*Sources: the open-questions notes in every doc across `00-` through `90-`, compiled 2026-05-30.
Decisions in the first section confirmed by Ash, 2026-05-30.*
