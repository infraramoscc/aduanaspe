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
        <aside className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-heading)]">
                Servicios Relacionados
            </h3>

            {allServices.map((service, idx) => (
                <Link
                    key={service!.slug}
                    href={`/servicios/${service!.slug}`}
                    className={`block p-4 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 ${idx === 0
                            ? 'border-[var(--purple)] bg-[var(--purple-light)] hover:shadow-purple'
                            : 'border-gray-100 hover:border-[var(--purple-light)] hover:shadow-md'
                        }`}
                >
                    <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{service!.icon}</span>
                        <div>
                            <h4 className="font-bold text-[var(--text-heading)] text-sm">
                                {service!.title}
                            </h4>
                            <p className="text-xs text-[var(--text-muted)] mt-1">
                                {service!.summary}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </aside>
    );
}
