import React from 'react';
import { BookOpen, Rocket, Share2, PlayCircle, LucideIcon } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { serviceCards, serviceBenefits } from '../data/services';
import { ServiceIconKey } from '../types';

// Maps the icon key stored in data/services.ts to a lucide component.
const SERVICE_ICONS: Record<ServiceIconKey, LucideIcon> = {
  educate:    BookOpen,
  onboard:    Rocket,
  visibility: Share2,
  story:      PlayCircle,
};

const Services: React.FC = () => {
  const { ref: headingRef,  inView: headingVis  } = useInView();
  const { ref: cardsRef,    inView: cardsVis    } = useInView();
  const { ref: benefitsRef, inView: benefitsVis } = useInView();

  return (
    <section id="services" className="py-16 md:py-24 bg-afro-bg relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-6">

        <div
          ref={headingRef}
          className="text-center mb-16"
          style={{
            opacity: headingVis ? 1 : 0,
            transform: headingVis ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.45s ease-out, transform 0.45s ease-out',
          }}
        >
          <h2 className="text-4xl font-heading text-white">Our Role in the Ecosystem</h2>
          <p className="text-zinc-400 mt-4">We do more than just connect players to games.</p>
        </div>

        {/* Cards — reveal wrapper + hover-transform inner (avoids inline-style conflict) */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceCards.map((card, i) => {
            const Icon = SERVICE_ICONS[card.iconKey];
            return (
              <div
                key={card.title}
                style={{
                  opacity: cardsVis ? 1 : 0,
                  transform: cardsVis ? 'translateY(0)' : 'translateY(28px)',
                  transition: `opacity 0.45s ease-out ${i * 80}ms, transform 0.45s ease-out ${i * 80}ms`,
                }}
              >
                <div className="bg-afro-card border border-white/5 p-8 rounded-3xl relative overflow-hidden hover:-translate-y-2 transition-transform duration-200 h-full">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.bar}`} />
                  <Icon className={`w-12 h-12 ${card.iconColor} mb-6`} />
                  <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                  <p className="text-zinc-400">{card.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div
          ref={benefitsRef}
          className="mt-24 grid lg:grid-cols-2 gap-12 items-center"
          style={{
            opacity: benefitsVis ? 1 : 0,
            transform: benefitsVis ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.45s ease-out, transform 0.45s ease-out',
          }}
        >
          <div className="space-y-6">
            <h3 className="text-3xl font-heading text-white">
              Why Partner with <span className="text-afro-orange">AfroPlay</span>?
            </h3>
            <ul className="space-y-4">
              {serviceBenefits.map((benefit) => (
                <li key={benefit.title} className="flex gap-4">
                  <div className={`w-2 min-h-[50px] ${benefit.barColor} rounded-full flex-shrink-0`} />
                  <div>
                    <h4 className="text-xl font-bold text-white">{benefit.title}</h4>
                    <p className="text-zinc-400 text-sm">{benefit.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2670&auto=format&fit=crop"
              alt="Gamer Community"
              loading="lazy"
              className="rounded-2xl border border-white/10 shadow-2xl"
            />
            <div className="absolute -bottom-5 -right-5 bg-black border border-white/20 p-6 rounded-xl">
              <span className="block text-3xl font-heading text-white">100%</span>
              <span className="text-afro-orange text-sm uppercase font-bold">Community Driven</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
