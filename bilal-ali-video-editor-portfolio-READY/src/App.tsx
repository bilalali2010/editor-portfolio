/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CursorMode, PortfolioProject } from './types';
import { PORTFOLIO_PROJECTS } from './data/portfolioData';

import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedWork from './components/SelectedWork';
import VideoModal from './components/VideoModal';
import EditingSpecialties from './components/EditingSpecialties';
import WhyMe from './components/WhyMe';
import InteractiveTimeline from './components/InteractiveTimeline';
import ProcessSection from './components/ProcessSection';
import AboutSection from './components/AboutSection';
import CtaSection from './components/CtaSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorMode, setCursorModeState] = useState<CursorMode>('default');
  const [cursorText, setCursorText] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const setCursorMode = useCallback((mode: CursorMode, text?: string) => {
    setCursorModeState(mode);
    setCursorText(text);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ScrollSpy to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'work', 'services', 'why-me', 'timeline', 'process', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#060608] text-white font-body selection:bg-red-600 selection:text-white relative overflow-x-hidden">
      {/* Desktop Custom Animated Cursor */}
      <CustomCursor cursorMode={cursorMode} cursorText={cursorText} />

      {/* Cinematic 2-Second Loading Experience */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Global Minimal Fixed Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        setCursorMode={setCursorMode}
      />

      {/* Main Portfolio Sections */}
      <main className="w-full">
        {/* Section 6 & 7: Hero with word-by-word reveal, red glow & moving timeline */}
        <Hero
          onExploreWork={() => scrollToSection('work')}
          onContact={() => scrollToSection('contact')}
          setCursorMode={setCursorMode}
        />

        {/* Section 9 & 10: The Work / Selected Video Projects Showcase */}
        <SelectedWork
          projects={PORTFOLIO_PROJECTS}
          onOpenModal={(proj) => setSelectedProject(proj)}
          setCursorMode={setCursorMode}
        />

        {/* Section 12: Editing Specialties / WHAT I DO */}
        <EditingSpecialties
          onSelectService={(service) => {
            setPreselectedService(service);
            scrollToSection('contact');
          }}
          setCursorMode={setCursorMode}
        />

        {/* Section 13: Why Work With Me? (4 strong retention-first benefits) */}
        <WhyMe />

        {/* Section 14: Editing Timeline Visual (Tracks, Waveforms, Playhead, Markers) */}
        <InteractiveTimeline setCursorMode={setCursorMode} />

        {/* Section 15: How I Edit 4-Step Process Timeline */}
        <ProcessSection />

        {/* Section 16 & 17: Behind The Edit / About & Authentic Non-numerical Stats */}
        <AboutSection setCursorMode={setCursorMode} />

        {/* Section 19: Climax Dramatic Full-Screen CTA */}
        <CtaSection
          onStartProject={() => scrollToSection('contact')}
          onWatchWork={() => scrollToSection('work')}
          setCursorMode={setCursorMode}
        />

        {/* Section 20: Premium Contact Form & Direct Channels */}
        <ContactSection
          initialService={preselectedService}
          setCursorMode={setCursorMode}
        />
      </main>

      {/* Section 21: Minimal Black Footer */}
      <Footer onNavigate={scrollToSection} setCursorMode={setCursorMode} />

      {/* Section 10: Full-Screen Cinematic Video Modal Viewer */}
      {selectedProject && (
        <VideoModal
          project={selectedProject}
          projects={PORTFOLIO_PROJECTS}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(proj) => setSelectedProject(proj)}
          setCursorMode={setCursorMode}
        />
      )}
    </div>
  );
}
