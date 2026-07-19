import React, { useEffect } from 'react';
import { BRAND_KIT_DRIVE_URL } from '../lib/constants';

// Handles /brand — immediately forwards to the Google Drive brand kit folder.
// Using window.location.replace (not href) so /brand doesn't appear in history;
// pressing Back goes to the previous AfroPlay page, not back to Drive.
const BrandRedirect: React.FC = () => {
  useEffect(() => {
    window.location.replace(BRAND_KIT_DRIVE_URL);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-afro-bg">
      <p className="text-zinc-400 text-sm">Redirecting to Brand Kit…</p>
    </div>
  );
};

export default BrandRedirect;
