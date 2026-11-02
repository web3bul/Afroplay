// Downloads every remote guest avatar referenced in data/episodes.ts, converts
// it to WebP under public/guests/, and rewrites ONLY the `guestImage` values.
//
// Why: pbs.twimg.com URLs are hotlinked, and they break whenever a guest
// changes their X profile picture. Local copies are stable.
//
// Safety:
//   - data/episodes.ts is copied to .backups/ before any change.
//   - Only `guestImage: "https://..."` string values are rewritten; line endings
//     and everything else in the file are preserved byte for byte.
//   - If a download or conversion fails, that entry is left as the remote URL and
//     listed at the end (and the script exits 0; re-run it to retry).
//   - Safe to re-run: with no remote URLs left it does nothing.
//
// Run:  npm run localize-avatars        (add -- --dry-run to preview)

import sharp from 'sharp';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataFile = path.join(root, 'data', 'episodes.ts');
const outDir = path.join(root, 'public', 'guests');
const dryRun = process.argv.includes('--dry-run');
const SIZE = 256; // avatars render at most ~112 CSS px; 256 covers 2x screens

const source = readFileSync(dataFile, 'utf8');

// `guestHandle: "...",` followed by `guestImage: "https://..."` (CRLF/LF agnostic).
const re = /guestHandle:\s*"([^"]*)",(\s*)guestImage:\s*"(https?:\/\/[^"]+)"/g;
const entries = [...source.matchAll(re)].map(m => ({ handle: m[1], url: m[3] }));
if (entries.length === 0) {
  console.log('No remote guestImage URLs found. Nothing to do.');
  process.exit(0);
}

const fileSafe = handle =>
  handle.replace(/^@/, '').toLowerCase().replace(/[^a-z0-9_-]+/g, '_').replace(/^_+|_+$/g, '') || 'guest';

// One file per distinct URL (EP 2 and 3 share a guest and an image).
const byUrl = new Map();
const usedNames = new Set();
for (const { handle, url } of entries) {
  if (byUrl.has(url)) continue;
  let name = fileSafe(handle);
  if (usedNames.has(name) || existsSync(path.join(outDir, `${name}.webp`))) {
    let n = 2;
    while (usedNames.has(`${name}_${n}`) || existsSync(path.join(outDir, `${name}_${n}.webp`))) n++;
    name = `${name}_${n}`;
  }
  usedNames.add(name);
  byUrl.set(url, { handle, file: `${name}.webp` });
}

console.log(`${entries.length} remote avatar references, ${byUrl.size} distinct images.${dryRun ? ' (dry run)' : ''}`);
if (dryRun) {
  for (const [url, { handle, file }] of byUrl) console.log(`  ${handle || '(no handle)'}  ->  /guests/${file}`);
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });
const backupDir = path.join(root, '.backups');
mkdirSync(backupDir, { recursive: true });
const backup = path.join(backupDir, `episodes.ts.${new Date().toISOString().replace(/[:.]/g, '-')}`);
copyFileSync(dataFile, backup);
console.log(`Backup: ${path.relative(root, backup)}`);

const ok = new Map(); // url -> local path
const failed = [];
for (const [url, { handle, file }] of byUrl) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; afroplay-build)' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).resize(SIZE, SIZE, { fit: 'cover' }).webp({ quality: 82 }).toFile(path.join(outDir, file));
    ok.set(url, `/guests/${file}`);
    console.log(`  ok    ${handle || '(no handle)'}  ->  /guests/${file}`);
  } catch (err) {
    failed.push({ handle, url, reason: err.message });
    console.log(`  FAIL  ${handle || '(no handle)'}  (${err.message})  left as remote URL`);
  }
}

// Rewrite only the guestImage values that downloaded successfully.
let rewritten = source;
for (const [url, local] of ok) rewritten = rewritten.split(`guestImage: "${url}"`).join(`guestImage: "${local}"`);
if (rewritten !== source) writeFileSync(dataFile, rewritten);

console.log(`\nLocalized ${ok.size}/${byUrl.size} images.`);
if (failed.length) {
  console.log('Left as remote (re-run to retry):');
  for (const f of failed) console.log(`  ${f.handle || '(no handle)'}  ${f.url}  [${f.reason}]`);
}
