import fs from 'node:fs';
import path from 'node:path';
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://aduanaspe.com';

type StaticRouteEntry = {
    url: string;
    sourceFile: string;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
    priority: number;
};

function getFileLastModified(sourceFile: string) {
    try {
        return fs.statSync(path.join(process.cwd(), sourceFile)).mtime.toISOString();
    } catch {
        return undefined;
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: StaticRouteEntry[] = [
        {
            url: `${BASE_URL}/`,
            sourceFile: 'src/app/(site)/page.tsx',
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/quienes-somos/`,
            sourceFile: 'src/app/(site)/quienes-somos/page.tsx',
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/servicios/`,
            sourceFile: 'src/app/(site)/servicios/page.tsx',
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/servicios/agenciamiento-aduanas/`,
            sourceFile: 'src/app/(site)/servicios/agenciamiento-aduanas/page.tsx',
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/servicios/agencia-de-carga-internacional/`,
            sourceFile: 'src/app/(site)/servicios/agencia-de-carga-internacional/page.tsx',
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/servicios/transporte-de-carga/`,
            sourceFile: 'src/app/(site)/servicios/transporte-de-carga/page.tsx',
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/servicios/resguardo-aduanero/`,
            sourceFile: 'src/app/(site)/servicios/resguardo-aduanero/page.tsx',
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/servicios/consultoria-aduanera/`,
            sourceFile: 'src/app/(site)/servicios/consultoria-aduanera/page.tsx',
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/comercio-exterior/`,
            sourceFile: 'src/app/(site)/comercio-exterior/page.tsx',
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/comercio-exterior/importacion/`,
            sourceFile: 'src/app/(site)/comercio-exterior/importacion/page.tsx',
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/comercio-exterior/importacion/courier-vs-carga/`,
            sourceFile: 'src/app/(site)/comercio-exterior/importacion/courier-vs-carga/page.tsx',
            changeFrequency: 'weekly',
            priority: 0.75,
        },
        {
            url: `${BASE_URL}/comercio-exterior/importacion/importa-puerta-a-puerta/`,
            sourceFile: 'src/app/(site)/comercio-exterior/importacion/importa-puerta-a-puerta/page.tsx',
            changeFrequency: 'weekly',
            priority: 0.75,
        },
        {
            url: `${BASE_URL}/comercio-exterior/importacion/importar-desde-china/`,
            sourceFile: 'src/app/(site)/comercio-exterior/importacion/importar-desde-china/page.tsx',
            changeFrequency: 'weekly',
            priority: 0.75,
        },
        {
            url: `${BASE_URL}/comercio-exterior/exportacion/`,
            sourceFile: 'src/app/(site)/comercio-exterior/exportacion/page.tsx',
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/comercio-exterior/regimenes-aduaneros/`,
            sourceFile: 'src/app/(site)/comercio-exterior/regimenes-aduaneros/page.tsx',
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/comercio-exterior/documentos-aduaneros/`,
            sourceFile: 'src/app/(site)/comercio-exterior/documentos-aduaneros/page.tsx',
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/contacto/`,
            sourceFile: 'src/app/(site)/contacto/page.tsx',
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/`,
            sourceFile: 'src/app/(site)/blog/page.tsx',
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ];

    const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: route.url,
        lastModified: getFileLastModified(route.sourceFile),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

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

    return [...staticPages, ...blogPosts];
}
