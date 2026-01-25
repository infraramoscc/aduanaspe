import type { MetadataRoute } from 'next';

const BASE_URL = 'https://aduanaspe.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date().toISOString();

    // Páginas principales
    const mainPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/quienes-somos`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/servicios`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/contacto`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Páginas de servicios
    const servicePages: MetadataRoute.Sitemap = [
        'agenciamiento-aduanas',
        'agencia-de-carga-internacional',
        'transporte-de-carga',
        'resguardo-aduanero',
        'consultoria-aduanera',
    ].map((slug) => ({
        url: `${BASE_URL}/servicios/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Páginas de comercio exterior
    const comercioPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/comercio-exterior/importacion`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/comercio-exterior/exportacion`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/comercio-exterior/regimenes-aduaneros`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/comercio-exterior/documentos-aduaneros`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Páginas legales
    const legalPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/privacidad`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terminos`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    return [...mainPages, ...servicePages, ...comercioPages, ...legalPages];
}
