import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Compass, Maximize2, Calendar, MapPin, Tag } from 'lucide-react';
import { getProjectBySlug, getProjects } from '../lib/cmsStore';
import { Project } from '../types/database';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { Reveal, ParallaxImage } from '../components/animations/Reveal';
import { Seo } from '../components/seo/Seo';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [beforeAfterPos, setBeforeAfterPos] = useState(50);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    if (slug) {
      Promise.all([getProjectBySlug(slug), getProjects()]).then(([found, list]) => {
        if (found) {
          setProject(found);
        }
        if (list) {
          setAllProjects(list);
        }
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <>
        <Seo
          title="Interior Design Project | Manvvi Design Studio, Mumbai"
          description="Explore an interior architecture project by Manvvi Design Studio in Mumbai."
        />
        <div className="min-h-screen bg-[#11110F] flex items-center justify-center text-[#F5F2EC]">
          <div className="w-8 h-8 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Seo
          title="Project Not Found | Manvvi Design Studio, Mumbai"
          description="The requested interior design project could not be located in the Manvvi Design Studio portfolio."
          noIndex
        />
        <div className="min-h-screen bg-[#11110F] flex flex-col items-center justify-center text-[#F5F2EC] px-6 text-center space-y-6">
          <h1 className="font-serif text-4xl">Project Not Found</h1>
          <p className="text-sm text-[#8E8A82]">The requested project could not be located in our portfolio.</p>
          <button
            onClick={() => navigate('/portfolio')}
            className="px-6 py-3 border border-[#C8A97E] text-[#C8A97E] text-xs uppercase tracking-[0.2em] hover:bg-[#C8A97E] hover:text-[#11110F] transition-colors"
          >
            Return to Portfolio
          </button>
        </div>
      </>
    );
  }

  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug && p.published)
    .slice(0, 2);

  return (
    <>
      <Seo
        title={`${project.title} | Mumbai Interior Design`}
        description={`Explore ${project.title}, a ${project.category.toLowerCase()} interior design project in ${project.location} by Manvvi Design Studio. ${project.short_description}`}
        path={`/portfolio/${project.slug}`}
        image={project.cover_image}
        type="article"
      />
      <article className="min-h-screen bg-[#11110F] text-[#F5F2EC]">
      {/* Fullscreen Hero Cover */}
      <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-[#181715]">
        <ParallaxImage
          wrapperClassName="absolute inset-0"
          src={project.cover_image}
          alt={project.title}
          className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11110F] via-[#11110F]/30 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-28 left-6 sm:left-12 z-20">
          <Link
            to="/portfolio"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] px-4 py-2 bg-[#11110F]/70 backdrop-blur-md border border-[#F5F2EC]/10 text-[#F5F2EC] hover:text-[#C8A97E] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Projects</span>
          </Link>
        </div>

        {/* Hero Title Container */}
        <div className="absolute bottom-12 left-0 w-full z-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
            <Reveal className="space-y-4 max-w-4xl" y={20}>
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans uppercase tracking-[0.2em] text-[#C8A97E]">
                <span>{project.category}</span>
                <span>•</span>
                <span>{project.location}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] text-[#F5F2EC]">
                {project.title}
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Project Meta Bar */}
      <section className="border-y border-[#F5F2EC]/10 py-8 bg-[#141311]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <Reveal className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E8A82]">Location</span>
              <p className="text-sm font-serif text-[#F5F2EC]">{project.location}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E8A82]">Completion</span>
              <p className="text-sm font-serif text-[#F5F2EC]">{project.year}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E8A82]">Area</span>
              <p className="text-sm font-serif text-[#F5F2EC]">{project.project_specs?.area || 'Bespoke Scale'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E8A82]">Scope</span>
              <p className="text-sm font-serif text-[#F5F2EC]">{project.project_specs?.scope || 'Interior Architecture'}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Narrative & Design Concept */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">The Brief & Context</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC] font-normal leading-snug">
                  {project.short_description}
                </h2>
              </div>

              <div className="text-base sm:text-lg text-[#F5F2EC]/80 font-sans font-light leading-relaxed space-y-4">
                <p>{project.description}</p>
              </div>

              {project.concept && (
                <div className="p-8 border border-[#F5F2EC]/10 bg-[#161513] space-y-3">
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#C8A97E] block">
                    Design Concept & Spatial Thesis
                  </span>
                  <p className="font-serif text-xl sm:text-2xl text-[#F5F2EC] italic font-normal leading-relaxed">
                    "{project.concept}"
                  </p>
                </div>
              )}
            </div>

            {/* Right Architectural Specifications */}
            <div className="lg:col-span-5 space-y-10 lg:pl-8 border-t lg:border-t-0 lg:border-l border-[#F5F2EC]/10 pt-12 lg:pt-0">
              {/* Material Palette */}
              {project.material_palette && project.material_palette.length > 0 && (
                <div className="space-y-4">
                  <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E] block">
                    Material Composition
                  </span>
                  <ul className="space-y-2.5">
                    {project.material_palette.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-sm font-sans text-[#F5F2EC]/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Spatial Specs */}
              {project.project_specs && (
                <div className="space-y-4">
                  <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E] block">
                    Technical Specifications
                  </span>
                  <div className="divide-y divide-[#F5F2EC]/10 text-xs font-sans">
                    {Object.entries(project.project_specs).map(([key, val]) => (
                      <div key={key} className="py-2.5 flex justify-between">
                        <span className="uppercase tracking-wider text-[#8E8A82] capitalize">{key}</span>
                        <span className="text-[#F5F2EC] font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Consultation CTA */}
              <div className="p-6 border border-[#C8A97E]/30 bg-[#C8A97E]/5 space-y-4">
                <h4 className="font-serif text-xl text-[#F5F2EC]">Commission a Similar Space</h4>
                <p className="text-xs text-[#8E8A82] leading-relaxed">
                  We accept limited residential and commercial projects each year to preserve uncompromised quality.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#C8A97E] hover:underline"
                >
                  <span>Initiate Consultation →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Slider (if available) */}
      {project.before_image && project.after_image && (
        <section className="py-20 border-y border-[#F5F2EC]/10 bg-[#0E0E0D]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
            <div className="space-y-4 mb-10 text-center">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">Spatial Evolution</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC]">Before & After Transformation</h2>
              <p className="text-xs text-[#8E8A82]">Slide horizontally to inspect the structural transformation</p>
            </div>

            <div className="relative aspect-[16/9] max-w-5xl mx-auto overflow-hidden select-none cursor-ew-resize rounded-sm">
              {/* After Image (Background) */}
              <img
                src={project.after_image}
                alt="After transformation"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#11110F]/80 backdrop-blur-md text-[10px] uppercase tracking-wider text-[#C8A97E]">
                After Completion
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - beforeAfterPos}% 0 0)` }}
              >
                <img
                  src={project.before_image}
                  alt="Before transformation"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#11110F]/80 backdrop-blur-md text-[10px] uppercase tracking-wider text-[#8E8A82]">
                  Raw Site Condition
                </div>
              </div>

              {/* Slider Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#C8A97E] z-20 pointer-events-none"
                style={{ left: `${beforeAfterPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#11110F] border border-[#C8A97E] flex items-center justify-center text-[#C8A97E] text-[10px]">
                  ↔
                </div>
              </div>

              {/* Transparent Range Input */}
              <input
                type="range"
                min="0"
                max="100"
                value={beforeAfterPos}
                onChange={(e) => setBeforeAfterPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                aria-label="Before and after transformation slider"
              />
            </div>
          </div>
        </section>
      )}

      {/* Large Project Gallery */}
      {project.gallery_images && project.gallery_images.length > 0 && (
        <section className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-12">
            <div className="space-y-3">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">Visual Documentation</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC]">The Spatial Gallery</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery_images.map((imgUrl, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden bg-[#181715] ${
                    i % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} detail ${i + 1}`}
                    className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-24 border-t border-[#F5F2EC]/10 bg-[#0C0C0B]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F2EC]">Further Projects</h2>
              <Link
                to="/portfolio"
                className="text-xs uppercase tracking-[0.2em] text-[#C8A97E] hover:underline"
              >
                View Full Index →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} aspectRatio="aspect-[16/10]" />
              ))}
            </div>
          </div>
        </section>
      )}
      </article>
    </>
  );
};
