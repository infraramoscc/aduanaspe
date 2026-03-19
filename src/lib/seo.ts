import type { Metadata } from 'next';

const SITE_NAME = 'AduanasPE';
const SITE_URL = 'https://aduanaspe.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

interface SEOParams {
    title: string;
    description: string;
    path?: string;
    noIndex?: boolean;
    type?: 'website' | 'article';
    image?: string;
}

export function generateSEO({
    title,
    description,
    path = '',
    noIndex = false,
    type = 'website',
    image = DEFAULT_OG_IMAGE,
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
            type,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: fullTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [image],
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
