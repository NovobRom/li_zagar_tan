'use client';

import { GraduationCap, Check } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function TrainingSection() {
    const { t } = useLanguage();

    return (
        <section id="training" className="py-12 sm:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg">
                        <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                        {t.training.title}
                    </h2>
                    <p className="text-base sm:text-lg text-[#333333] max-w-2xl mx-auto leading-relaxed">
                        {t.training.intro}
                    </p>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100">
                        {/* Course description */}
                        <p className="text-[#333333] text-base sm:text-lg leading-relaxed mb-6">
                            {t.training.courseDescription}
                        </p>

                        {/* Course items */}
                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                            {t.training.courseItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-[#333333] text-sm sm:text-base">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Outro */}
                        <p className="text-[#333333] text-sm sm:text-base leading-relaxed mb-4">
                            {t.training.outro}
                        </p>

                        <p className="text-[#333333] text-sm sm:text-base leading-relaxed mb-6">
                            {t.training.closingNote}
                        </p>

                        {/* CTA */}
                        <div className="text-center">
                            <a
                                href="https://www.instagram.com/li_zagar_tan/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 via-[#fbbf5d] to-orange-500 text-white font-semibold rounded-full shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                {t.training.cta}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
