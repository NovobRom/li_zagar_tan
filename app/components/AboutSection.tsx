'use client';

import { Award, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

import { useState, useEffect } from 'react';
import { getProfilePhoto } from '@/app/actions/settings';
import Image from 'next/image';
import { blurDataURL } from '@/app/lib/shimmer';

export default function AboutSection() {
  const { t } = useLanguage();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhoto() {
      const url = await getProfilePhoto();
      if (url) setProfilePhoto(url);
    }
    fetchPhoto();
  }, []);

  const stats = [
    { label: t.about.experience, value: t.about.experienceYears },
    { label: t.about.clients, value: t.about.clientsCount },
    { label: t.about.certifications, value: t.about.certificationsCount },
  ];

  const qualities = [
    { icon: Award, text: t.about.qualities.professional },
    { icon: Heart, text: t.about.qualities.individual },
    { icon: Sparkles, text: t.about.qualities.quality },
  ];

  return (
    <section id="about" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Photo */}
          <div className="relative order-1 lg:order-1">
            <div className="aspect-[4/5] max-w-sm mx-auto lg:max-w-none bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative">
              {profilePhoto ? (
                <Image
                  src={profilePhoto}
                  alt="Li Zagar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={blurDataURL(400, 500)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl text-white/80">L</span>
                    </div>
                    <p className="text-amber-600/60 text-sm">Photo</p>
                  </div>
                </div>
              )}
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl -z-10 opacity-20" />
          </div>

          {/* Content */}
          <div className="order-2 lg:order-2 space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {t.about.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 font-medium">
                {t.about.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-[#333333] leading-relaxed text-base sm:text-lg">
              {t.about.description}
            </p>



            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 sm:p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl"
                >
                  <div className="text-xl sm:text-2xl font-bold text-[#fbbf5d]">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Qualities */}
            <div className="flex flex-wrap gap-3">
              {qualities.map((quality, index) => {
                const Icon = quality.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-full shadow-sm"
                  >
                    <Icon className="w-4 h-4 text-[#fbbf5d]" />
                    <span className="text-sm font-medium text-gray-700">
                      {quality.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 via-[#fbbf5d] to-orange-500 text-white font-semibold rounded-full shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                {t.common.bookNow}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
