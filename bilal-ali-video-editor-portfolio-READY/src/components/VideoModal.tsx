import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  Tag,
  Maximize,
  Sparkles,
} from 'lucide-react';
import { PortfolioProject, CursorMode } from '../types';

interface VideoModalProps {
  project: PortfolioProject | null;
  projects: PortfolioProject[];
  onClose: () => void;
  onSelectProject: (project: PortfolioProject) => void;
  setCursorMode: (mode: CursorMode, text?: string) => void;
}

export default function VideoModal({
  project,
  projects,
  onClose,
  onSelectProject,
  setCursorMode,
}: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoSrc, setVideoSrc] = useState<string>(project?.videoUrl || '');
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentIndex = projects.findIndex((p) => p.id === project?.id);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectProject(projects[currentIndex - 1]);
    } else {
      onSelectProject(projects[projects.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      onSelectProject(projects[currentIndex + 1]);
    } else {
      onSelectProject(projects[0]);
    }
  };

  // Sync video source & error handling
  useEffect(() => {
    if (project) {
      setVideoSrc(project.videoUrl);
    }
  }, [project]);

  const handleVideoError = () => {
    if (project?.fallbackVideoUrl && videoSrc !== project.fallbackVideoUrl) {
      setVideoSrc(project.fallbackVideoUrl);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    // Reset video state on project change
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [project, videoSrc]);

  if (!project) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        id="video-viewer-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 md:p-8"
      >
        {/* Background ambient red spotlight */}
        <div className="pointer-events-none absolute w-[700px] h-[700px] bg-red-600/10 rounded-full blur-[180px]" />

        {/* Close Button Top-Right */}
        <button
          type="button"
          onClick={onClose}
          onMouseEnter={() => setCursorMode('open', 'CLOSE')}
          onMouseLeave={() => setCursorMode('default')}
          className="absolute top-5 right-5 z-50 p-3 rounded-full bg-zinc-900/80 hover:bg-red-600 text-zinc-300 hover:text-white border border-zinc-700/80 transition-all duration-200"
          aria-label="Close Video Viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Previous Project Button */}
        <button
          type="button"
          onClick={handlePrev}
          onMouseEnter={() => setCursorMode('view', 'PREV')}
          onMouseLeave={() => setCursorMode('default')}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-40 p-3.5 rounded-full bg-zinc-900/70 hover:bg-red-600 text-zinc-300 hover:text-white border border-zinc-800 transition-all duration-200 shadow-xl"
          aria-label="Previous Video"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Project Button */}
        <button
          type="button"
          onClick={handleNext}
          onMouseEnter={() => setCursorMode('view', 'NEXT')}
          onMouseLeave={() => setCursorMode('default')}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-40 p-3.5 rounded-full bg-zinc-900/70 hover:bg-red-600 text-zinc-300 hover:text-white border border-zinc-800 transition-all duration-200 shadow-xl"
          aria-label="Next Video"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Modal Content Card */}
        <div className="relative z-20 w-full max-w-5xl max-h-[92vh] flex flex-col lg:flex-row items-center justify-center gap-6 overflow-y-auto lg:overflow-hidden bg-[#0c0c10] border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-2xl">
          {/* Left / Center Video Stage */}
          <div className="relative flex items-center justify-center w-full lg:w-auto h-[60vh] sm:h-[68vh] lg:h-[78vh] aspect-[9/16] bg-black rounded-2xl overflow-hidden border border-zinc-900 shadow-2xl shrink-0">
            <video
              ref={videoRef}
              src={videoSrc}
              playsInline
              loop
              autoPlay
              muted={isMuted}
              onError={handleVideoError}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-contain"
            />

            {/* Custom Interactive Controls Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col gap-2">
              {/* Progress Slider */}
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-zinc-800 accent-red-600 rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between text-xs font-mono text-zinc-300 pt-1">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1 hover:text-red-500 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1 hover:text-red-500 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-400" />}
                  </button>
                  <span>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <span className="text-[10px] text-zinc-500 font-mono">
                  {project.aspectRatio} CINEMA
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Project Info & Narrative Details */}
          <div className="flex flex-col justify-between w-full lg:w-96 text-left py-2 max-h-[78vh] overflow-y-auto pr-1">
            <div>
              {/* Category & Sequence Index */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-red-600/15 border border-red-500/40 text-red-400 font-display text-xs font-bold tracking-widest uppercase">
                    {project.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px]">
                    {project.projectType}
                  </span>
                </div>
                <span className="font-mono text-xs text-zinc-500">
                  PROJECT {project.projectNumber}
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-4 font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {project.title}
              </h2>

              {/* Spoken Quote or Key Highlight */}
              {project.quote && (
                <div className="mt-3 p-3 rounded-lg bg-zinc-950 border-l-2 border-red-600 text-xs font-mono text-zinc-300 italic">
                  {project.quote}
                </div>
              )}

              {/* Description */}
              <p className="mt-4 font-body text-sm text-zinc-400 leading-relaxed">
                {project.description}
              </p>

              {/* Techniques Applied Checklist */}
              <div className="mt-5 p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80">
                <span className="block font-mono text-[11px] font-bold text-zinc-300 tracking-wider uppercase mb-2">
                  TECHNIQUES:
                </span>
                <div className="flex flex-col gap-1.5 text-xs font-mono text-zinc-400">
                  {project.techniques.map((tech) => (
                    <div key={tech} className="flex items-center gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span className="text-zinc-300">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-zinc-500">TOOLS:</span>
                <span className="text-zinc-200">{project.tools.join(', ')}</span>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions inside modal */}
            <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-[#ff1e27] text-white font-display text-xs font-bold tracking-widest uppercase transition-colors text-center"
                >
                  {isPlaying ? 'PAUSE VIDEO' : 'WATCH VIDEO'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-display text-xs font-bold tracking-widest uppercase border border-zinc-800 transition-colors"
                >
                  CLOSE
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:hidden">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-3 py-1.5 rounded bg-zinc-800 text-xs font-mono text-white"
                  >
                    PREV
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-3 py-1.5 rounded bg-zinc-800 text-xs font-mono text-white"
                  >
                    NEXT
                  </button>
                </div>

                <span className="font-mono text-[10px] text-zinc-500 hidden sm:inline">
                  [SPACE] PLAY • [ESC] CLOSE • [← / →] NEXT
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
