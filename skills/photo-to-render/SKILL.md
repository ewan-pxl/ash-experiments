---
name: photo-to-render
description: Turn real product photographs of one football boot into clean, studio-quality commercial renders, using a reference render of a similar boot as the angle, framing, lighting, and background anchor. The casting step is photo-TO-render: it does not invent a boot, it transforms the real photos you provide. The photos are the truth of the product, the reference render is the truth of the look. Casts five candidates so you pick the best and re-roll if none land, then offers an a-la-carte menu of single-job edit passes (background colour, stud or sole pattern, colourway, angle or view variant, upscale or polish). Outputs paste-ready prompts only. Triggers include "/photo-to-render", "render this boot", "turn these photos into a render", "clean render from these shots", "studio render from these photos", "extrapolate the render across the line", "make these match the reference render". For other jobs, see the related skills noted under "When it applies".
---

# Photo to Render

## What this skill does

You have real photographs of one football boot model. Top-down pairs, an in-box shot, an inside view, a grass shot, a close-up of the studs. They are messy: real backgrounds, real shadows, uneven light, glare, barcodes, stray text. You also have one reference render of a different but similar boot. That render shows the camera angle, framing, clean studio background, and lighting you want.

This skill writes the prompts that turn the real photos into a clean studio render of YOUR boot, matching the reference render's look. Then it writes the optional follow-up prompts that change one thing at a time (background colour, studs, colourway, view) and a final polish prompt.

It outputs prompts only. You run them in Weave, the node-based image canvas, using the Nano Banana and Nano Banana Pro image models. It does not wire nodes for you and it does not pick models for you beyond telling you which prompt goes where. (Plain gloss for anyone new: Weave is the canvas where images get generated, Nano Banana Pro is the image model the prompts are written for, and a "composite" is simply a node that stacks several of your photos into one input.)

The core move is photo-to-render. The real photos are the truth of the product. The reference render is the truth of the look. The prompt's only job is to fuse the two and never to re-describe the boot from scratch.

## When it applies, and when it does not

Use this when:
- You have real photographs of one boot model and want a clean studio render.
- You have a reference render (of this boot or a near sibling) that defines the angle, framing, background, and lighting.
- You want to extrapolate that render look across more shots of the same boot (different views, different stud setups).

Do not use this when:
- You want several different products arranged in one shot. Use `bundle-into-lineup` (the skill for a clean white product cluster) or `bundle-into-scene` (the skill for a lifestyle composition).
- You already have a clean packshot and just want new scenes around it. Use `locked-product-scenes` (the skill for scene variations of an already-clean product).
- You want a near-clone of one image with a small surface tweak. Use `pair-image` (the skill for a surface-modified sibling of one finished image).

If you are unsure, the test is simple: this skill starts from messy real photos and ends at a clean render. If you are not starting from real photos, you are probably in a different skill.

## Core principles

These are not style preferences. They are the rules that keep the boot from drifting into a different boot. Carry every one of them.

1. Prompts only. The skill produces prompts. Weave runs them. Stay on the prompt side of the line.

2. The reference image is the description. Never write prose that re-describes the boot's shape or build. Name the photos as the source of product truth and the reference render as the source of angle and look. Re-describing the boot in words invites the model to reinterpret it, and reinterpretation is the main way a render goes wrong.

3. Lock once, vary the rest. Identity lock language must be byte-identical everywhere it appears: same words, same order, across the casting prompt and across every edit pass. Identical means identical. If you change "stud layout and stud colour exactly as in the source photos" to "the same studs", you have introduced drift.

4. Layer the edits, never compound them. One job per pass. If you ask for a new background and new studs and a polish in a single prompt, the model will quietly redraw the locked boot while it is busy. Fire one edit, confirm it, then fire the next.

5. Prep upstream, do not fight in-prompt. Strip illegible micro-text, typos, barcodes, and box clutter from the source photos before casting. Do not write "ignore the barcode" or "remove the box text". The model reproduces what it sees, so clean the source first.

6. Anchor non-default content at every stage where it appears. A neon green upper, a specific stud colour, a blue and black sole, a non-standard colourway: name these explicitly in every prompt that touches them, not just once. Defaults drift back toward the average boot if you stop naming the thing that is unusual.

7. Honest about the loop. Casting generates five candidates. You pick the best. If none land, you re-roll fresh, you do not patch a bad one. This is not deterministic, so say so. If three re-rolls in a row fail, stop re-rolling and re-check the interview: the photo prep, the reference render's role, and the orientation are the usual culprits.

8. Honest about model limits. Small logos and small stud text may need a touch-up in Photoshop or Photopea. Flag this rather than promising the model will nail every glyph.

9. Always interview before emitting prompts. Confirm the boot, the source photos and their state, the reference render's role, the exact lock set, and which edits are wanted. Surface what you identified back to the user for confirmation before you write anything.

## Footwear lock anatomy

When you build a lock set, enumerate the boot by named parts. Never accept "the boot" as a description. The parts are:

- Upper (material and colour: knit, woven mesh, synthetic, leather)
- Silhouette and profile (low-cut or mid-cut collar, toe box shape)
- Sole plate (firm ground, soft ground, artificial ground, indoor flat)
- Stud / cleat layout and colour (number, placement, conical or bladed, stud colour)
- Lace colour and lacing (cross-over, laceless, speed holes, lace cover)
- Tongue (gusseted or separate, folded or flat, tongue branding)
- Heel counter (shape, internal or external, heel tab)
- Logo / brand mark placement and colour (forefoot, tongue, heel)
- Colourway (the full named scheme across upper, sole, accents)
- Left or right orientation
- Inside (medial) view versus outside (lateral) view

When you write a lock set for a prompt, list the parts that matter for that boot by name, then anchor any non-default colour or detail explicitly. This is the boot translation of the bag and jar lock language used elsewhere in the family.

## The workflow spine

The order is fixed. The passes inside Edits are not.

1. Prep the source photos. Crop, upscale, strip clutter and micro-text. (Nano Banana prep step per photo, upstream of everything.)
2. Cast. Feed the prepped photos plus the reference render. Generate five candidate renders. Pick the best. If none land, re-roll fresh.
3. Edits, a-la-carte. Apply whichever single-job edit the chosen render needs: background colour, stud or sole pattern, colourway, angle or view variant, polish. Zero, one, or several, in any order, each as its own pass on the current chosen image.
4. Upscale. A final resolution and polish pass that does not touch product identity or labels.
5. Optional: client feedback handling. If feedback comes back, translate it into one more single-job edit pass, then re-upscale.

The spine is the part that never changes. The Edits menu is what lets a nuanced project still fit: you are always casting then editing then upscaling, you just pick different edits.

## The casting prompt template

This is the workhorse. It fuses the prepped real photos (product truth) with the reference render (look truth). Fill the bracketed lock fields once, from the interview, and keep them byte-identical into every later pass.

Inputs to provide in Weave: the prepped source photo(s) of your boot, and the reference render. Generate five candidates from this single prompt.

```
TASK
Take the source photographs of the boot and produce one clean studio render of that exact boot, matching the camera angle, framing, background, and lighting of the reference render. The source photographs are the truth of the product: upper, colourway, stud layout, logos, and lacing all come from them. The reference render is the truth of the look only: angle, framing, studio background, and lighting. Do not copy the boot shown in the reference render. Treat this as transforming the real boot into the reference render's studio setup, not generating a new boot inspired by either image.

WHAT MUST CHANGE
Replace the real-world background and lighting with the reference render's clean studio background and studio lighting. Present the boot as a pristine, brand-new product render: no real-world shadows, no glare, no environmental clutter, no creasing introduced by handling.

WHAT MUST NOT CHANGE
The boot's identity is fixed by the source photographs and must be preserved exactly:
- Upper: [material and colour, e.g. neon green woven knit upper] exactly as in the source photos.
- Silhouette: [collar height and toe box, e.g. low-cut collar, tapered toe box] exactly as in the source photos.
- Sole plate: [type, e.g. firm-ground sole plate] exactly as in the source photos.
- Stud layout and stud colour: [e.g. bladed studs, blue and black] exactly as in the source photos. Same count, same placement.
- Laces and lacing: [e.g. black laces, standard cross-over] exactly as in the source photos.
- Tongue: [e.g. low gusseted tongue] exactly as in the source photos.
- Heel counter: [e.g. structured heel with pull tab] exactly as in the source photos.
- Logo and brand mark: [e.g. forefoot logo and heel logo] in the exact position, size, and colour shown in the source photos. Do not regenerate, restyle, or move any logo.
- Orientation: [left or right boot], [inside/medial or outside/lateral] view as in the source photos.
The boot appears exactly once. Do not duplicate it. Do not invent parts not shown in the source photos.

CONSTRAINTS
Hyperrealistic, sharp focus, studio product render. Clean studio background and shadow treatment matching the reference render. No environmental elements, no outdoor light, no grass, no box, no hands or feet. No new objects. No boot, text, or branding from the reference render's product. No duplication, no artefacts. Match the reference render's angle and lighting exactly while keeping the boot's identity from the source photos exactly.
Everything else about the boot stays identical to the source photographs.
```

Notes on filling it:
- Only name parts that exist and matter on this boot. Do not pad.
- Anchor anything non-default (a loud colourway, an unusual stud colour) here, because it has to be byte-identical in the edits later.
- If the reference render's angle does not match the source photo's view, decide in the interview which view the render should be and say it once under WHAT MUST NOT CHANGE (orientation line). Do not describe the angle in prose, let the reference render carry it.
- Reconcile the shadow with the reference render. If the reference render sits on a clean sweep with a soft contact shadow, say "soft contact shadow under the sole only". If the reference render has no shadow at all, say "no cast shadow, matching the reference render" so the two CONSTRAINTS lines do not fight each other.

## The a-la-carte edit passes

Each pass assumes one thing: here is the current chosen render, change exactly this one element. Run them on the chosen image one at a time. Every pass repeats the same identity lock so the boot holds. Copy the lock fields byte-identical from the casting prompt. Every pass ends with a passthrough lock line, the closing "everything else stays identical" sentence, which is your belt-and-braces against drift.

### Edit pass: background colour swap

```
TASK
Take the current render and change only the studio background colour to [new background colour, e.g. soft warm grey]. This is a surface edit of the current image, not a new render. Do not reinterpret or regenerate the boot.

WHAT MUST CHANGE
The studio background colour becomes [new background colour, e.g. soft warm grey, like unfinished concrete]. Keep it a clean seamless studio sweep. Adjust the contact shadow tone to sit naturally on the new background.

WHAT MUST NOT CHANGE
The boot exactly as in the current image: upper [material and colour], silhouette, sole plate, stud layout and stud colour [non-default colour], laces, tongue, heel counter, and every logo in its exact position, size, and colour. The boot's angle, framing, scale, and position in frame stay identical. Lighting on the boot itself stays identical. The boot appears exactly once.

CONSTRAINTS
Hyperrealistic, sharp focus. Seamless studio background, no gradient banding, no texture, no environmental elements. Soft contact shadow under the sole only. No new objects, no duplication, no artefacts. Do not touch the boot.
Everything except the background colour stays identical to the current image.
```

### Edit pass: stud or sole pattern swap

Optional second input: if you have a photo that shows the target stud or sole pattern, feed it as Image 2 and let it carry the pattern rather than describing it in prose.

```
TASK
Take the current render and change only the sole plate and studs to [new sole or stud spec, e.g. a soft-ground sole with six conical metal studs]. [If a target photo is provided: match the sole plate geometry, stud count, stud shape, and stud placement shown in Image 2.] This is a surface edit of the current image. Do not reinterpret or regenerate the rest of the boot.

WHAT MUST CHANGE
The sole plate and studs become [new sole or stud spec], in [new stud colour if any] exactly. Keep the new studs cleanly integrated into the existing sole edge where it meets the upper.

WHAT MUST NOT CHANGE
Everything above the sole stays exactly as in the current image: upper [material and colour], silhouette, laces, tongue, heel counter, and every logo in its exact position, size, and colour. The boot's angle, framing, scale, position, and studio lighting stay identical. The line where the sole meets the upper does not move. The boot appears exactly once.

CONSTRAINTS
Hyperrealistic, sharp focus. Studio background unchanged. Soft contact shadow under the sole only. Studs are cleanly and evenly moulded: no extra studs, no missing studs, no fused or melted studs. No new objects, no duplication, no artefacts. Do not alter the upper, lacing, tongue, heel, or any logo.
Everything except the sole plate and studs stays identical to the current image.
```

### Edit pass: colourway swap

```
TASK
Take the current render and change only the colourway to [new colourway, e.g. all-black upper with a white sole and white laces]. This is a surface recolour of the current image. Do not change the boot's shape, parts, or any geometry.

WHAT MUST CHANGE
Recolour the boot to [new colourway], element by element: upper becomes [colour], sole becomes [colour], laces become [colour], accents become [colour]. Hold the recolour to a true material finish, not a flat fill, matching the lighting already on the boot.

WHAT MUST NOT CHANGE
The boot's silhouette, sole plate geometry, stud layout, lacing pattern, tongue, heel counter, and logo positions and sizes stay exactly as in the current image. Only colour changes, never form. The angle, framing, scale, position, background, and lighting stay identical. Logos keep their exact placement and may only change colour if [state whether logos recolour or stay]. The boot appears exactly once.

CONSTRAINTS
Hyperrealistic, sharp focus. Studio background unchanged. Realistic material response to the existing light, no flat paint look. No new objects, no duplication, no artefacts. Do not alter any shape or geometry.
Everything except the named colours stays identical to the current image.
```

### Edit pass: angle or view variant

```
TASK
Produce a [new view, e.g. inside/medial profile view] render of the same boot, matching the studio look of the current image. The source photographs remain the truth of the product. This shows the same boot from a different angle, not a different boot.

WHAT MUST CHANGE
The camera shows the [new view, e.g. inside/medial side profile], revealing [what that view exposes, e.g. the medial upper and the inside of the sole plate]. Keep the same clean studio background and the same lighting character as the current image.

WHAT MUST NOT CHANGE
The boot's identity is fixed by the source photographs and the current render: upper [material and colour], silhouette, sole plate, stud layout and stud colour [non-default colour], laces, tongue, heel counter, and every logo in its correct position, size, and colour for this view. Orientation is the [left or right] boot. Do not mirror the logo or the lacing when changing the angle. Studio background colour and lighting character stay identical to the current image. The boot appears exactly once. No parts invented that are not shown in the source photos.

CONSTRAINTS
Hyperrealistic, sharp focus, studio product render. Seamless studio background matching the current image. Soft contact shadow under the sole only. No environmental elements, no hands or feet, no new objects, no duplication, no artefacts.
Everything about the boot itself stays identical to the source photographs and the current render, only the viewing angle changes.
```

### Edit pass: upscale and polish

This is the final spine step. It must not touch product identity or labels.

```
TASK
Upscale the current render to high resolution and sharpen material detail. This is a quality and resolution pass only. Do not change any content, colour, shape, or layout.

WHAT MUST CHANGE
Increase resolution and clarity. Crisp material detail: [e.g. the knit weave of the upper, the stud edges, the sole texture]. Clean edge definition. Remove any soft compression artefacts.

WHAT MUST NOT CHANGE
Nothing about the product or the scene changes. Upper, colourway, silhouette, sole plate, stud layout and colour, laces, tongue, heel counter, every logo, the angle, framing, scale, position, background colour, and lighting all stay exactly as in the current image. Do not regenerate, restyle, move, or resize any logo or text. Do not repaint colours. Do not invent texture that is not already there.

CONSTRAINTS
Hyperrealistic, sharp focus. No content change, no recolour, no geometry change, no new objects, no duplication, no artefacts. Treat every logo and label as fixed pixels to sharpen, not to redraw.
Everything stays identical to the current image, this is a resolution and clarity pass only.
```

## The interview

Run this before writing any prompt. One question per cluster. Surface what you found back to the user for confirmation before emitting prompts.

1. The boot. What boot is this: brand, model, colourway? Is it one model with multiple views, or are you rendering several models? Surface back the named lock anatomy you can see (upper, sole, studs, laces, tongue, heel, logos, orientation) and ask the user to confirm or correct it.

2. The source photos. Which photos do you have and what state are they in? Clean studio-ish, or environmental (grass, box, in-hand)? Are there barcodes, typos, or micro-text that should be stripped upstream before casting? Which photo shows the truest colour? Confirm that prep happens before casting, not in the prompt.

3. The reference render's role. Confirm the reference render is the angle, framing, background, and lighting source only, and that its own boot must not bleed into the output. Does its angle match the view you want, or do we set a different view? This is load-bearing, without it the cast has no anchor.

4. The lock set. Walk the boot part by part and lock each one. Flag any non-default element (loud colourway, unusual stud colour, blue and black sole) that has to be anchored in every pass. Lock the exact lock-language wording here so it stays byte-identical downstream.

5. The edits wanted. Which edit passes do you expect to need: background colour, stud or sole swap, colourway swap, angle or view variants, polish? It is fine to decide some in real time after seeing the five candidates. Confirm the polish pass runs last.

6. Honesty check. Set expectations: five candidates, pick the best, re-roll if none land. Small logos and stud text may need a Photoshop or Photopea touch-up. Confirm the user is fine with that.

## Pre-flight check

Before you hand over any prompt, scan for all of these:

- Lock language is byte-identical across the casting prompt and every edit pass. Same words, same order. Diff them in your head.
- No prose re-describes the boot's shape or build. The photos and reference render carry the boot, the prompt only states the transformation and the locks.
- Every non-default element (loud colourway, unusual stud colour, blue and black sole) is anchored in every pass where it appears, not just in casting.
- Each edit pass changes exactly one element. No pass compounds two jobs.
- Each edit pass refers only to "the current chosen render", not to an earlier output in a chain.
- A closing passthrough lock line is present on every prompt.
- Source prep is upstream. No prompt says "ignore" or "remove the barcode" or "omit the box text".
- The reference render's own boot, background branding, and any product from it are explicitly excluded.
- Every logo and label is named as fixed: exact position, size, colour, no regeneration.
- The boot is locked to appear exactly once, with the correct left or right orientation and inside or outside view.
- The polish pass is content-frozen: no recolour, no geometry change, no logo redraw.
- No em dashes anywhere. Plain language. No marketing-speak.

## Failure modes and recovery

- Boot turns into the reference render's boot. Cause: the reference render's role was not locked to look-only. Fix: reassert under TASK that the source photos are product truth and the reference render is look only, and add to CONSTRAINTS "no boot, text, or branding from the reference render's product".

- Logo regenerates, moves, or restyles. Cause: it was not pinned as fixed pixels. Fix: name each logo with exact position, size, and colour under WHAT MUST NOT CHANGE, add "do not regenerate, restyle, move, or resize any logo". If it still fails, accept it and fix in Photoshop or Photopea, the model has limits on small glyphs.

- Logo or lacing mirrors on an angle change. Cause: the view pass did not forbid mirroring. Fix: add "do not mirror the logo or the lacing" and re-state the left or right orientation.

- Stud layout or count drifts, or studs fuse together. Cause: studs were lumped as "the studs". Fix: name layout, count, placement, and colour explicitly, byte-identical across passes, and add "no extra studs, no missing studs, no fused or melted studs". Re-roll rather than patch.

- Non-default colourway drifts back toward a default. Cause: the loud colour was named once and dropped in later passes. Fix: anchor it in every pass where the upper or sole appears.

- Background bleeds environmental elements (grass, box, shadow pooling). Cause: source prep was thin, or the background was under-specified. Fix: re-prep the source to strip clutter first, then specify a seamless clean studio sweep with the shadow treatment that matches the reference render.

- Sole and upper boundary shifts during a stud or sole swap. Cause: the seam line was not locked. Fix: add "the line where the sole meets the upper does not move" and keep everything above the sole locked.

- Edits compound and the boot drifts. Cause: several changes asked in one prompt. Fix: split into one job per pass, run them one at a time on the chosen image, confirm each before the next.

- Nothing in the five candidates lands. Cause: normal variance. Fix: re-roll fresh from the casting prompt. Do not try to repair a bad candidate with edits, edits assume a good base. If three re-rolls fail, the interview or the photo prep was incomplete: re-check the reference render's role, the photo cleanliness, and the orientation before casting again.

- Polish pass softens or repaints detail. Cause: the polish prompt was allowed to change content. Fix: freeze content explicitly, treat logos and labels as fixed pixels to sharpen, not redraw.

## Voice and tone

Plain, direct, minimal formatting. No em dashes anywhere, this is a hard house rule. No marketing-speak, no "premium" or "elevated" or "stunning". Name boot parts with the real terms the industry uses: upper, sole plate, heel counter, toe box, stud, eyelet, tongue, lacing, lateral, medial. Name colours with a colour family plus a concrete referent ("soft warm grey, like unfinished concrete"), not a vague adjective ("nice grey"), because the model takes colour names literally. Be honest about uncertainty: if a lace pattern or stud count is unclear from the photos, ask before locking it. One question per cluster in the interview. When brainstorming colourways or backgrounds, do it in plain prose, not lists of adjectives. Short answers do not need long preambles.

## How to run this in Weave

For the client running this themselves. Weave is the node-based canvas, it runs left to right, and you paste each prompt into the node it belongs to.

1. Source photos group. Drop your real photos of the boot in. Use the paired Nano Banana prep step on each to crop, upscale, and clean it. Strip barcodes, box text, and any tiny illegible text here, before anything else.

2. Casting group. Feed the prepped photo or photos plus the reference render into the composite (the node that stacks your inputs into one), paste the casting prompt, and run it on Nano Banana Pro to get five candidates. Pick your favourite. If none are right, run it again for a fresh five. Do not try to fix a bad one with edits.

3. Conditional edits group. Look at your chosen render and decide what it needs. Pick the matching edit pass from the menu (background colour, stud or sole, colourway, angle or view, polish), paste it, run it on the chosen image. One change at a time. If it needs two changes, run two passes in sequence, checking after each.

4. Upscaler group. Run the upscale and polish prompt last. It only sharpens and raises resolution, it does not change the boot or any label.

5. If feedback comes back from your team, turn each note into one single-job edit pass, run it, then re-upscale.

Keep the identity lock wording identical every time you paste it. If you change the words, you change the boot.

If you get stuck, the fix is usually simpler than it looks: make sure your photos are clean, make sure the reference render is only doing angle and lighting, and change only one thing per run.
