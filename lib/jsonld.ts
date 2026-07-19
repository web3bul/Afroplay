// JSON-LD schema generators — single source of truth for structured data.
// Imported by page components; the Helmet <script> injection makes them
// visible to JavaScript-executing crawlers (Googlebot, Bing, Perplexity).
import { episodes } from '../data/episodes';

// ── Helpers ──────────────────────────────────────────────────────────────────

function durationToISO8601(mmss: string): string {
  const parts = mmss.split(':');
  if (parts.length === 3) return `PT${parts[0]}H${parts[1]}M${parts[2]}S`;
  return `PT${parts[0]}M${parts[1]}S`;
}

// ── Site-wide schemas (also embedded statically in index.html) ────────────────

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://afroplay.org/#organization',
  name: 'AfroPlay',
  url: 'https://afroplay.org',
  logo: 'https://afroplay.org/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'connect@afroplay.org',
    contactType: 'partnerships',
  },
  foundingLocation: { '@type': 'Place', name: 'Nigeria' },
  areaServed: 'Africa',
  sameAs: [
    'https://x.com/AfroPlayHQ',
    'https://www.youtube.com/@AfroPlayStudio',
    'https://www.linkedin.com/company/afro-play/',
    'https://www.tiktok.com/@afro_play',
    'https://www.instagram.com/afroplaystudio/',
    'https://discord.gg/GJVNA6TG',
  ],
};

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://afroplay.org/#website',
  name: 'AfroPlay',
  url: 'https://afroplay.org',
  publisher: { '@id': 'https://afroplay.org/#organization' },
};

// ── /gaming page ─────────────────────────────────────────────────────────────

export const gamingPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://afroplay.org/gaming',
      url: 'https://afroplay.org/gaming',
      name: "AfroPlay — Africa's Web3 Gaming & Media Platform",
      description:
        "AfroPlay connects Web3 games with Africa's 60M+ gamers through community, content, and partnerships. Home of the Onchain Africa interview series.",
      isPartOf: { '@id': 'https://afroplay.org/#website' },
      publisher: { '@id': 'https://afroplay.org/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://afroplay.org' },
        { '@type': 'ListItem', position: 2, name: 'AfroPlay Gaming', item: 'https://afroplay.org/gaming' },
      ],
    },
  ],
};

// ── /media page ──────────────────────────────────────────────────────────────

export const mediaPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'PodcastSeries',
      '@id': 'https://afroplay.org/media#podcast',
      name: 'Onchain Africa',
      description:
        'A live interview series spotlighting African Web3 founders and builders. Hosted by Web3bull on AfroPlay.',
      url: 'https://afroplay.org/media',
      inLanguage: 'en',
      publisher: { '@id': 'https://afroplay.org/#organization' },
      author: {
        '@type': 'Person',
        name: 'Web3bull',
        sameAs: 'https://x.com/udousobenjamin',
      },
      // All aired episodes generated from the same data source the episode grid uses.
      // Upcoming episodes are excluded — they have no duration yet.
      episode: episodes
        .filter(ep => ep.status !== 'upcoming')
        .map(ep => ({
          '@type': 'PodcastEpisode',
          '@id': ep.youtubeUrl,
          name: ep.title,
          episodeNumber: ep.id,
          url: ep.youtubeUrl,
          duration: durationToISO8601(ep.duration),
          partOfSeries: { '@id': 'https://afroplay.org/media#podcast' },
        })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://afroplay.org' },
        { '@type': 'ListItem', position: 2, name: 'Onchain Africa', item: 'https://afroplay.org/media' },
      ],
    },
  ],
};

// ── FAQ (matched 1-to-1 with the visible FAQ section in MediaPage) ─────────

export const mediaFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Onchain Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Onchain Africa is a live interview series by AfroPlay that spotlights African Web3 founders and builders. Hosted by Web3bull, the show features unscripted conversations about how African innovators are building on the blockchain. Onchain Africa has produced 25+ episodes covering payments, gaming, DeFi, NFTs, and infrastructure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get featured on Onchain Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Founders building Web3 projects in Africa can apply by emailing connect@afroplay.org with the subject "Onchain Africa — Guest Application". You can also join the AfroPlay Founders Circle on Telegram to connect directly with the host and community.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I watch or listen to Onchain Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Onchain Africa episodes are available on YouTube at youtube.com/@AfroPlayStudio. The series is also distributed on Spotify and other major podcast platforms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who hosts Onchain Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Onchain Africa is hosted by Web3bull, the founder of AfroPlay. Web3bull created Onchain Africa to amplify the voices of African Web3 builders and close the visibility gap for African founders in the global crypto ecosystem.',
      },
    },
    {
      '@type': 'Question',
      name: 'What topics does Onchain Africa cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Onchain Africa episodes cover DeFi, payments and fintech, NFTs, infrastructure, Web3 gaming, and community building — all through the lens of African Web3 founders solving real problems on the continent.',
      },
    },
  ],
};
