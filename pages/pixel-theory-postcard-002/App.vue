<script setup>
import { ref } from 'vue'

const flipped = ref(false)
</script>

<template>
  <main class="scene">
    <div class="postcard" :class="{ flipped }" @click="flipped = !flipped">
      <!-- FRONT -->
      <section class="face front">
        <div class="sky">
          <span class="cloud cloud-a"></span>
          <span class="cloud cloud-b"></span>
          <span class="sun"></span>
        </div>
        <div class="ground">
          <span class="heart"></span>
        </div>
        <h1 class="headline">
          <span class="line">I</span>
          <span class="line big">&hearts;</span>
          <span class="line">PIXEL</span>
          <span class="line">THEORY</span>
        </h1>
        <p class="stamp-note">tap to flip ✦</p>
      </section>

      <!-- BACK -->
      <section class="face back">
        <div class="back-grid">
          <div class="message">
            <p>Dear friend,</p>
            <p>Greetings from the land of tiny squares. Every pixel here believes in something bigger than itself.</p>
            <p>Wish you were here.</p>
            <p class="sign">— with love, a single pixel</p>
          </div>
          <div class="address">
            <span class="stamp">
              <span class="stamp-heart">&hearts;</span>
              <span class="stamp-txt">PXL</span>
            </span>
            <span class="lines">
              <i></i><i></i><i></i>
            </span>
            <span class="postmark">PIXEL THEORY · 2026</span>
          </div>
        </div>
        <p class="stamp-note dark">tap to flip ✦</p>
      </section>
    </div>
  </main>
</template>

<style scoped>
* { box-sizing: border-box; }

.scene {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(circle at 30% 20%, #2a2150, #14102b 60%, #0b0820);
  font-family: "Courier New", ui-monospace, monospace;
  -webkit-font-smoothing: none;
  perspective: 1400px;
}

.postcard {
  position: relative;
  width: min(92vw, 520px);
  aspect-ratio: 3 / 2;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.5, 0.05, 0.2, 1);
}
.postcard.flipped { transform: rotateY(180deg); }

.face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
  image-rendering: pixelated;
}

/* ---------- FRONT ---------- */
.front {
  background: #ffd6e7;
  border: 6px solid #1a1430;
}
.sky {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 58%;
  background: linear-gradient(#7ec8ff, #bfe6ff);
}
.ground {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 42%;
  background:
    repeating-linear-gradient(#8ad66b 0 14px, #79c95c 14px 28px);
}
.sun {
  position: absolute;
  top: 18px; right: 26px;
  width: 46px; height: 46px;
  background: #ffe34d;
  box-shadow:
    0 0 0 6px #ffd6e7,
    0 0 0 12px #ffec80;
}
.cloud {
  position: absolute;
  background: #fff;
  height: 14px;
  box-shadow:
    14px 0 #fff, 28px 0 #fff,
    14px -14px #fff;
}
.cloud-a { top: 34px; left: 40px; width: 14px; }
.cloud-b { top: 70px; left: 150px; width: 14px; transform: scale(0.8); }

.heart {
  position: absolute;
  bottom: 14%;
  left: 50%;
  transform: translateX(-50%);
  width: 18px; height: 18px;
  background: #ff4d83;
  box-shadow:
    -18px -18px #ff4d83, 18px -18px #ff4d83,
    -36px 0 #ff4d83, 36px 0 #ff4d83,
    -18px 0 #ff4d83, 18px 0 #ff4d83, 0 0 #ff4d83,
    -18px 18px #ff4d83, 18px 18px #ff4d83, 0 18px #ff4d83,
    0 36px #ff4d83;
  opacity: 0.85;
}

.headline {
  position: absolute;
  inset: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  text-align: center;
  z-index: 2;
}
.line {
  font-weight: 900;
  letter-spacing: 4px;
  font-size: clamp(22px, 7vw, 40px);
  color: #fff;
  text-shadow:
    3px 3px 0 #1a1430,
    -1px -1px 0 #ff4d83;
}
.line.big {
  font-size: clamp(40px, 13vw, 80px);
  color: #ff4d83;
  text-shadow: 4px 4px 0 #fff, 8px 8px 0 #1a1430;
  line-height: 0.9;
}

/* ---------- BACK ---------- */
.back {
  transform: rotateY(180deg);
  background: #fff7ec;
  border: 6px solid #1a1430;
  padding: 22px;
}
.back-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 18px;
  height: 100%;
}
.message {
  border-right: 3px dashed #c9b89a;
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  color: #4a3b2a;
  font-size: clamp(11px, 2.6vw, 14px);
  line-height: 1.4;
}
.message p { margin: 0; }
.sign { font-style: italic; color: #ff4d83; }

.address {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
}
.stamp {
  width: 56px; height: 66px;
  background: #ffe7f0;
  border: 3px dashed #ff4d83;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 2px;
}
.stamp-heart { color: #ff4d83; font-size: 22px; }
.stamp-txt { font-size: 10px; color: #1a1430; letter-spacing: 2px; }
.lines {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}
.lines i {
  display: block;
  height: 2px;
  background: #c9b89a;
}
.postmark {
  font-size: 10px;
  color: #1a1430;
  border: 2px solid #1a1430;
  border-radius: 999px;
  padding: 3px 8px;
}

.stamp-note {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 11px;
  letter-spacing: 2px;
  color: #1a1430;
  background: rgba(255, 255, 255, 0.7);
  padding: 2px 8px;
  border-radius: 4px;
  z-index: 3;
}
.stamp-note.dark { color: #4a3b2a; background: rgba(255, 247, 236, 0.8); }
</style>
