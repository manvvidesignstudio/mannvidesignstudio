import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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

  const galleryImages = project?.gallery_images || [];

  useEffect(() => {
    if (selectedImageIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImageIndex(null);
      }
      if (event.key === 'ArrowLeft') {
        setSelectedImageIndex((index) =>
          index === null ? null : (index - 1 + galleryImages.length) % galleryImages.length,
        );
      }
      if (event.key === 'ArrowRight') {
        setSelectedImageIndex((index) =>
          index === null ? null : (index + 1) % galleryImages.length,
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageIndex, galleryImages.length]);

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
  const categoryProjects = allProjects.filter(
    (p) => p.category === project.category && p.published,
  );
  const currentProjectIndex = categoryProjects.findIndex((p) => p.slug === project.slug);
  const showProjectControls = categoryProjects.length > 1;
  const navigateToProject = (direction: 'previous' | 'next') => {
    const nextIndex =
      direction === 'next'
        ? (currentProjectIndex + 1) % categoryProjects.length
        : (currentProjectIndex - 1 + categoryProjects.length) % categoryProjects.length;
    navigate(`/portfolio/${categoryProjects[nextIndex].slug}`);
  };

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

        {showProjectControls && (
          <>
            <button
              type="button"
              onClick={() => navigateToProject('previous')}
              aria-label="Previous project in category"
              className="absolute left-4 sm:left-8 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[#F5F2EC]/30 bg-transparent p-3 text-[#F5F2EC] transition-colors hover:border-[#C8A97E] hover:bg-[#11110F]/30 hover:text-[#C8A97E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C8A97E]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => navigateToProject('next')}
              aria-label="Next project in category"
              className="absolute right-4 sm:right-8 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[#F5F2EC]/30 bg-transparent p-3 text-[#F5F2EC] transition-colors hover:border-[#C8A97E] hover:bg-[#11110F]/30 hover:text-[#C8A97E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C8A97E]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-6 right-6 z-20 border border-[#F5F2EC]/20 bg-[#11110F]/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#F5F2EC]/80 backdrop-blur-sm">
              {currentProjectIndex + 1} / {categoryProjects.length} {project.category}
            </div>
          </>
        )}

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

      {/* Visual Gallery */}
      {galleryImages.length > 0 && (
        <section className="border-b border-[#F5F2EC]/10 bg-[#0E0E0D] py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-3">
                <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">
                  Visual Documentation
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC]">The Spatial Gallery</h2>
              </div>
              
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {galleryImages.map((imgUrl, i) => (
                <button
                  key={imgUrl + i}
                  type="button"
                  onClick={() => setSelectedImageIndex(i)}
                  aria-label={`Open ${project.title} detail image ${i + 1}`}
                  className={`group relative overflow-hidden bg-[#181715] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C8A97E] ${
                    i % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} detail ${i + 1}`}
                    className="h-full w-full object-cover brightness-95 transition-transform duration-700 group-hover:scale-105"
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-[#11110F]/0 transition-colors duration-300 group-hover:bg-[#11110F]/35">
                    <span className="flex translate-y-2 items-center gap-2 border border-[#F5F2EC]/0 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#F5F2EC] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:border-[#F5F2EC]/40 group-hover:opacity-100">
                      <ZoomIn className="h-3.5 w-3.5" />
                      View image
                    </span>
                  </span>
                  <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-[#F5F2EC]/70">
                    0{i + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Design Concept & Spatial Thesis */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {project.concept && (
              <div className="border border-[#F5F2EC]/10 bg-[#161513] p-8 sm:p-10 lg:col-span-7">
                <span className="mb-5 block text-[10px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">
                  Design Concept & Spatial Thesis
                </span>
                <p className="font-serif text-2xl leading-relaxed text-[#F5F2EC] italic sm:text-3xl">
                  "{project.concept}"
                </p>
              </div>
            )}

            {project.material_palette && project.material_palette.length > 0 && (
              <div className="border border-[#F5F2EC]/10 p-8 sm:p-10 lg:col-span-5">
                <span className="mb-6 block text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">
                  Material Composition
                </span>
                <ul className="space-y-3">
                  {project.material_palette.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-sm font-sans text-[#F5F2EC]/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C8A97E]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* The Brief & Context */}
      <section className="border-y border-[#F5F2EC]/10 bg-[#141311] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-7">
              <div className="space-y-4">
                <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">The Brief & Context</span>
                <h2 className="font-serif text-3xl font-normal leading-snug text-[#F5F2EC] sm:text-4xl">
                  {project.short_description}
                </h2>
              </div>
              <div className="space-y-4 text-base font-sans font-light leading-relaxed text-[#F5F2EC]/80 sm:text-lg">
                <p>{project.description}</p>
              </div>
            </div>

            <div className="space-y-10 border-t border-[#F5F2EC]/10 pt-12 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="group relative isolate overflow-hidden border border-[#C8A97E]/40 bg-gradient-to-br from-[#2A241B] via-[#191713] to-[#121210] p-8 sm:p-10">
                <div className="absolute -right-12 -top-16 -z-10 h-48 w-48 rounded-full border border-[#C8A97E]/20 transition-transform duration-700 group-hover:scale-125" />
                <div className="absolute -right-4 -top-8 -z-10 h-32 w-32 rounded-full border border-[#C8A97E]/10" />
                <div className="mb-12 flex items-start justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A97E]">Next Chapter</span>
                  <span className="font-serif text-4xl leading-none text-[#C8A97E]/40">01</span>
                </div>
                <div className="space-y-5">
                  <h4 className="max-w-xs font-serif text-3xl leading-tight text-[#F5F2EC]">
                    Make your space unmistakably yours.
                  </h4>
                  <p className="max-w-sm text-sm leading-relaxed text-[#F5F2EC]/60">
                    Begin a considered conversation about a home or space shaped around the way you live.
                  </p>
                  <Link
                    to="/contact"
                    className="group/link inline-flex items-center gap-4 border-b border-[#C8A97E]/50 pb-2 pt-3 text-[10px] uppercase tracking-[0.25em] text-[#C8A97E] transition-colors hover:border-[#F5F2EC] hover:text-[#F5F2EC]"
                  >
                    <span>Start your project</span>
                    <span className="text-lg leading-none transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>
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

      {selectedImageIndex !== null && galleryImages[selectedImageIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} gallery viewer`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080807]/95 p-4 sm:p-8"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImageIndex(null)}
            aria-label="Close gallery viewer"
            className="absolute right-5 top-5 z-10 rounded-full border border-[#F5F2EC]/20 p-3 text-[#F5F2EC] transition-colors hover:border-[#C8A97E] hover:text-[#C8A97E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C8A97E]"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
            }}
            aria-label="Previous gallery image"
            className="absolute left-4 z-10 rounded-full border border-[#F5F2EC]/20 p-3 text-[#F5F2EC] transition-colors hover:border-[#C8A97E] hover:text-[#C8A97E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C8A97E] sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <img
            src={galleryImages[selectedImageIndex]}
            alt={`${project.title} detail ${selectedImageIndex + 1}`}
            className="max-h-[88vh] max-w-[90vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
            }}
            aria-label="Next gallery image"
            className="absolute right-4 z-10 rounded-full border border-[#F5F2EC]/20 p-3 text-[#F5F2EC] transition-colors hover:border-[#C8A97E] hover:text-[#C8A97E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C8A97E] sm:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-[#F5F2EC]/70">
            {selectedImageIndex + 1} / {galleryImages.length}
          </span>
        </div>
      )}
    </>
  );
};
