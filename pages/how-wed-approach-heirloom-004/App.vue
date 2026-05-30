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
      <h1>How We'd Approach<br /><span class="accent">Heirloom Coffee.</span></h1>
      <p class="lede" style="margin-top: 2cqw; max-width: 50cqw">Not a full proposal. A short read on how we'd work with you: what we see on the site today, where the growth actually is, the moves we'd test first, and the data we'd pull together to get going.</p>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span>New Business</span><span>How We'd Approach Heirloom</span></div>
  </section>

  <!-- ================= SLIDE 2 — THE READ ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 02 / 07</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>What we see.</h2>
        <p class="lede">Heirloom isn't a brand that needs help refining its story. The "Clean Craft" methodology, "Regenerative Organic Certified" sourcing, and 900+ reviews say the fundamentals are in good shape. The constraint is what happens after the landing: the site works as a catalog, not a funnel. Average order value (AOV) and lifetime value (LTV) are where the real scale is.</p>
      </div>

      <div class="cards c3">
        <div class="card">
          <div class="clabel">Five-star-led reviews</div>
          <div class="stat">900+</div>
          <div class="divider"></div>
          <div class="csub">People saying they've never tasted anything like it. The brand fundamentals are solid.</div>
        </div>
        <div class="card">
          <div class="clabel">Subscription on your Sets</div>
          <div class="stat">0</div>
          <div class="divider"></div>
          <div class="csub">"Bold Roast Set" and "Most Popular Set" have no subscribe option. The biggest single gap for a consumable.</div>
        </div>
        <div class="card feature">
          <span class="pill"><span class="dot"></span>The lever</span>
          <div class="clabel">Loyalty member LTV</div>
          <div class="stat">+30%</div>
          <div class="divider"></div>
          <div class="csub">Members consistently carry higher lifetime value. Get people in early and the whole customer curve shifts.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Heirloom</span></div>
  </section>

  <!-- ================= SLIDE 3 — THE APPROACH ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 03 / 07</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>Where we'd focus.</h2>
        <p class="lede">This isn't surface-level, section-by-section conversion lifts. It's funnel and offer architecture, built natively in Shopify Liquid, modular in the backend, with no headless rebuild.</p>
      </div>

      <div class="cards c4">
        <div class="card num-card">
          <div class="top"><span class="badge">01</span></div>
          <div class="ct">Guided<br />selling</div>
          <div class="csub">New visitors get a path, not a catalog. A quiz and starter kits do the steering.</div>
        </div>
        <div class="card num-card">
          <div class="top"><span class="badge y">02</span></div>
          <div class="ct">Bundles &amp;<br />starter kits</div>
          <div class="csub">A proper bundle and starter-kit system, sized to raise AOV from the first order.</div>
        </div>
        <div class="card num-card">
          <div class="top"><span class="badge">03</span></div>
          <div class="ct">Multi-unit<br />pricing</div>
          <div class="csub">Quantity breaks that make a single bag visibly the worst deal on the site.</div>
        </div>
        <div class="card num-card">
          <div class="top"><span class="badge y">04</span></div>
          <div class="ct">Subscription<br />reframed</div>
          <div class="csub">The obvious choice at every purchase touchpoint, not a checkout afterthought.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Heirloom</span></div>
  </section>

  <!-- ================= SLIDE 4 — OPERATIONS-DRIVEN ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 04 / 07</div>
    </div>

    <div class="body top">
      <div class="head-split">
        <h2>Bigger lifts.</h2>
        <p class="lede">Higher-impact moves that need a conversation with whoever owns operations, stock, and margin on your side.</p>
      </div>

      <div class="rows two">
        <div class="row">
          <div class="rn">01</div>
          <div><div class="rt">"Passport Rewards" as the front door</div><div class="rd">Make it the primary entry to the brand, not a loyalty afterthought. New customers join on day one for member pricing and early releases. Members carry ~30% higher LTV.</div></div>
        </div>
        <div class="row">
          <div class="rn">02</div>
          <div><div class="rt">Reframe subscription site-wide</div><div class="rd">Not a checkbox and a disclosure. The smarter way to buy coffee: always fresh, always stocked, always cheaper, with Passport perks every few deliveries.</div></div>
        </div>
        <div class="row">
          <div class="rn">03</div>
          <div><div class="rt">Subscriptions on every coffee</div><div class="rd">Especially the "Bold Roast Set" and "Most Popular Set", which have no subscribe option today. The biggest gap for a product with a natural repurchase cycle.</div></div>
        </div>
        <div class="row">
          <div class="rn">04</div>
          <div><div class="rt">A "Heirloom Starter Kit"</div><div class="rd">Two or three best-sellers at a meaningful discount, subscribe baked in, gear on the first order. A low-risk way in that sets a high AOV from day one.</div></div>
        </div>
        <div class="row">
          <div class="rn">05</div>
          <div><div class="rt">A tiered bundle system</div><div class="rd">Pick 3, 6 or 9 bags with escalating discounts and free shipping at the top tier. Stack subscription on volume so both incentives compound.</div></div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Heirloom</span></div>
  </section>

  <!-- ================= SLIDE 5 — TAG-ON ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 05 / 07</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>Start now.</h2>
        <p class="lede">Moves we can run alongside, without changing how you operate. These are the ones that show value early.</p>
      </div>

      <div class="cards c4">
        <div class="card note">
          <div class="ct">Landing page testing programme</div>
          <div class="csub">Pages built around specific hypotheses from the site and ad accounts. What converts there gets tested on-site. The two feed each other.</div>
        </div>
        <div class="card note">
          <div class="ct">A coffee quiz funnel</div>
          <div class="csub">Four or five questions on brew method, taste and volume, ending in a personalised starter kit with subscription pre-selected. On-site and as a landing page.</div>
        </div>
        <div class="card note">
          <div class="ct">Quantity breaks on product pages</div>
          <div class="csub">Make a single bag visibly the worst deal. Four bags on subscription should show the saving right at the point of choice.</div>
        </div>
        <div class="card note">
          <div class="ct">"Notify me" on sold-out gear</div>
          <div class="csub">Replace dead ends on products like the "Atmos Vacuum Storage Canister" and "Fellow Tally Pro Scale" with email capture.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Heirloom</span></div>
  </section>

  <!-- ================= SLIDE 6 — SKIP ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 06 / 07</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>What we'd skip.</h2>
        <p class="lede">Most agencies pitch everything. These three aren't worth your focus yet, and being honest about that is the point.</p>
      </div>

      <div class="cards c3">
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">A headless replatform</div>
          <div class="csub">The wins here are offer and funnel architecture, all native to Shopify Liquid. A headless rebuild adds cost and risk without moving AOV or LTV.</div>
        </div>
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">Chasing cheaper acquisition</div>
          <div class="csub">At higher spend, cost to acquire only climbs. The profitable path is making each customer worth more, not finding each one cheaper.</div>
        </div>
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">A/B tests on low-traffic pages</div>
          <div class="csub">Most split tests won't reach significance on-site. That's exactly why the landing page programme matters: a controlled place to test faster.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Heirloom</span></div>
  </section>

  <!-- ================= SLIDE 7 — WHAT WE'D NEED / CLOSE ================= -->
  <section class="slide is-dark">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 07 / 07</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>What we'd need<br />from you.</h2>
        <p class="lede">Since we're already working together, the next step is a session with your growth team to pull the data that shapes the roadmap. These are the inputs we'd need them to share.</p>
      </div>

      <div class="asks">
        <div class="ask"><div class="an">1</div><div class="ad">P&amp;L, COGS and shipping costs, so we can map AOV and subscription targets to real margin.</div></div>
        <div class="ask"><div class="an">2</div><div class="ad">Current subscription rate and subscriber data: churn, shipments before cancel, and upgrade behaviour.</div></div>
        <div class="ask"><div class="an">3</div><div class="ad">Cohort data, a Lifetimely export or equivalent, especially revenue retention by acquisition month.</div></div>
        <div class="ask"><div class="an">4</div><div class="ad">"Passport Rewards" data: enrollment rate, member versus non-member behaviour, and points redemption.</div></div>
        <div class="ask"><div class="an">5</div><div class="ad">Shopify admin access, to audit the selling-plan setup and build subscription, kits and bundles natively.</div></div>
        <div class="ask"><div class="an">6</div><div class="ad">Paid traffic split and landing page destinations, plus time with whoever owns fulfillment.</div></div>
      </div>

      <p class="close-line">From there we can put together a proper roadmap with sequencing, ownership, and the bigger calls flagged honestly. Happy to chat through any of this whenever works.</p>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span>Contact</span><span>How We'd Approach Heirloom</span></div>
  </section>
</template>

<style>
/* Heirloom-only: idea "note" cards */
.card.note .ct {
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.85cqw;
  line-height: 1.08;
  margin-bottom: 0.8cqw;
}
.card.note .csub {
  margin-top: 0;
}
</style>
