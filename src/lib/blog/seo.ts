/**
 * Blog SEO utilities
 */

import type { Metadata } from 'next';
import type { BlogPostCard } from './types';

const SITE_NAME = 'AduanasPE';
const SITE_URL = 'https://aduanaspe.com';

export function generateBlogPostMetadata(post: BlogPostCard): Metadata {
    const url = `${SITE_URL}/blog/${post.slug}/`;
    const title = `${post.title} | AduanasPE`;

    return {
        title,
        description: post.description,
        authors: [{ name: post.author }],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description: post.description,
            url,
            siteName: SITE_NAME,
            locale: 'es_PE',
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.updatedAt ?? post.date,
            authors: [post.author],
            section: post.category,
            tags: post.tags,
            ...(post.image && {
                images: [{
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.imageAlt ?? post.title,
                }],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: post.description,
            ...(post.image && { images: [post.image] }),
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large' as const,
                'max-snippet': -1,
            },
        },
    };
}

export function generateBlogIndexMetadata(page?: number, category?: string): Metadata {
    const hasCategory = Boolean(category);
    const isFilteredView = hasCategory || Boolean(page && page > 1);
    const titleBase = hasCategory
        ? `${category} - Blog de Comercio Exterior`
        : 'Blog de Comercio Exterior';
    const title = page && page > 1 ? `${titleBase} - Pagina ${page} | ${SITE_NAME}` : `${titleBase} | ${SITE_NAME}`;
    const description = hasCategory
        ? `Articulos y guias sobre ${category?.toLowerCase()} para operaciones de comercio exterior en Peru.`
        : 'Articulos, guias y recursos sobre comercio exterior, aduanas, importaciones y exportaciones en Peru.';

    const query = new URLSearchParams();
    if (category) query.set('category', category);
    if (page && page > 1) query.set('page', String(page));
    const suffix = query.size > 0 ? `?${query.toString()}` : '';
    const url = `${SITE_URL}/blog/${suffix}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            locale: 'es_PE',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        robots: {
            index: !isFilteredView,
            follow: true,
        },
    };
}

export function generateBlogPostJsonLd(post: BlogPostCard) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updatedAt ?? post.date,
        author: {
            '@type': 'Person',
            name: post.author,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blog/${post.slug}/`,
        },
        url: `${SITE_URL}/blog/${post.slug}/`,
        ...(post.image && { image: post.image }),
        articleSection: post.category,
        keywords: post.tags.join(', '),
        inLanguage: 'es',
    };
}

export function generateBlogBreadcrumbJsonLd(post: BlogPostCard) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Inicio',
                item: `${SITE_URL}/`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${SITE_URL}/blog/`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `${SITE_URL}/blog/${post.slug}/`,
            },
        ],
    };
}

export function generateBlogIndexJsonLd(page?: number, category?: string) {
    const query = new URLSearchParams();
    if (category) query.set('category', category);
    if (page && page > 1) query.set('page', String(page));
    const suffix = query.size > 0 ? `?${query.toString()}` : '';
    const url = `${SITE_URL}/blog/${suffix}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: category ? `${category} - Blog de Comercio Exterior` : `Blog de Comercio Exterior - ${SITE_NAME}`,
        description: category
            ? `Articulos sobre ${category.toLowerCase()} y comercio exterior en Peru.`
            : 'Articulos sobre comercio exterior, aduanas, importaciones y exportaciones en Peru.',
        url,
        isPartOf: {
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
        },
    };
}
