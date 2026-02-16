/**
 * Blog Post Page (Dynamic)
 * Renders individual blog posts from MDX or Sanity
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs, getRelatedPosts } from '@/lib/blog';
import { getMdxRawContent } from '@/lib/blog/mdx';
import { getSanityPostBody } from '@/lib/blog/sanity';
import {
    generateBlogPostMetadata,
    generateBlogPostJsonLd,
    generateBlogBreadcrumbJsonLd,
} from '@/lib/blog/seo';
import { getTopicMapping } from '@/lib/blog/topics';
import { Container } from '@/components/layout/Container';
import { PostCard, ServiceCTA, RelatedServices, InlineLeadForm } from '@/components/blog';
import { mdxComponents } from '@/components/blog/MdxComponents';
import { TopicIcon } from '@/components/blog/MdxEnhanced';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

/* --------------------------------------------------
 * ISR: Revalidate every 60 seconds (for Sanity updates)
 * -------------------------------------------------- */
export const revalidate = 60;

/* --------------------------------------------------
 * Generate Static Params (all slugs)
 * -------------------------------------------------- */
export async function generateStaticParams() {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

/* --------------------------------------------------
 * Generate Metadata
 * -------------------------------------------------- */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return {};
    return generateBlogPostMetadata(post);
}

/* --------------------------------------------------
 * Page Component
 * -------------------------------------------------- */
export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) notFound();

    const topicMapping = getTopicMapping(post.topic);
    const relatedPosts = await getRelatedPosts(slug, post.topic);

    // Get MDX raw content for rendering
    const rawContent = post.source === 'mdx' ? getMdxRawContent(slug) : null;

    // JSON-LD
    const articleJsonLd = generateBlogPostJsonLd(post);
    const breadcrumbJsonLd = generateBlogBreadcrumbJsonLd(post);

    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <article className="py-12 md:py-16">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            {/* Post Header */}
                            <header className="mb-10">
                                {/* Category & reading time */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="section-badge text-xs">
                                        {post.category}
                                    </span>
                                    <span className="text-sm text-[var(--text-muted)]">
                                        ⏱ {post.readingTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)] leading-tight mb-4">
                                    {post.title}
                                </h1>

                                {/* Description */}
                                <p className="text-lg text-[var(--text-body)] mb-6">
                                    {post.description}
                                </p>

                                {/* Author & date */}
                                <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] pb-6 border-b border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--text-heading)]">
                                            {post.author}
                                        </p>
                                        <time dateTime={post.date}>
                                            {formatDate(new Date(post.date))}
                                            {post.updatedAt && (
                                                <span className="ml-2">
                                                    (Actualizado: {formatDate(new Date(post.updatedAt))})
                                                </span>
                                            )}
                                        </time>
                                    </div>
                                </div>
                            </header>

                            {/* Topic Icon (replaces hero image) */}
                            <div className="mb-10 flex items-center gap-4">
                                <TopicIcon topic={post.topic} />
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--purple)' }}>
                                        {post.category}
                                    </span>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                        {post.tags.slice(0, 3).join(' · ')}
                                    </p>
                                </div>
                            </div>

                            {/* Post Body */}
                            <div className="prose prose-lg max-w-none" id="post-content">
                                {rawContent ? (
                                    <MDXRemote
                                        source={rawContent}
                                        components={mdxComponents}
                                        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                                    />
                                ) : (
                                    <p className="text-[var(--text-muted)] text-sm italic">
                                        Contenido pendiente de configuración.
                                    </p>
                                )}
                            </div>

                            {/* Mid-article CTA */}
                            <ServiceCTA topic={post.topic} position="inline" />

                            {/* Inline Form (for hot leads) */}
                            {topicMapping?.temperature === 'caliente' && (
                                <InlineLeadForm
                                    service={topicMapping.primaryService}
                                    topic={post.topic}
                                />
                            )}

                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="mt-10 pt-6 border-t border-gray-100">
                                    <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-3">
                                        Etiquetas:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs rounded-full bg-gray-100 text-[var(--text-body)] font-medium"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share buttons */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-3">
                                    Compartir:
                                </h3>
                                <div className="flex gap-3">
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=https://aduanaspe.com/blog/${post.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        LinkedIn
                                    </a>
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=https://aduanaspe.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
                                    >
                                        X (Twitter)
                                    </a>
                                    <a
                                        href={`https://wa.me/?text=${encodeURIComponent(post.title + ' https://aduanaspe.com/blog/' + post.slug)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-full bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                                    >
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-24 space-y-8">
                                {/* Related Services */}
                                <RelatedServices topic={post.topic} />

                                {/* Sidebar CTA */}
                                <ServiceCTA topic={post.topic} position="sidebar" />
                            </div>
                        </aside>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-16 pt-12 border-t border-gray-100">
                            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-8">
                                Artículos Relacionados
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedPosts.map((rp) => (
                                    <PostCard key={rp.slug} post={rp} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Back to blog */}
                    <div className="text-center mt-12">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-[var(--purple)] font-semibold hover:gap-3 transition-all"
                        >
                            ← Volver al Blog
                        </Link>
                    </div>
                </Container>
            </article>
        </>
    );
}
