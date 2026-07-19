import React from 'react';
import { Send, Mail, Youtube } from 'lucide-react';
import { BRAND_KIT_URL, DISCORD_URL } from '../lib/constants';
import { socialLinks } from '../data/social';
import { SocialIconKey } from '../types';

// Inline SVG icons to avoid lucide deprecation warnings and ensure correct logos.
const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const SpotifyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.521 17.34a.749.749 0 0 1-1.031.25c-2.823-1.725-6.376-2.116-10.564-1.159a.75.75 0 0 1-.336-1.462c4.589-1.05 8.523-.6 11.683 1.34.353.215.465.676.248 1.031zm1.471-3.272a.937.937 0 0 1-1.288.307c-3.231-1.987-8.158-2.563-11.986-1.402a.938.938 0 1 1-.543-1.795c4.376-1.328 9.806-.685 13.51 1.6a.938.938 0 0 1 .307 1.29zm.129-3.41C15.24 8.4 8.82 8.2 5.157 9.312a1.125 1.125 0 1 1-.652-2.153c4.207-1.276 11.273-1.038 15.733 1.622a1.125 1.125 0 1 1-1.117 1.957v-.08z" />
  </svg>
);

// Maps the icon key stored in data/social.ts to its icon component.
const SOCIAL_ICONS: Record<SocialIconKey, React.FC<{ className?: string }>> = {
  youtube:   (props) => <Youtube {...props} />,
  x:         XIcon,
  linkedin:  LinkedInIcon,
  tiktok:    TikTokIcon,
  instagram: InstagramIcon,
  spotify:   SpotifyIcon,
};

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-black py-20 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-afro-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">

        <div className="mb-10 flex justify-center">
          <img
            src="/logo.png"
            alt="AfroPlay Logo"
            className="h-24 w-auto object-contain hover:scale-105 transition-transform"
          />
        </div>

        <h2 className="text-5xl font-heading text-white mb-8">CONTACT US</h2>

        {/* 3 primary action cards — always 3-column, compact on mobile */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-2xl mx-auto mb-10">
          <a
            href="mailto:connect@afroplay.org"
            className="flex flex-col items-center gap-1.5 sm:gap-3 p-2 sm:p-6 min-h-[44px] bg-white/5 rounded-xl border border-white/10 hover:bg-afro-orange/10 hover:border-afro-orange/50 transition-colors group"
          >
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-afro-orange rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="text-white w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <span className="text-white font-semibold text-[10px] sm:text-sm text-center leading-tight">
              <span className="sm:hidden">Email</span>
              <span className="hidden sm:inline break-all">connect@afroplay.org</span>
            </span>
            <span className="text-[9px] sm:text-xs text-zinc-400 hidden sm:block">Partnerships &amp; Media</span>
          </a>

          <a
            href="https://t.me/web3bul"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 sm:gap-3 p-2 sm:p-6 min-h-[44px] bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group"
          >
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Send className="text-white w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <span className="text-white font-semibold text-[10px] sm:text-sm">@web3bull</span>
            <span className="text-[9px] sm:text-xs text-zinc-400 hidden sm:block">Telegram</span>
          </a>

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 sm:gap-3 p-2 sm:p-6 min-h-[44px] bg-white/5 rounded-xl border border-white/10 hover:bg-[#5865F2]/10 hover:border-[#5865F2]/50 transition-colors group"
          >
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#5865F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform p-2 sm:p-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" className="w-full h-full fill-white">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22c2.36-24.44-2-47.27-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.18-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-[10px] sm:text-sm">Discord</span>
            <span className="text-[9px] sm:text-xs text-zinc-400 hidden sm:block">Community</span>
          </a>
        </div>

        {/* Compact social icon row — all remaining platforms */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {socialLinks.map(({ label, href, icon }) => {
            const Icon = SOCIAL_ICONS[icon];
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        <div className="text-zinc-500 text-sm border-t border-white/10 pt-8">
          <p>&copy; {new Date().getFullYear()} AfroPlay. All rights reserved.</p>
          <p className="mt-2">Where African Web3 gaming meets media. Born in the game. Built for the world.</p>
          <p className="mt-3">
            <a
              href={BRAND_KIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download AfroPlay brand kit (opens Google Drive in a new tab)"
              className="text-zinc-400 hover:text-afro-orange transition-colors underline-offset-2 hover:underline"
            >
              Brand Kit
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
