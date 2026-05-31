# QA — trykepos — client snag list verification

- **When:** 2026-05-31
- **Source:** "Internal kēpos QA.docx" — 14 client-flagged items, several with the dev team's own reply notes.
- **Method:** verified each snag against the live site (DOM inspection + full-page screenshots, desktop & mobile), compared against the doc's reference images.
- **Served from:** public site (Shopify, KeposTheme), US/USD.
- **Important caveat:** the **welcome-offer / 47% discount** is applied by the theme's real Add-to-Cart/checkout flow, which couldn't be triggered headlessly. I verified the cart's *base* prices via the AJAX cart API (OTP $89.99 / $0 off; S&S $76.49 / 15% off) but **could not reproduce the welcome-offer stacking**, so snags #4 and #5 are **not conclusively settled** here — they need a real shopper click-through. The detailed $56.11 / −$67.76 figures in the client doc are the *client's* evidence, not my live findings.

## Status key
✅ Verified done · ❌ Verified not done · 🟡 Partial · ⚪ Decision (not a defect) · ⏳ Not verified this session

| # | Page | Snag | Status |
|---|------|------|--------|
| 1 | Footer | Add Terms of Service | ✅ Done |
| 2 | Nav | Add Shop/Products to nav | ✅ Done |
| 3 | Home | Add scoop to homepage floater | ⏳ Not confirmed |
| 4 | PDP/Cart | OTP→S&S not giving full 47% off | ⏳ Not verified (needs cart check) |
| 5 | Cart | Up-sells; cap welcome offer to 1 jar | ⏳ Not verified (needs cart check) |
| 6 | Home | Review carousel (drag/pause/AI images) | 🟡 Partial — images still generic |
| 7 | Proof | Odd spacing on study spots (desktop) | ⏳ Low-confidence |
| 8 | Proof | Blue highlight scroll broken on mobile | ⏳ Needs older-iOS device |
| 9 | About | Replace Catalina & Oliver w/ UChicago image | ✅ Done |
| 10 | About | Remove layered-in citation | ✅ Appears done |
| 11 | About | "Only energy and bloating?" | ⚪ Decision needed |
| 12 | About | Image blurry / too cropped | ⏳ Not confirmed |
| 13 | About | Image squished/skewed | ✅ Appears addressed |
| 14 | Benefits | No bold in hero + light/cream theme | ❌ Not done |

## Detail

**1. Terms of Service — ✅** Footer now lists Shipping Policy, Return Policy, Privacy Policy, **Terms of Service** (`/policies/terms-of-service`). The doc's reference footer had no Terms. (DOM + footer screenshot.)

**2. Shop in nav — ✅** Header now has **Shop** → `/products/human-milk-bioactives`, alongside Benefits, Proof, About, FAQ, Reviews. PDP reachable without "Start Now". (DOM + screenshots.)

**3. Scoop on homepage floater — ⏳** Team note: "Added the scoop, removed the dupe on the next section." Couldn't pixel-confirm from the full-page capture. Needs a quick designer glance.

**4. OTP → full 47% off — ⏳ STILL NOT CONFIRMED (partial live data).** I drove the live cart via the AJAX cart API. Base results: **OTP = $89.99 with $0 discount** (×1 and ×2 — no automatic discount on the one-time path), **S&S = $76.49** (the 15% subscription discount, confirmed on the live `/cart` page as "15% Subscription discount −$13.50"). Crucially, the **"Exclusive welcome offer" never appeared** in my cart — that 47% piece is applied by the theme's real Add-to-Cart/checkout flow (a discount code/link), which I couldn't trigger programmatically. So the stacking the client flagged (OTP landing at $56.11 while still saying "You've saved $47!") is **neither confirmed nor cleared** here. What the base data *does* show: the welcome discount is not an automatic discount, so the client's concern — that sunsetting the 15% will break the pieced-together 47% — is structurally still live. **Action: real shopper flow (click the actual ATC, proceed toward checkout) to confirm the OTP total and the "saved $47" label.**

**5. Cart up-sells & welcome-offer cap — ⏳ NOT CONFIRMED.** At OTP ×2 the base cart was a clean $179.98 (no welcome offer applied in my programmatic cart, so I couldn't observe whether it doubles as the client showed). No up-sell modules (1→3 / 3→6 month) rendered in my AJAX cart view, but that view isn't the real cart drawer. Doc marks this "TODO". **Action: verify the up-sell modules and the qty≥2 welcome-offer behaviour in the live cart drawer via the real ATC.**

**6. Review carousel — 🟡 PARTIAL.** Team: "Added drag support, disabled pausing. Images still need changing." On the live homepage the carousel still shows **generic product shots** (image swap is the outstanding piece the team already flagged). Drag/no-pause behaviour and true mobile-swipe weren't re-verified interactively this session. Also applies to the Gut Aging LP.

**7. Proof study-spot spacing (desktop) — ⏳** Team added forced wrapping. Live desktop "01 Bloating / 02 Gut Barrier / 03 Microbiome" stats look consistent, but low confidence — worth a designer glance.

**8. Proof blue-highlight scroll on mobile — ⏳** Team added a JS fallback for pre-iOS 26 (native effect needs iOS 26+). Needs a real older-iOS device to confirm — not judgeable from a screenshot.

**9. Catalina & Oliver → UChicago image — ✅** About hero now shows a greyscale **University of Chicago building** with "In partnership with University of Chicago". The two-people photo from the doc reference is gone.

**10. Remove layered-in citation — ✅ (appears)** No "Palsson et al. 2020 / 12-wk IBS trial" citation text or overlay found on the live About page. If any was baked into an image, a close designer check confirms, but nothing is visible now.

**11. "Only energy and bloating?" — ⚪ DECISION.** Review filters still show a limited set (Energy/Bloating-type tabs). This was a client *question*, not a defect — needs a call on whether it's intentional.

**12. About image blurry / too cropped — ⏳** Couldn't positively identify the specific tightly-cropped close-up live (there is a `Close-up_Hand___Jar` image present). Needs a designer eyeball vs the reference.

**13. About image squished/skewed — ✅ (appears addressed)** Team tweaked it + changed the mobile breakpoint. Live About images use `object-fit: cover` (they crop, they don't distort), so no skewing is visible. Team's own follow-up still stands: trim the copy length on the content side so it doesn't stretch the image tall.

**14. Benefits hero — ❌ NOT DONE.** Hero ("Built for guts that have tried everything") is **still dark-themed** and **"tried everything" is still bold**. Neither requested change (remove bold; switch to light/cream theme) is applied. (Live screenshot.)

## Evidence
`screenshots/`: live home, about, proof, benefits, pdp (desktop+mobile). `doc-reference/`: the 14 client reference images extracted from the docx.

## Honest gaps to close (next session)
- Manually drive the **cart** to settle #4 and #5 (the two commercial items).
- Interactive **mobile swipe** test of the review carousel (#6).
- Designer eyeball for #3, #7, #12 (pixel-level visual calls).
- Older-iOS device for #8.
