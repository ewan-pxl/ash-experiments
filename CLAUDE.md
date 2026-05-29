# CLAUDE.md

This repo is a **public scratchpad**. Someone talks to you, you build a small self-contained web
page, and it goes live at its own URL. There is **no homepage** — the root and every unknown path
show a 404. There is one hidden index at `/list` that lists every page.

**Your job:**
- When asked for "a new thing", scaffold a new isolated page (recipe below).
- When asked to change an existing thing, edit **only that page's folder**.

---

## How it's built

- Vue 3 + Vite. Deployed to Cloudflare Pages (push to deploy).
- Every page lives in its own folder `pages/<slug>-<NNN>/` and is a **completely separate build**:
  its own `index.html`, its own JS bundle, its own Vue app, its own CSS. **Pages cannot affect each
  other.** This isolation is the entire point of the project — preserve it.
- The build lifts each page to a clean URL: `pages/welcome-001/` → live at `/welcome-001/`.
- `/list` and the 404 live in `src/` (the "shell"). You normally never touch the shell.

```
pages/
  welcome-001/        ← one experiment = one folder
    index.html
    main.js
    App.vue
    meta.json         ← name + description shown on /list
src/                  ← the shell (/list + 404). Leave it alone.
```

---

## Naming & numbering (read carefully)

- Folder name **is** the URL. Format: `kebab-name-NNN`, e.g. `pixel-painter-007` → `/pixel-painter-007/`.
- `NNN` is a permanent, zero-padded 3-digit id.
- **Next id = (highest existing id) + 1.** To find it, list the `pages/` folder, take the largest
  trailing number, add one. If `pages/` is empty, start at `001`.
- **Never reuse, renumber, or shift existing ids** — even if a page was deleted. Old numbers stay
  retired so live URLs never break. (So the next id can be higher than the page count.)
- Pick a short, descriptive kebab-case slug from what they asked for.

---

## Recipe: create a new page

1. List `pages/` → find the highest `-NNN` → that page's next id is `NNN + 1` (padded to 3 digits).
2. Choose a slug. Final folder name = `pages/<slug>-<NNN>/`.
3. Create the four files below in that folder.
4. Build the actual thing inside `App.vue`. Add more `.vue` / `.js` / `.css` files **in the same
   folder** if you need to — just keep everything inside this one folder.
5. Fill in `meta.json`. The `/list` page picks it up automatically — **never edit any list file.**
6. Preview, then ship (see bottom).

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
  "created": "YYYY-MM-DD"
}
```
- `id`: the integer form of `NNN` (no leading zeros, e.g. `7` for `-007`).
- `created`: today's date, `YYYY-MM-DD`.

---

## Rules

- **Isolation is the whole point.** Each page mounts its own Vue app and must be fully
  self-contained. Don't rely on anything global. Keep CSS scoped (`<style scoped>` or
  page-unique selectors / a reset inside the page).
- **One page, one folder. Never touch another page's folder.**
- **Don't edit the shell** (`src/`, the root `index.html`, `vite.config.js`) unless you're explicitly
  asked to change the framework itself.
- **Don't renumber.** ids are forever.
- **Don't create a homepage or link to `/list`.** The 404 and hidden index are intentional.
- **Keep `<meta name="robots" content="noindex" />` in every page's `index.html`.** Nothing here should be indexed by search engines.

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
- The index is at <http://localhost:5173/list> (it links to each page automatically).
- A page in dev is served at `http://localhost:5173/pages/<slug>-<NNN>/index.html`.
- **Go live:** commit and push. Cloudflare Pages builds (`npm run build` → `dist`) and deploys.
  The page is then live at:

  ```
  https://pages.thepixeltheory.app/<slug>-<NNN>/
  ```

  **After you push, give them that exact link** (with the real slug and number filled in) so they
  can open the deployed page.
