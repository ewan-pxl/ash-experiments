# Branding — Single Source of Truth for Client Brand Assets

> This file is the contract for how the **Branding** repository is used. If you
> are an agent (or a person) referencing this repo from another project, read
> this first. It tells you what lives here, how to pull from it, and — just as
> importantly — what **not** to do.

---

## 1. What this repo is

Branding is a **read-mostly reference library** of everything that defines how a
client looks and feels:

- **Logos** — primary, mono, stacked, favicon, etc.
- **Design tokens** ("nodes" in Figma) — colours, typography, spacing, padding,
  radii, shadows. The machine-readable rules of the brand.
- **Fonts** — the actual font files, plus licensing notes.
- **Assets** — photography, icons, patterns, textures.
- **Video** — brand video, motion, b-roll (tracked via Git LFS).

It exists so that other projects — most importantly **Ash Experiments** — can
reference a client's real brand instead of guessing. When someone drops a
screenshot or rough mockup and says *"this is for Vanman"*, an agent should be
able to come here, load Vanman's tokens, fonts, and logos, and produce a
**polished, on-brand** version instead of an approximation.

## 2. What this repo is NOT

- ❌ **Not** a place to build experiments or mockups. Those live in the
  consuming repo (e.g. Ash Experiments). Pull *from* here; don't build *in* here.
- ❌ **Not** a dumping ground for one-off exports, screenshots, or
  work-in-progress. Only canonical, reusable brand material belongs here.
- ❌ **Not** a CMS or DAM with versioned history of every export. Keep the
  current source of truth; let Git history be the history.

---

## 3. Repository structure

```
branding/
├── CLAUDE.md              ← you are here (the usage contract)
├── README.md              ← human-facing overview
├── .gitattributes         ← Git LFS rules for binaries (video, fonts, large img)
├── clients/
│   ├── _template/         ← copy this to start a new client
│   └── <client>/          ← one folder per client (lowercase-kebab)
│       ├── README.md      ← client brand summary + provenance
│       ├── logos/         ← logo files (svg preferred, + png fallbacks)
│       ├── tokens/        ← design tokens (DTCG JSON), split foundation/ + surface — see §5
│       │   ├── foundation/    ← surface-agnostic: colour, typography (shared)
│       │   └── web/           ← UX/UI application: grid, spacing scales (the default surface)
│       ├── fonts/         ← font files + FONTS.md licensing notes
│       ├── assets/
│       │   ├── images/
│       │   ├── icons/
│       │   └── patterns/
│       └── video/
```

### Naming conventions (follow these — agents rely on them)

- Client folder: **lowercase-kebab-case** (`vanman`, `acme-co`). One client = one folder.
- Files: lowercase-kebab, prefixed with client where ambiguous
  (`vanman-logo.svg`, `vanman-logo-mono.svg`).
- Tokens: `*.tokens.json`, one file per category, under `foundation/` (colour, typography) or a
  surface folder (`web/` for spacing, grid, etc.). See §5.
- Never use spaces in committed filenames.

---

## 4. How to use it from another repo

**Recommended: add Branding as a git submodule** of the consuming repo so it
stays pinned and pullable:

```bash
git submodule add <branding-repo-url> branding
git submodule update --init
```

Then reference assets by path, e.g. `branding/clients/vanman/tokens/foundation/color.tokens.json`.

**Workflow for "make this mockup on-brand for <client>":**

1. Resolve the client folder: `clients/<client>/`.
2. Load `tokens/foundation/` for colour and type, and the relevant surface folder
   (`tokens/web/` for a page build) for spacing and grid. Use these exact values. Do not
   invent values that aren't in the tokens.
3. Load `fonts/` → use the actual brand fonts (check `FONTS.md` for the families
   and weights available).
4. Load `logos/` → use the real logo, never a redraw.
5. Pull supporting `assets/` as needed.
6. Read the client `README.md` for tone, do's/don'ts, and provenance.
7. Build the output **in the consuming repo**, not here.

---

## 5. Design tokens (the "Figma nodes")

Tokens are stored in the [DTCG / W3C Design Tokens](https://tr.designtokens.org/format/)
JSON shape so they're tool-agnostic and map cleanly to Figma variables:

```json
{
  "color": {
    "brand": {
      "primary": { "$value": "#1A1A1A", "$type": "color" }
    }
  }
}
```

- Every token has `$value` and `$type`. `$description` is encouraged.
- **Two layers.** Tokens split into `foundation/` (surface-agnostic: colour, typography, the "what
  the brand is", shared by everything) and one folder per **surface** that applies the foundation.
  `web/` (UX/UI: grid, spacing, padding, radius, icon) is the default and ~90% of the work. Other
  surfaces (`decks/`, etc.) are added only when there is real content, and they pull from
  `foundation/` rather than copying it. This keeps web as the front door and stops other surfaces
  diluting it.
- Categories within a layer: `color.tokens.json`, `typography.tokens.json` (foundation);
  `spacing.tokens.json`, grid/setup, `radius`, etc. (web). Colour modes can be a folder of files
  (`foundation/colors/base.tokens.json`, `inverse.tokens.json`).
- **Spacing/padding** uses a scale, not arbitrary px — see the template and the principles doc.
- Reference other tokens with `{group.name}` aliases where it helps
  (e.g. a button background that points at `{color.brand.primary}`).
- **Principles.** How tokens are assigned by role (so classes stay consistent) is documented once,
  for the house, at `pixel-theory/tokens/PRINCIPLES.md` (universal + colour) and
  `pixel-theory/tokens/web/PRINCIPLES.md` (the web spatial system and class-naming discipline).
  Clients inherit these; they do not each copy them.

> ⚠️ If a token value isn't known yet, leave the placeholder **and** mark it with
> `"$description": "PLACEHOLDER — confirm with brand source"`. Never silently
> ship a guessed brand colour as if it were real.

---

## 6. Fonts

- Drop the actual files (`.woff2` preferred for web, `.otf`/`.ttf` for design) in
  `clients/<client>/fonts/`.
- Every fonts folder MUST have a `FONTS.md` recording: family names, weights/styles
  included, the source (foundry/Google Fonts/Adobe), and the **licence** (and any
  embedding/redistribution limits).
- ⚠️ **Licensing gotcha:** not every font may legally live in a repo or be
  redistributed. If a licence forbids it, store a pointer (where to obtain it)
  instead of the file, and note that in `FONTS.md`.

---

## 7. Adding a new client

1. `cp -r clients/_template clients/<new-client>`
2. Fill in `README.md`, real token values, fonts (+ `FONTS.md`), logos.
3. Delete any `.gitkeep` placeholders in folders that now have real content.
4. Replace every `PLACEHOLDER` before treating the client as "ready to reference".

---

## 8. Gotchas & guardrails (read before committing)

- **Source of truth, not output store.** If you generated it from a mockup or
  experiment, it does NOT belong here. Only canonical brand inputs do.
- **Don't guess brand values.** Missing colour/font/spacing → mark it a
  placeholder, don't fabricate. A wrong "official" value is worse than a blank.
- **Binaries need LFS.** Video, large images, and fonts are tracked via Git LFS
  (see `.gitattributes`). Run `git lfs install` once before committing them, or
  the repo bloats fast.
- **Keep clients isolated.** No cross-client shared mutable files. If something is
  genuinely shared, it needs its own deliberate home — raise it, don't improvise.
- **Stable paths.** Other repos pin to these paths. Renaming/moving a client or
  token file is a breaking change for every consumer — avoid it, or do it
  knowingly.
- **No secrets.** API keys, signed asset URLs, internal links — none of that here.
  This repo is meant to be referenced widely.
- **Filenames are an API.** Lowercase-kebab, no spaces, predictable names. Agents
  glob these.
