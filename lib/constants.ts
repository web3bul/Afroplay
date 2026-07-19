// Single source of truth for brand-kit routing.
// Everything in the codebase links to BRAND_KIT_URL ("/brand").
// Only THIS file knows the underlying Drive URL — so when the folder
// moves off Drive later, update one line here and nothing else breaks.

export const BRAND_KIT_DRIVE_URL =
  'https://drive.google.com/drive/folders/1nxWgNnN53c4FA3ri5f9LBoXu92z8SLP2?usp=sharing';

export const BRAND_KIT_URL = '/brand';

// Shared Discord invite — referenced by Hero and Contact so the link
// only ever needs updating in one place.
export const DISCORD_URL = 'https://discord.gg/GJVNA6TG';
