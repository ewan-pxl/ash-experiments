---
name: cro-brief-builder
description: Transforms one or more raw CRO strategy markdown files into a designer-ready brief — a Notion doc and a pinnable image card. Handles single and multi-file uploads, single-page and multi-page tests, and master + per-page MD setups. Use this skill any time .md files are uploaded containing page structures, section outlines, split test ideas, offer mechanics, or landing page strategy. Trigger names include "Page Structures", "LP", "Master Strategy", "i14"-style test IDs, or markdown with "Outline" / "Messaging" sections. Also triggers when a user says "flesh this out for the designer", "make this into a brief", "prep this for Figma".
---

# CRO Brief Builder

Turns a CRO strategy outline into a simple brief: short Notion doc, pinnable image card. The output prioritises clarity over comprehensiveness. The most valuable thing the skill produces is copy variants; everything else is scaffolding.

## Workflow

1. Parse the input markdown(s)
2. Confirm the Notion page
3. Ask the user what kind of project this is (buttons)
4. Refresh check — mirror back, ask what's moved
5. Draft the brief in chat for review
6. Post approved brief to Notion under "Key information"
7. Render the image card
8. Confirm completion

---

## Step 1: Parse

Read every uploaded MD. Extract:

- **Test ID** — `i14`, `i24` etc. Trust the Notion page title over the MD if they differ.
- **Brand** — VNM = VanMan, MAS = MASA, HUH = Hume Health, ANC = Ancient Crunch, VDY = Vandy, GAF = Golden Age Fats, KEP = Kēpos
- **Page URL(s)** — every path mentioned, e.g. `/pages/new-customer-offer-pxl-025`
- **Offer mechanic** — discount, gift, threshold, bundle, subscription terms
- **Sections / components** per page
- **Existing copy notes** — from "Messaging" or spit-copy columns
- **References** — Figma links, prior tests, competitor examples

### Multi-file logic

When multiple MDs are uploaded, one may be a **master strategy doc** with the others being per-page implementation docs. Best-guess which is which based on filename (Strategy / Master / Overview / Summary) and content (master = thesis + page list + offer; per-page = section-level layout for one URL). Never lock the roles by inference — surface the guess in Step 4 and let the user confirm.

When a master is present, **cross-check it against the per-page docs** for drift. Flag any of these in the refresh check:

- Pages in master with no per-page MD (probably dropped)
- Per-page MD not mentioned in master (probably added late)
- Offer mechanic mismatch between master and per-page
- URL drift between master and per-page filenames or content
- Strategic thesis in master that no per-page doc supports

Never resolve discrepancies silently. The user decides.

If multiple per-page docs are uploaded with no master, infer the unifying thesis from common ground and flag this in the chat draft: *"No master here, so the objective and hypothesis are inferred. Check carefully."*

---

## Step 2: Confirm the Notion page

Say:

> "I've picked up **[Test ID]** for **[Brand]** — [one-line description]. Drop the Notion link and I'll verify."

Then:

1. Fetch with `Notion:notion-fetch`
2. If MD test ID and Notion page ID differ, flag and trust the user's answer (use the Notion ID)
3. Confirm: *"Got it — [page title]."*

If searching Notion yourself: prefer Project Tracker database, match on test ID + brand.

---

## Step 3: Ask what kind of project this is

**Fires every brief, no exceptions.** Use `ask_user_input_v0`:

```
question: "What kind of project is this?"
options: ["Full page", "Multi-page", "Modules"]
type: single_select
```

- **Full page** — single page rebuild. Standard single-page doc. Card: Objective + Hypothesis.
- **Multi-page** — same thesis across 2+ URLs. Doc splits Key Inclusions and Copy by page. Card adds Pages section.
- **Modules** — anything more granular than a full page (section, component, microcopy, single block). Standard single-page doc; Key Inclusions may be skipped if copy variants are the whole deliverable. Card: Objective + Hypothesis.

---

## Step 4: Refresh check

**Mandatory.** Strategy docs go stale fast. Mirror back what you'd bake into the brief and let the user catch the wrong bits — recognition is faster than recall.

### Single page

> "Quick refresh — the doc was written a few days ago and details shift. Here's what I've got:
>
> - **Page:** [URL]
> - **Offer:** [discount, bonuses, dollar values]
> - **Mechanic:** [how the offer triggers]
> - **Reference layout:** [...]
>
> Anything moved? URLs, offer, bonuses, references — whatever's shifted."

### Multi-page or multi-file

> "Quick refresh. Here's what I'm reading from:
>
> - **Files:** [list each MD and its inferred role, e.g. *master.md (master strategy), pdp.md (`/products/variety-pack`)*]
> - **Pages:** `/page-one`, `/page-two`
> - **Offer:** [...]
> - **Mechanic:** [...]
> - **Reference layout:** [...]
>
> [Then list any cross-doc discrepancies as numbered questions — e.g. "Master says 20% but per-page says 36% — which is current?"]
>
> Confirm the file roles and anything else that's moved."

When the user gives corrections, apply them everywhere — copy variants, value anchors, doc objective and hypothesis, card objective and hypothesis. Don't patch one mention and miss the rest.

"All current" is a valid answer. Proceed.

---

## Step 5: Draft the brief in chat

Write the full brief in chat first. User reviews and approves, then post to Notion.

### Doc structure — Full page / Modules

```
> 🎯 **Objective:** [1-2 sentences. URL in inline code if present.]

> 💡 **Hypothesis:** [the if/then/because, written as plain sentences. URL in inline code if present.]

### Key inclusions
- bullet (plain prose, paths in `inline code` only if they're real paths)
- bullet

### Copy

**[Section name] (N variants)**
- **[Approach label]:** the actual copy, plain text, no wrapping
- **[Approach label]:** the actual copy

**[Next section] (N variants)**
- ...

### Worth flagging
- bullet (only if real)
```

### Doc structure — Multi-page

Objective and Hypothesis stay singular. Key Inclusions and Copy split by page. Worth Flagging stays unified.

```
> 🎯 **Objective:** [one objective covering the whole test. URLs in inline code if mentioned.]

> 💡 **Hypothesis:** [...]

### Key inclusions

**Page One Name**
`/page-one`
- bullet (plain prose, paths in `inline code` only if they're real paths)

**Page Two Name**
`/page-two`
- bullet

### Copy

**Page One Name**
`/page-one`

*Hero headline (N variants)*
- **[Approach]:** the actual copy, plain text, no wrapping

*[Next section] (N variants)*
- ...

**Page Two Name**
`/page-two`

*Hero headline (N variants)*
- ...

### Worth flagging
- bullet (note which page if it only applies to one)
```

Hierarchy inside Copy: bold plain-text product/page name → inline code URL on its own line → italic section name → bullet variants. No H4 markdown, no tables, no toggles. The product/page name in the heading is the human-readable label (e.g. `Tallow & Honey Balm (2oz)`, `New customer LP`); the URL sits below it as reference, not as the heading itself.

### Variant counts

- 5 variants: page headline, hero, primary CTA, key activation copy, or any Modules project where the copy is the whole deliverable
- 3 variants: secondary callouts, body copy, hero gallery captions, banner pills, or small detail changes inside a larger module

### Approach labels

Each variant gets a label naming its angle. Pick approaches that genuinely differ, not five rewordings. Common labels: Stat lead, Enemy framing, Direct benefit, Curiosity, Stack lead, Value anchor, Threshold-first, Plain, Blunt, Category-defining, Offer-led, Punchy, Plain spec.

### Wrapping rule — keep it plain

Don't wrap copy variants in anything. No brackets, no quotes, no inline code. The variant label tells the reader they're looking at copy options; the punctuation between label and copy is a colon, followed by the copy in plain text.

Wrong:
- **Plain** — `Shop All` · `Bundles` · `Bestsellers`
- **Plain** — [Shop All] · [Bundles] · [Bestsellers]
- **Plain** — "Shop All" · "Bundles" · "Bestsellers"

Right:
- **Plain:** Shop All, Bundles, Bestsellers

Comma-separated reads naturally. Middots and pipes create visual noise. Wrapping every variant turns a clean list into a wall of pills or quotation marks. The reader is a designer or a marketer skimming the doc, not parsing structured data — write for them.

The only thing that gets inline code (backticks) is genuine technical references: URLs, page paths, file paths, slugs. These should be rare. A typical brief has one or two `code` segments total, in the objective, hypothesis, or a section header URL line. Everything else is plain prose.

**Never use an inline-code URL as a heading or variant-group label.** Multi-page section headers use the human-readable product/page name in bold (e.g. `**Pearl Eye Cream**`, `**New customer LP**`) with the URL referenced on its own line directly underneath in inline code. Same pattern in the card's Pages block: human-readable name first, URL underneath.

### Voice and rhythm

The brief should read like a person typed it. Plain, simple, conversational. A few rules to stay grounded:

- **No em dashes.** Use commas, full stops, parentheses, or colons. If a sentence really wants an em dash, the sentence wants to be two sentences.
- **No middots, pipes, or decorative separators between items.** Commas.
- **Colons after bold labels, not dashes.** `**Plain:** Shop All, Bundles, Bestsellers` not `**Plain** — Shop All · Bundles · Bestsellers`.
- **Short paragraphs, short bullets.** A bullet over two lines is usually two bullets.
- **Direct speech in "Worth flagging".** "Confirm before design lock" not "It would be advisable to confirm before design lock".

### Copy style

Apply `references/copy-style-rules.md`. Headline rules: sentence case, no em dashes, no "unlock/elevate/transform/seamless/empower/world-class/journey/game-changing/innovative/cutting-edge", don't open with "We", specificity beats superlatives, lead with the number, offer copy = threshold first + reward second + dollar value in brackets.

### Worth flagging — what to include

Only if real. Math anchors that need verifying, mechanics not locked, numbers in existing copy that conflict with the new offer, references the designer needs. Skip mobile responsiveness reminders and anything the designer can decide themselves.

---

## Step 6: Post to Notion

Fetch the page, find the empty `## Key information\n## Checklist` block, replace with the approved brief between those two H2s.

Use `Notion:notion-update-page` with `update_content`. Objective and hypothesis as `>` quote blocks. All subheaders H3. Variant group labels as bold (`**Name (N variants)**`), not H4. Plain bullets — no toggles, no tables.

If "Key information" isn't found: stop, ask the user to verify the link. Do not write into any other section.

---

## Step 7: Render the image card

Every project gets a card. Read `references/brief-card-template.html` (the locked visual spec) and string-replace these tokens:

| Token | Replace with |
|---|---|
| `{{BRAND_LABEL}}` | Top-of-card brand label, all caps, letter-spaced. Format: `[Brand] · [test descriptor]` where the descriptor is the short context tag if it's worth surfacing (e.g. `VanMan · /products split`, `MASA · Coupon toggle`). If there's no useful descriptor, use just `[Brand]`. The descriptor is *never* the test ID — that lives in the badge. |
| `{{PROJECT_NAME}}` | The project title only, no brand prefix. Examples: `PDP: Phase 1 — Unified Module Stack`, `Coupon Toggle v1 (Gift Card)`, `Navigation Redesign`. Strip brand, test ID, and Notion's positional tags (e.g. drop `VNM - i21 - split - /products -` from `VNM - i21 - split - /products - PDP: Phase 1` → keep `PDP: Phase 1`). |
| `{{TEST_ID}}` | The canonical test identifier from Notion's page title, e.g. `i21`, `i46`. **Required** — every card has an ID badge. If the project genuinely has no ID (rare), ask the user before defaulting to anything else; do not put the test descriptor in the badge as a fallback (that goes in `{{BRAND_LABEL}}` instead). |
| `{{DATE}}` | Notion `Created time` formatted `DD MMM YYYY` (uppercase month) |
| `{{OBJECTIVE}}` | Expanded objective HTML, URLs in `<code>...</code>` |
| `{{HYPOTHESIS}}` | Expanded hypothesis HTML, URLs in `<code>...</code>` |
| `{{PAGES_BLOCK}}` | Empty string for Full page / Modules. Multi-page HTML below. |
| `{{FOOTER_META}}` | "[Client code] · [Type] · [Phase]" from Notion properties |
| `{{NOTION_URL_SHORT}}` | e.g. `notion.so/359b4e6adca1811ab5b9fbe00441d571` |

### Header anatomy — locked

The header is the most visible part of the card and the format never changes:

- **Top-left, line 1:** `{{BRAND_LABEL}}` — muted, all caps, letter-spaced. Brand and optional test descriptor only. Never carries the test ID.
- **Top-left, line 2:** `{{PROJECT_NAME}}` — large bold title. Project name only, never includes brand prefix, test ID, or Notion's positional dash-segments. Reads like a clean book title.
- **Top-right, line 1:** `{{TEST_ID}}` — in the saturated purple badge (`#9224E9` background). This is the single saturated purple element on the card.
- **Top-right, line 2:** `{{DATE}}` — muted monospace tag.

Doing it this way means every card scans the same on the wall: brand and context top-left, ID and date top-right, title large and untouched in the middle.

### Expanded objective and hypothesis

The card versions are **genuinely longer than the doc versions**, not just visually expanded.

**Objective (~80-100 words):** What page(s), what traffic source if known, what the current page does, what we're changing, what outcome we're measuring against control.

**Hypothesis (~120-150 words):** The if/then/because in full, plus the reasoning chain — why it should work for this traffic and page, with reference to any prior winning test or pattern that validates the structural approach.

### Pages block — multi-page only

For multi-page projects, fill `{{PAGES_BLOCK}}` with:

```html
<div class="section">
  <div class="section-label">Pages</div>
  <div class="section-body">
    <div class="page-entry">
      <div class="page-url"><code>/page-one</code></div>
      <div class="page-brief">2-3 line designer-facing brief on what's changing on this URL specifically.</div>
    </div>
    <!-- repeat per page -->
  </div>
</div>
```

Voice is factual and designer-facing — what to build on this URL. Not strategic re-statement.

For Full page / Modules, `{{PAGES_BLOCK}}` is an empty string.

### Brand accents

The card uses a restrained accent system. Three literals, applied sparingly:

- **Pixel Theory purple `#9224E9`** — one accent element per card. Default placement: the test badge background, holding `{{TEST_ID}}` (e.g. `i21`, `i46`). Do not extend the saturated purple to page-URL pills, headings, section labels, or borders — keep it as the single deliberate focal point.
- **Pixel Theory brand mark** — the `P` glyph (locked SVG at `references/pixel-theory-mark.svg`, rendered in `#9224E9`). Placed inline in the footer, to the left of `{{FOOTER_META}}`, at 16×16px. The mark sits next to the meta line, not above or replacing it.
- **Desaturated purple for inline code** — all inline code on the card (in body text *and* in the Pages block URL pills) uses a soft purple tint: background `#f0e6fb`, text `#5a1799`. This unifies every `<code>` reference under one brand-tied style without competing with the badge. The badge keeps the saturated purple because it sits alone as the single accent focal point.

Everything else on the card respects the existing variable system — neutrals on `#faf8f5` paper, `#1a1a1a` ink, `#8a7f6e` muted, `#e8e3da` borders. No additional brand colours.

### Render

Save to `/home/claude/brief_card.html`. Render at 3x scale with viewport tall enough for the longest multi-page card:

```python
from playwright.sync_api import sync_playwright
import pathlib

html_path = pathlib.Path("/home/claude/brief_card.html").resolve()
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(device_scale_factor=3)
    page.set_viewport_size({"width": 1056, "height": 2000})
    page.goto(f"file://{html_path}")
    page.wait_for_load_state("networkidle")
    page.locator(".card").screenshot(
        path="/mnt/user-data/outputs/[BRAND]-[TEST-ID]-brief-card.png"
    )
    browser.close()
```

If chromium isn't installed: `python3 -m playwright install chromium`. Present the PNG with `present_files`.

---

## Step 8: Confirm completion

> "Brief posted. Here's the card for Figma.
>
> Notion: **[page title]** → [full Notion URL]"

No summary. The user can see the result.

---

## Reference files

- `references/copy-style-rules.md` — full copy style spec. Read before writing copy.
- `references/brief-card-template.html` — locked card design. Edit the template to change the visual style; never regenerate the HTML from scratch.

---

## Non-obvious edge cases

- **Master mentions a page with no per-page MD** → flag in refresh check. If still in scope, write that page's section from master-level info and flag in Worth Flagging that detail is light.
- **Per-page MD not mentioned in master** → flag in refresh check, same logic.
- **Objective genuinely missing and can't be inferred** → stop. *"The objective isn't clear from this doc — flag with Lucas before I build the brief."*
- **User skips the refresh check** → proceed but flag at the bottom of the chat draft: *"Wrote off the doc as-is — flag anything that's moved."*
