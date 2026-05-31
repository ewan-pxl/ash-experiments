---
name: bundle-into-lineup
description: Generates a Gemini 3 prompt that composes multiple product packshots into one clustered group photo on pure white seamless, ready for post-production transparency extraction. Locks camera angle (eye-level, slight upward tilt), upright posture, relative sizing, and overlap so the bundle reads as a cohesive square cluster — not a spaced line or leaning pile. Use when the user has 3-8 packshots and wants a clean bundle shot for ecom, transparency cutouts, or hero assets. Distinct from `bundle-into-scene`, which builds environmental lifestyle compositions. Triggers include "/bundle-into-lineup", "bundle on white", "transparent bundle", "compose these into a lineup", "ecom bundle shot", "white background bundle", "cluster these products", "group shot of these SKUs", and phrasing like "make me a clean bundle of these for the PDP".
---

# Bundle Into Lineup

## What this skill does

Takes 3-8 product packshots and produces a single Gemini 3 prompt that composes them into a clustered group photograph on pure white seamless background, with locked camera angle, upright posture, correct relative sizing, and natural overlap.

The output is a prompt. The user runs it in their generation tool (typically Weave with a Gemini 3 / Nano Banana Pro node).

The intended downstream use is a clean bundle image suitable for post-production transparency extraction (white-bg-with-shadows is easier to cut than a true transparent PNG, and matches how the user finishes).

## When this skill applies

The user has:
- Multiple distinct product packshots (3-8 SKUs)
- Wants them in one image, on white, as a cohesive group
- Cares about composition (angle, sizing, posture, clustering) — NOT about scenes, props, or environments

Do NOT trigger when:
- The user wants a lifestyle / scene composition → `bundle-into-scene`
- The user wants scene variations of one product → `locked-product-scenes`
- The user wants multiples of the same SKU in a bundle (variety pack style) → `bundle-into-scene` is better suited
- The user wants matching illustrations or icons → `icon-pack-from-reference`

## Architecture in one paragraph

Two image inputs feed the model: a **composition reference scene** (a real product photograph showing the cluster style, camera angle, and overlap behaviour we want to match) and a **packshot compositor** containing all the SKU packshots. The prompt tells the model explicitly that the scene reference is for camera/posture/clustering ONLY, that its background must be ignored, and that the actual products are the packshots. Then a tight set of decision rules describes the cluster: one flat surface, every product upright, smallest items at the front, biggest items anchoring the back, products overlapping in depth by ~30%, square-ish silhouette. The prompt does NOT describe label artwork — the packshot images carry that. Single pass, single prompt. Expect to retouch labels in post for bundles of 6+ products.

## Core principles

### The composition reference does the heavy lifting

Prose alone cannot reliably control camera angle, posture, spacing, and overlap. The model has strong priors toward top-down product photography, dynamic angles, and dramatic shadows. Every version of this prompt that tried to lock composition through language alone (v0-v3 in the build session) fought the model and lost.

The fix is a composition reference image. Pick any clean product cluster photo with the angle and clustering style you want — Hairlust, Glossier, PATTERN, any DTC brand that shoots tight clustered groups on neutral backgrounds. Feed it as Image 1. Tell the model explicitly: "use this for camera, posture, clustering, lighting — ignore its background and products."

The reference does in one image what 600 words of prose cannot.

### Describe roles, not positions

The model cannot reliably resolve eight positional assignments in a single shot. "Peppermint goes middle-left, Bison goes middle-centre-left, Vanilla goes middle-centre-right" gets interpreted loosely at best and ignored at worst.

What works: describe each product's **role** in the cluster.
- "The two amber jars sit toward the back of the cluster"
- "The lip balm tubes stand in front of and between the jars"
- "The tiny eye cream sits at the front, closest to camera, where its small size is dramatically obvious"

Roles compress eight positional decisions into three rules the model can act on. Trust the model to arrange within roles.

### One flat surface, no shelves

"Back layer / middle layer / front layer" language is dangerous. The model interprets "layer" as different elevations and produces shelf-like compositions where the back products sit on a higher plane than the front. Instead say: "ONE flat surface. There is only one surface — no shelves, no ledges, no elevation changes. Every product's base touches the same flat plane."

Negation matters. The model needs to hear what NOT to do, not just what to do.

### Smallest items go in the front, not the edges

Intuition says "put the small item at the edge where its size is obvious against its neighbour." Wrong. In a clustered composition the small item gets buried at the edge. Put it at the front, closest to camera, so its tininess is silhouetted against the taller products directly behind it. This is what real product photographers do (see Hairlust's hair oil dropper).

### Specify overlap as a percentage, not a vibe

"Cluster tightly" produces piles. "Overlap by about a third" produces clean overlap. The model can act on geometric specifics; it cannot act on "feel cosy". Use numbers when you have them.

### Square silhouette beats wide line

The default for "row of products" is a wide horizontal line — products spaced out, lots of white margin top and bottom, no depth. Fight this explicitly. Say "the cluster has a roughly square silhouette: as wide as it is tall." Repeat the word "square" 2-3 times in the prompt. The aspect ratio of the output should support this — 4:5 or 1:1, not 16:9.

### Do NOT describe label artwork in prose when images are provided

This is the persistent failure mode. When you pass 8 image inputs AND describe every label in prose ("yellow VW van, bison illustrations, VanMan's in white script"), the model treats the prose as a generation instruction and **redraws** the labels instead of using the references. Strip all label descriptions. Let the packshot images carry that work. Describe shape, posture, and arrangement only.

The bracketed "reference image provided" cue tells the model which input goes where without describing what's on the label.

### Repeat critical constraints 2-3 times

Three things in this skill's domain need repetition or they get drowned out by surrounding language:
1. **Upright posture** — every product stands on its flat base, no leaning, no tilting
2. **No overlap into each other / each product appears exactly once** — prevents the model from duplicating SKUs to fill perceived gaps
3. **Pure white background, no environmental elements** — fights the model's tendency to lift the background from the composition reference

Repetition is not redundancy. It's weighting.

### Expect to retouch labels in post for bundles of 6+ products

Gemini 3 with 6+ distinct labelled products in a single scene degrades label fidelity faster than composition fidelity. The composition will land. The labels will be 70-90% right — close enough that the bundle reads correctly at a glance, wrong enough that hero-grade ecom use needs Photoshop touch-up.

Be honest with the user about this upfront. The realistic workflow for hero bundle assets:
1. Use this skill to nail composition (angle, sizing, arrangement)
2. Accept that labels will need correction
3. Mask each product in Photoshop, paste the source packshot label in
4. 15-20 minutes of post per bundle

This is not a failure — this is how most agencies actually produce AI bundle hero shots. Encoding this expectation up front prevents endless prompt iteration trying to fix labels in-model.

### Refinement passes are stackable but each rolls the dice on previously-correct elements

If the user wants to refine labels in-model (rather than Photoshop), each Gemini 3 edit pass regenerates the entire image. There is no truly local edit. A second edit pass risks breaking what the first one fixed.

Rule: only ever run ONE consolidated refinement pass. If labels are still wrong after that, go to Photoshop. Don't stack edits.

## The workflow

### Stage 1: Intake (always run this first)

Ask the user:

1. **What SKUs are in the bundle?** Names, and which uploaded image is which.
2. **Quantities.** Multiple instances of one SKU is a different skill (`bundle-into-scene`). This skill assumes each SKU appears once.
3. **Relative sizing.** Pick the largest item as the anchor (1.0x) and ask the user to express each other item as a rough multiplier of that anchor. The user does not need to know real dimensions — "about half the height of the jar" is enough.
4. **Composition reference.** Does the user have a reference image showing the clustering style they want? If not, suggest sourcing one (Hairlust, Glossier, PATTERN, or any DTC brand bundle shot). Do NOT generate without one.
5. **Background.** Default: pure white seamless with contact shadows (user finishes to transparent in post). Confirm.

### Stage 2: Render the sizing table

Show the user a small table for sanity check:

| SKU | Form | Scale | Notes |
|---|---|---|---|
| [Largest SKU] | [e.g. jar, bottle] | 1.0x (anchor) | [size detail if relevant] |
| [Next SKU] | [form] | [multiplier] | [notes] |
| ... |

Confirm before generating the prompt.

### Stage 3: Generate the prompt

Use the template below. Pre-fill it with the user's SKUs, sizing, and the composition reference description. Hand the prompt to the user.

Tell the user:
- Wire the composition reference as **image input slot 1** (first slot) — first image gets weighted as the style anchor
- Wire packshots as slots 2 through N
- Expect to need post-production label retouch if 6+ SKUs

### Stage 4: Iteration (if needed)

After the first generation, common issues and their fixes:

- **Composition is wrong** (leaning products, top-down angle, wide line instead of square) → reinforce the failing constraint with explicit negation. "Every product stands UPRIGHT. NONE leans or tilts."
- **Labels are wrong** → DO NOT add label descriptions to the prompt. Either run one consolidated refinement pass listing label fixes, or accept and go to Photoshop.
- **Wrong background lifted from composition reference** → strengthen the "ignore the background of the composition reference" language with explicit examples ("NO tiled wall, NO marble counter, NO grey backdrop")
- **A product is duplicated** → reinforce "each product appears exactly ONCE" and "do not duplicate any product"
- **Sizing is wrong** → strengthen the size relationships block, hammer the "X is roughly half the height of Y" language

If three iterations don't land composition, the composition reference is probably wrong for the goal. Pick a different reference.

## The prompt template

````
You are provided with [N+1] reference images:

- IMAGE 1 — COMPOSITION REFERENCE: [one-line description of the reference scene, e.g. "a clustered group of HAIRLUST haircare products on a grey backdrop"]. Use this image ONLY for: camera angle, product posture, clustering style, overlap between products, and lighting. Do not include any [brand from reference] products in the output. Do not include the [specific background of reference, e.g. "grey backdrop"] or any environmental element from this image.

- IMAGES 2-[N+1] — THE [N] PRODUCTS: the exact products to compose into the scene. Each product appears exactly ONCE in the output. Do not duplicate any product. Do not invent any product not shown in these references.

THE [N] PRODUCTS (each appearing exactly once):
1. [SKU name] — [form factor only, e.g. "amber glass jar with black metal lid, squat and wide"]
2. [SKU name] — [form factor]
[...continue for all SKUs]

SIZE RELATIONSHIPS (rigid — must be visible at a glance):
- [Anchor SKU(s)] is/are the LARGEST item(s) — [shape descriptor, e.g. "short and wide, like small mason jars"]
- [Mid-size SKUs] are [relationship to anchor, e.g. "taller than the jars but MUCH NARROWER — like slim columns"]
- [Smallest SKU] is the SMALLEST item by a wide margin — [relationship, e.g. "roughly half the height of the jars and noticeably petite"]

SCENE:
All [N] products stand together on ONE flat white surface. There is only one surface — no shelves, no ledges, no elevation changes. Every product's base touches the same flat plane.

The products are clustered close together as a single tight group, with the products in front partially overlapping the products behind them — matching the clustering style of IMAGE 1. The cluster has a roughly square silhouette: as wide as it is tall.

Within the cluster:
- [Largest SKUs] sit toward the back of the cluster, [arrangement note]
- [Mid-size SKUs] stand in front of and between [larger items], packed close together, partially overlapping [larger items] by about a third
- [Smallest SKU] sits at the front of the cluster, closest to the camera, where its small size is dramatically obvious against the taller products behind it

Every product stands perfectly upright on its flat base. Nothing leans, tilts, or angles. Every label faces the camera.

CAMERA: Match IMAGE 1. Camera at counter height, lens tilted up about 5–8 degrees. Viewer looks very slightly up at the cluster.

LIGHTING: Soft, even, neutral daylight from front-upper-left. Faithful colour rendering. No harsh specular.

SHADOWS: Soft contact shadows beneath the cluster, merging into one shadow pool because the products are packed tight. Short, neutral grey. No long cast shadows. No reflections.

BACKGROUND — CRITICAL: Pure solid white (#FFFFFF) seamless background. NO [specific environmental element from reference]. NO gradient. NO texture. NO environmental element of any kind. The products stand on a flat white surface that blends into a flat white backdrop with no visible seam, edge, or transition. The ONLY thing breaking the white is the soft contact shadow beneath the cluster.

Do not borrow any environmental element from IMAGE 1. The composition reference is for camera and clustering guidance ONLY — its background must be completely ignored.

LABEL FIDELITY: Every product's label must match its source reference image (IMAGES 2-[N+1]) EXACTLY — every word, every illustration, every colour, every typographic detail. Do not redraw, restyle, or reinterpret any label.

OUTPUT: 4:5 or 1:1 aspect ratio. Cluster centred with moderate margin on all sides.
````

### Length target

The prompt sits around 1,800-2,500 characters when filled in. Longer than that and the model's attention dilutes; shorter than that and one of the critical constraints is missing.

## Refinement template (one pass only)

If the composition lands but labels need correction, run ONE consolidated edit pass:

````
Refinement pass on the existing composition. Keep the camera angle, product positions, sizing, lighting, shadows, and overall composition EXACTLY as they are. Do not move, resize, rearrange, add, or remove any product.

Fix the following label details to match the source reference images (IMAGES 2-[N+1]) exactly:

1. [Product name] — [specific fix, e.g. "the van illustration on the lid must be YELLOW, not coral"]
2. [Product name] — [specific fix]
[...continue for all label issues]

All other elements remain unchanged. Same camera, same composition, same lighting, same products in the same positions, same count of [N] products.
````

Critical: only run this ONCE. If labels are still wrong, go to Photoshop. Stacking edit passes rolls the dice on previously-correct elements and typically degrades more than it fixes.

## Failure modes and recovery

**Composition is a uniform grid / catalogue look.** Prompt has too much positional language ("back row, middle row, front row"). Strip the row language, replace with role-based language ("back of cluster, front of cluster"). Reinforce square silhouette.

**Products are leaning, tilting, or piled.** Prompt has "casual" or "cluster" framing that gave the model permission to angle products. Strip casual language. Replace with "every product stands PERFECTLY upright on its flat base" repeated 2-3 times. Add "nothing leans, tilts, or angles."

**Products are too spread out (wide horizontal line).** Square silhouette language is missing or weak. Add "the cluster has a roughly square silhouette: as wide as it is tall" and repeat the word "square" elsewhere. Shift output aspect ratio to 1:1.

**A product is duplicated in the output.** The model couldn't reconcile N image inputs with the requested composition and reused one to fill a perceived slot. Reinforce "each product appears exactly ONCE" and "do not duplicate any product."

**The wrong background is being lifted from the composition reference** (e.g. marble counter, tiled wall, grey gradient). Strengthen the "ignore IMAGE 1's background" language with explicit examples of what NOT to render. Place this near the end of the prompt where attention is highest.

**Sizing is wrong** (eye cream rendered as jar-sized, or all items at uniform size). Size relationships block is too weak or too far from the description of where each item goes. Move size relationships earlier. Use the words LARGEST and SMALLEST in caps. Use concrete relationships ("roughly half the height of").

**Labels are gibberish or reinterpreted.** This is the persistent failure mode. The model has 6+ products to render and is filling in label text from its priors. Do not solve this in the composition prompt. Either:
- Accept and go to Photoshop (recommended for hero use)
- Run ONE consolidated refinement pass listing the specific label fixes
Do NOT stack multiple refinement passes — each one rolls the dice on labels that were correct.

**Shelves / elevation changes appear in the output.** "Layer" language was interpreted as elevation. Strip "back layer / front layer," replace with "back of cluster / front of cluster" on one shared surface. Add "ONE flat surface, no shelves, no ledges, no elevation changes."

**Composition reference's products bleed into the output** (e.g. the actual Hairlust bottles appear). The prompt didn't explicitly tell the model the reference is for composition only. Add "Do not include any [brand from reference] products in the output" at the top of the prompt where assets are listed.

## Pre-flight check

Before delivering the prompt:

- **Composition reference selected.** A clean product cluster photo with the angle and clustering style desired. Confirm what the reference's background is so it can be explicitly excluded.
- **SKU list confirmed.** Names and which image is which.
- **Sizing relationships specified.** User has confirmed the relative scale of each SKU.
- **Background expectation set.** Default white seamless. Confirm.
- **Output use clarified.** PDP, lifestyle, ads, etc. Affects aspect ratio choice.
- **Label retouch expectation set** if 6+ SKUs. User knows the realistic workflow.

## Voice and tone

- Plain, direct, minimal formatting
- No em dashes in skill outputs to the user (Ash preference)
- One question per ask_user_input_v0 cluster where possible
- Honest about model limitations — flag the label fidelity issue upfront, don't oversell
- When the user pushes back on composition, take it seriously and rebuild the prompt rather than defending the previous version
- Suggest Photoshop post-production as a positive workflow choice, not a failure admission

## When the skill should escalate

- The user wants 9+ products in one bundle → suggest splitting into two bundles or moving to `bundle-into-scene` which handles density better via the compositor pattern
- The user wants multiples of the same SKU → not this skill, use `bundle-into-scene`
- The user wants the products in a real environment (countertop, bathroom, kitchen) → not this skill, use `bundle-into-scene`
- The user has no composition reference and can't source one → offer to describe the angle in detail and try prose-only, but flag that this is the failure mode the skill is built to avoid

## A note on tools

This skill is designed around Gemini 3 (Nano Banana Pro) in a Weave node setup. The composition-reference-plus-packshots pattern is general but tested specifically on Gemini 3. Test other models on small bundles (3-4 SKUs) before scaling.
