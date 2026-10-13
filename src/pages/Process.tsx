import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { getProcessSteps } from '../lib/cmsStore';
import { ProcessStep } from '../types/database';
import { Reveal } from '../components/animations/Reveal';
import { Seo } from '../components/seo/Seo';

export const Process: React.FC = () => {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    getProcessSteps().then((data) => {
      setSteps(data);
    });
  }, []);

  const activeStep = steps[activeStepIndex] || steps[0];

  return (
    <>
      <Seo
        title="Interior Design Process in Mumbai | Manvvi Design Studio"
        description="Learn how Manvvi Design Studio develops Mumbai interiors through a disciplined process from daylight study and concept design to final key reveal."
        path="/process"
      />
      <div className="min-h-screen bg-[#11110F] text-[#F5F2EC] pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Header */}
        <div className="max-w-3xl space-y-6 mb-16 sm:mb-24">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#C8A97E]" />
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
              Architectural Methodology
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight">
            Our interior design process in Mumbai. <br />
            <span className="italic text-[#E8E4DC]">From daylight study to key reveal.</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-[#8E8A82] leading-relaxed max-w-2xl font-light">
            An uncompromising framework engineered to protect the integrity of the design, eliminate cost ambiguities, and deliver turnkey peace of mind.
          </p>
        </div>

        {/* Interactive Step Navigation Bar with Progress Line */}
        <div className="relative mb-16 border-b border-[#F5F2EC]/10 pb-6">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
            {steps.map((s, index) => {
              const isActive = activeStepIndex === index;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStepIndex(index)}
                  className={`flex flex-col text-left py-2 px-3 transition-colors duration-300 min-w-[120px] focus:outline-none ${
                    isActive ? 'text-[#C8A97E]' : 'text-[#8E8A82] hover:text-[#F5F2EC]'
                  }`}
                >
                  <span className="font-serif text-2xl font-normal">{s.step_code}</span>
                  <span className="text-xs uppercase tracking-[0.15em] font-sans font-medium">{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* Progress Indicator line */}
          <div className="w-full h-[2px] bg-[#F5F2EC]/10 mt-4 relative overflow-hidden">
            <motion.div
              className="h-full bg-[#C8A97E]"
              animate={{
                width: `${((activeStepIndex + 1) / steps.length) * 100}%`,
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            />
          </div>
        </div>

        {/* Active Step Showcase */}
        {activeStep && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Step Image with Smooth Transition */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#181715] rounded-sm">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep.id}
                    src={activeStep.image_url}
                    alt={activeStep.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                </AnimatePresence>

                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#11110F]/80 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] text-[#C8A97E] border border-[#C8A97E]/20">
                  Phase {activeStep.step_code} of 06
                </div>
              </div>
            </div>

            {/* Step Description & Deliverables */}
            <div className="lg:col-span-5 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#C8A97E]">
                      {activeStep.subtitle || 'Phase Objective'}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC] font-normal">
                      {activeStep.title}
                    </h2>
                  </div>

                  <p className="text-base text-[#F5F2EC]/85 font-sans font-light leading-relaxed">
                    {activeStep.description}
                  </p>

                  {/* Deliverables Checklist */}
                  {activeStep.deliverables && activeStep.deliverables.length > 0 && (
                    <div className="pt-2 space-y-3 border-t border-[#F5F2EC]/10">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E8A82] block">
                        Phase Milestones & Deliverables
                      </span>
                      <ul className="space-y-2">
                        {activeStep.deliverables.map((item, i) => (
                          <li key={i} className="flex items-center space-x-3 text-xs font-sans text-[#F5F2EC]/90">
                            <Check className="w-3.5 h-3.5 text-[#C8A97E] flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="pt-4 flex items-center space-x-4">
                    {activeStepIndex > 0 && (
                      <button
                        onClick={() => setActiveStepIndex((prev) => prev - 1)}
                        className="px-5 py-2.5 border border-[#F5F2EC]/20 text-xs uppercase tracking-[0.15em] text-[#F5F2EC] hover:border-[#C8A97E]"
                      >
                        ← Prev Phase
                      </button>
                    )}

                    {activeStepIndex < steps.length - 1 ? (
                      <button
                        onClick={() => setActiveStepIndex((prev) => prev + 1)}
                        className="px-6 py-2.5 bg-[#C8A97E] text-[#11110F] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#F5F2EC] transition-colors"
                      >
                        Next: {steps[activeStepIndex + 1]?.title} →
                      </button>
                    ) : (
                      <Link
                        to="/contact"
                        className="px-6 py-2.5 bg-[#C8A97E] text-[#11110F] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#F5F2EC] transition-colors"
                      >
                        Start Your Project →
                      </Link>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* All Six Steps Full Overview Grid */}
        <div className="mt-32 pt-20 border-t border-[#F5F2EC]/10">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EC] mb-12">Complete Phase Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((st, i) => (
              <div
                key={st.id}
                onClick={() => setActiveStepIndex(i)}
                className={`p-8 border transition-all duration-300 cursor-pointer ${
                  activeStepIndex === i
                    ? 'border-[#C8A97E] bg-[#C8A97E]/5'
                    : 'border-[#F5F2EC]/10 bg-[#141311] hover:border-[#F5F2EC]/30'
                }`}
              >
                <span className="font-serif text-3xl text-[#C8A97E] block mb-2">{st.step_code}</span>
                <h4 className="font-serif text-xl text-[#F5F2EC] mb-1">{st.title}</h4>
                <p className="text-[11px] text-[#C8A97E] uppercase tracking-wider mb-3">{st.subtitle}</p>
                <p className="text-xs text-[#8E8A82] leading-relaxed line-clamp-3">{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
