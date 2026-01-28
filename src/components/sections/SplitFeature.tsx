import { type ReactNode } from 'react';
import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

interface SplitFeatureProps {
    title: string;
    description: string;
    children?: ReactNode;
    imageSide?: 'left' | 'right';
    image?: ReactNode;
}

function SplitFeature({
    title,
    description,
    children,
    imageSide = 'right',
    image,
}: SplitFeatureProps) {
    return (
        <section className="py-16 bg-white">
            <Container>
                <div
                    className={cn(
                        'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
                        imageSide === 'left' && 'lg:flex-row-reverse'
                    )}
                >
                    {/* Content Side */}
                    <div className={cn(imageSide === 'left' && 'lg:order-2')}>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{title}</h2>
                        <p className="mt-4 text-lg text-gray-600 leading-relaxed">{description}</p>
                        {children && <div className="mt-6">{children}</div>}
                    </div>

                    {/* Visual Side */}
                    <div
                        className={cn(
                            'aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center',
                            imageSide === 'left' && 'lg:order-1'
                        )}
                    >
                        {image || (
                            <div className="w-full h-full min-h-[300px] bg-slate-50 relative rounded-2xl overflow-hidden flex items-center justify-center group">
                                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]" />
                                <div className="absolute w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-20 -top-12 -right-12 group-hover:opacity-30 transition-opacity" />
                                <div className="absolute w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 -bottom-12 -left-12 group-hover:opacity-30 transition-opacity" />

                                <div className="relative p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg">
                                    <span className="text-6xl drop-shadow-md">✨</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}

export { SplitFeature, type SplitFeatureProps };
