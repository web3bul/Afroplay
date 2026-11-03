// Runs before `vite build` (see package.json "prebuild").
//  - Rasterises the OG share images (SVG -> 1200x630 PNG). Social networks do not render SVG og:images.
//  - Writes small logo/favicon variants (the source logo.png is ~540 KB).
// Output goes to gitignored paths, so nothing here needs to be committed.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (...p) => path.join(root, 'public', ...p);

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch (e) {
    console.warn('[optimize-assets] sharp unavailable, skipping image generation:', e.message);
  }

  if (sharp) {
    for (const name of ['home', 'media', 'gaming']) {
      const src = pub('og', `${name}.svg`);
      if (!fs.existsSync(src)) continue;
      await sharp(src, { density: 144 }).resize(1200, 630).png({ compressionLevel: 9 }).toFile(pub('og', `${name}.png`));
    }
    fs.mkdirSync(pub('generated'), { recursive: true });
    const logo = pub('logo.png');
    for (const size of [192, 256]) {
      await sharp(logo).resize({ width: size, height: size, fit: 'inside' }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(pub('generated', `logo-${size}.png`));
    }
    console.log('[optimize-assets] images generated');
  }
}

main().catch((e) => {
  console.warn('[optimize-assets] failed (non-fatal):', e);
});
