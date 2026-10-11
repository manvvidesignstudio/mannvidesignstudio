import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { submitContactMessage } from '../lib/cmsStore';
import { StudioMapSection } from '../components/contact/StudioMapSection';
import { ContactSocialSection } from '../components/contact/ContactSocialSection';
import { WhatsAppIcon, InstagramIcon, LinkedInIcon, PinterestIcon } from '../components/common/SocialIcons';
import { Reveal } from '../components/animations/Reveal';
import { useSiteSettings } from '../context/SiteSettingsContext';

export const Contact: React.FC = () => {
  const settings = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: 'Residential Villa',
    location: '',
    budget: '₹50 Lakhs - ₹1 Crore',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setSubmitting(true);
    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        project_type: formData.project_type,
        location: formData.location || 'Mumbai, Maharashtra',
        budget: formData.budget,
        message: formData.message,
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        project_type: 'Residential Villa',
        location: '',
        budget: '₹50 Lakhs - ₹1 Crore',
        message: '',
      });
    } catch (err: any) {
      console.error('Submission failed', err);
      setErrorMessage('Something went wrong submitting your inquiry. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!settings) return <div className="min-h-screen bg-[#11110F]" />;

  const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_default_message)}`;

  return (
    <div className="min-h-screen bg-[#11110F] text-[#F5F2EC] pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left Column: Heading & Atelier Information */}
          <Reveal className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#C8A97E]" />
                <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#C8A97E] font-medium">
                  Initiate A Dialogue
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl text-[#F5F2EC] font-normal leading-[1.1] tracking-tight">
                Let's create a space <br />
                <span className="italic text-[#E8E4DC]">worth living in.</span>
              </h1>

              <p className="text-base font-sans text-[#8E8A82] leading-relaxed font-light">
                We accept a limited volume of residential and commercial commissions per year to ensure each project receives obsessive principal-led attention.
              </p>
            </div>

            {/* Atelier Details */}
            <div className="space-y-6 pt-6 border-t border-[#F5F2EC]/10">
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-[#C8A97E] flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm font-sans">
                  <p className="text-[#F5F2EC] font-medium">{settings.city} Studio</p>
                  <p className="text-[#8E8A82]">{settings.address}</p>
                  <p className="text-[#8E8A82]">{settings.city}, {settings.state}, {settings.country}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-[#C8A97E] flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm font-sans">
                  <p className="text-[#F5F2EC] font-medium">Direct Inquiries</p>
                  <a href={`mailto:${settings.email}`} className="text-[#8E8A82] hover:text-[#C8A97E] transition-colors block">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-[#C8A97E] flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm font-sans">
                  <p className="text-[#F5F2EC] font-medium">Studio Phone</p>
                  <a href={`tel:${settings.phone}`} className="text-[#8E8A82] hover:text-[#C8A97E] transition-colors block">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-5 h-5 text-[#C8A97E] flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm font-sans">
                  <p className="text-[#F5F2EC] font-medium">Working Hours</p>
                  <p className="text-[#8E8A82]">{settings.working_hours}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <ArrowUpRight className="w-5 h-5 text-[#C8A97E] flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm font-sans">
                  <p className="text-[#F5F2EC] font-medium">Services</p>
                  <p className="text-[#8E8A82]">Full-scale residential and commercial interior design, space transformations, layout conceptualization, and site execution.</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action in Left Column */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start space-x-3 px-6 py-3.5 bg-[#1F2D24] hover:bg-[#25D366] text-[#25D366] hover:text-[#11110F] border border-[#25D366]/40 hover:border-[#25D366] rounded-xl transition-all duration-300 font-sans text-xs uppercase tracking-[0.18em] font-medium group"
              >
                <div className="flex items-center space-x-2.5">
                  <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                  <span>WhatsApp Principal Line</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] group-hover:bg-[#11110F] animate-pulse" />
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>

            {/* Social Media Channels In Left Column */}
            <div className="pt-2 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A97E] block">
                Studio Social Profiles
              </span>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-2 bg-[#181715] hover:bg-[#E1306C]/15 border border-[#F5F2EC]/10 hover:border-[#E1306C]/50 text-xs text-[#8E8A82] hover:text-[#F5F2EC] rounded-lg transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={settings.linkedin || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-2 bg-[#181715] hover:bg-[#0077B5]/15 border border-[#F5F2EC]/10 hover:border-[#0077B5]/50 text-xs text-[#8E8A82] hover:text-[#F5F2EC] rounded-lg transition-colors"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-[#0077B5]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={settings.pinterest || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-2 bg-[#181715] hover:bg-[#E60023]/15 border border-[#F5F2EC]/10 hover:border-[#E60023]/50 text-xs text-[#8E8A82] hover:text-[#F5F2EC] rounded-lg transition-colors"
                >
                  <PinterestIcon className="w-3.5 h-3.5 text-[#E60023]" />
                  <span>Pinterest</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Contact Inquiry Form */}
          <Reveal className="lg:col-span-7 bg-[#141311] border border-[#F5F2EC]/10 p-8 sm:p-12" delay={0.1}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-6"
              >
                <CheckCircle2 className="w-16 h-16 text-[#C8A97E] mx-auto" />
                <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC]">Inquiry Received</h3>
                <p className="text-sm font-sans text-[#8E8A82] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. A member of our design leadership will review your brief and contact you within 24 to 48 hours to coordinate an exploratory session.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 border border-[#C8A97E] text-[#C8A97E] text-xs uppercase tracking-[0.2em] hover:bg-[#C8A97E] hover:text-[#11110F] transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-[#F5F2EC]">Project Inquiry Brief</h3>
                  <p className="text-xs text-[#8E8A82]">Tell us about your spatial aspirations.</p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-950/40 border border-red-800 text-xs text-red-200">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-[#8E8A82] block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Vikram Singhania"
                      className="w-full bg-[#181715] border border-[#F5F2EC]/15 px-4 py-3 text-sm text-[#F5F2EC] placeholder-[#8E8A82]/40 focus:outline-none focus:border-[#C8A97E] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-[#8E8A82] block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. vikram@example.com"
                      className="w-full bg-[#181715] border border-[#F5F2EC]/15 px-4 py-3 text-sm text-[#F5F2EC] placeholder-[#8E8A82]/40 focus:outline-none focus:border-[#C8A97E] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-[#8E8A82] block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98220 12345"
                      className="w-full bg-[#181715] border border-[#F5F2EC]/15 px-4 py-3 text-sm text-[#F5F2EC] placeholder-[#8E8A82]/40 focus:outline-none focus:border-[#C8A97E] transition-colors"
                    />
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-[#8E8A82] block">
                      Project Typology
                    </label>
                    <select
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleChange}
                      className="w-full bg-[#181715] border border-[#F5F2EC]/15 px-4 py-3 text-sm text-[#F5F2EC] focus:outline-none focus:border-[#C8A97E] transition-colors"
                    >
                      <option value="Residential Villa">Residential Villa / Bungalow</option>
                      <option value="Luxury Apartment">Luxury Penthouse / Apartment</option>
                      <option value="Commercial Workspace">Commercial Atelier / Workspace</option>
                      <option value="Hospitality Venue">Hospitality / Boutique Venue</option>
                      <option value="Turnkey Architecture">Complete Turnkey Architecture</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-[#8E8A82] block">
                      Project Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Bandra West, Mumbai"
                      className="w-full bg-[#181715] border border-[#F5F2EC]/15 px-4 py-3 text-sm text-[#F5F2EC] placeholder-[#8E8A82]/40 focus:outline-none focus:border-[#C8A97E] transition-colors"
                    />
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-[#8E8A82] block">
                      Estimated Investment
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-[#181715] border border-[#F5F2EC]/15 px-4 py-3 text-sm text-[#F5F2EC] focus:outline-none focus:border-[#C8A97E] transition-colors"
                    >
                      <option value="₹30 Lakhs - ₹50 Lakhs">₹30 Lakhs - ₹50 Lakhs</option>
                      <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                      <option value="₹1 Crore - ₹2.5 Crores">₹1 Crore - ₹2.5 Crores</option>
                      <option value="₹2.5 Crores+">₹2.5 Crores +</option>
                      <option value="To Be Determined">To Be Determined</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.2em] text-[#8E8A82] block">
                    Project Vision & Details *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the property, current construction stage, approximate carpet area, and timeline..."
                    className="w-full bg-[#181715] border border-[#F5F2EC]/15 px-4 py-3 text-sm text-[#F5F2EC] placeholder-[#8E8A82]/40 focus:outline-none focus:border-[#C8A97E] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-10 py-4 bg-[#F5F2EC] text-[#11110F] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#C8A97E] hover:text-[#11110F] transition-all duration-300 disabled:opacity-50"
                  >
                    <span>{submitting ? 'Transmitting Brief...' : 'Start a conversation →'}</span>
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      {/* Atelier Location & Creative Interactive Google Map Section */}
      <StudioMapSection />

      {/* Curated Digital Universe & Social Channels Showcase */}
      <ContactSocialSection />
    </div>
  );
};
