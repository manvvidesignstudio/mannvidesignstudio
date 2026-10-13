import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Compass, Layers, Home, Crown, Building2, Briefcase, Wine, Armchair, KeyRound } from 'lucide-react';
import { getServices } from '../lib/cmsStore';
import { Service } from '../types/database';
import { Reveal } from '../components/animations/Reveal';
import { Seo } from '../components/seo/Seo';

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getServices().then((data) => {
      setServices(data);
    });
  }, []);

  const getServiceIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Crown': return <Crown className="w-5 h-5 text-[#C8A97E]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#C8A97E]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#C8A97E]" />;
      case 'Wine': return <Wine className="w-5 h-5 text-[#C8A97E]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#C8A97E]" />;
      case 'Armchair': return <Armchair className="w-5 h-5 text-[#C8A97E]" />;
      case 'KeyRound': return <KeyRound className="w-5 h-5 text-[#C8A97E]" />;
      default: return <Home className="w-5 h-5 text-[#C8A97E]" />;
    }
  };

  return (
    <>
      <Seo
        title="Interior Design Services in Mumbai | Manvvi Design Studio"
        description="Explore residential, commercial, and hospitality interior design services by Manvvi Design Studio in Mumbai, from concept to turnkey delivery."
        path="/services"
      />
      <div className="min-h-screen bg-[#11110F] text-[#F5F2EC] pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Header */}
        <div className="max-w-3xl space-y-6 mb-20 sm:mb-28">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#C8A97E]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
              Capabilities & Scope
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight">
            Interior design services for homes and commercial spaces in Mumbai.
          </h1>

          <p className="text-base sm:text-lg font-sans text-[#8E8A82] leading-relaxed max-w-2xl font-light">
            From initial spatial audit to turnkey execution, we provide holistic architectural and styling stewardship tailored to discerning homeowners and commercial visionaries.
          </p>
        </div>

        {/* Services In-Depth List */}
        <div className="space-y-24 sm:space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Column */}
              <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/11] overflow-hidden bg-[#181715] rounded-sm group">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#11110F]/80 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] text-[#C8A97E] border border-[#C8A97E]/20">
                    Scope 0{index + 1}
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className={`lg:col-span-6 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 border border-[#C8A97E]/30 bg-[#C8A97E]/10 rounded-sm">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#C8A97E] font-medium">
                    {service.tagline || 'Design Discipline'}
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC] font-normal">
                  {service.title}
                </h2>

                <p className="text-base text-[#F5F2EC]/80 font-sans font-light leading-relaxed">
                  {service.description}
                </p>

                {service.process_summary && (
                  <p className="text-xs text-[#8E8A82] italic font-serif leading-relaxed border-l border-[#C8A97E] pl-4">
                    "{service.process_summary}"
                  </p>
                )}

                {/* Deliverables List */}
                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="pt-2 space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E8A82] font-semibold">
                      Key Deliverables
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-[#F5F2EC]/90">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-[#C8A97E] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] px-6 py-3 border border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-[#11110F] transition-all duration-300"
                  >
                    <span>Inquire For This Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};
