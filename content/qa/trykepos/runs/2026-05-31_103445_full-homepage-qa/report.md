# QA — trykepos — full homepage QA

- **When:** 2026-05-31 10:34:45
- **Scope:** functional · responsive · console_network · visual (full run)
- **Coverage:** Homepage only (`/`), all four check types across desktop-1440 / tablet-768 / mobile-375. Global components (header nav, footer, mobile menu, email popup) tested here once. Linked pages were not opened (link integrity verified via HTTP status instead).
- **URL(s):** https://trykepos.com/
- **Environment match:** Could not confirm against this repo (this is a scratchpad repo, not the kēpos site) — treated as **black-box**. Shopify store (`7f421a-3.myshopify.com`), `en` / `USD`.
- **Served from:** Public site (no preview/proxy redirect).
- **Baseline:** No baseline — initial run.

> **Capture note:** Pixel screenshots could not be saved — Playwright MCP `browser_take_screenshot` timed out (5s) on *every* attempt, **including a blank `data:` page**, so this is an environment/tool limitation, **not** a site problem. Visual and responsive checks were done via DOM accessibility snapshots, computed-style/overflow measurement, and content-presence checks rather than images. Everything else (console, network, functional interaction, layout metrics) was captured normally.

## Summary

Solid homepage. No regressions (no prior baseline), no layout overflow at any breakpoint, no broken images (0/225), no store 4xx/5xx, and all 11 internal nav/footer/CTA links resolve (200). Two real issues worth fixing: a **medium** Splide carousel that's stuck in an infinite recursion flooding the console on every load, and a **low** mobile menu close-button that renders at 0×0. Four third-party/by-design items were triaged out as noise.

## Regressions (worked before, broken now)

None (initial run — no baseline to compare).

## New findings (no baseline coverage)

| # | Sev | Where · check | What |
|---|-----|---------------|------|
| 1 | medium | site-wide · console | Splide carousel infinite recursion — `RangeError: Maximum call stack size exceeded`, 6×/load → 12–27+/resize |
| 2 | low | mobile-375 · functional | Mobile menu "Close menu" (X) button renders 0×0 / not tappable |

## Fixed since baseline

None.

## Still present (unchanged)

None.

## Suppressed (acknowledged)

4 findings muted during triage (transparency only — not active issues):
- `network::facebook-pixel-blocked-by-orb` (store) — Meta/Blotout tracking pixel blocked by browser ORB.
- `console::gorgias-chat-widget-not-installed` (store) — benign Gorgias config warning.
- `network::rebuy-user-config-connection-closed` (store) — third-party Rebuy endpoint, no widget needed on homepage.
- `functional::faq-pointer-cursor-no-toggle` (url) — by design; FAQ answers always visible.

## Findings detail

### 1. Splide carousel infinite recursion — `RangeError: Maximum call stack size exceeded` · **medium** · console · site-wide
- **Where:** Homepage (global; the 6 `.splide` carousels — hero, reviews ×3, technical reviews, archives). Observed at all breakpoints.
- **What:** `splide@4.1.4` (loaded from `cdn.jsdelivr.net`) recurses `dispatch → emit → set → emit` until the call stack overflows. It throws ~6× on a clean load and the count multiplies to **12–27+** on every window resize and scroll reflow.
- **Impact:** The carousels still render and function, but the homepage continuously throws uncaught stack-overflow errors. This floods the console, churns the main thread, can degrade performance/Core Web Vitals on lower-end devices, and creates noise that can bury genuine errors in any monitoring (Sentry etc.).
- **Reproduce:** Load https://trykepos.com/ with DevTools console open → see the `RangeError` stack repeated. Resize the window a few times → the error count climbs sharply.
- **Likely cause to check:** A Splide config/event handler re-emitting an event inside its own handler (or duplicate init on the looping `reviews` carousels, which are `splide--loop splide--draggable`). Worth checking the theme's Splide init for an `on('...')` that calls `.go()`/`.refresh()`/sets an option synchronously inside the same event.
- **Evidence:** `artifacts/home-console-full.log`

### 2. Mobile menu "Close menu" (X) button renders 0×0 · **low** · functional · mobile-375
- **Where:** Mobile (375px) slide-in nav, opened via the hamburger.
- **What:** The dedicated close control `.ante-mobile-nav-close` (`role="button"`, `aria-label="Close menu"`) computes to **0×0** because its container `.ante-mobile-nav-header` is `display:none`. There is no visible X to tap.
- **Impact:** Minor. Users can still close the menu by tapping the background overlay (verified working) or re-tapping the hamburger — but some users look for an explicit X and won't find one. Not a blocker.
- **Reproduce:** 375px width → tap the hamburger to open the menu → there's no visible close (X) control inside it.
- **Evidence:** DOM/computed-style measurement (no image — see capture note).

## What was verified clean (for the record)

- **Links:** all 11 internal nav/footer/CTA targets return HTTP 200 (product page, /pages/benefits, /pages/proof, /pages/about, /cart, /blogs/blogs, 4 policy pages, account login). FAQ/Contact correctly point to the external `kepos.customerdesk.io` support site.
- **Header nav (desktop):** "Learn" dropdown is a proper hover-revealed menu (Benefits/Proof). "Reviews" (`.oke-reviewsTab`), "Read their reviews" (`#technical-reviews`) and the skip link (`#MainContent`) all have valid targets present in the DOM.
- **Mobile nav:** hamburger opens the menu on a clean tap; all items present; "Learn" submenu expands to Benefits/Proof; overlay-tap closes it. (An earlier "won't open" reading was traced to my own repeated programmatic toggles, not a site bug.)
- **Interactions:** "They tried everything" tabs (Bloating / Regularity / Gut Barrier) switch correctly. Footer newsletter email field present (not submitted — live form).
- **Responsive:** 0px horizontal overflow at 1440 / 768 / 375. Nav switches to hamburger below the tablet breakpoint as expected.
- **Visual/content:** hero, benefits, proof, guarantee, FAQ, reviews, footer all present; single H1; 14 CTAs; 0 of 225 images broken. No price on the homepage is **by design** (pre-sell page; every CTA routes to the product page).
