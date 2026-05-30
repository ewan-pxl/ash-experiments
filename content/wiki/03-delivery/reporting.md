# Reporting

The three reporting products: the daily Shopify lookback, the weekly economics report, and the ROI calculator.

`offering.md` sets the cadence at a high level (twice-weekly Slack updates, a daily Shopify lookback for Growth and
up, a mid-month written update, monthly reporting). This doc is the actual product behind it. Two of the three are
automated and run themselves once a client is configured; the third is a sales and account artifact.

A note on why this exists at all. The daily and weekly automations were built and productized after a costly
back-end mistake: a free-shipping toggle left on inside a subscription app went unnoticed for roughly two months
and cost a client around $200k before they caught it themselves. The lesson stuck: day-to-day performance
reporting tracks sessions and conversion, but it does not catch slow structural margin erosion. The weekly report
is the fail-safe for exactly that, and the pair of them is now something we pitch as proof we are ahead of
problems, not reacting to them.

## Daily Shopify lookback ("Daily Vitals")

One Slack message per client, every morning, posted to the client channel by an automated workflow. It answers two
questions in under thirty seconds: did anything break yesterday (acute anomalies), and is anything quietly getting
worse (chronic drift).

**What it shows.** A top-line block (sessions, CVR, AOV, new vs returning) with two comparisons per metric:
yesterday vs the trailing 7-day average, and yesterday vs the same-day-of-week average. Then flags, the top
products by orders, and a short AI-written narrative that connects the anomalies and recommends one concrete next
action. For subscription and hybrid brands, headline metrics are computed on one-time-purchase (OTP) orders only,
with subscription orders shown in a separate context block. Conflating recurring billing with acquisition orders
inflates returning-customer percentage and depresses headline CVR, so they are split at the data layer.

**The shipped format is the simple one.** The original build brief carried heavy product and discount tables; the
call was made to cut them down. The live report shows the top three products (with order counts) and the top three
discount codes (by usage), plus the top-line block with its 7-day and day-of-week deltas. That is the canonical
shape. Resist re-bloating it.

**How flags fire.** Each metric is compared against baselines with promo days excluded.
- *Acute:* flagged only when both the 7-day and the same-day-of-week comparison exceed the threshold in the same
  direction, and the page or product clears a minimum volume (default 300 sessions).
- *Chronic:* flagged when the trailing 7-day average deviates from the 28-day baseline beyond the threshold and
  the direction has held for 5 of the last 7 days.

The AI writes the narrative only. All anomaly detection and thresholds are deterministic, not model output.

**Per-client setup (~30 min).** Confirm the brand is on Shopify Plus (session data comes from ShopifyQL, which is
Plus-only). Create a custom app with `read_orders`, `read_all_orders`, `read_reports`, and Level 2 customer data
scope. Add the client config row (shop URL, token, Slack channel, timezone, brand type, subscription tags). Pull
the last 90 days of revenue per product, take the Pareto top 80%, and agree the 5 to 15 tracked products tiered
hero / secondary / watch with the strategist. Backfill 35 days of snapshots so detection works from day one.
Trigger the first run manually into a test channel, validate, then move it to the client channel on a cron set to
08:00 client local.

## Weekly economics report

A separate automated Slack message, posted Monday morning (9am client local), covering the previous Monday to
Sunday. Where the daily lookback watches performance, the weekly report watches unit economics: the silent
margin risks that change without anyone noticing and compound for weeks.

Weekly is the right rhythm because rebill orders need a 7-day window to average meaningfully, some app-level bugs
only surface on weekly billing cycles, and it gives the AM team a Monday ritual: review, then raise with the
client the same day.

**Triaged into three tiers** so the client sees immediately what needs attention:
- **Flagged** (rotating light): confirmed deviation outside range, action required.
- **Watch** (eye): drift detected, may be intentional, worth confirming.
- **Clean** (check): explicitly checked and within range.

The Clean section is deliberate. Knowing what was monitored and confirmed healthy is as valuable as knowing what
broke. It tells the client that the absence of a flag means absence of a problem, not absence of monitoring. Each
flagged item carries a quantified impact estimate, an approximate drift start date, and a recommended action, plus
a short AI narrative tying it together.

**What it watches.** Metrics compared against a trailing four-week baseline, promo weeks excluded:
1. **Shipping economics:** avg shipping revenue per order (OTP and SUB), % of orders with $0 shipping, shipping as
   a % of order value. This is the category that would have caught the $200k toggle.
2. **Discount economics:** depth, penetration, effective rate, top codes by usage and dollars given away, and any
   new code appearing for the first time this week.
3. **Refunds and disputes:** refund rate, refund count week over week, most-refunded products.
4. **Subscription health (sub brands only):** rebill AOV, rebill avg shipping, rebill avg discount, new signups,
   failed payment count. Rebill orders are the most stable orders in any subscription business, so drift here is
   always meaningful.
5. **AOV in relation to COGS:** AOV, average COG, and the ratio. If AOV holds but COGS climbs, flag it.

Two further categories (tax economics and price integrity) are scoped in the SOP but currently deprioritised.

**What it does not cover:** issues with no financial signal (an email flow switched off, a broken pixel, a PDP bug
that does not move unit economics) need a separate monitoring layer; real-time alerting (this is weekly, the daily
report carries same-day acute issues); and root-cause diagnosis (it names symptoms and likely areas, the fix still
needs hands in the relevant app).

## The manual week-on-week pull

Older monthly reporting still runs partly by hand: a roughly 20-minute pull from Shopify (ShopifyQL), Lifetimely,
Meta, Google, and Klaviyo into a master week-on-week sheet, then assembled into a Looker Studio PDF with comment
boxes. Export to CSV and use Notion's insert-new-sheets import for Shopify, Meta, and Klaviyo; input Lifetimely and
Google manually. Always store plain decimals (a Google CVR of 5.47 goes in as 0.0547).

## ROI calculator

A Google Sheet (Post-Click Calculator v2), the current version Ash built end of March 2026 with a video explainer.
It is the artifact used to frame projected return for prospects and accounts, and it replaces the earlier scattered
ROI sheets.

How it works: the team plugs the brand's numbers into the yellow input column (it does not matter how those numbers
are sourced), and Ash fills the incremental-lift projections in the green columns. From there you can report at
revenue level or profit level, depending on how much financial detail the brand will share.

---

*Sources: Notion "Daily Vitals — Post-Click Snapshot Workflow (Build Brief)" (`34fb4e6a-dca1-812c-a693-c5ad0ad81459`)
and the simplification comment within it; "SOP: Catching Website Errors" (`357b4e6a-dca1-81c0-bd24-c7b283956870`);
"Data Pull for Reporting" (`2a6b4e6a-dca1-81cd-b1c9-f5d2ae69bcc1`); "Post-Click Calculator v2"
(`334b4e6a-dca1-805f-9285-e76c15b245f4`). Slack: #postclick-mgmt (ROI calculator announce 2026-03-30; report-product
pitch 2026-05-06), #int-kepos-postclick and #int-ancientcrunch-postclick (live Daily Vitals and Weekly Economics
messages, 2026-05-18 and 2026-05-25), and the management group DM (incident genesis 2026-05-05). All pulled
2026-05-30.*

*Open questions:*
- *Several developer open questions in the Daily Vitals build brief are unresolved (API version pinning,
  partial-failure policy, promo-day registry workflow, AI cost ceiling, OTP-to-sub opt-in calc). The live
  automation runs the simplified version, so these are refinements, not blockers.*
- *Tax economics and price integrity are written into the weekly SOP but struck through / deprioritised. Confirm
  whether they are dead or parked before promising them to a client.*
