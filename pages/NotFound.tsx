import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';

// Prerendered to dist/404.html. Vercel serves that file with a real 404 status
// for any path that doesn't match a prerendered page or a redirect.
const NotFound: React.FC = () => (
  <main className="min-h-screen bg-afro-bg flex flex-col items-center justify-center px-6 pt-28 pb-16 text-center">
    <PageMeta
      title="Page not found | AfroPlay"
      description="This page doesn't exist. Browse Onchain Africa, AfroPlay's interview series with African Web3 founders and builders."
      noindex
    />
    <p className="text-afro-orange text-xs font-bold uppercase tracking-[0.3em] mb-4">404</p>
    <h1 className="text-4xl md:text-6xl font-heading text-white mb-6">Page not found</h1>
    <p className="text-zinc-400 max-w-md leading-relaxed mb-10">
      The page you're looking for doesn't exist or has moved. You can catch up on Onchain Africa,
      our live interview series with African Web3 founders.
    </p>
    <div className="flex flex-wrap gap-4 justify-center">
      <Link
        to="/media"
        className="px-8 py-4 bg-afro-orange hover:bg-orange-600 rounded-lg text-white font-bold flex items-center gap-2 transition-colors neon-box"
      >
        Watch Onchain Africa <ArrowRight size={18} />
      </Link>
      <Link
        to="/"
        className="px-8 py-4 border border-white/20 hover:border-afro-orange/50 text-white rounded-lg font-semibold transition-colors"
      >
        Back to home
      </Link>
    </div>
  </main>
);

export default NotFound;
