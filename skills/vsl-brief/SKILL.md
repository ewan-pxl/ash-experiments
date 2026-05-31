---
name: vsl-brief
description: Produces video sales letter (VSL) scripts and a structured Notion deliverable from brand context. Designed for confessional, spokesperson-to-camera videos used in paid social, YouTube pre-roll, and homepage hero placements — works for founders, experts, customers, or any on-camera talent. Use this skill any time the user types `/vsl-brief`, asks for VSL scripts, founder videos, expert-led ads, talking-head ads, customer testimonial scripts, or asks to turn brand context into video scripts. Also trigger when the user references the Void Health TRT founder transcript style, asks for confessional or off-the-cuff video scripts, requests "themes and versions" of video scripts, or wants scripts paired with pause direction and scene direction. The skill produces three themes × two versions (polished + conversational) with pause notation, performance direction, and a Notion document that's a carbon copy of the established kēpos format.
---

# VSL Brief

A workflow for producing video sales letter scripts that don't sound like ads, plus a Notion deliverable that matches the kēpos benchmark format exactly. Built around the Void Health TRT founder transcript style — confessional, slow, the product mentioned almost in passing — paired with a more polished script-led version for variety in paid testing.

The skill works for any spokesperson type — founders, doctors, scientists, customers, athletes, voiceover-only — not just founders. The first step in the workflow surfaces who's on camera and adapts the theme generation accordingly.

## When this skill applies

The user is building short founder-to-camera video content (typically 45–90 seconds) for paid social, YouTube pre-roll, or a homepage hero. They want the founder to sound like a real person disclosing something true, not a salesperson reading copy. They have brand context, customer research, or a founder backstory available — and they want it turned into a structured creative deliverable.

Trigger this skill when:
- User asks for a VSL, video script, founder video, talking-head ad, or "video for [founder name]"
- User references "themes" or "versions" of scripts and pause direction
- User asks for confessional or off-the-cuff founder copy
- User mentions the Void Health TRT transcript or similar founder-led references
- User wants to extrapolate this exact workflow to a different brand or client

## The deliverable shape

Default structure: **three themes × two versions = six scripts.** Each script is 60–75 seconds spoken (~160–225 words). Scripts are paired with pause direction, performance notes, and a separate scene direction section.

If the user asks for a different shape (two themes, four themes, single version per theme), follow the user's lead. The structure is a strong default, not a constraint.

### Three themes

Each theme is a different psychological angle to the same product. They should pull different levers, not be variations on the same idea. Common archetypes:

- **The Founder Backstory** — personal origin, the founder's lived problem and the moment they realised the existing solutions were the wrong shape
- **The Mechanism Reveal** — why everything the customer has tried failed, and the unlock that changes the equation
- **The Missing Foundation / Reframe** — a new way of seeing the problem that recontextualises the customer's whole journey

Other angles depending on brand: the iron/ferritin angle (for gut health), the identity-loss angle (for hormone-related products), the specific-customer-segment angle (for category-defining products). Pick three that pull genuinely different levers.

Each theme should have an explicit "aha moment" — the single sentence that makes the right viewer say "oh, *that's* why."

### Two versions per theme

- **Version A · Polished (script-led).** Tighter cadence, declarative tone. Read aloud from teleprompter. Best for paid social where pace matters. **Target: 195–210 words, ~70s runtime.**
- **Version B · Conversational (off-the-cuff).** Confessional tone, modelled on the Void TRT founder transcript. Should feel unrehearsed. Best for YouTube pre-roll and longer-form environments. **Target: 225 words, ~75s runtime.**

The B-version is not just "the A-version with contractions added." It is structurally different. See `references/conversational-craft.md` for the full breakdown — read it before drafting any B-versions.

Word count tolerance is ±5 words per script. B-versions should consistently land near 225 — they need the extra runtime room to breathe. See `references/notion-template.md` for the exact per-script targets that match the kēpos benchmark.

## Workflow

### Step 1: Gather context before drafting

Do not start writing scripts cold. The skill works because the scripts are grounded in real founder language, real customer pain points, and real product mechanism. Pull from:

1. **Brand context document.** A messaging guide, LLM instruction manual, copy bible, or equivalent. If the user has a Claude Project with a knowledge document, use it. If they don't have one, ask for one or interview them for the equivalent.
2. **Founder backstory.** Specific details — years of suffering, specific things tried, specific failure moments, who they partnered with, where they worked before. Generic founder stories die fast. If the user hasn't shared this, ask. Search the brand's website for an "our story" or "about" page.
3. **Customer survey data or testimonials.** Real customer language for pain points. Phrases like "I've tried everything," "I felt broken," "every supplement made me worse" — these are the emotional anchors that ground the B-versions.
4. **The reference style.** The Void Health TRT transcript is the canonical reference for the conversational tone (see `references/void-reference.md`). Read it before drafting.

If the user is missing one of these, say so and ask. Don't bluff your way through — the scripts will read as generic if grounded in nothing.

### Step 2: Write the scripts

For each theme:

1. **Define the aha moment first.** One sentence. What does this script make the viewer realise?
2. **Write Version A (polished) first.** Lead with the aha. Use declarative cadence. Keep beats short. End on a clean reframe, not a CTA.
3. **Write Version B (conversational) second.** Read `references/conversational-craft.md` to internalise what "conversational" actually means structurally. Then write a different script — not a rewording. The B-version should:
   - Open on a moment of admitted vulnerability or frustration, not on the product or the mechanism
   - Use trail-offs ("and then we just... stopped having access to it") with mid-sentence beats
   - Mention the product once, late, almost as an afterthought
   - End on flatness or a quotable reframe, never on a CTA
   - Use "yeah, so..." or "honestly" or "the thing is" sparingly — one or two per script

### Step 3: Add pause direction

Add pause notation to every script. Three tiers plus italics:

- `[beat]` — short, ~0.5s. A breath. Used for rhythm.
- `[pause]` — medium, ~1–1.5s. Lets a line *land*.
- `[long pause]` — ~2s+. One or two per script max. Reserved for the heaviest moments.
- *Italics* — verbal emphasis. Words to slow on or weight slightly.

After each script, include a short "pause logic" note (collapsed in Notion as a toggle) explaining what the long pauses are doing, where the rhythm shifts are, and which lines need the most space.

See `references/pause-notation-guide.md` for the full rules and worked examples.

### Step 4: Add scene direction

Write a tight scene direction section covering framing, lighting, set, wardrobe, and performance. Keep it short — this is direction, not a film school essay. Use the structure in `references/scene-direction-template.md`.

The reference benchmark is the Void TRT founder shot: mid-shot sternum-up, soft natural light from camera-left, blurred shelving with plants and books behind, navy collared shirt with a discreet brand mark, sitting not standing, locked-off camera, eye line slightly above lens. A "hint of researcher" through environment, never through props.

### Step 5: Add performance direction for the founder

Two directions matter most:

1. **"Read each script 5–10 times until you've internalised the shape, then put the page down and just talk."** The best founder takes happen after the script becomes muscle memory and the founder stops thinking about it.
2. **"Switch things up on the fly."** If a word feels more natural, use it. The script is the map, not the territory. Lock only the product name, the two key ingredients/features, and the central aha — everything else is theirs to shape.

Include both directions prominently at the top of the Notion deliverable, in a callout block.

### Step 6: Build the Notion document

If the user has Notion connected, build the document directly in their workspace. Use the structure in `references/notion-template.md` — the rendering order, escaping rules, and formatting are non-negotiable if the doc is meant to look like the kēpos benchmark.

Key things to get right (full details in the template reference):

- **Title icon is always 🎙️.** Title format: `Founder VSL Scripts for [Name]` (or replace "Founder" with the spokesperson type).
- **Render order:** intro callout → How to use → **Scene direction (with image space)** → Pause notation → Theme 1 → Theme 2 → Theme 3 → Direction notes. Scene direction comes BEFORE the themes, not after.
- **Pause notation must be escaped:** `\[beat\]`, `\[pause\]`, `\[long pause\]`. Tildes too: `\~0.5s`. Otherwise Notion mangles them.
- **Word counts in inline code** (backticks), not italics: `` `195 words / 70s` ``.
- **No `<details>` toggles, no background-colour modifiers on headings** — both were in the original draft and neither survived in the rendered doc.

Place the document under the brand's main Notion page if one exists. Search for it before creating. Confirm the location before writing if there's any ambiguity.

After publishing, tell the user to drop their reference image (Void-style still or equivalent) into the Scene direction section under the goal callout — image upload is manual.

## Deliverable structure

The full Notion structure — including escaping rules, render order, callout syntax, word count formatting, and per-script targets — lives in `references/notion-template.md`. Read it before publishing. It's a carbon-copy spec derived from the rendered kēpos benchmark, not a sketch.

Quick reference of what the rendered doc contains, top to bottom:

1. Italic intro in a gray callout
2. **How to use this document** (H2) — with the founder note as a bold callout-style line + bullets
3. **Scene direction** (H2) — gray callout with goal, then reference image placeholder, then Framing/Lighting/Set/Wardrobe/Performance H3 sections
4. **Pause notation** (H2) — three escaped bullets + a blockquote about long pauses
5. **Theme 1: [Name]** (H1) — gray callout with description and aha line, then Version A (H2) and Version B (H2), each with script and inline-code word count
6. **Theme 2** (H1) — same structure
7. **Theme 3** (H1) — same structure
8. **Direction notes** (H1) — with `## For [Name]` (H2) and `## For the producer / director` (H2)

## Writing style — what to avoid

The B-versions are the part most likely to go wrong. Common failure modes:

- **Polished copy with contractions sprinkled in.** This is not conversational. Conversational means structurally different — different opening, different rhythm, different ending.
- **Trail-offs that aren't earned.** "And, you know, like..." reads as filler. "And then we just... stopped having access to it" reads as someone finding the right word in real time. The difference is whether the trail-off is doing work.
- **Product mentioned in the first 30 seconds.** In confessional cadence, the product appears late. Sometimes only in the final 10 seconds.
- **A CTA bolted to the end.** B-versions are doing pre-conversion work. Let the next frame in the ad do the asking. Ending on a stat (Void's "1 in 4 men have low T") or a flat reframe ("That's the whole thing") is correct.
- **Generic founder language.** "I'm passionate about..." / "I founded this because..." dies on impact. Specifics — years, weights, names, places — are the texture that makes confessional cadence work.

## Reference files

- `references/conversational-craft.md` — How to actually write the B-version. Read before drafting any conversational script.
- `references/void-reference.md` — The canonical reference transcript (Void Health TRT founder). Read once to internalise the tone.
- `references/pause-notation-guide.md` — Full rules for [beat] / [pause] / [long pause] with worked examples.
- `references/scene-direction-template.md` — Tight scene direction template. Five short sections.
- `references/notion-template.md` — Exact Notion document structure with formatting (colours, callouts, toggles).
