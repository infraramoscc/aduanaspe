import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

interface TrustPoint {
    icon?: string;
    title: string;
    description?: string;
}

interface TrustBarProps {
    points?: TrustPoint[];
    title?: string;
}

const defaultPoints: TrustPoint[] = [
    {
        icon: '🏆',
        title: '+15 años de experiencia',
        description: 'En comercio exterior',
    },
    {
        icon: '📦',
        title: '+10,000 operaciones',
        description: 'Exitosas anualmente',
    },
    {
        icon: '🤝',
        title: '+500 clientes',
        description: 'Confían en nosotros',
    },
    {
        icon: '⭐',
        title: '100% satisfacción',
        description: 'Garantizada',
    },
];

interface TrustBarProps {
    points?: TrustPoint[];
    title?: string;
    variant?: 'default' | 'clean';
    className?: string;
}

function TrustBar({ points = defaultPoints, title, variant = 'default', className }: TrustBarProps) {
    const isClean = variant === 'clean';
    const Component = isClean ? 'div' : 'section';

    return (
        <Component
            className={cn(
                !isClean && "py-16 bg-slate-50 border-y border-slate-100",
                isClean && "p-6 md:p-8", // Add padding for clean variant to breathe in the glass card
                className
            )}
        >
            <Container>
                {title && (
                    <h2 className="text-center text-2xl font-bold text-slate-900 mb-10">
                        {title}
                    </h2>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200/50">
                    {points.map((point, index) => (
                        <div
                            key={index}
                            className="text-center group transition-all duration-300 hover:-translate-y-1 px-4"
                        >
                            {point.icon && (
                                <span className="text-4xl md:text-5xl block mb-4 transition-transform duration-300 group-hover:scale-110 filter drop-shadow-sm">
                                    {point.icon}
                                </span>
                            )}
                            <h3 className="text-lg font-bold text-slate-900 mb-1">
                                {point.title}
                            </h3>
                            {point.description && (
                                <p className="text-sm text-slate-500">
                                    {point.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </Component>
    );
}

export { TrustBar, type TrustBarProps, type TrustPoint };
