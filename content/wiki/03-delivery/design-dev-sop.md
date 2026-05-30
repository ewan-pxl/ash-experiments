# Design and dev SOPs

How a page goes from idea to live: the structure-first build flow, the design pod, and the design system rules.

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

## Design system rules

- **Tooling:** use html.to.design to pull styles and components quickly, then adjust for usability and readability.
  Collate three to six reference landing pages and pull them in to start.
- **Max widths:** XL 1360px, L 1126px, M 894px, S 660px, and 426px.
- **Section padding:** 80px.
- **Device sizes** for design and QA match the dev QA list (see `qa.md`): iPhone SE 375x667, iPhone 12-15 390x844,
  Pro Max 430x932, Pixel 7 412x915, Galaxy S22 360x800, iPad 768x1024, iPad Pro 1024x1366, laptop 1280x800 and
  1440x900, desktop 1920x1080, and larger.
- **Themes:** the extended design system runs across all four themes (light, dark, inverse, dark inverse) for
  Growth and up (see `offering.md`).

---

*Sources: Notion "New Workflow: Page Structure" (`311b4e6a-dca1-8037-8fac-d34c76df318c`); "Design SOP"
(`2a6b4e6a-dca1-81ac-a259-e65e4192fecb`); "Design Pod SOP" (`2a6b4e6a-dca1-81d6-b161-d66f1eeb080e`). Slack:
#postclick-mgmt (asset-creation SOP request 2026-05-15). All pulled 2026-05-30.*

*Open questions:*
- *Asset-creation SOP is a known gap. Asset production (custom icon packs, illustrations) is ramping for Turnkey
  clients and a shared SOP was explicitly requested so both teams can leverage the assets, but it has not been
  written yet.*
- *The "Spacing" section of the Design SOP is empty in the source. Spacing scale beyond section padding is not
  documented.*
