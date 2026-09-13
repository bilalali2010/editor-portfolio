import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { CursorMode } from '../types';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  setCursorMode: (mode: CursorMode, text?: string) => void;
}

export default function Footer({ onNavigate, setCursorMode }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'work', label: 'WORK' },
    { id: 'services', label: 'SERVICES' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <footer className="relative w-full bg-[#040406] text-white pt-16 pb-12 px-6 sm:px-8 overflow-hidden">
      {/* Subtle Red Animated Line Above Footer */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-zinc-900 overflow-hidden">
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_10px_#e50914]"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Main Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-zinc-900">
          {/* Identity */}
          <div className="flex flex-col">
            <h3 className="font-display text-2xl sm:text-3xl font-black tracking-[0.18em] text-white uppercase">
              BILAL ALI
            </h3>
            <span className="font-mono text-xs tracking-[0.3em] text-red-500 uppercase mt-1">
              VIDEO EDITOR
            </span>
            <p className="font-body text-xs text-zinc-500 mt-2 max-w-sm">
              Cinematic video editing and retention storytelling for ambitious creators and brands worldwide.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                onMouseEnter={() => setCursorMode('view', link.label)}
                onMouseLeave={() => setCursorMode('default')}
                className="font-display text-xs font-bold tracking-[0.2em] text-zinc-400 hover:text-white uppercase transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Scroll to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            onMouseEnter={() => setCursorMode('view', 'TOP')}
            onMouseLeave={() => setCursorMode('default')}
            className="p-3 rounded-full bg-zinc-900/80 hover:bg-red-600 text-zinc-400 hover:text-white border border-zinc-800 transition-all duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Copyright Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
          <span>© 2026 Bilal Ali. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>DESIGNED FOR MAXIMUM RETENTION</span>
            <span className="text-red-600">•</span>
            <span>BLACK + RED CINEMATIC EDITION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
