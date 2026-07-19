import React from 'react';
import { ArrowRight, Gamepad2, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-afro-bg flex flex-col relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-afro-orange/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-afro-accent/10 rounded-full blur-[80px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-8 md:py-24 relative z-10">
        {/* Logo */}
        <img src="/logo.png" alt="AfroPlay" className="h-12 md:h-20 w-auto mb-3 md:mb-10 hover:opacity-90 transition-opacity anim-fade-in" />

        <div className="text-center mb-4 md:mb-14 space-y-2 md:space-y-4">
          <p className="text-afro-orange text-xs font-bold uppercase tracking-[0.3em] anim-slide-up anim-d1">
            Africa's Web3 Gaming & Media Platform
          </p>
          <h1 className="text-4xl md:text-6xl font-heading text-white leading-tight anim-slide-up anim-d2">
            WHERE DO YOU<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-afro-orange to-red-500 neon-text">
              WANT TO GO?
            </span>
          </h1>
          <p className="hidden md:block text-gray-400 max-w-md mx-auto text-base leading-relaxed anim-fade-in anim-d3">
            AfroPlay unites Africa's most passionate Web3 gamers with the media platform telling their stories. Choose your path.
          </p>
        </div>

        {/* Two path cards — 2-column on all sizes */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 w-full max-w-3xl">
          {/* Gaming */}
          <Link
            to="/gaming"
            className="group relative bg-afro-card border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-10 overflow-hidden hover:border-afro-orange/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,107,0,0.15)] anim-slide-up anim-d4"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-afro-orange to-yellow-500" />
            <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-afro-orange/5 rounded-full blur-[60px] group-hover:bg-afro-orange/10 transition-colors duration-500" />

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
            <span className="inline-flex items-center gap-1 md:gap-2 text-afro-orange font-bold text-[10px] md:text-sm uppercase tracking-wider group-hover:gap-3 md:group-hover:gap-4 transition-all duration-200">
              Enter the Arena <ArrowRight size={12} />
            </span>
          </Link>

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

      {/* pb-24 on mobile gives clearance above the 48px music button fixed bottom-right */}
      <footer className="text-center py-6 pb-24 md:pb-6 text-gray-600 text-xs relative z-10 border-t border-white/5">
        © {new Date().getFullYear()} AfroPlay &nbsp;·&nbsp; Born in the game. Built for the world.
      </footer>
    </div>
  );
};

export default Home;
