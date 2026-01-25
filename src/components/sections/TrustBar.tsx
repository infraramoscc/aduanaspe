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
        <section className="py-12 bg-white border-y border-gray-100">
            <Container>
                {title && (
                    <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
                        {title}
                    </h2>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {points.map((point, index) => (
                        <div key={index} className="text-center">
                            {point.icon && (
                                <span className="text-4xl block mb-2">{point.icon}</span>
                            )}
                            <h3 className="text-lg font-semibold text-gray-900">{point.title}</h3>
                            {point.description && (
                                <p className="mt-1 text-sm text-gray-500">{point.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

export { TrustBar, type TrustBarProps, type TrustPoint };
