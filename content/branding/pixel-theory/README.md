# Pixel Theory — house brand

Pixel Theory's **own** brand assets (the agency itself, not a client). Kept here,
alongside `clients/`, so decks and mockups in other repos can reference us
on-brand. Same conventions as the rest of the repo: lowercase filenames, no spaces.

## Contents

```
pixel-theory/
├── assets/
│   └── images/
│       └── team/        team headshots, 600×600 .webp
│           ├── ash.webp
│           ├── ewan.webp
│           ├── lucas.webp
│           └── ashton.webp
└── tokens/                  the house design system (DTCG JSON, exported from Figma Variables)
    ├── PRINCIPLES.md         the universal rule (assign by role) + colour, and the foundation/surface split
    ├── foundation/           surface-agnostic brand (shared by every surface)
    │   └── colors/           theme colour modes
    │       ├── base.tokens.json       base mode (surface, text, border, alt theme, button, icon, assets)
    │       └── inverse.tokens.json    inverse mode
    └── web/                  the 90%: UX/UI application (the default surface)
        ├── PRINCIPLES.md     the spatial system, component scales, class-naming discipline
        ├── setup/            responsive grid fundamentals, one file per breakpoint
        │   ├── large-desktop/1920.tokens.json   12 col, 64 margin, 32 gutter
        │   ├── small-desktop/1438.tokens.json   10 col, 56 margin, 24 gutter
        │   ├── tablet/766.tokens.json            8 col, 25 margin, 20 gutter
        │   └── mobile/376.tokens.json            6 col, 16 margin, 16 gutter
        └── layout/           spacing, padding, micros, radius, icon, border-weight scales (responsive)
            ├── large-desktop/1920.tokens.json
            └── mobile/376.tokens.json
```

Typography (foundation), logos, and fonts are still to come. Other surfaces (a `decks/`
folder, etc.) are added only when there is real content for them, and they pull colour and
type from `foundation/` rather than copying it.

These tokens are the agency's own house design system: the green palette
(`#001A01` deep-green surfaces, `#30F84F` primary button) in `foundation/`, and the
responsive grid plus spacing/radius/icon scales in `web/`. The web layer is the structural
starting point for client landing-page builds, recoloured per client. The files keep their
Figma `com.figma.variableId` and `com.figma.modeName` metadata so they round-trip back into
Figma Variables. Edit them here, re-export from Figma over the top, do not hand-fork values
elsewhere.

## Provenance

Team headshots exported 2026-05-30. Source filenames at import:
`ash.webp` ← `frame_1484584663_1x.webp` (600×600),
`lucas.webp` ← `image_1_1x.webp`,
`ewan.webp` ← `image_2_1x.webp`,
`ashton.webp` ← `image_3_1x.webp`.

Design tokens exported from Figma Variables 2026-05-29, imported 2026-05-30 from
`setup.zip` / `colors.zip` / `layout.zip`. The `setup` collection carries four
breakpoints; the `layout` collection export carried two (1920 and 376). Note: the
offering references four colour themes (light, dark, inverse, dark inverse); this
export carries the `base` and `inverse` modes, so the other two are still to come.
