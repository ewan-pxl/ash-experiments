# Post-Click Glossary

The terms the post-click team actually uses, each defined in one plain line.

This is the shared vocabulary. If a doc, brief, or call uses one of these words, this is what
it means here. Where a term is owned in full by another section, the glossary points there
rather than re-explaining it.

## How we work

**Sprint.** A fixed block of post-click work. Foundation runs one a month, Growth and Turnkey
run bi-weekly. Each sprint carries a set number of test slots plus build work.

**Test or iteration.** The flex unit inside a sprint. A "test" is an isolated A/B test; an
"iteration" is the same page with nuanced copy or asset changes per angle or persona. Same
slot count either way (see `01-offering/offering.md`).

**Lever.** A single thing on or around the page that moves conversion (a headline, an offer, a
free-shipping threshold, the product mix). We test levers, not whole pages at random.

**Hypothesis.** A test idea written in one shape: "If we [make this change], we expect [this
outcome], because [this insight]." If you can't fill all three blanks, it isn't ready to test.

**Heuristic CRO.** Optimising by expert judgement against known principles, no live split test.
Where we steer brands that sit below the testing floor.

## The 6 heuristic lenses

The six questions we tag every friction point against when we diagnose a page. From the CRO
Research SOP.

**Clarity.** Is the message clear?
**Relevance.** Does this feel relevant to the visitor's intent?
**Anxiety.** Is anything creating doubt or hesitation?
**Distraction.** Is anything pulling attention away from the action?
**Urgency.** Is there any reason to act now?
**Value.** Does the value shine through?

## Testing and data

**In-platform testing.** Testing angles, hooks, and creative inside the ad platform (the
pre-click side feeding the page). Pairs with on-site testing.

**On-site split testing.** Splitting live site traffic between variants and measuring the
conversion difference. Our tool for this is Intelligems.

**Intelligems.** The on-site split-testing tool we run. Full dev execution and Intelligems
integration ship in every tier.

**Lookback.** A daily Shopify read comparing yesterday to a baseline: yesterday vs the trailing
7-day average, and yesterday vs the same day-of-week average over the last 6 weeks. Daily
lookback in Slack is a Growth and Turnkey deliverable.

**Hero funnel / hero PDP.** The main path most paid traffic takes to convert (usually the
flagship product page). A focused line concentrates traffic here; a complex catalog fragments
it, which is why testability tracks SKU count (see `01-offering/offering.md`).

**Kill / ship.** The decision at the end of a test: kill the variant (no lift or a loss) or
ship it (clear lift, becomes the new standard). Either way we log the insight.

## Placement and qualification

**Tier.** Which package a brand is on: Foundation ($6,500), Growth ($10,000), or Turnkey
($16,700). Set by sprint cadence, build surface area, and how much Shopify and creative we own.

**The floor.** The minimum below which structured testing can't resolve cleanly: under 25,000
monthly sessions or $75,000 monthly revenue. Below it, steer to heuristic CRO.

**Store complexity multiplier.** Two brands at the same session count can have very different
testability because a focused line sends most traffic through the hero funnel while a complex
catalog spreads it thin. Sweet spot is 1 to 15 SKUs.

**Overlap zone.** A session/revenue band where two tiers both qualify. Inside an overlap, need
drives the tier, not just what the brand qualifies for.

## Copy and research

**Words of customer.** The exact language customers use about their problems, outcomes, and
friction, pulled from surveys and reviews. We mirror it back in copy so the reader feels like
they're having a conversation with themselves.

**Swipe file.** A per-client store of those words: slang, phrases, analogies, gripes, voice
markers. Feeds headlines and page copy. See `swipefile.md`.

**Hook.** The opening line or angle that earns the next second of attention, on an ad or at the
top of a page. See `hook-library.md`.

**Problem / outcome / friction.** The three lenses we cluster survey responses into. Problem =
life before the product; outcome = what they want from it; friction = what nearly stopped them
buying or kept them from staying. Headlines get tagged against these.

---

*Sources: Notion "CRO Research SOP" (`2a6b4e6a-dca1-81cf-aa96-d573aba3912c`, the 6 heuristic
lenses and the hypothesis format), "Post-Click Deliverables" (`357b4e6a-dca1-8054-adac-d631c547998b`)
and the distilled `01-offering/offering.md` (tiers, floor, lookback, multiplier, overlap),
"Prompt - Customer Survey Analysis" (`329b4e6a-dca1-80c0-acf4-efbbd1bf4dbd`, words of customer /
problem-outcome-friction), all pulled 2026-05-30.*

*Open questions:*
- *No standalone glossary page exists in Notion. This was assembled from the terms in use across
  the offering and methodology docs. As `02-methodology/` gets distilled, reconcile kill/ship,
  in-platform vs on-site, and lever against whatever the finished method doc says and point to it.*
