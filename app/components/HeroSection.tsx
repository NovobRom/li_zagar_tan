'use client';

import { Sparkles, Clock, Shield } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  const features = [
    { icon: Clock, text: t.hero.features.duration },
    { icon: Shield, text: t.hero.features.professional },
    { icon: Sparkles, text: t.hero.features.natural },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 pt-16 sm:pt-20">
      <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">

            {/* Image - First on mobile */}
            <div className="relative w-full lg:order-last">
              <div className="aspect-[4/3] sm:aspect-[3/4] bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden max-w-md mx-auto lg:max-w-none">
                <div className="w-full h-full flex items-center justify-center text-white/50 text-base font-medium">
                  {t.gallery.beforeAfter}
                </div>
              </div>
              {/* Floating badge - Visible on larger screens */}
              <div className="hidden sm:block absolute -bottom-4 right-4 lg:-bottom-6 lg:-right-6 bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-5 rotate-3 hover:rotate-0 transition-transform">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-amber-600">40€</div>
                  <div className="text-xs sm:text-sm text-gray-600">{t.common.fullBody}</div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-5 sm:space-y-6 text-center lg:text-left">
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                    {t.hero.title}
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  {t.hero.subtitle}
                </p>
              </div>

              {/* Features - Horizontal on mobile */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center p-2 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm"
                    >
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-amber-600 mb-1 sm:mb-2" />
                      <span className="text-[10px] sm:text-sm font-medium text-gray-700 leading-tight">
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="space-y-3">
                <a href="#booking" className="block">
                  <button className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-base sm:text-lg font-semibold rounded-full shadow-lg active:scale-[0.98] transition-all duration-200">
                    {t.common.bookNow}
                  </button>
                </a>
                <p className="text-sm text-gray-600 flex items-center justify-center lg:justify-start gap-2">
                  <span className="text-amber-500">★★★★★</span>
                  <span className="text-xs sm:text-sm">{t.common.rating}</span>
                </p>
              </div>

              {/* Contact Info */}
              <div className="pt-4 border-t border-gray-200 space-y-1.5 text-sm">
                <a
                  href="https://maps.google.com/?q=A.+Goštauto+g.+8,+Vilnius,+Lithuania"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-amber-600 transition-colors inline-flex items-center gap-1"
                >
                  📍 <span className="underline underline-offset-2">{t.common.address}</span>
                </a>
                <p className="text-gray-600">
                  📸{' '}
                  <a
                    href="https://www.instagram.com/li_zagar_tan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 font-medium"
                  >
                    {t.common.instagram}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
