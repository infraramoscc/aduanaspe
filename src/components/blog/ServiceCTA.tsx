/**
 * Service CTA Component
 * Contextual call-to-action linking blog posts to related services
 */

import Link from 'next/link';
import { getServiceBySlug } from '@/content/services';
import { getTopicMapping } from '@/lib/blog/topics';
import type { BlogTopic } from '@/lib/blog/types';

interface ServiceCTAProps {
    topic: BlogTopic;
    position?: 'inline' | 'sidebar' | 'footer';
}

const ctaConfigMap = {
    frio: {
        title: '¿Quieres entender mejor este tema?',
        description: 'Explora nuestra guía completa sobre',
        buttonText: 'Ver guía completa',
        variant: 'service-blue' as const,
    },
    tibio: {
        title: '¿Necesitas ayuda con esto?',
        description: 'Conoce nuestro servicio de',
        buttonText: 'Conocer servicio',
        variant: 'service-pink' as const,
    },
    caliente: {
        title: '¿Necesitas solucionar esto ahora?',
        description: 'Habla con un especialista en',
        buttonText: 'Hablar con especialista',
        variant: 'service-pink' as const,
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
            className={`service-card ${ctaConfig.variant} my-8 ${position === 'sidebar' ? 'sticky top-24' : ''
                }`}
        >
            {/* Badge */}
            <span className="section-badge text-xs">
                {primaryService.icon} Servicio Relacionado
            </span>

            {/* Title */}
            <h3 className="text-xl font-bold text-[var(--text-heading)] mt-4 mb-2">
                {ctaConfig.title}
            </h3>

            {/* Description */}
            <p className="text-[var(--text-body)] mb-4">
                <span className="text-[var(--text-muted)]">{ctaConfig.description}</span>{' '}
                <span className="font-semibold gradient-text">{primaryService.title}</span>
            </p>

            {/* Summary */}
            <p className="text-sm text-[var(--text-muted)] mb-6">
                {primaryService.summary}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href={`/servicios/${primaryService.slug}`}
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white px-6 py-3 rounded-full font-semibold text-center hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                    {ctaConfig.buttonText} →
                </Link>

                {mapping.temperature === 'caliente' && (
                    <Link
                        href="/contacto"
                        className="bg-white text-slate-900 border-2 border-slate-200 hover:border-purple-400 hover:text-purple-600 px-6 py-3 rounded-full font-semibold text-center transition-all"
                    >
                        Contactar ahora
                    </Link>
                )}
            </div>

            {/* Secondary services */}
            {mapping.secondaryServices.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs text-[var(--text-muted)] mb-3">
                        También te puede interesar:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {mapping.secondaryServices.map((slug) => {
                            const service = getServiceBySlug(slug);
                            return service ? (
                                <Link
                                    key={slug}
                                    href={`/servicios/${slug}`}
                                    className="text-xs px-3 py-1.5 rounded-full bg-[var(--purple-light)] text-[var(--purple)] hover:bg-[var(--purple)] hover:text-white transition-all font-medium"
                                >
                                    {service.icon} {service.title}
                                </Link>
                            ) : null;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
