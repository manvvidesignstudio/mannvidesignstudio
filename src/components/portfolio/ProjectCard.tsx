import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types/database';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  aspectRatio = 'aspect-[4/5]',
  className = '',
}) => {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      data-cursor="view"
      className={`group block relative overflow-hidden bg-[#181715] ${className}`}
    >
      {/* Image Container with smooth zoom on hover */}
      <div className={`relative w-full ${aspectRatio} overflow-hidden`}>
        <motion.img
          src={project.cover_image}
          alt={project.title}
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
          loading="lazy"
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11110F] via-[#11110F]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Subtle Category Pill on Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-[#11110F]/70 backdrop-blur-md text-[10px] font-sans uppercase tracking-[0.2em] text-[#F5F2EC]/90 border border-[#F5F2EC]/10">
            {project.category}
          </span>
        </div>

        {/* Arrow Badge on Top Left */}
        <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-[#F5F2EC] text-[#11110F] flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        </div>

      {/* Editorial Content Below Image */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="pt-5 pb-2 space-y-1.5"
      >
        <div className="flex items-center justify-between text-xs font-sans text-[#8E8A82] uppercase tracking-[0.18em]">
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EC] group-hover:text-[#C8A97E] transition-colors duration-300 font-normal">
          {project.title}
        </h3>

        <p className="text-xs font-sans text-[#8E8A82] line-clamp-2 leading-relaxed pt-1">
          {project.short_description}
        </p>
      </motion.div>
    </Link>
  );
};
