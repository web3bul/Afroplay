import React from 'react';
import { ArrowRight, Globe2, Flame, Mic, Users, LucideIcon } from 'lucide-react';
import { hero, HeroIconKey } from '../data/hero';
import { DISCORD_URL } from '../lib/constants';

// Maps the icon key stored in data/hero.ts to a lucide component.
const HERO_ICONS: Record<HeroIconKey, LucideIcon> = {
  reach:     Flame,
  spotlight: Mic,
  community: Users,
};

const Hero: React.FC = () => {
  // Scroll-listener removed — it called setScrollY on every RAF frame,
  // triggering constant Hero re-renders. The Africa map CSS float animation
  // (africa-map-float) provides motion without any JS overhead.
  return (
    <section id="about" className="relative min-h-screen flex items-center pt-20 pb-8 overflow-hidden">
      {/* Background — static glows + CSS-animated Africa map */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-afro-orange/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-afro-accent/20 rounded-full blur-[100px]" />

        <div className="absolute right-[-8%] top-1/2 -translate-y-1/2 w-[780px] h-[780px] max-w-[95vw] max-h-[95vw] opacity-25 md:opacity-35">
          <div className="absolute inset-0 rounded-full bg-afro-orange/20 blur-[140px] africa-glow-pulse" />
          <div className="w-full h-full">
            <img
              src="/africa-map.svg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain africa-map-float"
              style={{ filter: 'grayscale(100%) brightness(0.85) contrast(1.1)' }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">

        {/* Left column — tightened from space-y-8 to space-y-5 so CTAs
            stay visible at common laptop heights (1366×768). */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-afro-orange/30 bg-afro-orange/10 text-afro-orange text-xs font-bold uppercase tracking-widest anim-slide-left">
            <Globe2 size={14} />
            {hero.badge}
          </div>

          <h1 className="text-5xl md:text-7xl font-heading leading-tight anim-slide-up anim-d2">
            {hero.headlineLines.map((line) => (
              <React.Fragment key={line}>{line}<br /></React.Fragment>
            ))}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-afro-orange to-red-500 neon-text">
              {hero.headlineAccent}
            </span>
          </h1>

          <div className="space-y-3 text-zinc-300 text-lg anim-slide-up anim-d3">
            {hero.points.map((point) => {
              const Icon = HERO_ICONS[point.icon];
              return (
                <div key={point.text} className="flex items-start gap-3">
                  <Icon className="text-afro-orange flex-shrink-0 mt-1" size={20} />
                  <p>{point.text}</p>
                </div>
              );
            })}
          </div>

          {/* CTAs — pt-4 removed; gap handled by parent space-y-5 */}
          <div className="flex flex-wrap gap-4 anim-slide-up anim-d4">
            <a
              href={hero.primaryCta.href}
              className="px-8 py-4 bg-afro-orange hover:bg-orange-600 rounded-lg text-white font-bold flex items-center gap-2 transition-colors neon-box"
            >
              {hero.primaryCta.label} <ArrowRight size={20} />
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/20 hover:bg-[#5865F2]/20 hover:border-[#5865F2] text-white rounded-lg font-semibold transition-colors flex items-center gap-2 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" className="w-5 h-5 fill-current group-hover:fill-[#5865F2] transition-colors">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22c2.36-24.44-2-47.27-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.18-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              Join Community
            </a>
          </div>
        </div>

        {/* Right column — gamer photo + floating stat card */}
        <div className="relative hidden md:block anim-scale-in anim-d3">
          <div className="absolute inset-0 bg-gradient-to-t from-afro-bg to-transparent z-10" />
          <div className="relative w-full h-[500px] border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-8 neon-box transform rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
              alt="Gamer setup"
              className="w-full h-full object-cover rounded-lg opacity-80"
            />
            <div className="absolute -bottom-6 -left-6 bg-black border border-afro-orange p-5 rounded-xl max-w-[220px] shadow-2xl z-30">
              <p className="text-afro-orange font-bold text-xl mb-1">{hero.statCard.value}</p>
              <p className="text-zinc-400 text-sm">{hero.statCard.caption}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
