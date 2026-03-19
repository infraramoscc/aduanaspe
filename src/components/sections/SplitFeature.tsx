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
        <section className="bg-white py-18 md:py-20">
            <Container>
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className={cn(imageSide === 'left' && 'lg:order-2')}>
                        <span className="section-badge">Operación clara</span>
                        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                            {title}
                        </h2>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                            {description}
                        </p>
                        {children && <div className="mt-8">{children}</div>}
                    </div>

                    <div className={cn(imageSide === 'left' && 'lg:order-1')}>
                        {image || (
                            <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f5f6f2_100%)] p-8 shadow-sm">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(135,95,214,0.12),transparent_24%),radial-gradient(circle_at_left,rgba(15,159,110,0.1),transparent_22%)]" />
                                <div className="relative grid gap-4 md:grid-cols-2">
                                    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                            Paso 1
                                        </p>
                                        <p className="mt-3 text-lg font-semibold text-slate-900">
                                            Documentación ordenada
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            Menos idas y vueltas, más claridad desde el inicio.
                                        </p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-200/80 bg-slate-950 p-5 text-white shadow-sm">
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                            Paso 2
                                        </p>
                                        <p className="mt-3 text-lg font-semibold">
                                            Seguimiento continuo
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-300">
                                            La operación se explica y se reporta sin que tengas que perseguir a nadie.
                                        </p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm md:col-span-2">
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                            Resultado
                                        </p>
                                        <div className="mt-3 flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-lg font-semibold text-slate-900">
                                                    Menos fricción operativa
                                                </p>
                                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                                    Una interfaz más útil para una promesa comercial más creíble.
                                                </p>
                                            </div>
                                            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                                                Flujo más claro
                                            </div>
                                        </div>
                                    </div>
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
