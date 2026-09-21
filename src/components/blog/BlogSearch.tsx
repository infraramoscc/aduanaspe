'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { BlogCategory, BlogPostCard } from '@/lib/blog/types';
import { PostCard } from './PostCard';
import { Container } from '@/components/layout/Container';

interface BlogSearchProps {
    posts: BlogPostCard[];
    activeCategory?: BlogCategory;
    heroContent?: ReactNode;
    children?: ReactNode;
}

function normalize(value: string) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export function BlogSearch({ posts, activeCategory, heroContent, children }: BlogSearchProps) {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);

    const filteredPosts = useMemo(() => {
        const needle = normalize(deferredQuery.trim());
        if (!needle) return posts;

        return posts.filter((post) => {
            const haystack = normalize(
                [post.title, post.description, post.category, ...post.tags].join(' ')
            );

            return haystack.includes(needle);
        });
    }, [deferredQuery, posts]);

    const featuredPost = !deferredQuery.trim() && !activeCategory
        ? filteredPosts.find((post) => post.featured) ?? filteredPosts[0]
        : null;
    const remainingPosts = featuredPost
        ? filteredPosts.filter((post) => post.slug !== featuredPost.slug)
        : filteredPosts;

    return (
        <div>
            {heroContent ? (
                <section className="relative overflow-hidden border-b border-[var(--home-border-soft)] bg-gradient-to-b from-[#F3F0E7] to-white pb-14 pt-16 md:pb-20 md:pt-24">
                    <Container>
                        <div className="flex flex-col items-center">
                            {/* Hero Text */}
                            <div className="w-full">{heroContent}</div>
                            
                            {/* Massive Search Console */}
                            <div className="mt-12 w-full max-w-4xl rounded-[2rem] bg-[#1E1B4B] p-8 shadow-2xl md:p-12 border border-[#3C3794]">
                                <label htmlFor="blog-search" className="sr-only">
                                    Buscar articulos del blog
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none text-slate-400 group-focus-within:text-[#3C3794] transition-colors">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="blog-search"
                                        name="blog-search"
                                        type="search"
                                        autoComplete="off"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Ej. certificado de origen, Digesa, carta fianza..."
                                        className="w-full rounded-full border border-white/20 bg-white py-6 pl-16 pr-8 text-xl text-slate-900 shadow-inner placeholder:text-slate-400 transition-all focus:border-[#3C3794] focus:outline-none focus:ring-4 focus:ring-[#3C3794]/40"
                                    />
                                    {query && (
                                        <button
                                            type="button"
                                            onClick={() => setQuery('')}
                                            className="absolute inset-y-0 right-4 flex items-center p-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                                            aria-label="Limpiar búsqueda"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <p className="mt-5 text-center text-sm font-medium text-emerald-300">
                                    Busca entre todos nuestros artículos técnicos y guías operativas.
                                </p>
                            </div>
                        </div>
                    </Container>
                </section>
            ) : (
                <section className="rounded-[1.5rem] border border-[var(--home-border-soft)] bg-white p-8 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Buscador editorial
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-950">
                                Busca por producto, trámite o documento
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                                La búsqueda respeta la categoría activa y revisa título, descripción, etiquetas y tema.
                            </p>
                        </div>

                        <div className="w-full max-w-xl">
                            <label htmlFor="blog-search" className="sr-only">
                                Buscar articulos del blog
                            </label>
                            <input
                                id="blog-search"
                                name="blog-search"
                                type="search"
                                autoComplete="off"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ejemplo: rotulado, DIGESA, tributos…"
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 transition-all focus:border-[#3C3794] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#3C3794]/20"
                            />
                        </div>
                    </div>
                </section>
            )}

            {children && (
                <section className="py-8">
                    <Container>{children}</Container>
                </section>
            )}

            <section className={heroContent ? "pb-16" : "mt-8"}>
                <Container>
                    <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
                        <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {deferredQuery.trim() ? 'Resultados filtrados' : activeCategory ? 'Categoría activa' : 'Lecturas recomendadas'}
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-950">
                            {deferredQuery.trim()
                                ? `Coincidencias para "${deferredQuery.trim()}"`
                                : activeCategory ?? 'Todos los articulos'}
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                            {filteredPosts.length} resultado{filteredPosts.length === 1 ? '' : 's'}
                            {activeCategory ? ` dentro de ${activeCategory}.` : '.'}
                        </p>
                    </div>

                    {deferredQuery.trim() && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-[border-color,background-color,color] hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                        >
                            Limpiar busqueda
                        </button>
                    )}
                </div>

                {filteredPosts.length > 0 ? (
                    <>
                        {featuredPost && (
                            <div className="mb-8">
                                <PostCard post={featuredPost} featured />
                            </div>
                        )}

                        {remainingPosts.length > 0 && (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {remainingPosts.map((post) => (
                                    <PostCard key={post.slug} post={post} />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="rounded-[1.5rem] border border-[var(--home-border-soft)] bg-white p-12 text-center shadow-md">
                        <h3 className="text-2xl font-bold text-slate-900">
                            No encontramos coincidencias
                        </h3>
                        <p className="mt-3 text-slate-600">
                            Prueba con otra palabra clave o limpia la busqueda para volver al listado actual.
                        </p>
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#3C3794] px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#2F2B77] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                        >
                            Limpiar busqueda
                        </button>
                        </div>
                    )}
                </Container>
            </section>
        </div>
    );
}
