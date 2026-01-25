import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, TrustBar, CTASection } from '@/components/sections';
import { Container } from '@/components/layout';
import { Button, Card, CardContent } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Quiénes Somos - Conoce a AduanasPE',
    description: 'Somos dos hermanos con experiencia en comercio exterior. Nacimos para ofrecer atención personalizada que las grandes agencias no dan. Callao, Perú.',
};

// Equipo
const teamMembers = [
    {
        role: 'Ejecutivo Comercial',
        description: 'Tu primer contacto. Te asesora, cotiza y acompaña en cada decisión.',
        icon: '💼',
    },
    {
        role: 'Ejecutivo de Servicios',
        description: 'Coordina tus operaciones y te envía el estatus de tu carga constantemente.',
        icon: '📦',
    },
    {
        role: 'Liquidador',
        description: 'Experto en clasificación arancelaria y liquidación de impuestos.',
        icon: '📋',
    },
    {
        role: 'Facturación',
        description: 'Tus documentos listos cuando los necesitas, sin demoras.',
        icon: '🧾',
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
                title="Nacimos para hacer las cosas diferentes"
                subtitle="Somos dos hermanos que, después de trabajar en agencias donde la velocidad importaba más que el cliente, decidimos crear algo mejor: una agencia donde tú eres la prioridad."
                size="md"
            />

            {/* Nuestra Historia */}
            <SplitFeature
                title="Nuestra Historia"
                description="Trabajamos años en agencias de aduanas grandes. Vimos cómo los clientes eran tratados como números: sin seguimiento, sin explicaciones, sin atención real. Un día nos preguntamos: ¿por qué nadie hace esto bien? Y decidimos hacerlo nosotros."
                imageSide="right"
            >
                <p className="text-gray-600 italic">
                    "Lo que nos diferencia no es ser los más grandes, sino los más cercanos. Cada cliente tiene un ejecutivo asignado que conoce su negocio y está disponible cuando lo necesita."
                </p>
            </SplitFeature>

            {/* Por qué somos diferentes */}
            <SplitFeature
                title="¿Por qué somos diferentes?"
                description="En las agencias grandes, un ejecutivo atiende a cientos de clientes. Aquí, cada miembro del equipo trabaja con un grupo pequeño de clientes asignados. Eso significa que conocemos tu negocio, anticipamos tus necesidades y te mantenemos informado sin que tengas que preguntar."
                imageSide="left"
            >
                <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                        <span className="text-violet-600">✓</span>
                        <span>Ejecutivo personal asignado a tu cuenta</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-violet-600">✓</span>
                        <span>Envío de estatus constante sin que lo pidas</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-violet-600">✓</span>
                        <span>Capacitación y asesoramiento incluido</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-violet-600">✓</span>
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
            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Nuestro Equipo</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Un equipo pequeño pero especializado. Cada uno sabe exactamente lo que hace y trabaja en coordinación para que tu operación fluya sin problemas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member) => (
                            <Card key={member.role} className="text-center">
                                <CardContent className="p-6">
                                    <span className="text-4xl mb-4 block">{member.icon}</span>
                                    <h3 className="text-lg font-semibold text-gray-900">{member.role}</h3>
                                    <p className="mt-2 text-sm text-gray-600">{member.description}</p>
                                </CardContent>
                            </Card>
                        ))}
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
            <section className="py-16 bg-white">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Dónde estamos?</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Operamos desde el <strong>Callao, Perú</strong> – el corazón del comercio exterior peruano.
                            Trabajamos de manera 100% remota, lo que nos permite atender clientes de todo el Perú,
                            incluyendo provincias, con la misma calidad y velocidad de respuesta.
                        </p>
                        <p className="text-gray-500">
                            No importa dónde estés: Lima, Arequipa, Trujillo o cualquier otra ciudad.
                            Tu ejecutivo está a un mensaje de distancia.
                        </p>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <CTASection
                title="¿Listo para trabajar con un equipo que te pone primero?"
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
