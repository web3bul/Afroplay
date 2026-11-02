import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Play, Youtube } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import NotFound from './NotFound';
import { Episode } from '../data/episodes';
import {
  formatDate,
  formatDuration,
  getAdjacentEpisodes,
  getAirDate,
  getEpisodeBySlug,
  getEpisodePath,
  getRelatedEpisodes,
  xProfileUrl,
  youtubeThumbnail,
} from '../lib/episodes';

// Click-to-load player: the page ships only a thumbnail, and the YouTube iframe
// (privacy-friendly youtube-nocookie.com) is mounted on click. Nothing from
// YouTube loads until then, so it doesn't hurt LCP.
const VideoFacade: React.FC<{ episode: Episode }> = ({ episode }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="aspect-video relative rounded-2xl overflow-hidden border border-afro-orange/20 bg-black shadow-2xl shadow-afro-orange/5">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${episode.videoId}?autoplay=1&rel=0`}
          title={episode.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${episode.title}`}
          className="group absolute inset-0 w-full h-full"
        >
          <img
            src={youtubeThumbnail(episode.videoId)}
            alt=""
            width={480}
            height={360}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-20 h-20 rounded-full bg-afro-orange flex items-center justify-center shadow-lg shadow-afro-orange/40 group-hover:scale-110 group-hover:bg-orange-600 transition-transform duration-300">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

const XLink: React.FC<{ handle: string; label: string }> = ({ handle, label }) => {
  const url = xProfileUrl(handle);
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-afro-orange hover:underline">
      {label}
    </a>
  ) : (
    <>{label}</>
  );
};

const EpisodeCard: React.FC<{ ep: Episode }> = ({ ep }) => (
  <Link
    to={getEpisodePath(ep)}
    className="group block h-full bg-afro-card border border-white/5 rounded-2xl overflow-hidden hover:border-afro-orange/30 transition-colors"
  >
    <div className="aspect-video bg-black overflow-hidden">
      <img
        src={youtubeThumbnail(ep.videoId)}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-4">
      <span className="text-xs font-bold text-afro-orange">EP #{String(ep.id).padStart(3, '0')}</span>
      <h3 className="text-white font-bold text-sm mt-1 leading-snug line-clamp-2 group-hover:text-afro-orange transition-colors">
        {ep.title}
      </h3>
      <p className="text-zinc-400 text-xs mt-1">{ep.guest}{ep.project && ` · ${ep.project}`}</p>
    </div>
  </Link>
);

// Built only from existing fields; never invents facts about the conversation.
const buildIntro = (ep: Episode): string => {
  const airDate = getAirDate(ep);
  const topics = ep.tags.length ? ` Topics: ${ep.tags.join(', ')}.` : '';
  const who = ep.project ? `${ep.guest} of ${ep.project}` : ep.guest;
  const when = airDate ? ` The episode aired on ${formatDate(airDate)}.` : '';
  return `Episode ${ep.id} of Onchain Africa, AfroPlay's live interview series with African Web3 founders and builders, features ${who}. It runs ${formatDuration(ep.duration)}.${topics}${when}`;
};

const EpisodePage: React.FC = () => {
  const { slug = '' } = useParams();
  const ep = getEpisodeBySlug(slug);
  if (!ep) return <NotFound />;

  const { prev, next } = getAdjacentEpisodes(ep);
  const related = getRelatedEpisodes(ep);
  const airDate = getAirDate(ep);
  const canonical = `https://afroplay.org${getEpisodePath(ep)}`;
  const description = ep.summary ?? buildIntro(ep);

  return (
    <main className="min-h-screen bg-afro-bg pt-28 pb-24">
      <PageMeta
        title={/onchain africa/i.test(ep.title) ? `${ep.title} | EP ${ep.id}` : `${ep.title} | Onchain Africa EP ${ep.id}`}
        description={description.length > 160 ? `${description.slice(0, 157).trimEnd()}...` : description}
        canonical={canonical}
        ogImage={youtubeThumbnail(ep.videoId)}
        ogImageAlt={ep.title}
        ogImageWidth={480}
        ogImageHeight={360}
        ogType="video.other"
      />

      <div className="max-w-4xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="text-xs text-zinc-500 mb-6 flex flex-wrap items-center gap-2">
          <Link to="/" className="hover:text-afro-orange">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/media" className="hover:text-afro-orange">Onchain Africa</Link>
          <span aria-hidden="true">/</span>
          <span className="text-zinc-400">EP {ep.id}</span>
        </nav>

        <p className="text-afro-orange text-xs font-bold uppercase tracking-widest mb-3">
          Onchain Africa · Episode {ep.id}
        </p>
        <h1 className="text-3xl md:text-5xl font-heading text-white leading-tight mb-8">{ep.title}</h1>

        <VideoFacade episode={ep} />

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 text-sm text-zinc-400">
          <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {ep.duration}</span>
          {airDate && <span>Aired {formatDate(airDate)}</span>}
          <a
            href={ep.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-afro-orange hover:underline"
          >
            <Youtube size={14} /> Watch on YouTube
          </a>
        </div>

        <section className="mt-12 grid md:grid-cols-[1fr_16rem] gap-10">
          <div>
            <h2 className="text-xl font-heading text-white mb-4">About this episode</h2>
            <p className="text-zinc-300 leading-relaxed">{buildIntro(ep)}</p>
            {ep.summary && <p className="text-zinc-300 leading-relaxed mt-4">{ep.summary}</p>}
            <div className="flex gap-2 flex-wrap mt-6">
              {ep.tags.map(tag => (
                <span key={tag} className="text-xs text-zinc-400 bg-white/5 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>

          <aside className="bg-afro-card border border-white/10 rounded-2xl p-5 self-start">
            <h2 className="text-xs font-bold uppercase tracking-widest text-afro-orange mb-4">Guest</h2>
            <p className="text-white font-semibold">
              <XLink handle={ep.guestHandle} label={ep.guest} />
            </p>
            {ep.guestHandle && <p className="text-zinc-500 text-xs mt-0.5">{ep.guestHandle}</p>}
            {ep.project && (
              <>
                <h2 className="text-xs font-bold uppercase tracking-widest text-afro-orange mt-5 mb-2">Project</h2>
                <p className="text-white font-semibold">
                  <XLink handle={ep.projectHandle} label={ep.project} />
                </p>
                {ep.projectHandle && <p className="text-zinc-500 text-xs mt-0.5">{ep.projectHandle}</p>}
              </>
            )}
          </aside>
        </section>

        {ep.transcript && (
          <section className="mt-12">
            <h2 className="text-xl font-heading text-white mb-4">Transcript</h2>
            <div className="text-zinc-300 leading-relaxed whitespace-pre-line">{ep.transcript}</div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl font-heading text-white mb-6">Related episodes</h2>
            <ul className="grid sm:grid-cols-3 gap-5">
              {related.map(r => <li key={r.id}><EpisodeCard ep={r} /></li>)}
            </ul>
          </section>
        )}

        <nav aria-label="Episode navigation" className="mt-16 pt-8 border-t border-white/10 grid sm:grid-cols-3 gap-4 items-center text-sm">
          <div>
            {prev && (
              <Link to={getEpisodePath(prev)} className="inline-flex items-start gap-2 text-zinc-400 hover:text-afro-orange transition-colors">
                <ArrowLeft size={16} className="mt-0.5 flex-shrink-0" />
                <span><span className="block text-[11px] uppercase tracking-widest text-zinc-500">Previous · EP {prev.id}</span>{prev.guest}{prev.project && ` · ${prev.project}`}</span>
              </Link>
            )}
          </div>
          <div className="sm:text-center">
            <Link to="/media" className="text-afro-orange font-semibold hover:underline">All episodes</Link>
          </div>
          <div className="sm:text-right">
            {next && (
              <Link to={getEpisodePath(next)} className="inline-flex items-start gap-2 text-zinc-400 hover:text-afro-orange transition-colors sm:text-right">
                <span><span className="block text-[11px] uppercase tracking-widest text-zinc-500">Next · EP {next.id}</span>{next.guest}{next.project && ` · ${next.project}`}</span>
                <ArrowRight size={16} className="mt-0.5 flex-shrink-0" />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </main>
  );
};

export default EpisodePage;
