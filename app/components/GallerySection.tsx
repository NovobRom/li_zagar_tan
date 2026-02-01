'use client';

import { useLanguage } from '@/app/context/LanguageContext';

export default function GallerySection() {
  const { t } = useLanguage();

  // Placeholder images - replace with actual before/after photos
  const galleryItems = [
    { id: 1, placeholder: '1' },
    { id: 2, placeholder: '2' },
    { id: 3, placeholder: '3' },
    { id: 4, placeholder: '4' },
    { id: 5, placeholder: '5' },
    { id: 6, placeholder: '6' },
  ];

  return (
    <section id="gallery" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3">
            {t.gallery.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Gallery Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-md active:scale-[0.98] transition-all duration-200"
            >
              {/* Placeholder content - replace with actual images */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl sm:text-6xl text-amber-300/50 font-bold">
                    {item.placeholder}
                  </div>
                  <p className="text-amber-600/50 text-xs sm:text-sm mt-1">
                    {t.gallery.beforeAfter}
                  </p>
                </div>
              </div>

              {/* Hover/Touch overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    {t.gallery.beforeAfter}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <a
            href="https://www.instagram.com/li_zagar_tan/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-amber-600 font-medium text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            {t.common.instagram}
          </a>
        </div>
      </div>
    </section>
  );
}
