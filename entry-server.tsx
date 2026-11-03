import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppContent } from './App';
import { airedEpisodes, episodePath } from './lib/episodes';

export function render(url: string): string {
  return renderToString(
    <HelmetProvider>
      <StaticRouter location={url}>
        <AppContent />
      </StaticRouter>
    </HelmetProvider>
  );
}

/** Every URL that should be prerendered and listed in the sitemap. */
export const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/media', changefreq: 'weekly', priority: '0.9' },
  ...airedEpisodes.map((ep) => ({ path: episodePath(ep), changefreq: 'monthly', priority: '0.7' })),
];
