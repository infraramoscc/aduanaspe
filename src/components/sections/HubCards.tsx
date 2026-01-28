import Link from 'next/link';
import { Container } from '@/components/layout';
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
    highlightedWord?: string;
    subtitle?: string;
    items: HubCardItem[];
    basePath?: string;
    columns?: 2 | 3 | 4;
    badge?: string;
    id?: string;
}

// Colores rotativos para las tarjetas
const cardColors = ['pink', 'blue', 'green', 'orange'] as const;

function HubCards({ title, highlightedWord, subtitle, items, basePath = '', columns = 3, badge, id }: HubCardsProps) {
    // Renderizar título con palabra destacada
    const renderTitle = () => {
        if (highlightedWord && title?.includes(highlightedWord)) {
            const parts = title.split(highlightedWord);
            return (
                <>
                    {parts[0]}
                    <span className="gradient-text">{highlightedWord}</span>
                    {parts[1]}
                </>
            );
        }
        return title;
    };

    return (
        <section id={id} className="py-20 bg-slate-50">
            <Container>
                {(title || subtitle || badge) && (
                    <div className="text-center mb-14">
                        {badge && (
                            <span className="section-badge">{badge}</span>
                        )}
                        {title && (
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                                {renderTitle()}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                                {subtitle}
                            </p>
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
                    {items.map((item, index) => {
                        const colorClass = cardColors[index % cardColors.length];

                        return (
                            <Link
                                key={item.slug}
                                href={`${basePath}/${item.slug}`}
                                className="block group"
                            >
                                {/* Service Card con borde de color y glow al hover */}
                                <div className={cn(
                                    'service-card h-full',
                                    `service-${colorClass}`
                                )}>
                                    <div className="p-6">
                                        {item.icon && (
                                            <span className="text-3xl mb-4 block">{item.icon}</span>
                                        )}
                                        <h3 className="text-xl font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-slate-500">{item.summary}</p>
                                        <span className="service-link mt-4 inline-flex items-center">
                                            {item.ctaLabel || 'Explorar'}
                                            <span className="ml-1 transition-all group-hover:ml-2">→</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

export { HubCards, type HubCardsProps, type HubCardItem };
