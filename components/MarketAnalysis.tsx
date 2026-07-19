import React from 'react';
import { Smartphone, Users, Zap, Coins, LucideIcon } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { marketFeatures, marketQuote } from '../data/market';
import { MarketIconKey } from '../types';

// Maps the icon key stored in data/market.ts to a lucide component.
const MARKET_ICONS: Record<MarketIconKey, LucideIcon> = {
  mobile:  Smartphone,
  culture: Users,
  earn:    Coins,
  viral:   Zap,
};

const MarketAnalysis: React.FC = () => {
  const { ref: headingRef, inView: headingVis } = useInView();
  const { ref: cardsRef,   inView: cardsVis   } = useInView();
  const { ref: quoteRef,   inView: quoteVis   } = useInView();

  return (
    <section id="market" className="py-16 md:py-24 bg-gradient-to-b from-afro-bg to-afro-card relative">
      <div className="max-w-7xl mx-auto px-6">

        <div
          ref={headingRef}
          className="mb-16"
          style={{
            opacity: headingVis ? 1 : 0,
            transform: headingVis ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.45s ease-out, transform 0.45s ease-out',
          }}
        >
          {/* Eyebrow label — presentational, not a heading level */}
          <p className="text-sm font-bold text-afro-orange uppercase tracking-widest mb-2">Market Analysis</p>
          <h2 className="text-4xl md:text-5xl font-heading text-white max-w-2xl">
            Why Africa? Why Now?
          </h2>
          <p className="mt-4 text-zinc-400 max-w-3xl text-lg">
            AfroPlay is an African Web3 gaming and media company that connects game studios with Africa's gaming
            community and runs Onchain Africa, a live interview series for African Web3 founders. Africa is
            quietly becoming one of the world's most exciting frontiers for Web3 gaming — with over{' '}
            <span className="text-white font-bold">60 million active gamers</span>, the appetite is massive.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketFeatures.map((feature, idx) => {
            const Icon = MARKET_ICONS[feature.iconKey];
            return (
              <div
                key={feature.title}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 group"
                style={{
                  opacity: cardsVis ? 1 : 0,
                  transform: cardsVis ? 'translateY(0)' : 'translateY(28px)',
                  // background-color included so hover:bg-white/10 transitions smoothly
                  // despite the inline style override
                  transition: `opacity 0.45s ease-out ${idx * 80}ms, transform 0.45s ease-out ${idx * 80}ms, background-color 0.2s ease`,
                }}
              >
                <div className="bg-black/40 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        <div
          ref={quoteRef}
          className="mt-16 p-8 bg-gradient-to-r from-afro-orange/20 to-transparent border-l-4 border-afro-orange rounded-r-xl"
          style={{
            opacity: quoteVis ? 1 : 0,
            transform: quoteVis ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'opacity 0.45s ease-out, transform 0.45s ease-out',
          }}
        >
          <h4 className="text-2xl font-bold text-white mb-2">{marketQuote.heading}</h4>
          <p className="text-zinc-300 italic">{marketQuote.body}</p>
        </div>

      </div>
    </section>
  );
};

export default MarketAnalysis;
