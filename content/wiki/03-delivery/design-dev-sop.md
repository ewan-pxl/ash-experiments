# Design and dev SOPs

How a page goes from idea to live: the structure-first build flow, the design pod, and the design system.

## The build flow (structure first, not wireframe first)

We do not wireframe in Figma any more. Wireframes slowed shipping and biased designers toward grey-box layouts.
The flow now leads with a text structure and, where needed, a functional prototype, so the designer explores the
layout fresh.

> **Old:** Idea → Wireframe (& copy) → Design → Design iterations → Development
> **Now:** Idea → Page structure & copy → Prototype → Design → 1st-draft approval → Copy iteration → Development

1. **Page structure and copy.** Define the information hierarchy plus a functional first draft of the copy, not a
   visual layout. Sections by intent: Hero (headline, sub-headline, primary CTA), the Hook (the core value prop or
   "why choose us"), the Product Layer (cards, features, breakdown), Social Proof, Closing (FAQs, footer). The rule
   is to nail *what* needs to be said, not *where* it sits on screen. Use an LLM to draft the initial hierarchy and
   then the actual copy, so the designer understands the intent of each section.
2. **Prototype (only when functionality is complex).** For a new buy box or an interactive tool, build a functional
   prototype in Lovable from the page structure. The goal is to show the designer how it *works*, not how it
   *looks*. Share the live preview link as a functional reference.
3. **Design.** Handed to the designer inside the project task. They produce the first visual draft.
4. **Review the design proposal.** The designer communicates the layout (page, section, block, brick); the
   strategist approves. This lets the developer get ahead where it makes sense.
5. **Copy iteration.** Once the visual draft exists, audit how the V1 copy fits (is the headline too long, does the
   sub-header need shortening) and polish the copy to the visual rhythm.
6. **Approval → development.** Layout and final copy locked, the page moves to dev. Dev can be fast-tracked when it
   makes sense.

## Design pod (the second pair of hands)

While one designer drives Figma, a co-pilot runs the support work in parallel: real-time user testing and
gathering feedback, brainstorming and sketching alternatives, pulling inspiration (Behance, Dribbble, Pinterest),
drafting copy and microcopy and sourcing imagery (80/20 client-to-stock), competitive analysis against the website
swipefile, building the mobile design in tandem with desktop, maintaining the shared swipefile and landing-page
template components, and scribing feedback sessions into a clear action list. The point is to keep the Figma driver
moving while the surrounding work happens alongside, not after.

## Design system and tokens

The canonical design tokens are not stored here. They live in the `branding` repo as DTCG JSON exported
from Figma Variables, and that is the source of truth for actual values. Tokens split into `foundation/`
(surface-agnostic colour and type) and `web/` (the UX/UI application: grid, spacing, radius, icon). The
house system is at `branding/pixel-theory/tokens/`; per-client brand values live at
`branding/clients/<client>/tokens/`. Use those exact values in Figma and in the build, do not re-key them
by hand or invent new ones. This section documents the shape of the web system so a designer knows it
before opening the files.

- **Tooling.** Use html.to.design to pull styles and components quickly, then adjust for usability and
  readability. Collate three to six reference landing pages and pull them in to start.
- **Recolour, do not rebuild.** The house green system is the structure. Per client you swap the colour
  values and the fonts, and keep the grid, spacing, and scale structure intact.
- **Responsive grid** (`tokens/web/setup/`, one mode per breakpoint): 1920 desktop is 12 columns, 64 margin,
  32 gutter; 1438 is 10 columns, 56 / 24; 766 tablet is 8 columns, 25 / 20; 376 mobile is 6 columns,
  16 / 16. Section spacers are tokenised per breakpoint (small / base / large), so vertical rhythm scales
  with the viewport rather than sitting on one fixed number.
- **Spacing scale** (`tokens/web/layout/`, responsive): desktop 20 / 32 / 56 / 72 / 128, mobile 14 / 16 /
  24 / 32 / 40 (x-small to x-large). Padding desktop 20 / 24 / 28 / 48 / 64. Plus a fine "micros" scale
  (2 to 16) for tight gaps. How every token is assigned by role (colour, the spacing vs padding vs section
  spacer vs margin vs micros split, radius, icon, border) is the discipline in
  `branding/pixel-theory/tokens/web/PRINCIPLES.md` (and the universal rule in `../PRINCIPLES.md`). Follow it.
- **Radius** desktop 4 / 12 / 20 / 28 / 32 and round (9999); mobile steps down (2 / 8 / 14 / 20 / 24).
  **Icon sizes** desktop 18 / 24 / 32 / 44 / 80. **Border weights** 1 (main) and 2 (thick).
- **Themes.** Colours ship as Figma modes: `base` and `inverse` are in the export today. The offering
  promises four themes (light, dark, inverse, dark inverse) for Growth and up (see `offering.md`); the
  remaining two modes are still to come.

## QA device sizes
Design and QA cover the dev QA device list (see `qa.md`): iPhone SE 375x667, iPhone 12-15 390x844, Pro Max
430x932, Pixel 7 412x915, Galaxy S22 360x800, iPad 768x1024, iPad Pro 1024x1366, laptop 1280x800 and
1440x900, desktop 1920x1080, and larger.

---

*Sources: Notion "New Workflow: Page Structure" (`311b4e6a-dca1-8037-8fac-d34c76df318c`); "Design SOP"
(`2a6b4e6a-dca1-81ac-a259-e65e4192fecb`); "Design Pod SOP" (`2a6b4e6a-dca1-81d6-b161-d66f1eeb080e`). Slack:
#postclick-mgmt (asset-creation SOP request 2026-05-15). Design tokens: the `branding` repo
(`branding/pixel-theory/tokens/`), exported from Figma Variables 2026-05-29. All pulled 2026-05-30.*

*Open questions:*
- *Asset-creation SOP is a known gap. Asset production (custom icon packs, illustrations) is ramping for Turnkey
  clients and a shared SOP was explicitly requested so both teams can leverage the assets, but it has not been
  written yet.*
- *(Resolved) The spacing scale is now documented above and lives canonically in `branding/pixel-theory/tokens/`.
  Two of the four colour themes (light/dark/inverse/dark inverse) are still missing from the token export.*
