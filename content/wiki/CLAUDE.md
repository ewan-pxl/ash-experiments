# CLAUDE.md — PXL PostClick OS

This repo is the **canonical knowledge base for Pixel Theory's Post-Click department**. When
you are answering a post-click question, writing a deck, a proposal, a SOW, a brief, or any
client-facing artifact, read the relevant section here first and treat it as the source of
truth, ahead of anything in Notion or Slack.

## Scope

Post-click only. The offering, CRO methodology, delivery, sales motion, results, reference.
This is a separate track from the wider "CRO Department's Brain". Do not try to interlock
the two.

## How to use it

- **Read before you write.** For offering/pricing questions read `01-offering/`. For how we
  run tests read `02-methodology/`. For onboarding or client comms read `03-delivery/`. For
  proposals/SOWs read `04-sales/`. For proof read `05-results/`.
- **Canonical wins.** If this repo and Notion disagree, this repo is right (it is the
  distilled version). If you spot a real conflict, surface it rather than silently picking.
- **Honour open questions.** Each doc ends with a provenance note. If a fact is flagged as
  unconfirmed (e.g. a price), say so rather than asserting it.

## How it is maintained

- New IP is distilled from Notion/Slack into `_intake/` (raw, gitignored, never canon), then
  written up as a canonical doc in the right section, in the house voice (`humanify`, no em
  dashes).
- Edit facts in place. Do not duplicate or fork them across docs.

## Decisions log

First full distillation pass: 2026-05-30. The cross-source disagreements it surfaced were settled
by Ash the same day except where noted. Each is also flagged in the relevant doc.

**Settled (2026-05-30):**
- **Growth tier price = $9,800/month.** The $10,000 in the source-doc headers is stale.
  `01-offering/offering.md`.
- **Weekly Slack update = Monday/Thursday.** The Notion "Weekly Update" doc's Friday label is stale.
  `03-delivery/comms-templates.md`.
- **Project-management tool = Monday.com** (over Asana). `03-delivery/qa.md`, `tooling.md`.
- **Diagnosis vocabulary: keep all three, use whichever fits.** Six lenses for element diagnosis,
  MVIFA for whole-page scoring, four levers for the hypothesis-table grouping. No single forced
  set. `02-methodology/`.
- **Test-conclusion bar = 50+ orders per variant.** `02-methodology/testing-methods.md`.
- **Positioning: post-click is a peer in one growth engine,** alongside media and creative, owning
  the after-the-click layer (not "exists to serve the Growth team"). `00-positioning/positioning.md`.

Smaller open questions and known gaps are tracked in `OPEN-QUESTIONS.md`.

**Stale sources, do not import:** the "Soar With Us / Leeds" identity page, duplicate Nov-2025
SOW/template forks, and a stale onboarding intro roster (names someone who has left).

**Fixes to make outside this repo:** correct the Growth price headers and the "Weekly Update" Friday
label in Notion, and raise the n8n Intelligems digest bot's order minimum from 25 to 50.

## Index

- `00-positioning/` — `positioning.md` (what post-click is, where it sits, ICP narrative),
  `voice.md` (house style + operating principles)
- `01-offering/offering.md` — tiers, deliverables, pricing, qualification framework
- `02-methodology/` — `research-sop.md`, `hypotheses-and-prioritization.md`, `testing-methods.md`
  (in-platform vs split, kill/ship rules)
- `03-delivery/` — `onboarding.md`, `reporting.md`, `comms-templates.md`, `qa.md`,
  `design-dev-sop.md`, `tooling.md`
- `04-sales/` — `how-we-d-approach.md`, `sow-playbook.md`, `brand-audit.md`
- `05-results/` — `hume-health.md`, `masa-chips.md`, `proof-patterns.md`
- `90-reference/` — `glossary.md`, `hook-library.md`, `swipefile.md`, `prompt-library.md`
