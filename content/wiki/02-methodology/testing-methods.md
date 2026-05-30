# Testing Methods: In-Platform vs Split, and Kill/Ship Rules

How we run a test, which of the two methods we pick, and the exact thresholds for killing or shipping.

`01-offering/offering.md` says each sprint carries a fixed number of test slots that flex between A/B tests and landing page iterations. This is where that flex is decided. The choice is made per sprint, not fixed by tier, based on the brand's stage, the angle, and what we are trying to learn.

## The two methodologies

### In-platform testing (Meta / Google)
We build a landing page, then test variations of how it is *served* inside the ad platform itself, usually across creative angles, audience segments, or persona hooks. The platform handles the traffic split and we read results through ad-level performance.

Best for:
- Brands testing niche or persona-specific angles, where on-site traffic alone cannot validate fast enough.
- Early-stage testing, where we are still learning which angle resonates before committing to a split test.
- High-velocity creative iteration, where the variable is the *route in*, not the page itself.

This is what "iterations" means in the offering: same page format and copy structure, nuanced copy or asset changes per angle or persona.

### Split testing (Intelligems / on-site)
We build the landing page, push traffic to it, and split-test variants on-site through Intelligems, measuring against a control with statistical resolution. Intelligems is our split-testing platform across the board.

Best for:
- Validated angles, where we want to lock in a winner with statistical confidence.
- On-page elements (headlines, hero imagery, offer mechanics, layout) where the variable lives on the LP itself.
- Brands with the volume and consistency to resolve tests cleanly within a sprint window.

## How we choose

There are too many factors to script this decisively, but the main ones:

- **Brand stage.** Earlier-stage brands benefit from in-platform testing first to find the angle, then split-testing the winner.
- **Angle niche-ness.** Highly persona-specific angles need in-platform validation before they would justify a split test.
- **Traffic concentration.** If on-page traffic is too fragmented for clean split-test resolution, in-platform is the better tool. (For low-traffic brands, split tests will not reach significance on the site at all, which is part of why the landing page programme matters: the LP is a controlled environment.)
- **What we are trying to learn.** Testing the *route in* (creative, audience, hook) goes in-platform. Testing the *page itself* (offer, layout, copy) goes to a split test.

In most engagements it is a blend. Landing pages get pushed through in-platform tests first, and the validated winners become the basis for on-site split tests. That sequence is what the test slots in each tier actually flex between.

## Kill / ship rules

This is the decision framework, the same one our automated daily Intelligems digest runs on. It is deliberately conservative: we do not act on noise, and we never kill on a single bad day.

**Primary metrics, in priority order:**
1. Revenue per visitor (RPV).
2. Conversion rate (CVR).

Exception: if subscription metrics are present (subscription order share or subscription RPV above zero), treat those as a primary lens *alongside* RPV and CVR, not instead of them.

**Minimum thresholds before any conclusion (all must be met):**
- 7 days minimum runtime.
- 50 orders minimum per variation.
- Any kill signal must be consistent for 48 hours before acting.

Anything read before these thresholds is noise. A test that ran 14 hours, or has 9 orders on a variant, tells us nothing, no matter how big the delta looks.

**Kill / pause** (only if the minimum thresholds are met):
- RPV or CVR down more than 15% vs control AND p2bb below 0.05, or
- Add-to-cart rate down more than 20% across all segments, or
- Consistent negative performance across all segment drilldowns at once.

**Call a winner** (only if the minimum thresholds are met):
- p2bb above 0.95 on the primary metric, AND
- 14+ days runtime, AND
- consistent positive signal across at least two segments.

**Double down:**
- Strong signal in one segment but not sitewide. Do not ship blind. Flag the segment and run a targeted follow-up test (and roll out only on the segment that won, e.g. US-only if the UK did not win).

**Let it run:**
- p2bb between 0.05 and 0.95, or
- mixed signals across segments, or
- thresholds not yet met.

A note on the numbers: `p2bb` is Intelligems' "probability to beat baseline". 0.95 is the ship bar, 0.05 is the kill bar, and everything in between means keep going. Win probability of 73% is directionally interesting, not a result. Some clients have a looser bar ("hundreds of visits with 2x conversion is clear to me"); we hold the p2bb bar regardless and re-test inconclusive winners rather than shipping them.

## After a winner: rollout

Rolling a winner out is its own step, not automatic. Roll out only after a consistent day-on-day win that has cleared the p2bb bar, and roll out per-segment where it won. Every launched test gets a rollout simulator / ROI projection so the business impact is documented (e.g. a coupon-activation winner logged at roughly 9% CVR uplift, 6% RPV, and ~$160k incremental monthly revenue). We report at revenue or profit level depending on what the brand will share.

## The report as a product

The daily/weekly post-click report is productised, not a one-off. It runs the kill/ship framework above against live Intelligems data and writes a per-test digest into Slack: status and primary-metric direction, the strongest segment signal, a confidence note (p2bb and orders per variant), and a conservative recommended action. It also flags big structural issues that are not tests at all, shipping thresholds being the canonical example, alongside many others. We pitch it as proof that we are always watching the account, not just the tests. Reporting fires on test launch and conclusion, not only on a fixed weekly cadence.

---

*Sources: Notion "Post-Click Deliverables" (`357b4e6a-dca1-8054-adac-d631c547998b`, "How we test"
section), "Statement of Work" (`2a6b4e6a-dca1-813f-b0f6-f420b9fd9fed`), "How we'd approach Heirloom
Coffee Roasters" (`36fb4e6a-dca1-81b9-bacb-db77c11a0fc1`). Slack: the automated Intelligems daily-digest
prompt (decision framework verbatim), #postclick-mgmt (report productisation, ts 1778064399; test-volume
reality check, ts 1779476871), and various split-test digest messages. All pulled 2026-05-30.*

*Open questions:*
- *The order minimum is **50 per variation** (confirmed by Ash, 2026-05-30). The n8n digest bot's system prompt still uses 25 and should be updated to 50 so the automated reads match the human bar. The rest of the kill/ship thresholds are also pulled from that bot config (the most precise written version we have) rather than a human-ratified SOP, so confirm them once and treat this doc as canon.*
- *Runtime: the kill/ship rules use 7-day minimum to act and 14-day minimum to call a winner. One Notion test note says "run a full 14 days and until significance." These are consistent (7 to act, 14 to declare) but worth stating once, canonically, so nobody splits the difference.*
- *Sprint test-slot counts (4/6/8 per tier in the offering) sit above what one analyst can run to conclusion at a 7-day minimum. Lucas flagged limiting to 4-8/month in a live SOW. The "tests built vs tests live" distinction (build an LP, break it into a ~4-test backlog) partly resolves this. Confirm the canonical promise: slots are tests *built/queued*, not tests *concluded* per sprint.*
