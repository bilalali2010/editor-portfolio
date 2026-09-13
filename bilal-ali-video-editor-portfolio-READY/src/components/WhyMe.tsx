import { motion } from 'motion/react';
import { WHY_ME_POINTS } from '../data/portfolioData';
import { Target, Zap, ShieldCheck, Sparkles } from 'lucide-react';

const BENEFIT_ICONS = [Target, Zap, ShieldCheck, Sparkles];

export default function WhyMe() {
  return (
    <section
      id="why-me"
      className="relative w-full py-28 px-6 sm:px-8 bg-[#07070a] text-white border-t border-zinc-900/80"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#e50914]" />
              <span className="font-mono text-xs text-red-500 font-semibold tracking-[0.25em] uppercase">
                THE COMPETITIVE EDGE
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              WHY WORK WITH ME?
            </h2>
          </div>

          <p className="font-body text-base text-zinc-400 max-w-md">
            No generic claims. Measurable editing discipline focused on client outcomes and viewer retention.
          </p>
        </div>

        {/* 4 Benefits Stack */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {WHY_ME_POINTS.map((point, index) => {
            const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];

            return (
              <motion.div
                key={point.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="group relative p-8 rounded-2xl bg-[#0c0c10] border border-zinc-800/80 hover:border-red-600/60 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_25px_rgba(229,9,20,0.15)]"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
                    <span className="font-mono text-3xl font-black text-red-600/80 group-hover:text-red-500 transition-colors">
                      {point.number}
                    </span>
                    <div className="p-2 rounded-lg bg-zinc-900 text-zinc-400 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5 text-red-500" />
                    </div>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors uppercase">
                    {point.title}
                  </h3>

                  <p className="mt-4 font-body text-base text-zinc-400 leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STANDARD OF WORK</span>
                  <span className="text-red-500 font-semibold">100% NON-NEGOTIABLE</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
