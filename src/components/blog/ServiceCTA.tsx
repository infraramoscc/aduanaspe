/**
 * Service CTA Component
 * Contextual call-to-action linking blog posts to related services
 */

import Link from 'next/link';
import { WhatsAppLink } from '@/components/tracking/WhatsAppLink';
import { getServiceBySlug } from '@/content/services';
import { getTopicMapping } from '@/lib/blog/topics';
import type { BlogTopic } from '@/lib/blog/types';

interface ServiceCTAProps {
    topic: BlogTopic;
    position?: 'inline' | 'sidebar' | 'footer';
}

type CtaConfig = {
    eyebrow: string;
    title: string;
    description: string;
    buttonText: string;
};

const topicCtaOverrides: Partial<Record<BlogTopic, Partial<CtaConfig>>> = {
    importacion: {
        eyebrow: 'Antes de cerrar la compra',
        title: 'Valida costos, tributos y requisitos antes de pagar al proveedor',
        description: 'Si ya tienes producto, proveedor o una cotizacion preliminar, te orientamos con asesoria sin costo para revisar la viabilidad de la operacion y el siguiente paso mas conveniente.',
        buttonText: 'Revisar servicio de importacion',
    },
};

const ctaConfigMap: Record<'frio' | 'tibio' | 'caliente', CtaConfig> = {
    frio: {
        eyebrow: 'Siguiente paso recomendado',
        title: 'Lleva este tema a una decision mejor informada',
        description: 'Revisa como encaja este servicio en tu operacion y que parte del proceso puede simplificar.',
        buttonText: 'Ver servicio relacionado',
    },
    tibio: {
        eyebrow: 'Apoyo especializado',
        title: 'Convierte la lectura en un plan de accion',
        description: 'Conoce el servicio mas cercano al problema que estas evaluando y cuando conviene activarlo.',
        buttonText: 'Conocer servicio',
    },
    caliente: {
        eyebrow: 'Atencion prioritaria',
        title: 'Si necesitas resolverlo ahora, habla con un especialista',
        description: 'Este servicio suele ser el siguiente paso cuando ya hay una operacion en curso o una urgencia que destrabar.',
        buttonText: 'Revisar servicio',
    },
};

export function ServiceCTA({ topic, position = 'inline' }: ServiceCTAProps) {
    const mapping = getTopicMapping(topic);
    if (!mapping) return null;

    const primaryService = getServiceBySlug(mapping.primaryService);
    if (!primaryService) return null;

    const ctaConfig = {
        ...ctaConfigMap[mapping.temperature],
        ...topicCtaOverrides[topic],
    };

    const showWhatsApp = mapping.temperature === 'caliente' || topic === 'importacion';
    const isSidebar = position === 'sidebar';

    return (
        <div
            className={`rounded-[28px] border border-slate-200 bg-white shadow-sm ${isSidebar ? 'p-6' : 'my-8 p-6 md:p-8'}`}
        >
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                {ctaConfig.eyebrow}
            </span>

            <h3 className={`mt-4 font-bold leading-tight text-slate-950 ${isSidebar ? 'text-xl' : 'text-2xl'}`}>
                {ctaConfig.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
                {ctaConfig.description}
            </p>

            <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Servicio vinculado
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                    {primaryService.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                    {primaryService.summary}
                </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
                <Link
                    href={`/servicios/${primaryService.slug}`}
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                >
                    {ctaConfig.buttonText}
                </Link>

                {showWhatsApp ? (
                    <WhatsAppLink
                        messageKey={topic === 'importacion' ? 'asesoria_gratis' : undefined}
                        serviceSlug={primaryService.slug}
                        className="justify-center border border-slate-300 bg-white px-6 py-3.5 text-sm text-slate-900 hover:border-slate-400 hover:bg-slate-50"
                    >
                        {topic === 'importacion' ? 'Pedir asesoria sin costo' : 'Hablar por WhatsApp'}
                    </WhatsAppLink>
                ) : (
                    <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition-[border-color,background-color,color] hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                    >
                        Solicitar asesoria sin costo
                    </Link>
                )}
            </div>

            {mapping.secondaryServices.length > 0 && (
                <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Tambien puede ayudarte
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {mapping.secondaryServices.map((slug) => {
                            const service = getServiceBySlug(slug);

                            return service ? (
                                <Link
                                    key={slug}
                                    href={`/servicios/${slug}`}
                                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-[border-color,background-color,color] hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2"
                                >
                                    {service.title}
                                </Link>
                            ) : null;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
