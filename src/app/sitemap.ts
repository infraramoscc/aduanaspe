import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://aduanaspe.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const currentDate = new Date().toISOString();

    // Páginas principales
    const mainPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/quienes-somos/`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/servicios/`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/contacto/`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Páginas de servicios Pillar (Prioridad Alta)
    const pillarServices = [
        'agenciamiento-aduanas',
        'agencia-de-carga-internacional',
        'transporte-de-carga',
    ].map((slug) => ({
        url: `${BASE_URL}/servicios/${slug}/`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Páginas de servicios Soporte (Prioridad Media-Alta)
    const supportServices = [
        'resguardo-aduanero',
        'consultoria-aduanera',
    ].map((slug) => ({
        url: `${BASE_URL}/servicios/${slug}/`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Páginas de comercio exterior
    const comercioPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/comercio-exterior/importacion/`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/comercio-exterior/exportacion/`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/comercio-exterior/regimenes-aduaneros/`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/comercio-exterior/documentos-aduaneros/`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Blog index
    const blogIndex: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/blog/`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ];

    // Blog posts (dynamic from MDX + Sanity)
    let blogPosts: MetadataRoute.Sitemap = [];
    try {
        const posts = await getAllPosts();
        blogPosts = posts.map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}/`,
            lastModified: post.updatedAt ?? post.date,
            changeFrequency: 'weekly' as const,
            priority: post.featured ? 0.8 : 0.7,
        }));
    } catch (error) {
        console.error('[Sitemap] Error fetching blog posts:', error);
    }

    return [...mainPages, ...pillarServices, ...supportServices, ...comercioPages, ...blogIndex, ...blogPosts];
}
