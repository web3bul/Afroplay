// The list of URLs that get prerendered to static HTML at build time.
// /gaming and /brand are server redirects in vercel.json, so they're not here.

export const SITE_URL = 'https://afroplay.org';

/** Absolute URL on the canonical bare domain. `absoluteUrl('/')` → 'https://afroplay.org/'. */
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

export interface PrerenderRoute {
  path: string;
  /** Output file, relative to dist/. */
  file: string;
}

export function getPrerenderRoutes(): PrerenderRoute[] {
  return [
    { path: '/', file: 'index.html' },
    { path: '/media', file: 'media/index.html' },
    // Rendered by the catch-all route; Vercel serves dist/404.html with a 404 status.
    { path: '/__not-found__', file: '404.html' },
  ];
}
