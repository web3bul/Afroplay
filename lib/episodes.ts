// Derived episode data shared by pages, the sitemap and structured data.
// Everything here is computed from data/episodes.ts (plus the air-date comments
// in it), so the weekly publishing job only ever has to edit that one file.
import airDates from 'virtual:episode-air-dates';
import { episodes, Episode } from '../data/episodes';

/** Aired episodes, newest first (same order as the data file). */
export const airedEpisodes = episodes.filter(ep => ep.status !== 'upcoming');

/** Episode count and whole hours of conversation, as shown on /media. */
export const totalEpisodes = airedEpisodes.length;
export const totalHours = Math.floor(
  airedEpisodes.reduce((sum, ep) => {
    const parts = ep.duration.split(':').map(Number);
    return sum + (parts.length === 3 ? parts[0] * 60 + parts[1] : parts[0]);
  }, 0) / 60
);

/** Air date (YYYY-MM-DD) from the `// -- EP N -- aired …` comment, if the episode has one. */
export const getAirDate = (ep: Episode): string | undefined => airDates[ep.id];

/** Most recent known air date across all episodes. */
export const latestAirDate: string | undefined = Object.values(airDates).sort().at(-1);

// ── Episode URLs ─────────────────────────────────────────────────────────────
// /media/<slug>, where slug = guest + project (e.g. "perry-paschal-pawasave").
// Rules: drop the project when it's empty or its words are already in the guest
// name ("AirbillsPay Team" + "AirbillsPay" → "airbillspay-team"; whole words
// only, so "Azzaman" + "Azza" stays "azzaman-azza"); on a collision add
// "-ep-<id>". Slugs are assigned oldest episode first, so publishing a new
// episode can never change an existing URL.

export const slugify = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// True when every word of `part` is also a word of `whole`.
const wordsWithin = (part: string, whole: string) => {
  const wholeWords = new Set(whole.split('-'));
  return part.split('-').every(w => wholeWords.has(w));
};

const baseSlug = (ep: Episode) => {
  const guest = slugify(ep.guest);
  const project = slugify(ep.project);
  if (!project || (guest && wordsWithin(project, guest))) return guest || `episode-${ep.id}`;
  if (!guest || wordsWithin(guest, project)) return project;
  return `${guest}-${project}`;
};

const slugById = new Map<number, string>();
{
  const taken = new Set<string>();
  for (const ep of [...episodes].sort((a, b) => a.id - b.id)) {
    let slug = baseSlug(ep);
    if (taken.has(slug)) slug = `${slug}-ep-${ep.id}`;
    taken.add(slug);
    slugById.set(ep.id, slug);
  }
}

export const getEpisodeSlug = (ep: Episode) => slugById.get(ep.id)!;
export const getEpisodePath = (ep: Episode) => `/media/${getEpisodeSlug(ep)}`;
