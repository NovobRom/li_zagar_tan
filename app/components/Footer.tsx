'use client';

import { MapPin, Instagram, Clock } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-300 via-[#fbbf5d] to-orange-300 bg-clip-text text-transparent mb-3">
              {t.footer.brand}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mb-3">
              {t.footer.tagline}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-400 text-sm">
              <span className="text-[#fbbf5d]">★★★★★</span>
              <span>{t.common.rating}</span>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-3">{t.footer.contact}</h4>
            <div className="space-y-2">
              <a
                href="https://maps.google.com/?q=A.+Goštauto+g.+8,+Vilnius,+Lithuania"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-center sm:justify-start gap-2 text-gray-400 hover:text-amber-400 transition-colors text-sm"
              >
                <MapPin className="w-4 h-4 text-[#fbbf5d] flex-shrink-0 mt-0.5" />
                <span className="underline underline-offset-2">{t.common.address}</span>
              </a>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4 text-[#fbbf5d] flex-shrink-0" />
                <span>{t.footer.byAppointment}</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3">{t.footer.followUs}</h4>
            <div className="flex flex-col items-center sm:items-start gap-4">
              <a
                href="https://www.instagram.com/li_zagar_tan/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-gray-400 hover:text-[#fbbf5d] transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 via-[#fbbf5d] to-orange-500 rounded-full flex items-center justify-center">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-sm">{t.common.instagram}</span>
              </a>

              <a
                href="https://www.treatwell.lt/salonas/purskiamas-idegis-by-li-zagar-tan/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-[#fbbf5d] transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                Treatwell
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-xs sm:text-sm">
          <p>© {currentYear} {t.footer.brand}. {t.footer.rights}.</p>
        </div>
      </div>
    </footer>
  );
}
