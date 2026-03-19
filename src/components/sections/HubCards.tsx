import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';
import { GA4_EVENTS, TrackedLink } from '@/components/tracking';

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

const cardColors = ['pink', 'blue', 'green', 'orange'] as const;

function HubCards({ title, highlightedWord, subtitle, items, basePath = '', columns = 3, badge, id }: HubCardsProps) {
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
        <section id={id} className="bg-slate-50/70 py-20">
            <Container>
                {(title || subtitle || badge) && (
                    <div className="mb-14 text-center">
                        {badge && <span className="section-badge">{badge}</span>}
                        {title && (
                            <h2 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                                {renderTitle()}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                <div
                    className={cn('grid gap-6', {
                        'grid-cols-1 md:grid-cols-2': columns === 2,
                        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
                        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
                    })}
                >
                    {items.map((item, index) => {
                        const colorClass = cardColors[index % cardColors.length];
                        const href = `${basePath}/${item.slug}`;

                        return (
                            <TrackedLink
                                key={item.slug}
                                href={href}
                                eventName={GA4_EVENTS.NAV_CLICK}
                                eventParams={{ location: id || 'hub_cards', label: item.slug }}
                                className="group block h-full"
                            >
                                <div className={cn('service-card h-full', `service-${colorClass}`)}>
                                    <div className="flex h-full flex-col">
                                        {item.icon && (
                                            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                                                {item.icon}
                                            </span>
                                        )}
                                        <h3 className="text-xl font-semibold text-slate-950 transition-colors group-hover:text-purple-600">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                                            {item.summary}
                                        </p>
                                        <span className="service-link mt-6 inline-flex items-center">
                                            {item.ctaLabel || 'Explorar'}
                                            <span className="ml-1 transition-all group-hover:ml-2">{'->'}</span>
                                        </span>
                                    </div>
                                </div>
                            </TrackedLink>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

export { HubCards, type HubCardsProps, type HubCardItem };
