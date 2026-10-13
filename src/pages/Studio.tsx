import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getStudioContent } from '../lib/cmsStore';
import { StudioContent } from '../types/database';
import { Reveal, ParallaxImage } from '../components/animations/Reveal';
import { Seo } from '../components/seo/Seo';

export const Studio: React.FC = () => {
  const [content, setContent] = useState<StudioContent | null>(null);

  useEffect(() => {
    getStudioContent().then((data) => {
      setContent(data);
    });
  }, []);

  if (!content) return <div className="min-h-screen bg-[#11110F]" />;

  return (
    <>
      <Seo
        title="Interior Design Studio in Mumbai | Manvvi Design Studio"
        description="Discover the people, philosophy, and architectural approach behind Manvvi Design Studio, a Mumbai interior design studio rooted in Bandra."
        path="/about"
      />
      <div className="min-h-screen bg-[#11110F] text-[#F5F2EC] pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Eyebrow & Hero Header */}
        <div className="max-w-4xl space-y-6 mb-20 sm:mb-28">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#C8A97E]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
              The Studio Profile
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight"
          >
            Interior design studio rooted in Bandra, &nbsp;
            <span className="italic text-[#E8E4DC]">Mumbai.</span>
          </motion.h1>

          <p className="text-base sm:text-lg md:text-xl font-sans text-[#F5F2EC]/85 leading-relaxed font-light max-w-3xl">
            {content.intro_body}
          </p>
        </div>

        {/* Selected Statistics (Editable via CMS) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-[#F5F2EC]/10 mb-24 bg-[#141311]/50 px-6 sm:px-10">
          {content.stats &&
            content.stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#C8A97E] font-normal block">
                  {stat.value}
                </span>
                <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-[#F5F2EC] font-medium">
                  {stat.label}
                </h4>
                {stat.sub && (
                  <p className="text-[11px] text-[#8E8A82] leading-tight font-light">{stat.sub}</p>
                )}
              </div>
            ))}
        </div>

        {/* Founder & Studio Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] overflow-hidden bg-[#181715]">
              <ParallaxImage
                src={content.founder_image_url}
                alt={content.founder_name}
                className="w-full h-full object-cover filter brightness-95"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 bg-[#161513] border border-[#F5F2EC]/10 max-w-xs hidden sm:block">
              <p className="text-xs uppercase tracking-widest text-[#C8A97E]">{content.founder_name}</p>
              <p className="text-[11px] text-[#8E8A82]">{content.founder_title}</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            <div className="space-y-3">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">
                Leadership & Vision
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2EC] font-normal leading-snug">
                {content.story_heading}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#F5F2EC]/80 font-sans font-light leading-relaxed">
              {content.story_text}
            </p>

            <blockquote className="p-6 border-l-2 border-[#C8A97E] bg-[#161513] font-serif text-xl sm:text-2xl italic text-[#F5F2EC]/90 font-light">
              "{content.founder_quote}"
            </blockquote>

            <p className="text-xs font-sans text-[#8E8A82] uppercase tracking-[0.2em]">
              {content.founder_name} · {content.founder_title}
            </p>
          </div>
        </div>

        {content.second_founder_name && content.second_founder_image_url && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
            <div className="lg:col-span-5 lg:order-2 relative">
              <div className="aspect-[4/5] overflow-hidden bg-[#181715]">
                <ParallaxImage
                  src={content.second_founder_image_url}
                  alt={content.second_founder_name}
                  className="w-full h-full object-contain filter brightness-95"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-6 bg-[#161513] border border-[#F5F2EC]/10 max-w-xs hidden sm:block">
                <p className="text-xs uppercase tracking-widest text-[#C8A97E]">{content.second_founder_name}</p>
                <p className="text-[11px] text-[#8E8A82]">{content.second_founder_title}</p>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-8 lg:pr-6 lg:order-1">
              <div className="space-y-3">
                <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">
                  Leadership & Vision
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2EC] font-normal leading-snug">
                  Another perspective, one shared studio.
                </h2>
              </div>
              {content.second_founder_quote && (
                <blockquote className="p-6 border-l-2 border-[#C8A97E] bg-[#161513] font-serif text-xl sm:text-2xl italic text-[#F5F2EC]/90 font-light">
                  "{content.second_founder_quote}"
                </blockquote>
              )}
              <p className="text-xs font-sans text-[#8E8A82] uppercase tracking-[0.2em]">
                {content.second_founder_name} · {content.second_founder_title}
              </p>
            </div>
          </div>
        )}

        {/* Core Values & Pillars */}
        <div className="space-y-12 mb-28">
          <div className="space-y-2">
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">Values</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC]">The Tenets We Practice</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-[#F5F2EC]/10 bg-[#141311] space-y-4">
              <span className="font-serif text-2xl text-[#C8A97E]">01</span>
              <h3 className="font-serif text-2xl text-[#F5F2EC]">Architectural Restraint</h3>
              <p className="text-xs text-[#8E8A82] leading-relaxed">
                We believe what you omit is as important as what you place. Surfaces breathe, sightlines remain uncluttered, and volumes celebrate negative space.
              </p>
            </div>

            <div className="p-8 border border-[#F5F2EC]/10 bg-[#141311] space-y-4">
              <span className="font-serif text-2xl text-[#C8A97E]">02</span>
              <h3 className="font-serif text-2xl text-[#F5F2EC]">Artisanal Precision</h3>
              <p className="text-xs text-[#8E8A82] leading-relaxed">
                From mitred stone edges to shadowline reveals in teak joinery, our contractors and master craftsmen execute every junction with millimeter precision.
              </p>
            </div>

            <div className="p-8 border border-[#F5F2EC]/10 bg-[#141311] space-y-4">
              <span className="font-serif text-2xl text-[#C8A97E]">03</span>
              <h3 className="font-serif text-2xl text-[#F5F2EC]">Sensory Serenity</h3>
              <p className="text-xs text-[#8E8A82] leading-relaxed">
                A home must be felt through touch, acoustics, and gentle light transitions. We specify materials that absorb noise and evoke visceral calm.
              </p>
            </div>
          </div>

          {content.recognitions && content.recognitions.length > 0 && (
            <div className="space-y-8 mb-28">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A97E]">Recognition & Credentials</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC]">Work grounded in practice.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.recognitions.map((item, index) => (
                  <Reveal key={`${item.title}-${index}`} delay={index * 0.08}>
                    <div className="h-full p-6 border border-[#F5F2EC]/10 bg-[#141311] hover:border-[#C8A97E]/60 transition-colors">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#C8A97E]">{item.year}</p>
                      <h3 className="mt-4 font-serif text-2xl text-[#F5F2EC]">{item.title}</h3>
                      <p className="mt-2 text-sm text-[#F5F2EC]/80">{item.issuer}</p>
                      {item.description && <p className="mt-4 text-xs leading-relaxed text-[#8E8A82]">{item.description}</p>}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA Banner */}
        <div className="p-12 sm:p-16 border border-[#C8A97E]/30 bg-gradient-to-r from-[#171614] to-[#121210] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC]">Discuss Your Residence</h3>
            <p className="text-sm text-[#8E8A82]">
              Visit our studio atelier at Gopal Mansion A, Turner Road, Bandra West or arrange an exploratory design consultation.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-[#F5F2EC] text-[#11110F] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C8A97E] transition-colors self-start md:self-auto shadow-xl"
          >
            <span>Start a conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      </div>
    </>
  );
};
