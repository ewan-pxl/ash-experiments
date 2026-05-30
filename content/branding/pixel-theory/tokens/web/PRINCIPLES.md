# Web token principles (UX/UI)

How the foundation is applied to responsive web, which is the bulk of what we build. The universal rule
(assign by role, reference the token, never the value) lives in `../PRINCIPLES.md`. This doc covers the
web-specific systems: the spatial model, the component scales, and the class-naming discipline.

Everything here is responsive: the same token name resolves to a different value per breakpoint, so you
name the intent and let the token carry the viewport.

## The spatial system

The family that gets misused most, so it has the most discipline. Five categories, one job each.

| Category | Token group | What it governs | Reach for it when |
|---|---|---|---|
| **Spacing** | `layout/…/spacing` | The gap *between* containers and elements | You need air between two things next to or below each other |
| **Padding** | `layout/…/padding` | The inset inside a container, on all edges | You need space between a container's edge and its contents |
| **Section spacers** | `setup/…/section-spacer-*` | The top and bottom space of a section | You are spacing whole page sections apart vertically |
| **Margin** | `setup/…/margin` (and `gutter`) | The page edges, and the gap between grid columns | You are setting the outer page margin or column gutters |
| **Micros** | `layout/…/micros` | Very small, intricate space on small elements | A detail is too fine for the spacing or padding scale |

**Micros are the agnostic one.** Everything else has a single job. Micros do not: a micro can be a gap
*or* a padding, because at that scale the distinction stops mattering. Use them on small elements
(badges, chips, icon insets, tight inline gaps), for either spacing or padding. Do not use micros for
normal layout gaps or container padding, that is what spacing and padding are for.

### The decision flow

Ask these in order and stop at the first yes:

1. Is it the top or bottom of a whole **section**? → `section-spacer`
2. Is it the **page edge**, or the gap between **grid columns**? → `margin` / `gutter`
3. Is it a tiny, intricate space on a **small element**? → `micros` (as a gap or a padding)
4. Is it the **gap between** two elements or containers? → `spacing`
5. Is it the **inset inside** a container? → `padding`

### The scales (actual values)

**Spacing** (gap between things), `x-small → x-large`:
- Desktop (1920): 20 / 32 / 56 / 72 / 128
- Mobile (376): 14 / 16 / 24 / 32 / 40

**Padding** (inset inside a container), `small → 2x-large`:
- Desktop: 20 / 24 / 28 / 48 / 64
- Mobile: 12 / 16 / 20 / 24 / 28

**Micros** (small-element gap or padding), `2x-small → 3x-large`:
- Desktop: 2 / 4 / 6 / 8 / 10 / 12 / 14 / 16
- Mobile: 2 / 3 / 4 / 6 / 8 / 10 / 12 / 14

**Section spacers** (`setup`), `small / base / large` per breakpoint:
- Desktop (1920): 64 / 124 / 164
- Small desktop (1438): 56 / 109 / 147
- Tablet (766): 25 / 50 / 77
- Mobile (376): 16 / 32 / 56
- There is also `section-spacer-asb-top` (255 desktop, 168 mobile), the larger top offset used to clear
  the announcement/sticky bar above a section. Confirm the exact intent before leaning on it.

**Margin and gutter** (`setup`), the page frame:
- Desktop (1920): margin 64, gutter 32, 12 columns
- Small desktop (1438): margin 56, gutter 24, 10 columns
- Tablet (766): margin 25, gutter 20, 8 columns
- Mobile (376): margin 16, gutter 16, 6 columns

## Radius, icon, border weight

Same principle, assign by role off the scale, do not hardcode:

- **Radius** (`layout`): `x-small → x-large` plus `round` (9999). Desktop 4 / 12 / 20 / 28 / 32, mobile
  steps down (2 / 8 / 14 / 20 / 24). Pick the step by component, not by eye.
- **Icon** (`layout`): `small → 3x-large`. Desktop 18 / 24 / 32 / 44 / 80. Size icons off this scale.
- **Border weight** (`layout`): `border-main` (1) and `border-thick` (2). Two weights, that is the system.

## The rules, in one place

- Assign by role and intent, never by the raw value (see `../PRINCIPLES.md`).
- Always reference the token. No hardcoded px.
- One job per category. A gap is `spacing-*`, an inset is `padding-*`. Never cross them.
- Sections always use section spacers. The page frame always uses margin and gutter.
- Micros stay on small elements.

---

*Source: the house web token model as defined by Ash, 2026-05-30, mapped onto the Figma Variables export
in `setup/` and `layout/`.*
