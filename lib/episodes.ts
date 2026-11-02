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

// ── Lookups & relations ──────────────────────────────────────────────────────

export const getEpisodeBySlug = (slug: string): Episode | undefined =>
  airedEpisodes.find(ep => getEpisodeSlug(ep) === slug);

/** Previous = the episode aired before this one (older); next = the one after (newer). */
export function getAdjacentEpisodes(ep: Episode): { prev?: Episode; next?: Episode } {
  const i = airedEpisodes.findIndex(e => e.id === ep.id);
  return { prev: airedEpisodes[i + 1], next: i > 0 ? airedEpisodes[i - 1] : undefined };
}

/** Other episodes ranked by number of shared tags (ties: newest first). */
export function getRelatedEpisodes(ep: Episode, limit = 3): Episode[] {
  const tags = new Set(ep.tags);
  return airedEpisodes
    .filter(e => e.id !== ep.id)
    .map(e => ({ e, shared: e.tags.filter(t => tags.has(t)).length }))
    .filter(x => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.e.id - a.e.id)
    .slice(0, limit)
    .map(x => x.e);
}

/** "mm:ss" or "h:mm:ss" → ISO 8601 duration ("PT1H4M2S"). */
export function durationToISO8601(duration: string): string {
  const p = duration.split(':').map(Number);
  const [h, m, s] = p.length === 3 ? p : [0, p[0], p[1]];
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s ? `${s}S` : ''}` || 'PT0S';
}

/** "1:04:02" → "1 hr 4 min"; "15:44" → "15 min". */
export function formatDuration(duration: string): string {
  const p = duration.split(':').map(Number);
  const [h, m] = p.length === 3 ? p : [0, p[0]];
  return h ? `${h} hr${m ? ` ${m} min` : ''}` : `${m} min`;
}

/** "@Foo" → "https://x.com/Foo"; undefined when there's no handle. */
export const xProfileUrl = (handle: string): string | undefined =>
  handle ? `https://x.com/${handle.replace(/^@/, '')}` : undefined;

export const youtubeThumbnail = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

/** Human date, e.g. "29 October 2026". */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
