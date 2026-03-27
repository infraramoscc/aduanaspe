'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import type { BlogCategory, BlogPostCard } from '@/lib/blog/types';
import { PostCard } from './PostCard';

interface BlogSearchProps {
    posts: BlogPostCard[];
    activeCategory?: BlogCategory;
}

function normalize(value: string) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export function BlogSearch({ posts, activeCategory }: BlogSearchProps) {
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
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Buscar articulos
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-950">
                            Filtra por texto dentro de la categoria activa
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                            La busqueda respeta la categoria seleccionada y revisa titulo, descripcion, tags y categoria.
                        </p>
                    </div>

                    <div className="w-full max-w-xl">
                        <label htmlFor="blog-search" className="sr-only">
                            Buscar articulos del blog
                        </label>
                        <input
                            id="blog-search"
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar por tema, palabra clave o categoria..."
                            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-slate-200/70"
                        />
                    </div>
                </div>
            </section>

            <section className="mt-8">
                <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {deferredQuery.trim() ? 'Resultados filtrados' : activeCategory ? 'Categoria activa' : 'Vista general'}
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
                    <div className="rounded-[28px] border border-slate-200 bg-slate-50 px-6 py-16 text-center">
                        <h3 className="text-2xl font-bold text-slate-900">
                            No encontramos coincidencias
                        </h3>
                        <p className="mt-3 text-slate-600">
                            Prueba con otra palabra clave o limpia la busqueda para volver al listado actual.
                        </p>
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-[border-color,background-color,color] hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                        >
                            Limpiar busqueda
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
