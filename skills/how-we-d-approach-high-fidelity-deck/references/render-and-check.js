// Render each slide of a deck to PNG and report vertical overflow.
//
// Usage:  node render-and-check.js <deck.html> [outDir]
//   deck.html : path to the assembled deck
//   outDir    : where slideN.png go (default: same dir as deck)
//
// Prints a JSON report. The number that matters per slide is bodyOver:
// the pixels the slide content exceeds the 16:9 frame. ANY slide with
// bodyOver > 0 will clip or collide and must be fixed (see SKILL.md
// "Fit rules"). Re-run until every slide reports bodyOver 0.
//
// LOCAL (macOS / Claude Code): this script first tries puppeteer-core with a
// browser it can find on disk (puppeteer cache, or an installed Google Chrome /
// Chromium / Edge). If neither puppeteer-core + a findable browser nor a usable
// executable is available, it falls back to the full `puppeteer` package, which
// bundles its own browser. Install whichever you have:
//     npm i puppeteer            # easiest: bundles a browser, no path needed
//   or
//     npm i puppeteer-core && npx @puppeteer/browsers install chrome@stable
// Fonts load from Google Fonts over the network on a normal machine, so no
// font setup is needed locally (see SKILL.md gotchas / setup-fonts.sh).

const fs = require('fs');
const path = require('path');

function findChrome() {
  const candidates = [];

  // Sandbox / Playwright layout (kept for portability to the original container).
  const pw = '/opt/pw-browsers';
  if (fs.existsSync(pw)) {
    for (const d of fs.readdirSync(pw)) {
      if (d.startsWith('chromium-')) candidates.push(path.join(pw, d, 'chrome-linux', 'chrome'));
    }
  }

  // puppeteer / @puppeteer/browsers cache — covers macOS, Linux and Windows layouts.
  const cacheRoots = [
    path.join(process.env.HOME || '', '.cache/puppeteer/chrome'),
    path.join(process.env.HOME || '', 'Library/Caches/puppeteer/chrome'),
    process.env.PUPPETEER_CACHE_DIR ? path.join(process.env.PUPPETEER_CACHE_DIR, 'chrome') : null,
  ].filter(Boolean);
  const binByPlatform = [
    'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    'chrome-linux64/chrome',
    'chrome-linux/chrome',
    'chrome-win64/chrome.exe',
  ];
  for (const root of cacheRoots) {
    if (!fs.existsSync(root)) continue;
    for (const d of fs.readdirSync(root)) {
      for (const rel of binByPlatform) candidates.push(path.join(root, d, rel));
    }
  }

  // Installed browsers on the host (macOS paths first, then Linux).
  candidates.push(
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  );

  for (const c of candidates) if (c && fs.existsSync(c)) return c;
  return null;
}

(async () => {
  const FILE = path.resolve(process.argv[2] || 'deck.html');
  const OUT = path.resolve(process.argv[3] || path.dirname(FILE));

  // Prefer puppeteer-core + a findable browser; fall back to full puppeteer.
  let puppeteer, launchOpts;
  const exe = findChrome();
  try {
    puppeteer = require('puppeteer-core');
    if (!exe) throw new Error('no browser for puppeteer-core');
    launchOpts = { executablePath: exe };
  } catch (e) {
    puppeteer = require('puppeteer'); // bundles its own browser; launches with no path
    launchOpts = {};
  }

  const browser = await puppeteer.launch({
    ...launchOpts,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none', '--force-color-profile=srgb'],
  });
  const page = await browser.newPage();
  // 1280 wide lets the slide hit its 1180px max so cqw units are stable run-to-run.
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });
  await page.goto('file://' + FILE, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 600)); // let fonts settle

  const report = await page.evaluate(() => {
    return [...document.querySelectorAll('.slide')].map((s, i) => {
      const b = s.querySelector('.body');
      return {
        slide: i + 1,
        bodyOver: b ? (b.scrollHeight - b.clientHeight) : null,
        slideOver: s.scrollHeight - s.clientHeight
      };
    });
  });

  const slides = await page.$$('.slide');
  for (let i = 0; i < slides.length; i++) {
    await slides[i].screenshot({ path: path.join(OUT, `slide${i + 1}.png`) });
  }

  const bad = report.filter(r => (r.bodyOver || 0) > 0 || (r.slideOver || 0) > 0);
  console.log(JSON.stringify({ ok: bad.length === 0, report }, null, 2));
  await browser.close();
  process.exit(bad.length === 0 ? 0 : 1);
})().catch(e => { console.error('ERR', e); process.exit(2); });
