import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Volume2, VolumeX, Maximize2, Clock } from 'lucide-react';
import { PortfolioProject, CursorMode } from '../types';

export interface ProjectCardProps {
  key?: string;
  project: PortfolioProject;
  featuredLayout?: boolean;
  onOpenModal: (project: PortfolioProject) => void;
  setCursorMode: (mode: CursorMode, text?: string) => void;
}

export default function ProjectCard({
  project,
  featuredLayout = false,
  onOpenModal,
  setCursorMode,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string>(project.videoUrl);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync if project changes
  useEffect(() => {
    setVideoSrc(project.videoUrl);
  }, [project.videoUrl]);

  const handleVideoError = () => {
    if (project.fallbackVideoUrl && videoSrc !== project.fallbackVideoUrl) {
      setVideoSrc(project.fallbackVideoUrl);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorMode('watch', 'WATCH');
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursorMode('default');
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  if (featuredLayout) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-col lg:flex-row rounded-3xl bg-[#0f0f13] border-2 border-red-600/50 hover:border-red-500 overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(229,9,20,0.2)]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Featured Video Player Area */}
        <div className="relative w-full lg:w-7/12 aspect-[16/9] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[480px] bg-black overflow-hidden flex items-center justify-center">
          {project.posterUrl && (
            <img
              src={project.posterUrl}
              alt={project.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                isHovered ? 'scale-105 opacity-30' : 'scale-100 opacity-75'
              }`}
            />
          )}

          <video
            ref={videoRef}
            src={videoSrc}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            onError={handleVideoError}
            onWaiting={() => setIsVideoLoading(true)}
            onPlaying={() => setIsVideoLoading(false)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-70'
            }`}
          />

          <div className="pointer-events-none absolute inset-0 film-grain opacity-60" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-black/60" />

          {/* Badges */}
          <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white font-display text-[11px] font-extrabold tracking-widest uppercase shadow-[0_0_15px_#e50914]">
                FEATURED EDIT
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-zinc-800 text-zinc-300 font-mono text-[10px]">
                {project.projectType}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-zinc-800 text-zinc-300 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>{project.duration}</span>
            </div>
          </div>

          {/* Center Play Circle */}
          <div
            onClick={() => onOpenModal(project)}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer"
          >
            <motion.div
              animate={{
                scale: isHovered ? 1.15 : 1,
                backgroundColor: isHovered ? '#e50914' : 'rgba(15,15,19,0.85)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-20 h-20 rounded-full border border-red-500/60 flex items-center justify-center text-white shadow-2xl backdrop-blur-md"
            >
              <Play className="w-8 h-8 fill-white translate-x-0.5" />
            </motion.div>
            <span className="mt-3 font-display text-xs font-bold tracking-[0.25em] text-zinc-300 uppercase group-hover:text-white transition-colors">
              CLICK TO WATCH FULL EDIT
            </span>
          </div>

          {/* Bottom Bar Controls */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-start">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="p-2.5 rounded-full bg-black/70 hover:bg-black text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
              title={isMuted ? 'Unmute preview' : 'Mute preview'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-500" />}
            </button>
          </div>
        </div>

        {/* Featured Project Narrative & Technique Breakdown */}
        <div className="w-full lg:w-5/12 p-8 sm:p-10 flex flex-col justify-between bg-[#0f0f13] border-t lg:border-t-0 lg:border-l border-zinc-800/80">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-800">
              <span className="font-mono text-xs text-red-500 font-bold tracking-widest uppercase">
                PROJECT {project.projectNumber} • {project.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px]">
                {project.aspectRatio} VERTICAL
              </span>
            </div>

            <h3 className="mt-4 font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight group-hover:text-red-400 transition-colors">
              {project.title}
            </h3>

            {project.quote && (
              <p className="mt-3 p-3 rounded-xl bg-zinc-950/80 border-l-2 border-red-600 font-mono text-xs text-zinc-300 italic">
                {project.quote}
              </p>
            )}

            <p className="mt-4 font-body text-sm text-zinc-400 leading-relaxed">
              {project.description}
            </p>

            {/* Techniques */}
            <div className="mt-6">
              <span className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-2">
                APPLIED EDITING TECHNIQUES:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techniques.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
                  >
                    • {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="mt-5 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="text-zinc-400">TOOLS:</span>
              <span className="text-zinc-200">{project.tools.join(', ')}</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
            <span className="font-mono text-xs text-red-400">
              {project.metricsOrHighlight}
            </span>

            <button
              type="button"
              onClick={() => onOpenModal(project)}
              className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-[#ff1e27] text-white font-display text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center gap-2 shadow-[0_0_20px_rgba(229,9,20,0.4)]"
            >
              <span>WATCH VIDEO</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl bg-[#0f0f13] border border-zinc-800/80 hover:border-red-600/70 overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(229,9,20,0.22)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Container — Respecting 9:16 Vertical or Custom Aspect Ratio */}
      <div className="relative w-full aspect-[9/16] max-h-[580px] bg-black overflow-hidden flex items-center justify-center">
        {/* Poster / Backdrop Image */}
        {project.posterUrl && (
          <img
            src={project.posterUrl}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105 opacity-20' : 'scale-100 opacity-80'
            }`}
          />
        )}

        {/* Real Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onError={handleVideoError}
          onWaiting={() => setIsVideoLoading(true)}
          onPlaying={() => setIsVideoLoading(false)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-60'
          }`}
        />

        {/* Film Grain Texture over video */}
        <div className="pointer-events-none absolute inset-0 film-grain opacity-60" />

        {/* Dark vignette gradient for typography legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-black/30 to-black/70" />

        {/* Top Badges: Category & Duration */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-zinc-800 text-red-400 font-display text-[10px] font-bold tracking-widest uppercase">
              {project.category}
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-400 font-mono text-[9px]">
              {project.projectType}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-zinc-800 text-zinc-300 font-mono text-[10px]">
            <Clock className="w-3 h-3 text-red-500" />
            <span>{project.duration}</span>
          </div>
        </div>

        {/* Project Number Indicator */}
        <div className="absolute top-12 left-4 z-20 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-black/80 border border-zinc-800 text-zinc-300 font-mono text-[9px] tracking-wider">
            PROJECT {project.projectNumber}
          </span>
        </div>

        {/* Center Hover Trigger / Play Circle */}
        <div
          onClick={() => onOpenModal(project)}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer"
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.15 : 1,
              backgroundColor: isHovered ? '#e50914' : 'rgba(15,15,19,0.85)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-16 h-16 rounded-full border border-red-500/50 flex items-center justify-center text-white shadow-2xl backdrop-blur-md"
          >
            <Play className="w-6 h-6 fill-white translate-x-0.5" />
          </motion.div>

          <span className="mt-3 font-display text-[11px] font-bold tracking-[0.25em] text-zinc-300 uppercase group-hover:text-white transition-colors">
            CLICK TO WATCH
          </span>
        </div>

        {/* Bottom Audio Control overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-start">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
            title={isMuted ? 'Unmute preview' : 'Mute preview'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-500" />}
          </button>
        </div>
      </div>

      {/* Project Details Footer */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-[#0f0f13] border-t border-zinc-900">
        <div>
          <h3 className="font-display text-lg font-bold text-white tracking-wide group-hover:text-red-400 transition-colors">
            {project.title}
          </h3>

          {project.quote && (
            <p className="mt-1 font-mono text-xs text-red-500/90 italic line-clamp-1">
              {project.quote}
            </p>
          )}

          <p className="mt-2 font-body text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags & Watch Button */}
        <div className="mt-4 pt-3 border-t border-zinc-900/80 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 font-mono text-[9px] tracking-wider"
              >
                #{tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onOpenModal(project)}
            className="px-3 py-1.5 rounded-md bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white font-display text-[11px] font-bold tracking-widest uppercase transition-all duration-200 flex items-center gap-1.5"
          >
            <span>WATCH</span>
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
