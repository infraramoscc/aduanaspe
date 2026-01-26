import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, HubCards, TrustBar, CTASection, SplitFeature } from '@/components/sections';
import { Button } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { services } from '@/content/services';
import { comercioExteriorCategories } from '@/content/comercioExterior';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'AduanasPE - Tu Socio en Comercio Exterior | Atención Personalizada',
    description: 'Agenciamiento de aduanas con atención 100% personalizada. Ejecutivo asignado, seguimiento en tiempo real y respuesta en menos de 1 hora. +5 años de experiencia.',
};

// Trust points con datos reales
const trustPoints = [
    {
        icon: '👤',
        title: 'Ejecutivo Asignado',
        description: 'Atención personalizada',
    },
    {
        icon: '⚡',
        title: 'Respuesta en 1 hora',
        description: 'Máximo 24 horas',
    },
    {
        icon: '🤝',
        title: '+50 Clientes',
        description: 'Confían en nosotros',
    },
    {
        icon: '📊',
        title: '+5 Años',
        description: 'De experiencia',
    },
];

export default function HomePage() {
    return (
        <>
            {/* Hero Section - Premium con stats y floating cards */}
            <Hero
                badge="✨ Comercio Exterior"
                title="Tu importación, nuestra prioridad"
                highlightedWord="prioridad"
                subtitle="No eres un número más. Cada cliente tiene un ejecutivo asignado que conoce tu negocio y te acompaña en cada operación. Atención personalizada con respuesta en menos de 1 hora."
                size="lg"
                showStats={true}
                showFloatingCards={true}
            >
                <WhatsAppLink route="home" variant="button">
                    Escríbenos por WhatsApp
                </WhatsAppLink>
                <Link href={ROUTES.contacto}>
                    <Button variant="secondary" size="lg">
                        Solicitar cotización
                    </Button>
                </Link>
            </Hero>

            {/* Trust Bar con datos reales */}
            <TrustBar points={trustPoints} />

            {/* Value Proposition */}
            <SplitFeature
                title="¿Por qué trabajar con nosotros?"
                description="Sabemos que importar puede ser complejo y estresante. Por eso, no te tratamos como un cliente más. Desde el primer contacto, te asignamos un ejecutivo que se encargará personalmente de tus operaciones, te mantendrá informado en cada paso y resolverá tus dudas en tiempo real."
                imageSide="right"
            >
                <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span><strong>Ejecutivo personal:</strong> Un solo punto de contacto que conoce tu negocio</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span><strong>Seguimiento constante:</strong> Te informamos el estatus de tu carga sin que tengas que preguntar</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span><strong>Facturación inmediata:</strong> Documentos listos cuando los necesitas</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span><strong>Capacitación incluida:</strong> Te enseñamos el proceso para que tomes mejores decisiones</span>
                    </li>
                </ul>
            </SplitFeature>

            {/* Services Hub */}
            <HubCards
                badge="Nuestros Servicios"
                title="Soluciones que transforman"
                highlightedWord="transforman"
                subtitle="Soluciones integrales para importadores que buscan un socio estratégico, no solo un proveedor"
                items={services}
                basePath="/servicios"
                columns={3}
            />

            {/* For First-time importers */}
            <SplitFeature
                title="¿Primera vez importando?"
                description="No te preocupes, estás en el lugar correcto. Más del 60% de nuestros clientes empezaron sin experiencia en importaciones. Te guiamos paso a paso, te explicamos cada documento y te acompañamos hasta que tu mercancía llegue a tu almacén."
                imageSide="left"
            >
                <Link href={ROUTES.comercioExterior.importacion}>
                    <Button>Ver guías de importación</Button>
                </Link>
            </SplitFeature>

            {/* Comercio Exterior Hub */}
            <HubCards
                title="Aprende sobre Comercio Exterior"
                subtitle="Recursos gratuitos para que tomes decisiones informadas en tus operaciones"
                items={comercioExteriorCategories}
                basePath="/comercio-exterior"
                columns={4}
            />

            {/* CTA Section */}
            <CTASection
                title="¿Listo para importar sin complicaciones?"
                highlightedWord="sin complicaciones"
                subtitle="Escríbenos hoy y recibe una cotización personalizada en menos de 1 hora. Sin compromiso."
            >
                <WhatsAppLink route="home-cta" variant="button">
                    Contactar por WhatsApp
                </WhatsAppLink>
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">
                        Solicitar cotización
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
