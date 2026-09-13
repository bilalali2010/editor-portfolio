import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2, Bookmark, Layers, Activity } from 'lucide-react';
import { TIMELINE_DATA } from '../data/portfolioData';
import { CursorMode } from '../types';

interface InteractiveTimelineProps {
  setCursorMode: (mode: CursorMode, text?: string) => void;
}

export default function InteractiveTimeline({ setCursorMode }: InteractiveTimelineProps) {
  const [playheadPercent, setPlayheadPercent] = useState(25);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeClipInfo, setActiveClipInfo] = useState<string | null>('HOOK_KINETIC_TXT');
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Interactive timeline playhead animation loop
  useEffect(() => {
    const loop = (time: number) => {
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (isPlaying) {
        setPlayheadPercent((prev) => {
          const next = prev + (delta / 1000) * 8; // ~12 seconds for full timeline loop
          return next > 100 ? 0 : next;
        });
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const handleTrackClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min((clickX / rect.width) * 100, 100));
    setPlayheadPercent(percent);
  };

  const markers = [
    { pos: 12, label: 'HOOK RESET', color: '#ff2a32' },
    { pos: 35, label: 'B-ROLL PUNCH', color: '#ffffff' },
    { pos: 58, label: 'SFX RISER', color: '#e50914' },
    { pos: 84, label: 'CALL TO ACTION', color: '#ffffff' },
  ];

  const currentSeconds = (playheadPercent * 0.3).toFixed(2);

  return (
    <section
      id="timeline"
      className="relative w-full py-28 px-6 sm:px-8 bg-[#050507] text-white border-t border-zinc-900/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#e50914]" />
              <span className="font-mono text-xs text-red-500 font-semibold tracking-[0.25em] uppercase">
                THE WORKFLOW ENGINE
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              EDITING TIMELINE VISUAL
            </h2>

            <p className="mt-3 font-body text-base text-zinc-400 max-w-xl">
              An abstract live representation of how video tracks, audio waveforms, precision cuts, markers, and keyframes assemble into cohesive storytelling.
            </p>
          </div>

          {/* Timecode & Playback HUD */}
          <div className="flex items-center gap-4 bg-[#0d0d12] border border-zinc-800 px-5 py-3 rounded-xl font-mono text-xs">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
              title={isPlaying ? 'Pause timeline' : 'Play timeline'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button
              type="button"
              onClick={() => setPlayheadPercent(0)}
              className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title="Rewind to start"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest">TIMECODE</span>
              <span className="text-sm font-bold text-white tracking-widest">
                00:00:0{Math.floor(Number(currentSeconds))}:{String(Math.round((Number(currentSeconds) * 24) % 24)).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Editor Board */}
        <div className="mt-10 rounded-2xl bg-[#0a0a0e] border-2 border-zinc-800 shadow-2xl p-4 sm:p-6 flex flex-col gap-4">
          {/* Top Ruler & Markers */}
          <div
            onClick={handleTrackClick}
            onMouseEnter={() => setCursorMode('drag', 'SCRUB')}
            onMouseLeave={() => setCursorMode('default')}
            className="relative h-9 w-full bg-[#111117] rounded-lg border border-zinc-800 cursor-pointer overflow-hidden flex items-center select-none"
          >
            {/* Ruler ticks */}
            <div className="absolute inset-0 flex justify-between px-3 pointer-events-none opacity-40">
              {Array.from({ length: 21 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-[1px] bg-zinc-500 ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`} />
                  {i % 5 === 0 && (
                    <span className="font-mono text-[9px] text-zinc-400 mt-0.5">
                      00:0{i}s
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Render Cut / Retention Markers */}
            {markers.map((marker) => (
              <div
                key={marker.label}
                className="absolute top-1 bottom-1 flex items-center pointer-events-none -translate-x-1/2 z-10"
                style={{ left: `${marker.pos}%` }}
              >
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/90 border border-red-500/80 text-[8px] font-mono font-bold text-red-300">
                  <Bookmark className="w-2.5 h-2.5 text-red-500" />
                  <span>{marker.label}</span>
                </div>
              </div>
            ))}

            {/* Playhead Head in ruler */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-30 pointer-events-none"
              style={{ left: `${playheadPercent}%` }}
            >
              <div className="w-3 h-2.5 -ml-[5px] bg-red-600 rounded-b shadow-[0_0_8px_#e50914]" />
            </div>
          </div>

          {/* Tracks Area */}
          <div
            onClick={handleTrackClick}
            className="relative flex flex-col gap-2 cursor-pointer select-none"
          >
            {/* Playhead Needle extending across all tracks */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-red-500 shadow-[0_0_12px_#ff1e27] z-30 pointer-events-none"
              style={{ left: `${playheadPercent}%` }}
            />

            {/* Track Rows */}
            {TIMELINE_DATA.map((track) => (
              <div
                key={track.id}
                className="relative h-14 w-full rounded-lg bg-[#0e0e14] border border-zinc-800/80 flex items-center overflow-hidden group hover:border-zinc-700 transition-colors"
              >
                {/* Track Header Label */}
                <div className="absolute left-0 top-0 bottom-0 z-20 w-32 sm:w-44 bg-[#12121a]/95 border-r border-zinc-800 px-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-zinc-300 tracking-wider">
                    {track.name}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: track.color }}
                  />
                </div>

                {/* Clips Container */}
                <div className="relative w-full h-full pl-32 sm:pl-44 pr-2 flex items-center">
                  {track.clips.map((clip) => {
                    const isPassed =
                      playheadPercent >= clip.start &&
                      playheadPercent <= clip.start + clip.duration;

                    return (
                      <div
                        key={clip.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveClipInfo(clip.name);
                        }}
                        style={{
                          left: `${clip.start}%`,
                          width: `${clip.duration}%`,
                          backgroundColor: `${track.color}40`,
                        }}
                        className={`absolute top-1.5 bottom-1.5 rounded-md px-2.5 flex items-center justify-between font-mono text-[10px] tracking-wider transition-all duration-200 border ${
                          isPassed
                            ? 'border-red-500/90 shadow-[0_0_15px_rgba(229,9,20,0.35)]'
                            : 'border-white/10 opacity-80'
                        }`}
                      >
                        <span className="truncate font-bold text-white">
                          {clip.name}
                        </span>

                        {/* Waveform graphic for audio tracks */}
                        {track.type === 'audio' && (
                          <div className="hidden sm:flex items-center gap-[2px] opacity-70">
                            {[8, 14, 20, 10, 16, 22, 12, 18, 14, 8].map((h, i) => (
                              <div
                                key={i}
                                className="w-[2px] bg-white rounded-full"
                                style={{ height: `${h * 0.4}px` }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Keyframe diamonds on effect clips */}
                        {track.type === 'effect' && (
                          <div className="w-2 h-2 rotate-45 bg-red-400 border border-white/40 shadow-sm" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Inspector Footer */}
          <div className="mt-2 pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-400 gap-3">
            <div className="flex items-center gap-3">
              <span className="text-zinc-500 uppercase">ACTIVE INSPECTOR:</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-red-400 font-bold">
                {activeClipInfo || 'SEQUENCE_OVERVIEW'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-zinc-500">
              <span>RENDER: GPU ACCELERATED</span>
              <span>AUDIO: -14 LUFS INTEGRATED</span>
              <span className="text-red-500 font-bold">SCRUB ENABLED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
