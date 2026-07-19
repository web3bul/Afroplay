// Hero section copy. iconKey on each point maps to a lucide-react icon
// inside Hero.tsx.
export type HeroIconKey = 'reach' | 'spotlight' | 'community';

export const hero = {
  badge: "Africa's Web3 Gaming & Media Platform",
  headlineLines: ['WEB3 GAMING.', 'AFRICAN MEDIA.'],
  headlineAccent: 'ONE MOVEMENT.',
  points: [
    { icon: 'reach' as HeroIconKey,     text: 'Want die-hard African gamers to champion your Web3 game?' },
    { icon: 'spotlight' as HeroIconKey, text: 'Need your Web3 project spotlighted on Onchain Africa — our live interview series?' },
    { icon: 'community' as HeroIconKey, text: "Ready to plug into Africa's most passionate Web3 gaming community?" },
  ],
  primaryCta: { label: 'Partner With Us', href: '#contact' },
  statCard: {
    value: '60M+ Gamers',
    caption: "Africa's largest untapped Web3 gaming & media audience.",
  },
};
