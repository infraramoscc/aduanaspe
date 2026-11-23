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
import { BlogFilterBar, BlogSearch } from '@/components/blog';
import { GA4_EVENTS, TrackedLink } from '@/components/tracking';
import { IMPORT_FROM_CHINA_GUIDE } from '@/lib/routes';

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

    const jsonLd = generateBlogIndexJsonLd(safePage, activeCategory);
    const visibleCount = posts.length;
    const showImportGuide = safePage === 1 && (!activeCategory || activeCategory === 'Importación');

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <BlogSearch
                posts={posts}
                activeCategory={activeCategory}
                heroContent={
                    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                        <span className="section-badge">Biblioteca AduanasPE</span>
                        <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                            Guías claras para importar, exportar y decidir con menos riesgo
                        </h1>
                        <p className="mt-4 text-lg leading-8 text-slate-600">
                            Artículos prácticos sobre documentos, permisos, costos y decisiones operativas. Cada guía está pensada para ayudarte antes de pagar al proveedor, cotizar un servicio o mover tu carga.
                        </p>
                        {showImportGuide && (
                            <TrackedLink
                                href={IMPORT_FROM_CHINA_GUIDE.href}
                                eventName={GA4_EVENTS.NAV_CLICK}
                                eventParams={{ location: 'blog-hero', label: IMPORT_FROM_CHINA_GUIDE.label }}
                                className="mt-6 inline-flex w-full max-w-md items-center justify-between gap-4 rounded-2xl border border-indigo-200 bg-white px-5 py-4 text-left shadow-sm transition-colors hover:border-[var(--home-brand)] hover:bg-[var(--home-brand-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-brand)]"
                            >
                                <span>
                                    <strong className="block font-bold text-[var(--home-brand)]">{IMPORT_FROM_CHINA_GUIDE.label}</strong>
                                    <span className="mt-1 block text-sm text-slate-600">{IMPORT_FROM_CHINA_GUIDE.description}</span>
                                </span>
                                <span aria-hidden="true" className="shrink-0 text-xl text-[var(--home-brand)]">→</span>
                            </TrackedLink>
                        )}
                    </div>
                }
            >
                {categories.length > 0 && (
                    <BlogFilterBar
                        activeCategory={activeCategory}
                        categories={categories}
                        buildHref={buildBlogHref}
                    />
                )}
            </BlogSearch>
            {posts.length === 0 && (
                <section className="pb-16">
                    <Container>
                        <div className="rounded-[1.5rem] border border-[var(--home-border-soft)] bg-white p-12 text-center shadow-md">
                            <h2 className="text-2xl font-bold text-slate-900">
                                No encontramos articulos para esta categoria
                            </h2>
                            <p className="mt-3 text-slate-600">
                                Prueba con otra categoria o vuelve al listado general del blog.
                            </p>
                            <Link
                                href="/blog"
                                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#3C3794] px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#2F2B77] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                            >
                                Ver todos los articulos
                            </Link>
                        </div>
                    </Container>
                </section>
            )}

            {totalPages > 1 && (
                <section className="pb-16">
                    <Container>
                        <nav className="flex flex-col items-center justify-center gap-4 md:flex-row" aria-label="Paginacion">
                            {hasPrev && (
                                <Link
                                    href={buildBlogHref(safePage - 1, activeCategory)}
                                    className="rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-[border-color,background-color,color] hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                                >
                                    Anterior
                                </Link>
                            )}

                            <span className="text-sm text-slate-500">
                                Pagina {safePage} de {totalPages}
                            </span>

                            {hasNext && (
                                <Link
                                    href={buildBlogHref(safePage + 1, activeCategory)}
                                    className="rounded-full bg-[#3C3794] px-6 py-3 font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#2F2B77] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                                >
                                    Siguiente
                                </Link>
                            )}
                        </nav>
                    </Container>
                </section>
            )}
        </>
    );
}
