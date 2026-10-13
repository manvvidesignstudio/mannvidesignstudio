import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '../components/seo/Seo';

export const NotFound: React.FC = () => {
  return (
    <>
      <Seo
        title="Page Not Found | Manvvi Design Studio, Mumbai"
        description="The requested page could not be found on the Manvvi Design Studio website."
        noIndex
      />
      <div className="min-h-screen bg-[#11110F] text-[#F5F2EC] flex flex-col items-center justify-center px-6 text-center">
      <div className="space-y-6 max-w-md">
        <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#C8A97E] block">404 — Not Found</span>
        <h1 className="font-serif text-5xl sm:text-6xl text-[#F5F2EC] font-normal">Page Uncharted</h1>
        <p className="text-sm font-sans text-[#8E8A82] leading-relaxed">
          The architectural space you are looking for has been relocated or does not exist.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 border border-[#C8A97E] text-[#C8A97E] text-xs uppercase tracking-[0.2em] hover:bg-[#C8A97E] hover:text-[#11110F] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Studio Home</span>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
};
