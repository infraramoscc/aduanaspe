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

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.99),rgba(248,250,252,0.96))] py-14 md:py-18">
                <Container>
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-end">
                        <div>
                            <span className="section-badge">Biblioteca AduanasPE</span>
                            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                                Guías claras para importar, exportar y decidir con menos riesgo
                            </h1>
                            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                                Artículos prácticos sobre documentos, permisos, costos y decisiones operativas. Cada guía está pensada para ayudarte antes de pagar al proveedor, cotizar un servicio o mover tu carga.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
                                {['Enfoque operativo', 'Fuentes normativas', 'Lectura para importadores'].map((item) => (
                                    <span key={item} className="rounded-full border border-slate-200 bg-white/85 px-4 py-2 shadow-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="service-card service-card-roomy service-blue">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Criterio editorial
                            </p>
                            <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-950">
                                Contenido para tomar decisiones, no solo para leer definiciones.
                            </h2>
                            <div className="mt-5 grid grid-cols-3 gap-3 lg:grid-cols-1 xl:grid-cols-3">
                            <div className="rounded-2xl border border-slate-200 bg-white/85 p-3 shadow-sm">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    Archivo
                                </p>
                                <p className="mt-2 text-2xl font-bold text-slate-950">
                                    {total}
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                    articulos publicados
                                </p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white/85 p-3 shadow-sm">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    Temas
                                </p>
                                <p className="mt-2 text-2xl font-bold text-slate-950">
                                    {categories.length}
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                    categorias activas
                                </p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white/85 p-3 shadow-sm">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    Selección
                                </p>
                                <p className="mt-2 text-2xl font-bold text-slate-950">
                                    {visibleCount}
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                    {activeCategory ? `resultados en ${activeCategory}` : 'resultados visibles'}
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {categories.length > 0 && (
                <section className="py-8">
                    <Container>
                        <BlogFilterBar
                            activeCategory={activeCategory}
                            categories={categories}
                            buildHref={buildBlogHref}
                        />
                    </Container>
                </section>
            )}

            <section className="pb-16">
                <Container>
                    {posts.length > 0 ? (
                        <BlogSearch posts={posts} activeCategory={activeCategory} />
                    ) : (
                        <div className="service-card service-card-spacious service-orange text-center">
                            <h2 className="text-2xl font-bold text-slate-900">
                                No encontramos articulos para esta categoria
                            </h2>
                            <p className="mt-3 text-slate-600">
                                Prueba con otra categoria o vuelve al listado general del blog.
                            </p>
                            <Link
                                href="/blog"
                                className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-[border-color,background-color,color] hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                            >
                                Ver todos los articulos
                            </Link>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <nav className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row" aria-label="Paginacion">
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
                                    className="rounded-full bg-[#172554] px-6 py-3 font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#1E3A5F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
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
