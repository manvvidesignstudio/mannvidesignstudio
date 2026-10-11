import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<'default' | 'hover' | 'view'>('default');
  const [isPointerFine, setIsPointerFine] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High-inertia luxury spring
  const springX = useSpring(mouseX, { damping: 28, stiffness: 220, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 220, mass: 0.5 });

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check element under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewElement = target.closest('[data-cursor="view"]');
      if (viewElement) {
        setCursorMode('view');
        return;
      }

      const interactiveElement = target.closest('a, button, [role="button"], input, select, textarea');
      if (interactiveElement) {
        setCursorMode('hover');
        return;
      }

      setCursorMode('default');
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isPointerFine || !isVisible) return null;

  return (
    <>
      {/* Inner tiny dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#F5F2EC] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          width: cursorMode === 'view' ? 0 : cursorMode === 'hover' ? 6 : 4,
          height: cursorMode === 'view' ? 0 : cursorMode === 'hover' ? 6 : 4,
          opacity: cursorMode === 'view' ? 0 : 0.9,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing follower ring / VIEW badge */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 border transition-colors duration-200 ${
          cursorMode === 'view'
            ? 'bg-[#11110F]/90 text-[#F5F2EC] border-[#C8A97E] backdrop-blur-md shadow-2xl'
            : cursorMode === 'hover'
            ? 'border-[#C8A97E] bg-[#C8A97E]/10'
            : 'border-[#F5F2EC]/30 bg-transparent'
        }`}
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          width: cursorMode === 'view' ? 76 : cursorMode === 'hover' ? 44 : 28,
          height: cursorMode === 'view' ? 76 : cursorMode === 'hover' ? 44 : 28,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      >
        {cursorMode === 'view' && (
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-semibold text-[#F5F2EC] select-none">
            VIEW
          </span>
        )}
      </motion.div>
    </>
  );
};
