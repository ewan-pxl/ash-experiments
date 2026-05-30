# Client communication and templates

The Slack cadence, the message shape that goes out twice a week, and how we run the day-to-day.

Communication is async via Slack by default, with calls around launches and on the agreed sprint cadence. The
account / strategist owns the day-to-day client Slack and request triage. The spine of the cadence is two
performance updates a week, Monday and Thursday, consistent across every tier (see `offering.md`). Monday looks
forward at the week; the second update wraps it up.

## The twice-weekly Slack update

The shape is deliberately short and scannable: a one-line greeting, three to five bullets, a clear next step, and
no homework for the client unless there genuinely is some. Write it like a person typing fast, not a status report.

**Start of week (Monday): what is coming.**

> Good morning [name]
> Quick overview of what's coming up this week:
> - Launching the [test name] experiment
> - Concluding test [name] by end of day
> - Finalising the deck design (ETA: next few hours)
> - Walking you through the [period] roadmap on today's call
> No action needed from your side before the call. Thanks

**End of week: the wrap-up.**

> Good evening [name]
> Quick wrap-up for this week:
> - We launched 2 tests
> - Both are showing early uplift; we'll let them run through the weekend for more data
> - Landing page has moved from copywriting to design [ETA: next Wednesday]
> Next step: review results early next week and decide on scale or iterations.
> I'll send you next week's plan on Monday morning. Have a great weekend

A real wrap-up in the wild reads the same way but carries the specifics: which test concluded, the sample per
variant and the headline metric (for example "i127 $99 vs $40 shipping threshold wrapped Wednesday, ~600 sales per
variant, -9.46% RPV"), what got built and is now in QA, and what is carrying over into design or dev. That is the
level of detail to aim for: concrete numbers, named tests, honest status.

## Test-status updates

Between the scheduled updates, post test reads as they matter. Keep them plain: where the test stands, where the
wins are coming from (which pages or audiences have hit significance), and the call you are proposing. Example
shape: "Quick update on [test]: a couple of flat days, yesterday rebounded. /page-a and home have hit stat sig,
let's run another 24 hours to complete a full business cycle. /page-b had a strong day, will see how it tracks
today before calling it." Name the pages, give the direction, propose the decision.

## Calls

Calls cluster around launches and run on the sprint cadence (bi-weekly for Growth and up). Internal CRO syncs run
on the same Monday / Thursday rhythm, scheduled in the afternoon US-eastern window.

---

*Sources: Notion "Weekly Update on Slack" (`302b4e6a-dca1-8007-b11a-c17a70c80cad`, Type SOP/Prompt, owner Lucas);
`01-offering/offering.md` for the canonical cadence. Slack: #postclick-vanman (real weekly wrap-up 2026-05-29),
#postclick-humehealth (test-status update 2026-03-05), #postclick-mgmt (CRO call cadence 2026-05-21). All pulled
2026-05-30.*

*Open questions:*
- *The "Weekly Update on Slack" doc labels its two templates Monday and Friday. The canonical cadence in
  `offering.md` and the live management discussion both say Monday and Thursday. Using Monday / Thursday as
  canonical; the second template is the "end of week" wrap-up regardless of which day it lands on. The Notion doc
  should be corrected to match.*
