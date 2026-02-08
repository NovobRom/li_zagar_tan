'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface TreatwellWidgetProps {
  className?: string;
}

export default function TreatwellWidget({ className = '' }: TreatwellWidgetProps) {
  useEffect(() => {
    // Add Treatwell CSS dynamically
    const link = document.createElement('link');
    link.type = 'text/css';
    link.href = 'https://book.treatwell.lt/common/venue-menu/css/widget-button.css';
    link.rel = 'stylesheet';
    link.media = 'screen';
    document.head.appendChild(link);

    // Add custom styles for widget sizing
    const style = document.createElement('style');
    style.textContent = `
      #wahanda-online-booking-widget-iframe {
        width: 100% !important;
        min-height: 600px !important;
        max-width: 100% !important;
      }
      #wahanda-online-booking-widget-iframe iframe {
        width: 100% !important;
        min-height: 600px !important;
        height: auto !important;
      }
      @media (min-width: 768px) {
        #wahanda-online-booking-widget-iframe {
          min-height: 700px !important;
        }
        #wahanda-online-booking-widget-iframe iframe {
          min-height: 700px !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`w-full ${className}`}>
      {/* Treatwell Widget Container */}
      <div
        id="wahanda-online-booking-widget-iframe"
        data-widget-url="https://book.treatwell.lt/salonas/472902/meniu/"
        className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ minHeight: '600px' }}
      />

      {/* Load Treatwell Script */}
      <Script
        src="https://book.treatwell.lt/common/venue-menu/javascript/widget-button.js?v1"
        strategy="lazyOnload"
        onLoad={() => {
          // Treatwell widget loaded
        }}
      />
    </div>
  );
}
