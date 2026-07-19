// Shared content types. Each interface backs a data file under /data,
// keeping page/component copy out of the JSX and in one editable place.

export interface TeamMember {
  name: string;
  role: string;
  handle: string;
  avatarUrl: string;
}

export interface TeamCategory {
  title: string;
  members: TeamMember[];
}

/** A node on the Partners hub-and-spoke graph. x/y are percentages (0–100). */
export interface PartnerNode {
  name: string;
  short: string;      // 2-letter fallback shown when no logo loads
  logoUrl: string;
  x: number;
  y: number;
}

/** Icon keys map to lucide-react components inside each component. */
export type ServiceIconKey = 'educate' | 'onboard' | 'visibility' | 'story';

export interface ServiceCard {
  iconKey: ServiceIconKey;
  iconColor: string;  // tailwind text-color class for the icon
  bar: string;        // tailwind gradient classes for the top accent bar
  title: string;
  body: string;
}

export interface ServiceBenefit {
  barColor: string;   // tailwind bg-color class for the accent bar
  title: string;
  body: string;
}

export type MarketIconKey = 'mobile' | 'culture' | 'earn' | 'viral';

export interface MarketFeature {
  iconKey: MarketIconKey;
  iconColor: string;  // tailwind text-color class for the icon
  title: string;
  desc: string;
}

export type SocialIconKey =
  | 'youtube' | 'x' | 'linkedin' | 'tiktok' | 'instagram' | 'spotify';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIconKey;
}
