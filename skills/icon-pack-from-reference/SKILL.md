---
name: icon-pack-from-reference
description: Generates a coherent pack of icons (illustration, photography, or other visual style) from a reference image or reference pack. Extracts a style profile from the reference, scopes a brief with the user, maps each subject to its concept, then writes byte-identical-style prompts varying only subject and constraints. Use when the user has a reference image or pack and wants to produce a set of icons that match its style for a specific brand or use case. Triggers include "/icon-pack", "build an icon pack from this reference", "make icons in the style of...", "icons for [brand/section] matching this style", "I need a set of icons that look like these", "swap in different icons for this section", and natural phrasing like "use this style for X" or "I want icons that match this".
---

# Icon Pack from Reference

## What this skill does

Takes a visual reference (single image or pack) and produces prompts for a set of icons that share its style but cover different subjects. Outputs prompts only. The user's Weavey or other generation tool runs them.

The skill works across any visual style: hand-drawn illustration, hyper-real photography, 3D render, woodcut, anything. The style extraction adapts to the medium.

## When this skill applies

The user has a reference image (or pack) and wants to generate icons that match its style for a specific purpose.

Common patterns this skill handles well:

- **From-scratch icon pack.** New project, reference pack supplied, build N icons covering different subjects.
- **Swap-in alternative system.** Existing icon system in place, build a different visual treatment of the same subjects.
- **Single section, focused brief.** One section of a page, 3-6 icons needed in a specific style.

Do NOT trigger when:
- The user wants a single image, not a pack
- The user wants product photography with a specific product preserved (use `locked-product-scenes`)
- The user wants a paired variant of an existing image (use `pair-image`)
- The user doesn't have a reference image. This skill needs a style anchor.

## Core principles

These are non-negotiable. Earned across multiple test projects, not guesses.

### Lock once, vary the rest

The style profile is the anchor. The locked language must be byte-identical across every icon in the pack. Same words, same order. Drift in lock language causes drift in style. If a property feels miscalibrated mid-pack, do not escalate the language on the next icon to fix it. That creates a split style. Either commit to one style language and fix calibration issues in post-production, or regenerate the whole pack with the corrected language.

### The reference image is part of the description

Whenever generation requires a reference image, feed it as an actual image input alongside the prompt. The reference is the description of the style. The prompt language tells the model what to do with that style; the image tells the model what the style is. Both are needed.

### Subject distinctness check happens at concept lock

Before writing any prompts, mentally squint at the proposed subjects. Any two that share form (two animals, two plants, two containers, two abstract shapes) need scrutiny because they may collide at thumbnail size even if the subjects themselves are different. Make this a deliberate step at the concept-lock stage, not something caught later in generation.

### Each icon generates independently

Regardless of whether reference accumulation is used, every icon should be generatable on its own pass. Do not build prompts that depend on prior outputs being in context. That creates batch fragility. Each icon equals its own prompt plus reference(s) plus run.

### Regenerate, don't batch-fix

When a property needs to change across multiple already-generated icons (stroke weight, colour, proportion), regenerate each individually with the updated property. Do not batch them through a compositor and ask for "the same pack but with X changed". The model treats batched modifications as compound edits and drifts on locked elements. The deterministic path is single-pass per icon.

### Concept layer is sometimes required

When the visual is literal (the icon depicts its subject directly, e.g. a cow icon shows a cow), no concept layer is needed. When the visual is evocative (the icon represents its subject through metaphor or material, e.g. a creamy whipped texture represents tallow), a three-step mapping is required: **subject to quality to texture or material**. This layer happens before prompt writing.

### Style schema flexes by medium

Style extraction adapts to the visual medium. Illustration needs stroke/tool/fill/character properties. Photography needs framing/lighting/depth-of-field/treatment properties. Don't force one schema onto the wrong medium. Extract what's actually present in the reference.

### High-variance subjects need explicit handling

Hands, faces, and text are the three highest-variance subjects in image models. They have such broad training that they fight prompt anchors. When a subject involves any of these, flag it proactively during brief scoping and either swap the subject or include explicit anchor language. Never assume hands/faces/text will land cleanly without specific handling.

### Negative space is a named property, not an assumption

Image models default to filling available space with detail. If the reference has breathing room between elements, name "negative space" explicitly in the style profile as a first-class property, with specific anchor language ("internal elements sit visibly inset from outer outlines with clear empty space around them"). Otherwise the model will pack detail tight even with simple subjects.

### Tool/material referents trump weight descriptions

For stroke or texture properties, naming a concrete tool or material ("fine felt-tip pen", "chunky permanent marker", "shot on a 100mm macro lens") outperforms abstract descriptions ("medium-thick weight", "high detail"). Tool referents map to large, consistent training regions in image models.

### Post-production is part of the workflow

Some style choices (stroke thickness in line art, exact colour matching, final cropping) are better handled downstream in Figma or similar tools, not by fighting the generation step. The skill should call this out where relevant rather than treating generation as the final step.

## The interview

Always run the full interview. Use ask_user_input_v0 with tappable buttons where there's a clear option set; use prose questions when the answer needs description; use plain conversational brainstorming when proposing subject concepts.

### Stage 1 - Confirm the reference

Confirm what's uploaded:

- **Single reference image or a pack?** Multiple tiles together vs one image.
- **What medium?** Hand-drawn illustration, hyper-real photography, 3D render, woodcut, watercolour, etc. Affects which style schema to use.
- **Is this the entire style canon, or a starting point?** Sometimes users supply one reference and expect the skill to interpret loosely.

If the reference is ambiguous (e.g. a pack with multiple sub-styles within it), ask which specific sub-style to extract from. Do not average across mixed styles.

### Stage 2 - Style extraction

Extract a style profile from the reference. Show it back to the user before proceeding. The user corrects or confirms.

The schema flexes by medium. Below are the two medium-specific defaults; adapt as needed for hybrid or unusual styles.

**For illustration (hand-drawn, line art, vector-style, woodcut, etc.):**

```
STYLE PROFILE
- Stroke: [weight, end caps, taper, hand-wobble level]
- Tool implied: [felt-tip / brush / chiselled marker / pen / etched line]
- Fill: [outline-only / partial fills / always filled]
- Detail level: [strokes per icon approx, what's omitted]
- Proportional character: [textbook-correct / slightly wonky / heavily stylised]
- Character logic: [objects personified, when, what features]
- Shadow: [flat oval / none / sometimes]
- Negative space: [tight / generous / variable]
- Colour: [single ink + paper colour]
- Composition: [centred subject, margin proportions]
- Vibe modifiers: [3-5 character words]
```

**For photography (macro, lifestyle, product, food, etc.):**

```
STYLE PROFILE
- Framing: [close-up macro / medium / wide / aspect crop]
- Subject treatment: [subject-fills-frame / object-on-background / environmental]
- Lighting: [direction, quality, source character]
- Depth of field: [shallow / extreme / deep]
- Colour grade: [saturation, warmth, processing character]
- Texture register: [what the image is fundamentally about: texture, light, form, mood]
- Treatment: [photo-real / stylised photo / hybrid]
- Background: [present, colour, texture, role]
- Vibe modifiers: [3-5 character words]
```

For other media (3D render, painted, mixed), build the schema from what's actually present. Don't force-fit an existing template.

After extracting, run a short calibration check with the user. Flag anything ambiguous in the reference and confirm which way to lean.

### Stage 3 - Brief scoping

Ask four questions in succession:

1. **What is the pack for?** (web page section, packaging, social, deck). Sets framing constraints.
2. **At what display size?** Web icons at 24-48px need different stroke weight, contrast, and detail level than icons at 200px+. This question prevents miscalibration later. If the user doesn't know exactly, anchor to a rough scale: small (under 50px), medium (50-150px), large (150px+).
3. **How many icons?** Cap at one-at-a-time for first few, then batch. For more than 6, suggest doing in groups by section.
4. **What's the register?**
   - **Literal:** The icon depicts its subject directly.
   - **Evocative:** The icon represents its subject through texture, metaphor, or material.
   - **Mixed:** Case-by-case per subject.

If the register is evocative or mixed, run the concept mapping in Stage 4. If purely literal, skip to Stage 5.

### Stage 4 - Concept mapping (if evocative or mixed)

For each subject, walk the three-step mapping with the user:

1. **Subject** (what's the thing this icon represents)
2. **Quality** (what does this thing bring, signify, or mean)
3. **Visual** (what texture, material, or metaphor evokes that quality)

Brainstorm in plain conversation. Propose 3-5 options per subject, give your reasoning, let the user steer. Don't deliver final-form multiple-choice for this. It's exploratory work.

### Stage 5 - Subject lock + distinctness check

Once subjects are locked, run the **squint test**:

- Are any two subjects in the same form class? (Two animals, two plants, two containers, two human figures, two abstract symbols.)
- If so, will they read distinctly at thumbnail size?
- If not, swap or differentiate one before generating.

This is a real step, not a formality. Catching collisions here saves regeneration later.

Also flag if any subject involves **hands, faces, or text**. These are high-variance subjects that need explicit handling. Propose swaps or specific anchor language before proceeding.

### Stage 6 - Calibration icon

Generate the first icon as the calibration pass. Pick a subject that's representative (not the simplest, not the most complex) and that will stress-test the style profile. Show output to user before proceeding to the rest.

If the calibration icon needs adjustments, the right move is to tune the style profile and regenerate before scaling. Do not push the rest of the pack with a known-flawed calibration.

## Composing the prompts

Every prompt follows the same skeleton:

```
INPUTS:
[Tells the model how to treat the reference image(s): as style 
reference, not as content to copy]

STYLE: match the reference image exactly:
[Byte-identical style block: same words, same order, in every prompt]

SUBJECT:
[Specific subject for this icon: the only block that varies meaningfully]

FRAMING:
[Byte-identical framing block: aspect, margins, background, exclusions]

CONSTRAINTS:
[Style-locked constraints + subject-specific constraints]
```

The STYLE block and FRAMING block must be **byte-identical** across every icon in the pack. The SUBJECT block varies per icon. The CONSTRAINTS block has shared lines (the same in every prompt) plus subject-specific lines (different per icon).

### INPUTS block

Tells the model how to treat reference inputs:

```
INPUTS:
You are receiving [N] style reference image(s). [Treat the image as / 
Treat the images as equally authoritative examples of] the target 
[illustration/photography] style. Do not copy any specific subject 
from [the reference / any reference]. Generate the new subject 
described below in this style.
```

Update N as references accumulate (if accumulation is used). If no reference inputs at generation time (rare, sometimes works for photography), omit the INPUTS block entirely.

### STYLE block

The full extracted style profile, formatted in plain prose paragraphs. Each property gets its own paragraph or set of lines. No bulleted list at generation time. Prose reads better to models.

Include the negative space paragraph if the reference style has visible breathing room. Include proportional character if the reference has visible imperfection or wonkiness. Include treatment ("must look like a real photograph, not a render") for hyper-real photography.

### SUBJECT block

Plain language description of what the icon depicts. No styling words. Styling is in the STYLE block. Subject block describes:

- What the subject is
- How it's positioned, oriented, framed within the icon
- What specific identifiers must be present (a VW T1 needs "rounded front + split windscreen", a honeybee needs "striped body + wings")
- What should be omitted from the subject specifically (e.g. "no driver in the van", "no hands holding the jar")

Keep this block focused on this icon. Don't reference other icons in the pack here.

### FRAMING block

The shared framing rules:

- Aspect ratio (usually 1:1 for icon packs)
- Margin or padding around subject
- Background colour and texture
- What must not be in the frame (no shadows, no baseline, no text, no labels, etc.)

### CONSTRAINTS block

Two parts:

1. **Style-locked constraints**: the same in every prompt. "Match the reference style exactly. Do not personify [common false-positive elements]. Do not add shadows. No text or labels." These reinforce the style block at the end of the prompt.

2. **Subject-specific constraints**: varies per icon. Things specific to this icon that need extra anchoring: explicit shape descriptors, negative descriptors ("not a modern delivery van, a vintage VW T1"), positional rules ("the droplet sits halfway into the surface line, not on top, not below").

## Pre-flight check before delivering prompts

Before handing prompts to the user, scan for known failure modes:

- **Lock language byte-identical across all icons.** Diff mentally. Even small wording shifts ("medium weight" vs "medium-thick weight") cause split styles.
- **Concept layer applied where needed.** If register is evocative, every icon prompt should describe the *evoking texture or material*, not the literal subject.
- **High-variance subjects flagged.** Any hands, faces, or text have explicit anchor language or have been swapped.
- **Distinctness verified at thumbnail.** No two subjects in the same form class without intentional differentiation.
- **Negative space named** in the style block if the reference has breathing room.
- **Tool/material referent named** for stroke or texture properties.
- **Post-production noted** where relevant (e.g. "stroke thickness will be calibrated in Figma post-vectorisation, not in this prompt").

## Output format

Per icon:

1. **Icon name and concept summary**: one line confirming what this icon depicts and what concept it represents.
2. **Inputs note**: what to feed into Gemini (reference image(s)) alongside this prompt.
3. **The prompt**: full prompt block ready to paste.
4. **Watch-fors**: short list of things most likely to drift on this specific icon, with the fix language ready if needed.

For a multi-icon pack:

- Run the first icon as a calibration pass before generating the rest. Confirm the style holds before scaling.
- Each icon stands alone. No shared state between generations except the style language and (optionally) accumulated reference images.

Keep output focused on prompts and the immediate decisions. No workflow architecture, no node wiring instructions, no model recommendations unless directly relevant to the brief.

## Reference accumulation (optional)

If the medium benefits from reference accumulation (illustration packs benefit; standalone photography typically does not), tell the user to add each approved icon to the reference inputs before generating the next. This tightens internal pack consistency.

Rules:
- Only accumulate **approved** icons (passes the user's quality bar)
- Never accumulate flawed icons. Flaws compound across the pack.
- Update the INPUTS block in the prompt to reflect the current count of reference images

If accumulation is not used (e.g. hyper-real photography where each tile stands alone), state this explicitly so the user doesn't expect to feed prior outputs back in.

## Voice and tone

- Plain, direct, minimal formatting
- No em dashes
- One question per ask_user_input_v0 cluster where possible, prose brainstorming for concept and subject ideation
- Honest about uncertainty. Say "I'm not sure if this will land cleanly" when that's true.
- Don't over-explain. Trust the user to read what's written.
- When proposing concept directions, give 3-5 options with reasoning, let the user steer
- When the user pushes back on a proposal, take it seriously and re-think rather than defending the original

## When the skill should escalate

If during the interview:

- The user supplies an environmental shot rather than a clean style reference, flag it and ask for a cleaner reference
- The user mentions hands, faces, or text as central to multiple subjects, propose swaps proactively rather than fighting them
- The user wants more than 8 icons in one session, suggest breaking into sections by page area or theme
- The reference is mixed-style (multiple visual treatments in one image), ask which sub-style to extract

## Common failure modes and recovery

**Style drift mid-pack.** Cause: lock language drifted between icons. Recovery: regenerate the off-style icons with the byte-identical original style language.

**Subject collision at thumbnail.** Cause: distinctness check skipped or under-applied. Recovery: regenerate one of the colliding subjects with a different concept or form.

**Wrong calibration in calibration pass.** Cause: style profile was vague or wrong. Recovery: tune the style profile before scaling. Do not let a flawed calibration set the baseline for the rest of the pack.

**Hands, faces, or text inconsistent.** Cause: high-variance subjects assumed to land cleanly. Recovery: swap the subject if possible; if not, add explicit anchor language and expect 2-3 re-rolls per affected icon.

**Negative space packed tight.** Cause: negative space not named in style profile. Recovery: add a negative space paragraph to the style block, regenerate the affected icons.

**Stroke or texture weight wrong.** Cause: abstract weight description ("medium weight") rather than tool referent ("fine felt-tip"). Recovery: replace abstract description with concrete tool/material reference, regenerate.
