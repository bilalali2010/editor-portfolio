import { Sliders, CheckCircle2, Shield, Eye, Flame, Clock, Quote } from 'lucide-react';
import { CursorMode } from '../types';

interface AboutSectionProps {
  setCursorMode: (mode: CursorMode, text?: string) => void;
}

export default function AboutSection({ setCursorMode }: AboutSectionProps) {
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

          {/* Right: Editing Philosophy Quote Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-2xl bg-[#0b0b0f] border-2 border-zinc-800 overflow-hidden p-8 sm:p-10 flex flex-col justify-center min-h-[320px] shadow-2xl">
              <Quote className="w-10 h-10 text-red-600/50 mb-6" strokeWidth={1.5} />

              <p className="font-display text-xl sm:text-2xl font-semibold text-white leading-snug italic">
                Editing isn&apos;t about adding more — it&apos;s about cutting away everything that isn&apos;t the story.
              </p>

              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center gap-3">
                <span className="w-8 h-px bg-red-600" />
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                  Bilal Ali, Video Editor
                </span>
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
