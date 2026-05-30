<script setup>
import ptLogo from '@projects/PXL decks/logo.svg?raw'
import '@projects/PXL decks/brand.css'
import '@projects/PXL decks/deck.css'
import { useDeckNav } from '@projects/PXL decks/shared/useDeckNav.js'
import ashPhoto from '@projects/PXL decks/assets/team/ash.webp'
import lucasPhoto from '@projects/PXL decks/assets/team/lucas.webp'
import ewanPhoto from '@projects/PXL decks/assets/team/ewan.webp'
import ashtonPhoto from '@projects/PXL decks/assets/team/ashton.webp'

useDeckNav()
</script>

<template>
  <!-- Pixel Theory logo sprite (shared from the project) -->
  <div aria-hidden="true" v-html="ptLogo"></div>

  <!-- ================= SLIDE 1 — COVER ================= -->
  <section class="slide is-dark">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 01 / 08</div>
    </div>

    <div class="body">
      <h1>Green Garden<br /><span class="accent">Statement of Work.</span></h1>
      <p class="lede" style="margin-top: 2cqw; max-width: 52cqw">This scopes the post-click build we'd bolt onto the growth work we already run for Green Garden. Scope, timeline and numbers are below, so flag anything you want adjusted.</p>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span>Post-Click expansion</span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 2 — THE SETUP ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 02 / 08</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>The setup.</h2>
        <p class="lede">You already know us — we run Green Garden's growth. This bolts our post-click squad onto that engagement: a fixed-window SWAT build that owns everything after the click. Two custom builds, Ferry Morse (US) and McKenzie Seeds (Canada), share one system but are each shaped by their own research.</p>
      </div>

      <div class="cards c3">
        <div class="card">
          <div class="clabel">Onboarding sprint</div>
          <div class="stat">4–6 wks</div>
          <div class="divider"></div>
          <div class="csub">Customer surveys, on-site analysis and message mining across both markets, feeding the UI kits the entire build runs on.</div>
        </div>
        <div class="card">
          <div class="clabel">Execution window</div>
          <div class="stat">3 mo</div>
          <div class="divider"></div>
          <div class="csub">Nav and cart, three landing pages with reusable meta objects, and the quiz funnel — built custom for each brand off the research.</div>
        </div>
        <div class="card feature">
          <span class="pill"><span class="dot"></span>End to end</span>
          <div class="clabel">Total engagement</div>
          <div class="stat">4–4.5 mo</div>
          <div class="divider"></div>
          <div class="csub">Onboarding plus execution, end to end — two bespoke builds, every asset yours to keep and scale.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 3 — WHAT YOU GET ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 03 / 08</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>What you get.</h2>
        <p class="lede">Four deliverables on the post-click side, each built to be reused and scaled by your team without dev support.</p>
      </div>

      <div class="cards c4">
        <div class="card num-card">
          <div class="top"><span class="badge">01</span></div>
          <div class="ct">Nav + cart<br />overhaul</div>
          <ul class="feats">
            <li>Guided selling paths for undecided shoppers</li>
            <li>Cart rebuilt with merchandising and recommendations</li>
            <li>Engineered to lift average order value (AOV)</li>
          </ul>
        </div>
        <div class="card num-card">
          <div class="top"><span class="badge y">02</span></div>
          <div class="ct">Three<br />landing pages</div>
          <ul class="feats">
            <li>Video sales letter, long-form letter, product page</li>
            <li>Each a standalone landing page</li>
            <li>Plus a reusable meta object, no dev needed</li>
          </ul>
        </div>
        <div class="card num-card">
          <div class="top"><span class="badge">03</span></div>
          <div class="ct">15–20 modular<br />blocks</div>
          <ul class="feats">
            <li>Reusable section blocks across the pages</li>
            <li>Recombine across the site, never one layout</li>
            <li>Built natively in Shopify Liquid</li>
          </ul>
        </div>
        <div class="card num-card">
          <div class="top"><span class="badge y">04</span></div>
          <div class="ct">Custom quiz<br />funnel</div>
          <ul class="feats">
            <li>Built from scratch for your catalog, not a template</li>
            <li>Bespoke logic and a fully custom tech stack</li>
            <li>Personalised bundle output, plus a fresh lead magnet</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 4 — WHAT WE'RE NOT DOING ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 04 / 08</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>What we're not doing.</h2>
        <p class="lede">A few things deliberately out of scope, so the boundaries are clear from day one.</p>
      </div>

      <div class="cards c3">
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">Asset generation</div>
          <div class="csub">We brief your illustrators and graphic designers, but the visual production itself lands on your side, not ours.</div>
        </div>
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">Paid media</div>
          <div class="csub">Already owned by your Pixel Theory growth team. They run the traffic and spend, and this squad owns the rest.</div>
        </div>
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">Brand identity</div>
          <div class="csub">No logo or rebrand work. We design within your existing brand and sharpen it, rather than replace it.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 5 — TIMELINE ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 05 / 08</div>
    </div>

    <div class="body top">
      <div class="head-split">
        <h2>The timeline.</h2>
        <p class="lede">Two phases across roughly four to four and a half months, both brands built custom off the research.</p>
      </div>

      <div class="rows">
        <div class="row">
          <div class="rn">01</div>
          <div><div class="rt">Onboarding · 4–6 weeks</div><div class="rd">Customer surveys, on-site analysis and message mining across both markets, building on what the growth side already knows about your buyers. We set the UI kits the whole build runs on, and it's this research that makes each build its own rather than a copy.</div></div>
        </div>
        <div class="row">
          <div class="rn">02</div>
          <div><div class="rt">Execution · 3 months</div><div class="rd">Navigation and cart, three landing pages with their meta object versions, and the quiz funnel with its lead magnet — built as two custom storefronts, Ferry Morse and McKenzie Seeds, each tuned to its own research.</div></div>
        </div>
        <div class="row">
          <div class="rn">03</div>
          <div><div class="rt">End to end · 4–4.5 months</div><div class="rd">From kickoff to two finished builds, you keep every asset created along the way — yours to reuse and scale.</div></div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 6 — INVESTMENT ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 06 / 08</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>The investment.</h2>
        <p class="lede">A flat monthly rate across the engagement window. No retainer tail, no surprises.</p>
      </div>

      <div class="cards c3">
        <div class="card">
          <div class="clabel">Both brands covered</div>
          <div class="stat">2</div>
          <div class="divider"></div>
          <div class="csub">Ferry Morse and McKenzie Seeds, one engagement, one rate.</div>
        </div>
        <div class="card">
          <div class="clabel">Billing window</div>
          <div class="stat">4 mo</div>
          <div class="divider"></div>
          <div class="csub">The window the flat rate applies across.</div>
        </div>
        <div class="card feature">
          <span class="pill"><span class="dot"></span>Monthly</span>
          <div class="clabel">Flat monthly rate</div>
          <div class="stat">$8,000</div>
          <div class="divider"></div>
          <div class="csub">Covers the post-click squad and every deliverable, billed monthly alongside your growth retainer.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 7 — WHO'S IN THE ROOM ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 07 / 08</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>Who's in the room.</h2>
        <p class="lede">Your post-click squad at Pixel Theory — the same shop already running Green Garden's growth. Senior, lean, and hands-on across the build.</p>
      </div>

      <div class="cards c4">
        <div class="card note">
          <img class="team-photo" :src="ashPhoto" alt="Ash" />
          <div class="ct">Ash</div>
          <div class="crole">Post-Click</div>
          <div class="csub">Runs the program end to end and holds quality at every touchpoint, and is your first port of call.</div>
        </div>
        <div class="card note">
          <img class="team-photo" :src="lucasPhoto" alt="Lucas Mondora" />
          <div class="ct">Lucas Mondora</div>
          <div class="crole">Strategy</div>
          <div class="csub">Owns the roadmap and testing prioritisation, with full autonomy over what we run and in what order.</div>
        </div>
        <div class="card note">
          <img class="team-photo" :src="ewanPhoto" alt="Ewan Howell" />
          <div class="ct">Ewan Howell</div>
          <div class="crole">Technical</div>
          <div class="csub">Owns all technical implementation across both brands. Anything technical routes straight through him.</div>
        </div>
        <div class="card note">
          <img class="team-photo" :src="ashtonPhoto" alt="Ashton Dunn" />
          <div class="ct">Ashton Dunn</div>
          <div class="crole">Design</div>
          <div class="csub">Works hand in hand with Ash on design, carrying the visual system across every page and every block.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 8 — WHAT WE NEED / NEXT STEPS ================= -->
  <section class="slide is-dark">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 08 / 08</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>What we'd need<br />from you.</h2>
        <p class="lede">A few inputs from your side to keep onboarding on schedule.</p>
      </div>

      <div class="asks">
        <div class="ask"><div class="an">1</div><div class="ad">A point of contact for research access.</div></div>
        <div class="ask"><div class="an">2</div><div class="ad">Any brand assets we don't already hold from the growth side: fonts, UI patterns, any existing style guide for both brands.</div></div>
        <div class="ask"><div class="an">3</div><div class="ad">Access to your designer and illustrator for asset briefs.</div></div>
        <div class="ask"><div class="an">4</div><div class="ad">A bi-weekly 30-minute check-in slot during execution.</div></div>
      </div>

      <p class="close-line">Next: you review this and flag anything to adjust, we turn it into a signable SOW, and onboarding kicks off.</p>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span>Next steps</span><span>Green Garden · SOW</span></div>
  </section>
</template>

<style>
/* Green Garden-only: team "note" cards, ticked feature lists, tighter num-card */
.card.note .team-photo {
  width: 5.4cqw;
  height: 5.4cqw;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.4cqw;
  background: var(--line-l);
  border: 1px solid var(--line-l);
}
.card.note .ct {
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.7cqw;
  line-height: 1.06;
  margin-bottom: 0.35cqw;
  white-space: nowrap;
}
.card.note .crole {
  font-family: var(--mono);
  font-size: 0.9cqw;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mut-l);
  margin-bottom: 0.85cqw;
  white-space: nowrap;
}
.card.note .csub {
  margin-top: 0;
}
.feats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.95cqw;
}
.feats li {
  position: relative;
  padding-left: 2cqw;
  font-size: 1.12cqw;
  line-height: 1.34;
  color: var(--body-l);
}
.feats li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--ink);
  font-weight: 700;
  font-size: 1.12cqw;
}
.cards .num-card .top {
  margin-bottom: 1.6cqw;
}
</style>
