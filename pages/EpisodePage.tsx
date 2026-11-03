import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Play, Youtube } from 'lucide-react';
import PageMeta, { JsonLd } from '../components/PageMeta';
import Contact from '../components/Contact';
import NotFound from './NotFound';
import { airedEpisodes, episodeDescription, episodePath, episodeUrl, findEpisodeBySlug, cleanEpisodeTitle } from '../lib/episodes';
import { episodeSchema } from '../lib/jsonld';

const xUrl = (handle: string) => `https://x.com/${handle.replace(/^@/, '')}`;

const EpisodePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const ep = findEpisodeBySlug(slug);
  const [playing, setPlaying] = useState(false);

  if (!ep) return <NotFound />;

  const idx = airedEpisodes.findIndex((e) => e.id === ep.id);
  const newer = idx > 0 ? airedEpisodes[idx - 1] : undefined;
  const older = idx < airedEpisodes.length - 1 ? airedEpisodes[idx + 1] : undefined;
  const heading = cleanEpisodeTitle(ep.title);

  return (
    <main className="pt-28 md:pt-32">
      <PageMeta
        title={`${heading} — ${ep.guest}${ep.project && ep.project !== ep.guest ? ` (${ep.project})` : ''} | Onchain Africa EP ${ep.id}`}
        description={episodeDescription(ep)}
        canonical={episodeUrl(ep)}
        ogImage="https://afroplay.org/og/media.png"
        ogType="article"
      />
      <JsonLd data={episodeSchema(ep)} />

      <article className="max-w-4xl mx-auto px-6 pb-16">
        <nav aria-label="Breadcrumb" className="text-xs text-zinc-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-white">AfroPlay</Link>
          <span aria-hidden>/</span>
          <Link to="/media" className="hover:text-white">Onchain Africa</Link>
          <span aria-hidden>/</span>
          <span className="text-zinc-300">EP {ep.id}</span>
        </nav>

        <p className="text-afro-orange text-xs font-bold uppercase tracking-widest mb-3">
          Onchain Africa · Episode {ep.id}
        </p>
        <h1 className="text-3xl md:text-5xl font-heading text-white leading-tight mb-6">{heading}</h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400 mb-8">
          <span className="text-white font-semibold">{ep.guest}</span>
          {ep.project && <span>{ep.project}</span>}
          <span className="inline-flex items-center gap-1"><Clock size={14} /> {ep.duration}</span>
          {ep.aired && <time dateTime={ep.aired}>{ep.aired}</time>}
        </div>

        {/* Video: thumbnail facade; the YouTube iframe only loads after a click. */}
        <div className="aspect-video relative rounded-2xl overflow-hidden bg-black border border-white/10 mb-8">
          {playing ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${ep.videoId}?autoplay=1&rel=0`}
              title={ep.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${ep.title}`}
              className="absolute inset-0 w-full h-full group"
            >
              <img
                src={`https://img.youtube.com/vi/${ep.videoId}/hqdefault.jpg`}
                alt={ep.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                <span className="w-16 h-16 rounded-full bg-afro-orange flex items-center justify-center shadow-lg">
                  <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                </span>
              </span>
            </button>
          )}
        </div>

        <section aria-labelledby="ep-about" className="mb-10">
          <h2 id="ep-about" className="text-xl font-heading text-white mb-3">About this episode</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">{episodeDescription(ep)}</p>
          <p className="text-zinc-400 leading-relaxed">
            Onchain Africa is AfroPlay's live interview series with African Web3 founders and builders, hosted by Web3bull.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {ep.tags.map((t) => (
              <span key={t} className="text-xs text-zinc-300 bg-white/5 px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </section>

        <section aria-labelledby="ep-links" className="mb-12">
          <h2 id="ep-links" className="text-xl font-heading text-white mb-3">Links</h2>
          <ul className="space-y-2 text-sm">
            {ep.guestHandle && (
              <li><a className="text-afro-orange hover:underline" href={xUrl(ep.guestHandle)} target="_blank" rel="noopener noreferrer">{ep.guest} on X ({ep.guestHandle})</a></li>
            )}
            {ep.projectHandle && (
              <li><a className="text-afro-orange hover:underline" href={xUrl(ep.projectHandle)} target="_blank" rel="noopener noreferrer">{ep.project || 'Project'} on X ({ep.projectHandle})</a></li>
            )}
            <li>
              <a className="inline-flex items-center gap-2 text-afro-orange hover:underline" href={ep.youtubeUrl} target="_blank" rel="noopener noreferrer">
                <Youtube size={16} /> Watch on YouTube
              </a>
            </li>
          </ul>
        </section>

        <nav aria-label="More episodes" className="grid sm:grid-cols-2 gap-4 mb-10">
          {older ? (
            <Link to={episodePath(older)} className="block bg-afro-card border border-white/5 hover:border-afro-orange/30 rounded-xl p-4">
              <span className="text-xs text-zinc-500 flex items-center gap-1"><ArrowLeft size={12} /> Previous · EP {older.id}</span>
              <span className="block text-white text-sm font-semibold mt-1 line-clamp-2">{cleanEpisodeTitle(older.title)}</span>
            </Link>
          ) : <span />}
          {newer ? (
            <Link to={episodePath(newer)} className="block bg-afro-card border border-white/5 hover:border-afro-orange/30 rounded-xl p-4 sm:text-right">
              <span className="text-xs text-zinc-500 flex items-center gap-1 sm:justify-end">Next · EP {newer.id} <ArrowRight size={12} /></span>
              <span className="block text-white text-sm font-semibold mt-1 line-clamp-2">{cleanEpisodeTitle(newer.title)}</span>
            </Link>
          ) : <span />}
        </nav>

        <Link to="/media" className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white">
          <ArrowLeft size={14} /> All Onchain Africa episodes
        </Link>
      </article>

      <Contact />
    </main>
  );
};

export default EpisodePage;
