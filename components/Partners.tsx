import React from 'react';
import { partners } from '../data/partners';

const Partners: React.FC = () => {
  return (
    <section id="partners" className="py-16 md:py-24 bg-gradient-to-b from-black to-afro-card border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-heading text-center mb-4">PARTNERS</h2>
        <p className="text-center text-zinc-400 mb-14 max-w-2xl mx-auto">
          Afro Play sits at the center of a growing network of game studios, guilds, and communities across Web3 gaming.
        </p>

        {/* Mobile: simple logo grid — the SVG network graph doesn't scale to small screens */}
        <div className="sm:hidden flex flex-wrap justify-center gap-6">
          {partners.map((p) => (
            <div key={p.name} className="flex flex-col items-center gap-2 w-[calc(33.33%-16px)]">
              <div className="w-16 h-16 rounded-full bg-black/80 border border-white/15 overflow-hidden flex items-center justify-center">
                {p.logoUrl ? (
                  <img src={p.logoUrl} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-sm font-bold">{p.short}</span>
                )}
              </div>
              <span className="text-sm text-zinc-200 text-center leading-tight">{p.name}</span>
            </div>
          ))}
        </div>

        {/* Desktop/tablet: hub-and-spoke network graph */}
        <div className="hidden sm:block relative h-[520px] bg-white/5 border border-white/10 rounded-3xl">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {partners.map((partner) => (
              <line
                key={`line-${partner.name}`}
                x1="50" y1="50"
                x2={partner.x} y2={partner.y}
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="0.6"
              />
            ))}
          </svg>

          {/* Hub — AfroPlay logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
            <div className="w-24 h-24 rounded-full bg-black border border-afro-orange/70 shadow-[0_0_25px_rgba(255,107,0,0.35)] flex items-center justify-center">
              <img src="/logo.png" alt="Afro Play" className="w-14 h-14 object-contain" />
            </div>
          </div>

          {/* Partner nodes */}
          {partners.map((partner) => (
            <div
              key={partner.name}
              style={{ left: `${partner.x}%`, top: `${partner.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="w-16 h-16 rounded-full bg-black/80 border border-white/15 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                {partner.logoUrl ? (
                  <img src={partner.logoUrl} alt={partner.name} loading="lazy" className="w-full h-full object-cover" />
                ) : (
                  partner.short
                )}
              </div>
              <span className="block text-sm text-zinc-200 mt-2 text-center">{partner.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Partners;
