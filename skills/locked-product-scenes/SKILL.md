---
name: locked-product-scenes
description: Generates layered Gemini 3 (Nano Banana Pro) prompts that lock a product's size, angle, position, and label while varying only the scene around it. Defaults to a four-stage layered approach (packaging swap, backdrop recolour, prop swap, polish) because trying to change multiple things in one prompt causes the model to drift on locked elements. Use when the user has one or more product packshots and wants scene variations that hang together as a collection or product line. Triggers include "/locked-product-scenes", "different scenes for this product", "lifestyle variations of this packshot", "vary the backdrop but keep the bag the same", "make a collection of [product] shots", "scene shots for the [product line]", "different flavours in scenes", and natural descriptions like "same crisp size and angle, different vibe" or "different flavours, same universe". Outputs prompts only, not Weave node JSON or workflow architecture.
---

# Locked Product Scenes

## What this skill does

Generates layered Gemini 3 (Nano Banana Pro) prompts that lock the product's appearance, scale, position, and label across every variant in a collection, while varying only the backdrop, props, and ambient scene around it. The default architecture is four stages per variant (packaging swap, backdrop recolour, prop swap, polish), with optional Stage 1.5 patches for targeted fixes when the model misses a non-default element.

This skill produces prompts only. The user's Weave canvas runs them.

## When this skill applies

The user has one or more product images and wants multiple scene variations that read as a coherent collection or product line.

Common patterns this skill handles well:

- **Single product, multiple scenes.** One product image, N scene variations.
- **Product line, scene per flavour.** Multiple flavour packshots, each gets its own scene tuned to the flavour identity. The universe (camera, lighting, scene structure) stays consistent across the line.
- **Same product, evolving moods.** One product image, N variations with different palettes and prop combinations to test creative direction.

Do NOT trigger when:

- The user wants a single image generated, no collection needed
- The user has an inspo image they want to recreate with a different product (that's `inspo-to-product`)
- The user wants the product itself edited, like a damaged or aged variant (that's `pair-image`)
- The user wants product photography prompts without any product image as anchor

## Core principles

These are non-negotiable. Lessons earned from real test runs, not guesses.

- **Lock once, vary the rest.** The product's identity (label, scale, orientation, camera angle, lighting on the product) is the anchor. Locked language must be identical across every variant. Identical means identical: same words, same order. Drift in lock language causes drift in locked elements.

- **The product image is the description of the product.** The prompt does not re-describe the product. Every prompt names the reference image as the literal source of the product's appearance. Re-describing gives the model permission to reinterpret.

- **Layer the edits, never compound them in one prompt.** When you ask the model to do five things at once, it does all five with creativity, including the things you wanted locked. Each stage in the four-stage flow does exactly one thing: stage 1 swaps packaging, stage 2 recolours the backdrop, stage 3 swaps props, stage 4 polishes. Each stage feeds the next. Locked elements stay locked because the model only has one job per pass.

- **Default to four stages, fall back to single-prompt only when justified.** Four stages costs more credits but reliably produces tight collections. Single-prompt fallback exists only for throwaway tests, exploratory creative direction, or scenes where drift risk is genuinely low.

- **Content-specific anchoring at every relevant stage.** When any visible element differs from the model's defaults (non-yellow tortilla chips, non-coral packaging, non-glass containers), anchor that element explicitly at every stage where it appears. Defaults will leak through otherwise. Triple-anchoring is fine; missing one stage causes the drift.

- **Colour naming matters more than you think.** "Soft buttery yellow" produces canary yellow. "Soft slate blue" produces too-saturated denim. The model takes colour names literally. Lead with the colour family (cream, grey, taupe), use the modifier as character (buttery, slate, dusty), and triangulate with multiple concrete referents (mourning dove feathers, raw unfinished concrete, river stone). If a previous attempt drifted toward saturation, add an explicit pullback instruction ("if you find yourself reaching for a vivid yellow, pull back").

- **Lineup-wide palette orchestration is collaborative.** When the user wants multiple variants in a collection, propose backdrops and brainstorm together. Check each proposed colour against colours already locked for other variants in the same lineup. Flag when two are getting too close. The final palette should feel like a coherent range, not a random selection. Every variant should be clearly distinguishable at thumbnail size.

- **Anti-stagecraft default.** Lifestyle generators love to add hands, complicated tablescapes, beer bottles, knives. Default to minimal staging — one or two props maximum unless the user explicitly wants more.

- **Lighting consistency by default.** Unless the user explicitly asks for varied lighting moods, lighting on the product itself stays locked across variants. Scene lighting can shift; light on the product does not.

## The interview

Always run the full interview. Use ask_user_input_v0 with tappable buttons where there's a clear option set; use prose questions when the answer needs description; use plain conversational brainstorming when proposing palette and prop ideas.

### Stage 1 — Confirm the product image(s)

Confirm what's uploaded. If it's a product line, ask for all flavour packshots.

For each image, identify:

- **Product container** (bag, bottle, jar, tube, box, can, pouch)
- **Orientation** (standing, lying flat, angled, held)
- **Camera angle** (head-on, top-down, three-quarter, low angle)
- **Background** (transparent, white seamless, environmental)
- **Visible contents** (chips poking out, liquid visible, etc.)
- **Label / packaging elements** — enumerate by name (wordmark, sub-text, stripes, icons, monogram, ingredient text, colour palette). Do not accept "the label" as a description; name each element.

Surface what you've identified back to the user. Ask them to confirm or correct.

If the source is an **environmental shot rather than a clean packshot** (e.g. the bag held by a hand), flag it. Ask if there's a cleaner packshot. If not, Stage 1 needs an explicit "ignore the [environmental elements] in the reference, use only the product itself" instruction.

### Stage 2 — Lock-in confirmation

Confirm what's locked across all variants. Defaults:

| Element | Default | Confirm with user |
|---|---|---|
| Product size in frame | Locked | "Should the product occupy roughly the same % of the frame across every variant?" |
| Product orientation | Locked | "Should the product stay [as it appears in the reference] in every variant?" |
| Camera angle | Locked | "Should every variant use the same camera angle?" |
| Label visibility | Locked | "Should the full label face the camera in every variant?" |
| Product position in frame | Locked | "Should the product stay in roughly the same position?" |
| Lighting direction on product | Locked | "Should lighting on the product itself stay consistent?" |
| Scene structure | Often locked for product lines | "Should the scene structure (wall + floor, atmospheric details) stay consistent across flavours?" |

If the user wants any to vary, flag the implication.

### Stage 3 — Collection strategy

Three patterns:

- **Same vibe, prop swaps.** All variants share backdrop, lighting, scene structure. Only props vary. Best for tightly coherent feed sets.
- **Different vibes, locked product.** Each variant has its own distinct mood. Best for testing creative direction or building a range deck.
- **Product line variations.** Multiple flavour packshots, each gets its own backdrop colour and flavour-themed props, but scene structure stays locked. The pattern that produced the MASA collection in the live test. Best when the user has a line of products with shared identity but distinct flavour personalities.

The answer changes scene block structure significantly.

### Stage 4 — Scene direction (collaborative brainstorm)

Based on Stage 3's answer, work with the user to fill in scene direction. Do not deliver final-form multiple-choice; brainstorm in plain conversation, propose options, let the user steer.

**For product-line variations:**
- For each flavour, what does its identity suggest for backdrop palette and props? Brainstorm pairings (e.g. Lime → buttery cream backdrop + fresh limes; Hatch Chile → sage olive backdrop + charcuterie). Use any client briefs the user shares as anchoring.
- **Run a lineup-wide palette check.** As proposals accumulate, surface when two flavours' backdrops are getting too close in colour family or tone. Suggest alternatives that maintain distinct identities.
- Ask about prop maximalism (one hero prop, two-three, or more).

**For same-vibe / prop-swap:**
- Decide on shared backdrop, lighting, and mood once.
- For each variant, propose a single prop swap.

**For different-vibes:**
- Propose distinct moods per variant. Balance exotic with conservative.

**Either way, confirm:**
- Hands or human elements in the frame: default exclude.
- Aspect ratio for the collection: default to one ratio across all variants.

### Stage 5 — Refiner pass

Ask if the user wants a Stage 4 polish prompt for each variant:
- **Pure quality pass** (no content changes, just sharpness + 4K)
- **Quality pass + minor edits** (ask what tweaks)
- **Skip the polish**

Default to including a pure quality pass. The cost of one extra template is trivial; the cost of not having one is a second trip back to the skill.

## Composing the prompts

Generate **four prompts per variant** by default. Each variant is a four-prompt chain.

### Stage 1 — Packaging swap only

```
TASK: Replace the product in Image 1 with the product in Image 2. 
This is a packaging-swap edit only. Treat Image 1 as the source 
scene and Image 2 as the new packaging. Do not regenerate the scene. 
Do not reinterpret the composition. The output must read as Image 1 
with only the bag swapped.

WHAT MUST CHANGE:
- Replace the [OLD PRODUCT, brief description] in Image 1 with the 
  [NEW PRODUCT, brief description] from Image 2
- [If contents colour differs from default — blue corn, white corn, 
  non-standard contents — add a line recolouring those contents]

NEW BAG'S LABEL — pixel-accurate composite, do not redraw, restyle, 
recolour, or reinterpret any element:
- [ENUMERATED_LABEL_ELEMENTS from Stage 1 interview]

WHAT MUST NOT CHANGE (preserve EVERYTHING ELSE from Image 1 exactly):
- The bag's position in the frame: exact same location as in Image 1
- The bag's scale: exact same size as in Image 1
- The bag's orientation: [orientation], same angle as Image 1
- The bag's silhouette: same form factor, seams, creases as Image 1
- [If contents visible — chips poking out, etc.] same arrangement
- Camera angle: identical to Image 1
- Backdrop: exact same [colour] [surface] as Image 1
- Floor: exact same [colour] [surface] as Image 1
- [Atmospheric details — palm leaf shadow, etc.]: exact same shape 
  and position as Image 1
- Lighting: exact same direction and intensity as Image 1
- Shadow cast by the bag: exact same shape, direction, intensity
- Any other props or scattered elements: unchanged

This is a surface-level edit of Image 1, not a new generation. Do 
not reframe. Do not relight. Do not recompose. Only the bag's 
packaging design [and contents colour, if applicable] change.

CONSTRAINTS:
- Hyperrealistic product photography, sharp focus
- No new objects, no new shadows, no new props
- Do not duplicate the bag
- No banding, no gradient artefacts on the backdrop
- [Triple-anchor any non-default content colour here]
```

### Stage 1.5 — Targeted patch (only when needed)

Exists for fixing specific Stage 1 failures, most commonly scattered floor elements reverting to default colours when the flavour calls for something else. Skip if Stage 1 lands clean.

```
TASK: [Recolour / reposition / fix] the [SPECIFIC ELEMENT] in this 
image. Everything else is preserved exactly. This is a surface-level 
[recolour/fix] only.

WHAT MUST CHANGE:
- [Specific element] currently appearing as [WRONG STATE] must be 
  changed to [CORRECT STATE]. [Specific scope — every instance, the 
  three on the floor, etc.]
- [Reference anchor — match the [other correct instances] in this 
  image]
- Preserve every element's shape, position, scale, and shadow

WHAT MUST NOT CHANGE:
- [Full list of elements that must stay locked]

CONSTRAINTS:
- Hyperrealistic product photography, sharp focus
- [Triple-anchor the specific change requirement]
- Do not duplicate anything, do not add new elements
- No banding on the backdrop
```

### Stage 2 — Backdrop recolour only

```
TASK: Recolour the backdrop in this image. The wall and floor 
change colour. Everything else is preserved exactly. Treat this 
as a surface-level recolour, not a new generation.

WHAT MUST CHANGE:
- Wall colour: shift from [OLD COLOUR] to [NEW COLOUR — colour 
  family + character modifier]. Target [3 concrete referents]. 
  [Explicit negative anchors — NOT bright, NOT saturated, etc.]. 
  Matte plaster finish maintained.
- Floor colour: shift to the same [NEW COLOUR] as the wall. Both 
  surfaces in the same family of [tonal family] tones.

REFERENCE TONE: [1-2 sentences describing tonal value, character, 
and any "if you find yourself reaching for X, pull back" instructions 
if a previous attempt drifted toward saturation.]

WHAT MUST NOT CHANGE:
- The [PRODUCT NAME] bag: position, scale, orientation, label, 
  silhouette, [visible contents] — all exactly as in current image
- All [scattered elements / props]: positions, scale, colour preserved
- Camera angle: identical
- Lighting direction and intensity: identical
- Shadow cast by the bag: same shape, direction, softness (only its 
  colour shifts to match new floor tone)
- [Atmospheric details]: same shape and position (only tonality 
  shifts to match new wall colour)
- Backdrop texture: identical, only colour shifts

CONSTRAINTS:
- Hyperrealistic product photography, sharp focus
- No new objects, no new shadows, no new props
- Do not duplicate the bag
- Recolour must be uniform: no banding, no gradient, no patches of 
  original colour showing through
- [Distinctness anchor — should read as clearly distinct from 
  (other backdrop colours in the lineup), if multi-variant]
```

### Stage 3 — Prop swap only

```
TASK: Replace the existing props at the base of the bag in this 
image. Everything else is preserved exactly. Treat this as a 
surface-level prop swap, not a new generation.

WHAT MUST CHANGE:
- Remove any existing props at the base of the bag ([list previous])
- Add [NEW PROPS, described concretely with position relative to bag]
- [If scattered chips or content elements are part of the props, 
  anchor their colour explicitly]

WHAT MUST NOT CHANGE:
- The [PRODUCT NAME] bag: position, scale, orientation, label, 
  silhouette, [visible contents] — all exactly as in current image
- Camera angle: identical
- Lighting direction and intensity: identical
- Shadow cast by the bag: identical
- The [BACKDROP COLOUR] wall and floor: identical colour, texture, 
  [atmospheric details]

NEW PROP DETAILS:
- [Each prop named with surface, colour, texture, position, realism notes]

CONSTRAINTS:
- Hyperrealistic product photography, sharp focus
- New props must cast natural shadows consistent with existing light direction
- Props sit on the floor at the base of the bag, do not float, do 
  not obscure the bag's label
- No new objects beyond what's specified
- Do not duplicate the bag
- [Re-anchor any non-default content colour]
```

### Stage 4 — Final polish / 4K enhancer

```
TASK: Refine this image at 4K quality. Do not regenerate. Do not 
recompose. Treat this as a polish pass on a finished shot.

PRESERVE EXACTLY:
- Bag position, scale, orientation, and packaging design
- [Visible contents — same arrangement]
- All props and their positions ([list])
- Backdrop colour and texture
- [Atmospheric details]
- Camera angle
- Lighting direction
- Shadow cast by the bag
- Overall composition

[OPTIONAL: MINOR EDITS block if user requested tweaks]

SHARPNESS AND CLARITY:
- Bag material: enhance [SPECIFIC MATERIAL CHARACTER — matte 
  plastic film, glass, etc.], sharpen seams, render natural 
  surface highlights
- Label: maintain pixel-perfect clarity on every element 
  ([RE-ENUMERATED LABEL LIST, identical to Stage 1's list]). 
  Sharpen what is already there. Do not alter, restyle, retype, 
  or reinterpret any element.
- [Each visible content element / prop / surface with specific 
  sharpening instructions]
- Backdrop: maintain visible texture, no smoothing into flat 
  colour, completely uniform tone — no banding, no gradients, 
  no vignetting, no seams
- [Atmospheric details]: keep soft and natural
- Bag shadow: keep soft and natural, do not deepen or harden

OUTPUT: Hyperrealistic commercial product photography. 4K resolution. 
Studio-quality finish. Maximum sharpness on all in-focus elements. 
No new objects. No new shadows. No new props. No composition changes.
```

## Pre-flight check before delivering

Before handing prompts to the user, scan for known failure modes:

- **Lock language byte-near-identical across all variants.** Diff mentally — if one variant says "65% of frame" and another says "approximately 65%", that drift produces inconsistent outputs.
- **Label enumeration consistent across Stage 1 and Stage 4** of each variant. Same eight elements, same words.
- **Content colour anchored at every relevant stage.** If chips are blue corn: Stage 1, Stage 1.5 if needed, Stage 3, Stage 4.
- **Backdrop colours in a multi-variant lineup are distinct.** Flag any two that are tonal cousins.
- **No em dashes.** User dislikes them.
- **No product re-description outside locked references.** Scene blocks reference the product by position, not by re-describing its appearance.

## Output format

Per variant:

1. **Variant name**
2. **Universe-wide settings** at the top of the collection (aspect ratio, resolution)
3. **Stage 1 — Packaging swap** with inputs and prompt
4. **Stage 1.5 — Targeted patch** only if variant has non-default content (flag as conditional)
5. **Stage 2 — Backdrop recolour** with input and prompt
6. **Stage 3 — Prop swap** with input and prompt
7. **Stage 4 — Final polish** with input and prompt

End with a brief usage note:
- Run stages in order
- If any stage drifts, re-roll the seed before continuing
- Each variant is its own four-prompt chain
- Project-specific flag if relevant (e.g. "Non-default content colour is anchored at every stage on purpose")

Keep output focused on prompts only. No workflow architecture, no model recommendations, no node wiring instructions.

## When to fall back to single-prompt

Single-prompt fallback is for narrow cases:

- **Exploratory tests** for quick directional output
- **Minimal-change variants** where only one element shifts and drift risk is low
- **The user explicitly asks for it**

Single-prompt template structure:

```
TASK: [overall job]

LOCKED ANCHOR (preserve exactly from Image 1):
- [Product anchor language]
- [Label preservation language with enumerated elements]
- [Lighting on product]

SCENE:
- Backdrop: [colour + surface]
- Ambient lighting: [direction and quality]
- Props: [list with positions]
- Mood: [vibe]

CONSTRAINTS:
- [Standard constraints]
```

If using this fallback for multi-variant work, the LOCKED ANCHOR block must be byte-identical across variants.

## Voice and tone

- Plain, direct, minimal formatting
- No em dashes
- No marketing-speak, no over-comprehensive lists
- One question per ask_user_input_v0 cluster where possible, prose brainstorming for palette and prop ideation
- Honest about uncertainty
- Short interview answers don't need long preambles
- When proposing colour or prop directions, give 2-4 options with reasoning, let the user steer

## When the skill should escalate

If during the interview the user reveals the "product image" is an environmental shot, flag this. Either ask for a cleaner packshot, or add explicit "ignore the environmental elements" instructions to Stage 1.

If the user uploads one packshot but mentions "this is the [Original] of a line," ask for the other flavour packshots before generating prompts. Orphan variants won't sit coherently together later.
