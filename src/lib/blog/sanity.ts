/**
 * Blog System - Sanity Client
 * Fetches blog posts from Sanity CMS
 */

import { createClient, type SanityClient } from '@sanity/client';
import type { BlogPostCard, BlogTopic, BlogCategory } from './types';

/* --------------------------------------------------
 * Sanity Client Setup (lazy initialization)
 * -------------------------------------------------- */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-01-01';

let _client: SanityClient | null = null;

function getSanityClient(): SanityClient | null {
    if (!projectId) return null;
    if (!_client) {
        _client = createClient({
            projectId,
            dataset,
            apiVersion,
            useCdn: process.env.NODE_ENV === 'production',
        });
    }
    return _client;
}

/* --------------------------------------------------
 * Check if Sanity is configured
 * -------------------------------------------------- */

export function isSanityConfigured(): boolean {
    return Boolean(projectId);
}

/* --------------------------------------------------
 * GROQ Queries
 * -------------------------------------------------- */

const POST_FIELDS = `
    "slug": slug.current,
    title,
    description,
    "date": publishedAt,
    "updatedAt": _updatedAt,
    "author": author->name,
    category,
    topic,
    tags,
    "image": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    featured,
`;

/* --------------------------------------------------
 * Fetch Functions
 * -------------------------------------------------- */

/**
 * Get all published posts from Sanity.
 */
export async function getSanityPosts(): Promise<BlogPostCard[]> {
    if (!isSanityConfigured()) return [];

    try {
        const client = getSanityClient();
        if (!client) return [];

        const posts = await client.fetch<SanityRawPost[]>(
            `*[_type == "post" && !draft] | order(publishedAt desc) {
                ${POST_FIELDS}
            }`,
        );

        return posts.map(mapSanityToPost);
    } catch (error) {
        console.error('[Sanity] Failed to fetch posts:', error);
        return [];
    }
}

/**
 * Get a single post by slug from Sanity.
 */
export async function getSanityPostBySlug(slug: string): Promise<BlogPostCard | null> {
    if (!isSanityConfigured()) return null;

    try {
        const client = getSanityClient();
        if (!client) return null;

        const post = await client.fetch<SanityRawPost | null>(
            `*[_type == "post" && slug.current == $slug && !draft][0] {
                ${POST_FIELDS}
                body
            }`,
            { slug },
        );

        if (!post) return null;
        return mapSanityToPost(post);
    } catch (error) {
        console.error('[Sanity] Failed to fetch post:', slug, error);
        return null;
    }
}

/**
 * Get all slugs from Sanity (for generateStaticParams).
 */
export async function getSanitySlugs(): Promise<string[]> {
    if (!isSanityConfigured()) return [];

    try {
        const client = getSanityClient();
        if (!client) return [];

        const slugs = await client.fetch<string[]>(
            `*[_type == "post" && !draft].slug.current`,
        );
        return slugs;
    } catch (error) {
        console.error('[Sanity] Failed to fetch slugs:', error);
        return [];
    }
}

/**
 * Get Sanity post body (Portable Text) for rendering.
 */
export async function getSanityPostBody(slug: string): Promise<unknown[] | null> {
    if (!isSanityConfigured()) return null;

    try {
        const client = getSanityClient();
        if (!client) return null;

        const result = await client.fetch<{ body: unknown[] } | null>(
            `*[_type == "post" && slug.current == $slug && !draft][0] { body }`,
            { slug },
        );
        return result?.body ?? null;
    } catch (error) {
        console.error('[Sanity] Failed to fetch post body:', slug, error);
        return null;
    }
}

/* --------------------------------------------------
 * Internal Types & Helpers
 * -------------------------------------------------- */

interface SanityRawPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    updatedAt?: string;
    author?: string;
    category?: BlogCategory;
    topic?: BlogTopic;
    tags?: string[];
    image?: string;
    imageAlt?: string;
    featured?: boolean;
    body?: unknown[];
}

function mapSanityToPost(raw: SanityRawPost): BlogPostCard {
    return {
        slug: raw.slug,
        source: 'sanity',
        title: raw.title,
        description: raw.description ?? '',
        date: raw.date,
        updatedAt: raw.updatedAt,
        author: raw.author ?? 'AduanasPE',
        category: raw.category ?? 'Comercio Exterior',
        topic: raw.topic ?? 'comercio-exterior',
        tags: raw.tags ?? [],
        image: raw.image,
        imageAlt: raw.imageAlt,
        featured: raw.featured ?? false,
        readingTime: '5 min lectura', // Sanity doesn't compute this easily
    };
}
