import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { BRAND_KIT_URL } from '../lib/constants';

interface BrandKitCTAProps {
  /** Replaces the default body copy — useful for page-specific context. */
  subtitle?: string;
}

const BrandKitCTA: React.FC<BrandKitCTAProps> = ({ subtitle }) => {
  const { ref, inView } = useInView();

  return (
    <section
      aria-label="Brand Kit download"
      className="bg-afro-card border-y border-white/5 relative overflow-hidden"
    >
      {/* Subtle orange left-edge accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-afro-orange/60 via-afro-orange/30 to-transparent" />

      <div
        ref={ref}
        className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center gap-8"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.45s ease-out, transform 0.45s ease-out',
        }}
      >
        {/* Left: text + asset thumbnails */}
        <div className="flex items-center gap-5 flex-1 min-w-0">
          {/* Logo thumbnail previews — assets already in /public */}
          <div className="hidden sm:flex flex-col gap-1.5 flex-shrink-0">
            {['w-10 h-10', 'w-8 h-8', 'w-6 h-6'].map((size, i) => (
              <div
                key={i}
                className="rounded-md bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden"
                style={{
                  width: i === 0 ? 40 : i === 1 ? 32 : 24,
                  height: i === 0 ? 40 : i === 1 ? 32 : 24,
                  opacity: 1 - i * 0.25,
                }}
              >
                <img
                  src="/logo.png"
                  alt=""
                  aria-hidden="true"
                  className="object-contain grayscale"
                  style={{ width: '80%', height: '80%' }}
                />
              </div>
            ))}
          </div>

          <div className="min-w-0">
            <p className="text-afro-orange text-[10px] font-bold uppercase tracking-widest mb-1">Brand Kit</p>
            <h2 className="text-lg font-heading text-white leading-snug mb-1">Official Brand Assets</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {subtitle ||
                'Writing about us or partnering with AfroPlay? Grab our official logos, icon, and brand guidelines.'}
            </p>
          </div>
        </div>

        {/* Right: CTA button */}
        <a
          href={BRAND_KIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download AfroPlay brand kit (opens Google Drive in a new tab)"
          className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-afro-orange hover:bg-orange-600 rounded-lg text-white font-bold text-sm transition-colors neon-box whitespace-nowrap"
        >
          Download Brand Kit <ExternalLink size={15} />
        </a>
      </div>
    </section>
  );
};

export default BrandKitCTA;
