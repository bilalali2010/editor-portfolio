import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CursorMode } from '../types';

interface CustomCursorProps {
  cursorMode: CursorMode;
  cursorText?: string;
}

export default function CustomCursor({ cursorMode, cursorText }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Disable custom cursor on mobile / touch
    if (typeof window !== 'undefined') {
      const hasTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(hasTouch);

      if (hasTouch) return;

      const handleMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      };

      const handleMouseLeave = () => {
        setIsVisible(false);
      };

      const handleMouseEnter = () => {
        setIsVisible(true);
      };

      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    setIsHovered(cursorMode !== 'default');
  }, [cursorMode]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  const displayText = cursorText || (cursorMode !== 'default' ? cursorMode.toUpperCase() : '');

  return (
    <div
      id="custom-cursor-root"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Outer Ring / Capsule */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-red-500/80 bg-red-600/10 backdrop-blur-[2px] transition-colors duration-200 shadow-[0_0_20px_rgba(229,9,20,0.4)]"
        animate={{
          x: position.x - (isHovered ? 40 : 16),
          y: position.y - (isHovered ? 40 : 16),
          width: isHovered ? 80 : 32,
          height: isHovered ? 80 : 32,
          scale: isHovered ? 1.05 : 1,
          borderColor: isHovered ? '#ff2a32' : 'rgba(229, 9, 20, 0.4)',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 300,
          mass: 0.2,
        }}
      >
        {isHovered && displayText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="font-display text-[10px] font-bold tracking-widest text-white uppercase text-center px-1 select-none pointer-events-none"
          >
            {displayText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Pinpoint Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isHovered ? 0.3 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 700,
          mass: 0.05,
        }}
      />
    </div>
  );
}
