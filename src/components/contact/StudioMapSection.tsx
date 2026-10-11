import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Copy, Check, ExternalLink, Sparkles, Clock, Compass, Layers, Coffee } from 'lucide-react';
import { WhatsAppIcon } from '../common/SocialIcons';
import { useSiteSettings } from '../../context/SiteSettingsContext';

export const StudioMapSection: React.FC = () => {
  const settings = useSiteSettings();
  if (!settings) return null;
  const [copied, setCopied] = useState(false);
  const [mapTheme, setMapTheme] = useState<'dark' | 'natural'>('dark');

  const studioAddress = `${settings.studio_name}, ${settings.address}, ${settings.city}, ${settings.state}, ${settings.country}`;
  const googleMapsUrl = settings.google_maps_url;
  const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_default_message)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(studioAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative py-24 sm:py-32 border-t border-[#F5F2EC]/10 bg-[#0C0C0B] overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C8A97E]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C8A97E]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#C8A97E]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
                Atelier Coordinates & Sanctuary
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EC] font-normal leading-tight">
              Visit Our Design Atelier <br />
              <span className="italic text-[#E8E4DC]">& Material Archive.</span>
            </h2>

            <p className="text-sm sm:text-base font-sans text-[#8E8A82] leading-relaxed font-light">
              Experience the tactile weight of honed travertine, hand-planed oak, patinated brass samples, and explore spatial blueprints in person over freshly brewed artisanal coffee.
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            {/* Map Theme Toggle */}
            <div className="inline-flex p-1 bg-[#141311] border border-[#F5F2EC]/10 rounded-full">
              <button
                onClick={() => setMapTheme('dark')}
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-sans transition-all duration-300 flex items-center space-x-1.5 ${
                  mapTheme === 'dark'
                    ? 'bg-[#C8A97E] text-[#11110F] font-medium shadow-md'
                    : 'text-[#8E8A82] hover:text-[#F5F2EC]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Architectural Dark</span>
              </button>
              <button
                onClick={() => setMapTheme('natural')}
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-sans transition-all duration-300 flex items-center space-x-1.5 ${
                  mapTheme === 'natural'
                    ? 'bg-[#C8A97E] text-[#11110F] font-medium shadow-md'
                    : 'text-[#8E8A82] hover:text-[#F5F2EC]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Satellite / Day</span>
              </button>
            </div>

            {/* Direct Directions */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1A1917] hover:bg-[#C8A97E] text-[#F5F2EC] hover:text-[#11110F] border border-[#F5F2EC]/10 text-xs uppercase tracking-[0.15em] rounded-full transition-all duration-300"
            >
              <span>Directions</span>
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* The Creative Map Viewport Container */}
        <div className="relative rounded-2xl overflow-hidden border border-[#C8A97E]/30 bg-[#141311] shadow-2xl group">
          {/* Top Architectural Spec Header */}
          <div className="px-6 py-3.5 bg-[#161513] border-b border-[#F5F2EC]/10 flex flex-wrap items-center justify-between text-xs font-mono text-[#8E8A82] gap-4">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-2 text-[#C8A97E]">
                <span className="w-2 h-2 rounded-full bg-[#C8A97E] animate-ping" />
                <span className="font-semibold tracking-wider uppercase font-sans text-[11px]">Studio Live Pin</span>
              </span>
              <span className="hidden sm:inline text-[#8E8A82]/50">|</span>
              <span className="hidden sm:inline">{settings.city} · {settings.state}</span>
              <span className="hidden md:inline text-[#8E8A82]/50">|</span>
              <span className="hidden md:inline text-[#8E8A82]">Elevation: 560m AMSL</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5 text-[#25D366]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                <span className="font-sans text-[11px] font-medium">Visiting Hours: {settings.working_hours}</span>
              </span>
            </div>
          </div>

          {/* Map Frame with Interactive Theme Filter */}
          <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[580px] overflow-hidden bg-[#11110F]">
            <iframe
              src={settings.google_maps_embed_url}
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter:
                  mapTheme === 'dark'
                    ? 'invert(90%) hue-rotate(180deg) contrast(1.15) brightness(0.85) saturate(0.8)'
                    : 'none',
                transition: 'filter 0.5s ease-in-out',
              }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Manvvi Design Studio Location"
              className="w-full h-full"
            />

            {/* Subtle Gradient Overlays for Seamless Aesthetic Blending */}
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#141311]/80 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141311]/90 to-transparent pointer-events-none" />

            {/* Floating Luxury Glassmorphism Studio Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md bg-[#141311]/90 backdrop-blur-md border border-[#C8A97E]/40 p-6 rounded-xl shadow-2xl space-y-4"
              style={{
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(200, 169, 126, 0.15)',
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-[#C8A97E]/15 border border-[#C8A97E]/40 text-[#C8A97E] text-[10px] uppercase tracking-[0.2em] rounded-full font-medium">
                    <Sparkles className="w-3 h-3" />
                    <span>Private Atelier</span>
                  </span>
                  <h3 className="font-serif text-2xl text-[#F5F2EC] mt-1.5">Manvvi Design Studio</h3>
                </div>

                <div className="w-9 h-9 rounded-full bg-[#181715] border border-[#C8A97E]/30 flex items-center justify-center text-[#C8A97E] flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1 text-xs text-[#8E8A82] font-sans">
                <p className="text-[#F5F2EC]/90 font-medium">{settings.address}</p>
                <p>{[settings.city, settings.state, settings.country].filter(Boolean).join(', ')}</p>
                <div className="flex items-center space-x-2 pt-1 text-[11px] text-[#C8A97E]">
                  <Clock className="w-3 h-3" />
                  <span>By prior appointment · Valet parking available</span>
                </div>
              </div>

              {/* Action Buttons in Floating Card */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-[#F5F2EC] hover:bg-[#C8A97E] text-[#11110F] text-[11px] uppercase tracking-[0.15em] font-medium rounded-lg transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open Maps</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-[#11110F] text-[11px] uppercase tracking-[0.15em] font-medium rounded-lg transition-colors shadow-md"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Copy Address Button */}
              <button
                onClick={handleCopyAddress}
                className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-[#191816] hover:bg-[#201F1B] border border-[#F5F2EC]/10 text-xs text-[#8E8A82] hover:text-[#F5F2EC] rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#25D366]" />
                    <span className="text-[#25D366]">Address Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#C8A97E]" />
                    <span>Copy Complete Address</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>

        {/* 4 Pillars of the Atelier Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="p-6 bg-[#141311] border border-[#F5F2EC]/10 hover:border-[#C8A97E]/40 transition-colors space-y-3 rounded-xl group">
            <div className="w-10 h-10 rounded-lg bg-[#181715] border border-[#F5F2EC]/10 flex items-center justify-center text-[#C8A97E] group-hover:border-[#C8A97E] transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg text-[#F5F2EC]">01 / Material Curation</h4>
            <p className="text-xs text-[#8E8A82] leading-relaxed">
              Touch full-scale travertine slabs, brushed champagne brass fixtures, smoked oak joinery, and custom lime plaster swatches.
            </p>
          </div>

          <div className="p-6 bg-[#141311] border border-[#F5F2EC]/10 hover:border-[#C8A97E]/40 transition-colors space-y-3 rounded-xl group">
            <div className="w-10 h-10 rounded-lg bg-[#181715] border border-[#F5F2EC]/10 flex items-center justify-center text-[#C8A97E] group-hover:border-[#C8A97E] transition-colors">
              <Coffee className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg text-[#F5F2EC]">02 / Principal Attention</h4>
            <p className="text-xs text-[#8E8A82] leading-relaxed">
              Every consultation is strictly 1-on-1 with our principal designer and project architects, allowing uninterrupted focus on your brief.
            </p>
          </div>

          <div className="p-6 bg-[#141311] border border-[#F5F2EC]/10 hover:border-[#C8A97E]/40 transition-colors space-y-3 rounded-xl group">
            <div className="w-10 h-10 rounded-lg bg-[#181715] border border-[#F5F2EC]/10 flex items-center justify-center text-[#C8A97E] group-hover:border-[#C8A97E] transition-colors">
              <Navigation className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg text-[#F5F2EC]">03 / Valet & Accessibility</h4>
            <p className="text-xs text-[#8E8A82] leading-relaxed">
              Located on Turner Road in Bandra West, our studio is convenient to reach from across Mumbai.
            </p>
          </div>

          <div className="p-6 bg-[#141311] border border-[#F5F2EC]/10 hover:border-[#C8A97E]/40 transition-colors space-y-3 rounded-xl group">
            <div className="w-10 h-10 rounded-lg bg-[#181715] border border-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:border-[#25D366] transition-colors">
              <WhatsAppIcon className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg text-[#F5F2EC]">04 / WhatsApp Concierge</h4>
            <p className="text-xs text-[#8E8A82] leading-relaxed">
              Share your location or confirm your arrival with our studio team in one tap. We send site gate access and directions straight to WhatsApp.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-[#25D366] hover:underline font-medium pt-1"
            >
              <span>Connect on WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
