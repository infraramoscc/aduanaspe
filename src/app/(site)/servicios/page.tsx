import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, HubCards, CTASection, TrustBar } from '@/components/sections';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { services } from '@/content/services';
import { ROUTES } from '@/lib/routes';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Servicios de Aduanas y Logística | AduanasPE',
    description: 'Servicios de agenciamiento de aduanas, carga internacional, transporte, resguardo y consultoría para operaciones de comercio exterior en Perú.',
    alternates: {
        canonical: 'https://aduanaspe.com/servicios/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ServiciosPage() {
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Servicios', url: 'https://aduanaspe.com/servicios/' },
    ]);

    return (
        <>
            <JsonLd json={breadcrumbJsonLd} />
            <Hero
                badge="Servicios"
                title="Servicios para mover tu operación sin fricciones"
                highlightedWord="sin fricciones"
                subtitle="Desde el flete internacional hasta el despacho y la entrega local. Resolvemos cada etapa con un solo equipo."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '01', title: 'Flete internacional', description: 'Marítimo y aéreo' },
                            { icon: '02', title: 'Despacho aduanero', description: 'Con seguimiento claro' },
                            { icon: '03', title: 'Entrega local', description: 'Coordinación final' },
                            { icon: '04', title: 'Asesoría continua', description: 'Antes y después de operar' },
                        ]}
                    />
                }
            >
                <WhatsAppLink messageKey="general" variant="button">
                    Hablar con un asesor
                </WhatsAppLink>
                <Link href="#servicios-disponibles">
                    <Button variant="secondary" size="lg">
                        Ver servicios disponibles
                    </Button>
                </Link>
            </Hero>

            <HubCards
                id="servicios-disponibles"
                badge="Mapa de servicios"
                title="Elige la etapa donde necesitas apoyo"
                highlightedWord="necesitas apoyo"
                items={services}
                basePath="/servicios"
                columns={3}
            />

            <CTASection
                title="Si aún no tienes claro qué contratar"
                highlightedWord="qué contratar"
                subtitle="Cuéntanos tu carga, origen y objetivo comercial. Te indicamos el servicio correcto sin hacerte pasar por varias áreas."
            >
                <Link href={ROUTES.contacto}>
                    <Button size="lg">
                        Recibir asesoría
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
