# MASA Chips: turning a paid funnel into a subscription engine

Four sequential tests on one landing page, each winner becoming the next control, stacked into a subscription transformation.

MASA Chips sells seed-oil-free, tallow-fried tortilla chips, mostly through a paid-ads landing page. When they came to us in November 2025 the page converted at about 2.5% and almost nobody subscribed. Three months and four sequential tests later the page is rebuilt and the subscription attach rate is the story. Each test winner replaced the control, so the lifts compound rather than add.

## The headline
| Metric | Baseline | Current |
|---|---|---|
| Conversion rate | 2.51% | 3.34% |
| Subscription attach rate | 4.5% | 67.2% |
| Revenue per session (compounded lift) | n/a | +162% |

Applied to MASA's full paid funnel (1.28M sessions over the trailing 12 months) this models to **$5.75M+ in annual incremental revenue** versus the baseline page, and roughly 32,500 new paying subscribers a year. Most of that is the attach-rate jump, not the conversion-rate jump.

## The hypothesis
Research came first: customer surveys from existing buyers plus live on-site polls for prospects. The picture was unusually consistent.

- The seed-oil-free, tallow-fried positioning was the decisive purchase trigger (named by 72+ respondents). It was already the thing customers said to each other.
- Price was the #1 friction point, not because buyers did not see the value but because the page was not helping them justify it. One survey response: "$2.39 per ounce is the price of good steak."
- Subscription intent was high but completely buried. 10+ customers asked, unprompted, for easier reordering or bundle discounts.
- Bag size was a recurring complaint: customers wanted more, not less, once sold. That directly fed test 3.
- The emotional driver was "pleasure without penalty," guilt-free snacking with restaurant-quality crunch.

The core bet: subscription intent was always there. The page just never gave people a reason to say yes.

## Test by test
**Test 1: Price decoy + subscription redesign (Nov 13 to 21).** Introduced a price-decoy structure pushing the 8-bag pack as the obvious best value, and rebuilt the subscription offer into a prominent standalone section that actually explained what subscribing gets you. Control sub RPV $0.13, winner sub RPV $0.89. The headline was a **+584% lift in subscription revenue per visitor**. Caveat: the winning arm had 113 fewer visitors than control (0.9%, negligible).

**Test 2: SaaS-ify the subscription (Dec 23 to 28).** Made subscribing feel like signing up for software: toggle-based, low commitment, mobile-first. Four variants. The "Mobile Stacked" variant (D) won on RPV ($2.17 sub RPV vs $1.18 control). **Subscription attach jumped 38.4% to 67.2% and CVR lifted ~14.5%.** Worth noting variant C actually hit a higher attach rate (72.0%) but lost on revenue per visitor, which is why we shipped D, not C. Attach rate alone is not the decision metric.

**Test 3: Reorder pack sizes for higher AOV (Jan 21 to 27).** Customers said bags felt small for the price, so we anchored the display on larger quantities first, making 8-bag-and-up the natural starting point rather than a premium upsell. The "Qty Reorder" winner converted at 2.57% vs 2.18% control: **+17.9% CVR**, the single biggest revenue-per-session jump of the four. Caveat: both variants ran ~3.7% fewer visitors than control; included given the scale of the lift, with the caveat noted.

**Test 4: $89 free shipping threshold (Feb 6 to 19).** The page had no clear shipping incentive. We introduced and prominently communicated a $89 free-shipping threshold. RPV $2.76 vs $2.39 control: **+15.5% RPV**. A $109 threshold was also tested and lost. $89 was meaningful enough to change behaviour, low enough not to create resistance.

## The compounding effect
Because each winner became the new control, the lifts are multiplicative:

| Stage | CVR | Sub attach | Rev / session |
|---|---|---|---|
| Baseline | 2.51% | 4.5% | $2.46 |
| After test 1 | 2.40% | 39.4% | $3.61 |
| After test 2 | 2.75% | 67.2% | $5.29 |
| After test 3 | 3.24% | 67.2% | $6.23 |
| After test 4 | 3.34% | 67.2% | $6.43 |

Test 1 barely moved CVR (it actually dipped to 2.40%) but it unlocked the subscription attach rate, which is where the revenue came from. Reading test 1 on conversion rate alone would have called it flat and missed the real win.

## The subscription story
The bigger long-term impact is what the attach rate means over a year. At a 12-month LTV of $241.88 per subscriber, ~32,500 new subscribers a year models to ~$7.85M annualised subscription revenue versus a $354K baseline, a **+$7.5M subscription uplift**. The funnel does not just convert better, it builds a recurring base that compounds.

## The reusable insight
- **Sequence tests so each win unlocks the next.** We ran four in order, not fifteen at once. Test 1 proved people would subscribe if shown the value; test 2 removed the friction to act on it; test 3 used the customer's own complaint (small bags) against their hesitation; test 4 added a behavioural nudge.
- **Read the right metric per test.** Test 1 was a subscription-RPV win hiding behind a flat CVR. Test 2's winner was not the highest-attach variant. Pick the metric that maps to the hypothesis and to revenue.
- **Subscription attach is often the biggest lever and the most overlooked.** Buried intent plus an unclear offer reads as "customers do not want to subscribe." Usually they do; the page just never asked properly. 4.5% to 67.2% was an offer-and-UI problem, not a demand problem.
- **Decoy pricing and quantity anchoring move AOV when customer research already points at value perception.** These worked here because the data said price justification, not price itself, was the barrier.

## Cross-brand: Ancient Crunch Rebuy upsells
MASA and its sister brand Vandy Crisps (both Ancient Crunch) also ran post-purchase upsell/downsell tests in Rebuy. Measured RPS (revenue per session through the upsell) wins as of March 2026:

- MASA PXL-004 (website funnel): +22% RPS ($7.24 vs $5.89)
- MASA PXL-005 (4freeflavors funnel): +37% RPS ($3.99 vs $2.90)
- Vandy PXL-004 (website funnel): +38% RPS ($10.61 vs $7.66)
- Vandy PXL-003 (bundle funnel): -32% RPS (a loser, kept here on purpose)

The winning pattern across both brands was offering a single, low-friction, commonly-bought-together flavour ("choose your flavour" packs, or a specific best-attach flavour) rather than a generic variety pack or a cross-brand jar (Golden Age Fats lost by ~80% earlier). Lesson: in the post-purchase slot, reduce the decision. They already said yes to the brand; the upsell's only job is to make the add feel obvious, not to re-sell.

---

*Sources: Notion "Post-Click Results: MASA Chips" (`312b4e6a-dca1-817d-8eb5-ed8cd4e43891`) and "Net new Rebuy post-purchase split-test" (`2f4b4e6a-dca1-8004-81a3-d5b836c6ba2f`); Slack `#int-ancientcrunch-postclick` (Rebuy RPS update 2026-03-16), `#postclick-ancientcrunch` (m005 Three Column winner 2025-12-28). All pulled 2026-05-30.*

*Open questions:*
- *The $5.75M annual figure and the $7.85M subscription projection are models built on 1.28M trailing-12-month sessions and a fixed $241.88 LTV, not realised revenue. Quote them as projections.*
- *Test 4's $109 arm ran only 1,807 visitors vs ~8,400 for the other arms; that uneven split makes the $109 read weak. The $89-vs-control comparison is the sound one.*
- *Vandy's front-end landing page CVR results (the reduced 8-12-16 offer) were not yet reported as of late May 2026; only the Rebuy upsell RPS wins above are measured for Vandy.*