import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { getProjects } from '../lib/cmsStore';
import { Project } from '../types/database';
import { Reveal } from '../components/animations/Reveal';
import { Seo } from '../components/seo/Seo';

type FilterCategory = 'All' | 'Residential' | 'Commercial' | 'Hospitality';

export const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
    });
  }, []);

  const categories: FilterCategory[] = ['All', 'Residential', 'Commercial', 'Hospitality'];

  const filteredProjects = projects.filter((p) => {
    if (!p.published) return false;
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <>
      <Seo
        title="Interior Design Projects in Mumbai | Manvvi Design Studio"
        description="Explore residential, commercial, and hospitality interior design projects by Manvvi Design Studio across Mumbai and Western India."
        path="/portfolio"
      />
      <div className="min-h-screen bg-[#11110F] text-[#F5F2EC] pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Editorial Page Header */}
        <div className="max-w-3xl space-y-6 mb-16 sm:mb-24">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#C8A97E]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
              Selected Works
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight">
            Interior design projects in Mumbai and Western India.
          </h1>

          <p className="text-base sm:text-lg font-sans text-[#8E8A82] leading-relaxed max-w-2xl font-light">
            An ongoing archive of private villas, architectural apartments, and tailored commercial environments completed throughout Western India.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 border-b border-[#F5F2EC]/10 pb-6 mb-16">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? projects.filter((p) => p.published).length
                : projects.filter((p) => p.published && p.category === cat).length;

            const isSelected = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative pb-2 text-xs uppercase tracking-[0.2em] font-sans transition-colors duration-300 ${
                  isSelected ? 'text-[#C8A97E]' : 'text-[#8E8A82] hover:text-[#F5F2EC]'
                }`}
              >
                <span>{cat}</span>
                <span className="ml-1.5 text-[10px] opacity-60">({count})</span>

                {isSelected && (
                  <motion.div
                    layoutId="portfolioFilterUnderline"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C8A97E]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Masonry / Asymmetric Editorial Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={idx % 2 === 1 ? 'md:mt-16' : ''}
              >
                <ProjectCard project={project} aspectRatio="aspect-[16/11]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <p className="font-serif text-2xl text-[#8E8A82]">No projects found in this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="text-xs uppercase tracking-[0.2em] text-[#C8A97E] underline"
            >
              View all projects
            </button>
          </div>
        )}
      </div>
      </div>
    </>
  );
};
