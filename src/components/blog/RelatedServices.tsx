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
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Servicios relacionados
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-950">
                Opciones cercanas a este tema
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
                Si este articulo describe una necesidad real, estas lineas de servicio son las mas cercanas.
            </p>

            <div className="mt-5 space-y-3">
                {allServices.map((service, idx) => (
                    <Link
                        key={service!.slug}
                        href={`/servicios/${service!.slug}`}
                        className={`block rounded-[22px] border p-4 transition-[transform,box-shadow,border-color,background-color,color] duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4 ${idx === 0
                            ? 'border-slate-300 bg-slate-50'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <span
                                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg"
                                aria-hidden="true"
                            >
                                {service!.icon}
                            </span>
                            <div>
                                <h4 className="text-sm font-bold text-slate-950">
                                    {service!.title}
                                </h4>
                                <p className="mt-1 text-xs leading-6 text-slate-600">
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
