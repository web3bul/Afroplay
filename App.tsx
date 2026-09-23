import React, { useEffect, useRef, useState } from 'react';
import { Music } from 'lucide-react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MediaPage from './pages/MediaPage';
import BrandRedirect from './pages/BrandRedirect';

// Inner component so it can call useLocation (must be inside BrowserRouter).
function AppContent() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const location = useLocation();
  const isMedia = location.pathname === '/media';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.15;
    if (isAudioOn) {
      const playAttempt = audio.play();
      if (playAttempt) playAttempt.catch(() => {});
    } else {
      audio.pause();
    }
  }, [isAudioOn]);

  // Stop audio automatically when navigating to /media — the episode player
  // is the sole audio control there, and two concurrent audio sources conflict.
  useEffect(() => {
    if (isMedia && isAudioOn) setIsAudioOn(false);
  }, [isMedia]);

  return (
    <div className="bg-afro-bg min-h-screen text-white selection:bg-afro-orange selection:text-white">
      <audio ref={audioRef} src="/Music/bg.mp3" loop preload="auto" />
      <Navbar />
      {/* Hide the music pill on /media — the episode mini-player is the only
          floating audio control on that page. */}
      {!isMedia && (
        <>
          {/* Mobile: 48×48 icon-only circle pinned bottom-right with safe-area */}
          <button
            type="button"
            onClick={() => setIsAudioOn((prev: boolean) => !prev)}
            aria-label={isAudioOn ? 'Pause background music' : 'Play background music'}
            className="md:hidden fixed right-4 z-50 w-12 h-12 rounded-full border border-white/20 bg-black/80 flex items-center justify-center transition-colors hover:border-afro-orange/60"
            style={{ bottom: 'max(16px, calc(16px + env(safe-area-inset-bottom)))' }}
          >
            <Music size={20} className={isAudioOn ? 'text-afro-orange' : 'text-white'} />
          </button>
          {/* Desktop: text pill */}
          <button
            type="button"
            onClick={() => setIsAudioOn((prev: boolean) => !prev)}
            className="hidden md:block fixed right-6 bottom-6 z-50 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur hover:border-afro-orange/60 hover:text-afro-orange transition-colors"
          >
            {isAudioOn ? 'Music On' : 'Play Music'}
          </button>
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Gaming guild paused — no public access. Any hit to /gaming (old links,
            bookmarks, the muted nav item) is bounced back to the landing page,
            where the paused state is shown. Restore the GamingPage route to reopen. */}
        <Route path="/gaming" element={<Navigate to="/" replace />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/brand" element={<BrandRedirect />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
