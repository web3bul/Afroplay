// The URLs that get prerendered to static HTML at build time, plus their
// sitemap metadata. /gaming and /brand are server redirects in vercel.json, so
// they are neither prerendered nor listed in the sitemap.
import { airedEpisodes, getAirDate, getEpisodePath, latestAirDate } from './episodes';

export const SITE_URL = 'https://afroplay.org';

/** Absolute URL on the canonical bare domain. `absoluteUrl('/')` → 'https://afroplay.org/'. */
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

export interface PrerenderRoute {
  path: string;
  /** Output file, relative to dist/. */
  file: string;
  /** Present for indexable pages; absent pages are left out of sitemap.xml. */
  sitemap?: {
    priority: number;
    /** YYYY-MM-DD. Omitted (rather than guessed) when no real date is known. */
    lastmod?: string;
  };
}

export function getPrerenderRoutes(): PrerenderRoute[] {
  return [
    // Both change whenever a new episode airs, so they share its date.
    { path: '/', file: 'index.html', sitemap: { priority: 1.0, lastmod: latestAirDate } },
    { path: '/media', file: 'media/index.html', sitemap: { priority: 0.9, lastmod: latestAirDate } },
    // One page per aired episode, generated from data/episodes.ts so new episodes
    // get a page (and a sitemap entry) with no other changes. lastmod is the
    // episode's own air date; omitted if the data file has none for it.
    ...airedEpisodes.map(ep => ({
      path: getEpisodePath(ep),
      file: `${getEpisodePath(ep).slice(1)}/index.html`,
      sitemap: { priority: 0.7, lastmod: getAirDate(ep) },
    })),
    // Rendered by the catch-all route; Vercel serves dist/404.html with a 404 status.
    { path: '/__not-found__', file: '404.html' },
  ];
}

export function buildSitemapXml(routes: PrerenderRoute[]): string {
  const urls = routes
    .filter(r => r.sitemap)
    .map(r => {
      const { priority, lastmod } = r.sitemap!;
      return [
        '  <url>',
        `    <loc>${absoluteUrl(r.path)}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        `    <priority>${priority.toFixed(1)}</priority>`,
        '  </url>',
      ].filter(Boolean).join('\n');
    });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}
