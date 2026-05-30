# PXL PostClick OS

The canonical knowledge base for Pixel Theory's **Post-Click** department.

This is the cleaned, settled source of truth that Claude and the post-click skills read
from. It is not a copy of Notion or Slack. Those stay where the team works and thinks day
to day. The IP that matters gets distilled in here, and once a fact lives here, this is the
version that is true.

Scope is post-click only: the offering, the CRO methodology, delivery SOPs, and the
post-click sales motion. It is a separate track from the wider "CRO Department's Brain"
effort, by design.

## How it is organised

| Folder | What lives here |
|---|---|
| `00-positioning/` | What post-click is, where it sits in the growth engine, who it is for, the voice |
| `01-offering/` | The three tiers, deliverables per tier, pricing, the qualification framework |
| `02-methodology/` | CRO research SOP, hypothesis format, the levers, testing methods, kill/ship rules |
| `03-delivery/` | Onboarding SOP, client message templates, reporting cadence, QA, design/dev SOPs, tooling |
| `04-sales/` | How-we'd-approach method, SOW playbook, brand-audit method and template |
| `05-results/` | Case studies distilled into reusable proof patterns |
| `90-reference/` | Hook library, copy swipefile, AI prompt library, glossary |
| `_intake/` | Raw pulls from Notion/Slack land here first. Never canon. Gitignored. |

## The distillation discipline

1. Pull raw IP from Notion / Slack into `_intake/`.
2. Distil it into a canonical doc in the right section, in the house voice (see `humanify`).
3. Every canonical doc ends with a short provenance note: sources, last-distilled date,
   and any open questions or gaps.
4. Edit facts here. Do not fork them. If something changes, change it here.

## Status

First full pass distilled, 2026-05-30. All seven sections now have canonical docs, pulled from
the Post-Click Hub Notion tree, the Internal Docs database, the Hume and MASA results pages, and
the post-click Slack channels. See each doc's provenance note for its sources and open questions.

Known conflicts to resolve before any of this goes client-facing are collected at the top of
`CLAUDE.md`.
