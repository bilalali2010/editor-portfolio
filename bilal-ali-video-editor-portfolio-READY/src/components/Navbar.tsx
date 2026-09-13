import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Play, ArrowUpRight } from 'lucide-react';
import { CursorMode } from '../types';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  setCursorMode: (mode: CursorMode, text?: string) => void;
}

export default function Navbar({ activeSection, onNavigate, setCursorMode }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'work', label: 'WORK' },
    { id: 'services', label: 'SERVICES' },
    { id: 'timeline', label: 'TIMELINE' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#060608]/85 backdrop-blur-md border-b border-zinc-900/80 py-3.5 shadow-2xl'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleLinkClick('hero')}
            onMouseEnter={() => setCursorMode('view', 'TOP')}
            onMouseLeave={() => setCursorMode('default')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="Bilal Ali Home"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_10px_#e50914] group-hover:scale-125 transition-transform" />
            <div className="flex flex-col">
              <span className="font-display text-base sm:text-lg font-extrabold tracking-[0.18em] text-white group-hover:text-red-500 transition-colors uppercase">
                BILAL ALI
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-400 uppercase -mt-0.5">
                VIDEO EDITOR
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  onMouseEnter={() => setCursorMode('view', link.label)}
                  onMouseLeave={() => setCursorMode('default')}
                  className={`group relative flex items-center gap-1.5 font-display text-xs font-semibold tracking-[0.2em] transition-colors py-1 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {/* Small red indicator beside active section */}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_#e50914]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{link.label}</span>
                </button>
              );
            })}

            {/* CTA in Navbar */}
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              onMouseEnter={() => setCursorMode('open', 'HIRE')}
              onMouseLeave={() => setCursorMode('default')}
              className="ml-2 px-4 py-2 rounded-full border border-red-600/80 bg-red-600/10 hover:bg-red-600 text-white font-display text-xs font-bold tracking-wider transition-all duration-200 flex items-center gap-1.5 hover:shadow-[0_0_20px_rgba(229,9,20,0.5)]"
            >
              <span>HIRE BILAL</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-red-400 group-hover:text-white" />
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Full-Screen Black Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#060608] flex flex-col justify-between px-8 py-24 md:hidden"
          >
            {/* Header info inside overlay */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <span className="font-display text-sm font-bold tracking-widest text-zinc-400 uppercase">
                PORTFOLIO MENU
              </span>
              <span className="font-mono text-xs text-red-500">BILAL ALI</span>
            </div>

            {/* Large Mobile Links */}
            <div className="flex flex-col gap-6 my-auto">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  onClick={() => handleLinkClick(link.id)}
                  className="flex items-baseline justify-between text-left group"
                >
                  <span
                    className={`font-display text-2xl font-black tracking-wider uppercase transition-colors ${
                      activeSection === link.id
                        ? 'text-red-500'
                        : 'text-zinc-200 group-hover:text-white'
                    }`}
                  >
                    {link.label}
                  </span>
                  <span className="font-mono text-xs text-zinc-600 group-hover:text-red-400">
                    0{idx + 1}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Footer inside mobile menu */}
            <div className="pt-6 border-t border-zinc-900 flex flex-col gap-4">
              <button
                type="button"
                onClick={() => handleLinkClick('contact')}
                className="w-full py-3.5 rounded-lg bg-red-600 text-white font-display text-sm font-bold tracking-widest uppercase text-center shadow-[0_0_20px_rgba(229,9,20,0.4)]"
              >
                START A PROJECT →
              </button>
              <div className="flex justify-between text-zinc-500 font-mono text-[11px]">
                <span>24/7 CREATIVE FOCUS</span>
                <span>AVAILABLE FOR WORK</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
