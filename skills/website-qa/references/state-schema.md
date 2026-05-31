# state.json schema

A `state.json` captures what a QA run observed in a structured, text-comparable form. Both run files and the baseline use the same shape; only `kind` differs. The diff and promote scripts read these fields by name, so keep them exact.

## Top level

```json
{
  "project": "VanManTheme",
  "kind": "run",                       // "run" or "baseline"
  "created": "2026-05-29T14:30:05",
  "purpose": "cart flow + mobile layout",
  "scope": ["functional", "visual"],   // check types this run covered
  "urls": ["https://staging.site.com/cart"],
  "locale": "en",                      // document lang at capture time
  "currency": "GBP",                   // active storefront currency (geo-dependent)
  "entries": { "<slice_key>": { ...entry... } }
}
```

`locale`/`currency` record the storefront context the run was captured in. A store served via geo-IP may render different currency/language, so capturing this lets a later diff treat "£ → $" as a context change, not a regression.

## Slice keys

A **slice** is one (check type, page, breakpoint) combination. The key string is:

```
<check_type>::<url>::<breakpoint>
```

- `check_type`: `functional` | `responsive` | `console_network` | `visual`
- `url`: the full URL as tested
- `breakpoint`: `mobile-375` | `tablet-768` | `desktop-1440`, or `n/a` for viewport-independent checks you only ran once

Example: `functional::https://staging.site.com/cart::desktop-1440`

Keep keys identical between a run and the baseline — that's how findings are matched across time. Same page, same breakpoint, same check type → same key.

## Entry

```json
{
  "url": "https://staging.site.com/cart",
  "breakpoint": "desktop-1440",
  "check_type": "functional",
  "captured": "2026-05-29T14:30:05",
  "source_run": "2026-05-29_143005_cart-flow",
  "screenshot": "cart-desktop-1440.png",   // representative shot for this slice, optional
  "checked": "Added a product, opened the cart drawer, updated qty, removed item.",
  "findings": [ { ...finding... } ]
}
```

`checked` is a short free-text note of what you actually exercised — valuable even when the slice passes, so a future reader knows the empty `findings` list means "tested and clean", not "skipped".

An empty `findings` array means the slice was checked and clean. **Always record checked slices, even clean ones** — the baseline needs them to detect a later regression.

## Finding

```json
{
  "signature": "functional::cart::add-to-cart-no-increment",
  "severity": "high",                  // high | medium | low
  "category": "functional",            // mirrors check_type, or be specific: "console", "network", "overflow", "content"
  "summary": "Add to cart does not increment the cart count",
  "detail": "Clicked .product-form__submit; cart badge stayed at 0 after a 3s wait. No console error.",
  "evidence": "cart-after-add.png"   // screenshot/artifact filename in this run
}
```

### The signature is what makes diffing work

The `signature` is a stable, content-based id for a problem. The diff script matches findings across runs **purely by signature within a slice**, so it must be:

- **Stable** across runs of the same underlying problem — the same overflow on the same page should produce the same signature next week.
- **Free of volatile data** — no timestamps, no random cart tokens, no generated DOM ids, no full pixel coordinates. Normalize them out.
- **Specific enough** to not collide with a genuinely different problem on the same slice.

Good signature shape: `<area>::<short-stable-description>`, e.g. `console::uncaught-typeerror-cart-js`, `overflow::hero-image-horizontal-scroll`, `network::404-favicon`, `content::price-missing-on-card`.

If a console error message contains a volatile chunk (a line:column, a hash, an order number), keep the stable part and drop the rest when forming the signature — but keep the full original text in `detail`.

## acknowledged.json (the ignore-list)

A project-level file (`~/.claude/QA/<project>/acknowledged.json`) listing findings the user has dismissed as "not an issue." It's separate from the baseline and survives baseline rebuilds. `diff_state.py --acknowledged` filters matching findings out of both the run and the baseline before classifying, so they never resurface as issues.

```json
{
  "project": "VanManTheme",
  "updated": "2026-05-29T10:40:00",
  "entries": [
    {
      "signature": "network::404-web-pixel-shopifypreview",
      "scope": "store",
      "reason": "Third-party Shopify web-pixel 404s on the preview domain — not fixable, not relevant.",
      "added": "2026-05-29T10:40:00"
    },
    {
      "signature": "overflow::promo-banner",
      "scope": "url",
      "url": "https://vanman.shop/",
      "reason": "Known: promo banner intentionally bleeds 2px; design-approved.",
      "added": "2026-05-29T10:40:00"
    }
  ]
}
```

**Scope controls how widely a dismissal applies** (matched only when `signature` also matches):

- `store` — suppress this signature on every page/slice. Use for global third-party noise.
- `url` — suppress only on the page in `url` (any breakpoint/check). Use for page-specific quirks.
- `slice` — suppress only on the exact `slice_key`. The narrowest scope.

Write dismissals with `scripts/acknowledge.py` (it dedupes and stamps `added`) rather than editing by hand, though the file is plain JSON you can prune anytime to start flagging something again.
