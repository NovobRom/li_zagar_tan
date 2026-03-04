'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { languages, Language } from '@/app/i18n';
import MobileMenu from './MobileMenu';

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
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: '#about', label: t.nav.about },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#safety', label: t.nav.safety },
    { href: '#preparation', label: t.nav.preparation },
    { href: '#training', label: t.nav.training },
    { href: '#pricing', label: t.nav.pricing },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // If not on the homepage, route back to homepage with hash
    if (pathname !== '/') {
      router.push('/' + href);
      return;
    }

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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/90 backdrop-blur-md shadow-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex flex-col">
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, '#hero')}
                className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-amber-600 via-[#fbbf5d] to-orange-600 bg-clip-text text-transparent"
              >
                {t.footer.brand}
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`whitespace-nowrap font-medium transition-colors text-[14px] xl:text-[15px] ${activeSection === item.href
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
                className="whitespace-nowrap px-4 py-1.5 xl:py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full text-[14px] xl:text-[15px] hover:from-amber-600 hover:to-orange-600 transition-all"
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
                className="lg:hidden p-2 text-gray-600 hover:text-amber-600 transition-colors"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>



      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        brandName={t.footer.brand}
        bookingLabel={t.nav.booking}
      />
    </>
  );
}
