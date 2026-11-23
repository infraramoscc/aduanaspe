/**
 * Blog Post Page (Dynamic)
 * Renders individual blog posts from MDX or Sanity
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllSlugs, getRelatedPosts } from '@/lib/blog';
import { getMdxRawContent } from '@/lib/blog/mdx';
import { hasServiceCtaOutsideFencedCode } from '@/lib/blog/mdx-content.mjs';
import {
    generateBlogPostMetadata,
    generateBlogPostJsonLd,
    generateBlogBreadcrumbJsonLd,
} from '@/lib/blog/seo';
import { Container } from '@/components/layout/Container';
import {
    ArticleToc,
    PostCard,
    ServiceCTA,
} from '@/components/blog';
import { mdxComponents, slugifyHeading } from '@/components/blog/MdxComponents';
import { formatDate } from '@/lib/utils';

interface ArticleHeading {
    id: string;
    label: string;
    level: 2 | 3;
}

function cleanHeadingText(value: string) {
    return value
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/[`*_~]/g, '')
        .replace(/<[^>]+>/g, '')
        .trim();
}

function extractHeadings(rawContent: string | null): ArticleHeading[] {
    if (!rawContent) return [];

    const headings: ArticleHeading[] = [];
    let inCodeBlock = false;

    for (const line of rawContent.split('\n')) {
        const trimmed = line.trim();

        if (trimmed.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }

        if (inCodeBlock) continue;

        const match = /^(##|###)\s+(.+)$/.exec(trimmed);
        if (!match) continue;

        const label = cleanHeadingText(match[2]);
        if (!label) continue;

        headings.push({
            id: slugifyHeading(label) || 'seccion',
            label,
            level: match[1] === '##' ? 2 : 3,
        });
    }

    return headings;
}

export async function generateStaticParams() {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

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

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) notFound();

    const relatedPosts = await getRelatedPosts(slug, post.topic);
    const rawContent = post.source === 'mdx' ? getMdxRawContent(slug) : null;
    const articleHeadings = extractHeadings(rawContent);
    const hasInlineServiceCta = hasServiceCtaOutsideFencedCode(rawContent);

    const articleJsonLd = generateBlogPostJsonLd(post);
    const breadcrumbJsonLd = generateBlogBreadcrumbJsonLd(post);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <article className="bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_26%),linear-gradient(90deg,rgba(248,250,252,0.96)_0%,rgba(255,255,255,1)_18%,rgba(255,255,255,1)_82%,rgba(248,250,252,0.96)_100%)] py-12 md:py-16">
                <Container size="xl">
                    <div className="mx-auto max-w-4xl">

                        <div className="min-w-0 lg:rounded-[36px] lg:bg-white lg:px-10 lg:py-8 lg:shadow-[0_24px_80px_-48px_rgba(15,23,42,0.28)] xl:px-12 xl:py-10">
                            <div className="mb-6">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                    Volver al blog
                                </Link>
                            </div>

                            <header className="mb-10 max-w-[82ch] border-b border-slate-200 pb-10">
                                <div className="mb-5 flex flex-wrap items-center gap-3">
                                    <span className="section-badge text-xs">
                                        {post.category}
                                    </span>
                                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                                        {post.readingTime}
                                    </span>
                                </div>

                                <h1 className="text-balance text-3xl font-bold leading-tight text-slate-950 md:text-4xl lg:text-5xl">
                                    {post.title}
                                </h1>

                                <p className="mt-4 max-w-[62ch] text-pretty text-lg leading-8 text-slate-600">
                                    {post.intro ?? post.description}
                                </p>

                                <div className="mt-8 grid gap-5 rounded-[28px] border border-slate-200 bg-slate-50/80 p-5 md:grid-cols-[auto,1fr] md:items-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3C3794] text-sm font-bold text-white shadow-sm">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-950">
                                            {post.author}
                                        </p>
                                        <time dateTime={post.date} className="text-sm text-slate-500">
                                            {formatDate(post.date)}
                                            {post.updatedAt && (
                                                <span className="ml-2">
                                                    (Actualizado: {formatDate(post.updatedAt)})
                                                </span>
                                            )}
                                        </time>
                                    </div>
                                </div>

                            </header>

                            <div className="mb-8 max-w-[82ch]">
                                <ArticleToc headings={articleHeadings} compact />
                            </div>

                            <div className="prose prose-lg max-w-[82ch]" id="post-content">
                                {rawContent ? (
                                    <MDXRemote
                                        source={rawContent}
                                        components={mdxComponents}
                                        options={{
                                            parseFrontmatter: false,
                                            mdxOptions: {
                                                format: 'mdx',
                                                remarkPlugins: [remarkGfm],
                                            },
                                        }}
                                    />
                                ) : (
                                    <p className="text-sm italic text-slate-500">
                                        El contenido de este articulo aun no esta disponible en el render del blog.
                                    </p>
                                )}
                            </div>

                            {post.tags.length > 0 && (
                                <div className="mt-10 max-w-[82ch] border-t border-slate-200 pt-6">
                                    <h3 className="mb-3 text-sm font-semibold text-slate-500">
                                        Etiquetas:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!post.hideDefaultLeadCtas && (
                                <div className="mt-12 rounded-[2rem] bg-[#1E1B4B] p-8 text-center shadow-2xl md:p-12 border border-[#3C3794] max-w-[82ch]">
                                    <h2 className="text-2xl font-bold text-white md:text-3xl">
                                        ¿Te abruma la gestión documentaria?
                                    </h2>
                                    <p className="mt-4 text-lg text-slate-300">
                                        Déjanos tu caso. Nuestros sectoristas se encargarán de evaluar tu operación y realizar los trámites por ti.
                                    </p>
                                    <Link
                                        href="/contacto"
                                        className="mt-8 inline-flex items-center justify-center rounded-full bg-emerald-400 px-8 py-4 text-base font-bold text-slate-900 shadow-lg transition-transform hover:-translate-y-1 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/30"
                                    >
                                        Cotizar mi operación ahora
                                    </Link>
                                </div>
                            )}

                            {!post.hideDefaultLeadCtas && !hasInlineServiceCta && (
                                <div className="mt-10 max-w-[82ch] border-t border-slate-200 pt-6">
                                    <ServiceCTA topic={post.topic} position="footer" />
                                </div>
                            )}

                        </div>
                    </div>

                    {relatedPosts.length > 0 && (
                        <section className="mt-16 border-t border-slate-200 pt-12">
                            <h2 className="mb-8 text-2xl font-bold text-slate-950">
                                Articulos relacionados
                            </h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                {relatedPosts.map((relatedPost) => (
                                    <PostCard key={relatedPost.slug} post={relatedPost} />
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-slate-200 pt-8 text-center sm:flex-row">
                        <a
                            href="#post-content"
                            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-[border-color,background-color,color] hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                        >
                            Volver arriba
                        </a>
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center rounded-full bg-[#3C3794] px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#2F2B77] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                        >
                            Ver mas articulos
                        </Link>
                    </div>
                </Container>
            </article>
        </>
    );
}
