// Build-time server entry. scripts/prerender.mjs bundles this with
// `vite build --ssr` and calls render(url) once per route to produce static HTML.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { AppContent } from './App';

export { getPrerenderRoutes } from './lib/routes';

export function render(url: string): string {
  return renderToString(
    <React.StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}>
          <AppContent />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
}
