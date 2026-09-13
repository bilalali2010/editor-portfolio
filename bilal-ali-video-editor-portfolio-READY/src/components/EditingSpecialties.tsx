import { motion } from 'motion/react';
import {
  Smartphone,
  Film,
  Share2,
  Sparkles,
  Palette,
  Volume2,
  ArrowUpRight,
} from 'lucide-react';
import { EDITING_SPECIALTIES } from '../data/portfolioData';
import { CursorMode } from '../types';

interface EditingSpecialtiesProps {
  onSelectService: (serviceName: string) => void;
  setCursorMode: (mode: CursorMode, text?: string) => void;
}

const SERVICE_ICONS = [
  Smartphone, // Short-form
  Film, // Cinematic
  Share2, // Social media
  Sparkles, // Motion graphics
  Palette, // Color grading
  Volume2, // Sound design
];

export default function EditingSpecialties({
  onSelectService,
  setCursorMode,
}: EditingSpecialtiesProps) {
  return (
    <section
      id="services"
      className="relative w-full py-28 px-6 sm:px-8 bg-[#060608] text-white border-t border-zinc-900/80"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#e50914]" />
              <span className="font-mono text-xs text-red-500 font-semibold tracking-[0.25em] uppercase">
                CAPABILITIES & EXPERTISE
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              WHAT I DO
            </h2>
          </div>

          <p className="font-body text-base text-zinc-400 max-w-md">
            Engineered workflows combining speed, storytelling psychology, and high-production polish.
          </p>
        </div>

        {/* 6 Specialty Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDITING_SPECIALTIES.map((service, index) => {
            const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => setCursorMode('view', 'SERVICE')}
                onMouseLeave={() => setCursorMode('default')}
                className="group relative p-8 rounded-2xl bg-[#0c0c10] border border-zinc-800/90 hover:border-red-600/70 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(229,9,20,0.2)] hover:-translate-y-1 overflow-hidden"
              >
                {/* Subtle hover red glow in corner */}
                <div className="pointer-events-none absolute top-0 right-0 w-32 h-32 bg-red-600/5 group-hover:bg-red-600/20 rounded-full blur-2xl transition-colors duration-500" />

                <div>
                  {/* Top Row: Icon and Sequence Number */}
                  <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-zinc-600 group-hover:text-red-400 font-bold transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors uppercase">
                    {service.title}
                  </h3>

                  <p className="mt-1 font-mono text-xs text-red-500/80">
                    {service.tagline}
                  </p>

                  <p className="mt-4 font-body text-sm text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables Pills */}
                <div className="mt-8 pt-6 border-t border-zinc-900/80">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.deliverables.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-[10px] font-mono text-zinc-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="w-full flex items-center justify-between pt-2 text-xs font-display font-bold text-zinc-400 group-hover:text-white tracking-wider uppercase transition-colors"
                  >
                    <span>REQUEST THIS EDIT</span>
                    <ArrowUpRight className="w-4 h-4 text-red-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
