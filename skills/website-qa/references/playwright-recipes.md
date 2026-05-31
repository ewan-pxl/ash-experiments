# Playwright MCP recipes

How to perform each check type with the `mcp__playwright__browser_*` tools. The goal is the same every time: observe the real rendered page, capture evidence (it lands in the `dump` staging folder, then gets moved into the run — see SKILL.md step 4), and turn problems into findings with stable signatures.

## Setup, every run

1. `browser_navigate` to the URL.
2. `browser_resize` to the breakpoint you're testing (see widths below).
3. `browser_wait_for` (or wait for a known element) so dynamic content settles before you observe.

**Once per run, record locale & currency** for the state file, so a later baseline diff doesn't mistake a geo/currency change for a regression:
```js
async () => {
  let currency = null;
  try { currency = (await (await fetch('/cart.js',{headers:{Accept:'application/json'}})).json()).currency; } catch(e) {}
  return { locale: document.documentElement.lang || null,
           currency: currency || (window.Shopify && Shopify.currency && Shopify.currency.active) || null };
}
```
Put the result in the top-level `locale` / `currency` fields of `state.json` (see `state-schema.md`).

Breakpoints (width × height):
- `mobile-375` → 375 × 812
- `tablet-768` → 768 × 1024
- `desktop-1440` → 1440 × 900

`console_network` runs at `desktop-1440`; `responsive` and `visual` run at all three. `functional` is **discovery-driven, not per-breakpoint** — each interactable is exercised once on the breakpoint that matters (default desktop), except the **nav, which is always tested on both desktop and mobile** (see the functional section). The user can narrow or widen this.

Artifact naming — pass every manual save an **absolute path rooted in the `dump` staging folder** (`<DUMP>\<name>`, i.e. `<HOME>/.claude/QA/dump/<name>` resolved to a real absolute path — see the placeholder definitions in SKILL.md); the skill then moves them into the run's `screenshots/` and `artifacts/`. Do **not** use a bare relative filename — it resolves against the server cwd (the repo root) and pollutes the repo. The `<name>` part:
- `<page>-<breakpoint>.png` — the per-breakpoint full-page shot (shared by `responsive` + `visual`; don't take two)
- `<page>-<label>.png` — functional step shots (e.g. `cart-after-qty.png`)
- `<page>-console.txt`, `<page>-network.txt`, `<page>-dom.txt` — console/network/DOM dumps (desktop unless a breakpoint matters)

Keep names stable so baseline promotion and analyzers can match them. The only writable roots are `dump` and the repo root — the per-run `artifacts/`/`screenshots/` folders are **not** writable directly (a save there is rejected as "outside allowed roots"), which is why you stage in `dump` and move.

## functional

Functional testing is **discovery-driven**: find what's actually interactive, exercise it, and verify the result against a source of truth — not just that "a click happened." Split the work into global vs page-specific.

**Depth scales inversely with breadth — match effort to scope:**
- **Broad sweep (whole store / many pages):** breadth wins. Exercise each interactable *type* once on the happy path, dedupe across similar pages, keep moving. (The "one breakpoint, deduped by type" defaults below are the broad-run setting.)
- **Narrow run (a single page, or a named flow like "QA the cart"):** depth wins. Go exhaustive on the target — exercise *every* interactable, on **both breakpoints** where behaviour could differ, and push past the happy path into **edge and error states**: invalid/empty form input and validation messages, min/max/zero quantities, removing the last cart line, out-of-stock / sold-out / unavailable variant combinations, a bad discount code, switching between several variants, double-submits, back/forward navigation, empty-cart and no-results states. The narrower the ask, the more corners you turn over.

So the same product page gets *one* add-to-cart check inside a 16-page sweep, but a full battery (every variant, qty edge cases, error states, both breakpoints) when the user asks to QA *that page*.

### Global / shared components — main agent, once, on the homepage

Whatever global UI the site has — header nav, footer, cart drawer, announcement bar, cookie/email popups — is the same site-wide, so test it **once on the homepage**, not on every page. These belong to the **main agent**; analyzer subagents never touch them.

**First look at what this store actually has — don't assume any pattern exists.** Stores differ: a site might have a mega-menu or just flat links; a hamburger or some other mobile toggle; a slide-out cart drawer or a jump straight to `/cart`; a footer with link columns or barely any footer at all. Snapshot the homepage header/footer, see what's present, and test it **in the form it takes**. Never report a pattern's *absence* as a bug — only flag behaviour that's actually broken.

- **Nav — test it on both breakpoints.** This is the one component always exercised at desktop *and* mobile, because headers usually render differently per viewport. Exercise *whatever nav exists*: mega-menu/dropdowns → open them, confirm panels show and a link navigates; a mobile hamburger/toggle → open it, expand any submenus, confirm a link works and it closes; flat links → confirm they're present and resolve. If there's genuinely no nav at one size, note that and move on.
- **Footer:** if present, check its key links resolve (one viewport).
- **Cart drawer / mini-cart:** if add-to-cart opens a drawer, confirm it opens and closes; if it instead routes to `/cart` (or does nothing visible), test that actual behaviour. Often already covered by the add-to-cart flow.
- **Announcement bar / cookie / popup:** if present, dismiss or interact as a user would.

### Page-specific interactables — discovered per page, deduped by type

For each page, identify the interactive elements **specific to that page type** and exercise each once, on the breakpoint that matters (default desktop; choose mobile only if the element is mobile-specific, e.g. a sticky mobile add-to-cart bar). Only test a page's interactables if its type adds ones **not already covered** — test a standard product's variant picker once, but *do* test a **bundle's tier selector** because it differs.

Common interactables by type:
- **Product:** variant/option selector, quantity stepper, add-to-cart, subscribe/one-time toggle, gallery/zoom, tabs/accordions, bundle tiers.
- **Collection:** filters, sort, pagination / infinite scroll, quick-add.
- **Cart:** qty steppers, remove line, discount code, checkout button (*don't complete checkout*), notes.
- **Search:** type a query into the **real input and submit** — don't just navigate to `?q=` — then verify results render.
- **Forms (contact/account):** field presence + client-side validation; **don't submit** a live contact/order form (note that you didn't).
- **Article/blog:** share links, related posts, embedded media.

### Driving and verifying

1. `browser_snapshot` for the accessibility tree + element refs.
2. Drive with `browser_click` / `browser_type` / `browser_fill_form` / `browser_select_option` / `browser_hover` / `browser_press_key`.
3. After each meaningful step, **verify against a source of truth** — re-`browser_snapshot`, or `browser_evaluate` to read a real value (cart `item_count` from `/cart.js`, element visibility, the URL, a validation message). **Don't trust a UI badge alone** — a badge can lie: this is exactly how the cart-count desync was caught *and* how the hidden-`ante-cart-count` false alarm was avoided.
4. `browser_wait_for` for async results.
5. Screenshot before/after of anything that fails.

A finding = an interaction that didn't do what it should. Record what you did, the **breakpoint**, what you expected, what happened, and any accompanying console error.

## responsive

For each breakpoint:

1. `browser_resize`, let it settle.
2. Detect horizontal overflow with `browser_evaluate`:
   ```js
   () => {
     const de = document.documentElement;
     const overflow = de.scrollWidth - de.clientWidth;
     const wide = overflow > 1;
     let culprits = [];
     if (wide) {
       culprits = [...document.querySelectorAll('*')]
         .filter(el => el.getBoundingClientRect().right > de.clientWidth + 1)
         .slice(0, 10)
         .map(el => el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''));
     }
     return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, overflowPx: overflow, hasHorizontalOverflow: wide, likelyCulprits: culprits };
   }
   ```
3. `browser_take_screenshot` (full page) for the slice's representative image.
4. Eyeball the screenshot for broken stacking, overlapping elements, cut-off text, illegible contrast, off-screen content.

Findings: horizontal overflow (signature `overflow::<culprit-or-area>`), broken layout at a breakpoint, content hidden/cut off.

## console_network

1. Navigate, settle, and exercise the page a little (scroll, open the menu) so lazy assets load.
2. `browser_console_messages` — collect `error` and `warning` entries. Errors are usually `high`/`medium`; warnings often `low` unless they indicate breakage.
3. `browser_network_requests` — flag:
   - 4xx / 5xx responses
   - failed requests
   - broken images — be strict to avoid false positives. An `<img>` with `naturalWidth === 0` is only "broken" if it actually has a real source. **Ignore** empty `src`, origin-only placeholders (`src` equal to the site origin or `/`), and lazy images not yet scrolled into view — these are normal lazy-load/placeholder states, not bugs (this is what produced phantom "7 broken images" before the fix):
     ```js
     () => [...document.images]
       .filter(i => i.complete && i.naturalWidth === 0)
       .filter(i => {
         const src = (i.currentSrc || i.src || '').trim();
         if (!src) return false;                                   // empty = placeholder
         if (src === location.origin || src === location.origin + '/' || src === location.href) return false; // origin-only placeholder
         if (i.loading === 'lazy' && i.getBoundingClientRect().height === 0) return false; // lazy, off-screen
         return true;
       })
       .map(i => i.currentSrc || i.src)
     ```
4. Normalize volatile bits out of signatures (drop line:col, hashes, ids) but keep the full text in `detail`.

Findings: `console::<stable-message>`, `network::<status>-<resource>`, `content::broken-image-<area>`.

## visual

1. For each breakpoint: navigate, settle, `browser_take_screenshot` (full page) → the slice's representative image.
2. `browser_snapshot` to confirm key content is actually present in the DOM (headings, prices, CTAs, product info) — a page can look fine in a thumbnail while missing content. When checking for a **price**, be currency-agnostic — the store may render £/€/$ depending on geo, so a `$`-only test gives false "no price" results (it did, on a GBP bundle). Use a symbol-class regex:
   ```js
   () => /[£$€¥₹]\s?\d|\d[\d.,]*\s?(USD|GBP|EUR|CAD|AUD)\b/.test(document.body.innerText)
   ```
3. If a baseline image exists for this slice, open both the baseline and new screenshot and compare them directly: note added/removed/moved sections, changed copy, missing imagery. This comparison is visual judgement, not pixel-diff — call out what changed and how confident you are.

Findings: `content::<thing>-missing`, `visual::<area>-changed-vs-baseline`, alignment/spacing issues.

## Auth / gated pages

If a URL needs login, ask the user how to authenticate (credentials to type via `browser_fill_form`, or whether a logged-in session already exists in the browser). Never hard-code or store credentials in the QA folder. If you can't authenticate, record the slice as "could not reach — auth required" rather than a false pass.
