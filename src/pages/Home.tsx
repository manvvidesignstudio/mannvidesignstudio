import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Quote, Sparkles } from 'lucide-react';
import { Hero } from '../components/hero/Hero';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { Reveal, ParallaxImage } from '../components/animations/Reveal';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { Seo } from '../components/seo/Seo';
import {
  getHeroContent,
  getStudioContent,
  getProjects,
  getServices,
  getProcessSteps,
  getTestimonials,
  getGallery,
} from '../lib/cmsStore';
import {
  HeroContent,
  StudioContent,
  Project,
  Service,
  ProcessStep,
  Testimonial,
  GalleryItem,
} from '../types/database';

export const Home: React.FC = () => {
  const settings = useSiteSettings();
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [studioContent, setStudioContent] = useState<StudioContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    // Load dynamic CMS data
    Promise.all([
      getHeroContent(),
      getStudioContent(),
      getProjects(),
      getServices(),
      getProcessSteps(),
      getTestimonials(),
      getGallery(),
    ]).then(([hero, studio, projs, servs, steps, tests, gal]) => {
      setHeroContent(hero);
      setStudioContent(studio);
      setProjects(projs);
      setServices(servs);
      setProcessSteps(steps);
      setTestimonials(tests);
      setGallery(gal);
    });
  }, []);

  if (!heroContent || !studioContent) {
    return <div className="min-h-screen bg-[#11110F]" />;
  }

  const featuredProjects = projects.filter((p) => p.featured || p.published).slice(0, 4);
  const spotlightProject = projects.find((p) => p.slug === 'the-courtyard-residence') || projects[0];

  return (
    <>
      <Seo
        title="Interior Design Studio in Mumbai | Manvvi Design Studio"
        description="Manvvi Design Studio is a Mumbai-based interior architecture studio creating considered residential and commercial spaces with restraint, craft, and permanence."
        path="/"
      />
      <div className="w-full bg-[#11110F] text-[#F5F2EC]">
      {/* 1. HERO SECTION */}
      <Hero content={heroContent} />

      {/* 2. STUDIO INTRODUCTION */}
      <section id="studio-intro" className="py-24 sm:py-32 md:py-40 border-b border-[#F5F2EC]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Heading & Eyebrow */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-[1px] bg-[#C8A97E]" />
                <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
                  {studioContent.intro_eyebrow}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F2EC] leading-[1.12] font-normal">
                {studioContent.intro_heading}
              </h2>

              <div className="pt-4">
                <Link
                  to="/studio"
                  className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#C8A97E] hover:text-[#F5F2EC] transition-colors"
                >
                  <span>Our Approach</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: Editorial Body & Image Composition */}
            <div className="lg:col-span-7 space-y-8">
              <p className="text-lg sm:text-xl md:text-2xl font-sans text-[#F5F2EC]/85 font-light leading-relaxed">
                {studioContent.intro_body}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <ParallaxImage
                  wrapperClassName="relative aspect-[4/5] bg-[#181715]"
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop"
                    alt="Interior material nuance"
                    className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  >
                  <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.2em] text-[#8E8A82]">
                    Material Tactility
                  </div>
                </ParallaxImage>

                <ParallaxImage
                  wrapperClassName="relative aspect-[4/5] bg-[#181715] sm:mt-12"
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop"
                    alt="Daylight and proportion"
                    className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  >
                  <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.2em] text-[#8E8A82]">
                    Daylight & Proportion
                  </div>
                </ParallaxImage>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SELECTED PROJECTS */}
      <section className="py-24 sm:py-32 border-b border-[#F5F2EC]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">
                Portfolio / Selected Works
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2EC] font-normal">
                Architecture of Quiet Luxury
              </h2>
            </div>

            <Link
              to="/portfolio"
              className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#F5F2EC] hover:text-[#C8A97E] transition-colors pb-1 border-b border-[#F5F2EC]/20 hover:border-[#C8A97E]"
            >
              <span>View All Projects ({projects.length})</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Asymmetric Editorial Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {featuredProjects.map((project, idx) => (
              <div
                key={project.id}
                className={idx % 2 === 1 ? 'md:mt-16' : ''}
              >
                <ProjectCard project={project} aspectRatio="aspect-[16/11]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DESIGN PHILOSOPHY */}
      <section className="py-28 sm:py-36 bg-[#0E0E0D] border-b border-[#F5F2EC]/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 border border-[#C8A97E]/30 text-[10px] uppercase tracking-[0.25em] text-[#C8A97E]">
              <Sparkles className="w-3 h-3" />
              <span>Studio Philosophy</span>
            </div>

            <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#F5F2EC] font-normal leading-tight italic">
              "We believe true luxury is not about excessive ornamentation, but the quiet harmony between raw stone, sculpted timber, and morning light."
            </blockquote>

            <p className="text-sm uppercase tracking-[0.25em] text-[#8E8A82]">
              Manvvi Sharma — Principal Designer & Founder
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-[#F5F2EC]/10">
            <div className="space-y-3">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">01 / Proportion</span>
              <h4 className="font-serif text-xl text-[#F5F2EC]">Architectural Alignment</h4>
              <p className="text-xs text-[#8E8A82] leading-relaxed">
                Before selecting finishes, we study ceiling heights, sightlines, and circulation corridors to give rooms innate architectural balance.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">02 / Materiality</span>
              <h4 className="font-serif text-xl text-[#F5F2EC]">Honest Natural Surfaces</h4>
              <p className="text-xs text-[#8E8A82] leading-relaxed">
                We favor unlacquered brass, honed Indian and Italian marbles, lime plaster, and solid timber that mature and gain soul over decades.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">03 / Ritual</span>
              <h4 className="font-serif text-xl text-[#F5F2EC]">Tailored to Daily Life</h4>
              <p className="text-xs text-[#8E8A82] leading-relaxed">
                Every space is designed around how you unwind, host family gatherings, read, and experience the quiet moments of everyday life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES OVERVIEW */}
      <section className="py-24 sm:py-32 border-b border-[#F5F2EC]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">
                Capabilities & Scope
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2EC] font-normal">
                Comprehensive Design Services
              </h2>
            </div>

            <Link
              to="/services"
              className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#F5F2EC] hover:text-[#C8A97E] transition-colors"
            >
              <span>Explore All 8 Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="divide-y divide-[#F5F2EC]/10">
            {services.slice(0, 5).map((service, index) => (
              <Link
                key={service.id}
                to="/services"
                className="group py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#F5F2EC]/[0.02] px-4 -mx-4 transition-colors duration-300"
              >
                <div className="flex items-baseline space-x-6">
                  <span className="text-xs font-sans text-[#8E8A82] tracking-widest uppercase">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EC] group-hover:text-[#C8A97E] transition-colors duration-300 font-normal">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#8E8A82] font-sans pt-1">
                      {service.tagline ?? service.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end md:self-center">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#8E8A82] group-hover:text-[#F5F2EC] transition-colors">
                    Scope Details
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[#F5F2EC]/20 flex items-center justify-center text-[#F5F2EC] group-hover:border-[#C8A97E] group-hover:bg-[#C8A97E] group-hover:text-[#11110F] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROCESS PREVIEW */}
      <section className="py-24 sm:py-32 bg-[#0C0C0B] border-b border-[#F5F2EC]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="max-w-2xl space-y-4 mb-16">
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">Methodology</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2EC] font-normal">
              From Observation to Handover
            </h2>
            <p className="text-sm font-sans text-[#8E8A82] leading-relaxed">
              Our structured six-stage process provides clarity, architectural rigor, and financial discipline across every project phase.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.id}
                className="p-6 border border-[#F5F2EC]/10 hover:border-[#C8A97E]/50 transition-colors duration-300 space-y-4 bg-[#141412]"
              >
                <span className="font-serif text-2xl text-[#C8A97E] block">{step.step_code}</span>
                <h4 className="font-serif text-lg text-[#F5F2EC] font-normal">{step.title}</h4>
                <p className="text-xs text-[#8E8A82] line-clamp-3 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/process"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] px-8 py-4 border border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-[#11110F] transition-all duration-300"
            >
              <span>Explore The Interactive Process Timeline →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FEATURED PROJECT SPOTLIGHT */}
      {spotlightProject && (
        <section className="py-24 sm:py-32 border-b border-[#F5F2EC]/10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#181715]">
                  <img
                    src={spotlightProject.cover_image}
                    alt={spotlightProject.title}
                    className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#11110F]/80 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] text-[#C8A97E] border border-[#C8A97E]/20">
                    Featured Project
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8E8A82]">
                  {spotlightProject.location} · {spotlightProject.year}
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5F2EC] font-normal">
                  {spotlightProject.title}
                </h2>

                <p className="text-sm font-sans text-[#F5F2EC]/80 leading-relaxed font-light">
                  {spotlightProject.description}
                </p>

                {spotlightProject.material_palette && (
                  <div className="pt-2 space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8A97E]">Selected Materials</span>
                    <div className="flex flex-wrap gap-2">
                      {spotlightProject.material_palette.map((mat, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 bg-[#1A1917] text-[#8E8A82] border border-[#F5F2EC]/5">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Link
                    to={`/portfolio/${spotlightProject.slug}`}
                    className="group inline-flex items-center space-x-3 px-6 py-3 bg-[#F5F2EC] text-[#11110F] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C8A97E] transition-colors"
                  >
                    <span>View Project Case Study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-24 sm:py-32 bg-[#0E0E0D] border-b border-[#F5F2EC]/10">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 text-center space-y-8">
            <Quote className="w-8 h-8 text-[#C8A97E] mx-auto opacity-75" />

            <div className="min-h-[160px] flex items-center justify-center">
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F5F2EC] italic font-normal leading-relaxed">
                "{testimonials[activeTestimonial].testimonial}"
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-sans text-sm uppercase tracking-[0.2em] text-[#F5F2EC] font-medium">
                {testimonials[activeTestimonial].client_name}
              </h4>
              <p className="text-xs font-sans text-[#8E8A82]">
                {testimonials[activeTestimonial].client_role} · {testimonials[activeTestimonial].project_title}
              </p>
            </div>

            {/* Testimonials Pagination Dots */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      activeTestimonial === i ? 'w-8 bg-[#C8A97E]' : 'w-2 bg-[#F5F2EC]/20 hover:bg-[#F5F2EC]/40'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 9. VISUAL JOURNAL / GALLERY */}
      {gallery.length > 0 && (
        <section className="py-24 sm:py-32 border-b border-[#F5F2EC]/10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">Visual Journal</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC] font-normal pt-1">
                  Tactility, Light & Craft
                </h2>
              </div>
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs uppercase tracking-[0.2em] text-[#8E8A82] hover:text-[#C8A97E] inline-flex items-center space-x-1"
                >
                  <span>Follow us on Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {gallery.slice(0, 6).map((item) => (
                <div key={item.id} className="group relative aspect-square overflow-hidden bg-[#181715]">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#11110F]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <span className="text-[9px] uppercase tracking-wider text-[#C8A97E]">{item.category}</span>
                    <p className="text-xs text-[#F5F2EC] font-serif leading-tight">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. CONTACT CALL TO ACTION */}
      <section className="py-28 sm:py-40 bg-gradient-to-b from-[#11110F] to-[#0A0A09] text-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C8A97E]">Initiate A Dialogue</span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F5F2EC] font-normal leading-tight">
            Let's create a space <br />
            <span className="italic text-[#E8E4DC]">worth living in.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8E8A82] max-w-xl mx-auto font-light leading-relaxed">
            Whether embarking on a custom villa build in Mumbai, a luxury apartment renovation, or a boutique commercial sanctuary.
          </p>

          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-3 px-10 py-5 bg-[#F5F2EC] text-[#11110F] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#C8A97E] hover:text-[#11110F] transition-all duration-300 shadow-2xl"
            >
              <span>Start A Conversation →</span>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};
