import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { HeroContent } from '../../types/database';
import { Hero3DCanvas } from './Hero3DCanvas';

interface HeroProps {
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  return (
    <section ref={heroRef} className="relative w-full min-h-screen h-[100svh] flex flex-col justify-between overflow-hidden bg-[#11110F]">
      {/* Background Image with warm dark architectural overlay & zoom reveal */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <img
          src={content.background_image_url}
          alt="Manvvi Design Studio Luxury Interior Architecture"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
          loading="eager"
        />
        {/* Editorial gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11110F] via-[#11110F]/40 to-[#11110F]/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#11110F]/20 to-[#11110F]/70" />
      </motion.div>

      {/* Subtle 3D Monolith element */}
      {/* <Hero3DCanvas /> */}

      {/* Spacing for fixed Navbar */}
      <div className="pt-24 sm:pt-32" />

      {/* Main Hero Editorial Typography */}
      <motion.div style={{ y: contentY }} className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full my-auto pb-12 sm:pb-16">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex items-center space-x-3"
          >
            <span className="w-8 h-[1px] bg-[#C8A97E]" />
            <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
              {content.eyebrow || 'MANVVI DESIGN STUDIO — MUMBAI'}
            </span>
          </motion.div>

          {/* Large Editorial Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-[#F5F2EC] font-normal"
            >
              Interiors built around <br className="hidden sm:inline" />
              <span className="italic font-light text-[#E8E4DC]">how you actually live.</span>
            </motion.h1>
          </div>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-xl font-sans text-[#F5F2EC]/85 max-w-2xl font-light leading-relaxed tracking-wide"
          >
            {content.subheadline || 'A Mumbai-based design studio shaping homes and workspaces with restraint, craft, and a point of view.'}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
            className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
          >
            <Link
              to={content.primary_cta_link || '/portfolio'}
              className="group inline-flex items-center justify-center space-x-3 px-8 py-4 bg-[#F5F2EC] text-[#11110F] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C8A97E] hover:text-[#11110F] transition-all duration-300 shadow-xl"
            >
              <span>{content.primary_cta_text || 'View the portfolio ↗'}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to={content.secondary_cta_link || '/contact'}
              className="inline-flex items-center justify-center space-x-3 px-8 py-4 border border-[#F5F2EC]/30 text-[#F5F2EC] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#C8A97E] hover:text-[#C8A97E] transition-all duration-300 backdrop-blur-sm"
            >
              <span>{content.secondary_cta_text || 'Start a conversation'}</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full pb-8 flex items-center justify-between text-[#8E8A82] text-[10px] uppercase tracking-[0.25em]"
      >
        <span className="hidden sm:inline">Mumbai, Maharashtra · Est. 2020</span>
        <a
          href="#studio-intro"
          className="flex items-center space-x-2 text-[#F5F2EC]/70 hover:text-[#C8A97E] transition-colors group mx-auto sm:mx-0"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:text-[#C8A97E]" />
        </a>
        <span className="hidden sm:inline">Interior Architecture</span>
      </motion.div>
    </section>
  );
};
