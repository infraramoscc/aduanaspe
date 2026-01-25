import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection } from '@/components/sections';
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
                title={service.title}
                subtitle={service.summary}
                size="md"
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
            />

            <SplitFeature
                title="¿Por qué elegirnos?"
                description="Contamos con más de 15 años de experiencia en el mercado peruano. Nuestro equipo de profesionales certificados te acompañará en cada paso del proceso, asegurando que tu operación se realice sin contratiempos."
                imageSide="left"
            >
                <Link href={ROUTES.quienesSomos}>
                    <Button variant="secondary">Conoce más sobre nosotros</Button>
                </Link>
            </SplitFeature>

            <Container>
                <div id="cotizacion">
                    <PrecotizacionForm
                        title={`Cotiza ${service.title}`}
                        serviceName={slug}
                    />
                </div>
            </Container>

            <CTASection
                title="¿Tienes dudas?"
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
