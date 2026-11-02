import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// Episode air dates only exist as comments in data/episodes.ts
// (`// -- EP 42 -- aired 2026-10-29 --`, written by the weekly publishing job).
// This exposes them as `virtual:episode-air-dates` ({ [episodeId]: 'YYYY-MM-DD' })
// so the sitemap and episode pages can use real dates without changing the data
// file's shape or the job. Episodes without that comment simply have no date.
function episodeAirDates(): Plugin {
  const id = 'virtual:episode-air-dates';
  const resolvedId = '\0' + id;
  const file = path.resolve(rootDir, 'data/episodes.ts');
  return {
    name: 'episode-air-dates',
    resolveId: (source) => (source === id ? resolvedId : undefined),
    load(loadId) {
      if (loadId !== resolvedId) return;
      this.addWatchFile(file);
      const dates: Record<number, string> = {};
      const re = /\/\/\s*--\s*EP\s+(\d+)\s*--\s*aired\s+(\d{4}-\d{2}-\d{2})/g;
      for (const m of fs.readFileSync(file, 'utf8').matchAll(re)) dates[Number(m[1])] = m[2];
      return `export default ${JSON.stringify(dates)};`;
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), episodeAirDates()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(rootDir, '.'),
        }
      }
    };
});
