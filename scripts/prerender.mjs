// Post-build prerender. Run after `vite build` and `vite build --ssr`.
//   dist/index.html            <- "/"
//   dist/media.html            <- "/media"
//   dist/media/<slug>.html     <- one page per episode
//   dist/404.html              <- NotFound (served with a real 404 status)
//   dist/sitemap.xml           <- generated from the same route list
// Vercel serves these via "cleanUrls" (see vercel.json).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render, routes } = await import(pathToFileURL(ssrEntry).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

// Static default head tags in index.html are replaced by the per-page tags that
// react-helmet-async renders, so remove them to avoid duplicates.
const STRIP = [
  /<title>[\s\S]*?<\/title>\s*/i,
  /<meta\s+name="description"[^>]*>\s*/i,
  /<meta\s+name="robots"[^>]*>\s*/i,
  /<meta\s+property="og:[^"]*"[^>]*>\s*/gi,
  /<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi,
  /<link\s+rel="canonical"[^>]*>\s*/gi,
];
let base = template;
for (const re of STRIP) base = base.replace(re, '');

// React 19 emits <title>/<meta>/<link> from <Helmet> inline in the rendered string and
// hoists them into <head> on the client. Do the same here so crawlers see them in
// <head>. JSON-LD <script> tags are NOT hoisted by React, so they stay in the body
// exactly where the client will render them (moving them breaks hydration).
const HEAD_TAG = /<title[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>/gi;

function build(url) {
  const rendered = render(url);
  const headTags = [];
  const body = rendered.replace(HEAD_TAG, (m) => {
    headTags.push(m);
    return '';
  });
  let out = base.replace('</head>', `    ${headTags.join('\n    ')}\n  </head>`);
  out = out.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  if (out === base) throw new Error(`prerender failed to inject for ${url}`);
  return out;
}

function write(rel, html) {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

for (const r of routes) {
  const rel = r.path === '/' ? 'index.html' : `${r.path.replace(/^\//, '')}.html`;
  write(rel, build(r.path));
}
write('404.html', build('/__not-found__'));

const today = new Date().toISOString().slice(0, 10);
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes
    .map(
      (r) =>
        `  <url>\n    <loc>https://afroplay.org${r.path === '/' ? '/' : r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
    )
    .join('\n') +
  '\n</urlset>\n';
fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml);

console.log(`[prerender] ${routes.length} routes + 404 prerendered, sitemap written`);
