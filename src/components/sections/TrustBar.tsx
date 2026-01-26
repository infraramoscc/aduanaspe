import { Container } from '@/components/layout';

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

function TrustBar({ points = defaultPoints, title }: TrustBarProps) {
    return (
        <section className="py-16 bg-slate-50 border-y border-slate-100">
            <Container>
                {title && (
                    <h2 className="text-center text-2xl font-bold text-slate-900 mb-10">
                        {title}
                    </h2>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {points.map((point, index) => (
                        <div
                            key={index}
                            className="text-center group transition-all duration-300 hover:-translate-y-2"
                        >
                            {point.icon && (
                                <span className="text-4xl block mb-3 transition-transform duration-300 group-hover:scale-110">
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
        </section>
    );
}

export { TrustBar, type TrustBarProps, type TrustPoint };
