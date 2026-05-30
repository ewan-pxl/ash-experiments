# Token principles

How we use the tokens, so that when classes get assigned they are assigned for the right reason. The
point is clarity: every token has a job, and you pick it by what the thing is *doing*, not by the raw
value that happens to match.

## Two layers

- **Foundation** (`foundation/`) is surface-agnostic: colour and typography. The "what the brand is".
  A green is the same green on a website, a slide, or an email. Defined once, shared by everything.
- **Surface application** is how you use that foundation on a given surface, and surfaces genuinely
  differ. **Web (`web/`) is the default and roughly 90% of the work**, see `web/PRINCIPLES.md`. Other
  surfaces (decks, and anything else) are **additional**: they get their own folder only when there is
  real content for them, and they pull from `foundation/` rather than copying it.

## The core rule

**Assign by role, reference the token, never the value.** A colour is "surface" or "text", not
"#001A01". A space is a "gap" or an "inset", not "20px". You are naming intent. The token resolves to
the right value per theme and per breakpoint on its own. Hardcode a hex or a px and you have broken the
system the moment the theme flips or the viewport changes.

Two rules that follow:
- **Recolour, do not rebuild.** The house green system is the structure. Per client you swap the colour
  values and the fonts and keep the structure intact.
- **One job per category.** Do not borrow a token from the wrong family because the number lines up.

## Colour (foundation)

Colours are assigned by semantic role, and the role carries across both theme modes (`base` and
`inverse`), so the same class flips correctly when the theme does.

- **`theme.surface`** for backgrounds and fills.
- **`theme.text`** for type (`default`, `muted`, `faint`, `inverse`, plus `link`, and `true`/`false`
  for state).
- **`theme.border`** for borders and dividers.
- **`button.primary` / `button.secondary`** carry their own surface, text, and border, including hover
  states. Use the button tokens for buttons, do not reassemble one from raw surface and text.
- **`icon`** by role (`neutral`, `default`, `accent`, `link`, `ratings`).
- **`true` / `false`** are the state colours (success and error). Use them for state, not as general
  greens and reds.

---

*Source: the house token model as defined by Ash, 2026-05-30. Foundation colour tokens live in
`foundation/colors/`. Web application principles are in `web/PRINCIPLES.md`.*
