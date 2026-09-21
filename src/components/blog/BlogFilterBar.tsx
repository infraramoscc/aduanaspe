import Link from 'next/link';
import type { BlogCategory } from '@/lib/blog/types';

interface BlogFilterBarProps {
    activeCategory?: BlogCategory;
    categories: Array<{ category: BlogCategory; count: number }>;
    buildHref: (page?: number, category?: string) => string;
}

export function BlogFilterBar({ activeCategory, categories, buildHref }: BlogFilterBarProps) {
    return (
        <section className="flex flex-col items-center">
            {activeCategory && (
                <Link
                    href={buildHref()}
                    className="mb-6 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                >
                    Limpiar filtro actual
                </Link>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                    href={buildHref()}
                    className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition-[border-color,background-color,color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4 ${!activeCategory
                        ? 'border-[#3C3794] bg-[#3C3794] text-white'
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
                                ? 'border-[#3C3794] bg-[#3C3794] text-white'
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
