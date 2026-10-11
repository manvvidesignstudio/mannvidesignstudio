import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const word = 'MANVVI';

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[#11110F] pointer-events-none select-none"
        >
          {/* Architectural drafting grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(200,169,126,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,126,0.18) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />

          {/* Split curtains create the reveal */}
          <motion.div
            initial={{ width: '50%' }}
            animate={{ width: 0 }}
            transition={{ duration: 1.15, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="absolute left-0 top-0 bottom-0 z-10 bg-[#11110F]"
          />
          <motion.div
            initial={{ width: '50%' }}
            animate={{ width: 0 }}
            transition={{ duration: 1.15, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="absolute right-0 top-0 bottom-0 z-10 bg-[#11110F]"
          />

          <div className="relative z-20 flex w-full max-w-3xl flex-col items-center px-6">
            <div className="mb-10 flex w-full items-center justify-between text-[9px] uppercase tracking-[0.32em] text-[#8E8A82]">
              <motion.span
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Interior / Architecture
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Mumbai · India
              </motion.span>
            </div>

            <div className="relative flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.35, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute h-28 w-28 rotate-45 border border-[#C8A97E]/70"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute h-20 w-20 rounded-full border border-[#F5F2EC]/20"
              />
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative font-serif text-6xl font-light tracking-[-0.16em] text-[#C8A97E]"
              >
                M
              </motion.span>
            </div>

            <div className="mt-12 flex overflow-hidden">
              {word.split('').map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.55 + index * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-serif text-4xl font-normal tracking-[0.22em] text-[#F5F2EC] sm:text-6xl"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.95 }}
              className="mt-4 text-[10px] uppercase tracking-[0.45em] text-[#8E8A82]"
            >
              Design Studio
            </motion.div>

            <div className="mt-12 flex w-56 items-center gap-3">
              <div className="h-px flex-1 bg-[#F5F2EC]/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
                  className="h-full bg-[#C8A97E]"
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-[9px] tracking-[0.2em] text-[#C8A97E]"
              >
                2024
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
