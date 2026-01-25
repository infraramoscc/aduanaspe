import Link from 'next/link';
import { Container } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';

interface HubCardItem {
    title: string;
    slug: string;
    summary: string;
    ctaLabel?: string;
    icon?: string;
}

interface HubCardsProps {
    title?: string;
    subtitle?: string;
    items: HubCardItem[];
    basePath?: string;
    columns?: 2 | 3 | 4;
}

function HubCards({ title, subtitle, items, basePath = '', columns = 3 }: HubCardsProps) {
    return (
        <section className="py-16 bg-gray-50">
            <Container>
                {(title || subtitle) && (
                    <div className="text-center mb-12">
                        {title && (
                            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                        )}
                        {subtitle && (
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                        )}
                    </div>
                )}

                <div
                    className={cn(
                        'grid gap-6',
                        {
                            'grid-cols-1 md:grid-cols-2': columns === 2,
                            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
                            'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
                        }
                    )}
                >
                    {items.map((item) => (
                        <Link
                            key={item.slug}
                            href={`${basePath}/${item.slug}`}
                            className="block group"
                        >
                            <Card hover className="h-full">
                                <CardContent className="p-6">
                                    {item.icon && (
                                        <span className="text-3xl mb-4 block">{item.icon}</span>
                                    )}
                                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-gray-600">{item.summary}</p>
                                    <span className="mt-4 inline-flex items-center text-violet-600 font-medium group-hover:gap-2 transition-all">
                                        {item.ctaLabel || 'Ver más'}
                                        <svg
                                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}

export { HubCards, type HubCardsProps, type HubCardItem };
