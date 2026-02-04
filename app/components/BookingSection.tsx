'use client';

import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import TreatwellWidget from './TreatwellWidget';

export default function BookingSection() {
  const { t } = useLanguage();

  return (
    <section id="booking" className="py-12 sm:py-20 bg-gradient-to-br from-amber-600 via-[#fbbf5d] to-orange-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Decorative Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full backdrop-blur-sm">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#fbbf5d]" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            {t.booking.title}
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto">
            {t.booking.subtitle}
          </p>
        </div>

        {/* Treatwell Widget - Full Width */}
        <div className="w-full">
          <TreatwellWidget />
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/80 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Treatwell</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>73+ {t.common.rating.split(' ').pop()}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>4.9★</span>
          </div>
        </div>
      </div>
    </section>
  );
}
