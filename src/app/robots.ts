import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/lp/', '/_next/', '/api/'],
            },
        ],
        sitemap: 'https://aduanaspe.com/sitemap.xml',
    };
}
