import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, } from '../common/SocialIcons';
import { useSiteSettings } from '../../context/SiteSettingsContext';

export const Footer: React.FC = () => {
  const settings = useSiteSettings();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!settings) return null;

  const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_default_message)}`;

  return (
    <footer className="bg-[#0C0C0B] text-[#F5F2EC] border-t border-[#F5F2EC]/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#F5F2EC]/10">
          {/* Brand & Narrative */}
          <div className="md:col-span-5 space-y-6">
            <Link
              to="/"
              aria-label="Manvvi Design Studio home"
              className="inline-flex flex-col items-start font-brand text-3xl sm:text-4xl tracking-widest text-[#F5F2EC]"
            >
              <span>MANVVI</span>
              <span className="text-[#C8A97E]">DESIGN STUDIO</span>
            </Link>
            <p className="text-sm font-sans text-[#8E8A82] leading-relaxed max-w-sm">
              {settings.footer_description}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#C8A97E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97E] animate-pulse" />
                <span>Accepting 2026 Residential & Commercial Commissions</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">Index</h4>
            <ul className="space-y-2.5 text-sm font-sans text-[#F5F2EC]/80">
              <li>
                <Link to="/" className="hover:text-[#C8A97E] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/studio" className="hover:text-[#C8A97E] transition-colors">The Studio</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#C8A97E] transition-colors">Services & Scope</Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-[#C8A97E] transition-colors">Our 6-Step Process</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-[#C8A97E] transition-colors">Selected Portfolio</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C8A97E] transition-colors">Initiate Conversation</Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact & Social Universe */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E]">Atelier & Dialogue</h4>
            <div className="text-sm font-sans text-[#8E8A82] space-y-1.5">
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noreferrer"
                className="group/map inline-flex items-center space-x-1.5 text-[#F5F2EC] hover:text-[#C8A97E] transition-colors"
              >
                <span className="font-medium">{settings.address}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A97E] transition-transform group-hover/map:translate-x-0.5 group-hover/map:-translate-y-0.5" />
              </a>
              <p>{settings.city}, {settings.state}, {settings.country}</p>
              
              <div className="pt-2 flex flex-col space-y-1">
                <a href={`mailto:${settings.email}`} className="text-[#F5F2EC]/90 hover:text-[#C8A97E] transition-colors">
                  {settings.email}
                </a>
                <a href={`tel:${settings.phone}`} className="text-[#F5F2EC]/90 hover:text-[#C8A97E] transition-colors">
                  {settings.phone}
                </a>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2.5 px-4 py-2.5 bg-[#17261B] hover:bg-[#25D366] text-[#25D366] hover:text-[#11110F] border border-[#25D366]/40 hover:border-[#25D366] rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 group shadow-lg"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-[#11110F] transition-colors" />
                <span>Chat on WhatsApp</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] group-hover:bg-[#11110F] animate-pulse" />
              </a>
            </div>

            {/* Creative Social Media Icons Row */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E8A82] block">
                Digital Chronicles
              </span>
              <div className="flex items-center space-x-2.5">
                {/* Instagram */}
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  title="Follow on Instagram"
                  className="w-9 h-9 rounded-full bg-[#181715] hover:bg-[#E1306C] border border-[#F5F2EC]/10 hover:border-[#E1306C] flex items-center justify-center text-[#8E8A82] hover:text-white transition-all duration-300 group shadow-sm hover:scale-105"
                >
                  <InstagramIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Direct WhatsApp"
                  className="w-9 h-9 rounded-full bg-[#181715] hover:bg-[#25D366] border border-[#F5F2EC]/10 hover:border-[#25D366] flex items-center justify-center text-[#8E8A82] hover:text-[#11110F] transition-all duration-300 group shadow-sm hover:scale-105"
                >
                  <WhatsAppIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>

                

                {/* Email */}
                <a
                  href={`mailto:${settings.email}`}
                  title="Email Studio"
                  className="w-9 h-9 rounded-full bg-[#181715] hover:bg-[#C8A97E] border border-[#F5F2EC]/10 hover:border-[#C8A97E] flex items-center justify-center text-[#8E8A82] hover:text-[#11110F] transition-all duration-300 group shadow-sm hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Micro Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#8E8A82] gap-4">
          <p>© {currentYear} <span className="font-brand">Manvvi Design Studio</span>. All rights reserved.</p>

          <div className="flex items-center space-x-8">
            <Link to="/admin/login" className="hover:text-[#C8A97E] transition-colors">
              Admin CMS
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:text-[#F5F2EC] transition-colors uppercase tracking-[0.15em] text-[10px]"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
