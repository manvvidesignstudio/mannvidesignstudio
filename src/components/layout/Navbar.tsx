import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { PROJECT_CATEGORIES } from '../../types/database';

interface NavLinkItem {
  name: string;
  path: string;
}

const navLinks: NavLinkItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Process', path: '/process' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioMenuOpen, setPortfolioMenuOpen] = useState(false);
  const location = useLocation();
  const settings = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#11110F]/85 backdrop-blur-md border-b border-[#F5F2EC]/10 py-4 shadow-xl'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group min-w-0 shrink-0 flex items-baseline tracking-wider font-brand text-[#F5F2EC] hover:text-[#C8A97E] transition-colors"
          >
            <span className="whitespace-nowrap text-base sm:text-xl md:text-2xl font-medium tracking-[0.08em]">
            Manvvi Design Studio
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-end gap-7 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const isPortfolio = link.path === '/portfolio';

              if (isPortfolio) {
                return (
                  <div
                    key={link.path}
                    className="relative group"
                    onMouseEnter={() => setPortfolioMenuOpen(true)}
                    onMouseLeave={() => setPortfolioMenuOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`relative flex items-center gap-1 text-xs uppercase tracking-[0.2em] font-sans transition-colors duration-300 ${
                        isActive ? 'text-[#C8A97E]' : 'text-[#F5F2EC]/80 hover:text-[#F5F2EC]'
                      }`}
                      aria-haspopup="true"
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-[#C8A97E]"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </Link>

                    <div
                      className={`absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-5 transition-all duration-200 ${
                        portfolioMenuOpen
                          ? 'visible opacity-100'
                          : 'invisible opacity-0'
                      }`}
                    >
                      <div className="border border-[#F5F2EC]/10 bg-[#181715]/95 p-2 shadow-2xl backdrop-blur-md">
                        <Link
                          to="/portfolio"
                          onClick={() => setPortfolioMenuOpen(false)}
                          className="block px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[#C8A97E] transition-colors hover:bg-[#F5F2EC]/5 hover:text-[#F5F2EC]"
                        >
                          All Projects
                        </Link>
                        {PROJECT_CATEGORIES.map((category) => (
                          <Link
                            key={category}
                            to={`/portfolio?category=${category}`}
                            onClick={() => setPortfolioMenuOpen(false)}
                            className="block px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[#8E8A82] transition-colors hover:bg-[#F5F2EC]/5 hover:text-[#F5F2EC]"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-xs uppercase tracking-[0.2em] font-sans transition-colors duration-300 ${
                    isActive ? 'text-[#C8A97E]' : 'text-[#F5F2EC]/80 hover:text-[#F5F2EC]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-[#C8A97E]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center space-x-2 text-xs uppercase tracking-[0.15em] px-4 py-2 border border-[#C8A97E]/50 text-[#F5F2EC] hover:bg-[#C8A97E] hover:text-[#11110F] transition-all duration-300"
            >
              <span>Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden shrink-0 p-2 text-[#F5F2EC] hover:text-[#C8A97E] transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#11110F] flex flex-col justify-between px-8 py-24 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-6 pt-8">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A97E]">Navigation</span>
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                const isPortfolio = link.path === '/portfolio';
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-serif text-3xl sm:text-4xl tracking-wide flex items-center justify-between ${
                        isActive ? 'text-[#C8A97E]' : 'text-[#F5F2EC] hover:text-[#C8A97E]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-5 h-5 text-[#8E8A82]" />
                    </Link>
                    {isPortfolio && (
                      <div className="mt-4 ml-4 flex flex-col gap-3 border-l border-[#F5F2EC]/10 pl-4">
                        <Link
                          to="/portfolio"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs uppercase tracking-[0.18em] text-[#C8A97E]"
                        >
                          All Projects
                        </Link>
                        {PROJECT_CATEGORIES.map((category) => (
                          <Link
                            key={category}
                            to={`/portfolio?category=${category}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-xs uppercase tracking-[0.18em] text-[#8E8A82] hover:text-[#F5F2EC]"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Footer Info */}
            <div className="border-t border-[#F5F2EC]/10 pt-8 mt-12 space-y-4">
              {settings && (
                <>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8E8A82]">
                    {[settings.address, settings.city, settings.state].filter(Boolean).join(', ')}
                  </p>
                  <div className="flex flex-col space-y-1 text-sm text-[#F5F2EC]/90">
                    <a href={`mailto:${settings.email}`} className="hover:text-[#C8A97E]">
                      {settings.email}
                    </a>
                    <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-[#C8A97E]">
                      {settings.phone}
                    </a>
                  </div>
                </>
              )}
              <div className="pt-2">
                <Link
                  to="/admin/login"
                  className="text-[11px] uppercase tracking-[0.15em] text-[#8E8A82]/60 hover:text-[#C8A97E]"
                >
                  Admin Portal →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
