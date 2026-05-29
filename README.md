# scratchpad

A public playground. Talk to Claude, it builds a self-contained page, you push, it's live.

- No homepage — `/` and anything unknown shows a **404**.
- A hidden index of everything at **`/home`** (nothing links to it).
- Each experiment is fully isolated at its own URL like `/cool-thing-001/`.

## Run it locally

```
npm install
npm run dev
```

Then open <http://localhost:5173/home>.

## How Claude knows what to do

It reads [`CLAUDE.md`](CLAUDE.md). Just talk to it: "make me a thing that does X." It picks a
URL, builds an isolated page, and adds it to the index.

## Deploy (Cloudflare Pages)

Connect this repo to a Cloudflare Pages project with:

- **Build command:** `npm run build`
- **Output directory:** `dist`

Push to your default branch and it deploys. Pages Claude adds show up automatically — no config
changes needed.

Live at **<https://pages.thepixeltheory.app/>** — a page lives at
`https://pages.thepixeltheory.app/<slug>-<NNN>/`, and the hidden index is at
<https://pages.thepixeltheory.app/home>.

> Note: `/home` is hidden only by not being linked. It is not private — anyone who knows the URL
> can see it. Don't put anything sensitive here.
