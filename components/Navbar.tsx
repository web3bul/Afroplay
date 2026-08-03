import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Booking link for founders who want a livestream slot on Onchain Africa.
// Only surfaced on the Media page — booking a show slot is meaningless in a Gaming context.
const CALENDLY_URL = 'https://calendly.com/benjaminudouso/30min';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const isHome = location.pathname === '/';
  const isGaming = location.pathname === '/gaming';
  const isMedia = location.pathname === '/media';

  const gamingSubLinks = [
    { name: 'About', href: '#about' },
    { name: 'Market', href: '#market' },
    { name: 'Services', href: '#services' },
    { name: 'Partners', href: '#partners' },
  ];

  const mediaSubLinks = [
    { name: 'About', href: '#about' },
    { name: 'Episodes', href: '#episodes' },
    { name: 'Hosts', href: '#hosts' },
    { name: 'Get Featured', href: '#featured' },
  ];

  const subLinks = isGaming ? gamingSubLinks : isMedia ? mediaSubLinks : [];

  // Active pill — same orange gradient for both Gaming and Media; no cyan anywhere.
  const activePillClass = 'bg-afro-orange text-white shadow-[0_0_12px_rgba(255,107,0,0.4)]';
  const inactivePillClass = 'text-gray-400 hover:text-white';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-afro-bg/90 backdrop-blur-md border-b border-white/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo — mark + wordmark so it's legible at nav size */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img
            src="/logo.png"
            alt="AfroPlay"
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Gaming / Media pill switcher */}
          {!isHome && (
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
              <Link
                to="/gaming"
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  isGaming ? activePillClass : inactivePillClass
                }`}
              >
                Gaming
              </Link>
              <Link
                to="/media"
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  isMedia ? activePillClass : inactivePillClass
                }`}
              >
                Media
              </Link>
            </div>
          )}

          {isHome && (
            <>
              <Link
                to="/gaming"
                className="text-gray-300 hover:text-afro-orange transition-colors font-medium text-sm uppercase tracking-widest"
              >
                Gaming
              </Link>
              <Link
                to="/media"
                className="text-gray-300 hover:text-afro-orange transition-colors font-medium text-sm uppercase tracking-widest"
              >
                Media
              </Link>
            </>
          )}

          {subLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-400 hover:text-afro-orange transition-colors font-medium text-sm uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}

          <div className="flex items-center gap-4 ml-2">
            <a
              href="https://discord.gg/GJVNA6TG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#5865F2] transition-colors"
              aria-label="Join Discord"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 127.14 96.36"
                className="w-6 h-6 fill-current"
              >
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22c2.36-24.44-2-47.27-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.18-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
            </a>

            {/* Book a slot — Media page only */}
            {isMedia && (
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 border border-afro-orange/40 hover:border-afro-orange hover:bg-afro-orange/10 text-afro-orange rounded-full font-bold text-sm transition-colors flex items-center gap-1.5"
              >
                <Calendar size={14} />
                Book a Slot
              </a>
            )}

            <a
              href="#contact"
              className="px-6 py-2 bg-gradient-to-r from-afro-orange to-red-600 rounded-full font-bold text-white hover:scale-105 transition-transform neon-box text-sm"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Mobile Toggle — 48×48 tap target */}
        <button
          className="md:hidden w-12 h-12 flex items-center justify-center text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu — fixed full-screen panel, sits below navbar (z-[100]) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[99] bg-[#0F0502] overflow-y-auto pt-24 px-6 pb-10 flex flex-col gap-1">
          {/* Gaming / Media toggle — prominent at top */}
          <div className="flex gap-3 mb-4">
            <Link
              to="/gaming"
              className={`flex-1 text-center min-h-[48px] flex items-center justify-center rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                isGaming ? 'bg-afro-orange text-white' : 'bg-white/5 border border-white/10 text-gray-400'
              }`}
            >
              Gaming
            </Link>
            <Link
              to="/media"
              className={`flex-1 text-center min-h-[48px] flex items-center justify-center rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                isMedia ? 'bg-afro-orange text-white' : 'bg-white/5 border border-white/10 text-gray-400'
              }`}
            >
              Media
            </Link>
          </div>

          {/* Book a slot — Media page only, above the fold in the panel */}
          {isMedia && (
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="min-h-[48px] mb-2 flex items-center justify-center gap-2 rounded-xl bg-afro-orange text-white text-base font-bold"
            >
              <Calendar size={16} />
              Book a Slot
            </a>
          )}

          <div className="border-t border-white/10 mt-2 mb-2" />

          {subLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="min-h-[48px] flex items-center text-zinc-300 text-base font-medium px-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}

          <a
            href="https://discord.gg/GJVNA6TG"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] flex items-center text-[#5865F2] text-base font-bold px-2 border-b border-white/5"
          >
            Join Discord
          </a>
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="min-h-[48px] flex items-center text-afro-orange text-base font-bold px-2"
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
