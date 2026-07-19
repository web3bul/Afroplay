import { SocialLink } from '../types';

// icon maps to an SVG/lucide icon component inside Contact.tsx.
// Discord is rendered as its own featured card there and lives in lib/constants.
export const socialLinks: SocialLink[] = [
  { label: 'YouTube',   href: 'https://www.youtube.com/@AfroPlayStudio',        icon: 'youtube'   },
  { label: 'X',         href: 'https://x.com/AfroPlayHQ',                       icon: 'x'         },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/afro-play/',    icon: 'linkedin'  },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@afro_play',              icon: 'tiktok'    },
  { label: 'Instagram', href: 'https://www.instagram.com/afroplaystudio/',      icon: 'instagram' },
  { label: 'Spotify',   href: '#',                                              icon: 'spotify'   }, // TODO: add real Spotify URL
];
