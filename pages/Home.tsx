import React from 'react';
import { ArrowRight, Clock, Gamepad2, Mic, PauseCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { airedEpisodes, getEpisodePath, totalEpisodes, totalHours } from '../lib/episodes';

// Newest episodes, linked to their own pages (internal links for crawlers too).
const LATEST_COUNT = 6;
const latestEpisodes = airedEpisodes.slice(0, LATEST_COUNT);

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-afro-bg flex flex-col relative overflow-hidden">
      <PageMeta
        title="Onchain Africa by AfroPlay | African Web3 Founders"
        description={`AfroPlay is home to Onchain Africa: live interviews with the African Web3 founders building payments, DeFi and more. Watch all ${totalEpisodes} episodes free.`}
        canonical="https://afroplay.org/"
      />
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-afro-orange/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-afro-accent/10 rounded-full blur-[80px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-8 md:py-24 relative z-10">
        {/* Logo */}
        <img src="/logo.png" alt="AfroPlay" width={80} height={80} className="h-12 md:h-20 w-auto mb-3 md:mb-10 hover:opacity-90 transition-opacity anim-fade-in" />

        <div className="text-center mb-4 md:mb-14 space-y-2 md:space-y-4">
          <p className="text-afro-orange text-xs font-bold uppercase tracking-[0.3em] anim-slide-up anim-d1">
            Onchain Africa by AfroPlay
          </p>
          <h1 className="font-heading text-white leading-tight anim-slide-up anim-d2">
            <span className="block text-4xl md:text-6xl">ONCHAIN AFRICA</span>
            <span className="block text-xl md:text-3xl mt-1 md:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-afro-orange to-red-500 neon-text">
              Interviews with African Web3 Founders
            </span>
          </h1>
          <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base leading-relaxed anim-fade-in anim-d3">
            Live, unscripted conversations with the builders shaping the continent's onchain economy. The Gaming Guild is on a short break.
          </p>
        </div>

        {/* Two path cards — 2-column on all sizes */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 w-full max-w-3xl">
          {/* Gaming — PAUSED. Rendered as a non-interactive, dimmed card with a
              "Gaming Guild Currently Paused" overlay. Not a <Link>, so there is
              no way through to /gaming from here. Swap this block back to the
              original <Link to="/gaming"> to re-open the guild. */}
          <div
            aria-disabled="true"
            title="Gaming Guild currently paused"
            className="group relative bg-afro-card border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-10 overflow-hidden cursor-not-allowed select-none anim-slide-up anim-d4"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/25 to-white/5" />

            {/* Original card content, dimmed */}
            <div className="opacity-25 grayscale pointer-events-none">
              <Gamepad2 className="w-8 h-8 md:w-12 md:h-12 text-afro-orange mb-2 md:mb-6" />
              <h2 className="text-base md:text-3xl font-heading text-white mb-1 md:mb-3">Gaming</h2>
              <p className="text-gray-400 mb-3 md:mb-8 leading-tight md:leading-relaxed text-xs md:text-sm line-clamp-2">
                Africa's most passionate Web3 gaming community. 60M+ gamers ready to champion your game.
              </p>
              <div className="hidden md:flex flex-wrap gap-2 mb-8">
                {['Web3 Gaming', 'Community', 'Onboarding', 'Partnerships'].map(tag => (
                  <span key={tag} className="text-xs text-afro-orange bg-afro-orange/10 border border-afro-orange/20 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 md:gap-2 text-afro-orange font-bold text-[10px] md:text-sm uppercase tracking-wider">
                Enter the Arena <ArrowRight size={12} />
              </span>
            </div>

            {/* Paused overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 md:gap-3 px-3 text-center bg-black/60 backdrop-blur-[2px]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-afro-orange/40 bg-afro-orange/10 px-2.5 py-1 md:px-4 md:py-1.5">
                <PauseCircle size={13} className="text-afro-orange" />
                <span className="text-afro-orange font-bold uppercase tracking-widest text-[9px] md:text-xs">Paused</span>
              </span>
              <h3 className="font-heading text-white text-sm md:text-2xl leading-tight">
                Gaming Guild<br />Currently Paused
              </h3>
              <p className="hidden md:block text-gray-400 text-xs md:text-sm max-w-[15rem] leading-relaxed">
                We're regrouping. Onchain Africa is live — head there in the meantime.
              </p>
            </div>
          </div>

          {/* Media */}
          <Link
            to="/media"
            className="group relative bg-afro-card border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-10 overflow-hidden hover:border-afro-orange/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,107,0,0.1)] anim-slide-up anim-d5"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-afro-orange/60 to-red-500" />
            <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-afro-orange/5 rounded-full blur-[60px] group-hover:bg-afro-orange/8 transition-colors duration-500" />

            <Mic className="w-8 h-8 md:w-12 md:h-12 text-afro-orange mb-2 md:mb-6" />
            <h2 className="text-base md:text-3xl font-heading text-white mb-1 md:mb-3">Onchain Africa</h2>
            <p className="text-gray-400 mb-3 md:mb-8 leading-tight md:leading-relaxed text-xs md:text-sm line-clamp-2">
              Africa's Web3 media series. Live interviews. Real builders. A global stage for founders.
            </p>
            <div className="hidden md:flex flex-wrap gap-2 mb-8">
              {['Live Interviews', 'Web3 Media', 'Builder Spotlight', 'African Stories'].map(tag => (
                <span key={tag} className="text-xs text-afro-orange/80 bg-afro-orange/10 border border-afro-orange/20 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 md:gap-2 text-afro-orange font-bold text-[10px] md:text-sm uppercase tracking-wider group-hover:gap-3 md:group-hover:gap-4 transition-all duration-200">
              Watch the Show <ArrowRight size={12} />
            </span>
          </Link>
        </div>
      </div>

      {/* About — visible, crawlable copy describing what the site actually is.
          Counts are computed from data/episodes.ts at build time. */}
      <section aria-labelledby="about-heading" className="relative z-10 px-4 md:px-6 py-14 md:py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-afro-orange text-xs font-bold uppercase tracking-widest mb-4">About AfroPlay</p>
          <h2 id="about-heading" className="text-2xl md:text-4xl font-heading text-white mb-6">
            The media home of Onchain Africa
          </h2>
          <div className="space-y-4 text-gray-400 leading-relaxed text-[15px]">
            <p>
              AfroPlay is the media home of Onchain Africa, a live interview series with the African
              Web3 founders and builders changing how people across the continent pay, save, trade and
              play onchain. Hosted by Web3bull, each episode is an unscripted conversation about what a
              founder is building, the problem it solves for African users, and what it really takes to
              ship.
            </p>
            <p>
              So far Onchain Africa has released <strong className="text-white">{totalEpisodes} episodes</strong>{' '}
              and more than <strong className="text-white">{totalHours} hours of conversation</strong>.
              Guests have covered stablecoin payments and remittances, DeFi and onchain savings, crypto
              trading tools, real-world assets, developer infrastructure, security and Web3 gaming. Every
              episode has its own page on this site with the full video, the guest and their project, and
              links to related conversations.
            </p>
            <p>
              AfroPlay started as a Web3 gaming guild for African players. The guild is paused while we
              focus on Onchain Africa. If you're building in African Web3,{' '}
              <Link to="/media#featured" className="text-afro-orange hover:underline">apply to be a guest on the show</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Latest episodes — internal links to the newest episode pages. */}
      <section aria-labelledby="latest-heading" className="relative z-10 px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 id="latest-heading" className="text-2xl md:text-4xl font-heading text-white">Latest episodes</h2>
            <Link to="/media#episodes" className="text-afro-orange text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all flex-shrink-0">
              All {totalEpisodes} episodes <ArrowRight size={14} />
            </Link>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestEpisodes.map(ep => (
              <li key={ep.id}>
                <Link
                  to={getEpisodePath(ep)}
                  className="group block h-full bg-afro-card border border-white/5 rounded-2xl overflow-hidden hover:border-afro-orange/30 transition-colors"
                >
                  <div className="aspect-video bg-black relative overflow-hidden">
                    <img
                      src={`https://i.ytimg.com/vi/${ep.videoId}/hqdefault.jpg`}
                      alt={ep.title}
                      width={480}
                      height={360}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock size={10} /> {ep.duration}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-afro-orange">EP #{String(ep.id).padStart(3, '0')}</span>
                    <h3 className="text-white font-bold text-sm mt-2 mb-2 leading-snug line-clamp-2 group-hover:text-afro-orange transition-colors">
                      {ep.title}
                    </h3>
                    <p className="text-zinc-400 text-xs">{ep.guest}{ep.project && ` · ${ep.project}`}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* pb-24 on mobile gives clearance above the 48px music button fixed bottom-right */}
      <footer className="text-center py-6 pb-24 md:pb-6 text-gray-600 text-xs relative z-10 border-t border-white/5">
        © {new Date().getFullYear()} AfroPlay &nbsp;·&nbsp; Born in the game. Built for the world.
      </footer>
    </div>
  );
};

export default Home;
