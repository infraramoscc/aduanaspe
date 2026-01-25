import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { Container } from '@/components/layout';
import { Button, Card, CardContent } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { PrecotizacionForm } from '@/components/forms';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Consultoría Aduanera | Asesoría Experta en Comercio Exterior',
    description: 'Consultoría aduanera especializada: clasificación arancelaria, tratados de libre comercio, regímenes aduaneros y optimización de costos. Ideal para empresas.',
};

// Servicios de consultoría
const consultingServices = [
    {
        icon: '🔍',
        title: 'Clasificación Arancelaria',
        description: 'Determinación correcta de partidas arancelarias para optimizar aranceles y evitar sanciones.',
    },
    {
        icon: '🌍',
        title: 'Tratados de Libre Comercio',
        description: 'Aprovecha los TLC vigentes de Perú para reducir o eliminar aranceles en tus operaciones.',
    },
    {
        icon: '📊',
        title: 'Optimización de Costos',
        description: 'Análisis de tu operación para identificar oportunidades de ahorro en aranceles y tributos.',
    },
    {
        icon: '📋',
        title: 'Regímenes Aduaneros',
        description: 'Asesoría en el régimen más conveniente: definitivo, temporal, suspensivo, etc.',
    },
    {
        icon: '⚠️',
        title: 'Prevención de Sanciones',
        description: 'Revisión de procedimientos para evitar multas, comiso y otras penalidades.',
    },
    {
        icon: '📚',
        title: 'Capacitación',
        description: 'Formación a tu equipo en normativa aduanera y mejores prácticas.',
    },
];

// Por qué elegirnos
const whyChooseUs = [
    {
        icon: '🎓',
        title: 'Especialistas Certificados',
        description: 'Equipo con certificaciones en comercio exterior, legislación aduanera y clasificación arancelaria.',
        highlight: 'Conocimiento actualizado y preciso',
    },
    {
        icon: '💡',
        title: 'Enfoque Práctico',
        description: 'No solo te decimos qué hacer, te acompañamos en la implementación.',
        highlight: 'Soluciones aplicables a tu operación',
    },
    {
        icon: '📈',
        title: 'Resultados Medibles',
        description: 'Cuantificamos el ahorro y los beneficios de cada recomendación.',
        highlight: 'ROI claro en cada proyecto',
    },
    {
        icon: '🤝',
        title: 'Relación de Largo Plazo',
        description: 'Nos convertimos en tu aliado estratégico, no solo un proveedor puntual.',
        highlight: 'Soporte continuo para tu crecimiento',
    },
];

// Para quién es
const targetAudience = [
    { icon: '🏢', title: 'Empresas que inician en comercio exterior', description: 'Te guiamos desde cero' },
    { icon: '📦', title: 'Importadores con operaciones recurrentes', description: 'Optimizamos tus costos' },
    { icon: '🌎', title: 'Exportadores que buscan nuevos mercados', description: 'Aprovechamos los TLC' },
    { icon: '⚙️', title: 'Empresas con problemas aduaneros', description: 'Solucionamos contingencias' },
];

// Problemas que resuelve
const problemsSolved = [
    'No saber qué partida arancelaria usar',
    'Pagar más aranceles de los necesarios',
    'Desconocer los beneficios de los TLC',
    'Tener contingencias aduaneras sin resolver',
    'Recibir multas y sanciones de SUNAT',
    'No saber qué régimen aduanero usar',
];

// FAQ
const faqs = [
    {
        question: '¿Cuánto cuesta la consultoría?',
        answer: 'El costo depende del alcance del proyecto. Ofrecemos desde consultas puntuales hasta proyectos de optimización integral. Te presentamos una propuesta después de entender tu situación.',
    },
    {
        question: '¿Pueden revisar mis operaciones anteriores?',
        answer: 'Sí, realizamos auditorías de operaciones pasadas para identificar oportunidades de ahorro o corregir errores antes de que SUNAT los detecte.',
    },
    {
        question: '¿Trabajan con empresas pequeñas?',
        answer: 'Sí, atendemos empresas de todos los tamaños. Muchas veces las empresas pequeñas son las que más se benefician de una buena asesoría, ya que no cuentan con un área especializada.',
    },
    {
        question: '¿Pueden capacitar a mi equipo?',
        answer: 'Sí, ofrecemos capacitaciones personalizadas en normativa aduanera, clasificación arancelaria, tratados de libre comercio y otros temas relevantes para tu operación.',
    },
    {
        question: '¿Qué diferencia hay entre consultoría y agenciamiento?',
        answer: 'El agenciamiento se encarga de ejecutar el despacho aduanero. La consultoría te asesora estratégicamente sobre cómo optimizar tus operaciones y evitar problemas.',
    },
];

export default function ConsultoriaAduaneraPage() {
    return (
        <>
            {/* Hero */}
            <Hero
                title="Consultoría Aduanera"
                subtitle="Asesoría estratégica para optimizar tus operaciones de comercio exterior. Clasificación arancelaria, TLCs, regímenes aduaneros y más."
                size="lg"
            >
                <WhatsAppLink route="consultoria-aduanera" serviceName="consultoria-aduanera" variant="button">
                    Solicitar consulta
                </WhatsAppLink>
                <Link href="#servicios">
                    <Button variant="secondary" size="lg">
                        Ver servicios
                    </Button>
                </Link>
            </Hero>

            {/* Trust Bar */}
            <TrustBar
                points={[
                    { icon: '🎓', title: 'Especialistas', description: 'Certificados' },
                    { icon: '📊', title: 'Optimización', description: 'De costos' },
                    { icon: '🌍', title: 'TLCs', description: 'Perú tiene 22' },
                    { icon: '⚡', title: 'Respuesta', description: 'En 24 horas' },
                ]}
            />

            {/* Contexto: Dónde encaja la Consultoría */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Servicio opcional para cualquier etapa</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            La consultoría aduanera complementa cualquier servicio o puede contratarse de manera independiente
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {/* Etapas principales */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Etapa 1 */}
                            <Link href="/servicios/agencia-de-carga-internacional" className="group block p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 1</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🚢</span>
                                    <h3 className="font-bold text-gray-900">Agenciamiento de Carga</h3>
                                    <p className="text-sm text-gray-600 mt-2">Flete desde origen</p>
                                    <p className="text-xs text-blue-600 font-medium mt-2">+ Consultoría opcional</p>
                                </div>
                            </Link>
                            {/* Etapa 2 */}
                            <Link href="/servicios/agenciamiento-aduanas" className="group block p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 2</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">📋</span>
                                    <h3 className="font-bold text-gray-900">Agenciamiento de Aduanas</h3>
                                    <p className="text-sm text-gray-600 mt-2">Despacho aduanero</p>
                                    <p className="text-xs text-blue-600 font-medium mt-2">+ Consultoría opcional</p>
                                </div>
                            </Link>
                            {/* Etapa 3 */}
                            <Link href="/servicios/transporte-de-carga" className="group block p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 3</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🚚</span>
                                    <h3 className="font-bold text-gray-900">Transporte de Carga</h3>
                                    <p className="text-sm text-gray-600 mt-2">Entrega en tu almacén</p>
                                    <p className="text-xs text-blue-600 font-medium mt-2">+ Consultoría opcional</p>
                                </div>
                            </Link>
                        </div>

                        {/* Servicios Opcionales */}
                        <div className="mt-10">
                            <div className="text-center mb-6">
                                <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full">
                                    ⚡ Servicios Opcionales - Contrátalos en cualquier etapa
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Consultoría Aduanera - Actual */}
                                <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-500 shadow-lg ring-2 ring-blue-300 ring-offset-2">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center">
                                        <span className="text-2xl">💡</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-gray-900">Consultoría Aduanera</h4>
                                            <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full animate-pulse">ESTÁS AQUÍ</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Asesoría experta para optimizar tus operaciones</p>
                                    </div>
                                </div>
                                {/* Resguardo Aduanero */}
                                <Link href="/servicios/resguardo-aduanero" className="group flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all hover:-translate-y-1">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">🛡️</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-gray-900">Resguardo Aduanero</h4>
                                            <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-full">OPCIONAL</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Custodia y seguridad para tu mercancía</p>
                                        <p className="text-xs text-orange-600 font-medium mt-1 group-hover:underline">Ver más →</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Servicio Integral */}
                        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-center shadow-xl">
                            <h3 className="text-xl font-bold">¿Prefieres un servicio integral?</h3>
                            <p className="mt-2 text-violet-100">Contratamos las 3 etapas + consultoría + resguardo por ti. Un solo punto de contacto, una sola factura.</p>
                            <div className="mt-4">
                                <WhatsAppLink route="servicio-integral" serviceName="servicio-integral" variant="button">
                                    Cotizar servicio integral
                                </WhatsAppLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Qué es */}
            <SplitFeature
                title="¿Qué hacemos por ti?"
                description="Te brindamos asesoría estratégica para que tus operaciones de comercio exterior sean más eficientes, económicas y sin riesgos. Analizamos tu situación actual, identificamos oportunidades y te acompañamos en la implementación."
                imageSide="right"
            >
                <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-800">
                        <strong>Nuestro valor:</strong> Conocimiento profundo de la normativa aduanera peruana, tratados internacionales y mejores prácticas del sector.
                    </p>
                </div>
            </SplitFeature>

            {/* Servicios de Consultoría */}
            <section id="servicios" className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Servicios de Consultoría</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Soluciones especializadas para cada necesidad
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {consultingServices.map((service) => (
                            <Card key={service.title} className="h-full">
                                <CardContent className="p-6">
                                    <span className="text-4xl">{service.icon}</span>
                                    <h3 className="mt-3 text-xl font-semibold text-blue-600">{service.title}</h3>
                                    <p className="mt-2 text-gray-600">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Por qué elegirnos */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">¿Por qué elegirnos?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {whyChooseUs.map((item) => (
                            <Card key={item.title} className="h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl">{item.icon}</span>
                                        <div>
                                            <h3 className="text-xl font-semibold text-blue-600">{item.title}</h3>
                                            <p className="mt-2 text-gray-600">{item.description}</p>
                                            <p className="mt-3 text-sm italic text-gray-500">{item.highlight}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Para quién es */}
            <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">¿Para quién es este servicio?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        {targetAudience.map((item) => (
                            <Card key={item.title} className="text-center">
                                <CardContent className="p-6">
                                    <span className="text-4xl">{item.icon}</span>
                                    <h3 className="mt-3 font-bold text-gray-900">{item.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Problemas que resuelve */}
            <SplitFeature
                title="¿Qué problemas resuelve?"
                description="La consultoría aduanera te ayuda a evitar errores costosos y aprovechar oportunidades de ahorro."
                imageSide="right"
            >
                <ul className="space-y-2">
                    {problemsSolved.map((problem) => (
                        <li key={problem} className="flex items-start gap-2 text-gray-600">
                            <span className="text-blue-600">✓</span>
                            <span>{problem}</span>
                        </li>
                    ))}
                </ul>
            </SplitFeature>

            {/* FAQ */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Preguntas Frecuentes</h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="bg-white rounded-xl p-6 shadow-sm">
                                <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                                <p className="mt-2 text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Formulario */}
            <Container>
                <div id="cotizacion" className="py-12">
                    <PrecotizacionForm
                        title="Solicita una consulta"
                        serviceName="consultoria-aduanera"
                    />
                </div>
            </Container>

            {/* CTA Final */}
            <CTASection
                title="¿Quieres optimizar tu operación?"
                subtitle="Escríbenos y cuéntanos tu situación. Te responderemos en menos de 24 horas."
            >
                <WhatsAppLink route="consultoria-aduanera-cta" serviceName="consultoria-aduanera" variant="button">
                    Agendar consulta
                </WhatsAppLink>
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">
                        Otras formas de contacto
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
