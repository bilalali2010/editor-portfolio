import { motion } from 'motion/react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { CursorMode } from '../types';

interface CtaSectionProps {
  onStartProject: () => void;
  onWatchWork: () => void;
  setCursorMode: (mode: CursorMode, text?: string) => void;
}

export default function CtaSection({
  onStartProject,
  onWatchWork,
  setCursorMode,
}: CtaSectionProps) {
  return (
    <section
      id="cta"
      className="relative min-h-[85vh] w-full flex flex-col items-center justify-center bg-[#050507] text-white px-6 sm:px-8 py-24 overflow-hidden border-t border-zinc-900"
    >
      {/* Animated Red Light Streaks / Particles */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute w-[700px] h-[500px] bg-red-600/20 rounded-[100%] blur-[160px]"
      />

      {/* Subtle diagonal speed lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(229,9,20,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 font-mono text-xs font-bold uppercase tracking-[0.25em] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span>TRANSFORM YOUR CONTENT</span>
        </div>

        {/* Climax Headline */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[1.02]">
          GOT FOOTAGE?
          <br />
          <span className="text-red-600 drop-shadow-[0_0_40px_rgba(229,9,20,0.6)]">
            LET&apos;S MAKE IT UNMISSABLE.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 font-body text-lg sm:text-xl text-zinc-300 font-medium max-w-xl">
          Your footage deserves more than a basic cut.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Large Red Button */}
          <button
            type="button"
            onClick={onStartProject}
            onMouseEnter={() => setCursorMode('open', 'START')}
            onMouseLeave={() => setCursorMode('default')}
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-red-600 hover:bg-[#ff1e27] text-white font-display text-sm sm:text-base font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(229,9,20,0.5)] hover:shadow-[0_0_50px_rgba(229,9,20,0.8)] active:scale-95"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Secondary Option: WATCH MY WORK */}
          <button
            type="button"
            onClick={onWatchWork}
            onMouseEnter={() => setCursorMode('watch', 'REELS')}
            onMouseLeave={() => setCursorMode('default')}
            className="w-full sm:w-auto px-8 py-5 rounded-full border border-zinc-800 hover:border-zinc-500 bg-zinc-950/60 hover:bg-zinc-900/80 text-zinc-300 hover:text-white font-display text-sm sm:text-base font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current text-red-500" />
            <span>WATCH MY WORK</span>
          </button>
        </div>
      </div>
    </section>
  );
}
