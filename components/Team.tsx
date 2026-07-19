import React from 'react';
import { TeamMember } from '../types';
import { teamCategories } from '../data/team';
import { useInView } from '../hooks/useInView';

const XIcon: React.FC<{ size?: number }> = ({ size = 10 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/** Each category animates in independently as it enters the viewport */
const CategorySection: React.FC<{ title: string; members: TeamMember[] }> = ({ title, members }) => {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className="mb-12">
      <h3
        className="text-xl font-heading text-white mb-6"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateX(0)' : 'translateX(-16px)',
          transition: 'opacity 0.45s ease-out, transform 0.45s ease-out',
        }}
      >
        {title}
      </h3>

      {/* flex-wrap + justify-center centers incomplete rows (e.g. 2 of 5) */}
      <div className="flex flex-wrap justify-center gap-6">
        {members.map((member, idx) => (
          <div
            key={`${title}-${idx}`}
            className="bg-afro-card border border-white/5 rounded-xl p-4 text-center hover:border-afro-orange/50 group w-[calc(50%-12px)] sm:w-44 lg:w-48 flex-shrink-0"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              // border-color listed so hover:border-afro-orange/50 transitions smoothly
              transition: `opacity 0.45s ease-out ${idx * 60}ms, transform 0.45s ease-out ${idx * 60}ms, border-color 0.2s ease`,
            }}
          >
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-afro-orange mb-4 shadow-[0_0_15px_rgba(255,107,0,0.3)]">
              <img
                src={member.avatarUrl}
                alt={member.name}
                loading="lazy"
                className="w-full h-full object-cover bg-zinc-800"
              />
            </div>
            <h3 className="text-white font-bold text-lg">{member.name}</h3>
            <p className="text-afro-orange text-xs uppercase font-semibold mb-3">{member.role}</p>
            <div className="inline-flex items-center gap-1 text-zinc-400 text-xs bg-black/50 px-3 py-1 rounded-full">
              <XIcon size={10} />
              {member.handle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  return (
    <section id="team" className="py-16 md:py-24 bg-afro-bg">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <div className="w-20 h-1 bg-afro-orange mx-auto mb-6" />
          <h2 className="text-4xl font-heading text-white">MEET OUR TEAM</h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            Our team members are well knowledgeable about Web3 games and are highly regarded and trusted in the community.
          </p>
        </div>

        {teamCategories.map((category) => (
          <CategorySection key={category.title} title={category.title} members={category.members} />
        ))}

      </div>
    </section>
  );
};

export default Team;
