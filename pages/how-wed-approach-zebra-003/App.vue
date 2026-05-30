<script setup>
import { useDeckNav } from '@projects/PXL decks/shared/useDeckNav.js'
import DeckPage from '@projects/PXL decks/shared/DeckPage.vue'
import DeckSlide from '@projects/PXL decks/shared/DeckSlide.vue'
import HeadSplit from '@projects/PXL decks/shared/HeadSplit.vue'
import StatCards from '@projects/PXL decks/shared/StatCards.vue'
import Pillars from '@projects/PXL decks/shared/Pillars.vue'
import Rows from '@projects/PXL decks/shared/Rows.vue'
import NoteCards from '@projects/PXL decks/shared/NoteCards.vue'
import SkipCards from '@projects/PXL decks/shared/SkipCards.vue'
import Asks from '@projects/PXL decks/shared/Asks.vue'

useDeckNav()

const stats = [
  { label: '30-day conversion rate', stat: '5.9%', sub: 'Well above the personal care average. The site already works.' },
  { label: 'Revenue from subscription', stat: '25-30%', sub: 'Lower than it should be, and the biggest single lever on your customer economics.' },
  { feature: true, pill: 'The lever', label: 'Subscribe & save discount', stat: '10%', sub: `Lower than optimal. How and where it's framed matters more than the number itself.` },
]
const pillars = [
  { kicker: 'Pillar', badge: '01', title: 'Offer<br />architecture', sub: 'Define two or three offer structures and run them against each other.' },
  { kicker: 'Pillar', badge: '02', badgeY: true, title: 'Subscription<br />mechanics', sub: 'Make subscription the primary path, not a secondary toggle.' },
  { kicker: 'Pillar', badge: '03', title: 'Pages as<br />test beds', sub: 'Pressure-test on paid traffic before anything touches the core site.' },
  { kicker: 'Pillar', badge: '04', title: 'Product<br />messaging', sub: 'Each product needs its own reason to buy, past the ingredient list.' },
]
const lifts = [
  { n: '01', lead: true, title: 'Subscription as the default', desc: `Today it's a 10% subscribe and save, framed as a secondary toggle. Make it the primary path across product pages, checkout, and landing pages.` },
  { n: '02', title: 'Multi-unit bundles', desc: 'Two-packs and three-packs of the same product to raise average order value, framed around practicality and value, never urgency or scarcity.' },
  { n: '03', title: 'Incentives and bonus gifts', desc: 'A free mini or a bonus accessory that makes an offer feel generous without discounting the core product. Especially useful for subscription sign-ups.' },
  { n: '04', title: 'Rework the "Routine Builder" quiz', desc: 'A more persuasive flow with a thank-you page that builds a bundle from the results, plus new cold-traffic angles that earn the sale before recommending products.' },
  { n: '05', title: 'A testable offer system', desc: 'Two or three offer structures run against each other on landing pages, then graduated to the core site once they prove out.' },
]
const startNow = [
  { title: 'Ongoing landing pages', sub: 'Built to test new sections and offer mechanics, and to diversify the ad account with more relevant ad experiences.' },
  { title: 'A/B tests on product pages', sub: 'One or two at a time at current traffic. Subscription presentation, reasons to buy, and AOV levers like cart thresholds.' },
  { title: 'Stronger product messaging', sub: `Why this toothpaste over every other clean toothpaste, not just what's in it. It feeds ad creative too.` },
  { title: 'Merchandise the "Sets"', sub: '"The Ultimate Clean Routine" and "Hydration Set" sit as a subcategory. Make them a front door for new customers.' },
  { title: 'Free-shipping nudge', sub: 'A cart prompt toward the $60 threshold, something like "$8 away from free shipping", to lift orders already close.' },
]
const skip = [
  { title: 'Heavy, section-by-section CRO', sub: 'At 5.9%, the site already converts. Chasing marginal gains pulls focus from the AOV and subscription work that actually moves ad economics.' },
  { title: 'Exit-intent popups', sub: `They'd clash with your anti-marketing, transparency-first positioning, and annoy the audience you've built.` },
  { title: 'Personalisation engines', sub: `The catalog is focused enough that the complexity isn't justified yet. Better to nail the offer system first.` },
]
const asks = [
  'Subscription rate by product and by acquisition channel, to see where the drop-off is sharpest.',
  'AOV split: first-time versus returning, and one-off versus subscription orders.',
  'Which "Sets" and bundles are selling, and which aren\'t moving.',
  'Ad spend and channel mix, so landing page strategy matches the traffic.',
  'Subscribe and save economics, and room to test incentive formats.',
  'Quiz completion and conversion rates. Octane should have the drop-off data.',
]
</script>

<template>
  <DeckPage>
    <!-- 1 — cover -->
    <DeckSlide tone="dark" :n="1" :total="7" mid="New Business" right="How We'd Approach Zebra">
      <div class="eyebrow">
        <span class="y">Prepared for</span><br /><span class="l">// Yay Zebra · May 2026</span>
      </div>
      <h1 style="margin-top: 1.8cqw">How We'd Approach<br /><span class="accent">Zebra.</span></h1>
      <p class="lede" style="margin-top: 2cqw; max-width: 48cqw">
        Not a full proposal. More a shorthand of where we see the opportunity, what we'd want to
        explore together, and what we'd need from your side to do it properly.
      </p>
    </DeckSlide>

    <!-- 2 — the read -->
    <DeckSlide tone="light" :n="2" :total="7" right="How We'd Approach Zebra">
      <div class="eyebrow">01 — The opportunity</div>
      <HeadSplit
        style="margin-top: 1.3cqw"
        title="The read."
        lede="Zebra isn't a brand that needs help converting. A 5.9% conversion rate over the last 30 days is genuinely strong, especially in personal care. The constraint is what happens during and after the purchase: low average order value (AOV) and subscription sitting at 25-30% of revenue. Fix that, and you can spend more aggressively on ads without burning margin."
      />
      <StatCards :items="stats" />
    </DeckSlide>

    <!-- 3 — the approach -->
    <DeckSlide tone="light" :n="3" :total="7" right="How We'd Approach Zebra">
      <div class="eyebrow">02 — The approach</div>
      <HeadSplit
        style="margin-top: 1.3cqw"
        title="Where the work<br />actually is."
        lede="This isn't traditional, section-by-section conversion rate optimisation (CRO). It's offer architecture and subscription mechanics, with landing pages used as structured testing environments before anything rolls into the core site."
      />
      <Pillars :items="pillars" />
    </DeckSlide>

    <!-- 4 — operations-driven -->
    <DeckSlide tone="light" :n="4" :total="7" right="How We'd Approach Zebra" top>
      <div class="eyebrow">03 — Ideas · operations-driven</div>
      <HeadSplit
        style="margin-top: 1.3cqw"
        title="Bigger lifts."
        lede="Higher-impact moves that need a conversation with whoever owns operations, stock, and margin on your side."
      />
      <Rows :items="lifts" two />
    </DeckSlide>

    <!-- 5 — start now -->
    <DeckSlide tone="light" :n="5" :total="7" right="How We'd Approach Zebra">
      <div class="eyebrow">04 — Ideas · no ops change</div>
      <HeadSplit
        style="margin-top: 1.3cqw"
        title="Start now."
        lede="Moves we can run alongside, without changing how you operate. These are the ones that show value early."
      />
      <NoteCards :items="startNow" :cols="3" />
    </DeckSlide>

    <!-- 6 — skip -->
    <DeckSlide tone="light" :n="6" :total="7" right="How We'd Approach Zebra">
      <div class="eyebrow">05 — What we'd skip</div>
      <HeadSplit
        style="margin-top: 1.3cqw"
        title="What we'd skip."
        lede="Most agencies pitch everything. These three aren't worth your focus right now, and being honest about that is the point."
      />
      <SkipCards :items="skip" />
    </DeckSlide>

    <!-- 7 — what we'd need / close -->
    <DeckSlide tone="dark" :n="7" :total="7" mid="Contact" right="How We'd Approach Zebra">
      <div class="eyebrow"><span class="l">06 — What we'd need</span></div>
      <HeadSplit
        style="margin-top: 1.3cqw"
        title="What we'd need<br />from you."
        lede="To build a real three-month roadmap rather than guess, the Growth and CRO teams would want a conversation about the data below."
      />
      <Asks
        :items="asks"
        close-line="From there we can put together a proper roadmap with sequencing, ownership, and the bigger calls flagged. Happy to chat through any of this whenever works."
      />
    </DeckSlide>
  </DeckPage>
</template>
