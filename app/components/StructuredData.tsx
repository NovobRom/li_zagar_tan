'use client';

import { TREATWELL_RATING, TREATWELL_REVIEW_COUNT_SCHEMA } from '@/app/config/reviews';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://li-zagar-tan.vercel.app';

export default function StructuredData() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BeautySalon',
        'name': 'li_zagar_tan',
        'image': `${baseUrl}/og-image.jpg`, // Placeholder
        '@id': baseUrl,
        'url': baseUrl,

        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'A. Goštauto g. 8-211',
            'addressLocality': 'Vilnius',
            'postalCode': '01108',
            'addressCountry': 'LT',
        },
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 54.6908,
            'longitude': 25.2709,
        },
        'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],
            'opens': '09:00',
            'closes': '21:00',
            'description': 'By appointment only'
        },
        'sameAs': [
            'https://www.instagram.com/li_zagar_tan/',
            'https://www.treatwell.lt/salonas/purskiamas-idegis-by-li-zagar-tan/'
        ],
        'priceRange': '€€',
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': TREATWELL_RATING,
            'reviewCount': TREATWELL_REVIEW_COUNT_SCHEMA
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
