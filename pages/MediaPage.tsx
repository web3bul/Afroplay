successfully downloaded text file (SHA: 4e0792dd74ec430d4c06409428f73a2059950daa)
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, PlayCircle, Play, Clock, ArrowRight, Mail, Quote, Send, Search, X, Youtube, ChevronDown } from 'lucide-react';
import Contact from '../components/Contact';
import PageMeta, { JsonLd } from '../components/PageMeta';
import { mediaPageSchema, mediaFaqSchema } from '../lib/jsonld';
import { useInView } from '../hooks/useInView';
import { episodes, Episode } from '../data/episodes';

// ─── Brand icon components ────────────────────────────────────────────────────

const XIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SpotifyIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.521 17.34a.749.749 0 0 1-1.031.25c-2.823-1.725-6.376-2.116-10.564-1.159a.75.75 0 0 1-.336-1.462c4.589-1.05 8.523-.6 11.683 1.34.353.215.465.676.248 1.031zm1.471-3.272a.937.937 0 0 1-1.288.307c-3.231-1.987-8.158-2.563-11.986-1.402a.938.938 0 1 1-.543-1.795c4.376-1.328 9.806-.685 13.51 1.6a.938.938 0 0 1 .307 1.29zm.129-3.41C15.24 8.4 8.82 8.2 5.157 9.312a1.125 1.125 0 1 1-.652-2.153c4.207-1.276 11.273-1.038 15.733 1.622a1.125 1.125 0 1 1-1.117 1.957v-.08z" />
  </svg>
);

const TikTokIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
  </svg>
);

const LinkedInIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

// ─── Static data ──────────────────────────────────────────────────────────────

const platforms = [
  { name: 'YouTube',   Icon: Youtube,      url: 'https://www.youtube.com/@AfroPlayStudio' },
  { name: 'X',         Icon: XIcon,        url: 'https://x.com/AfroPlayHQ' },
  { name: 'LinkedIn',  Icon: LinkedInIcon, url: 'https://www.linkedin.com/company/afro-play/' },
  { name: 'TikTok',   Icon: TikTokIcon,   url: 'https://www.tiktok.com/@afro_play' },
  { name: 'Instagram', Icon: InstagramIcon, url: 'https://www.instagram.com/afroplaystudio/' },
  { name: 'Spotify',  Icon: SpotifyIcon,  url: 'https://open.spotify.com/show/033H8BaOQIUO41J2GLIcGx?si=tBqvbykzSk6phPE8zkhe0A' },
];

const hosts = [
  {
    name: 'Web3bull',
    role: 'Founder & Host',
    handle: '@udousobenjamin',
    avatarUrl: '/team/web3bull.jpg',
    bio: 'Founder of AfroPlay and host of Onchain Africa. On a mission to unite African gamers, builders and founders through play and storytelling — and give African Web3 the global stage it deserves.',
  },
];

// TODO: Replace with real guest testimonials when collected
const testimonials = [
  {
    quote: 'Onchain Africa gave us a platform to share our story with the global Web3 community.',
    guest: 'MrBoqer',
    project: 'Co-Founder, Flipeet',
    image: '/guests/mrboqer.jpg',
  },
  {
    quote: 'Great conversation about what it actually takes to build in Africa\'s crypto space.',
    guest: 'Israel Igboze',
    project: 'Zend Money',
    image: '/guests/israel_igboze.jpg',
  },
  {
    quote: 'The kind of raw, real conversation African builders need more of.',
    guest: 'Blockchain Josh',
    project: 'Founder, Chainproof',
    image: '/guests/blockchain_josh.jpg',
  },
];

// Low-opacity Kente-inspired diamond pattern used as a subtle section texture.
const kentePatternUrl = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><path d='M28 0 L56 28 L28 56 L0 28 Z M28 14 L42 28 L28 42 L14 28 Z' fill='none' stroke='#FF6B00' stroke-width='1'/></svg>"
)}`;

// ─── Curated filter categories (max 6) ───────────────────────────────────────
// Maps broad UI labels to the raw tags used in episodes.ts.
const FILTER_CATEGORIES: { label: string; tags: readonly string[] | null }[] = [
  { label: 'All',               tags: null },
  { label: 'Payments & Fintech', tags: ['Payments', 'Fintech', 'Finance', 'Remittance', 'Crypto'] },
  { label: 'Gaming',            tags: ['Gaming'] },
  { label: 'DeFi & Markets',    tags: ['DeFi', 'Prediction', 'Markets', 'Bots', 'Trading'] },
  { label: 'Infrastructure',    tags: ['Infrastructure', 'Security', 'Verification', 'Developer', 'Careers', 'Talent', 'Building', 'Solana'] },
  { label: 'NFTs',              tags: ['NFTs', 'Marketplace'] },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return parts.map(p => p[0]).join('').slice(0, 2).toUpperCase();
};

const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  const fallback = img.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
  if (img.src !== fallback) img.src = fallback;
};

// Guest avatar: real photo with initials fallback on error.
// showGrayscale adds the grayscale→color-on-hover treatment for Past Guests grid.
// Branded orange-gradient placeholder (not a flat grey ghost) for guests without photos.
const GuestAvatar: React.FC<{
  name: string;
  image: string;
  className?: string;
  showGrayscale?: boolean;
}> = ({ name, image, className = 'w-14 h-14 text-sm', showGrayscale = false }) => {
  const initials = getInitials(name);

  if (!image) {
    return (
      <div
        className={`${className} rounded-full bg-gradient-to-br from-afro-orange to-red-500 flex items-center justify-center text-white font-heading flex-shrink-0`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className="relative flex-shrink-0">
      <img
        src={image}
        alt={name}
        loading="lazy"
        className={`${className} rounded-full object-cover border border-afro-orange/20 group-hover:border-afro-orange/50 group-hover:scale-105 ${showGrayscale ? 'grayscale group-hover:grayscale-0' : ''}`}
        style={{ transition: 'transform 0.2s ease, border-color 0.2s ease, filter 0.2s ease' }}
        onError={e => {
          e.currentTarget.style.display = 'none';
          const fallbackEl = e.currentTarget.nextElementSibling as HTMLElement | null;
          if (fallbackEl) fallbackEl.style.display = 'flex';
        }}
      />
      <div
        style={{ display: 'none' }}
        className={`${className} rounded-full bg-gradient-to-br from-afro-orange to-red-500 items-center justify-center text-white font-heading`}
      >
        {initials}
      </div>
    </div>
  );
};

// Counts a numeric stat value up from 0 once `start` flips true.
const AnimatedNumber: React.FC<{ value: string; start: boolean; duration?: number }> = ({
  value,
  start,
  duration = 1200,
}) => {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplay(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return <>{display}{suffix}</>;
};

// ─── Derived data ─────────────────────────────────────────────────────────────

// Separate aired from upcoming so stats/hero never count unaired episodes.
const airedEpisodes   = episodes.filter(ep => ep.status !== 'upcoming');
const upcomingEpisode = episodes.find(ep => ep.status === 'upcoming') ?? null;

const totalEpisodes = airedEpisodes.length;
const totalMinutes = airedEpisodes.reduce((sum, ep) => {
  const parts = ep.duration.split(':').map(Number);
  return sum + (parts.length === 3 ? parts[0] * 60 + parts[1] : parts[0]);
}, 0);
const totalHours = Math.floor(totalMinutes / 60);

// Two stats only — episodes and hours (founders ≈ episodes numerically, so removed).
const stats = [
  { value: String(totalEpisodes), label: 'Episodes Released' },
  { value: `${totalHours}+`,     label: 'Hours of Conversation' },
];

const latestEpisode = airedEpisodes[0];

const uniqueGuests = airedEpisodes
  .filter(ep => ep.guest && ep.guestHandle)
  .reduce(
    (acc: { name: string; handle: string; project: string; image: string }[], ep) => {
      if (!acc.find(g => g.handle === ep.guestHandle)) {
        acc.push({ name: ep.guest, handle: ep.guestHandle, project: ep.project, image: ep.guestImage });
      }
      return acc;
    },
    []
  );

const guestXUrls: Record<string, string> = {
  '@kagondu_yvonne': 'https://x.com/kagondu_yvonne',
  '@airbillspay':    'https://x.com/airbillspay',
  '@findy_dev':      'https://x.com/findy_dev',
  '@0xchef__':       'https://x.com/0xchef__',
  '@_mtchy_':        'https://x.com/_mtchy_',
  '@israel_igboze':  'https://x.com/israel_igboze',
  '@mrboqer':        'https://x.com/mrboqer',
  '@W1nszn':         'https://x.com/W1nszn',
  '@prosper_ayere':  'https://x.com/prosper_ayere',
  '@blockchain_Josh':'https://x.com/blockchain_Josh',
  '@Tobi_Builder':   'https://x.com/Tobi_Builder',
  '@AtoyebiOlawale4':'https://x.com/AtoyebiOlawale4',
  '@SarahWahinya':   'https://x.com/SarahWahinya',
  '@monipay_xyz':    'https://x.com/monipay_xyz',
  '@headlineodds':   'https://x.com/headlineodds',
  '@Payfrica':       'https://x.com/Payfrica',
  '@sol_pollinet':   'https://x.com/sol_pollinet',
  '@Clapmihq':       'https://x.com/Clapmihq',
  '@giddycodes':     'https://x.com/giddycodes',
};

const DEFAULT_VISIBLE = 8;
const GUESTS_COLLAPSED = 12; // 2 rows on desktop (6 cols) before the Past Guests grid expands

// Inline style for scroll-reveal: only animates transform + opacity.
// Uses duration 0.45 s (≤ 0.5 s cap) and max 24 px reveal distance.
const revealStyle = (
  visible: boolean,
  delayMs = 0,
  transform: 'translateY' | 'scale' = 'translateY'
): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible
    ? transform === 'scale' ? 'scale(1)' : 'translateY(0)'
    : transform === 'scale' ? 'scale(0.96)' : 'translateY(24px)',
  transition: `opacity 0.45s ease-out ${delayMs}ms, transform 0.45s ease-out ${delayMs}ms`,
});

// ─── Page component ───────────────────────────────────────────────────────────

const MediaPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);
  const [showAllGuests, setShowAllGuests] = useState(false);
  const [showMobileList, setShowMobileList] = useState(false);
  const [mobileCardIdx, setMobileCardIdx] = useState(0);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [miniPlayerDismissed, setMiniPlayerDismissed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { ref: statsRef,    inView: statsVis    } = useInView();
  const { ref: aboutRef,    inView: aboutVis    } = useInView();
  const { ref: episodesRef, inView: episodesVis } = useInView();
  const { ref: hostsRef,    inView: hostsVis    } = useInView();
  const { ref: guestsRef,   inView: guestsVis   } = useInView();
  const { ref: ctaRef,      inView: ctaVis      } = useInView();

  // Mini-player appears once the visitor scrolls past the hero's episode card.
  useEffect(() => {
    const onScroll = () => setShowMiniPlayer(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll when preview modal is open; close on Escape.
  useEffect(() => {
    if (!selectedEpisode) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedEpisode(null); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedEpisode]);

  // Reset pagination when filter/search changes.
  useEffect(() => {
    setShowAll(false);
    setShowMobileList(false);
    setMobileCardIdx(0);
    if (mobileCarouselRef.current) mobileCarouselRef.current.scrollLeft = 0;
  }, [activeCategory, searchQuery]);

  const handleCarouselScroll = useCallback(() => {
    const el = mobileCarouselRef.current;
    if (!el || el.scrollWidth === el.clientWidth) return;
    const count = el.children.length;
    if (count === 0) return;
    const cardWidth = el.scrollWidth / count;
    setMobileCardIdx(Math.min(count - 1, Math.round(el.scrollLeft / cardWidth)));
  }, []);

  const filteredEpisodes = airedEpisodes.filter(ep => {
    const cat = FILTER_CATEGORIES.find(c => c.label === activeCategory);
    const matchesCategory = !cat?.tags || ep.tags.some(t => (cat.tags as readonly string[]).includes(t));
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      ep.title.toLowerCase().includes(q) ||
      ep.guest.toLowerCase().includes(q) ||
      ep.project.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const visibleEpisodes = showAll ? filteredEpisodes : filteredEpisodes.slice(0, DEFAULT_VISIBLE);

  // Add bottom padding on mobile when mini-player is visible so the footer
  // can scroll fully into view and isn't permanently covered.
  const miniPlayerActive = showMiniPlayer && !miniPlayerDismissed;

  return (
    <main style={{ paddingBottom: miniPlayerActive ? 'max(0px, 96px)' : undefined }}>
      <PageMeta
        title="Onchain Africa — Live Interviews with African Web3 Founders | AfroPlay"
        description="Onchain Africa is a live interview series spotlighting African Web3 founders and builders. 25+ episodes covering payments, gaming, DeFi and infrastructure. Hosted by Web3bull."
        canonical="https://afroplay.org/media"
        ogImage="https://afroplay.org/og/media.svg"
      />
      <JsonLd data={mediaPageSchema} />
      <JsonLd data={mediaFaqSchema} />

      {/* ── Sticky mini-player ── appears after scrolling past hero; bottom-left to
          avoid collision with the global "Play Music" button (hidden on /media). */}
      {miniPlayerActive && (
        <div
          className="fixed left-4 z-40 flex items-center gap-3 bg-afro-card border border-afro-orange/20 rounded-xl shadow-2xl shadow-black/50 p-3 pr-2 w-[calc(100vw-2rem)] sm:left-6 sm:w-auto sm:max-w-xs sm:pr-4 anim-fade-in"
          style={{ bottom: 'max(16px, calc(16px + env(safe-area-inset-bottom)))' }}
        >
          <img
            src={`https://img.youtube.com/vi/${latestEpisode.videoId}/hqdefault.jpg`}
            alt={latestEpisode.title}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-afro-orange text-[10px] font-bold uppercase tracking-wider">Latest Episode</p>
            <p className="text-white text-xs font-semibold truncate">{latestEpisode.title}</p>
          </div>
          {/* Play button — 44×44 tap target */}
          <a
            href={latestEpisode.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch on YouTube"
            className="w-11 h-11 rounded-full bg-afro-orange hover:bg-orange-600 flex items-center justify-center flex-shrink-0 transition-colors"
          >
            <Play size={14} className="text-white ml-0.5" fill="white" />
          </a>
          {/* Dismiss button — 44×44 tap target */}
          <button
            type="button"
            onClick={() => setMiniPlayerDismissed(true)}
            aria-label="Dismiss mini player"
            className="w-11 h-11 flex items-center justify-center text-zinc-500 hover:text-white transition-colors flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ─── HERO ─── */}
      <section id="about" className="relative flex items-center overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-afro-card via-afro-bg to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,0,0.14),transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-afro-bg via-afro-bg/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left — title, tagline, host, CTAs */}
          <div className="flex-1 max-w-xl space-y-6">
            <div className="flex flex-wrap items-center gap-3 anim-slide-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-afro-orange/30 bg-afro-orange/10 text-afro-orange text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-afro-orange animate-pulse" />
                Latest Episode — Onchain Africa
              </div>
              {upcomingEpisode && (
                <a
                  href={upcomingEpisode.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Next Live — July 6, 1:00 PM
                </a>
              )}
            </div>

            <h1 className="text-6xl md:text-7xl font-heading leading-[0.95] anim-slide-up anim-d2">
              ONCHAIN<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-afro-orange to-red-500 neon-text">
                AFRICA
              </span>
            </h1>

            <p className="text-zinc-400 max-w-xl leading-relaxed anim-fade-in anim-d3">
              Live, unscripted conversations with the African Web3 founders building the continent's onchain future.
            </p>

            <div className="flex flex-wrap items-center gap-4 anim-fade-in anim-d4">
              <img
                src="/team/web3bull.jpg"
                alt="Web3bull, Founder and Host of Onchain Africa"
                fetchPriority="high"
                className="w-14 h-14 rounded-full border-2 border-afro-orange object-cover bg-gray-800 shadow-[0_0_20px_rgba(255,107,0,0.3)]"
              />
              <div>
                <p className="text-white font-bold">Web3bull</p>
                <p className="text-zinc-400 text-sm">Founder &amp; Host — Onchain Africa</p>
              </div>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-white/10">
                {platforms.map(p => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={p.name}
                    className="w-11 h-11 flex items-center justify-center text-zinc-500 hover:text-afro-orange transition-colors"
                  >
                    <p.Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 anim-slide-up anim-d5">
              <a
                href="#episodes"
                className="px-8 py-4 bg-afro-orange hover:bg-orange-600 rounded-lg text-white font-bold flex items-center gap-2 transition-colors neon-box"
              >
                See Episodes <PlayCircle size={20} />
              </a>
              <a
                href="#featured"
                className="px-8 py-4 border border-white/20 hover:border-afro-orange/50 hover:bg-afro-orange/5 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                Get Featured <ArrowRight size={20} />
              </a>
            </div>
          </div>

          {/* Right — latest episode preview card */}
          <div className="flex-1 flex justify-center md:justify-end w-full anim-scale-in anim-d4">
            <div className="relative max-w-[420px] w-full">
              <div className="absolute -top-3 left-4 z-10 bg-afro-orange text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Latest Episode
              </div>

              <a
                href={latestEpisode.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden border border-afro-orange/20 bg-afro-card shadow-2xl shadow-afro-orange/5 hover:border-afro-orange/40 transition-colors duration-300 group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${latestEpisode.videoId}/maxresdefault.jpg`}
                    onError={handleThumbnailError}
                    alt={latestEpisode.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-afro-orange flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-600 transition-transform duration-300 shadow-lg shadow-afro-orange/40">
                      <Play className="w-6 h-6 text-white ml-1" fill="white" />
                    </div>
                  </div>

                  <span className="absolute top-3 left-3 bg-afro-orange text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    EP {latestEpisode.id}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                    {latestEpisode.duration}
                  </span>
                </div>

                <div className="p-4 flex items-center gap-3">
                  <GuestAvatar name={latestEpisode.guest} image={latestEpisode.guestImage} className="w-10 h-10 text-xs flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium line-clamp-2 leading-snug">{latestEpisode.title}</p>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      {latestEpisode.guest}{latestEpisode.project && ` · ${latestEpisode.project}`}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 flex gap-2 flex-wrap">
                  {latestEpisode.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-afro-orange bg-afro-orange/10 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LISTEN ON ─── */}
      <section className="py-12 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-zinc-500 text-xs uppercase tracking-widest mb-6">Listen &amp; Watch On</p>
          <div className="flex flex-nowrap items-center justify-center gap-3 md:flex-wrap md:gap-10 overflow-x-auto md:overflow-visible no-scrollbar">
            {platforms.map(p => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-0 md:gap-3 text-zinc-400 hover:text-white transition-colors group flex-shrink-0"
                aria-label={p.name}
              >
                <span className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-afro-orange group-hover:border-afro-orange/40 group-hover:bg-afro-orange/10 transition-colors">
                  <p.Icon size={20} />
                </span>
                <span className="hidden md:inline font-semibold text-sm">{p.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <section className="border-b border-white/10 bg-white/[0.03] py-10">
        <div ref={statsRef} className="max-w-2xl mx-auto px-6 grid grid-cols-2 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={stat.label} style={revealStyle(statsVis, i * 80)}>
              <p className="text-3xl font-heading text-afro-orange mb-1">
                <AnimatedNumber value={stat.value} start={statsVis} />
              </p>
              <p className="text-zinc-400 text-xs uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT THE SHOW ─── */}
      <section className="py-16 md:py-24 bg-afro-bg relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url("${kentePatternUrl}")`, backgroundSize: '64px 64px' }}
        />
        <div
          ref={aboutRef}
          className="max-w-3xl mx-auto px-6 text-center relative z-10"
          style={revealStyle(aboutVis)}
        >
          <p className="text-afro-orange text-xs font-bold uppercase tracking-widest mb-4">About the Show</p>
          <h2 className="text-4xl font-heading text-white mb-6">
            Where African Web3 founders get their global stage
          </h2>
          <p className="text-zinc-400 leading-relaxed text-[15px]">
            Onchain Africa is a live interview series for African Web3 founders and builders — unscripted
            conversations that amplify the voices of African innovators. Onchain Africa exists to close the
            visibility gap, one live conversation at a time.
          </p>
        </div>
      </section>

      {/* ─── EPISODES ─── */}
      <section id="episodes" className="py-16 md:py-24 bg-black/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-afro-orange text-xs font-bold uppercase tracking-widest mb-4">Episodes</p>
            <h2 className="text-4xl font-heading text-white">Latest Episodes</h2>
            <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
              Real conversations with the founders building African Web3.
            </p>
          </div>

          {/* Search + curated filter chips */}
          <div className="mb-12 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by guest, project, or title..."
                className="w-full bg-white/5 border border-white/10 focus:border-afro-orange/50 rounded-full pl-11 pr-10 py-3 text-white placeholder-zinc-500 outline-none transition-colors"
                style={{ fontSize: '16px' }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Single-row chip strip: no wrap on desktop, scrollable on mobile */}
            <div className="relative">
            <div className="flex gap-2 overflow-x-auto pb-1 md:justify-center no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
              {FILTER_CATEGORIES.map(cat => (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setActiveCategory(cat.label)}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold transition-colors flex-shrink-0 ${
                    activeCategory === cat.label
                      ? 'bg-afro-orange text-white'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {/* Right-edge fade — hints that the chip row is scrollable on mobile */}
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-black/60 to-transparent pointer-events-none md:hidden" />
            </div>
          </div>{/* end mb-12 space-y-4 */}

          {filteredEpisodes.length === 0 ? (
            <p className="text-center text-zinc-500 py-16">
              No episodes match{searchQuery ? ` "${searchQuery}"` : ''}{activeCategory !== 'All' ? ` in ${activeCategory}` : ''}.
            </p>
          ) : (
            <>
              {/* ── Mobile: horizontal snap carousel ── */}
              {!showMobileList && (
                <div className="md:hidden">
                  <div
                    ref={mobileCarouselRef}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 pl-4 pb-4 no-scrollbar"
                    style={{ scrollPaddingLeft: '16px', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
                    onScroll={handleCarouselScroll}
                  >
                    {filteredEpisodes.map(ep => (
                      <button
                        type="button"
                        key={ep.id}
                        onClick={() => setSelectedEpisode(ep)}
                        className="flex-none w-[82vw] snap-start text-left bg-afro-card border border-white/5 rounded-2xl overflow-hidden hover:border-afro-orange/30 group relative"
                      >
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-afro-orange to-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                        <div className="aspect-video bg-black relative overflow-hidden">
                          <img
                            src={`https://img.youtube.com/vi/${ep.videoId}/maxresdefault.jpg`}
                            onError={handleThumbnailError}
                            alt={ep.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <PlayCircle className="w-10 h-10 text-white" />
                          </div>
                          {ep.duration && (
                            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                              <Clock size={10} /> {ep.duration}
                            </span>
                          )}
                        </div>
                        <div className="p-5">
                          <span className="text-xs font-bold text-afro-orange bg-afro-orange/10 border border-afro-orange/20 px-3 py-1 rounded-full">
                            EP #{String(ep.id).padStart(3, '0')}
                          </span>
                          <h3 className="text-white font-bold text-sm mt-4 mb-2 leading-snug line-clamp-2">{ep.title}</h3>
                          <div className="flex items-center gap-2 mb-4">
                            <GuestAvatar name={ep.guest} image={ep.guestImage} className="w-8 h-8 text-[10px] flex-shrink-0" />
                            <p className="text-zinc-400 text-xs">{ep.guest}{ep.project && ` — ${ep.project}`}</p>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex gap-1.5 flex-wrap">
                              {ep.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full">{tag}</span>
                              ))}
                            </div>
                            <span className="text-afro-orange text-xs font-semibold flex items-center gap-1 flex-shrink-0">
                              Preview <ArrowRight size={11} />
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Counter + expand */}
                  <div className="flex items-center justify-between px-4 mt-2">
                    <span className="text-zinc-500 text-xs">{mobileCardIdx + 1} / {filteredEpisodes.length}</span>
                    <button
                      type="button"
                      onClick={() => setShowMobileList(true)}
                      className="text-afro-orange text-xs font-semibold flex items-center gap-1"
                    >
                      See all episodes <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile expanded list */}
              {showMobileList && (
                <div className="md:hidden">
                  <div className="grid gap-4 mb-6">
                    {filteredEpisodes.map(ep => (
                      <button
                        type="button"
                        key={ep.id}
                        onClick={() => setSelectedEpisode(ep)}
                        className="text-left bg-afro-card border border-white/5 rounded-2xl overflow-hidden hover:border-afro-orange/30 group relative flex gap-3 p-3"
                      >
                        <div className="w-24 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-black relative">
                          <img
                            src={`https://img.youtube.com/vi/${ep.videoId}/hqdefault.jpg`}
                            onError={handleThumbnailError}
                            alt={ep.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <span className="text-[10px] font-bold text-afro-orange mb-1">EP #{String(ep.id).padStart(3, '0')}</span>
                          <p className="text-white font-semibold text-xs leading-snug line-clamp-2 mb-1">{ep.title}</p>
                          <p className="text-zinc-400 text-[10px]">{ep.guest}{ep.project && ` — ${ep.project}`}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => { setShowMobileList(false); if (mobileCarouselRef.current) mobileCarouselRef.current.scrollLeft = 0; setMobileCardIdx(0); }}
                    className="w-full py-3 border border-white/10 hover:border-afro-orange/30 text-zinc-400 hover:text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    ← Back to carousel
                  </button>
                </div>
              )}

              {/* ── Desktop: grid ── */}
              <div ref={episodesRef} className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleEpisodes.map((ep, i) => (
                  <button
                    type="button"
                    key={ep.id}
                    id={`episode-${ep.id}`}
                    onClick={() => setSelectedEpisode(ep)}
                    className="text-left bg-afro-card border border-white/5 rounded-2xl overflow-hidden hover:border-afro-orange/30 group relative"
                    style={{
                      ...revealStyle(episodesVis, (i % DEFAULT_VISIBLE) * 50),
                      transition: `opacity 0.45s ease-out ${(i % DEFAULT_VISIBLE) * 50}ms, transform 0.45s ease-out ${(i % DEFAULT_VISIBLE) * 50}ms, border-color 0.2s ease`,
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-afro-orange to-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <div className="aspect-video bg-black relative overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${ep.videoId}/maxresdefault.jpg`}
                        onError={handleThumbnailError}
                        alt={ep.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <PlayCircle className="w-10 h-10 text-white" />
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock size={10} /> {ep.duration}
                      </span>
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold text-afro-orange bg-afro-orange/10 border border-afro-orange/20 px-3 py-1 rounded-full">
                        EP #{String(ep.id).padStart(3, '0')}
                      </span>
                      <h3 className="text-white font-bold text-sm mt-4 mb-2 leading-snug line-clamp-2">{ep.title}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <GuestAvatar name={ep.guest} image={ep.guestImage} className="w-8 h-8 text-[10px] flex-shrink-0" />
                        <p className="text-zinc-400 text-xs">{ep.guest}{ep.project && ` — ${ep.project}`}</p>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex gap-1.5 flex-wrap">
                          {ep.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>
                        <span className="text-afro-orange text-xs font-semibold flex items-center gap-1 flex-shrink-0">
                          Preview <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {filteredEpisodes.length > DEFAULT_VISIBLE && (
            <div className="hidden md:block text-center mt-12">
              <button
                type="button"
                onClick={() => setShowAll(prev => !prev)}
                className="px-8 py-3 border border-white/20 hover:border-afro-orange/50 hover:bg-afro-orange/5 text-white rounded-lg font-semibold transition-colors"
              >
                {showAll ? 'Show Fewer' : `View All Episodes (${filteredEpisodes.length})`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── HOST ─── */}
      <section id="hosts" className="py-16 md:py-24 bg-afro-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-afro-orange text-xs font-bold uppercase tracking-widest mb-4">The Voice</p>
            <h2 className="text-4xl font-heading text-white">Meet Your Host</h2>
          </div>

          <div ref={hostsRef} className="flex justify-center">
            {hosts.map(host => (
              <div
                key={host.name}
                className="bg-afro-card border border-white/10 rounded-3xl p-8 hover:border-afro-orange/30 transition-colors text-center group max-w-sm w-full"
                style={revealStyle(hostsVis, 0, 'scale')}
              >
                {/* Static glow — no animated box-shadow */}
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-afro-orange shadow-[0_0_25px_rgba(255,107,0,0.25)] mb-6">
                  <img src={host.avatarUrl} alt={host.name} className="w-full h-full object-cover bg-gray-800" />
                </div>
                <h3 className="text-white font-heading text-2xl mb-1">{host.name}</h3>
                <p className="text-afro-orange text-xs font-bold uppercase tracking-widest mb-5">{host.role}</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">{host.bio}</p>
                <span className="inline-flex items-center gap-1.5 text-zinc-500 text-xs bg-black/50 px-3 py-1.5 rounded-full">
                  <XIcon size={12} />
                  {host.handle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PAST GUESTS ─── */}
      <section className="py-16 md:py-24 bg-black/30 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url("${kentePatternUrl}")`, backgroundSize: '64px 64px' }}
        />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-afro-orange text-xs font-bold uppercase tracking-widest mb-4">Alumni</p>
          <h2 className="text-4xl font-heading text-white mb-4">Past Guests</h2>
          <p className="text-zinc-400 mb-12 max-w-xl mx-auto">
            African Web3 founders who've shared their story on Onchain Africa.
          </p>

          <div ref={guestsRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-4xl mx-auto mb-10">
            {(showAllGuests ? uniqueGuests : uniqueGuests.slice(0, GUESTS_COLLAPSED)).map((g, i) => {
              const xUrl = guestXUrls[g.handle];
              const content = (
                <>
                  <GuestAvatar name={g.name} image={g.image} showGrayscale />
                  <span className="text-white text-[11px] font-semibold text-center leading-tight group-hover:text-afro-orange transition-colors">
                    {g.name}
                  </span>
                  {g.project && (
                    <span className="text-zinc-400 text-[10px] text-center">{g.project}</span>
                  )}
                </>
              );
              const sharedStyle: React.CSSProperties = {
                ...revealStyle(guestsVis, (i % 12) * 40),
                transition: `opacity 0.45s ease-out ${(i % 12) * 40}ms, transform 0.45s ease-out ${(i % 12) * 40}ms`,
              };
              const sharedClass = 'flex flex-col items-center gap-2 group';

              return xUrl ? (
                <a key={g.handle} href={xUrl} target="_blank" rel="noopener noreferrer" className={sharedClass} style={sharedStyle}>
                  {content}
                </a>
              ) : (
                <div key={g.handle} className={sharedClass} style={sharedStyle}>
                  {content}
                </div>
              );
            })}
          </div>

          {uniqueGuests.length > GUESTS_COLLAPSED && (
            <button
              type="button"
              onClick={() => setShowAllGuests(prev => !prev)}
              className="px-8 py-3 border border-white/20 hover:border-afro-orange/50 hover:bg-afro-orange/5 text-white rounded-lg font-semibold transition-colors"
            >
              {showAllGuests ? 'Show Fewer' : `Show All Guests (${uniqueGuests.length})`}
            </button>
          )}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      {/* Static 3-column grid — no marquee, no duplicate cards, no scroll jank. */}
      <section className="py-16 md:py-24 bg-afro-bg">
        {/* TODO: Replace with real guest testimonials when collected */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-afro-orange text-xs font-bold uppercase tracking-widest mb-4">What Guests Say</p>
            <h2 className="text-4xl font-heading text-white">Straight From the Founders</h2>
          </div>

          {/* Mobile: swipe carousel */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pl-4 pb-4 no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
            {testimonials.map(t => (
              <div
                key={t.guest}
                className="flex-none w-[85vw] snap-start bg-afro-card border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
              >
                <Quote className="w-6 h-6 text-afro-orange/60" />
                <p className="text-zinc-300 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <GuestAvatar name={t.guest} image={t.image} className="w-10 h-10 text-xs flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold">{t.guest}</p>
                    <p className="text-zinc-400 text-xs">{t.project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Swipe dots */}
          <div className="flex justify-center gap-2 mt-3 md:hidden">
            {testimonials.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/25" />
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div
                key={t.guest}
                className="bg-afro-card border border-white/10 rounded-2xl p-7 flex flex-col gap-5"
              >
                <Quote className="w-7 h-7 text-afro-orange/60" />
                <p className="text-zinc-300 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5 group">
                  <GuestAvatar name={t.guest} image={t.image} className="w-10 h-10 text-xs flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold">{t.guest}</p>
                    <p className="text-zinc-400 text-xs">{t.project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GET FEATURED CTA ─── */}
      <section id="featured" className="py-16 md:py-24 bg-afro-bg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-afro-orange/8 rounded-full blur-[120px]" />
        </div>

        <div ref={ctaRef} className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-afro-orange/30 bg-afro-orange/10 text-afro-orange text-xs font-bold uppercase tracking-widest mb-8"
            style={revealStyle(ctaVis)}
          >
            <Mic size={12} />
            Apply to be a Guest
          </div>

          <h2
            className="text-5xl md:text-6xl font-heading text-white mb-4 leading-tight"
            style={revealStyle(ctaVis, 80)}
          >
            ARE YOU BUILDING<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-afro-orange to-red-500 neon-text">
              IN AFRICAN WEB3?
            </span>
          </h2>

          <p
            className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed"
            style={revealStyle(ctaVis, 120)}
          >
            We want to tell your story. Get featured on Onchain Africa and share your project with
            thousands of Web3 natives across the globe.
          </p>

          {/* Two equal-weight CTAs side by side — 2-col on all sizes */}
          <div
            className="grid grid-cols-2 gap-3 md:gap-5 max-w-2xl mx-auto"
            style={revealStyle(ctaVis, 160, 'scale')}
          >
            {/* Primary — email application */}
            <div className="bg-afro-card border border-afro-orange/20 rounded-2xl p-4 md:p-8 shadow-[0_0_40px_rgba(255,107,0,0.06)] flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-afro-orange/10 border border-afro-orange/20 flex items-center justify-center mb-3 md:mb-5">
                <Mail size={20} className="text-afro-orange" />
              </div>
              <p className="text-white font-bold text-sm md:text-lg mb-1 hidden md:block">connect@afroplay.org</p>
              <p className="text-zinc-400 text-xs md:text-sm mb-4 md:mb-6 flex-1 hidden md:block">Partnerships &amp; Media Inquiries</p>
              <a
                href="mailto:connect@afroplay.org?subject=Onchain Africa - Guest Application"
                className="w-full inline-flex items-center justify-center gap-1 md:gap-2 px-3 md:px-6 py-2.5 md:py-3.5 bg-afro-orange hover:bg-orange-600 rounded-lg text-white font-bold transition-colors neon-box text-xs md:text-base"
              >
                <span className="md:hidden">Get Featured</span>
                <span className="hidden md:inline">Apply to Get Featured</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Secondary — founders-only Telegram */}
            <a
              href="https://t.me/+lxtET5X6LuIzYWU0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-afro-card border border-blue-500/30 rounded-2xl p-4 md:p-8 flex flex-col items-center text-center hover:border-blue-400/60 hover:bg-blue-500/5 transition-colors group shadow-[0_0_40px_rgba(59,130,246,0.06)]"
            >
              <div className="mb-2 md:mb-3 inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                🔒 Founders Only
              </div>

              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-2 md:mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Send size={18} className="text-blue-400" />
              </div>

              <p className="text-white font-bold text-sm md:text-lg mb-1">
                <span className="md:hidden">Founders Circle</span>
                <span className="hidden md:inline">Join the Founders Circle</span>
              </p>
              <p className="text-zinc-400 text-xs md:text-sm mb-4 md:mb-6 flex-1 hidden md:block">
                Private Telegram for African Web3 founders — share resources, get alpha, connect with the community.
              </p>

              <span className="w-full inline-flex items-center justify-center gap-1 md:gap-2 px-3 md:px-6 py-2.5 md:py-3.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold transition-colors group-hover:scale-[1.02] text-xs md:text-base">
                <span className="md:hidden">Join Channel</span>
                <span className="hidden md:inline">Join the Channel</span>
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── EPISODE PREVIEW MODAL ─── */}
      {selectedEpisode && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedEpisode(null)}
        >
          <div
            className="bg-afro-card border border-afro-orange/20 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="aspect-video relative">
              <img
                src={`https://img.youtube.com/vi/${selectedEpisode.videoId}/maxresdefault.jpg`}
                onError={handleThumbnailError}
                alt={selectedEpisode.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedEpisode(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>
              <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <Clock size={10} /> {selectedEpisode.duration}
              </span>
            </div>

            <div className="p-6">
              <span className="text-xs font-bold text-afro-orange bg-afro-orange/10 border border-afro-orange/20 px-3 py-1 rounded-full">
                EP #{String(selectedEpisode.id).padStart(3, '0')}
              </span>

              <h3 className="text-white font-bold text-lg mt-4 mb-3 leading-snug">{selectedEpisode.title}</h3>

              <div className="flex items-center gap-3 mb-4 group">
                <GuestAvatar name={selectedEpisode.guest} image={selectedEpisode.guestImage} className="w-10 h-10 text-xs flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-semibold">{selectedEpisode.guest}</p>
                  {selectedEpisode.project && <p className="text-zinc-400 text-xs">{selectedEpisode.project}</p>}
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mb-6">
                {selectedEpisode.tags.map(tag => (
                  <span key={tag} className="text-xs text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={selectedEpisode.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-afro-orange hover:bg-orange-600 rounded-lg text-white font-bold transition-colors"
              >
                Watch on YouTube <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── FAQ accordion ─── */}
      <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-afro-card border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-afro-orange text-xs font-bold uppercase tracking-widest mb-3">Common Questions</p>
            <h2 id="faq-heading" className="text-3xl font-heading text-white">About Onchain Africa</h2>
          </div>

          <dl className="space-y-3">
            {([
              {
                q: 'What is Onchain Africa?',
                a: 'Onchain Africa is a live interview series by AfroPlay that spotlights African Web3 founders and builders. Hosted by Web3bull, the show features unscripted conversations about how African innovators are building on the blockchain. Onchain Africa has produced 24+ episodes covering payments, gaming, DeFi, NFTs, and infrastructure.',
              },
              {
                q: 'How do I get featured on Onchain Africa?',
                a: 'Founders building Web3 projects in Africa can apply by emailing connect@afroplay.org with the subject "Onchain Africa — Guest Application". You can also join the AfroPlay Founders Circle on Telegram to connect directly with the host and community.',
              },
              {
                q: 'Where can I watch or listen to Onchain Africa?',
                a: 'Onchain Africa episodes are available on YouTube at youtube.com/@AfroPlayStudio. The series is also distributed on Spotify and other major podcast platforms.',
              },
              {
                q: 'Who hosts Onchain Africa?',
                a: 'Onchain Africa is hosted by Web3bull, the founder of AfroPlay. Web3bull created Onchain Africa to amplify the voices of African Web3 builders and close the visibility gap for African founders in the global crypto ecosystem.',
              },
              {
                q: 'What topics does Onchain Africa cover?',
                a: 'Onchain Africa episodes cover DeFi, payments and fintech, NFTs, infrastructure, Web3 gaming, and community building — all through the lens of African Web3 founders solving real problems on the continent.',
              },
            ] as { q: string; a: string }[]).map(({ q, a }, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={q}
                  className="group rounded-2xl overflow-hidden border transition-colors duration-300"
                  style={{ borderColor: isOpen ? 'rgba(255,107,0,0.5)' : 'rgba(255,255,255,0.07)' }}
                >
                  {/* trigger */}
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left transition-colors duration-300"
                    style={{ background: isOpen ? 'rgba(255,107,0,0.08)' : 'transparent' }}
                  >
                    {/* number badge */}
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300"
                      style={{
                        background: isOpen ? '#FF6B00' : 'rgba(255,255,255,0.07)',
                        color: isOpen ? '#fff' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <dt className="flex-1 text-white font-bold text-base leading-snug">{q}</dt>

                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 text-afro-orange transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>

                  {/* collapsible body — CSS grid trick for smooth height */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.35s ease',
                    }}
                  >
                    <div className="overflow-hidden">
                      <dd className="px-6 pb-6 pt-1 text-zinc-400 leading-relaxed text-sm" style={{ paddingLeft: '4.5rem' }}>
                        {a}
                      </dd>
                    </div>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <Contact />
    </main>
  );
};

export default MediaPage;

