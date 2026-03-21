import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, TrustBar, CTASection } from '@/components/sections';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Quiénes Somos | AduanasPE',
    description: 'Conoce al equipo detrás de AduanasPE y nuestra forma de trabajar: atención cercana, seguimiento claro y foco operativo en comercio exterior.',
    alternates: {
        canonical: 'https://aduanaspe.com/quienes-somos/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

// Equipo
const teamMembers = [
    {
        title: 'Ejecutivo Comercial',
        summary: 'Tu primer contacto. Te asesora, cotiza y acompaña en cada decisión.',
        icon: '💼',
        slug: 'comercial',
    },
    {
        title: 'Ejecutivo de Servicios',
        summary: 'Coordina tus operaciones y te envía el estatus de tu carga constantemente.',
        icon: '📦',
        slug: 'servicios',
    },
    {
        title: 'Liquidador',
        summary: 'Experto en clasificación arancelaria y liquidación de impuestos.',
        icon: '📋',
        slug: 'liquidador',
    },
    {
        title: 'Facturación',
        summary: 'Tus documentos listos cuando los necesitas, sin demoras.',
        icon: '🧾',
        slug: 'facturacion',
    },
];

// Valores
const values = [
    {
        icon: '🔍',
        title: 'Transparencia',
        description: 'Sin costos ocultos ni sorpresas',
    },
    {
        icon: '🤝',
        title: 'Compromiso',
        description: 'Tu operación es nuestra prioridad',
    },
    {
        icon: '💬',
        title: 'Honestidad',
        description: 'Te decimos las cosas como son',
    },
    {
        icon: '❤️',
        title: 'Cercanía',
        description: 'Somos tu equipo, no un proveedor más',
    },
];

export default function QuienesSomosPage() {
    return (
        <>
            <Hero
                badge="✨ Sobre Nosotros"
                title="Nacimos para hacer las cosas diferentes"
                highlightedWord="diferentes"
                subtitle="Somos dos hermanos que, después de trabajar en agencias donde la velocidad importaba más que el cliente, decidimos crear algo mejor: una agencia donde tú eres la prioridad."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={<TrustBar variant="clean" />}
            />

            {/* Nuestra Historia */}
            <SplitFeature
                title="Nuestra Historia"
                description="Trabajamos años en agencias de aduanas grandes. Vimos cómo los clientes eran tratados como números: sin seguimiento, sin explicaciones, sin atención real. Un día nos preguntamos: ¿por qué nadie hace esto bien? Y decidimos hacerlo nosotros."
                imageSide="right"
            >
                <p className="text-slate-600 italic border-l-4 border-purple-500 pl-4">
                    &ldquo;Lo que nos diferencia no es ser los más grandes, sino los más cercanos. Cada cliente tiene un ejecutivo asignado que conoce su negocio y está disponible cuando lo necesita.&rdquo;
                </p>
            </SplitFeature>

            {/* Por qué somos diferentes */}
            <SplitFeature
                title="¿Por qué somos diferentes?"
                description="En las agencias grandes, un ejecutivo atiende a cientos de clientes. Aquí, cada miembro del equipo trabaja con un grupo pequeño de clientes asignados. Eso significa que conocemos tu negocio, anticipamos tus necesidades y te mantenemos informado sin que tengas que preguntar."
                imageSide="left"
            >
                <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600">✓</span>
                        <span>Ejecutivo personal asignado a tu cuenta</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600">✓</span>
                        <span>Envío de estatus constante sin que lo pidas</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600">✓</span>
                        <span>Capacitación y asesoramiento incluido</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600">✓</span>
                        <span>Facturación inmediata cuando la necesitas</span>
                    </li>
                </ul>
            </SplitFeature>

            {/* Nuestros Valores */}
            <TrustBar
                title="Nuestros Valores"
                points={values}
            />

            {/* Equipo */}
            <section className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Nuestro Equipo</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Un equipo que te <span className="gradient-text">respalda</span>
                        </h2>
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                            Un equipo pequeño pero especializado. Cada uno sabe exactamente lo que hace.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => {
                            const colors = ['pink', 'blue', 'green', 'orange'];
                            const colorClass = colors[index % colors.length];
                            return (
                                <div
                                    key={member.slug}
                                    className={`service-card service-${colorClass} text-center p-6`}
                                >
                                    <span className="text-4xl mb-4 block">{member.icon}</span>
                                    <h3 className="text-lg font-semibold text-slate-900">{member.title}</h3>
                                    <p className="mt-2 text-sm text-slate-500">{member.summary}</p>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Misión */}
            <SplitFeature
                title="Nuestra Misión"
                description="Ser el socio estratégico de los importadores que buscan más que un proveedor de servicios. Queremos que te enfoques en hacer crecer tu negocio mientras nosotros nos encargamos de la complejidad aduanera."
                imageSide="right"
            />

            {/* Ubicación */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="section-badge">Ubicación</span>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            ¿Dónde <span className="gradient-text">estamos</span>?
                        </h2>
                        <p className="text-lg text-slate-600 mb-6">
                            Operamos desde el <strong>Callao, Perú</strong> – el corazón del comercio exterior peruano.
                            Trabajamos de manera 100% remota, lo que nos permite atender clientes de todo el Perú.
                        </p>
                        <p className="text-slate-500">
                            No importa dónde estés: Lima, Arequipa, Trujillo o cualquier otra ciudad.
                            Tu ejecutivo está a un mensaje de distancia.
                        </p>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <CTASection
                title="¿Listo para trabajar con un equipo diferente?"
                highlightedWord="diferente"
                subtitle="Escríbenos y descubre la diferencia de trabajar con una agencia que realmente se preocupa por ti."
            >
                <WhatsAppLink route="quienes-somos" variant="button">
                    Escríbenos por WhatsApp
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
