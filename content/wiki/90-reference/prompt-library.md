# AI Prompt Library

The prompts the post-click team runs, what each one is for, and the rules baked into them.

These are the prompts that earn their place because they do real post-click work: turning raw
survey data into copy strategy, turning survey answers into headlines and bullets, and
reverse-engineering ad creative into reusable frameworks. Each entry says what it's for, the
shape of the input and output, and the non-negotiable rules. The full prompt text lives in the
source docs linked at the bottom; this is the index and the discipline.

## 1. Customer Survey Analysis

**For:** turning a few hundred open-ended survey responses into a strategy document we can
design and write from.

**How it runs:** the model acts as a Senior Data Analyst and Semantic Specialist, and works
sequentially with a sign-off gate before it uploads anything to Notion. It does deep semantic
clustering of every response, plus a fact-find on the brand and a read of the live landing page.

**Output:** an atomic report with, per question, a table of key themes with mention counts and
nuance notes, the five best non-generic excerpts, and a ~400-character TL;DR. Then an overall
view: 3 to 5 themes each for problem, outcome, and friction; 3 to 5 angles per theme; and ~20
paraphrased headlines tagged problem / outcome / friction.

**Rules:** no generic "I love the concept" excerpts; review the live page so optimisations can
be flagged; match the site's tone of voice; no em dashes; simple formatting; no emojis. For
multi-SKU brands, cluster products by their problems and outcomes and report per cluster.

This is the front of the pipeline. Its output feeds the swipe file and the hook library.

## 2. Survey-to-copy formulas

**For:** generating first-draft landing-page and ad copy straight from clustered survey cells,
in bulk, inside a spreadsheet.

**How it runs:** five `AI()` formulas, one per copy type. Each reads the survey cells, applies
a copywriting framework, and returns options.

- **Headlines.** Reverse-engineers the cells against the headline formula bank (see
  `hook-library.md`) and returns three unique headlines.
- **Now You Can.** Same input through the "now you can [outcome]" shape.
- **Bullets.** Expands a message into a three-bullet list using AIDA or PAS.
- **Description.** Expands a message into one short paragraph.
- **Direct Quotes.** Pulls the three most specific, thought-provoking verbatim quotes for use
  as hero testimonials or headlines.

**Rules:** the same house rules as the hook library apply (no product name, no hyphen or colon,
character limits per type, one per line, no numbering).

## 3. Ad framework reverse-engineering

**For:** breaking a high-performing ad (yours or a competitor's) into a reusable, brand-agnostic
framework, then recreating it for a different brand.

**How it runs:** two prompts. The first takes any ad or script and returns a framework table:
Framework Section (Hook, Before State / Agitation, Product Reveal / Solution, Backing / USP,
CTA), Script Breakdown rewritten with [placeholders] so it ports across niches, Visual
Description, Shot Type, and Audio. The second takes that framework plus a target brand's page,
angle, and persona and rewrites it as a conversion-focused paid script.

**Note:** this is an external resource (Soar With Us / Hambi Media) we keep for reference. It's
pre-click creative more than post-click, but the framework-extraction habit is useful for
turning any winning asset into a repeatable template.

## 4. Ad-image JSON layout scripts

**For:** generating on-brand static ad images fast, as concept references for designers.

**How it runs:** plug-and-play JSON layout blueprints (stacked hero, us-vs-them split,
testimonial UGC, double product, immersive single, promo banner, half-product/half-quote, 2x2
grid). You drop in real copy and visual direction and pass it to an image model.

**Rules:** fewer than 12 words per image; use real brand copy, fonts, and colours, never
placeholders; stay ASA/CAP compliant (no AI before/after that implies results, no fake
testimonials, label AI imagery "for illustrative purposes only"). Treat outputs as concept
references for designers, not finished ads.

## When to reach for which

- Onboarding a brand and you have survey data: run **1**, then mine the output into the swipe
  file.
- Need copy volume off that data: run **2** in the spreadsheet.
- Studying what's working in creative: run **3**.
- Need a quick visual concept to brief a designer: run **4**.

---

*Sources: Notion "Prompt - Customer Survey Analysis" (`329b4e6a-dca1-80c0-acf4-efbbd1bf4dbd`)
with its format example "Customer Survey Analysis Example" (`329b4e6a-dca1-80a8-9483-da51cdc07eaf`),
"Kerry Training" (`2a6b4e6a-dca1-814c-8c77-e23e5e5b44a4`, the five survey-to-copy formulas), and
"Ad Campaign JSON Script Library" (`2a6b4e6a-dca1-8147-8c24-f9ff9776535e`, the reverse-engineering
prompts and JSON layouts), all pulled 2026-05-30.*

*Open questions:*
- *Prompts 3 and 4 are a third-party resource (Soar With Us / Hambi Media) and lean pre-click.
  Decide whether the reference shelf keeps creative prompts or scopes strictly to post-click; if
  the latter, they move or get cut.*
- *The survey-to-copy formulas (prompt 2) hard-code one client's product and char limits in their
  example text. Listed here in product-agnostic form; the live spreadsheet template should be
  parameterised before reuse.*
- *No central prompt library page exists in Notion. These four are the prompts found in the
  Internal Docs database; add others (e.g. any QA-agent or daily-vitals prompts) as they mature.*
