# CLAUDE.md

This repo is a **public scratchpad**. Someone talks to you, you build a small self-contained web
page, and it goes live at its own URL. There is **no homepage** — the root and every unknown path
show a 404. There is one hidden index at `/home` that lists every page.

**Your job:**
- When asked for "a new thing", scaffold a new isolated page (recipe below).
- When asked to change an existing thing, edit **only that page's folder**.

---

## How it's built

- Vue 3 + Vite. Deployed to Cloudflare Pages (push to deploy).
- Every page lives in its own folder `pages/<slug>-<NNN>/` and is a **completely separate build**:
  its own `index.html`, its own JS bundle, its own Vue app, its own CSS. **Pages cannot affect each
  other.** This isolation is the default and the entire point — preserve it. (The one deliberate
  exception is **Projects**, where related pages opt into sharing assets/code — see below.)
- The build lifts each page to a clean URL: `pages/welcome-001/` → live at `/welcome-001/`.
- **Folders are virtual.** The `pages/` directory stays flat (one folder per page). A page's
  `meta.json` `folder` field sets where it lives in the URL — e.g. `folder: "games/arcade"` makes
  `pages/snake-007/` go live at `/games/arcade/snake-007/`. Empty `folder` = root. To move a page,
  just change its `folder`; never move or rename the on-disk folder.
- **The URL is always slugged.** The folder is lowercased and any spaces/punctuation collapse to
  single dashes, so `folder: "Statement of Works"` is served at `/statement-of-works/<slug>-NNN/`.
  The index keeps the original name for display; only the URL is slugged (and any case/spacing in a
  link still resolves). So when you hand over a live link, **slug the folder** — don't paste it raw.
- `/home` and the 404 live in `src/` (the "shell"). You normally never touch the shell.

```
pages/
  welcome-001/        ← one experiment = one folder
    index.html
    main.js
    App.vue
    meta.json         ← name + description shown on /home
src/                  ← the shell (/home + 404). Leave it alone.
```

---

## Naming & numbering (read carefully)

- Folder name **is** the URL. Format: `kebab-name-NNN`, e.g. `pixel-painter-007` → `/pixel-painter-007/`.
- `NNN` is a permanent, zero-padded 3-digit id.
- **Next id = (highest existing id) + 1.** To find it, list the `pages/` folder, take the largest
  trailing number, add one. If `pages/` is empty, start at `001`.
- **Never reuse, renumber, or shift existing ids** — even if a page was deleted. Old numbers stay
  retired so live URLs never break. (So the next id can be higher than the page count.)
- **Numbering is global.** The next id is the highest across *all* pages, regardless of folder —
  folders do **not** get their own counters.
- Pick a short, descriptive kebab-case slug from what they asked for.
- **Folders** go in `meta.json`, not the on-disk path. They become the URL prefix
  `/<folder>/<slug>-NNN/`. Empty `""` = root. Always let him choose the folder (see the recipe)
  rather than deciding silently.
- **Folders can nest to any depth** — separate levels with `/`, kebab-case each (e.g. `"games"`,
  `"games/arcade"`, `"clients/zebra/decks"`). The `/home` browser drills through each level, and a
  guessed or custom folder can be nested too.
- **Don't use `home` as a top-level folder** — `/home` and `/home/<folder>` are the hidden index's
  own URLs, so a page there would collide with it.

---

## Recipe: create a new page

1. List `pages/` → find the highest `-NNN` → that page's next id is `NNN + 1` (padded to 3 digits).
2. Choose a slug. The on-disk folder is always `pages/<slug>-<NNN>/` (flat — folders are virtual).
3. **Ask which project it belongs to** (project first — see **Projects** below for the prompt and
   for what a project actually is). A project is what lets the page share assets with related pages.
4. **Ask which folder it belongs in.** Read the existing folders (the `folder` values across
   `pages/*/meta.json`), then ask with a multiple-choice prompt that **always** offers:
   - **Guessed folder** — the best existing fit (the project from step 3 can inform this); or a
     sensible **new** folder name if nothing fits.
   - **Root** — no folder (top level).
   - **Other** — a free-text custom path (the prompt always includes a free-text option).

   **Interpret, don't transcribe** either answer — a rambled reply ("eh just chuck it in with the
   zebra client stuff") means *work out what he intends*, normalize to a clean kebab-case path, and
   reuse an existing folder/project if it matches. Never paste raw wording in. Ask again if unclear.
5. Create the four files below in `pages/<slug>-<NNN>/`.
6. Build the actual thing inside `App.vue` (add more files in the same folder as needed). If it's in
   a project, put assets/fonts in the project and import them via `@projects/...` (see **Projects**).
7. Fill in `meta.json` (including `folder` and `project`). The `/home` page picks it up automatically
   — **never edit any list file.**
8. Preview, then ship (see bottom).

### Templates

`index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>NAME HERE</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

`main.js`
```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

`App.vue`
```vue
<script setup>
// build the thing here
</script>

<template>
  <main>
    <!-- ... -->
  </main>
</template>

<style scoped>
/* keep all styles scoped to this page */
</style>
```

`meta.json`
```json
{
  "id": 2,
  "name": "Human Readable Name",
  "description": "One sentence describing it — shown on the index.",
  "folder": "",
  "project": "",
  "tags": [],
  "created": "YYYY-MM-DD",
  "updated": "YYYY-MM-DD"
}
```
- `id`: the integer form of `NNN` (no leading zeros, e.g. `7` for `-007`).
- `folder`: optional URL folder, slash-separated kebab-case (e.g. `"games"` or `"tools/text"`).
  Empty string = root. Sets the live path: `/<folder>/<slug>-NNN/`.
- `project`: optional kebab-case project name (e.g. `"pixel-theory"`). Empty = no project. Orthogonal
  to `folder` — see **Projects**.
- `tags`: optional array of short lowercase labels (e.g. `["game", "canvas", "wip"]`) for
  cross-cutting search/filter. **Guess a few relevant ones yourself** — don't make him supply them —
  but **confirm them with him before the page first goes live** (see Preview & ship). Shown as chips
  on the index, searchable, and clicking one filters to that tag.
- `created`: today's date, `YYYY-MM-DD` (set once, when you make the page).
- `updated`: today's date as well — and **bump it to today whenever you change the page**. Folders
  and projects display and sort by the most recent `updated` among their items.

---

## Rules

- **Isolation is the whole point.** Each page mounts its own Vue app and must be fully
  self-contained. Don't rely on anything global. Keep CSS scoped (`<style scoped>` or
  page-unique selectors / a reset inside the page).
- **One page, one folder. Never touch another page's folder.**
- **Don't edit the shell** (`src/`, the root `index.html`, `vite.config.js`) unless you're explicitly
  asked to change the framework itself.
- **Don't renumber.** ids are forever.
- **Keep `updated` current** — set `created` and `updated` to today when you make a page, and bump
  `updated` to today whenever you edit an existing one. It drives the last-touched date on folders
  and projects.
- **Don't create a homepage or link to `/home`.** The 404 and hidden index are intentional.
- **Keep `<meta name="robots" content="noindex" />` in every page's `index.html`.** Nothing here should be indexed by search engines.

---

## Projects

**A project is a set of related pages that share resources** — fonts, images, colours, the occasional
component — because they belong together (same client, brand, campaign, or series). It gives those
pages one shared home at `projects/<name>/`, so an asset is defined once and reused instead of every
page carrying its own copy. **Pages with no project stay fully isolated;** a project is the deliberate
"these go together and share stuff" grouping. Isolation is still the default — a project is a bounded,
opt-in exception to it.

A page joins a project via `"project": "<name>"` in its `meta.json`. **Project is orthogonal to
folder** — `folder` is where the page lives in the URL; `project` is who it shares with. A page can
have both, one, or neither.

### Layout & importing

```
projects/<name>/
  assets/     images etc.        (shared)
  fonts/      font files + fonts.css
  shared/     code — only when hoisted (see below)
```

That layout is a starting point, not a cage — **keep `projects/<name>/` organised however makes
sense for that project** as it grows: subfolder the assets, split `brand.css` into tokens + fonts,
add a `components/` dir, group by page set, whatever's tidiest. Just keep the import paths consistent
so pages don't break, and tidy up (merge dupes, drop unused assets) as you go.

Pages import shared things through the `@projects` alias:

```js
import logo from '@projects/<name>/assets/logo.svg'      // bundled, hashed, deduped
import '@projects/<name>/brand.css'                       // shared tokens / @font-face
import sprite from '@projects/<name>/logo.svg?raw'        // inline an SVG (then v-html it)
```

Vite content-hashes and **dedupes** shared imports across pages, so one asset is emitted once and
cached across the whole project.

### Assets & fonts — always shared

For any page **in a project**, its assets and fonts live in `projects/<name>/`, not the page folder —
even if only one page uses them (single asset home, ready for reuse). **Check what's already in the
project and reuse it** before adding anything new. (Project-less pages keep their assets local, as
normal.)

### Code — local by default, shared only when it clearly pays off

Keep code **local to the page** by default. When you add a page to a project, read its sibling pages
(same `project`) and look for *substantial, stable* duplication — a component or util both genuinely
need. A little duplication beats premature coupling, so be conservative.

If you do find something worth sharing, **propose before moving**: tell him what you'd hoist to
`projects/<name>/shared/` and **which pages it would touch**, and only do it once he's okay with it.
Then update every page that uses it and re-verify.

### Safety (sharing couples pages — handle with care)

- After hoisting or editing shared code, update **all** pages in the project that use it, keep changes
  **additive** where possible, run the build, and preview each affected page.
- If a change would break a sibling, **don't force-share** — keep it local or version it.
- **Rule exception:** within a project you *may* edit sibling pages' folders to refactor shared code.
  This is the only time the "never touch another page's folder" rule is relaxed — keep it scoped to
  project-mates.

### The project prompt (recipe step 3)

Ask which project the new page belongs to. Lead the question with a one-line reminder of what a
project is — e.g. *"Is this part of a project? Projects let related pages share fonts/images/assets
(same client or series)."* — then offer, building the options from context:

- **Add to `<existing>`** — when it genuinely fits an existing project (read the projects first).
- **New project `<name>`** — when it sounds like the start of something reusable; propose a kebab name.
- **No project** — standalone, fully isolated (the default for one-offs).
- **Other** — free-text (always present). Interpret intent, don't transcribe; reuse an existing
  project if the wording matches one.

### In the index

`/home` has a **Projects** tab (lists every project; click one to see its pages), and every page card
shows a small **project badge** plus its **tags** as chips. Clicking a tag (or typing `tag:<name>`)
filters to that exact tag across **every** folder and project; plain text search stays scoped to the
current view. Under the search bar it shows the 5 most-used tags for the current view (a `…` opens a
**Tags** tab listing them all). Everything updates automatically from `meta.json` — never edit a list
file.

---

## Dependencies

- Vue is already installed — `import { ref } from 'vue'` works in any page.
- For other libraries, prefer importing from a CDN **inside the page** so it stays independent and
  doesn't bloat the shared install, e.g.:
  ```js
  import confetti from 'https://esm.sh/canvas-confetti'
  ```
- Only add to `package.json` if you genuinely must, and **never remove** another page's dependency.

---

## Preview & ship

- First time: `npm install`. Then `npm run dev`.
- The index is at <http://localhost:5173/home> (it links to each page automatically).
- A page in dev is served at `http://localhost:5173/pages/<slug>-<NNN>/index.html`.
- **Before the first push,** show him the `tags` you guessed for the page and let him tweak them — it
  guesses, he confirms. (Folder and project were already chosen at creation; tags are the one bit of
  `meta.json` worth a quick confirm at ship time.)
- **Go live:** commit and push. Cloudflare Pages builds (`npm run build` → `dist`) and deploys.
  The page is then live at:

  ```
  https://pages.thepixeltheory.app/<folder-slugged>/<slug>-<NNN>/
  ```

  `<folder-slugged>` = the folder **lowercased with spaces/punctuation turned into dashes** (e.g.
  `"Statement of Works"` → `statement-of-works`); drop it entirely if the page is at the root. **After
  you push, give them that exact link** (folder slugged, real slug and number) — a raw, unslugged
  folder will 404.
