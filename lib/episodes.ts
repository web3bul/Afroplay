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
