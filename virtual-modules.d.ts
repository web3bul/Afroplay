// Provided by the episodeAirDates() plugin in vite.config.ts.
declare module 'virtual:episode-air-dates' {
  /** Episode id → air date (YYYY-MM-DD), parsed from comments in data/episodes.ts. */
  const airDates: Record<number, string>;
  export default airDates;
}
