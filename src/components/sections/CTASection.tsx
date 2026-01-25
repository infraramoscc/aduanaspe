import { type ReactNode } from 'react';
import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

interface CTASectionProps {
    title: string;
    subtitle?: string;
    children?: ReactNode;
    variant?: 'primary' | 'secondary';
}

function CTASection({ title, subtitle, children, variant = 'primary' }: CTASectionProps) {
    return (
        <section
            className={cn(
                'py-16',
                variant === 'primary'
                    ? 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white'
                    : 'bg-gray-50'
            )}
        >
            <Container>
                <div className="text-center max-w-3xl mx-auto">
                    <h2
                        className={cn(
                            'text-3xl md:text-4xl font-bold',
                            variant === 'primary' ? 'text-white' : 'text-gray-900'
                        )}
                    >
                        {title}
                    </h2>
                    {subtitle && (
                        <p
                            className={cn(
                                'mt-4 text-lg',
                                variant === 'primary' ? 'text-violet-100' : 'text-gray-600'
                            )}
                        >
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

export { CTASection, type CTASectionProps };
