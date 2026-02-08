'use client';

import { getPhotos } from '@/app/actions/gallery';
import { useLanguage } from '@/app/context/LanguageContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { blurDataURL } from '@/app/lib/shimmer';

// Define the shape of a gallery item from Supabase
interface GalleryItem {
  id: number;
  image_url: string;
  storage_path: string;
  created_at: string;
}

export default function GallerySection() {
  const { t } = useLanguage();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const photos = await getPhotos();

        // Supabase returns object with success/error from our wrapper, 
        // OR array if we defined getPhotos that way.
        // Let's check getPhotos implementation:
        // "return data || []" -> returns array.
        // Wait, my getPhotos implementation in actions/gallery.ts:
        // export async function getPhotos() { ... return data || [] }
        // Yes, it returns an array on success.

        // However, TS might complain if 'photos' has type issues.
        // Let's cast it carefully.
        setGalleryItems(photos as GalleryItem[]);
      } catch (error) {
        console.error('Failed to fetch gallery items:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

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

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
          </div>
        ) : galleryItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-md active:scale-[0.98] transition-all duration-200"
              >
                <Image
                  src={item.image_url}
                  alt={`Spray tan result ${item.id}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={blurDataURL(400, 400)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500">{t.gallery.loading}</p>
            {/* Fallback for empty state if needed - maybe show placeholders from before? 
                For now keeping it clean as per "Results imply real photos" */}
          </div>
        )}

        {/* Instagram CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <a
            href="https://www.instagram.com/li_zagar_tan/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-amber-600 font-medium text-sm sm:text-base hover:text-amber-700 transition-colors"
            aria-label="View more photos on Instagram"
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
