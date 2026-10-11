import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle, Mail, Sparkles, Send } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, LinkedInIcon, PinterestIcon } from '../common/SocialIcons';
import { useSiteSettings } from '../../context/SiteSettingsContext';

interface SocialChannel {
  name: string;
  handle: string;
  badge: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  accentColor: string;
  ctaText: string;
}

export const ContactSocialSection: React.FC = () => {
  const settings = useSiteSettings();
  if (!settings) return null;
  const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_default_message)}`;
  const socialChannels: SocialChannel[] = [
    {
      name: 'WhatsApp Atelier',
      handle: settings.phone,
      badge: 'Principal Direct Line',
      description: 'Instant project brief submission, site drawings exchange, and exploratory voice notes with our design coordinators.',
      href: whatsappUrl,
      icon: <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />,
      accentColor: 'border-[#25D366]/40 hover:border-[#25D366]',
      ctaText: 'Chat on WhatsApp',
    },
    {
      name: 'Instagram Journal',
      handle: '@manvvidesignstudio',
      badge: 'Daily Spatial Stories',
      description: 'Behind-the-scenes site transformations, raw material foraging, bespoke carpentry reveals, and design philosophy notes.',
      href: settings.instagram,
      icon: <InstagramIcon className="w-6 h-6 text-[#E1306C]" />,
      accentColor: 'border-[#E1306C]/30 hover:border-[#E1306C]',
      ctaText: 'Follow on Instagram',
    },
    {
      name: 'LinkedIn Network',
      handle: 'Manvvi Design Studio',
      badge: 'Professional Discourse',
      description: 'Architectural essays, industry partnerships, studio career vacancies, and executive turnkey case studies.',
      href: settings.linkedin || '#',
      icon: <LinkedInIcon className="w-6 h-6 text-[#0077B5]" />,
      accentColor: 'border-[#0077B5]/30 hover:border-[#0077B5]',
      ctaText: 'Connect on LinkedIn',
    },
    {
      name: 'Pinterest Archives',
      handle: '@manvvistudio',
      badge: 'Curated Moodboards',
      description: 'High-resolution aesthetic reference boards, tactile material junctions, mood lighting schemes, and collectible furniture.',
      href: settings.pinterest || '#',
      icon: <PinterestIcon className="w-6 h-6 text-[#E60023]" />,
      accentColor: 'border-[#E60023]/30 hover:border-[#E60023]',
      ctaText: 'Explore Moodboards',
    },
    {
      name: 'Studio Email Sanctuary',
      handle: settings.email,
      badge: 'Formal Correspondence',
      description: 'RFP documents, vendor catalogs, architectural collaboration proposals, and press or editorial interviews.',
      href: `mailto:${settings.email}`,
      icon: <Mail className="w-6 h-6 text-[#C8A97E]" />,
      accentColor: 'border-[#C8A97E]/40 hover:border-[#C8A97E]',
      ctaText: 'Transmit Email',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#11110F] border-t border-[#F5F2EC]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#C8A97E]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
                Digital Presence & Discourse
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2EC] font-normal leading-tight">
              Connect Across Our <br />
              <span className="italic text-[#E8E4DC]">Curated Channels.</span>
            </h2>

            <p className="text-sm font-sans text-[#8E8A82] leading-relaxed font-light">
              Choose the communication cadence that best suits your routine. From rapid WhatsApp exchanges to deep architectural Instagram archives.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#C8A97E]">
            <Sparkles className="w-4 h-4" />
            <span>Responsive within 24 Hours</span>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialChannels.map((channel, idx) => (
            <motion.a
              key={channel.name}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className={`p-7 bg-[#141311] border ${channel.accentColor} rounded-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
              style={{
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-[#C8A97E]/10 transition-colors pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#191816] border border-[#F5F2EC]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {channel.icon}
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 bg-[#1A1917] text-[#C8A97E] border border-[#C8A97E]/20 rounded-full font-medium">
                    {channel.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#F5F2EC] group-hover:text-[#C8A97E] transition-colors">
                    {channel.name}
                  </h3>
                  <p className="text-xs font-mono text-[#8E8A82] mt-0.5">{channel.handle}</p>
                </div>

                <p className="text-xs text-[#8E8A82] leading-relaxed font-light">
                  {channel.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[#F5F2EC]/10 flex items-center justify-between text-xs uppercase tracking-[0.15em] text-[#F5F2EC] font-medium group-hover:text-[#C8A97E] transition-colors relative z-10">
                <span>{channel.ctaText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
