/**
 * Blog System - MDX Content Reader
 * Reads and parses MDX files from the local file system
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogFrontmatter, BlogPostCard } from './types';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

/**
 * Get all MDX post slugs from the content directory.
 */
export function getMdxSlugs(): string[] {
    if (!fs.existsSync(BLOG_DIR)) return [];

    return fs
        .readdirSync(BLOG_DIR)
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.replace(/\.mdx$/, ''));
}

/**
 * Read and parse a single MDX file's frontmatter (no rendering).
 */
export function getMdxPostBySlug(slug: string): BlogPostCard | null {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as BlogFrontmatter;

    if (frontmatter.draft) return null;

    const stats = readingTime(content);

    return {
        slug,
        source: 'mdx',
        title: frontmatter.title,
        description: frontmatter.description,
        date: frontmatter.date,
        updatedAt: frontmatter.updatedAt,
        author: frontmatter.author ?? 'AduanasPE',
        category: frontmatter.category,
        topic: frontmatter.topic,
        tags: frontmatter.tags ?? [],
        image: frontmatter.image,
        imageAlt: frontmatter.imageAlt,
        featured: frontmatter.featured ?? false,
        readingTime: stats.text.replace('read', 'lectura'),
    };
}

/**
 * Get all MDX posts sorted by date (newest first).
 */
export function getAllMdxPosts(): BlogPostCard[] {
    const slugs = getMdxSlugs();

    return slugs
        .map((slug) => getMdxPostBySlug(slug))
        .filter((post): post is BlogPostCard => post !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get the raw MDX content (for rendering in the page).
 */
export function getMdxRawContent(slug: string): string | null {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContents);
    return content;
}
