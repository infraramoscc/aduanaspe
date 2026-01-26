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
}

interface StatItem {
    number: string;
    label: string;
}

const defaultStats: StatItem[] = [
    { number: '+50', label: 'Clientes' },
    { number: '98%', label: 'Satisfacción' },
    { number: '+5', label: 'Años' },
];

interface FloatingCardItem {
    icon: string;
    text: string;
    color: 'pink' | 'blue' | 'green' | 'yellow';
    position: { top?: string; bottom?: string; left?: string; right?: string };
    delay: string;
}

const defaultFloatingCards: FloatingCardItem[] = [
    { icon: '📦', text: 'Agenciamiento', color: 'pink', position: { top: '20%', right: '5%' }, delay: '0s' },
    { icon: '🚛', text: 'Transporte', color: 'blue', position: { top: '50%', right: '2%' }, delay: '1s' },
    { icon: '📋', text: 'Consultoría', color: 'green', position: { bottom: '30%', right: '8%' }, delay: '2s' },
    { icon: '🔒', text: 'Resguardo', color: 'yellow', position: { bottom: '10%', right: '3%' }, delay: '3s' },
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
}: HeroProps) {
    // Separar el título si hay una palabra destacada
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
                'relative overflow-hidden',
                'bg-gradient-to-b from-white to-slate-50',
                {
                    'py-16': size === 'sm',
                    'py-20 md:py-28': size === 'md',
                    'min-h-screen flex items-center py-20': size === 'lg',
                }
            )}
        >
            {/* Orbes decorativos */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="gradient-orb orb-purple"
                    style={{
                        width: '600px',
                        height: '600px',
                        top: '-200px',
                        right: '-100px',
                        animationDelay: '0s'
                    }}
                />
                <div
                    className="gradient-orb orb-pink"
                    style={{
                        width: '400px',
                        height: '400px',
                        bottom: '-100px',
                        left: '-100px',
                        animationDelay: '2s'
                    }}
                />
                <div
                    className="gradient-orb orb-blue"
                    style={{
                        width: '300px',
                        height: '300px',
                        top: '50%',
                        left: '30%',
                        animationDelay: '4s'
                    }}
                />
            </div>



            {/* Imagen de fondo opcional */}
            {
                image && (
                    <div className="absolute inset-0 z-0 opacity-5 md:opacity-10 pointer-events-none">
                        <NextImage
                            src={image}
                            alt=""
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
                    </div>
                )
            }

            <Container>
                <div className={cn(
                    'relative z-10',
                    centered ? 'text-center max-w-4xl mx-auto' : 'max-w-3xl'
                )}>
                    {/* Badge */}
                    {badge && (
                        <span
                            className="section-badge animate-fade-in-up"
                            style={{ animationDelay: '0s' }}
                        >
                            {badge}
                        </span>
                    )}

                    {/* Título */}
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 mb-6 animate-fade-in-up"
                        style={{ animationDelay: '0.1s' }}
                    >
                        {renderTitle()}
                    </h1>

                    {/* Subtítulo */}
                    {subtitle && (
                        <p
                            className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8 animate-fade-in-up"
                            style={{ animationDelay: '0.2s', ...(centered ? { margin: '0 auto 2rem' } : {}) }}
                        >
                            {subtitle}
                        </p>
                    )}

                    {/* CTAs */}
                    {children && (
                        <div
                            className={cn(
                                'flex flex-wrap gap-4 mb-12 animate-fade-in-up',
                                centered && 'justify-center'
                            )}
                            style={{ animationDelay: '0.3s' }}
                        >
                            {children}
                        </div>
                    )}

                    {/* Stats */}
                    {showStats && (
                        <div
                            className={cn(
                                'flex gap-12 animate-fade-in-up',
                                centered && 'justify-center'
                            )}
                            style={{ animationDelay: '0.4s' }}
                        >
                            {defaultStats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <span className="stat-number">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Floating Cards - Solo en desktop */}
                {showFloatingCards && (
                    <div className="hidden lg:block">
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
        </section >
    );
}

export { Hero, type HeroProps };
