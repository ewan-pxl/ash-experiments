# Branding

Central, version-controlled source of truth for client brand assets — logos,
design tokens, fonts, imagery, and video — meant to be **referenced by other
repositories** (e.g. Ash Experiments) so that mockups and experiments are
produced on-brand instead of by guesswork.

## Quick start

```
clients/
  _template/      # copy to start a new client
  vanman/         # first example client
    logos/        # logo files
    tokens/       # design tokens (colours, type, spacing) — the "Figma nodes"
    fonts/        # font files + licensing
    assets/       # images, icons, patterns
    video/        # brand video (Git LFS)
```

## 👉 Read `CLAUDE.md` first

[`CLAUDE.md`](./CLAUDE.md) is the usage contract: how to reference this repo,
the token format, how to add a client, and the gotchas that keep it clean. Any
project (or agent) consuming this repo should read it before pulling anything.

## Using it elsewhere

Add as a submodule and reference by path:

```bash
git submodule add <branding-repo-url> branding
```

Then e.g. `branding/clients/vanman/tokens/color.tokens.json`.

## Clients

| Client | Status | Notes |
| ------ | ------ | ----- |
| [vanman](./clients/vanman) | 🟡 logo only | Tokens & fonts are placeholders awaiting brand source |
