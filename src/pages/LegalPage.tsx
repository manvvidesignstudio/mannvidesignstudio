import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/seo/Seo';
import { useSiteSettings } from '../context/SiteSettingsContext';

const fallbackPrivacy = `This privacy policy explains how Manvvi Design Studio collects and uses information submitted through this website. We use contact details only to respond to enquiries, provide requested services, and maintain business records. We do not sell personal information. You may request access, correction, or deletion by emailing us.`;
const fallbackTerms = `By using this website, you agree to use its content for personal, non-commercial purposes and not to copy, reproduce, or misuse studio work. Project imagery and text remain the property of Manvvi Design Studio or its respective owners. Information on this website is provided for general information and may change without notice.`;

export const LegalPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const settings = useSiteSettings();
  const privacy = type === 'privacy';
  const title = privacy ? 'Privacy Policy' : 'Terms of Service';
  const content = privacy ? settings?.privacy_policy || fallbackPrivacy : settings?.terms_of_service || fallbackTerms;
  return (
    <main className="min-h-screen bg-[#F5F2EC] text-[#171614] px-6 py-28">
      <Seo title={`${title} | Manvvi Design Studio`} description={`${title} for Manvvi Design Studio, Mumbai.`} />
      <article className="max-w-3xl mx-auto">
        <Link to="/" className="text-xs uppercase tracking-[0.2em] text-[#9C7B50]">Manvvi Design Studio</Link>
        <h1 className="mt-10 font-serif text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-neutral-500">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
        <div className="mt-12 whitespace-pre-line text-base leading-8 text-neutral-700">{content}</div>
      </article>
    </main>
  );
};
