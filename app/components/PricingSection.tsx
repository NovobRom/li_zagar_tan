'use client';

import { Clock } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function PricingSection() {
  const { t } = useLanguage();

  const services = [
    {
      ...t.pricing.services.fullBody,
      popular: true,
    },
    {
      ...t.pricing.services.legs,
      popular: false,
    },
    {
      ...t.pricing.services.bioPeeling,
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-12 sm:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 via-[#fbbf5d] to-orange-600 bg-clip-text text-transparent mb-3">
            {t.pricing.title}
          </h2>
          <p className="text-base sm:text-lg text-[#333333] max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Pricing Cards - Stack on mobile */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8 max-w-lg mx-auto lg:max-w-none">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden ${service.popular ? 'ring-2 ring-amber-500 lg:scale-105' : ''
                }`}
              aria-label={`${service.name} service, price ${service.price}, duration ${service.duration}`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 via-[#fbbf5d] to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                  {t.pricing.popular}
                </div>
              )}

              <div className="p-5 sm:p-6 lg:p-8">
                {/* Service Name */}
                <h3 className="text-lg sm:text-xl font-bold text-[#171717] mb-2 pr-16 sm:pr-0">
                  {service.name}
                </h3>
                <p className="text-[#333333] text-sm mb-4 sm:mb-6 min-h-[3rem]">
                  {service.description}
                </p>

                {/* Price & Duration row on mobile */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 via-[#fbbf5d] to-orange-600 bg-clip-text text-transparent">
                    {new Intl.NumberFormat(undefined, {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 0,
                    }).format(service.price)}
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                    <Clock className="w-4 h-4 text-[#fbbf5d]" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <a href="#booking" className="block">
                  <button
                    className={`w-full py-3 px-6 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] ${service.popular
                      ? 'bg-gradient-to-r from-amber-500 via-[#fbbf5d] to-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-[#333333] active:bg-gray-200'
                      }`}
                  >
                    {t.common.bookNow}
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
