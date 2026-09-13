import { useState, useRef, type ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { Camera, Upload, Sliders, CheckCircle2, Shield, Eye, Flame, Clock } from 'lucide-react';
import { CursorMode } from '../types';

interface AboutSectionProps {
  setCursorMode: (mode: CursorMode, text?: string) => void;
}

export default function AboutSection({ setCursorMode }: AboutSectionProps) {
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setCustomPhotoUrl(url);
    }
  };

  return (
    <section
      id="about"
      className="relative w-full py-28 px-6 sm:px-8 bg-[#07070a] text-white border-t border-zinc-900/80"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#e50914]" />
          <span className="font-mono text-xs text-red-500 font-semibold tracking-[0.25em] uppercase">
            PHILOSOPHY & ETHOS
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white pb-10 border-b border-zinc-900">
          BEHIND THE EDIT
        </h2>

        {/* Main Content Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Exact Copywriting & Editor Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              I&apos;m Bilal Ali, a video editor focused on turning raw footage into engaging visual stories.
            </h3>

            <p className="mt-6 font-body text-base sm:text-lg text-zinc-300 leading-relaxed">
              I combine clean editing, strong pacing, sound design, motion and visual storytelling to create content that doesn&apos;t just look good — it keeps people watching.
            </p>

            {/* Core Working Disciplines */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0d0d12] border border-zinc-800 flex items-start gap-3">
                <Flame className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-white uppercase">
                    Retention-Driven
                  </h4>
                  <p className="mt-1 font-body text-xs text-zinc-400">
                    Calculated cuts that hold the audience past the critical 3-second dropoff point.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0d0d12] border border-zinc-800 flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-white uppercase">
                    Dependable Pipeline
                  </h4>
                  <p className="mt-1 font-body text-xs text-zinc-400">
                    Tight turnarounds, clean project management, and rapid revision response.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Studio Suite Visualizer / Workstation UI (Zero Fake People!) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl bg-[#0b0b0f] border-2 border-zinc-800 overflow-hidden p-6 flex flex-col justify-between shadow-2xl">
              {/* Optional Custom Photo if Bilal uploads his real photo */}
              {customPhotoUrl ? (
                <div className="absolute inset-0 z-10">
                  <img
                    src={customPhotoUrl}
                    alt="Bilal Ali Video Editor"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>
              ) : (
                /* Abstract Editing Suite Deck (Authentic & Atmospheric) */
                <div className="flex flex-col justify-between h-full relative z-0">
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                    <span className="font-mono text-xs text-zinc-400">EDITING SUITE</span>
                    <span className="font-mono text-xs text-red-500 font-bold">CALIBRATED</span>
                  </div>

                  {/* Color Scope / Waveform Visualizer simulation */}
                  <div className="my-auto py-6 flex flex-col items-center justify-center gap-3">
                    <div className="relative w-28 h-28 rounded-full border border-red-500/40 flex items-center justify-center bg-red-950/20 shadow-[0_0_30px_rgba(229,9,20,0.2)]">
                      <div className="w-16 h-16 rounded-full border border-zinc-600 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                      </div>
                      {/* Compass degrees */}
                      <span className="absolute top-1 font-mono text-[8px] text-zinc-500">709</span>
                      <span className="absolute right-1 font-mono text-[8px] text-zinc-500">R</span>
                      <span className="absolute bottom-1 font-mono text-[8px] text-zinc-500">G</span>
                      <span className="absolute left-1 font-mono text-[8px] text-zinc-500">B</span>
                    </div>

                    <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase">
                      COLOR SCIENCE & SOUND DESIGN
                    </span>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>NATIVE 4K 10-BIT</span>
                    <span>STUDIO MONITORING</span>
                  </div>
                </div>
              )}

              {/* Photo Upload Trigger */}
              <div className="relative z-20 flex justify-end">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
                  title="Upload your professional photo"
                >
                  <Camera className="w-3.5 h-3.5 text-red-500" />
                  <span>{customPhotoUrl ? 'CHANGE PHOTO' : 'ADD REAL PHOTO'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 17: Non-Numerical Professional Statements (Strictly Respecting No Fake Numbers) */}
        <div className="mt-20 pt-12 border-t border-zinc-900 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#0c0c10] border border-zinc-800/80 flex flex-col justify-between">
            <span className="font-display text-2xl font-black text-red-500 tracking-wide">
              RETENTION
            </span>
            <div className="mt-4">
              <h5 className="font-display text-xs font-bold text-white uppercase">FIRST PRIORITY</h5>
              <p className="mt-1 font-mono text-[11px] text-zinc-400">
                Pacing crafted to prevent viewer dropoff in the first 3 seconds.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#0c0c10] border border-zinc-800/80 flex flex-col justify-between">
            <span className="font-display text-2xl font-black text-white tracking-wide">
              24–48h
            </span>
            <div className="mt-4">
              <h5 className="font-display text-xs font-bold text-white uppercase">RAPID PIPELINE</h5>
              <p className="mt-1 font-mono text-[11px] text-zinc-400">
                Streamlined turnaround for daily and weekly publishing schedules.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#0c0c10] border border-zinc-800/80 flex flex-col justify-between">
            <span className="font-display text-2xl font-black text-red-500 tracking-wide">
              MULTI-RATIO
            </span>
            <div className="mt-4">
              <h5 className="font-display text-xs font-bold text-white uppercase">ALL PLATFORMS</h5>
              <p className="mt-1 font-mono text-[11px] text-zinc-400">
                9:16 Vertical Reels, 16:9 Cinema, and 1:1 Social exports.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#0c0c10] border border-zinc-800/80 flex flex-col justify-between">
            <span className="font-display text-2xl font-black text-white tracking-wide">
              ZERO SLOP
            </span>
            <div className="mt-4">
              <h5 className="font-display text-xs font-bold text-white uppercase">CLEAN CRAFT</h5>
              <p className="mt-1 font-mono text-[11px] text-zinc-400">
                Purposeful cuts and high-impact sound design with no gimmick plugins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
