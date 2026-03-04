'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GA_ID = 'G-23N94VFY9M';
const CONSENT_KEY = 'cookie-consent';

export default function GoogleAnalyticsWrapper() {
    const [consented, setConsented] = useState(false);

    useEffect(() => {
        const checkConsent = () => {
            const stored = localStorage.getItem(CONSENT_KEY);
            setConsented(stored === 'accepted');
        };

        checkConsent();

        // Listen for storage changes (in case consent is given while component is mounted)
        const handleStorage = () => checkConsent();
        window.addEventListener('storage', handleStorage);

        // Also poll briefly to catch same-tab changes
        const interval = setInterval(checkConsent, 1000);

        return () => {
            window.removeEventListener('storage', handleStorage);
            clearInterval(interval);
        };
    }, []);

    if (!consented) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
            </Script>
        </>
    );
}
