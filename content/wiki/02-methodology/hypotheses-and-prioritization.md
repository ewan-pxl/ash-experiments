# Hypotheses and Prioritization

How a friction point becomes a written hypothesis, and how we decide what to build first.

A teardown produces a pile of observed problems. This is how we turn each one into something testable and then rank the pile, so a sprint's test slots go to the highest-leverage ideas rather than whatever is freshest in mind. Hypotheses get reviewed before they progress through the workflow (Ash signs them off at the hypothesis stage), so the format matters.

## The hypothesis table

Every hypothesis is logged as a row with these fields. This is the canonical schema.

- **Lever (primary / secondary / tertiary).** How big the lever is, the "size of significance". Primary levers are the ones we expect to move the number; tertiary are nice-to-haves. This is the first sort key for prioritisation.
- **Problem.** What was observed that could be hurting CR, AOV, or another target. Comes straight out of the research SOP (a GA4 drop-off, a Clarity recording, a lens that flagged).
- **Type.** Desktop, mobile, or global (all). Keeps us honest about where the problem actually lives, since mobile and desktop often split in opposite directions.
- **Solution(s).** The options that could solve the problem. We pose more than one rather than marrying the first idea.
- **Hypothesis.** A single clear statement to prove or disprove. It has picked one specific solution and committed to a concrete claim. The shape is: **"If we [make this change], we expect [this outcome], because [this insight]."** A hypothesis that cannot be proven false is not a hypothesis.
- **We require.** Whether it needs stakeholder involvement (extra information, or client sign-off). Flags dependencies before they become blockers.
- **Blockers (high / mid / low).** The likelihood of client push-back. A high-impact idea with a high blocker score is a conversation to have early, not a surprise mid-sprint.

The same set of hypotheses then drives the landing page structure: each becomes a section with a top-line objective, messaging requirements, and UX/UI options. The hypotheses are the spec, the page is the build.

## Prioritisation: ICE

We score each idea on three things and let the biggest drop-offs break ties:

- **Impact.** How much it could move the primary metric, weighted by how much traffic actually hits the affected step. A small lift on the hero funnel beats a big lift on a page nobody sees.
- **Confidence.** How sure we are it will work, based on the strength of the evidence behind the problem (a clear GA4 leak plus a Clarity recording is higher confidence than a hunch).
- **Ease.** Build and QA effort, and whether it needs client sign-off or new assets.

The practical rule from the SOP: start with ideas that affect the biggest drop-off points first. ICE ranks within that, the lever level (primary/secondary/tertiary) is the coarse sort, and ICE is the fine sort.

## What this is not

We do not test everything. Below the testing floor, or for best-practice fixes the lenses surface with high confidence, we ship the fix as heuristic CRO without a test. ICE is for the genuinely uncertain ideas where a test will actually resolve and teach us something.

---

*Sources: Notion "CRO Hypothesis generation" (`2a6b4e6a-dca1-81d3-9a5b-c44a090211e3`),
"CRO Research SOP" (`2a6b4e6a-dca1-81cf-aa96-d573aba3912c`). Slack #postclick-mgmt and DMs
(hypothesis-stage sign-off; ICE framing), pulled 2026-05-30.*

*Open questions:*
- *ICE is named in the SOP as "impact, confidence and ease" but we do not have a documented scoring scale (1-5? 1-10? weighting?). The hypothesis table uses lever (primary/secondary/tertiary) as its own coarse priority. Confirm whether ICE is scored numerically or is shorthand for the qualitative sort, and whether it lives in the same table as the lever field.*
- *No fixed mapping yet from the six heuristic lenses to the four levers (Motivation, Anxiety, Usability, Offer) used in the "Lever" column. Worth pinning down so the lever field is filled consistently.*
