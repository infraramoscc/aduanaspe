/**
 * Blog Index Page
 * Lists all blog posts with filtering and pagination
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getPaginatedPosts, getCategoriesWithCount } from '@/lib/blog';
import { generateBlogIndexMetadata, generateBlogIndexJsonLd } from '@/lib/blog/seo';
import { Container } from '@/components/layout/Container';
import { PostCard } from '@/components/blog';
import Link from 'next/link';

export const metadata: Metadata = generateBlogIndexMetadata();

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; category?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;

    const [{ posts, totalPages, hasNext, hasPrev }, categories] = await Promise.all([
        getPaginatedPosts(page),
        getCategoriesWithCount(),
    ]);

    const jsonLd = generateBlogIndexJsonLd();

    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero */}
            <section className="relative py-20 overflow-hidden">
                {/* Background orbs */}
                <div className="gradient-orb orb-purple w-96 h-96 -top-48 -right-48 opacity-20" />
                <div className="gradient-orb orb-pink w-72 h-72 -bottom-36 -left-36 opacity-20" />

                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="section-badge">📝 Blog</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-heading)] mt-4 mb-4">
                            Artículos sobre{' '}
                            <span className="gradient-text">Comercio Exterior</span>
                        </h1>
                        <p className="text-lg text-[var(--text-body)]">
                            Guías, tutoriales y recursos actualizados sobre aduanas,
                            importaciones, exportaciones y logística internacional en Perú.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Categories filter */}
            {categories.length > 0 && (
                <section className="border-b border-gray-100">
                    <Container>
                        <div className="flex items-center gap-3 py-4 overflow-x-auto scrollbar-hide">
                            <Link
                                href="/blog"
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${!params.category
                                        ? 'bg-[var(--purple)] text-white shadow-md'
                                        : 'bg-gray-100 text-[var(--text-body)] hover:bg-[var(--purple-light)] hover:text-[var(--purple)]'
                                    }`}
                            >
                                Todos
                            </Link>
                            {categories.map(({ category, count }) => (
                                <Link
                                    key={category}
                                    href={`/blog?category=${encodeURIComponent(category)}`}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${params.category === category
                                            ? 'bg-[var(--purple)] text-white shadow-md'
                                            : 'bg-gray-100 text-[var(--text-body)] hover:bg-[var(--purple-light)] hover:text-[var(--purple)]'
                                        }`}
                                >
                                    {category} ({count})
                                </Link>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Posts Grid */}
            <section className="py-16">
                <Container>
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, idx) => (
                                <PostCard
                                    key={post.slug}
                                    post={post}
                                    featured={idx === 0 && page === 1}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📭</div>
                            <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-2">
                                No hay artículos todavía
                            </h2>
                            <p className="text-[var(--text-muted)]">
                                Pronto publicaremos contenido. ¡Vuelve pronto!
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <nav
                            className="flex items-center justify-center gap-4 mt-12"
                            aria-label="Paginación"
                        >
                            {hasPrev && (
                                <Link
                                    href={`/blog?page=${page - 1}`}
                                    className="px-6 py-3 rounded-full bg-white border-2 border-gray-200 text-[var(--text-body)] font-semibold hover:border-[var(--purple)] hover:text-[var(--purple)] transition-all"
                                >
                                    ← Anterior
                                </Link>
                            )}

                            <span className="text-sm text-[var(--text-muted)]">
                                Página {page} de {totalPages}
                            </span>

                            {hasNext && (
                                <Link
                                    href={`/blog?page=${page + 1}`}
                                    className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                                >
                                    Siguiente →
                                </Link>
                            )}
                        </nav>
                    )}
                </Container>
            </section>
        </>
    );
}
