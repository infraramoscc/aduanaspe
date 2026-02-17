/**
 * Blog System - SEO Utilities
 * Generates metadata, JSON-LD, and OG data for blog posts
 */

import type { Metadata } from 'next';
import type { BlogPostCard } from './types';

const SITE_NAME = 'AduanasPE';
const SITE_URL = 'https://aduanaspe.com';

/* --------------------------------------------------
 * Generate full metadata for a blog post page
 * -------------------------------------------------- */

export function generateBlogPostMetadata(post: BlogPostCard): Metadata {
    const url = `${SITE_URL}/blog/${post.slug}/`;

    return {
        title: `${post.title} | Blog ${SITE_NAME}`,
        description: post.description,
        authors: [{ name: post.author }],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: post.title,
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
            title: post.title,
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

/* --------------------------------------------------
 * Generate metadata for the blog index page
 * -------------------------------------------------- */

export function generateBlogIndexMetadata(page?: number): Metadata {
    const title = page && page > 1
        ? `Blog - Página ${page} | ${SITE_NAME}`
        : `Blog | ${SITE_NAME}`;

    const description = 'Artículos, guías y recursos sobre comercio exterior, aduanas, importaciones y exportaciones en Perú.';

    return {
        title,
        description,
        alternates: {
            canonical: page && page > 1
                ? `${SITE_URL}/blog/?page=${page}`
                : `${SITE_URL}/blog/`,
        },
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/blog/`,
            siteName: SITE_NAME,
            locale: 'es_PE',
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

/* --------------------------------------------------
 * JSON-LD Structured Data for a blog post
 * -------------------------------------------------- */

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

/* --------------------------------------------------
 * JSON-LD BreadcrumbList for a blog post
 * -------------------------------------------------- */

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

/* --------------------------------------------------
 * JSON-LD for Blog index (CollectionPage)
 * -------------------------------------------------- */

export function generateBlogIndexJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `Blog - ${SITE_NAME}`,
        description: 'Artículos sobre comercio exterior, aduanas, importaciones y exportaciones en Perú.',
        url: `${SITE_URL}/blog/`,
        isPartOf: {
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
        },
    };
}
