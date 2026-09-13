import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const EDITING_WORDS = ['CUT', 'COLOR', 'MOTION', 'SOUND', 'STORY'];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1800; // Under 2 seconds

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(currentProgress);

      const wordIdx = Math.min(
        EDITING_WORDS.length - 1,
        Math.floor((elapsed / duration) * EDITING_WORDS.length)
      );
      setCurrentWordIndex(wordIdx);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 250);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      id="cinematic-loader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#060608] text-white select-none px-6"
    >
      {/* Subtle ambient red spotlight */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />

      {/* Editor Timeline Markings Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-between px-8 py-6">
        <span className="font-mono text-xs text-zinc-500">00:00:00:00</span>
        <span className="font-mono text-xs text-zinc-500">REC [●] 24 FPS</span>
        <span className="font-mono text-xs text-zinc-500">PRORES 422 HQ</span>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-display text-4xl sm:text-5xl font-extrabold tracking-[0.25em] text-white uppercase text-center"
        >
          BILAL ALI
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.15em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-3 font-display text-xs sm:text-sm font-semibold text-red-500 tracking-[0.35em] uppercase"
        >
          VIDEO EDITOR
        </motion.p>

        {/* Progress Bar Container */}
        <div className="mt-8 w-full max-w-[260px] relative">
          <div className="h-[2px] w-full bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-red-600 shadow-[0_0_12px_#e50914]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Timecode & Progress percent */}
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span className="tracking-widest">
              TC 00:00:{String(Math.floor(progress / 4)).padStart(2, '0')}:
              {String((progress * 3) % 24).padStart(2, '0')}
            </span>
            <span className="text-red-400 font-semibold">{progress}%</span>
          </div>
        </div>

        {/* Rotating Editing Words */}
        <div className="h-6 mt-4 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={EDITING_WORDS[currentWordIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-[10px] tracking-[0.4em] text-zinc-400 font-medium uppercase"
            >
              • {EDITING_WORDS[currentWordIndex]} •
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Skip button in case visitor wants instant access */}
      <button
        type="button"
        onClick={onComplete}
        className="absolute bottom-6 right-8 font-mono text-[10px] text-zinc-600 hover:text-zinc-300 uppercase tracking-widest transition-colors py-2 px-3 border border-transparent hover:border-zinc-800 rounded"
      >
        Skip [ESC]
      </button>
    </motion.div>
  );
}
