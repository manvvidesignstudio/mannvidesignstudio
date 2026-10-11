import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from '../animations/CustomCursor';
import { useLenis } from '../../hooks/useLenis';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { SiteSettingsProvider } from '../../context/SiteSettingsContext';

export const PublicLayout: React.FC = () => {
  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useLenis();

  return (
    <SiteSettingsProvider>
      <div className="relative min-h-screen bg-[#11110F] text-[#F5F2EC] flex flex-col font-sans selection:bg-[#C8A97E]/30 selection:text-[#F5F2EC]">
        <CustomCursor />
        <Navbar />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </SiteSettingsProvider>
  );
};
