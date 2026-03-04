'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';

const CONSENT_KEY = 'cookie-consent';

export type ConsentStatus = 'accepted' | 'declined' | null;

export function useCookieConsent() {
    const [consent, setConsent] = useState<ConsentStatus>(null);

    useEffect(() => {
        const stored = localStorage.getItem(CONSENT_KEY) as ConsentStatus;
        if (stored === 'accepted' || stored === 'declined') {
            setConsent(stored);
        }
    }, []);

    const accept = () => {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        setConsent('accepted');
    };

    const decline = () => {
        localStorage.setItem(CONSENT_KEY, 'declined');
        setConsent('declined');
    };

    return { consent, accept, decline };
}

export default function CookieConsent() {
    const { t } = useLanguage();
    const { consent, accept, decline } = useCookieConsent();
    const [visible, setVisible] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleChoice = (action: () => void) => {
        action();
        setVisible(false);
        if (pathname === '/privacy') {
            router.push('/');
        }
    };

    useEffect(() => {
        // Show banner only if no decision has been made yet
        if (consent === null) {
            const stored = localStorage.getItem(CONSENT_KEY);
            if (!stored) {
                setVisible(true);
            }
        }
    }, [consent]);

    if (!visible || consent !== null) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
            role="dialog"
            aria-label="Cookie consent"
        >
            <div className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-gray-300 text-sm text-center sm:text-left">
                            🍪 {t.cookieConsent.message}
                        </p>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <button
                                onClick={() => handleChoice(decline)}
                                className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-colors"
                            >
                                {t.cookieConsent.decline}
                            </button>
                            <button
                                onClick={() => handleChoice(accept)}
                                className="px-4 py-2 text-sm text-gray-900 font-medium bg-[#fbbf5d] hover:bg-amber-400 rounded-lg transition-colors"
                            >
                                {t.cookieConsent.accept}
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 text-xs md:text-center text-gray-400">
                        <a href="/privacy" className="hover:text-white transition-colors underline underline-offset-2">
                            {t.cookieConsent.privacyLink}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
