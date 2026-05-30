# The CRO Research SOP

How we go from a live site to a ranked list of things worth testing.

Every engagement runs the same research loop. We do not start by redesigning. We start by finding where the money leaks, working out why, and only then deciding what to change. The point of the SOP is that the test ideas we ship are traceable back to an observed problem, not to taste. It is a seven-step loop, and step seven feeds back into step one.

## The seven steps

1. **Map the customer journey.** Break the site into stages: Landing, Explore, Engage, Checkout, Purchase. This gives us a clean path to analyse where users drop and why, rather than treating the site as one undifferentiated blob.

2. **Find the drop-off points.** GA4 is the workhorse. We look for high-traffic pages with low conversion, sudden exits between funnel steps, and segments that underperform (mobile, first-time visitors). Traffic plus a leak is where the leverage is.

3. **Watch real behaviour.** Session recordings (Microsoft Clarity) to see how people actually move. We are hunting for confusion, hesitation, loops, missed CTAs, and frustration signals (rage clicks, dead ends). The numbers tell us where; the recordings start telling us why.

4. **Diagnose the friction.** For each key step, run it through the six heuristic lenses (below). These are how we tag and track issues so a teardown produces a consistent, comparable read rather than a list of opinions.

5. **Generate hypotheses.** Turn each friction point into a test idea in the house hypothesis format (see `hypotheses-and-prioritization.md`). The short version: "If we [change], we expect [outcome], because [insight]."

6. **Prioritise and test.** Score each idea on impact, confidence, and ease (ICE). Start with the ideas that hit the biggest drop-off points first. How we then choose between in-platform iteration and an on-site split test is in `testing-methods.md`.

7. **Learn and iterate.** Whether a test wins or loses, log the insight. Wins become the new standard (the control to beat next time); losses sharpen the next hypothesis. Nothing gets thrown away.

## The six heuristic lenses

These are the questions we ask at every step in step 4. They are diagnostic, not a scoring formula, and they double as the language we tag issues with.

- **Clarity.** Is the message clear?
- **Relevance.** Does this feel relevant to the user's intent (especially the intent of the ad or angle that sent them)?
- **Anxiety.** Is anything creating doubt or hesitation?
- **Distraction.** Is anything pulling attention away from the one thing we want them to do?
- **Urgency.** Is there any reason to act now?
- **Value.** Does the value actually shine through?

## Where the deeper teardown sits

When we do a full page teardown, we also weight each page on the conversion-sequence factors: Motivation, Value proposition, Incentive, Friction, Anxiety (MVIFA). It is not an exact calculation. It is a way to judge a page on principles rather than tactics, so we can say what is structurally good or bad about a page before we argue about specific elements. The heuristic teardown is the artifact we hand to a designer or attach to a "how we'd approach" doc.

For brands below the testing floor (see `01-offering/offering.md`), the SOP still runs, but it terminates at heuristic CRO: we fix the best-practice issues the lenses surface, without waiting for test validation, because at that volume tests will not resolve cleanly anyway.

---

*Sources: Notion "CRO Research SOP" (`2a6b4e6a-dca1-81cf-aa96-d573aba3912c`), "CRO Strategy Frameworks"
(`31ab4e6a-dca1-803e-baa1-f85a054afea2`), "Page Analysis & Heuristic Teardowns"
(`2a6b4e6a-dca1-81c5-a533-d80b6e8d34c0`, archived). All pulled 2026-05-30.*

*Open questions:*
- *The SOP lists six lenses (Clarity, Relevance, Anxiety, Distraction, Urgency, Value). "CRO Strategy Frameworks" lists a separate "Four Levers" (Motivation, Anxiety, Usability, Offer) and the teardown page uses MVIFA. These are three overlapping vocabularies for the same thing. Treated here as: six lenses for diagnosis, MVIFA for whole-page scoring, four levers as the high-level grouping in the hypothesis table. Confirm whether the team wants one canonical vocabulary.*
- *The "F\*ck it" Moments framework (8 decision triggers: Aha, Proof, Cost-Benefit, Scarcity, Social Proof, Authority, Reciprocity, Identity) lives in the same Notion doc and is closer to copy/offer strategy than research. Not folded in here. Flag if it should live in `90-reference/`.*
