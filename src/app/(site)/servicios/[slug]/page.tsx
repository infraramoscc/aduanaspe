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
        return { title: 'Servicio no encontrado | AduanasPE' };
    }

    return {
        title: `${service.title} | AduanasPE`,
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
                badge="Servicio"
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
                            { icon: '01', title: 'Atención directa', description: 'Sin desvíos innecesarios' },
                            { icon: '02', title: 'Seguimiento claro', description: 'Durante la operación' },
                            { icon: '03', title: 'Soporte operativo', description: 'Según tu carga' },
                            { icon: '04', title: 'Respuesta rápida', description: 'En horario de atención' },
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
                title="Qué incluye este servicio"
                description={service.description}
                imageSide="right"
            >
                <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-2">
                        <span className="mt-1 text-purple-600">✓</span>
                        <span><strong>Asesoría personalizada:</strong> revisamos tu necesidad real antes de proponer el servicio.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 text-purple-600">✓</span>
                        <span><strong>Coordinación operativa:</strong> te ayudamos a ordenar documentos, tiempos y siguientes pasos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 text-purple-600">✓</span>
                        <span><strong>Seguimiento:</strong> mantenemos visibilidad sobre el estado de tu operación.</span>
                    </li>
                </ul>
            </SplitFeature>

            <SplitFeature
                title="Por qué trabajar este servicio con nosotros"
                description="Priorizamos una operación clara, con menos fricción comercial y un solo punto de contacto para que el proceso avance con mayor orden."
                imageSide="left"
            >
                <Link href={ROUTES.quienesSomos}>
                    <Button variant="secondary">Conoce más sobre nosotros</Button>
                </Link>
            </SplitFeature>

            <Container>
                <div id="cotizacion" className="py-16">
                    <PrecotizacionForm title={`Cotiza ${service.title}`} serviceName={slug} />
                </div>
            </Container>

            <CTASection
                title="¿Tienes dudas sobre este servicio?"
                highlightedWord="dudas"
                subtitle="Cuéntanos tu carga, tu operación o el punto en el que estás y te orientamos."
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
