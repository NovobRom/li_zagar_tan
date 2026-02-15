'use client';

import { Shield, Leaf, Layers, Sun, Heart } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

const POINT_ICONS = [Leaf, Layers, Sun, Heart];

export default function SafetySection() {
    const { t } = useLanguage();

    return (
        <section id="safety" className="py-12 sm:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg">
                        <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                        {t.safety.title}
                    </h2>
                    <p className="text-base sm:text-lg text-[#333333] max-w-3xl mx-auto leading-relaxed">
                        {t.safety.intro}
                    </p>
                </div>

                {/* Safety Points Grid */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                    {t.safety.points.map((point, index) => {
                        const Icon = POINT_ICONS[index] || Leaf;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-amber-100"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1.5">
                                            {point.title}
                                        </h3>
                                        <p className="text-[#333333] text-sm sm:text-base leading-relaxed">
                                            {point.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
