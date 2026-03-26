import Link from 'next/link';
import type { BlogCategory } from '@/lib/blog/types';

interface BlogFilterBarProps {
    activeCategory?: BlogCategory;
    categories: Array<{ category: BlogCategory; count: number }>;
    buildHref: (page?: number, category?: string) => string;
}

export function BlogFilterBar({ activeCategory, categories, buildHref }: BlogFilterBarProps) {
    return (
        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Explora por categoria
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-950">
                        Filtra el blog sin perder contexto
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        Usa las categorias para acotar el listado y encontrar articulos mas rapido.
                    </p>
                </div>

                {activeCategory && (
                    <Link
                        href={buildHref()}
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition-[border-color,background-color,color] hover:border-slate-400 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                    >
                        Limpiar filtro
                    </Link>
                )}
            </div>

            <div className="mt-5 flex items-center gap-3 overflow-x-auto pb-1">
                <Link
                    href={buildHref()}
                    className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition-[border-color,background-color,color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4 ${!activeCategory
                        ? 'border-slate-950 bg-slate-950 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
                        }`}
                >
                    <span>Todos</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${!activeCategory ? 'bg-white/15 text-white' : 'bg-white text-slate-600'}`}>
                        {categories.reduce((sum, item) => sum + item.count, 0)}
                    </span>
                </Link>

                {categories.map(({ category, count }) => {
                    const isActive = activeCategory === category;

                    return (
                        <Link
                            key={category}
                            href={buildHref(1, category)}
                            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition-[border-color,background-color,color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4 ${isActive
                                ? 'border-slate-950 bg-slate-950 text-white'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
                                }`}
                        >
                            <span>{category}</span>
                            <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-white/15 text-white' : 'bg-white text-slate-600'}`}>
                                {count}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
