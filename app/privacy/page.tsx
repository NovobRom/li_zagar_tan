'use client';

import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
    const { t } = useLanguage();
    const privacy = t.privacyPolicy;

    return (
        <div className="min-h-screen flex flex-col pt-20">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-sm border border-brand-accent/20">
                    <h1 className="text-3xl md:text-5xl font-medium text-brand-dark mb-4 text-center">
                        {privacy.title}
                    </h1>
                    <p className="text-brand-dark/60 text-center mb-12">
                        {privacy.lastUpdated}
                    </p>

                    <div className="space-y-8">
                        {privacy.sections.map((section: { title: string; content: string }, index: number) => (
                            <section key={index} className="space-y-3">
                                <h2 className="text-xl md:text-2xl font-medium text-brand-accent">
                                    {section.title}
                                </h2>
                                <p className="text-brand-dark/80 leading-relaxed">
                                    {section.content}
                                </p>
                            </section>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
