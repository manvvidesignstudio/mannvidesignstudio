import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { getProjects } from '../lib/cmsStore';
import { Project, ProjectCategory } from '../types/database';
import { Seo } from '../components/seo/Seo';
import { useSearchParams } from 'react-router-dom';

type FilterCategory = 'All' | ProjectCategory;

const categoryOrder: Record<ProjectCategory, number> = {
  Residential: 0,
  Commercial: 1,
  Hospitality: 2,
};

export const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchParams] = useSearchParams();
  const requestedCategory = searchParams.get('category');
  const activeCategory: FilterCategory =
    requestedCategory === 'Residential' ||
    requestedCategory === 'Commercial' ||
    requestedCategory === 'Hospitality'
      ? requestedCategory
      : 'All';

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
    });
  }, []);

  const filteredProjects = projects
    .filter((p) => {
      if (!p.published) return false;
      if (activeCategory === 'All') return true;
      return p.category === activeCategory;
    })
    .sort((a, b) => {
      if (activeCategory !== 'All') {
        return a.display_order - b.display_order;
      }

      return (
        categoryOrder[a.category] - categoryOrder[b.category] ||
        a.display_order - b.display_order
      );
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
        {/* Selected Works */}
        <div className="mb-12 sm:mb-16">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight">
            Selected Works
          </h1>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <ProjectCard project={project} aspectRatio="aspect-[16/11]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <p className="font-serif text-2xl text-[#8E8A82]">No projects found in this category.</p>
          </div>
        )}

      </div>
      </div>
    </>
  );
};
