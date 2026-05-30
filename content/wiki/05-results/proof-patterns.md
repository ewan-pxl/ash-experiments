# Proof patterns

The transferable lessons across cases, with the numbers that back them. Use these when a pattern fits, not as a guarantee.

These are distilled from the case studies in this section (Hume Health, MASA Chips) and from the ongoing test programs across MASA, Vandy Crisps, and Vanman. Each pattern is something we have seen repeat, with at least one measured win behind it. Where a number is a projection or an estimate rather than a closed measured result, it is flagged in the case docs.

## 1. Subscription attach is usually the largest untapped lever
When a brand has real subscription intent but a buried or unclear offer, the attach-rate gain dwarfs the conversion-rate gain.

- MASA: 4.5% to 67.2% attach after rebuilding the offer and UI. The compounded RPV lift (+162%) came mostly from attach, not CVR.
- Across brands we have moved attach from 15% to 65%+, and from 10% to 50%+ (internal modelling reference).
- MASA cohort tracking: opt-in 41% (Nov) to 68% (April).

The reusable move: do not read low subscription rates as low demand. Make the value explicit, make the toggle low-friction, and reward commitment in the pricing. Test it on subscription RPV, not just CVR.

## 2. Research-first beats test-volume
Every headline win started with customer voices, not a test backlog.

- Hume: ~2,000 Pod surveys, ~1,000 Band surveys, 1,600+ live insights in week one. The rebuild targeted the two specific barriers per product.
- MASA: surveys plus on-site polls surfaced the exact frictions (price justification, buried subscription, small bags) that became tests 1 through 4 in order.

The reusable move: spend the first sprint understanding why buyers buy and what stops everyone else. Build tests against named frictions. "We ran four, in order" beats "we ran fifteen hoping something lands."

## 3. Sequence tests so each win unlocks the next
Winners compound when each replaces the control and the next test builds on what the last one proved.

- MASA's four tests stacked into a +162% RPV lift. Test 1 (proved people would subscribe) set up test 2 (removed friction to act), which set up test 3 (used the bag-size complaint), then test 4 (a shipping-threshold nudge).

The reusable move: treat the roadmap as a chain, not a list. Promote the winner to control, then attack the next named friction.

## 4. Read the metric that matches the hypothesis
Several wins would have been mis-called on the wrong metric.

- MASA test 1: a +584% subscription-RPV win behind a flat (slightly negative) CVR. CVR alone would have called it a loss.
- MASA test 2: the highest-attach variant (C, 72.0%) lost on revenue per visitor to variant D (67.2%). Attach alone would have shipped the wrong page.
- Hume BOGO and coupon tests: AOV and units-per-order moved while CVR or RPV did not. BOGO is an AOV lever, coupons do bottom-of-funnel closing work.

The reusable move: decide the primary metric before the test from the hypothesis, and judge against it. Watch CVR, RPV, AOV, attach, and units separately; they often move in opposite directions.

## 5. Timing a rebuild before a peak multiplies it
The same page change is worth more live before the surge than during it.

- Hume rebuilt three buy boxes and got them live in early November, ahead of BFCM. The measured 14-day BFCM lift was $2.98M.

The reusable move: when a peak is coming, prioritise getting the higher-converting page live before it, even if that means a tighter research-to-ship window.

## 6. Offer mechanics that repeat
Concrete levers that have produced measured wins:

- **Price decoy / quantity anchoring** to push the higher-value pack as the obvious choice (MASA test 1 and 3). Works when research says value perception, not price, is the barrier.
- **Free-shipping / free-gift thresholds** to nudge basket size. MASA $89 threshold +15.5% RPV; Vanman $80 free-gift threshold +25% RPV (+13.86% CVR, +10% AOV, +21% subscription revenue, an estimated ~$70-80K/month, still confirming at time of pull). Set the threshold meaningful enough to change behaviour, low enough not to create resistance; higher thresholds (MASA $109, $99-vs-$40 elsewhere) consistently lost on RPV.
- **Coupon activation** as a bottom-of-funnel closer. Hume 033: CVR +5.3% at 97.2%, abandonment down at 99%+ confidence. Removing it (inverted test) lifted top-of-funnel engagement but killed the close.
- **Low-friction post-purchase upsells** offering a single commonly-bought-together item, not a generic variety pack. Ancient Crunch Rebuy: MASA PXL-004 +22% RPS, Vandy PXL-004 +38% RPS. Generic or cross-brand offers lost (Golden Age Fats -80%, Vandy bundle funnel -32%).

## 7. Be honest about what is measured
The discipline that keeps these patterns credible:

- Hume's "nearly $12M" is 14 days measured ($2.98M) plus 55 days projected ($8.73M). The defensible number is the measured BFCM lift.
- MASA's $5.75M and $7.85M are models on trailing-12-month sessions and a fixed LTV, not banked revenue.
- The test program runs real thresholds: 7-day minimum, 14 days for a winner call, 50 orders per variant minimum, and confidence (P2BB) around 95%. Tests that do not clear them are not shipped, and losers (039 listicle, Vandy bundle upsell) are kept on the record.

The reusable move: when quoting a result, say whether it is measured, estimated, or projected. The credibility of the whole section depends on it.

---

*Sources: distilled from `05-results/hume-health.md` and `05-results/masa-chips.md` and their underlying sources; plus Slack `#postclick-vanman` (Vanman PXL 005 free-gift threshold 2026-05-04), `#int-ancientcrunch-postclick` (Rebuy RPS 2026-03-16), and internal subscription-lift modelling references in `#postclick-mgmt` / group DMs (2026-04-09, 2026-04-29). All pulled 2026-05-30.*

*Open questions:*
- *Vanman's free-gift result was still inside its run window when pulled (4 days, ~$70-80K/month estimated); confirm the closed-out figure before quoting.*
- *Kepos is in CRO onboarding (first test targeted early Feb 2026) with no PXL test results yet, so it is not represented as a proof point here.*