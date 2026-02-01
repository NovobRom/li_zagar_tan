'use client';

import { Star } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function ReviewsSection() {
  const { t } = useLanguage();

  return (
    <section id="reviews" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3">
            {t.reviews.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {t.reviews.subtitle}
          </p>
          {/* Overall Rating */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-700">
              {t.common.rating}
            </span>
          </div>
        </div>

        {/* Reviews - Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0">
          {t.reviews.reviewsList.map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] sm:w-auto snap-start bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base line-clamp-4 sm:line-clamp-none">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {review.name.charAt(0)}
                </div>
                <span className="font-medium text-gray-800 text-sm sm:text-base">{review.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Treatwell Link */}
        <div className="text-center mt-8 sm:mt-12">
          <a
            href="https://www.treatwell.lt/salonas/purskiamas-idegis-by-li-zagar-tan/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-amber-500 text-amber-600 font-medium rounded-full text-sm sm:text-base active:bg-amber-50 transition-colors"
          >
            {t.reviews.viewAll}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
