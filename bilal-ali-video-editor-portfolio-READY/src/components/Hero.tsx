import { motion } from 'motion/react';
import { ArrowRight, Play, Film, Sparkles, Volume2 } from 'lucide-react';
import { CursorMode } from '../types';

interface HeroProps {
  onExploreWork: () => void;
  onContact: () => void;
  setCursorMode: (mode: CursorMode, text?: string) => void;
}

export default function Hero({ onExploreWork, onContact, setCursorMode }: HeroProps) {
  const headlineWords = ['I', 'TURN', 'RAW', 'FOOTAGE', 'INTO'];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#060608] text-white pt-28 pb-12 px-6 sm:px-8 film-grain"
    >
      {/* 1. Moving Cinematic Red Light / Flare */}
      <motion.div
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '15%', '-10%'],
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] rounded-[100%] bg-radial from-red-600/25 via-red-900/10 to-transparent blur-[120px]"
      />

      {/* Secondary subtle red glow on corner */}
      <div className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 blur-[140px]" />

      {/* Subtle Editing Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#141418_1px,transparent_1px),linear-gradient(to_bottom,#141418_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-30" />

      {/* Top Status Bar: Availability & Timecode */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-zinc-500 pt-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span className="tracking-widest uppercase text-zinc-400 text-[11px]">
            AVAILABLE FOR Q2/Q3 PROJECTS
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-zinc-500 tracking-widest text-[11px]">
          <span>4K / DCI 2.39:1 / 9:16</span>
          <span className="text-red-500 font-bold">24.00 FPS</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center sm:items-start my-auto py-12">
        {/* Sub-label: Bilal Ali — Video Editor */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-[1px] w-8 bg-red-600" />
          <span className="font-display text-sm sm:text-base font-bold tracking-[0.25em] text-red-500 uppercase">
            Bilal Ali — Video Editor
          </span>
        </motion.div>

        {/* Cinematic Huge Headline */}
        <div className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] uppercase max-w-5xl text-left">
          <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1 sm:gap-y-2">
            {headlineWords.map((word, idx) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + idx * 0.08,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="inline-block text-white"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="mt-1 sm:mt-2 text-red-600 drop-shadow-[0_0_40px_rgba(229,9,20,0.6)] flex items-center gap-3"
          >
            <span>ATTENTION.</span>
          </motion.div>
        </div>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-6 sm:mt-8 max-w-2xl font-body text-base sm:text-lg text-zinc-400 font-normal leading-relaxed text-left"
        >
          Cinematic edits, high-retention reels, social media content and visual storytelling designed to make brands and creators stand out.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary Button: VIEW MY WORK → (Red) */}
          <button
            type="button"
            onClick={onExploreWork}
            onMouseEnter={() => setCursorMode('watch', 'REELS')}
            onMouseLeave={() => setCursorMode('default')}
            className="group relative px-8 py-4 rounded-full bg-red-600 hover:bg-[#ff1e27] text-white font-display text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(229,9,20,0.45)] hover:shadow-[0_0_40px_rgba(229,9,20,0.7)] active:scale-95"
          >
            <span>VIEW MY WORK</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </button>

          {/* Secondary Button: LET'S WORK TOGETHER (Outlined) */}
          <button
            type="button"
            onClick={onContact}
            onMouseEnter={() => setCursorMode('open', 'CONTACT')}
            onMouseLeave={() => setCursorMode('default')}
            className="px-8 py-4 rounded-full border border-zinc-700 hover:border-zinc-400 bg-zinc-950/40 hover:bg-zinc-900/60 text-zinc-200 hover:text-white font-display text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>LET&apos;S WORK TOGETHER</span>
          </button>
        </motion.div>
      </div>

      {/* 7. Moving Editing-Timeline-Inspired Graphic at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-zinc-900/90 flex flex-col gap-2"
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 tracking-wider">
          <div className="flex items-center gap-3">
            <span className="text-red-500 font-bold">TIMELINE</span>
            <span>SEQUENCE_01 • 9:16_VERTICAL_EDIT</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>KEYFRAMES: ACTIVE</span>
            <span>BEAT_SYNC: 128 BPM</span>
          </div>
        </div>

        {/* Abstract mini timeline with waveforms, cuts, markers, and moving red playhead */}
        <div className="relative h-11 w-full bg-[#0a0a0e] rounded-md border border-zinc-900 overflow-hidden flex items-center px-2">
          {/* Timeline background tracks */}
          <div className="absolute inset-0 flex flex-col justify-evenly opacity-30 pointer-events-none">
            <div className="h-[1px] w-full bg-zinc-800" />
            <div className="h-[1px] w-full bg-zinc-800" />
          </div>

          {/* Video & Audio Clips Mocked */}
          <div className="relative z-0 w-full h-full flex items-center gap-1.5 py-1.5">
            <div className="h-full w-[16%] rounded bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-between px-2 text-[9px] font-mono text-zinc-400">
              <span>HOOK_A1</span>
            </div>
            <div className="h-full w-[22%] rounded bg-red-950/70 border border-red-800/50 flex items-center justify-between px-2 text-[9px] font-mono text-red-300">
              <span>BROLL_STADIUM</span>
            </div>
            <div className="h-full w-[18%] rounded bg-zinc-800/90 border border-zinc-700/60 flex items-center justify-between px-2 text-[9px] font-mono text-zinc-400">
              <span>PUNCH_IN</span>
            </div>
            <div className="h-full w-[28%] rounded bg-red-900/60 border border-red-700/60 flex items-center justify-between px-2 text-[9px] font-mono text-red-200">
              <span>GFX_3D_ASSETS</span>
            </div>
            <div className="h-full flex-1 rounded bg-zinc-800/70 border border-zinc-700/50 flex items-center justify-between px-2 text-[9px] font-mono text-zinc-400">
              <span>OUTRO_CTA</span>
            </div>
          </div>

          {/* Simulated Waveform Line in Audio track */}
          <div className="absolute bottom-1.5 left-2 right-2 h-2 flex items-center gap-[2px] opacity-40 pointer-events-none">
            {[4, 8, 14, 20, 12, 16, 22, 10, 6, 18, 24, 15, 8, 12, 20, 16, 10, 6, 14, 22, 18, 12, 8, 14, 20, 15, 10, 18, 22, 16, 8, 12, 18, 24, 14, 8].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-red-400/80 rounded-full"
                style={{ height: `${h * 0.3}px` }}
              />
            ))}
          </div>

          {/* Moving Red Playhead with red glow */}
          <motion.div
            animate={{ left: ['2%', '96%', '2%'] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 bottom-0 w-[2px] bg-red-500 shadow-[0_0_12px_#ff1e27] z-10 pointer-events-none flex flex-col items-center"
          >
            <div className="w-2.5 h-2 bg-red-500 rounded-b-sm -mt-0.5 shadow-[0_0_8px_#e50914]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
