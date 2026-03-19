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

const ctaConfigMap = {
    frio: {
        eyebrow: 'Siguiente paso recomendado',
        title: 'Lleva este tema a una decisión mejor informada',
        description: 'Revisa cómo encaja este servicio en tu operación y qué parte del proceso puede simplificar.',
        buttonText: 'Ver servicio relacionado',
    },
    tibio: {
        eyebrow: 'Apoyo especializado',
        title: 'Convierte la lectura en un plan de acción',
        description: 'Conoce el servicio más cercano al problema que estás evaluando y cuándo conviene activarlo.',
        buttonText: 'Conocer servicio',
    },
    caliente: {
        eyebrow: 'Atención prioritaria',
        title: 'Si necesitas resolverlo ahora, habla con un especialista',
        description: 'Este servicio suele ser el siguiente paso cuando ya hay una operación en curso o una urgencia que destrabar.',
        buttonText: 'Revisar servicio',
    },
} as const;

export function ServiceCTA({ topic, position = 'inline' }: ServiceCTAProps) {
    const mapping = getTopicMapping(topic);
    if (!mapping) return null;

    const primaryService = getServiceBySlug(mapping.primaryService);
    if (!primaryService) return null;

    const ctaConfig = ctaConfigMap[mapping.temperature];

    return (
        <div
            className={`rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] p-6 shadow-sm ${position === 'sidebar' ? 'lg:p-7' : 'my-8 md:p-8'}`}
        >
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                {ctaConfig.eyebrow}
            </span>

            <h3 className="mt-4 text-2xl font-bold leading-tight text-slate-950">
                {ctaConfig.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
                {ctaConfig.description}
            </p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                    href={`/servicios/${primaryService.slug}`}
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                >
                    {ctaConfig.buttonText}
                </Link>

                {mapping.temperature === 'caliente' ? (
                    <WhatsAppLink
                        serviceSlug={primaryService.slug}
                        className="justify-center px-6 py-3.5 text-sm"
                    >
                        Hablar por WhatsApp
                    </WhatsAppLink>
                ) : (
                    <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition-[border-color,background-color,color] hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4"
                    >
                        Solicitar orientación
                    </Link>
                )}
            </div>

            {mapping.secondaryServices.length > 0 && (
                <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        También puede ayudarte
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
