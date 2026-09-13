import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Film } from 'lucide-react';
import { PortfolioProject, ProjectCategory, CursorMode } from '../types';
import ProjectCard from './ProjectCard';

interface SelectedWorkProps {
  projects: PortfolioProject[];
  onOpenModal: (project: PortfolioProject) => void;
  setCursorMode: (mode: CursorMode, text?: string) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'ALL',
  'REELS',
  'SHORT-FORM',
  'SOCIAL MEDIA',
  'CINEMATIC',
  'BRAND CONTENT',
];

export default function SelectedWork({
  projects,
  onOpenModal,
  setCursorMode,
}: SelectedWorkProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL');

  const filteredProjects =
    activeCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="work"
      className="relative w-full py-28 px-6 sm:px-8 bg-[#060608] text-white border-t border-zinc-900/80"
    >
      {/* Background Accent Glow */}
      <div className="pointer-events-none absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-900/10 blur-[160px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#e50914]" />
              <span className="font-mono text-xs text-red-500 font-semibold tracking-[0.25em] uppercase">
                THE WORK • SHOWCASE
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              SELECTED WORK
            </h2>

            <p className="mt-3 font-body text-base text-zinc-400 max-w-xl">
              A few edits I&apos;ve created to turn ordinary footage into content that demands attention.
            </p>
          </div>

          {/* Quick Notice: 9:16 Vertical Reel Native Format */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e0e12] border border-zinc-800 text-xs font-mono text-zinc-400">
            <Film className="w-4 h-4 text-red-500" />
            <span>9:16 VERTICAL REELS • TAP TO PREVIEW</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pb-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setCursorMode('view', cat)}
                onMouseLeave={() => setCursorMode('default')}
                className={`px-4 py-2 rounded-full font-display text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-[0_0_18px_rgba(229,9,20,0.5)]'
                    : 'bg-[#101014] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Video Projects Display */}
        {activeCategory === 'ALL' ? (
          <div className="mt-6 flex flex-col gap-8">
            {/* Top Large Featured Project 01 */}
            {filteredProjects[0] && (
              <ProjectCard
                key={filteredProjects[0].id}
                project={filteredProjects[0]}
                featuredLayout={true}
                onOpenModal={onOpenModal}
                setCursorMode={setCursorMode}
              />
            )}

            {/* Remaining Projects in 2x2 Grid (Projects 02, 03, 04, 05) */}
            {filteredProjects.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
                {filteredProjects.slice(1).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    featuredLayout={false}
                    onOpenModal={onOpenModal}
                    setCursorMode={setCursorMode}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <motion.div
            layout
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featuredLayout={false}
                  onOpenModal={onOpenModal}
                  setCursorMode={setCursorMode}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
