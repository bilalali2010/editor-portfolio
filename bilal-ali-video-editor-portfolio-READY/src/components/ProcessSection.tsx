import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { Check, ArrowRight } from 'lucide-react';

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative w-full py-28 px-6 sm:px-8 bg-[#060608] text-white border-t border-zinc-900/80"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#e50914]" />
              <span className="font-mono text-xs text-red-500 font-semibold tracking-[0.25em] uppercase">
                THE SYSTEM
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              HOW I EDIT
            </h2>
          </div>

          <p className="font-body text-base text-zinc-400 max-w-md">
            A battle-tested 4-stage pipeline that turns gigabytes of unorganized media into client-ready viral content.
          </p>
        </div>

        {/* Process Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="mt-16 relative">
          {/* Horizontal Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-zinc-800 -translate-y-12 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 shadow-[0_0_15px_#e50914]"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative p-7 rounded-2xl bg-[#0d0d12] border border-zinc-800 hover:border-red-600/70 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(229,9,20,0.18)]"
              >
                <div>
                  {/* Step Badge & Indicator Node */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-red-600 group-hover:text-red-500 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-red-500 group-hover:bg-red-600/20 flex items-center justify-center text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                      0{idx + 1}
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-wide text-white group-hover:text-red-400 transition-colors uppercase">
                    {step.title}
                  </h3>

                  <p className="mt-3 font-body text-sm text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Sub-steps / details */}
                <div className="mt-6 pt-5 border-t border-zinc-900 flex flex-col gap-2">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
