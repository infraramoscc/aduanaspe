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
    variant?: 'default' | 'clean';
    className?: string;
}

const defaultPoints: TrustPoint[] = [
    {
        icon: '01',
        title: '+15 años de experiencia',
        description: 'Comercio exterior en Perú',
    },
    {
        icon: '02',
        title: 'Operación clara',
        description: 'Seguimiento y respuesta oportuna',
    },
    {
        icon: '03',
        title: 'Cobertura nacional',
        description: 'Clientes en Lima y provincias',
    },
    {
        icon: '04',
        title: 'Atención cercana',
        description: 'Equipo pequeño, trato directo',
    },
];

function TrustBar({ points = defaultPoints, title, variant = 'default', className }: TrustBarProps) {
    const isClean = variant === 'clean';
    const Component = isClean ? 'div' : 'section';

    return (
        <Component
            className={cn(
                !isClean && 'border-y border-slate-200/80 bg-slate-50/70 py-16',
                isClean && 'p-6 md:p-8',
                className
            )}
        >
            <Container>
                {title && (
                    <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-slate-950">
                        {title}
                    </h2>
                )}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {points.map((point, index) => (
                        <div
                            key={index}
                            className="rounded-3xl border border-slate-200/80 bg-white/88 px-5 py-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            {point.icon && (
                                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                                    {point.icon}
                                </span>
                            )}
                            <h3 className="text-lg font-bold text-slate-900">
                                {point.title}
                            </h3>
                            {point.description && (
                                <p className="mt-2 text-sm leading-6 text-slate-600">
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
