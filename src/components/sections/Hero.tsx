import { type ReactNode } from 'react';
import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

interface HeroProps {
    title: string;
    subtitle?: string;
    children?: ReactNode;
    centered?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

function Hero({ title, subtitle, children, centered = true, size = 'md' }: HeroProps) {
    return (
        <section
            className={cn(
                'bg-gradient-to-br from-indigo-950 via-violet-800 to-fuchsia-700 text-white relative overflow-hidden',
                {
                    'py-12': size === 'sm',
                    'py-16 md:py-24': size === 'md',
                    'py-20 md:py-32': size === 'lg',
                }
            )}
        >
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <Container>
                <div className={cn(centered && 'text-center', 'max-w-4xl', centered && 'mx-auto', 'relative z-10')}>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-4 md:mt-6 text-lg md:text-xl text-violet-100/90 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                    {children && (
                        <div className="mt-8 flex flex-wrap gap-4 justify-center">
                            {children}
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}

export { Hero, type HeroProps };
