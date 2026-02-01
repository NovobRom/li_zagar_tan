'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { languages, Language } from '@/app/i18n';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
        <a href="#" className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          {t.footer.brand}
        </a>

        {/* Language Switcher - Compact on mobile */}
        <div className="flex gap-0.5 bg-gray-100 rounded-full p-0.5">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as Language)}
              className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                language === lang.code
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                  : 'text-gray-600 active:bg-gray-200'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
