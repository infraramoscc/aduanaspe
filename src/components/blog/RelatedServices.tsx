/**
 * Related Services Sidebar Component
 * Shows services related to the blog post topic
 */

import Link from 'next/link';
import { getServiceBySlug } from '@/content/services';
import { getTopicMapping } from '@/lib/blog/topics';
import type { BlogTopic } from '@/lib/blog/types';

export function RelatedServices({ topic }: { topic: BlogTopic }) {
    const mapping = getTopicMapping(topic);
    if (!mapping) return null;

    const allServiceSlugs = [mapping.primaryService, ...mapping.secondaryServices];
    const allServices = allServiceSlugs
        .map((slug) => getServiceBySlug(slug))
        .filter(Boolean);

    if (allServices.length === 0) return null;

    return (
        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Servicios relacionados
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-950">
                Opciones que acompañan este tema
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
                Si este artículo describe una necesidad real, estas líneas de servicio son las más cercanas.
            </p>

            <div className="mt-5 space-y-3">
                {allServices.map((service, idx) => (
                    <Link
                        key={service!.slug}
                        href={`/servicios/${service!.slug}`}
                        className={`block rounded-2xl border p-4 transition-[transform,box-shadow,border-color,background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4 hover:-translate-y-0.5 hover:shadow-sm ${idx === 0
                            ? 'border-slate-900 bg-slate-950 text-white'
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <span
                                className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-lg ${idx === 0
                                    ? 'border-white/15 bg-white/10'
                                    : 'border-slate-200 bg-white'
                                    }`}
                            >
                                {service!.icon}
                            </span>
                            <div>
                                <h4 className={`text-sm font-bold ${idx === 0 ? 'text-white' : 'text-slate-950'}`}>
                                    {service!.title}
                                </h4>
                                <p className={`mt-1 text-xs leading-6 ${idx === 0 ? 'text-slate-300' : 'text-slate-600'}`}>
                                    {service!.summary}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
