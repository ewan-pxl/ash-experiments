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

## Known conflicts to resolve (as of 2026-05-30)

The first full distillation pass surfaced real disagreements between sources. Each is flagged in
the relevant doc's open-questions note. Until a human settles them, say which side you are using.

- **Growth tier price.** $10,000 (tier headers) vs $9,800 (one summary bullet in the Deliverables
  doc). Using $10,000. `01-offering/offering.md`.
- **Weekly Slack update day.** Monday/Thursday (offering + live management) vs Monday/Friday (the
  Notion "Weekly Update" doc). Using Monday/Thursday. `03-delivery/`.
- **Project-management tool.** Asana (QA Gameplan) vs Monday.com (Project Tracker doc), both late
  May 2026, neither superseding the other. `03-delivery/qa.md`, `tooling.md`.
- **One vocabulary for diagnosis.** Three overlapping sets are in use: the 6 heuristic lenses, the
  "Four Levers", and MVIFA page scoring. Roles assigned provisionally, no canonical mapping yet.
  `02-methodology/`.
- **Test-conclusion bar.** Bot says 25 orders/variant; people cite 50+ orders or $10k+ revenue.
  `02-methodology/testing-methods.md`.
- **Positioning of post-click.** Peer layer in one engine vs "serves the Growth team". Distilled as
  one engine, post-click owns after-the-click. `00-positioning/positioning.md`.
- **Stale sources, do not import.** The "Soar With Us / Leeds" identity page, duplicate Nov-2025
  SOW/template forks, and a stale onboarding intro roster (names someone who has left).

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
