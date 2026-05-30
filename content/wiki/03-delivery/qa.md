# QA

How we keep bugs off live sites: the gating rules, the hands-on dev method, the AI smoke-test layer, and the launch-risk gate.

QA got a hard reset in May 2026 after a run of bugs slipped through, mostly on technical sections being touched for
the first time, and after the free-shipping incident that cost a client around $200k. The honest internal read was
that the team was finding the breakpoints but the system around them was not holding: tracking was spread across
Slack threads and Notion comments, QA was happening too late and sometimes by the person who built the thing, and
launch sequencing was not looked at through a risk lens. The system below is the fix.

## The bar

Nothing ships without a named person other than the builder having put their eyes on it, against a checklist, with
the ticket closed in one place. That person is responsible. Everything else is mechanism for holding that line.

## Project tracking and subtasks

Project execution moves out of Notion into a dedicated project-management tool (Notion stays for wikis, SOPs,
briefs, and the CRO labs). The reason is real, assignable subtasks: a Notion checkbox cannot carry an owner, a due
date, a status, or trigger anything, so "did you do the thing" was living in honour-system ticks.

Every project is broken into subtasks before work starts. No subtasks means not ready to start. Each subtask has
one owner, one due date, one status. The standard blueprint, lifted from the existing process:
- **Strategy:** strategy doc done, link added, sent for review, formatted via the briefing skill.
- **Design:** Figma link, first internal draft, open and closed designs polished, assets finalised and in Google
  Drive, internal review, client feedback, final design in the workbook.
- **Development:** built, back-end and product content created where needed, CMS content uploaded, preview link,
  customizer link.
- **QA:** CMS content checked, dev queries pushed back to the developer, Design QA (UX/UI, copy, mobile),
  Technical QA (technical, GTmetrix site speed, BrowserStack), internal review, client feedback, then for split
  tests only the Intelligems setup and link and the page created and assigned in Shopify admin.

QA subtasks are non-optional and assigned to someone other than the builder. No test goes live until that QA
subtask is closed.

## The no-self-QA rule

The single biggest fix. The builder is the worst person to find their own bugs, so the build and the sign-off
always sit with different people (if Ewan built it, Kim signs it off, and vice versa). Sign-off is a closed QA
subtask by the non-builder, not a "checked it" in Slack. Project complexity sets the depth.

A standing QA checklist lives in Notion and is referenced from every QA subtask: mobile, desktop, Safari, slow
connection, edge-case flows, analytics firing, no console errors.

## Hands-on dev QA method

When QA'ing a build:
1. QA one aspect ratio at a time.
2. Go section by section.
3. Cover UX/UI and interactions before moving on to CMS content.

Set the browser up with the inspect tool open, dev tools minimised, dimensions set to responsive, and step through
the standard device sizes (iPhone SE 375x667, iPhone 12-15 390x844, Pro Max 430x932, Pixel 7 412x915, Galaxy S22
360x800, iPad 768x1024, iPad Pro 1024x1366, laptop 1280x800 and 1440x900, desktop 1920x1080, plus larger). Site
speed is checked with GTmetrix and cross-browser behaviour with BrowserStack.

## Launch-risk sequencing (a gate, not a vibe)

Before anything ships, a one-paragraph risk note answers three things: what is most likely to break, what the blast
radius is if it does, and what should go first to reduce that. No project moves to build until the risk-ordered
sequence is written on the parent task.

The framing example is the cart: rolling out a cart *app* before reinstating the native cart is lower risk than the
reverse, because you can pull the app without unwinding a migration. This is not theoretical. A live shipping bug
on a client's third-party cart app (banner price not matching cart, dozens of confused-customer emails) was
resolved exactly this way, by moving to a native cart we control. Lower-risk-first, reversible-first.

## AI smoke-test layer (in front of human QA)

A fleet of agents that runs before human QA and produces a pre-QA report, so the human starts with a map instead of
a blank page. It focuses the human pass, it does not replace it. Cheap enough to run on every ship, which is the
point: QA happens more often, not just on major launches. Built as a Claude Code skill with per-client config
(Figma tokens, codebase access, brief location), output posted to the project's parent task.

Four agents plus an orchestrator, each with durable role memory, each driving the page like a human (Playwright):
- **Site-wide regression agent.** Crawls the whole site after each ship, from announcement bar to footer links, to
  catch anything degraded outside the feature being touched. No human realistically does this every ship.
- **Design / UX agent.** Loaded with the client's Figma tokens and the feature brief; checks the build against
  design intent (token drift, spacing, type, hover states, responsive). Needs codebase access.
- **Functionality agent.** Pure functional layer: load times, interaction speed, rapid clicks, products behaving
  inside the feature, anything that breaks under real use.
- **Project-manager / orchestrator agent.** Takes the three outputs and writes one severity-ranked pre-QA report
  with the specific URLs, components, and interactions to inspect. This is what the human QA opens first.

Agents have access to the live Shopify sites and back-end code via partner access, the GitHub theme versions of
every site, and the tokenised brand-guideline JSON per brand, selected per brand through a simple internal app.

## Where this is in rollout

Phased on purpose. Move active projects onto the new tracker and set the subtask + QA-gate rule first; then
no-self-QA plus the checklist and the risk notes; then add the design/dev snag session to the rhythm. The AI agent
layer runs as a parallel track, piloted on the most technical client in flight, refined against what human QA still
catches, then rolled across accounts. Ewan owns QA gating and the agent layer; Lucas owns launch-risk sequencing.

---

*Sources: Notion "QA Gameplan" (`36eb4e6a-dca1-81ea-8d08-d090894681c1`); "Development QA SOP"
(`2a6b4e6a-dca1-81da-803b-c8654f5d2301`); "Project Tracker to Monday.com" (`36fb4e6a-dca1-818c-8fb4-e8ecb604ee22`)
for the subtask blueprint. Slack: #postclick-mgmt (smoke-test agent spec 2026-05-29; QA leak 2026-05-28), the
management group DM (incident 2026-05-05), and #postclick-vanman (cart-risk example 2026-05-26). All pulled
2026-05-30.*

*Open questions:*
- *Tool conflict: the QA Gameplan says project tracking moves to Asana; the Project Tracker doc says Monday.com.
  Both are dated late May 2026 and neither supersedes the other on record. The QA mechanics (assignable subtasks,
  QA gate, no-self-QA) hold regardless of which tool wins. Confirm the destination before writing it as fact.*
- *The design/dev "snag session" cadence (once per major project pre-launch plus a 30-minute weekly catch-all) is
  proposed in the Gameplan but may not yet be a standing fixture. Confirm it is running.*
