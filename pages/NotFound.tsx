import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound: React.FC = () => (
  <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
    <Helmet>
      <title>Page not found | AfroPlay</title>
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <p className="text-afro-orange text-xs font-bold uppercase tracking-widest mb-3">404</p>
    <h1 className="text-4xl font-heading text-white mb-4">Page not found</h1>
    <p className="text-zinc-400 mb-8 max-w-md">That page doesn't exist. Try the home page or the Onchain Africa episodes.</p>
    <div className="flex gap-4">
      <Link to="/" className="px-6 py-3 rounded-lg bg-afro-orange text-white font-bold">Home</Link>
      <Link to="/media" className="px-6 py-3 rounded-lg border border-white/20 text-white font-bold">Episodes</Link>
    </div>
  </main>
);

export default NotFound;
