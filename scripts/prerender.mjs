// Build-time prerender: turns the client-only SPA shell into real HTML per route.
//
// Runs after `vite build` (see the "build" script):
//   1. bundles entry-server.tsx for Node with `vite build --ssr`
//   2. renders every route from lib/routes.ts with React's renderToString
//   3. writes dist/<route>/index.html (and dist/404.html) with the page's own
//      <head> tags and body content, then the client bundle hydrates it.
//
// React 19 emits hoistable tags (<title>, <meta>, <link>, image preloads) as a
// preamble at the start of the render output. We move that preamble into
// <head>, replacing the dev-only defaults between the <!--app-head--> markers.

import { build } from 'vite';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrOut = path.join(root, '.ssr-tmp');

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'entry-server.tsx', outDir: ssrOut, emptyOutDir: true },
});

const { render, getPrerenderRoutes, buildSitemapXml } = await import(
  pathToFileURL(path.join(ssrOut, 'entry-server.js')).href
);

const template = readFileSync(path.join(dist, 'index.html'), 'utf-8');
const HEAD_RE = /<!--app-head-->[\s\S]*?<!--\/app-head-->/;
if (!HEAD_RE.test(template)) throw new Error('index.html is missing the <!--app-head--> markers');
if (!template.includes('<div id="root"></div>')) throw new Error('index.html is missing <div id="root"></div>');

// Leading run of hoistable tags React put before the first real element.
const PREAMBLE_RE = /^(?:\s*(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>))+/;

const routes = getPrerenderRoutes();
const written = [];
for (const route of routes) {
  const html = render(route.path);
  const preamble = (html.match(PREAMBLE_RE) || [''])[0];
  const body = html.slice(preamble.length);

  if (!/<title>/.test(preamble)) throw new Error(`${route.path}: no <title> rendered`);
  if (!/<h1\b/.test(body)) throw new Error(`${route.path}: no <h1> rendered`);

  const headTags = preamble.replace(/></g, '>\n    <');
  const page = template
    .replace(HEAD_RE, headTags)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const outFile = path.join(dist, route.file);
  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, page);
  written.push(`${route.file}  (${route.path}, ${(page.length / 1024).toFixed(1)} KB)`);
}

// sitemap.xml is generated from the same route list, so it can only ever list
// pages that were actually prerendered (never redirects or the 404 page).
const sitemap = buildSitemapXml(routes);
writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
written.push(`sitemap.xml  (${(sitemap.match(/<url>/g) || []).length} URLs)`);

// Best-effort cleanup: a lingering file handle on Windows can make this fail
// even though the build itself succeeded, so it never fails the build.
try { rmSync(ssrOut, { recursive: true, force: true }); } catch { /* ignore */ }

console.log(`Prerendered ${routes.length} routes:\n  ${written.join('\n  ')}`);
