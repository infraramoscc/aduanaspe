/**
 * Blog Index Page
 * Lists all blog posts with filtering and pagination
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_CATEGORIES, type BlogCategory } from '@/lib/blog/types';
import { getPaginatedPosts, getCategoriesWithCount } from '@/lib/blog';
import { generateBlogIndexMetadata, generateBlogIndexJsonLd } from '@/lib/blog/seo';
import { Container } from '@/components/layout/Container';
import { PostCard } from '@/components/blog';

function getCategoryFromParams(value?: string): BlogCategory | undefined {
    if (!value) return undefined;
    return BLOG_CATEGORIES.find((category) => category === value);
}

function buildBlogHref(page?: number, category?: string) {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (page && page > 1) params.set('page', String(page));
    const query = params.toString();
    return query ? `/blog?${query}` : '/blog';
}

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; category?: string }>;
}): Promise<Metadata> {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const category = getCategoryFromParams(params.category);
    return generateBlogIndexMetadata(page, category);
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; category?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const activeCategory = getCategoryFromParams(params.category);

    const [{ posts, total, totalPages, hasNext, hasPrev, page: safePage }, categories] = await Promise.all([
        getPaginatedPosts(page, activeCategory),
        getCategoriesWithCount(),
    ]);

    const jsonLd = generateBlogIndexJsonLd(activeCategory);
    const featuredPost = safePage === 1 && !activeCategory ? posts[0] : null;
    const remainingPosts = featuredPost ? posts.slice(1) : posts;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.94),rgba(252,252,250,0.98))] py-20">
                <Container>
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="section-badge">Blog</span>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                            Artículos sobre <span className="gradient-text">comercio exterior</span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                            Guías, explicaciones y recursos para entender mejor aduanas, importaciones, exportaciones y logística internacional.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
                            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                                {total} artículos {activeCategory ? `en ${activeCategory}` : 'publicados'}
                            </span>
                            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                                {categories.length} categorías
                            </span>
                        </div>
                    </div>
                </Container>
            </section>

            {categories.length > 0 && (
                <section className="border-b border-slate-200 bg-white">
                    <Container>
                        <div className="flex items-center gap-3 overflow-x-auto py-4">
                            <Link
                                href={buildBlogHref()}
                                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${!activeCategory
                                    ? 'bg-slate-950 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                Todos
                            </Link>
                            {categories.map(({ category, count }) => (
                                <Link
                                    key={category}
                                    href={buildBlogHref(1, category)}
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${activeCategory === category
                                        ? 'bg-slate-950 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    {category} ({count})
                                </Link>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            <section className="py-16">
                <Container>
                    {activeCategory && (
                        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-slate-200 bg-slate-50 px-6 py-5">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                    Filtro activo
                                </p>
                                <p className="mt-2 text-lg font-semibold text-slate-950">
                                    {activeCategory}
                                </p>
                            </div>
                            <Link
                                href="/blog"
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-all hover:border-slate-400 hover:bg-slate-100"
                            >
                                Limpiar filtro
                            </Link>
                        </div>
                    )}

                    {posts.length > 0 ? (
                        <>
                            {featuredPost && (
                                <div className="mb-8">
                                    <PostCard post={featuredPost} featured />
                                </div>
                            )}

                            {remainingPosts.length > 0 && (
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {remainingPosts.map((post) => (
                                        <PostCard key={post.slug} post={post} />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-16 text-center">
                            <h2 className="text-2xl font-bold text-slate-900">
                                No encontramos artículos para esta categoría
                            </h2>
                            <p className="mt-3 text-slate-600">
                                Prueba con otra categoría o vuelve al listado general del blog.
                            </p>
                            <Link
                                href="/blog"
                                className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-100"
                            >
                                Ver todos los artículos
                            </Link>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <nav className="mt-12 flex items-center justify-center gap-4" aria-label="Paginación">
                            {hasPrev && (
                                <Link
                                    href={buildBlogHref(safePage - 1, activeCategory)}
                                    className="rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-100"
                                >
                                    Anterior
                                </Link>
                            )}

                            <span className="text-sm text-slate-500">
                                Página {safePage} de {totalPages}
                            </span>

                            {hasNext && (
                                <Link
                                    href={buildBlogHref(safePage + 1, activeCategory)}
                                    className="rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition-all hover:bg-slate-800"
                                >
                                    Siguiente
                                </Link>
                            )}
                        </nav>
                    )}
                </Container>
            </section>
        </>
    );
}
