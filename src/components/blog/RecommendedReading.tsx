import Link from 'next/link';
import { getPostBySlug } from '@/lib/blog';

interface RecommendedReadingProps {
    title?: string;
    subtitle?: string;
    slugs: string[];
}

export async function RecommendedReading({
    title = 'Lecturas recomendadas',
    subtitle = 'Articulos que ayudan a tomar una mejor decision antes de avanzar con la operacion.',
    slugs,
}: RecommendedReadingProps) {
    const posts = (await Promise.all(slugs.map((slug) => getPostBySlug(slug))))
        .filter((post) => Boolean(post))
        .slice(0, 3);

    if (posts.length === 0) return null;

    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <span className="section-badge">Lecturas recomendadas</span>
                    <h2 className="mt-4 text-3xl font-bold text-slate-950">
                        {title}
                    </h2>
                    <p className="mt-3 text-lg leading-8 text-slate-600">
                        {subtitle}
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post!.slug}
                            href={`/blog/${post!.slug}`}
                            className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                        >
                            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                                {post!.category}
                            </span>
                            <h3 className="mt-4 text-xl font-bold leading-tight text-slate-950 group-hover:text-slate-800">
                                {post!.title}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                {post!.description}
                            </p>
                            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-transform group-hover:translate-x-1">
                                Leer articulo
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
