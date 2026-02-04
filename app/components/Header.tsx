'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { languages, Language } from '@/app/i18n';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active section highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { href: '#about', label: t.nav.about },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#reviews', label: t.nav.reviews },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/90 backdrop-blur-md shadow-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-amber-600 via-[#fbbf5d] to-orange-600 bg-clip-text text-transparent"
            >
              {t.footer.brand}
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-medium transition-colors text-sm lg:text-base ${activeSection === item.href
                    ? 'text-amber-600'
                    : 'text-gray-600 hover:text-amber-600'
                    }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={(e) => handleNavClick(e, '#booking')}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full text-sm lg:text-base hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                {t.nav.booking}
              </a>
            </nav>

            {/* Right side: Language + Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher - Compact */}
              <div className="flex gap-0.5 bg-gray-100 rounded-full p-0.5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as Language)}
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium transition-all ${language === lang.code
                      ? 'bg-gradient-to-r from-amber-500 via-[#fbbf5d] to-orange-500 text-white shadow-md'
                      : 'text-[#333333] hover:bg-gray-200'
                      }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>

              {/* Hamburger Menu Button - Mobile only */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-amber-600 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-bold bg-gradient-to-r from-amber-600 via-[#fbbf5d] to-orange-600 bg-clip-text text-transparent">
              {t.footer.brand}
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-6 py-3 font-medium transition-colors ${activeSection === item.href
                  ? 'bg-amber-50 text-amber-600'
                  : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Menu Footer with CTA */}
          <div className="p-4 border-t">
            <a
              href="#booking"
              onClick={(e) => handleNavClick(e, '#booking')}
              className="block w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full text-center hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              {t.nav.booking}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
