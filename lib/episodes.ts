import { episodes, Episode } from '../data/episodes';

export const SITE_URL = 'https://afroplay.org';

export const airedEpisodes: Episode[] = episodes.filter((e) => e.status !== 'upcoming');

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** URL slug for an episode, e.g. "ep-42-clona-uche-crypt". Stable: starts with the id. */
export function episodeSlug(ep: Episode): string {
  const parts = [`ep-${ep.id}`, slugify(ep.project || ''), slugify(ep.guest || '')].filter(Boolean);
  // Avoid "ep-9-sol-pollinet-sol-pollinet" when project and guest are the same.
  const uniq = parts.filter((p, i) => parts.indexOf(p) === i);
  return uniq.join('-');
}

export const episodePath = (ep: Episode) => `/media/${episodeSlug(ep)}`;
export const episodeUrl = (ep: Episode) => `${SITE_URL}${episodePath(ep)}`;

/** Resolve a route param like "ep-42-clona-uche-crypt" (or just "ep-42") to an episode. */
export function findEpisodeBySlug(slug: string | undefined): Episode | undefined {
  if (!slug) return undefined;
  const m = /^ep-(\d+)/.exec(slug);
  if (!m) return undefined;
  return airedEpisodes.find((e) => e.id === Number(m[1]));
}

export function cleanEpisodeTitle(title: string): string {
  return title
    .replace(/\s*[|:]\s*@[^|]*$/, '')
    .replace(/\s*\|\s*Onchain Africa$/i, '')
    .trim();
}

export function episodeDescription(ep: Episode): string {
  const who = ep.project ? `${ep.guest} of ${ep.project}` : ep.guest;
  return `Onchain Africa EP ${ep.id}: ${who} — ${cleanEpisodeTitle(ep.title)}. Watch the ${ep.duration} conversation with host Web3bull.`;
}
