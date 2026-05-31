---
name: braindump
description: Transforms a raw brain dump into a clean, ready-to-share document. Use this skill ANY time the user starts a message with "/dump", or when they paste a stream-of-consciousness block of text and ask for it to be cleaned up, formatted, turned into a doc, made shareable, organized, or structured. Also trigger when the user says things like "word vomit incoming", "brain dump", "rough thoughts", "make this a doc", "format this for sharing", "plan for the week", "agenda for [meeting]", "notes from the call", "meeting notes", "1:1 prep", or pastes unstructured notes that clearly aren't meant to stay raw. The skill auto-selects between four output formats — polished prose, structured report, team planning, or meeting notes — and at the end always asks the user where to send the result (Notion, Slack, copy, etc.).
---

# Braindump — Brain Dump to Document

This skill takes raw, unfiltered thinking from the user and returns a single well-formatted document, then asks where to send it. The user reaches it via `/dump` followed by their brain dump, but it should also fire on natural-language equivalents like "clean this up into a doc," "plan for next week," or "notes from the call".

The user's mental model: they want to think out loud once, get back something they could send to a colleague (or to their team) without further editing, and then route it somewhere. Don't make them work harder than that.

## The four output formats

Pick one based on what the dump actually is. Don't ask the user — read the content and decide. If you genuinely can't tell between two modes, default in this order: **meeting notes** > **planning** > **report** > **polished**, because the more structured formats are easier to flatten into prose than the reverse.

### Polished mode — for finished ideas

Use when the dump represents a single coherent thought the user wants to communicate. Signals:

- One topic, one audience, one purpose (an announcement, an update, a pitch, a recommendation, a message)
- The user already has a conclusion or position — they're not trying to figure something out, they're trying to articulate it cleanly
- Phrasing like "I want to tell the team that…", "here's my thinking on X…", "draft a post about…"
- Reads like an email or LinkedIn post in rough form

Output style:
- Flowing prose, minimal structure
- A short headline or subject line at the top if appropriate to the medium
- One or two paragraph breaks; bullets only if the original genuinely had a list
- Tight — cut filler, hedges, and "um actually" tangents
- Preserve the user's voice. Don't make a casual dump sound corporate, and don't make a serious update sound chirpy
- No meta-commentary, no "here's your polished version" preamble inside the doc itself

### Report mode — for raw ideas or scoping

Use when the dump is exploratory or covers a project still being figured out. Signals:

- Multiple threads, tangents, or sub-topics
- Open questions, "I'm not sure about…", "we'd need to figure out…"
- Mentions of scoping, brainstorming, kicking off, thinking through
- Mix of facts, hypotheses, and to-dos jumbled together
- Reads like notes from a conversation with yourself

Output style — adapt the headings to the content, but reach for these as a starting set:

```
# [Concise project / topic title]

## Context
What this is about, in 2–4 sentences.

## Current thinking
The user's main ideas and direction, organized.

## Open questions
Anything the user explicitly flagged as uncertain, plus implied gaps.

## Next steps
Concrete actions, even if the user only hinted at them.
```

Add, drop, or rename sections to fit. If the dump includes risks, stakeholders, success criteria, dependencies, or alternatives, surface those as their own sections. If a section would only have one weak bullet, fold it into another section instead of padding it.

### Planning mode — for team plans, weekly priorities, agendas

Use when the dump is forward-looking, action-oriented, and organized around a time window or a meeting. Default assumption: **planning is team-oriented, not just personal** — most weekly plans involve other people, projects, and dependencies. Signals:

- Time anchors: "next week", "this sprint", "Monday", "before Friday", "Q2"
- Words like "plan", "agenda", "topics", "priorities", "things to cover", "before our call", "1:1 prep", "standup"
- Items that read as topics or tasks rather than ideas or questions
- Multiple short threads that share a time horizon rather than a theme

Output style:
- A title that names the time window or meeting (e.g. "Week of [date] — team plan", "Product sync agenda — [date]")
- A one-line goal or outcome at the top **only if the dump implies one**. If not, skip it.
- The body is a list. Numbered if order matters (agendas usually), bulleted otherwise (priority lists usually).
- Each item: short header, then 1–2 supporting sub-bullets only if the user actually said something about it. Don't pad.
- **Owners and deadlines: only include them if the dump mentions them.** If the user wrote "Sarah to follow up on pricing by Thursday", surface owner and date next to that item. If they didn't, don't invent a column or assign anyone. No default owner, no default date.
- A *Parking lot* section at the end **only if** there are items that came up but don't belong in this plan. Don't create the section just to have it.
- Time estimates: kept if mentioned, never invented.

### Meeting notes mode — for capturing what was discussed

Use when the dump is a record of something that already happened — a call, meeting, conversation. Signals:

- Past tense: "we discussed", "Jamie said", "the team agreed", "decided to"
- Mentions of attendees, a meeting name, or a date that's already passed
- A mix of decisions, discussion points, and follow-ups, often jumbled
- Phrasing like "notes from", "recap of", "we talked about"

Output style:
- Title with meeting name and date if available
- A short *Attendees* line if the user mentioned who was there. Skip if they didn't.
- *Discussion* — the substantive content, organized by topic. Short paragraphs or bullets, whichever fits the original better.
- *Decisions* — only if there were any. Crisp one-liners.
- *Action items* — list format. Same rule as planning mode: include owners and deadlines **only if the user mentioned them**, in line with the item. No invented assignments.
- *Open questions / follow-ups* — only if there are unresolved items.

Skip any section that would be empty. A meeting that only produced action items is fine as just a title and an action items list.

## Process for every brain dump

1. **Read the whole thing before writing anything.** A judgment call about which mode to use can flip on a sentence near the end (e.g. "anyway, let's discuss this Friday" turns a report into a meeting agenda).
2. **Decide mode silently.** Do not narrate the decision unless the user asks.
3. **Write the document.** Render it as a markdown artifact / file so the user can read it cleanly and copy it. Title the file something specific to the content — never "brain dump".
4. **Stay faithful to substance.** Don't invent facts, names, numbers, dates, owners, or commitments the user didn't make. If something is genuinely unclear, surface it under "Open questions" or "Follow-ups" rather than guessing.
5. **After the doc, ask where it goes.** End your message with a single short question:

   > Where would you like this to go? (Notion page, Slack draft, just copy it, somewhere else?)

   Keep it to one line. Don't list every possible destination, don't pre-format buttons, don't explain the options. The user knows their own setup.

## Routing the output

Wait for the user's answer before doing anything with the document. Common destinations and how to handle them:

- **Notion** — Use the Notion MCP tools. The user has not pre-specified a parent page, so ask once: "Where in Notion?" and let them name a parent page or paste a URL. Use `notion-create-pages` with the document title and body. Don't auto-pick a location.
- **Slack** — Use `Slack:slack_send_message_draft` to drop it as a draft in a channel they specify. Drafts not sends, unless the user explicitly says "send it".
- **Copy / show me / nowhere** — Do nothing further. The doc is already in the chat for them to grab.
- **Email / Google Doc / elsewhere** — If they name a destination you don't have a tool for, just confirm the doc is ready to copy and offer to reformat it for that medium (e.g., add a subject line for email).

If they pick Notion or Slack, confirm the destination once before creating, then create and report back with the link or confirmation.

## What to avoid

- Don't ask the user which mode to use — pick one. Asking defeats the purpose of a brain-dump tool.
- Don't include a "summary of what I changed" section. The user can see the original; they don't need a diff.
- Don't sanitize voice into corporate-speak. If the dump has personality, the output should too.
- Don't pad. A three-sentence dump becomes a three-sentence doc, not a one-pager with invented context.
- Don't invent owners, deadlines, attendees, or decisions. If the user didn't say it, it doesn't go in the doc.
- Don't create empty sections to make the doc look "complete". Drop any section the user didn't actually feed.
- Don't route automatically. Always show the doc first, then ask.
- Don't ask the destination question before the doc is written. Doc first, question second, in that order, in the same message.

## Examples

**Example 1 — polished mode**

Input: `/dump ok so I want to tell the team we're killing the Q3 onboarding redesign. data was flat, the new flow tested worse on activation, we're going back to the old one and folding the learnings into a smaller test next quarter. tone should be matter of fact not apologetic`

Output: a short Slack-ready announcement, 3–5 sentences, neutral tone, no headers, just clean prose. Then: "Where would you like this to go?"

**Example 2 — report mode**

Input: `/dump thinking about launching a paid newsletter. audience would be ops folks at growth-stage startups. not sure on price, maybe $20/mo. need to figure out what makes it different from existing ones, also whether to do it on substack or beehiiv, also content cadence`

Output: a structured doc with Context, Current thinking, Open questions (price point, platform, differentiation), Next steps. Then: "Where would you like this to go?"

**Example 3 — planning mode (team week)**

Input: `/dump plan for next week. priority is shipping the billing migration, that's on Maya, target Wed. also need to interview two PM candidates, I think Tues and Thurs. team offsite planning needs to start, someone should own that, maybe James. and we owe finance the Q2 numbers by Friday`

Output: a numbered plan titled by week, with items including Maya/Wed for billing migration, interview slots Tues/Thurs, James-owned offsite kickoff, Q2 numbers due Friday. Owners and dates surface inline because the user mentioned them. No parking lot. Then: "Where would you like this to go?"

**Example 4 — planning mode (meeting agenda)**

Input: `/dump agenda for tomorrow's product sync. want to cover the new pricing test results, talk about the roadmap reshuffle, and quickly align on hiring priorities for next quarter`

Output: a short numbered agenda, three items, no owners (none mentioned), no times (none mentioned). Then: "Where would you like this to go?"

**Example 5 — meeting notes mode**

Input: `/dump notes from the leadership call today. went over revenue, we're tracking 8% above plan. agreed to delay the EU launch by a quarter to focus on enterprise. Sam pushed back on hiring freeze, we'll revisit in two weeks. action items: dani writes the EU comms by friday, I update the board deck, we need someone to own the enterprise GTM plan, tbd`

Output: title with date, brief discussion section covering revenue + EU + hiring debate, decisions section (delay EU launch by a quarter), action items list with Dani/Friday for EU comms, user for board deck, and a tbd item for enterprise GTM ownership. Then: "Where would you like this to go?"
