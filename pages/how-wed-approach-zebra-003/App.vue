<script setup>
import ptLogo from '@projects/PXL decks/logo.svg?raw'
import '@projects/PXL decks/brand.css'
import '@projects/PXL decks/deck.css'
import { useDeckNav } from '@projects/PXL decks/shared/useDeckNav.js'

useDeckNav()
</script>

<template>
  <!-- Pixel Theory logo sprite (shared from the project) -->
  <div aria-hidden="true" v-html="ptLogo"></div>

  <!-- ================= SLIDE 1 — COVER ================= -->
  <section class="slide is-dark">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 01 / 07</div>
    </div>

    <div class="body">
      <div class="eyebrow"><span class="y">Prepared for</span><br /><span class="l">// Yay Zebra · May 2026</span></div>
      <h1 style="margin-top: 1.8cqw">How We'd Approach<br /><span class="accent">Zebra.</span></h1>
      <p class="lede" style="margin-top: 2cqw; max-width: 48cqw">Not a full proposal. More a shorthand of where we see the opportunity, what we'd want to explore together, and what we'd need from your side to do it properly.</p>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span>New Business</span><span>How We'd Approach Zebra</span></div>
  </section>

  <!-- ================= SLIDE 2 — THE READ ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 02 / 07</div>
    </div>

    <div class="body">
      <div class="eyebrow">01 — The opportunity</div>
      <div class="head-split" style="margin-top: 1.3cqw">
        <h2>The read.</h2>
        <p class="lede">Zebra isn't a brand that needs help converting. A 5.9% conversion rate over the last 30 days is genuinely strong, especially in personal care. The constraint is what happens during and after the purchase: low average order value (AOV) and subscription sitting at 25-30% of revenue. Fix that, and you can spend more aggressively on ads without burning margin.</p>
      </div>

      <div class="cards c3">
        <div class="card">
          <div class="clabel">30-day conversion rate</div>
          <div class="stat">5.9%</div>
          <div class="divider"></div>
          <div class="csub">Well above the personal care average. The site already works.</div>
        </div>
        <div class="card">
          <div class="clabel">Revenue from subscription</div>
          <div class="stat">25-30%</div>
          <div class="divider"></div>
          <div class="csub">Lower than it should be, and the biggest single lever on your customer economics.</div>
        </div>
        <div class="card feature">
          <span class="pill"><span class="dot"></span>The lever</span>
          <div class="clabel">Subscribe &amp; save discount</div>
          <div class="stat">10%</div>
          <div class="divider"></div>
          <div class="csub">Lower than optimal. How and where it's framed matters more than the number itself.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Zebra</span></div>
  </section>

  <!-- ================= SLIDE 3 — THE APPROACH ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 03 / 07</div>
    </div>

    <div class="body">
      <div class="eyebrow">02 — The approach</div>
      <div class="head-split" style="margin-top: 1.3cqw">
        <h2>Where the work<br />actually is.</h2>
        <p class="lede">This isn't traditional, section-by-section conversion rate optimisation (CRO). It's offer architecture and subscription mechanics, with landing pages used as structured testing environments before anything rolls into the core site.</p>
      </div>

      <div class="cards c4">
        <div class="card num-card">
          <div class="top"><span class="kicker">Pillar</span><span class="badge">01</span></div>
          <div class="ct">Offer<br />architecture</div>
          <div class="csub">Define two or three offer structures and run them against each other.</div>
        </div>
        <div class="card num-card">
          <div class="top"><span class="kicker">Pillar</span><span class="badge y">02</span></div>
          <div class="ct">Subscription<br />mechanics</div>
          <div class="csub">Make subscription the primary path, not a secondary toggle.</div>
        </div>
        <div class="card num-card">
          <div class="top"><span class="kicker">Pillar</span><span class="badge">03</span></div>
          <div class="ct">Pages as<br />test beds</div>
          <div class="csub">Pressure-test on paid traffic before anything touches the core site.</div>
        </div>
        <div class="card num-card">
          <div class="top"><span class="kicker">Pillar</span><span class="badge">04</span></div>
          <div class="ct">Product<br />messaging</div>
          <div class="csub">Each product needs its own reason to buy, past the ingredient list.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Zebra</span></div>
  </section>

  <!-- ================= SLIDE 4 — OPERATIONS-DRIVEN ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 04 / 07</div>
    </div>

    <div class="body top">
      <div class="eyebrow">03 — Ideas · operations-driven</div>
      <div class="head-split" style="margin-top: 1.3cqw">
        <h2>Bigger lifts.</h2>
        <p class="lede">Higher-impact moves that need a conversation with whoever owns operations, stock, and margin on your side.</p>
      </div>

      <div class="rows two">
        <div class="row lead">
          <div class="rn">01</div>
          <div><div class="rt">Subscription as the default</div><div class="rd">Today it's a 10% subscribe and save, framed as a secondary toggle. Make it the primary path across product pages, checkout, and landing pages.</div></div>
        </div>
        <div class="row">
          <div class="rn">02</div>
          <div><div class="rt">Multi-unit bundles</div><div class="rd">Two-packs and three-packs of the same product to raise average order value, framed around practicality and value, never urgency or scarcity.</div></div>
        </div>
        <div class="row">
          <div class="rn">03</div>
          <div><div class="rt">Incentives and bonus gifts</div><div class="rd">A free mini or a bonus accessory that makes an offer feel generous without discounting the core product. Especially useful for subscription sign-ups.</div></div>
        </div>
        <div class="row">
          <div class="rn">04</div>
          <div><div class="rt">Rework the "Routine Builder" quiz</div><div class="rd">A more persuasive flow with a thank-you page that builds a bundle from the results, plus new cold-traffic angles that earn the sale before recommending products.</div></div>
        </div>
        <div class="row">
          <div class="rn">05</div>
          <div><div class="rt">A testable offer system</div><div class="rd">Two or three offer structures run against each other on landing pages, then graduated to the core site once they prove out.</div></div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Zebra</span></div>
  </section>

  <!-- ================= SLIDE 5 — TAG-ON ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 05 / 07</div>
    </div>

    <div class="body">
      <div class="eyebrow">04 — Ideas · no ops change</div>
      <div class="head-split" style="margin-top: 1.3cqw">
        <h2>Start now.</h2>
        <p class="lede">Moves we can run alongside, without changing how you operate. These are the ones that show value early.</p>
      </div>

      <div class="cards c3">
        <div class="card">
          <div class="ct" style="font-family: var(--display); font-weight: 600; font-size: 1.85cqw; line-height: 1.08; margin-bottom: 0.8cqw">Ongoing landing pages</div>
          <div class="csub" style="margin-top: 0">Built to test new sections and offer mechanics, and to diversify the ad account with more relevant ad experiences.</div>
        </div>
        <div class="card">
          <div class="ct" style="font-family: var(--display); font-weight: 600; font-size: 1.85cqw; line-height: 1.08; margin-bottom: 0.8cqw">A/B tests on product pages</div>
          <div class="csub" style="margin-top: 0">One or two at a time at current traffic. Subscription presentation, reasons to buy, and AOV levers like cart thresholds.</div>
        </div>
        <div class="card">
          <div class="ct" style="font-family: var(--display); font-weight: 600; font-size: 1.85cqw; line-height: 1.08; margin-bottom: 0.8cqw">Stronger product messaging</div>
          <div class="csub" style="margin-top: 0">Why this toothpaste over every other clean toothpaste, not just what's in it. It feeds ad creative too.</div>
        </div>
        <div class="card">
          <div class="ct" style="font-family: var(--display); font-weight: 600; font-size: 1.85cqw; line-height: 1.08; margin-bottom: 0.8cqw">Merchandise the "Sets"</div>
          <div class="csub" style="margin-top: 0">"The Ultimate Clean Routine" and "Hydration Set" sit as a subcategory. Make them a front door for new customers.</div>
        </div>
        <div class="card">
          <div class="ct" style="font-family: var(--display); font-weight: 600; font-size: 1.85cqw; line-height: 1.08; margin-bottom: 0.8cqw">Free-shipping nudge</div>
          <div class="csub" style="margin-top: 0">A cart prompt toward the $60 threshold, something like "$8 away from free shipping", to lift orders already close.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Zebra</span></div>
  </section>

  <!-- ================= SLIDE 6 — SKIP ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 06 / 07</div>
    </div>

    <div class="body">
      <div class="eyebrow">05 — What we'd skip</div>
      <div class="head-split" style="margin-top: 1.3cqw">
        <h2>What we'd skip.</h2>
        <p class="lede">Most agencies pitch everything. These three aren't worth your focus right now, and being honest about that is the point.</p>
      </div>

      <div class="cards c3">
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">Heavy, section-by-section CRO</div>
          <div class="csub">At 5.9%, the site already converts. Chasing marginal gains pulls focus from the AOV and subscription work that actually moves ad economics.</div>
        </div>
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">Exit-intent popups</div>
          <div class="csub">They'd clash with your anti-marketing, transparency-first positioning, and annoy the audience you've built.</div>
        </div>
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">Personalisation engines</div>
          <div class="csub">The catalog is focused enough that the complexity isn't justified yet. Better to nail the offer system first.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Zebra</span></div>
  </section>

  <!-- ================= SLIDE 7 — WHAT WE'D NEED / CLOSE ================= -->
  <section class="slide is-dark">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 07 / 07</div>
    </div>

    <div class="body">
      <div class="eyebrow"><span class="l">06 — What we'd need</span></div>
      <div class="head-split" style="margin-top: 1.3cqw">
        <h2>What we'd need<br />from you.</h2>
        <p class="lede">To build a real three-month roadmap rather than guess, the Growth and CRO teams would want a conversation about the data below.</p>
      </div>

      <div class="asks">
        <div class="ask"><div class="an">1</div><div class="ad">Subscription rate by product and by acquisition channel, to see where the drop-off is sharpest.</div></div>
        <div class="ask"><div class="an">2</div><div class="ad">AOV split: first-time versus returning, and one-off versus subscription orders.</div></div>
        <div class="ask"><div class="an">3</div><div class="ad">Which "Sets" and bundles are selling, and which aren't moving.</div></div>
        <div class="ask"><div class="an">4</div><div class="ad">Ad spend and channel mix, so landing page strategy matches the traffic.</div></div>
        <div class="ask"><div class="an">5</div><div class="ad">Subscribe and save economics, and room to test incentive formats.</div></div>
        <div class="ask"><div class="an">6</div><div class="ad">Quiz completion and conversion rates. Octane should have the drop-off data.</div></div>
      </div>

      <p class="close-line">From there we can put together a proper roadmap with sequencing, ownership, and the bigger calls flagged. Happy to chat through any of this whenever works.</p>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span>Contact</span><span>How We'd Approach Zebra</span></div>
  </section>
</template>

