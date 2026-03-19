import { type ReactNode } from 'react';
import NextImage from 'next/image';
import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

interface HeroProps {
    title: string;
    highlightedWord?: string;
    subtitle?: string;
    children?: ReactNode;
    centered?: boolean;
    size?: 'sm' | 'md' | 'lg';
    showStats?: boolean;
    showFloatingCards?: boolean;
    badge?: string;
    image?: string;
    floatingCards?: FloatingCardItem[];
    footer?: ReactNode;
}

interface StatItem {
    number: string;
    label: string;
}

interface FloatingCardItem {
    icon: string;
    text: string;
    color: 'pink' | 'blue' | 'green' | 'yellow';
    position: { top?: string; bottom?: string; left?: string; right?: string };
    delay: string;
}

const defaultStats: StatItem[] = [
    { number: '+50', label: 'Clientes atendidos' },
    { number: '1h', label: 'Tiempo de respuesta' },
    { number: '+5', label: 'Años de experiencia' },
];

const defaultFloatingCards: FloatingCardItem[] = [
    { icon: '01', text: 'Operación clara', color: 'pink', position: { top: '14%', left: '2%' }, delay: '0s' },
    { icon: '02', text: 'Seguimiento real', color: 'blue', position: { top: '18%', right: '2%' }, delay: '1s' },
    { icon: '03', text: 'Respuesta rápida', color: 'green', position: { bottom: '18%', left: '2%' }, delay: '2s' },
    { icon: '04', text: 'Equipo asignado', color: 'yellow', position: { bottom: '20%', right: '2%' }, delay: '3s' },
];

function Hero({
    title,
    highlightedWord,
    subtitle,
    children,
    centered = false,
    size = 'lg',
    showStats = true,
    showFloatingCards = true,
    badge,
    image,
    floatingCards,
    footer,
}: HeroProps) {
    const renderTitle = () => {
        if (highlightedWord && title.includes(highlightedWord)) {
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
        <section
            className={cn(
                'relative overflow-hidden border-b border-slate-200/80 bg-[radial-gradient(circle_at_top_right,rgba(232,101,143,0.08),transparent_28%),radial-gradient(circle_at_left,rgba(15,159,110,0.08),transparent_22%)]',
                {
                    'py-16': size === 'sm',
                    'py-20 md:py-24': size === 'md',
                    'min-h-[88vh] py-24 md:py-32': size === 'lg',
                }
            )}
        >
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.84),rgba(252,252,250,0.96))]" />

            {image && (
                <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                    <NextImage
                        src={image}
                        alt=""
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="relative z-10">
                <Container className="relative">
                    <div
                        className={cn(
                            'relative',
                            centered ? 'mx-auto max-w-4xl text-center' : 'max-w-3xl'
                        )}
                    >
                        {badge && <span className="section-badge animate-fade-in-up">{badge}</span>}

                        <h1 className="animate-fade-in-up text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
                            {renderTitle()}
                        </h1>

                        {subtitle && (
                            <p
                                className={cn(
                                    'mt-6 animate-fade-in-up text-lg leading-8 text-slate-600 md:text-xl',
                                    centered && 'mx-auto max-w-3xl'
                                )}
                            >
                                {subtitle}
                            </p>
                        )}

                        {children && (
                            <div
                                className={cn(
                                    'mt-8 flex flex-wrap gap-4 animate-fade-in-up',
                                    centered && 'justify-center'
                                )}
                            >
                                {children}
                            </div>
                        )}

                        {showStats && (
                            <div
                                className={cn(
                                    'mt-10 grid gap-4 animate-fade-in-up sm:grid-cols-3',
                                    centered && 'mx-auto max-w-3xl'
                                )}
                            >
                                {defaultStats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="rounded-3xl border border-slate-200/80 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm"
                                    >
                                        <span className="stat-number">{stat.number}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {showFloatingCards && (
                        <div className="hidden 2xl:block">
                            {(floatingCards || defaultFloatingCards).map((card, index) => (
                                <div
                                    key={index}
                                    className="floating-card"
                                    style={{
                                        ...card.position,
                                        animationDelay: card.delay,
                                    }}
                                >
                                    <div className={`card-icon card-icon-${card.color}`}>
                                        {card.icon}
                                    </div>
                                    <span>{card.text}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </Container>
            </div>

            {footer && (
                <div className="relative z-10 mt-14">
                    <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200/80 bg-white/88 shadow-sm backdrop-blur-md">
                        {footer}
                    </div>
                </div>
            )}
        </section>
    );
}

export { Hero, type HeroProps };
