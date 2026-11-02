// Generates public/og/default.png — the 1200×630 default Open Graph / X card image.
//
// Why a script: X, Facebook and LinkedIn don't render SVG og:images, so the
// image must be a raster PNG. It's composed with sharp (already a devDependency)
// from an SVG background, the trimmed logo, and text layers rendered by Pango in
// the real brand fonts (Russo One + Outfit, OFL-licensed, in scripts/og-assets/).
//
// Run:  npm run og:image   (re-run after changing copy, colours or the logo)

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'scripts', 'og-assets');
const out = path.join(root, 'public', 'og', 'default.png');

const W = 1200;
const H = 630;
const ORANGE = '#FF6B00';

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glowR" cx="82%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${ORANGE}" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#0F0502" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowL" cx="0%" cy="100%" r="55%">
      <stop offset="0%" stop-color="#A020F0" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#0F0502" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" x2="1">
      <stop offset="0%" stop-color="${ORANGE}"/>
      <stop offset="100%" stop-color="#EF4444"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0F0502"/>
  <rect width="${W}" height="${H}" fill="url(#glowR)"/>
  <rect width="${W}" height="${H}" fill="url(#glowL)"/>
  <rect x="0" y="0" width="${W}" height="8" fill="url(#bar)"/>
  <rect x="80" y="352" width="96" height="6" rx="3" fill="url(#bar)"/>
</svg>`);

// Pango text layer in a given font file; `markup` may use <span foreground=…>.
const text = (markup, fontFamily, fontFile, sizePx, width) =>
  sharp({
    text: {
      text: markup,
      font: `${fontFamily} ${sizePx}`,
      fontfile: path.join(assets, fontFile),
      rgba: true,
      dpi: 72,
      width,
      wrap: 'word',
    },
  })
    .png()
    .toBuffer();

const logo = await sharp(path.join(root, 'public', 'logo.png'))
  .trim()
  .resize({ height: 104 })
  .png()
  .toBuffer();

const [label, title, byline, body, domain] = await Promise.all([
  text(`<span foreground="${ORANGE}" letter_spacing="4096">LIVE INTERVIEW SERIES</span>`, 'Outfit', 'Outfit-Variable.ttf', 26),
  text(`<span foreground="#FFFFFF">ONCHAIN </span><span foreground="${ORANGE}">AFRICA</span>`, 'Russo One', 'RussoOne-Regular.ttf', 104),
  text(`<span foreground="#FFFFFF">by AfroPlay</span>`, 'Outfit', 'Outfit-Variable.ttf', 44),
  text(`<span foreground="#A1A1AA">Unscripted conversations with African Web3 founders and builders.</span>`, 'Outfit', 'Outfit-Variable.ttf', 30, 1040),
  text(`<span foreground="#71717A">afroplay.org</span>`, 'Outfit', 'Outfit-Variable.ttf', 26),
]);

await sharp(background)
  .composite([
    { input: logo, left: 80, top: 64 },
    { input: label, left: 82, top: 184 },
    { input: title, left: 76, top: 228 },
    { input: byline, left: 80, top: 376 },
    { input: body, left: 80, top: 452 },
    { input: domain, left: 80, top: 560 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(out);

const meta = await sharp(out).metadata();
console.log(`Wrote ${path.relative(root, out)} (${meta.width}×${meta.height})`);
