---
name: pair-image
description: Produces a delta-edit prompt for generating a near-clone variant of an existing image — same exact object, same pose, same camera, same lighting, same background, with only specific surface-level tweaks applied. Use this skill when a paired illustration is needed (comparison illustrations like healthy/compromised, young/aged, before/after, or any case where the second image must read as the same object as the first, modified). Triggers include "/pair-image", "pair this", "match this", "generate the counterpart", "make the matching version", "aged version of this", "compromised version of this", or any request that uploads a chosen image and asks for its surface-modified sibling. The skill assumes the anchor already exists (generated upstream) and the brand palette is known. It writes a delta-edit prompt that treats the reference image as the description and only specifies what to change.
---

# Pair Image

A workflow for generating a near-clone variant of an existing image — same exact object, same pose, same camera, same lighting, same background, with only specific surface-level tweaks applied.

Built around a single principle: **the reference image is the description.** The prompt's job is to specify the diff, not to re-describe the subject. Re-describing the subject gives the model permission to re-imagine it, which is exactly the failure mode this skill exists to prevent.

The skill plugs into an existing image generation pipeline (concatenator + style guide + brand palette + image model). It does not replace the pipeline. It generates the prompt for the *delta-edit pass* — the conditioned counterpart — using the chosen anchor as the literal source image being edited.

## When this skill applies

The user has run their first generation pass, picked the best variant as the anchor, and now needs a near-clone variant generated — same object, surface tweaks only. The two images need to read as **the same object** photographed twice, not two siblings of the same scene.

Trigger this skill when:
- User uploads an image and asks for "the matching version," "the pair," or "the [aged/compromised/before/after] version of this"
- User says "I picked this one, now generate the [variant] version"
- User invokes `/pair-image`
- User has just been through a comparison illustration workflow and is about to generate a counterpart
- User asks to harmonise two existing images that drifted apart in independent generation (in this case, the cleaner image becomes the source and the messier one is regenerated as a delta-edit)

Do NOT trigger this skill for:
- First-pass generation (no anchor exists yet) — that's the upstream concatenator workflow
- Single-illustration jobs (no variant needed) — straight concatenator
- Two genuinely different objects in the same style (e.g., a kidney illustration and a liver illustration sharing brand register) — that's a concatenator job with a shared style guide, not this skill
- Icon set generation where lateral variation is wanted, not strict matching

## The architecture this fits into

Upstream pipeline (already exists):
1. Concatenator builds a structured prompt (illustration description, style description, brand palette, negative cues, variant count).
2. Image model generates N variants.
3. User picks the best variant — this becomes the anchor.

This skill takes over at step 3 and produces the input for step 4:

4. **Pair-image skill** writes a delta-edit prompt: the reference image carries the composition, the prompt specifies only the surface changes.
5. Image model generates the variant, conditioned on the anchor as the literal source being edited.
6. Output: a near-clone with the requested surface tweaks.

The skill produces text. Weavy (or whatever orchestrates the image generation) does the actual generation. Stay on this side of the boundary.

## Why this is delta-edit, not contrast-pair

The instinct when generating two contrasting illustrations is to write two parallel descriptions and lean on a style guide to keep them consistent. This fails. Each description gives the model fresh interpretive room, and the two outputs drift apart — different angles, different shapes, different scenes that happen to share a palette.

The fix is to stop writing two descriptions. The first image is already the description of the object, the pose, the camera, and the lighting. The second prompt only needs to describe **what's different**. Everything else is "match the reference exactly."

This means the skill's output prompt has no ILLUSTRATION DESCRIPTION section. It has a TASK section that names the reference image as the source being edited, a WHAT TO CHANGE section that lists the diff, a WHAT MUST NOT CHANGE section that names the things the model is most likely to drift on, and a NEGATIVE CUES section that names the specific failure shapes (not generic "no reinterpretation" language).

If the user is asking for two genuinely different objects in the same style — that's not this skill. That's an upstream concatenator job with a shared style guide. This skill is for **same object, modified**.

## Workflow

### Step 1: Gather the three inputs

The skill needs three things to run:

1. **The anchor image.** Uploaded by the user or referenced from the conversation. The skill must actually see the image — described summaries don't work because the reference image itself is the description in this workflow.
2. **The variant brief.** A short description of what should change. "The aged version of this young gut." "The depleted version of this thriving microbiome." Just the surface delta — not a full re-description of the object.
3. **The brand palette block.** Either pasted in or referenced from the brand's stored palette. If absent, ask. Don't proceed without it — palette drift is one of the easiest failure modes and the brand palette is the only thing that prevents it.

If any of these is missing, ask for it before proceeding. Don't bluff.

### Step 2: Identify the diff

Look at the anchor and the user's brief and identify exactly what needs to change. The output of this step is a list of surface modifications, not a compositional analysis.

For each item in the diff, specify:

- **What surface element changes.** The villi, the skin texture, the leaves, the surface color of the object — be specific about which part of the image is being edited.
- **The direction of the change.** Shorter, blunter, sparser, paler, more cracked, fewer in number. Concrete and measurable where possible (e.g., "40–60% of current length," "reduce density by ~60%").
- **What replaces it, if anything.** New surface forms (cracks, foreign bodies, growths) need explicit description and explicit constraint on size and density so they don't dominate.
- **The palette consequence.** If the storytelling change implies a color shift (vital → depleted, young → aged), name the brand palette token that takes over and the one it replaces.

Keep the diff list short. If you have more than 6–8 items, you're probably re-describing the subject rather than identifying changes. Trim back to surface deltas only.

Then identify the **drift risks** — the compositional elements the model is most likely to break when given an edit instruction. Common drift modes:

- Object shape morphing (cylinder → bowl, cross-section → ring, cube → sphere)
- Camera angle drift (near-frontal → three-quarter, ¾ view → top-down)
- Scale and crop drift (subject occupies 85% of frame → 60%)
- Background drift (pure white seamless → soft gradient or environment)
- Material register drift (glossy ceramic → matte clay, semi-wet → dry)
- Framing element drift (drop shadow disappearing, rim disappearing)

The drift risks list becomes the WHAT MUST NOT CHANGE section. Be specific about the shape — "do NOT turn the cylinder into a bowl, dish, donut, or ring" beats "preserve the silhouette" because the model can interpret "preserve the silhouette" loosely.

### Step 3: Write the delta-edit prompt

The prompt has five sections. Note what's missing: there is no ILLUSTRATION DESCRIPTION. The reference image is the description.

Critical principle: do NOT translate compositional elements into language ("near-frontal cylindrical cross-section tilted ~15° toward viewer"). Language descriptions of composition are easy to misread, both by the prompt writer (who can extract the wrong angle) and by the model (which can interpret the same words differently than the source image looks). The reference image carries composition. The prompt's job is to keep the model from drifting away from it.

Structure:

```
## TASK

Take the reference image and modify it. The output must be the
SAME OBJECT, SAME POSE, SAME CAMERA, SAME LIGHTING, SAME
BACKGROUND, SAME FRAMING, SAME SCALE as the reference. Treat
this as a surface-level edit of the reference image, not a new
generation inspired by it. Do not reinterpret. Do not reframe.
Do not regenerate from scratch.

## WHAT TO CHANGE (and only this)

[Diff list from Step 2. Each item names a specific surface
element, the direction of the change, and where applicable the
palette token that takes over. Keep tight — surface deltas only.]

## WHAT MUST NOT CHANGE

[Drift risks from Step 2, named explicitly. Include the object
shape with named alternatives the model must not produce
("do NOT turn the cylinder into a bowl, dish, donut, or ring").
Include camera, lighting, background, scale, framing, material
register, and any specific elements the model commonly drops
(rim, drop shadow, central well).]

## PALETTE CONSTRAINTS

[Brand palette block, edited to name which tokens are active in
THIS image and which are forbidden. Be explicit about role
swaps — e.g., "Stone Taupe replaces Soft Sky on the villi."
Name forbidden colors explicitly.]

## NEGATIVE CUES

[Concrete failure shapes, named. "Not a bowl. Not a dish. Not a
donut. Not a top-down view." Beats generic "no reinterpretation"
language because the model has specific shapes to avoid, not an
abstract instruction. Add technique-level negatives only if
relevant — keep this section grounded in what the model has
actually drifted to in past attempts.]

## VARIANT COUNT

[Usually 4-6.]
```

The TASK section is the heart of the skill. The phrase "treat this as a surface-level edit of the reference image, not a new generation inspired by it" reframes what the model is doing — not generating a sibling, but editing a source.

The WHAT MUST NOT CHANGE section is the second-most-important section. It's where you preempt the specific drift modes you identified in Step 2. Generic "preserve composition" language is too soft; named alternatives ("not a bowl, not a dish, not a donut") give the model specific shapes to avoid.

The NEGATIVE CUES section becomes more concrete than in the upstream concatenator. Use it to name the exact failure shapes the model has drifted to in past attempts on this same job, not generic technique cues.

### Step 4: Pre-flight check

Before handing the prompt to the user, scan it for the known failure modes:

- **Subject re-description.** If you've written a sentence describing what the object is ("a cylindrical cross-section of intestinal tissue with..."), delete it. The reference image is the description. Re-describing the subject reopens the door to reinterpretation.
- **Compositional language smuggled in.** Phrases like "near-frontal angle" or "soft directional light from upper-left" extracted into the prompt give the model an interpretation of the reference rather than the reference itself. The reference image carries this; the prompt should not duplicate it. The exception is the WHAT MUST NOT CHANGE list, where naming the angle is acceptable as a *constraint* ("camera angle does not change") but not as a *description* ("camera is at three-quarter angle").
- **Color words leaking through.** If the brand palette uses Stone Taupe but the description still says "warm coral vitality," that's storytelling language bleeding into a literal color command. Reframe color cues as role assignments ("Stone Taupe replaces Soft Sky on the villi").
- **Generic negatives instead of named drift shapes.** "Avoid reinterpretation" is weaker than "not a bowl, not a dish, not a donut." If the negatives section is generic, you haven't named the specific shapes the model is drifting to.
- **Concatenation seam bugs.** Headers run together, blank lines missing between sections.

If any of these appear, fix before delivering.

### Step 5: Deliver the prompt and brief the next step

Output the prompt as a single concatenator-ready block. Tell the user:

1. This goes into your Weavy concatenator (or equivalent) for the delta-edit pass.
2. The reference image input must be the anchor — set as the **source image being edited**, not a style carrier and not a composition reference. The prompt is written to treat it as the literal source.
3. Generate 4–6 variants, pick the best match.
4. If the variants come back as different objects (different shape, different angle, different scene): the WHAT MUST NOT CHANGE section needs to name the specific shapes the model drifted to. Update the prompt with those named drift shapes and regenerate.
5. If the variants are too close to the reference (the surface tweaks are too subtle to read): the WHAT TO CHANGE list needs sharper directional language — concrete percentages, more specific surface descriptions, named replacement forms.

## Failure modes

The variant drifts most commonly in three ways. Each has a specific cause and fix.

- **Object morphing.** The output is a different object — a bowl instead of a cylinder, a ring instead of a cross-section, a sphere instead of a cube. Cause: the WHAT MUST NOT CHANGE section didn't name the specific alternative shapes the model could drift to. Fix: name the forbidden shapes explicitly ("not a bowl, not a dish, not a donut, not a ring") in both the constraints section and the negative cues.
- **Camera and angle drift.** The output is the same kind of object but seen from a different viewpoint — top-down instead of near-frontal, ¾ instead of straight-on. Cause: the prompt re-described the camera in language the model interpreted differently than the source image. Fix: remove compositional descriptions from the prompt and rely on the reference image to carry the angle. Add "camera angle does not change" as a constraint, not a description.
- **Surface tweaks too subtle.** The variant is structurally correct but the storytelling change doesn't read — villi look only slightly shorter, depletion looks only slightly grayer. Cause: the WHAT TO CHANGE list used soft directional words ("a bit shorter," "more depleted") instead of concrete deltas. Fix: rewrite each item with concrete percentages, named replacement forms, and explicit palette token swaps.
