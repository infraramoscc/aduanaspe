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
                        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
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
                            <div className="text-center text-gray-400">
                                <svg
                                    className="w-16 h-16 mx-auto mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span className="text-sm">Visual placeholder</span>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}

export { SplitFeature, type SplitFeatureProps };
