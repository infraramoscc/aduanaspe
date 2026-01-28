import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { PrecotizacionForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { services, getServiceBySlug } from '@/content/services';
import { ROUTES } from '@/lib/routes';

interface ServicePageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        return { title: 'Servicio no encontrado' };
    }

    return {
        title: service.title,
        description: service.summary,
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return (
        <>
            <Hero
                badge={`✨ ${service.icon || '📦'} Servicio`}
                title={service.title}
                subtitle={service.summary}
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '⭐', title: 'Experiencia', description: 'Garantizada' },
                            { icon: '⚡', title: 'Rapidez', description: 'En gestión' },
                            { icon: '🔒', title: 'Seguridad', description: 'Total' },
                            { icon: '📞', title: 'Soporte', description: '24/7' },
                        ]}
                    />
                }
            >
                <Link href="#cotizacion">
                    <Button size="lg">Solicitar cotización</Button>
                </Link>
                <WhatsAppLink route={`servicios/${slug}`} serviceName={slug} variant="button">
                    Contactar por WhatsApp
                </WhatsAppLink>
            </Hero>

            <SplitFeature
                title="¿Qué incluye este servicio?"
                description={service.description}
                imageSide="right"
            >
                <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span><strong>Asesoría personalizada:</strong> Te guiamos en cada paso</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span><strong>Documentación completa:</strong> Nos encargamos de todo el papeleo</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span><strong>Seguimiento en tiempo real:</strong> Sabrás el estado de tu operación</span>
                    </li>
                </ul>
            </SplitFeature>

            <SplitFeature
                title="¿Por qué elegirnos?"
                description="Contamos con más de 5 años de experiencia en el mercado peruano. Nuestro equipo de profesionales certificados te acompañará en cada paso del proceso."
                imageSide="left"
            >
                <Link href={ROUTES.quienesSomos}>
                    <Button variant="secondary">Conoce más sobre nosotros</Button>
                </Link>
            </SplitFeature>

            <Container>
                <div id="cotizacion" className="py-16">
                    <PrecotizacionForm
                        title={`Cotiza ${service.title}`}
                        serviceName={slug}
                    />
                </div>
            </Container>

            <CTASection
                title="¿Tienes dudas?"
                highlightedWord="dudas"
                subtitle="Nuestro equipo está listo para resolver todas tus consultas."
            >
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">
                        Contactar ahora
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
