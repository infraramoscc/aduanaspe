/**
 * Blog System - Unified API
 * Merges MDX and Sanity posts into a single API
 */

import { getAllMdxPosts, getMdxPostBySlug, getMdxSlugs } from './mdx';
import { getSanityPosts, getSanityPostBySlug, getSanitySlugs } from './sanity';
import type { BlogPostCard, BlogCategory, BlogTopic } from './types';

const POSTS_PER_PAGE = 9;

/* --------------------------------------------------
 * Get all posts from both sources
 * -------------------------------------------------- */

export async function getAllPosts(): Promise<BlogPostCard[]> {
    const [mdxPosts, sanityPosts] = await Promise.all([
        getAllMdxPosts(),
        getSanityPosts(),
    ]);

    const all = [...mdxPosts, ...sanityPosts];

    // De-duplicate by slug (MDX takes priority)
    const slugSet = new Set<string>();
    const unique: BlogPostCard[] = [];

    for (const post of all) {
        if (!slugSet.has(post.slug)) {
            slugSet.add(post.slug);
            unique.push(post);
        }
    }

    return unique.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

/* --------------------------------------------------
 * Get posts with pagination
 * -------------------------------------------------- */

export interface PaginatedPosts {
    posts: BlogPostCard[];
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export async function getPaginatedPosts(
    page: number = 1,
    category?: BlogCategory,
    topic?: BlogTopic,
): Promise<PaginatedPosts> {
    let posts = await getAllPosts();

    if (category) {
        posts = posts.filter((p) => p.category === category);
    }

    if (topic) {
        posts = posts.filter((p) => p.topic === topic);
    }

    const total = posts.length;
    const totalPages = Math.ceil(total / POSTS_PER_PAGE);
    const safePage = Math.max(1, Math.min(page, totalPages || 1));
    const start = (safePage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    return {
        posts: posts.slice(start, end),
        total,
        page: safePage,
        totalPages,
        hasNext: safePage < totalPages,
        hasPrev: safePage > 1,
    };
}

/* --------------------------------------------------
 * Get a single post
 * -------------------------------------------------- */

export async function getPostBySlug(slug: string): Promise<BlogPostCard | null> {
    // Try MDX first (local takes priority)
    const mdxPost = getMdxPostBySlug(slug);
    if (mdxPost) return mdxPost;

    // Then try Sanity
    const sanityPost = await getSanityPostBySlug(slug);
    return sanityPost;
}

/* --------------------------------------------------
 * Get all slugs (for generateStaticParams)
 * -------------------------------------------------- */

export async function getAllSlugs(): Promise<string[]> {
    const [mdxSlugs, sanitySlugs] = await Promise.all([
        getMdxSlugs(),
        getSanitySlugs(),
    ]);

    // De-duplicate
    return [...new Set([...mdxSlugs, ...sanitySlugs])];
}

/* --------------------------------------------------
 * Get related posts (same topic or category)
 * -------------------------------------------------- */

export async function getRelatedPosts(
    currentSlug: string,
    topic: BlogTopic,
    limit: number = 3,
): Promise<BlogPostCard[]> {
    const allPosts = await getAllPosts();

    return allPosts
        .filter((p) => p.slug !== currentSlug)
        .filter((p) => p.topic === topic || p.tags.some((t) => t === topic))
        .slice(0, limit);
}

/* --------------------------------------------------
 * Get featured posts
 * -------------------------------------------------- */

export async function getFeaturedPosts(limit: number = 3): Promise<BlogPostCard[]> {
    const allPosts = await getAllPosts();
    const featured = allPosts.filter((p) => p.featured);

    if (featured.length > 0) return featured.slice(0, limit);

    // Fallback to most recent
    return allPosts.slice(0, limit);
}

/* --------------------------------------------------
 * Get all categories with post count
 * -------------------------------------------------- */

export async function getCategoriesWithCount(): Promise<{ category: BlogCategory; count: number }[]> {
    const posts = await getAllPosts();
    const map = new Map<BlogCategory, number>();

    for (const post of posts) {
        map.set(post.category, (map.get(post.category) ?? 0) + 1);
    }

    return Array.from(map.entries())
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);
}

/* --------------------------------------------------
 * Get all tags with post count
 * -------------------------------------------------- */

export async function getTagsWithCount(): Promise<{ tag: string; count: number }[]> {
    const posts = await getAllPosts();
    const map = new Map<string, number>();

    for (const post of posts) {
        for (const tag of post.tags) {
            map.set(tag, (map.get(tag) ?? 0) + 1);
        }
    }

    return Array.from(map.entries())
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);
}
