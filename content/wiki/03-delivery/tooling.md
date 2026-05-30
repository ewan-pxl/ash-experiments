# Tooling

The stack we run delivery on, and what each tool is for.

This is the working inventory behind the SOPs in this section. Where a tool's detailed use lives in another doc,
that doc is the reference; this is the map.

## Testing and back-end
- **Intelligems.** On-site split testing. Set up at onboarding with COGS uploaded and an A/A test to confirm the
  integration before any real test.
- **Shopify.** The platform, including headless and Liquid. The Admin GraphQL API and ShopifyQL (Plus-only for
  session data) feed the reporting automations. We hold Shopify partner access across client sites.
- **GitHub.** Theme versions of every site and project live here; Shopify holds the products and live config.

## Design and build
- **Figma.** Design and project files. html.to.design pulls components and styles in fast (see `design-dev-sop.md`).
- **Lovable.** Functional prototypes for complex functionality (buy boxes, interactive tools).

## Reporting and automation
- **N8N.** Orchestrates the Daily Vitals and Weekly Economics automations.
- **Supabase (Postgres, EU).** The data warehouse holding daily snapshots and baselines for the reports.
- **Anthropic API (Claude).** Writes the report narratives, and powers the QA smoke-test agent layer.
- **ROI calculator.** A Google Sheet (Post-Click Calculator v2); see `reporting.md`.
- **Analytics and adjacent:** GA4, heatmaps (Microsoft Clarity or Hotjar), Lifetimely, Klaviyo, Meta Ads, Google
  Ads, Looker Studio (for the monthly PDF), and Elevar for conversion-tracking validation.

## Workflow and comms
- **Slack.** Client comms and the channel the automated reports post into. Canvases per client channel.
- **Notion.** Wiki, SOPs, briefs, the CRO labs, and the onboarding-tasks database. Project execution is moving
  out of Notion (see the QA doc note on the tracker).
- **Project tracker.** Moving to a dedicated PM tool for real assignable subtasks and QA gating. Destination
  unresolved on record (Asana per the QA Gameplan, Monday.com per the Project Tracker doc); see `qa.md`.
- **Tally.** The onboarding form and customer surveys.
- **GTmetrix** (site speed) and **BrowserStack** (cross-browser) for QA.

---

*Sources: synthesised across this section's source docs, principally "Daily Vitals — Build Brief"
(`34fb4e6a-dca1-812c-a693-c5ad0ad81459`), "Data Pull for Reporting" (`2a6b4e6a-dca1-81cd-b1c9-f5d2ae69bcc1`),
"Design SOP" (`2a6b4e6a-dca1-81ac-a259-e65e4192fecb`), "QA Gameplan" (`36eb4e6a-dca1-81ea-8d08-d090894681c1`),
"Project Tracker to Monday.com" (`36fb4e6a-dca1-818c-8fb4-e8ecb604ee22`), and the Onboarding Tasks database
(`collection://32cb4e6a-dca1-81fd-967b-000b71450f49`). All pulled 2026-05-30.*

*Open questions:*
- *Project-management tool is unresolved (Asana vs Monday.com). Both proposed late May 2026.*
- *Whether N8N is self-hosted or N8N Cloud, and the pinned Shopify API version, are open developer decisions in the
  Daily Vitals brief.*
