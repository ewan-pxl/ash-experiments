---
name: icon-description
description: Generates a concise, well-calibrated icon/illustration description for AI image generation. Use this skill when a user wants to describe a concept as a single icon or illustration for generation — especially for hyperrealistic, modern, elevated visual assets. Triggers include: "write a prompt for this icon", "describe this as an illustration", "generate a prompt for X icon", "how do I describe X for image gen", or any request to turn a concept into an image generation description.
---

# Icon Description Skill

Produces a single, tight illustration description for AI image generation. Not too sparse, not over-specified. The goal is a description that gives the model enough visual direction without locking it into layout or infographic patterns.

Icons render small. Any visual complexity beyond a single clear object becomes noise at icon scale. This skill exists to produce descriptions that read instantly at thumbnail size.

---

## The single-object rule

**Every icon description must center on one object.** Not a scene. Not a composition. Not a figure in an environment. One thing, rendered beautifully, set against empty space.

- ✅ A heart, a droplet, a lung, an hourglass, a key, a flame, a seed
- ❌ A human body with a glowing organ, a hand holding a drop, a figure surrounded by rings, a brain with synapses firing across a field

If the concept feels like it needs a body, a hand, or a background element to communicate — strip it back to the single most iconic object that carries the meaning. A warning about heart health is a heart, not a person clutching their chest. A warning about hydration is a droplet, not a body with water levels.

**Test:** Could this icon be read clearly at 48×48 pixels? If the answer requires squinting, the subject is too complex.

---

## The solid-material rule

**Every object must be rendered in solid, opaque materials.** Icons sit inside icon packs and pill components with their own background colours — translucent, clear, glass, frosted, or see-through objects break visually against these backgrounds and lose their silhouette.

- ✅ Matte ceramic, polished chrome, sculpted stone, solid clay, brushed metal, painted enamel, matte plastic, opaque rubber
- ❌ Glass, translucent, frosted, see-through, transparent, clear, crystalline, volumetric light through the interior

This also applies to internal elements. A battery with a "translucent shell showing charge inside" fails — the charge bar must sit on a solid dark inset panel. A droplet should be opaque liquid, not clear water. A flame should be a sculpted solid form, not a glowing gaseous one.

**Rendering qualities that are still fine:** directional light across the surface, sharp highlights, cast shadows, surface sheen, matte or glossy finish, colour variation across the object. These all work because they describe the object's exterior — not what's visible through it.

When describing luminous or glowing elements, frame them as colour-on-solid-surface rather than light-through-material. "A red bar glowing on a matte black panel" works. "A glowing red core visible through a translucent shell" does not.

---

## What a good icon description contains

A good description has exactly these four elements — nothing more:

1. **The subject** — one object, stated plainly
2. **The action or state** — what it's doing or how it exists visually
3. **The key visual detail** — one specific quality that makes it feel intentional (material, light, form, etc.)
4. **The rendering feel** — one phrase that anchors the visual register (hyperrealistic, sculpted, matte, etc.)

Total length: **1–3 sentences max.** Never a list. Never a label. Never a diagram description.

---

## Rules

- **One object per description.** No figures, hands, bodies, or environmental framing around the subject. The object sits in empty space.
- **Solid, opaque materials only.** No glass, translucent, frosted, see-through, or volumetric-light-through-material language. Glowing elements sit on solid surfaces, not inside clear shells.
- **No infographic language.** Never use: diagram, chart, grid, schematic, label, annotated, measurement, grid, icon set, flat vector, UI.
- **No layout instructions.** Don't describe placement, alignment, or composition grids.
- **No text or labels** in the description — if text appears in the image it will break the asset.
- **One concept per description.** Don't combine multiple unrelated elements.
- **Avoid abstract nouns alone.** "Connection" is weak. "A single sculpted knot of solid amber stone" is strong — and still one object.
- **Lead with the visual, not the meaning.** Don't explain what it represents — describe what the eye sees.
- **Keep consistency across a set.** When producing multiple icons for the same brief, hold the rendering register (e.g. hyperrealistic, matte, sculpted) steady across all of them so the set feels cohesive.

---

## Format

Output only the description. No preamble, no explanation, no commentary.

---

## Examples

**Concept:** Heart health warning
**Bad:** "A human silhouette with a pulsing heart area rendered in red, warning rings emanating outward from the chest"
**Good:** "A single human heart rendered hyperrealistically, its deep crimson surface glistening with a wet muscular sheen, one side flushed with a hotter amber tone under directional light"

---

**Concept:** Low battery
**Bad:** "A battery with a translucent shell showing a thin red sliver of charge glowing from inside"
**Good:** "A classic rectangular battery shape rendered as a solid matte white object, its inset front face in solid dark grey showing a single thin red bar of remaining charge, lit with soft directional light"

---

**Concept:** Data transfer
**Bad:** "A glowing blue orb with luminous threads visible through its translucent core"
**Good:** "A solid sculpted sphere of deep blue ceramic with raised luminous threads coiling across its exterior surface, rendered with photorealistic depth"

---

**Concept:** Time running out
**Bad:** "An hourglass with its glass catching warm light, grains falling through the translucent chamber"
**Good:** "An hourglass sculpted from solid brass and opaque red sand, the upper chamber nearly drained, its metal frame catching a low warm light"

---

## When given a concept to describe

1. Identify the single most iconic object that carries the meaning
2. Strip away any figures, hands, or environmental framing
3. Find the most concrete visual metaphor for that one object
4. Choose a solid, opaque material for the object — reject anything translucent, glass, or see-through
5. Add one surface quality (light, sheen, colour variation) that elevates it from generic
6. Write 1–3 sentences in plain prose
7. Output only the description
