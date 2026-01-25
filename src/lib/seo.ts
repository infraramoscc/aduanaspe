import type { Metadata } from 'next';

const SITE_NAME = 'AduanasPE';
const SITE_URL = 'https://aduanaspe.com';

interface SEOParams {
    title: string;
    description: string;
    path?: string;
    noIndex?: boolean;
}

export function generateSEO({
    title,
    description,
    path = '',
    noIndex = false,
}: SEOParams): Metadata {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;

    return {
        title: fullTitle,
        description,
        metadataBase: new URL(SITE_URL),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: SITE_NAME,
            locale: 'es_PE',
            type: 'website',
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
    };
}

export function generateAdsMetadata(title: string, description: string): Metadata {
    return generateSEO({
        title,
        description,
        noIndex: true,
    });
}
