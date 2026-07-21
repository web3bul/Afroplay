import { PartnerNode } from '../types';

// x/y are percentages positioning each node around the central hub on the
// Partners network graph. Hub sits at (50, 50).
export const partners: PartnerNode[] = [
  { name: 'BloodLoop',     short: 'BL', logoUrl: '/partner/bl.jpg',        x: 50.0, y: 22.0 },
  { name: 'Magic Craft',   short: 'MC', logoUrl: '/partner/mc.jpg',        x: 74.3, y: 36.0 },
  { name: 'Decimated',     short: 'DC', logoUrl: '/partner/decimated.png', x: 77.6, y: 54.9 },
  { name: 'Solplex',       short: 'SP', logoUrl: '/partner/solplex.jpg',   x: 68.0, y: 71.5 },
  { name: 'Slingshot DAO', short: 'SD', logoUrl: '/partner/slingshot.jpg', x: 50.0, y: 78.0 },
  { name: 'SOV',           short: 'SV', logoUrl: '/partner/sov.jpg',       x: 25.7, y: 64.0 },
  { name: 'Solforge',      short: 'SF', logoUrl: '/partner/sol.jpg',       x: 25.7, y: 36.0 },
  { name: 'Syntrei',       short: 'SY', logoUrl: 'https://pbs.twimg.com/profile_images/1974260932952936450/TZuddzGl_400x400.jpg', x: 22.4, y: 50.0 },
];
