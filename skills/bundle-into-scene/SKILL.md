---
name: bundle-into-scene
description: Generates Gemini 3 prompts that compose multiple products (a bundle) into a single scene with rigid product fidelity. Designed for product photography of multi-pack bundles where N units across several flavours must be arranged together — DTC bundle hero shots, variety-pack lifestyle photography, curated collection imagery, promotional assets. Use when the user has multiple product packshots and wants to compose them into one scene. Triggers include "/bundle-into-scene", "bundle shot for [products]", "lifestyle shot of the bundle", "compose these products into one scene", "scene with all flavours", and natural phrasing like "I need a hero shot of the multipack" or "show all six bags in one image".
---

# Bundle Into Scene

## What this skill does

Takes multiple product packshots and a reference scene, produces a final composed image where the products sit in the reference's composition, lit and grounded like a real photograph.

Outputs Gemini 3 prompts. The user's generation tool runs them.

## When this skill applies

The user has:
- Multiple product packshots (typically 2-8 distinct products, with multiple instances of each in the bundle)
- A reference image of a target scene composition, OR a vibe direction with willingness to explore
- A need to compose all instances into one scene with rigid product fidelity

Do NOT trigger when:
- The user wants a single product in a scene → `locked-product-scenes`
- The user wants creative scene variations of one product → `locked-product-scenes`
- The user wants matching illustrations or icons → `icon-pack-from-reference`
- The user wants a paired variant of an existing image → `pair-image`

## The architecture in one paragraph

Build a locked white-base scene first (composition, props, lighting, blank bags). Then cast all products in a **single pass** using a packshot compositor as the second input. The compositor stacks every packshot in a grid; the prompt assigns each bag in the scene to one flavour with a positional anchor and a short design spec. This produces dramatically cleaner results than sequential per-flavour casts, which suffer cumulative drift on previously-cast bags. After the cast pass, run targeted refinement passes (text correction, then surface realism) on the final scene.

## Core principles

### Single-pass with a compositor beats sequential casting

This is the most important principle in the skill, and it overrides instincts from earlier image-gen workflows. The temptation is to cast one flavour at a time, treating each pass as additive. In practice, every sequential pass regenerates the previously-cast bags despite explicit preservation language, and label quality degrades cumulatively. By cast 5 or 6, the early bags are visibly degraded.

The fix: feed Gemini 3 a **compositor of all packshots as a single Image 2**, and cast every flavour in one pass. The model treats the job as one composition rather than N preservation tasks. Label fidelity holds across all bags simultaneously.

This works only when these conditions are met:
- All packshots are clean (see packshot prep below)
- The prompt assigns each bag to one flavour by a specific spatial anchor
- Per-flavour design specs are present but lean (one line per flavour)
- The white-base scene is locked and provided as Image 1

Without these, attention dilutes across too many simultaneous decisions and the cast collapses. With them, single-pass is the path.

### Sequential casting is a fallback, not the default

If single-pass fails after a few seed attempts under the conditions above, fall back to sequential per-flavour casts. Don't reach for sequential first. The previous version of this skill warned against single-pass; that warning was correct for that session's conditions (no compositor, no clean packshots, no positional anchors, verbose preservation prompts). Under the modern architecture, single-pass is reliably better.

### Use the lean prompt format

The prompt format is short, structured, and section-headed. Do not write verbose enumeration. Do not list every cast bag's design in a passthrough block. Do not stack constraints.

Section order: **Assets provided → Brief → Cast details (or Bag assignments for single-pass) → Critical.**

This format outperforms the long INPUTS/TASK/LOCKED REGIONS/CONSTRAINTS structure across every test. The reason is attention budget: the model reads a clear assets list, a one-line brief, a tight design spec, and a hard preservation lock. Each section has one job. Everything that doesn't move the needle is cut.

See the prompt schema below for the exact format.

### Prep the packshots before casting, never fight them in prompts

The model faithfully reproduces what it sees on the packshot. Anything illegible at cast scale (NET WT lines, regulatory micro text, barcodes, certifications) gets reproduced as blurry mush. Any printed typo on the packshot gets copied to every cast. Asking the model to "omit X" or "spell Y correctly" works against the visual reference and produces inconsistent results.

The fix is upstream: edit each packshot in Photoshop or Photopea to strip:
- NET WT lines and weight callouts
- Regulatory or certification micro text
- Barcodes
- Small print taglines that won't read at scale
- Printed typos

Keep:
- Wordmark, subhead, flavour callout, monogram badge
- Brand-essential taglines or attribution lines if they're legible at cast scale
- Brand-identity callouts (e.g. "NO SEED OILS", "ORGANIC", or similar short claims)

Ask during setup: "Are your packshots final, or do they have micro text or printed errors that should be stripped first?"

Once packshots are clean, **do not write "NO NET WT" or similar anti-text language in the prompt**. The model has nothing to copy from, so the anti-text block becomes the only source of the term in the system — that's reverse priming. Trust clean packshots.

### Position language must be unambiguous

The compositor + scene reference give the model spatial information, but each cast bag still needs a positional anchor in the prompt. "Top-middle" or "middle-bottom" is too ambiguous — the model parses "middle" first and drops the qualifier. Use spatial relationships that are unique to that bag in the scene:

- "the bag at the top of the scene, partially cropped by the top edge of the frame"
- "the open bag in the upper-left with chips spilling to its right"
- "the sealed bag in the central middle position, between [neighbour] and [neighbour]"

For the lone remaining bag in a sequential workflow, never say "the last plain white bag" — that gives the model license to cast on any white-ish bag, including a White-cast bag with pale stripes. Always pin the position spatially.

### Brand spelling is a hard constraint

Verify exact spellings with the user before generating. Include them in the prompt with explicit letter-by-letter anchoring on names the model is likely to default to. Examples: words where the model may swap a less-common letter for a more-common one ("[FLAVOUR NAME] — third letter is B, not R"), or where the model may drop or add a vowel ("[FLAVOUR NAME] ends in E, not I").

### Open/closed product states are their own decision

Don't assume which products are opened (contents spilling) and which are sealed. Ask deliberately during brief scoping. This is a meaningful compositional choice, not a styling detail. Opened bags constrain neighbouring elements (chips spilling, ingredients scattered) and need to be locked into the white-base scene.

### Chip / contents colour changes need an explicit instruction

If a flavour has different-coloured contents (e.g. blue corn chips vs. golden corn), the cast prompt for that flavour must explicitly call out the chip colour change. The model defaults to whatever colour is already in the scene. Anchor with a positive description and an anti-pattern: "natural blueberry-purple, NOT bright blue, NOT navy, NOT painted."

### Refinement is two separate passes, not one

After the single-pass cast lands, refine in two distinct passes:
1. **Text and bag detailing** — sharpen labels using the packshot compositor as text ground truth, restore any lost patterns, sharpen monograms and bag material.
2. **Surface realism** — chips, dip bowls, linen, props.

Splitting passes isolates failures (if labels drift on a chip pass, you lose the cast quality), and each pass has one clean job for the model. Each pass leads with what changes and has an explicit "do not touch the other domain" block.

### The hyperrealism / upscale pass must not touch text

If there's a final hyperrealism or upscale pass after refinement, it must explicitly exclude all text and printed elements. Refinement passes that include text instructions blur and soften the text rather than sharpening it — the model regenerates the text region from its lower-resolution understanding and the output is worse than the input. Lock every printed element (wordmarks, subheads, monograms, flavour callouts, stripe colours, taglines) as photographic ground truth that must not be regenerated. The upscale pass works only on lighting, shadows, material realism, food appetisingness, and surface micro-texture.

### When iteration drifts into model-testing, return to the proven path

The proven path is Gemini 3 Pro (Nano Banana Pro), 2-image setup (scene + packshot compositor), 4K output, lean prompt structure.

When a cast doesn't land, the instinct is to try a different model (inpaint variants, alternative generators, mask-based workflows). This rarely helps. Empirically, every inpainting model preserves the scene but renders brand-specific packaging poorly, and every alternative generator renders well but doesn't preserve the scene.

Genuine fixes when a cast drifts:
- Tighten the prompt (positional anchors, anti-pattern colour language)
- Re-prep the packshot if micro text or errors survived
- Sandbox-parallel: 3-4 Gemini 3 seeds, pick the cleanest
- One more iteration on the prompt, not one more model

If three Gemini 3 attempts at the same prompt all fail, the prompt needs rewriting, not the model needs swapping.

## The workflow

### Stage 1: Wide-net scene exploration

Generate 4-8 candidate scene prompts. Each varies multiple dimensions simultaneously:

- **Composition**: fan, cluster, cascade, ring, hero stack, scatter, diagonal
- **Surface**: linen, plaster, concrete, tile, jute, wood, paper, sand
- **Surface colour**: terracotta, sand, cream, sage, charcoal, blush
- **Lighting**: soft top-down, raking side, dappled (palm shadow), hard sun, golden hour
- **Atmosphere**: scattered chips, leaf shadow, salt grains, lime accent, props
- **Mood**: editorial, market table, kitchen, picnic, sunlit cafe, Mediterranean

Each prompt picks one option from several axes. Use placeholder products (generic striped bags, blank shapes) — the job is to test scene, not product accuracy.

**No reference image inputs at Stage 1.** Pure text-led. References pull the model toward literal copying.

Run candidates in parallel. User reviews as a contact sheet.

### Stage 2: Curate and polish

User picks 1-3 candidates that resonate. Notes on what worked and what to adjust.

Write a polish prompt combining picks + user direction. Include the 1-3 reference frames as image inputs. Run 1-2 times to dial in. Output is the locked scene: placeholder products in the right composition, lighting, atmosphere.

### Stage 3: White-base template

Take the locked scene from Stage 2. Replace all placeholder products with plain blank white bags (same form, position, orientation, open/closed state). This becomes the stable template — from here forward, the scene doesn't change.

### Stage 4: Single-pass cast (default)

**Inputs:**
- Image 1: the white-base scene from Stage 3
- Image 2: a compositor of all packshots arranged in a grid

**Prompt:** assigns each bag in the scene to one flavour via spatial anchor, provides one line of design spec per flavour, locks the scene and chips.

Run 1-3 seeds and pick the cleanest. Move to Stage 5.

### Stage 4 fallback: Sequential per-flavour cast

Only if single-pass fails after a few seed attempts. One pass per flavour, casting all instances of that flavour in one go. Pin every cast bag with a unique spatial anchor (not "the last white bag"). Output of each pass becomes Image 1 of the next.

Even when sequential, never enumerate every cast bag's design in a long passthrough block. Trust Image 1 to show what's there. Use the lean format throughout.

### Stage 5: Refinement (two passes)

**Pass 1 — Text and bag detailing.** Lead with what changes (label correction using the packshot compositor as ground truth, pattern restoration, monogram sharpening, bag material). Explicit "do not touch the chips" block.

**Pass 2 — Surface realism.** Tortilla chips, dip bowls, linen weave, prop detail. Explicit "do not touch any of the bags" block.

Run Pass 2 on the output of Pass 1, not the original.

## The interview

Always run the full interview before generating any prompts.

### Stage 1 setup

1. **What's the bundle?** Number of products, names of each, instances of each.
2. **Reference image or pure exploration?**
3. **Reference adaptation if needed.** If the reference shows N items and the bundle needs M, ask how to scale (extend logic, re-think for M, split into groups).
4. **Aesthetic direction.** Triangulate with concrete references — adjectives are loose.
5. **Pose orientation.** Top-down flat lay, three-quarter standing, mixed.
6. **Open/closed states.** Which bags are opened with contents spilling? Which are sealed?
7. **Pairing or props.** Dips, garnishes, accent objects? Research what pairs with the product if the user defers.

### Stage 4 setup

1. **Packshot readiness.** Are packshots final, or do they have micro text / printed typos that should be stripped first?
2. **Bag flavour layout.** Which flavour goes in which slot. Reconcile with open-bag positions.
3. **Brand spelling verification.** Confirm exact spellings, taglines, subheads. Lock as immutable.
4. **Label colour verification.** Confirm exact text colours per flavour.
5. **Single-pass or sequential.** Default to single-pass. Ask if user wants sequential explicitly.

## The prompt schema

All Stage 4 and Stage 5 prompts use this format. Section headers are literal — use them in the prompt itself.

### Schema

```
# Assets provided
- Image 1: [what it is]
- Image 2: [what it is]

# Brief
- [One sentence describing the job. Be specific about what changes and where.]

# [Cast details / Bag assignments / Targets to correct]
- [Each line is one concrete instruction. No paragraphs.]
- [Include only what the model needs to know to make this pass succeed.]
- [For single-pass casts, this section is "Bag assignments" with one line per bag.]
- [For sequential casts, this section is "Cast details" for the one flavour being cast.]
- [For refinement, this section is "Targets to correct" or "Tortilla chip realism".]

# Critical
- [Hard locks. What must NOT change.]
- [Spelling anchors where relevant.]
- [Colour anti-patterns where relevant.]
- [Always: "Everything else stays identical to Image 1" or similar passthrough lock.]
```

### Length targets

- Stage 4 single-pass: 1,500-2,200 characters. Longer than other passes because it's doing more work.
- Stage 4 sequential per-flavour: 400-600 characters.
- Stage 5 refinement passes: 700-1,200 characters each.

Going over the target isn't fatal, but always ask if any line is earning its place. The lean prompt outperformed the verbose one across every test.

### Single-pass cast template

```
# Assets provided
- Image 1: white-base scene ([N] plain white bags arranged on [surface], props in place)
- Image 2: compositor with all [N] clean packshots ([flavour names])

# Brief
- Cast all [N] flavours onto the bags in Image 1, one flavour per bag (or [N] for repeated flavours). Each cast bag keeps its existing position, rotation, and open/sealed state from Image 1.

# Bag assignments
- [Position 1, with disambiguating spatial detail]: [Flavour] — [special notes, e.g. chips colour]
- [Position 2, with disambiguating spatial detail]: [Flavour]
- [continue for every bag]

# Cast details (per flavour)
- [Flavour 1]: [stripe colour], [monogram style], [text colour], [pattern if any], [subhead if non-standard]
- [Flavour 2]: [as above]
- [continue for every flavour, one line each]

# Critical
- Match Image 2's packshots exactly for label text, layout, and design on every cast bag
- Preserve every prop, chip pile, linen texture, and shadow from Image 1
- [Specific colour anti-patterns where flavours could be confused]
- [Chip colour locks where applicable]
- 4K, 1:1 aspect ratio
```

### Sequential per-flavour cast template

```
# Assets provided
- Image 1: scene (with [previously-cast flavours] cast)
- Image 2: cast ([Brand] Bag: [Flavour])

# Brief
- Cast [Flavour] packshot onto ONE bag: [specific spatial anchor — not "the last white bag", use a unique visual identifier].

# Cast details
- [Stripe colour with one anti-pattern]
- [Monogram style]
- [Text colour]
- [Pattern presence or absence]
- [Spelling anchor if relevant]

# Critical
- Everything else should remain identical to the original scene, only the cast placeholder changing
- You must preserve all text on the already-cast bags exactly as-is — do not redraw or distort it. The pixels must remain identical.
```

### Refinement Pass 1 (text and bag detailing) template

```
# Assets provided
- Image 1: rendered scene (refinement target)
- Image 2: compositor with all clean packshots — text ground truth

# Brief
- Refinement pass on Image 1. Sharpen and correct label text on every bag to match Image 2's packshots exactly. [Other specific text/bag fixes.] Everything else stays identical.

# Targets to correct
- All packaging text on every bag — [list the label types: wordmark, subhead, tagline, flavour callout, etc.] — must read correctly per Image 2
- [Any specific bag-level fixes, e.g. "Restore [Flavour]'s pattern on the [colour] bands"]
- Monogram badges on every bag: stacked letters legible inside each circle
- Bag material: sharpen the matte foil-laminate finish

# Critical
- Do NOT regenerate the scene, move bags, props, or chips positions
- Do NOT change any colours, stripe patterns, or bag designs beyond text correction
- Do NOT touch the chips — leave them exactly as in Image 1
- Use Image 2's packshots as text ground truth — labels should read what the packshots show, exactly
```

### Refinement Pass 2 (surface realism) template

```
# Assets provided
- Image 1: refined scene from Pass 1 (surface realism target)

# Brief
- Refinement pass on Image 1. Make [target elements, e.g. "the two chip piles"] look hyperrealistic. Everything else stays identical.

# [Target] realism
- [Specific realism cues — oil sheen, salt grains, colour variance, irregular shapes, etc.]
- [Variant handling, e.g. "Blue corn chips: same realism principles, natural blueberry-purple, NOT bright blue"]

# Critical
- Do NOT regenerate the scene, move bags, or change bag designs
- Do NOT touch any of the bags — labels, stripes, monograms, materials stay exactly as in Image 1
- Do NOT change [target] positions, counts, or scatter — only surface texture and realism
- Do NOT change the [other locked elements]
```

## Pre-flight check

Before delivering prompts:

- **Packshots prepped.** Micro text and printed errors stripped. Anything that won't render legibly at cast scale removed.
- **Compositor built.** All packshots arranged in a grid for single-pass casting.
- **Brand spellings verified and anchored.** Letter-by-letter anchoring on the names with common defaults.
- **Label colours specified per flavour.**
- **Monogram styles specified per flavour.** Light blue, navy-outlined white, coral-orange-outlined white, etc.
- **Open/closed states explicit per bag.**
- **Position language unambiguous.** Each cast bag has a unique spatial anchor.
- **Chip colour changes called out.** If any flavour has different-coloured contents.
- **Critical section ends every prompt.** Hard locks on what doesn't change.

## Output format per prompt

1. **Stage label** (e.g. "Stage 4: single-pass cast")
2. **Inputs note**: what goes into the compositor and as Image 1
3. **The prompt**: full block ready to paste, with section headers
4. **Character count** — flag if over the target length
5. **Watch-fors**: short list of things most likely to drift, with fix language ready

Between stages, pause for user review before proceeding.

## Common failure modes and recovery

**Composition drifts at Stage 1 with reference images.** Reference content overrode text. Drop the reference, re-run text-only.

**Single-pass cast collapses (multiple bags wrong, label degradation across the board).** The model couldn't handle the simultaneous attention. Try 2-3 more seeds first. If all fail, fall back to sequential. Check the packshot compositor — too many packshots at low resolution can hurt.

**Adding a third image input to fix a sub-element (e.g. monogram reference) destabilises rather than helps.** Adding more reference images dilutes attention across inputs and biases bag orientation toward whatever orientation dominates the references. If a small printed element (monogram, badge, fine text) isn't rendering well at cast scale, do not solve it by adding another image input. The realistic fixes are: accept the limitation at small render size, overlay the element in Photopea post-generation, or describe the element's letterforms more concretely in the prompt itself.

**Sequential cast: previously-cast bag labels degrade.** Expected with sequential. Don't try to fight it in the prompt with verbose enumeration — it doesn't help. Plan the refinement pass to correct labels at the end using the packshot compositor as ground truth.

**Cast bag goes to the wrong slot.** Position language too vague. Replace "middle-top" or "the last white bag" with a unique spatial identifier ("the bag partially cropped by the top edge of the frame", "the open bag in the upper-left with golden chips spilling").

**Weight callout (NET WT) appears on cast bags.** Packshot wasn't fully cleaned. Strip the micro text from the packshot file, not the prompt.

**Chip colours flip between piles.** Cast prompt didn't anchor the chip colour change explicitly, or anchored only one side. Anchor both: "upper-left chips stay golden corn" + "bottom-right chips change to blue corn (blueberry-purple, NOT bright blue)".

**Open bag closes during casting.** Cast prompt didn't preserve open state. Add explicit "stays open with chips spilling exactly as in Image 1".

**Refinement Pass 2 (surface) degrades the labels fixed in Pass 1.** Pass 2 didn't have a strong enough "do not touch the bags" lock. Strengthen with explicit per-element list of what doesn't change.

**Refinement sharpens wrong text into crisper wrong text.** Refiner sharpened existing letters instead of correcting toward the compositor. Ensure the compositor is wired as Image 2 and the prompt explicitly calls it the "text ground truth". If still failing, per-bag refinement (locked scene + single clean packshot) is the path.

**Endless model-testing without a clean cast landing.** Pivoting between inpaint variants and alternative generators when Gemini 3 is producing close-but-not-quite results. Return to Gemini 3 Pro, 2-image setup, 4K. Iterate on prompt structure, run sandbox-parallel with different seeds. If three Gemini 3 attempts at the same prompt fail, the prompt needs rewriting, not the model.

## Voice and tone

- Plain, direct, minimal formatting
- No em dashes
- One question per ask_user_input_v0 cluster where possible
- Honest about uncertainty: "this is the highest-risk pass" when true
- When the user pushes back, take it seriously and re-think rather than defending
- Don't over-prescribe workflow shape. The brief shapes the workflow

## When the skill should escalate

- The user wants 10+ products in one scene — suggest splitting into multiple scenes or simplifying the bundle
- The user can't decide on reference adaptation — propose a default ("extend the same logic") and move on
- The user asks for hands, faces, or readable text on small props — propose alternatives, these are high-variance for models
- The user supplies a reference with rights concerns (competitor's actual photo) — suggest using it for composition logic only and changing other elements

## A note on tools

This skill is tool-agnostic but designed around Gemini 3 (Nano Banana Pro) with a compositor node pattern. The single-pass-with-compositor architecture is Gemini-specific in its current form — other models may not handle simultaneous multi-cast as well. Test other models on small bundles before scaling.
