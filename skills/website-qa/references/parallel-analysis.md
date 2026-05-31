# Parallel analysis (hybrid mode)

Used only on large sweeps, after you (the main agent) have captured all raw evidence (into `dump`, then moved into the run folder — see SKILL.md step 4). Subagents analyze the saved artifacts and propose findings; **they never drive the browser**. The browser has one driver — you.

## 1. Persist raw evidence during capture

So an analyzer can work without the browser, save more than screenshots. Use the standard filenames (from playwright-recipes.md) — once moved out of `dump`, images live in the run's `screenshots/` and text/JSON in `artifacts/`:

- `screenshots/<page>-<breakpoint>.png` — full-page shot (shared by responsive + visual)
- `artifacts/<page>-console.txt` — output of `browser_console_messages`
- `artifacts/<page>-network.txt` — output of `browser_network_requests`
- `artifacts/<page>-dom.txt` — `browser_snapshot` content (the analyzer uses this to spot interactables)
- `artifacts/<page>-<breakpoint>-overflow.json` — the overflow-measurement object (if you save it rather than read it inline)

Use a slug for `<page>` (e.g. `cart`, `home`, `product`) and keep it consistent with the slice key.

## 2. Dispatch analyzer subagents

Group the captured slices into independent chunks — by page or by check-type, whichever balances the work — and spawn one subagent per chunk. Give each subagent:

- The run folder path and the exact artifact files for its slices.
- The slice keys it owns.
- A pointer to `references/state-schema.md` for the finding shape and signature rules.
- This instruction: *read only the listed files; do not open a browser or call any `browser_*` tool. Produce findings with stable signatures for your slices. If judging a slice properly needs fresh browser interaction you can't do from the files, add a `needs_followup` entry instead of guessing.*
- **Also discover page-specific interactables.** From your page's DOM snapshot + screenshot, enumerate the interactive elements **specific to this page type** (variant pickers, qty steppers, add-to-cart, filters/sort, accordions/tabs, forms, carousels, etc.) and propose functional tests for them as `needs_followup` requests (with `breakpoint` + `expected`). **Stay on your own page** — do **not** propose tests for the global nav, footer, or cart drawer; the main agent owns those on the homepage. Only propose interactables your page type adds that aren't obviously identical to another type already covered.

## 3. Analyzer return shape

```json
{
  "entries": {
    "<slice_key>": {
      "url": "...", "breakpoint": "...", "check_type": "...",
      "checked": "what the artifacts show was exercised",
      "screenshot": "<file>.png",
      "findings": [ { "signature": "...", "severity": "...", "category": "...", "summary": "...", "detail": "...", "evidence": "<file>.png" } ]
    }
  },
  "needs_followup": [
    {
      "slice_key": "functional::https://site/products/x::desktop-1440",
      "reason": "page-specific interactable: variant selector + qty stepper + add-to-cart",
      "breakpoint": "desktop-1440",
      "action": "Select the 2-pack variant, set qty to 2, click add-to-cart, wait 3s",
      "expected": "cart item_count increases by 2 (verify via /cart.js), drawer opens with the right line",
      "capture": "console, network, /cart.js item_count, drawer state"
    }
  ]
}
```

`breakpoint` defaults to desktop; set it to `mobile-375` only when the element is mobile-specific. `expected` is what should happen, so the main agent can verify against a source of truth rather than eyeballing. Use the `agent` schema option (or a structured-output instruction) so analyzers return this exact shape.

## 4. Merge and escalate (main agent)

1. Merge every analyzer's `entries` into the run's `state.json`.
2. For each `needs_followup`: drive the browser to perform `action` and save the requested `capture`. **All Playwright output lands in `dump`** — use a clear relative filename, then **move it from `dump` into the run's `screenshots/` / `artifacts/` and clear `dump`**, exactly like the main capture phase. Then analyze the new evidence — inline, or by re-dispatching a fresh analyzer for that slice — and merge the resulting findings into the run state. (Analyzers never read `dump` or drive the browser; they only read the moved files.)
3. Stop after roughly 2 escalation rounds. The point is to dig into a real issue, not to loop indefinitely; if something still can't be resolved, record it as a finding noting the uncertainty.
4. **Run the global-component functional pass yourself** — nav on both desktop and mobile, footer, cart drawer — once on the homepage. Analyzers never propose these (they stay on their own page), so the main agent owns them regardless of mode.

Once the run `state.json` is complete, continue with the diff and report steps from SKILL.md exactly as in sequential mode.
