# Onboarding SOP

How we stand a new client up: access, accounts, the first research pass, and the people who own each piece.

Onboarding runs against a Notion checklist (the "Onboarding Tasks" database), cloned per client. Most of it
lands in Week 1. The goal of the week is simple: get every access we need, stand up the workspaces and tooling,
and turn the brand's context into the first four hypotheses so the first sprint can start with a real roadmap, not
a blank page. The CRO Assistant runs the mechanical setup; the strategist owns the research and the call.

## Who does what

The roles below hold across delivery, not just onboarding. They are the spine of every other SOP in this section.

- **Post-Click Director (Ash).** Strategy for every client, the tough client conversations, reads the data and
  calls what wins and what dies, owns the sales pitch and copy direction. Currently also producing a lot of design
  (the known leak; see below).
- **Strategy (Lucas).** Day-to-day test running, routine data reads, deck and copy drafting, launch-risk
  sequencing.
- **Tech / Dev (Ewan).** All Shopify back-end, dev builds, QA gating, Intelligems setup.
- **Account / Strategist.** Day-to-day client Slack, request triage, holding the testing roadmap.
- **CRO Design Lead (hiring).** The design execution that currently sits on the Director. Until this seat is
  filled, design direction and production stay tangled, which is the single biggest capacity leak in the team.

## Week 1 setup (CRO Assistant owns the mechanics)

**Workspaces and channels.**
- Internal Slack channel (whole internal team).
- Client Slack channel (internal team plus the directors).
- Slack canvases for the channel.
- Invite the client to their channel (need an email per person).
- Notion client space: client hub, project tracker, meeting logs.
- Figma project.

**Welcome and intake.** Post a welcome message in the client channel that sets out what to expect in Week 1 and
asks for the access we need. Send the onboarding form (Tally) so we get brand context before the first call, and
offer an intro call booking link. Keep the team intro short and current (do not paste a stale roster).

**Access to get.** Shopify / CRM, analytics (GA4), heatmaps (Clarity or Hotjar, install if they do not have one),
Klaviyo, and existing brand assets. The heatmap point matters: if they lack a tool we set one up at no extra cost
and run it in month one, so behaviour data is building while early tests run.

**Tooling stand-up.**
- Intelligems: set up, upload COGS, run an A/A test to confirm the integration is clean before any real test.
- Daily Vitals reporting automation: stood up per client (see `reporting.md` for the ~30-minute per-client setup).

## First research pass (strategist owns)

- Schedule the starter call; prepare the questions and deck for it.
- Review the onboarding documentation the client returned.
- Initial website walkthrough and a brand workshop.
- Build the customer survey in Tally; draft the on-site survey and the post-purchase survey; get the client's
  feedback on them.
- Build the UI kit.
- Generate the first four hypotheses.
- Deliver the audit, then deliver the roadmap.

That sequence is deliberate: access and surveys feed the audit, the audit feeds the roadmap, and the roadmap is
what the first sprint executes against. Pricing, tier placement, and what each tier includes live in
`01-offering/offering.md`, not here.

---

*Sources: Notion "Onboarding To-dos (Updated)" (`32cb4e6a-dca1-8015-aca4-c223014b492c`) and its Onboarding Tasks
database (`collection://32cb4e6a-dca1-81fd-967b-000b71450f49`); "Client Onboarding - VanMan"
(`314b4e6a-dca1-80c3-904a-c0d98181327d`); "Send Welcome message & Onboarding Form"
(`32cb4e6a-dca1-811a-be01-daf0b07ed008`); "Create client workspace in Notion"
(`32cb4e6a-dca1-8070-8687-f0552e1a2058`); "Ash Bailey: Responsibilities" (`358b4e6a-dca1-8195-948d-c148ecee8faf`);
"Daily Vitals — Build Brief" (`34fb4e6a-dca1-812c-a693-c5ad0ad81459`, §9). All pulled 2026-05-30.*

*Open questions:*
- *The VanMan intro-message template lists a team roster that is now dated (it names Arthur, who has left, and
  predates the CRO Design Lead hire). Refresh the roster before reusing it.*
- *Onboarding tasks carry a Duration tag (mostly "Week 1") but few carry an explicit owner beyond CRO Assistant.
  Confirm owners per task if this becomes a handoff checklist.*
