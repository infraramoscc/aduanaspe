import { type ReactNode } from 'react';
import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

interface CTASectionProps {
    title: string;
    highlightedWord?: string;
    subtitle?: string;
    children?: ReactNode;
    variant?: 'primary' | 'secondary';
}

function CTASection({ title, highlightedWord, subtitle, children, variant = 'primary' }: CTASectionProps) {
    // Renderizar título con palabra destacada
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
                'py-20 relative overflow-hidden',
                variant === 'primary'
                    ? 'bg-gradient-to-br from-slate-50 via-cyan-50/30 to-slate-50'
                    : 'bg-white'
            )}
        >
            {/* Orbes decorativos sutiles */}
            {variant === 'primary' && (
                <>
                    <div
                        className="gradient-orb orb-cyan"
                        style={{
                            width: '400px',
                            height: '400px',
                            top: '-100px',
                            right: '-50px',
                            opacity: 0.3
                        }}
                    />
                    <div
                        className="gradient-orb orb-coral"
                        style={{
                            width: '300px',
                            height: '300px',
                            bottom: '-50px',
                            left: '-50px',
                            opacity: 0.3
                        }}
                    />
                </>
            )}

            <Container>
                <div className="text-center max-w-3xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        {renderTitle()}
                    </h2>
                    {subtitle && (
                        <p className="text-lg text-slate-600 mb-8">
                            {subtitle}
                        </p>
                    )}
                    {children && (
                        <div className="flex flex-wrap gap-4 justify-center">
                            {children}
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}

export { CTASection, type CTASectionProps };
