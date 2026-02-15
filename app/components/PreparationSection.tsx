'use client';

import { ClipboardList, CheckCircle, Droplets } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function PreparationSection() {
    const { t } = useLanguage();

    return (
        <section id="preparation" className="py-12 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg">
                        <ClipboardList className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                        {t.preparation.title}
                    </h2>
                </div>

                {/* Two-column layout */}
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                    {/* Before */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 sm:p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                {t.preparation.beforeTitle}
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {t.preparation.beforeItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                        {index + 1}
                                    </span>
                                    <span className="text-[#333333] text-sm sm:text-base leading-relaxed">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* After */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 sm:p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Droplets className="w-6 h-6 text-amber-600 flex-shrink-0" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                {t.preparation.afterTitle}
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {t.preparation.afterItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                        {index + 1}
                                    </span>
                                    <span className="text-[#333333] text-sm sm:text-base leading-relaxed">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
