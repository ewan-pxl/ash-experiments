# Skills Library

These are the custom Claude skills we've built for Pixel Theory. A skill is a packaged way of working: when you trigger one, Claude follows our exact method for that job instead of winging it. There are 27 of them, grouped below by what they're for.

They live in this repo under `/skills` (one folder each), and they're wired into Claude Code, so anyone on the team can use them.

**How to use one:** type the slash command (e.g. `/humanify`) or just describe the task in plain words. Most skills trigger on their own when what you're asking matches what they do, so you rarely have to name them. The tags are there so you can scan for the right tool fast.

---

## Product & visual generation

Prompt-writing skills for product photography and icons. Most output a ready-to-paste image-gen prompt rather than the image itself.

| Skill | What it does | Tags |
|---|---|---|
| `/bundle-into-lineup` | Composes 3 to 8 product packshots into one clean cluster on pure white, ready to cut out. For ecom bundle and PDP hero shots. | `image` `product` `ecom` |
| `/bundle-into-scene` | Composes a multi-pack bundle into one lifestyle scene, every unit kept true to the real product. For variety-pack hero shots. | `image` `product` `lifestyle` |
| `/locked-product-scenes` | Locks one product (size, angle, label) and only changes the scene around it, in layered passes. For a collection of on-brand scene shots. | `image` `product` `collection` |
| `/photo-to-render` | Turns real photos of a football boot into clean studio renders matched to a reference render. Casts five options to pick from. | `image` `render` `product` |
| `/pair-image` | Makes a near-clone of an existing image with only small tweaks (before/after, healthy/compromised). The pair reads as the same object. | `image` `comparison` |
| `/icon-description` | Writes one tight prompt to generate a single icon or illustration, tuned for elevated, hyperreal assets. | `image` `icons` `prompt` |
| `/icon-pack-from-reference` | Builds a whole set of matching icons from a reference image, holding the style steady and swapping only the subjects. | `image` `icons` `system` |

## Copywriting & sales pages

Direct response copy built on the classic copywriter frameworks.

| Skill | What it does | Tags |
|---|---|---|
| `/copywriting` | Direct response copy (sales pages, emails, ads) using Todd Brown, Halbert and Kern. Big idea, lead types, fascinations, proof. | `copy` `direct-response` |
| `/long-form-sales-letter` | Long-form sales letters and VSL scripts in the classic Agora style, drawing on the legendary copywriter playbooks. | `copy` `sales-page` `long-form` |
| `/writing-conversion-narratives` | Builds the persuasive narrative that carries someone from first click to conversion. For sales and landing pages. | `copy` `narrative` `cro` |
| `/constructing-landing-pages` | Builds a full landing page messaging framework: emotional hook plus a logical path to one action. | `copy` `landing-page` |

## Video sales letters (VSL)

Talking-head video scripts. All three produce themes-and-versions output; the briefs also build a Notion deliverable.

| Skill | What it does | Tags |
|---|---|---|
| `/vsl-brief` | Turns brand context into VSL scripts (three themes, two versions each) plus a Notion deliverable in the kēpos format. Any on-camera talent. | `vsl` `video` `notion` |
| `/vsl-script-writing` | Writes VSL, webinar and video ad scripts using Hook-Story-Offer and the direct response frameworks. | `vsl` `video` `copy` |
| `/founder-vsl-scripts` | Founder-to-camera confessional scripts, three themes by two versions, with pause and performance direction. Notion deliverable. | `vsl` `video` `founder` |

## CRO, testing & offers

Conversion work: running tests, prepping briefs, logging results, building offers.

| Skill | What it does | Tags |
|---|---|---|
| `/ab-split-test-engineering` | The full A/B method: ICE prioritization, sample size, significance, hypotheses, lift maths. Neil Patel style. | `cro` `ab-testing` |
| `/cro-brief-builder` | Turns raw CRO strategy markdown into a designer-ready Notion brief plus a pinnable card. Handles single and multi-page tests. | `cro` `notion` `brief` |
| `/intelligems-cro-sync` | Pulls A/B results from Intelligems and writes them into the matching CRO Lab Notion rows. Finds the unsynced tests itself. | `cro` `intelligems` `notion` |
| `/offer-stack-creation` | Builds an irresistible offer with Russell Brunson's offer stack: value anchoring, risk reversal, urgency. | `offers` `cro` |
| `/tripwire-funnel-optimization` | Optimizes tripwire funnels with Todd Brown's E5 method: pricing and upsell-path design. | `offers` `funnel` `cro` |

## QA & delivery

Checking the work actually holds up before and after it ships.

| Skill | What it does | Tags |
|---|---|---|
| `/website-qa` | Runs a structured QA pass on a live or preview site with Playwright (functional flows, responsive breakpoints, console and network errors, visual layout), saves a timestamped run, and diffs it against a baseline to surface regressions. | `qa` `testing` `playwright` |

## Prospect & agency deliverables

Turning thinking into things we hand to a prospect or share internally.

| Skill | What it does | Tags |
|---|---|---|
| `/brand-prospect-doc` | Short, human Notion doc for a prospect: how we'd work with them, ideas split by ops dependency, what we need from them. Runs an intake first. | `prospect` `notion` `doc` |
| `/how-we-d-approach-high-fidelity-deck` | Turns a finished prospect doc into a branded on-screen slide deck in the house style. Layout layer only; run after `/brand-prospect-doc`. | `prospect` `deck` `design` |
| `/braindump` | Turns a stream-of-consciousness dump into a clean, shareable doc. Auto-picks prose, report, planning or meeting-notes format, then asks where to send it. | `writing` `doc` `notes` |

## Voice & writing style

| Skill | What it does | Tags |
|---|---|---|
| `/humanify` | The house writing style. Makes any draft read like a sharp person typed it fast, not an AI report. No em dashes, no buzzwords. Use as a final pass on anything going out. | `voice` `writing` `house-style` |

## Working with Claude

Meta skills for steering the work itself.

| Skill | What it does | Tags |
|---|---|---|
| `/take-a-step-back` | Zooms out mid-conversation to sanity-check direction when you're deep in the weeds or stalling. | `workflow` `reflection` |
| `/consolidate-memory` | Tidies Claude's saved memory: merges duplicates, fixes stale facts, prunes the index. | `workflow` `memory` |
| `/setup-cowork` | Guided Cowork setup: installs role-matched plugins, connects your tools, walks you through a first skill. | `workflow` `setup` |

---

*Keeping this current:* this page is written by hand, it doesn't auto-update. When a skill is added, removed or meaningfully changed under `/skills`, update the matching row here so the list stays trustworthy.
