---
name: how-we-d-approach-high-fidelity-deck
description: Turns a finished "How We'd Approach [Brand]" prospect doc into a branded, on-screen HTML slide deck in Pixel Theory's house style. The visual design is locked; only the content changes, so every deck looks the same despite different brands and ideas. This is the second step of a two-step flow — write the doc with brand-prospect-doc first, then run this to render it as a deck. Use this skill any time the user wants a prospect doc turned into slides, or says "make a deck", "deck version of this", "high fidelity deck", "render this as slides", "slides for [brand]", "[brand] deck", "deckify", "/deck", "turn the [brand] doc into a deck", or asks for an on-brand pitch/proposal deck for a prospect. Also trigger right after a "How We'd Approach" doc has been produced and the user wants it presented visually. Not for editing .pptx files and not for writing the doc itself — this is the layout layer only.
---

# How We'd Approach — High Fidelity Deck

Turns a finished "How We'd Approach [Brand]" doc (the output of `brand-prospect-doc`, or any equivalent shorthand the user pastes or uploads) into a branded, self-contained HTML slide deck in Pixel Theory's house style.

The whole point of this skill is consistency. The design is locked in a template and a block library. You change the words, never the styling. Different brand, different ideas, same deck.

This is step two of a two-step flow:

1. `brand-prospect-doc` writes the doc (it owns the thinking and the voice)
2. this skill lays that doc out as a deck

Keep them separate. Don't write the doc here, and don't restyle the deck inside the doc skill.

## What this is, and what it isn't

- It's a layout and design layer. The doc's words and voice are already right. Preserve them. Only trim wording for slide length.
- It's loose on content: slide count, order, and which blocks you use all flex with the doc.
- It's strict on design: every slide is built from the locked CSS classes and the block library. No bespoke layouts, no inline styles, no new colours.
- Output is one self-contained `.html` deck. Web, not PowerPoint. 16:9 slides, scroll or arrow-key navigation, and it prints landscape one-slide-per-page for a PDF if anyone wants one.

## Local environment (Claude Code on macOS) — read first

This skill was first authored for the Claude Chat sandbox (no internet, a pre-installed Chromium, `present_files`, `/mnt/user-data/outputs`). Running it locally in Claude Code is simpler. The overrides:

- **Fonts: skip the font step.** On a machine with internet, any browser — including the headless render check — fetches Funnel Display / Geist Mono / Inter from Google Fonts via the shell's `<link>`. Do **not** run `setup-fonts.sh` unless you're offline or the render comes out in Arial.
- **Working file & output:** write and keep the deck wherever the user is working — default to the current directory as `<brand>-deck.html` (or a path they name). There is no `/home/claude` or `/mnt/user-data/outputs` here.
- **Viewing / delivery:** open it in a browser — `open <brand>-deck.html`, or use the Preview tool if available — and hand over the file path. There is no `present_files` tool locally.
- **Render check is optional but recommended.** `render-and-check.js` is adapted for local: it finds an installed Google Chrome / Chromium / Edge or a puppeteer-cached browser, and falls back to the full `puppeteer` package if you've installed it. `node` is on the PATH. If you respect the block item ceilings, slides fit first time and you can just eyeball the deck in a browser instead.

## Input

A "How We'd Approach" doc, from any of:

- a Notion page (fetch with `Notion:notion-fetch`)
- text pasted into the chat
- an uploaded `.md` or `.pdf` (read it directly; for a PDF use the Read tool's PDF support)

Map its sections to slide blocks (default mapping below). If the doc is missing a section, drop that slide. If it has an extra one, add a matching block. Don't invent content the doc doesn't support.

## Build process

1. Read the doc. Map its sections to blocks using the mapping below.
2. Copy `references/deck-shell.html` to `<brand>-deck.html` (current dir, or a path the user names). This is the locked shell: all the CSS, the logo, the navigation script. Never write any of that from scratch.
3. For each slide, copy the matching block from `references/slide-blocks.html`, fill in the copy, and set the top-right meta (`NN / NN`) and the eyebrow number (`NN — SECTION`) to match the final order. Concatenate the filled blocks and paste them at the `<!-- SLIDES -->` marker.
4. **Render and check** (see Fit rules). Fix any overflow. Re-render until every slide reports `bodyOver` 0. (Or, if skipping the headless check, open in a browser and eyeball every slide against the frame.)
5. Open the final deck in a browser to confirm, then hand over the file path. For a PDF, tell them it prints landscape one-slide-per-page from the browser.

## Section to slide mapping (default)

This mirrors the three-section recipe in `brand-prospect-doc`. Adapt it to whatever the actual doc contains.

- **Intro / framing line** → Block 1, **Cover** (dark). Headline "How We'd Approach [Brand]." with the brand word in yellow. Lede is the doc's opening framing.
- **"How we'd approach [Brand]" positioning bullets** → split across two light slides:
  - **The read** → Block 2, **Stat cards**, for the two or three numbers the doc leans on.
  - **Where the work is** → Block 3, **Pillars**, one per positioning bullet, max four.
- **Ideas, operations-driven** → Block 4, **Editorial rows** ("Bigger lifts").
- **Ideas, tag-on** → Block 5, **Card grid** ("Start now").
- **Ideas, skip** → Block 6, **Skip cards** ("What we'd skip").
- **What we'd need** → Block 7, **Close checklist** (dark) plus a closing line. Bookends the cover.

Seven slides is the typical shape. A thinner doc might be five, a meatier one nine. Let the doc decide.

## The blocks

The full, fill-ready HTML for every block is in `references/slide-blocks.html`, each one labelled with its class signature and item ceiling. Read that file before assembling. The shapes, in short:

- **Every content slide** opens with the header pattern: a mono eyebrow (`NN — SECTION`), then `.head-split` — a Funnel Display `h2` that ends in a full stop, with an Inter `.lede` to its right.
- **Cover (dark):** `h1` with the brand word in `.accent`, eyebrow, lede. Used once.
- **Stat cards:** exactly 3 in `.cards.c3`. Make the single most important number a `.card.feature` (dark card, yellow `.pill`, yellow `.stat`). The other two stay white.
- **Pillars:** up to 4 in `.c4`, up to 3 in `.c3`. Exactly one badge gets `.y` (yellow).
- **Editorial rows:** **needs `class="body top"` on that slide's `.body`.** 3 items or fewer → `.rows`. 4 to 6 → `.rows.two` (fills 01-03 left, 04-06 right). More than 6 → split into two slides. The first row can be `.row.lead` for a yellow number.
- **Card grid:** up to 6 in `.cards.c3` (3+3). Cards use `.card.note`. 4 or 5 leaves a clean gap, which is fine.
- **Skip cards:** 2 to 4 in `.cards.c3`, each `.card.skip-card` with an `.xmark`. Dashed and muted on purpose.
- **Close checklist (dark):** up to 6 asks in two columns (`.asks` / `.ask`), then one `.close-line`. Mirrors the cover.

## Fit rules — every slide must sit inside 16:9

Slides are a fixed 16:9 frame with `overflow:hidden`, so anything too tall clips or collides instead of scrolling. Catch it before delivery.

Run the checker (local):

```
npm i puppeteer            # once; bundles a browser. Or: npm i puppeteer-core + a Chrome
node references/render-and-check.js <brand>-deck.html
```

It renders every slide to `slideN.png` and prints `bodyOver` per slide — the pixels the content exceeds the frame. Any slide with `bodyOver > 0` must be fixed. Look at the PNGs too; the number tells you there's a problem, the picture tells you which one.

Fix overflow in this order:

1. **Dense list overflowing** → switch `.rows` to `.rows.two`.
2. **Content colliding with the header** (headline creeping into the logo) → add `class="body top"` to that slide's `.body` so it anchors below the header instead of centering.
3. **Still over** → trim the copy. A row description over two lines is usually too long. A card sub over three lines is too long.
4. **Last resort** → a modest size nudge on that block only (e.g. row title `1.78cqw` → `1.6cqw`, card sub `1.12cqw` → `1.05cqw`). Never touch the shell's global type scale to fix a single slide.

The item ceilings in the block library are the first line of defence. Respect them and most slides fit on the first render.

## Voice

The doc already carries the voice, and `brand-prospect-doc` is the source of truth for it. Preserve it. Don't rewrite the doc's arguments to fit slides, just tighten wording for length. The rules that still bite at the slide layer:

- **"We'd" not "we will". "You" not "the brand".**
- **Quote anything the brand owns** on first use (collection names, product names, named pages, internal terms). The deck gets screenshotted and forwarded, so the first appearance on a slide is the one that needs the quotes.
- **Spell acronyms on first use, abbreviate after.** Track this across slides: the first slide that uses AOV, CRO, LTV etc. spells it out; later slides abbreviate. (In the Zebra example, "average order value (AOV)" is introduced on the stat slide, so the later idea slides use bare "AOV".)
- **No em dashes anywhere.** The shell and blocks contain none. Keep it that way.
- **Headlines are short and end in a full stop.** "The read." "Bigger lifts." "What we'd skip."

## Design literals (already baked into the shell, here for reference)

- **Modes:** dark (deep purple `#2C0F44`, warm amber glow top-right, faint dotted grid) for the cover and close; light (cream `#FAF6EE`, white rounded cards) for content.
- **Accent:** yellow `#FEC200`, doing one job per slide. Lilac `#CFAEED` for secondary text on dark slides.
- **Type:** Funnel Display for headlines (full stops, never all-caps), Geist Mono for labels and numbers (all-caps, letter-spaced), Inter for body.
- **Logo** renders monochrome (white on dark, ink on light) via `currentColor`. The two-tone violet-frame version is a deliberate future option, not a bug, swap it in the shell symbol if ever wanted.

## Non-obvious gotchas

- **Fonts come from Google Fonts over the network.** Locally that just works; don't run `setup-fonts.sh`. (It exists only for the offline sandbox, where Chromium silently falls back to Arial and every overflow number is wrong.)
- **The `<!-- SLIDES -->` marker is the only place slides go.** Leave the head, the CSS, the logo symbol, and the script untouched.
- **Editorial rows always need `class="body top"`.** Without it, an over-tall list centres and rises into the logo.
- **The `NN / NN` meta and `NN — SECTION` eyebrow numbers are manual.** Set them to the final slide count and order, last thing before rendering.
