import type { Metadata } from 'next';
import Link from 'next/link';
import { RecommendedReading } from '@/components/blog';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { PrecotizacionForm } from '@/components/forms';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';
import { JsonLd } from '@/components/seo/JsonLd';
import { ROUTES } from '@/lib/routes';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Consultoría Aduanera | AduanasPE',
    description: 'Asesoría aduanera para clasificación arancelaria, TLC, regímenes y decisiones operativas que ayuden a reducir riesgos y optimizar costos.',
    alternates: {
        canonical: 'https://aduanaspe.com/servicios/consultoria-aduanera/',
    },
    robots: {
        index: true,
        follow: true,
    },
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
        highlight: 'Expertos a tu servicio',
    },
    {
        icon: '💡',
        title: 'Enfoque Práctico',
        description: 'No solo te decimos qué hacer, te acompañamos en la implementación.',
        highlight: 'Soluciones reales',
    },
    {
        icon: '📈',
        title: 'Resultados Medibles',
        description: 'Cuantificamos el ahorro y los beneficios de cada recomendación.',
        highlight: 'Ahorro comprobado',
    },
    {
        icon: '🤝',
        title: 'Relación de Largo Plazo',
        description: 'Nos convertimos en tu aliado estratégico, no solo un proveedor puntual.',
        highlight: 'Socios estratégicos',
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
        question: '¿Cuándo necesito una consultoría pagada?',
        answer: 'La consultoría pagada aplica cuando tu caso requiere análisis técnico, revisión documentaria profunda, estrategia tributaria o acompañamiento especializado. Si tu caso puede resolverse con asesoría sin costo, te orientamos directamente.',
    },
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
    const serviceJsonLd = generateServiceSchema({
        name: 'Consultoria Aduanera',
        description: 'Asesoria aduanera para clasificacion arancelaria, TLC, regimenes y decisiones operativas que ayuden a reducir riesgos y optimizar costos.',
        url: 'https://aduanaspe.com/servicios/consultoria-aduanera/',
    });
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Servicios', url: 'https://aduanaspe.com/servicios/' },
        { name: 'Consultoria Aduanera', url: 'https://aduanaspe.com/servicios/consultoria-aduanera/' },
    ]);

    return (
        <>
            <JsonLd json={serviceJsonLd} />
            <JsonLd json={breadcrumbJsonLd} />
            <FaqJsonLd faqs={faqs} />
            {/* Hero */}
            <Hero
                badge="✨ Consultoría Aduanera"
                title="Asesoría Experta en Comercio Exterior"
                highlightedWord="Experta"
                subtitle="Empieza con asesoría sin costo. Si tu caso es complejo o requiere análisis técnico, entonces te proponemos una consultoría pagada a medida."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '🎓', title: 'Especialistas', description: 'Certificados' },
                            { icon: '📊', title: 'Optimización', description: 'De costos' },
                            { icon: '💬', title: 'Asesoría', description: 'Sin costo' },
                            { icon: '⚡', title: 'Respuesta', description: 'En 24 horas' },
                        ]}
                    />
                }
            >
                <WhatsAppLink route="consultoria-aduanera" messageKey="asesoria_gratis" variant="button">
                    Resolver mis dudas primero
                </WhatsAppLink>
                <Link href="#servicios">
                    <Button variant="secondary" size="lg">
                        Ver servicios
                    </Button>
                </Link>
            </Hero>

            {/* Trust Bar integrated into Hero */}

            {/* Qué es */}
            <SplitFeature
                title="¿Qué hacemos por ti?"
                description="Te brindamos asesoría estratégica para que tus operaciones de comercio exterior sean más eficientes, económicas y sin riesgos. Analizamos tu situación actual, identificamos oportunidades y te acompañamos en la implementación."
                imageSide="right"
                image={
                    <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent"></div>
                        <div className="relative z-10 text-center">
                            <span className="text-8xl filter drop-shadow-xl animate-pulse">💡</span>
                            <div className="mt-4 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/50">
                                <span className="font-bold text-blue-600">Estrategia + Ahorro</span>
                            </div>
                        </div>
                    </div>
                }
            >
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-800">
                        <strong>Nuestro valor:</strong> Conocimiento profundo de la normativa aduanera peruana, tratados internacionales y mejores prácticas del sector.
                    </p>
                </div>
            </SplitFeature>

            {/* Servicios de Consultoría */}
            <section id="servicios" className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Soluciones</span>
                        <h2 className="text-3xl font-bold text-slate-900">Servicios de <span className="gradient-text">Consultoría</span></h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Soluciones especializadas para cada necesidad
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {consultingServices.map((service, index) => {
                            const colorClass = ['service-blue', 'service-cyan', 'service-purple', 'service-pink', 'service-orange', 'service-green'][index % 6];
                            return (
                                <div key={service.title} className={`service-card ${colorClass} h-full p-6`}>
                                    <span className="text-4xl filter drop-shadow-sm">{service.icon}</span>
                                    <h3 className="mt-4 text-xl font-bold text-slate-900">{service.title}</h3>
                                    <p className="mt-2 text-slate-600 leading-relaxed">{service.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Contexto: Dónde encaja la Consultoría */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Integración</span>
                        <h2 className="text-3xl font-bold text-slate-900">Servicio transversal a tu <span className="gradient-text">operación</span></h2>
                        <p className="mt-4 text-lg text-slate-600">
                            La consultoría aduanera complementa cualquier servicio o puede contratarse de manera independiente
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {/* Etapas principales */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Etapa 1 */}
                            <Link href="/servicios/agencia-de-carga-internacional" className="group block p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-slate-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 1</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🚢</span>
                                    <h3 className="font-bold text-slate-900">Agenciamiento de Carga</h3>
                                    <p className="text-sm text-slate-600 mt-2">Flete desde origen</p>
                                    <p className="text-xs text-cyan-600 font-medium mt-2">+ Consultoría opcional</p>
                                </div>
                            </Link>
                            {/* Etapa 2 */}
                            <Link href="/servicios/agenciamiento-aduanas" className="group block p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-slate-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 2</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">📋</span>
                                    <h3 className="font-bold text-slate-900">Agenciamiento de Aduanas</h3>
                                    <p className="text-sm text-slate-600 mt-2">Despacho aduanero</p>
                                    <p className="text-xs text-cyan-600 font-medium mt-2">+ Consultoría opcional</p>
                                </div>
                            </Link>
                            {/* Etapa 3 */}
                            <Link href="/servicios/transporte-de-carga" className="group block p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-slate-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 3</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🚚</span>
                                    <h3 className="font-bold text-slate-900">Transporte de Carga</h3>
                                    <p className="text-sm text-slate-600 mt-2">Entrega en tu almacén</p>
                                    <p className="text-xs text-cyan-600 font-medium mt-2">+ Consultoría opcional</p>
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
                                <div className="flex items-center gap-4 p-5 rounded-xl bg-cyan-50 border-2 border-cyan-500 shadow-lg ring-2 ring-cyan-200 ring-offset-2 scale-105">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-cyan-200 flex items-center justify-center">
                                        <span className="text-2xl">💡</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900">Consultoría Aduanera</h4>
                                            <span className="px-2 py-0.5 bg-cyan-600 text-white text-[10px] font-bold rounded-full animate-pulse">ESTÁS AQUÍ</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-1">Asesoría experta para optimizar tus operaciones</p>
                                    </div>
                                </div>
                                {/* Resguardo Aduanero */}
                                <Link href="/servicios/resguardo-aduanero" className="group flex items-center gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">🛡️</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900">Resguardo Aduanero</h4>
                                            <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-full">OPCIONAL</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-1">Custodia y seguridad para tu mercancía</p>
                                        <p className="text-xs text-orange-600 font-medium mt-1 group-hover:underline">Ver más →</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Servicio Integral */}
                        <div className="mt-8 p-8 rounded-xl bg-gradient-to-r from-slate-800 to-blue-800 text-white text-center shadow-xl">
                            <h3 className="text-xl font-bold">¿Prefieres un servicio integral?</h3>
                            <p className="mt-2 text-slate-300">Contratamos las 3 etapas + consultoría + resguardo por ti. Un solo punto de contacto, una sola factura.</p>
                            <div className="mt-6">
                                <WhatsAppLink route="servicio-integral" serviceName="servicio-integral" variant="button">
                                    Cotizar servicio integral
                                </WhatsAppLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Por qué elegirnos */}
            <section className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Experiencia</span>
                        <h2 className="text-3xl font-bold text-slate-900">¿Por qué <span className="gradient-text">elegirnos</span>?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {whyChooseUs.map((item, index) => {
                            const colors = ['blue', 'cyan', 'green', 'purple'];
                            const colorClass = colors[index % colors.length];
                            return (
                                <div key={item.title} className={`service-card service-${colorClass} h-full p-6`}>
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl">{item.icon}</span>
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                                            <p className="mt-2 text-slate-600">{item.description}</p>
                                            <p className="mt-3 text-sm italic text-slate-500 border-l-2 border-blue-300 pl-2">{item.highlight}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Para quién es */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Perfil</span>
                        <h2 className="text-3xl font-bold text-slate-900">¿Para quién es este <span className="gradient-text">servicio</span>?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {targetAudience.map((item) => (
                            <div key={item.title} className="p-6 rounded-xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
                                <span className="text-4xl block mb-4">{item.icon}</span>
                                <h3 className="font-bold text-slate-900 leading-tight">{item.title}</h3>
                                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Problemas que resuelve */}
            <SplitFeature
                title="¿Qué problemas resuelve?"
                description="La consultoría aduanera te ayuda a evitar errores costosos y aprovechar oportunidades de ahorro."
                imageSide="right"
                image={
                    <div className="relative w-full h-full bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-green-100 z-10">
                            <span className="text-6xl">🛡️</span>
                        </div>
                        <div className="absolute top-10 right-10 text-4xl animate-bounce delay-100">💰</div>
                        <div className="absolute bottom-10 left-10 text-4xl animate-bounce delay-300">⚖️</div>
                        <div className="absolute bottom-20 right-20 text-4xl animate-bounce delay-500">📉</div>
                    </div>
                }
            >
                <ul className="space-y-3">
                    {problemsSolved.map((problem) => (
                        <li key={problem} className="flex items-start gap-3 text-slate-600">
                            <span className="text-cyan-600 mt-1">✓</span>
                            <span>{problem}</span>
                        </li>
                    ))}
                </ul>
            </SplitFeature>

            {/* FAQ */}
            <section className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Ayuda</span>
                        <h2 className="text-3xl font-bold text-slate-900">Preguntas <span className="gradient-text">Frecuentes</span></h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-slate-900 text-lg">{faq.question}</h4>
                                <p className="mt-2 text-slate-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Formulario */}
            <Container>
                <div id="cotizacion" className="py-16">
                    <PrecotizacionForm
                        title="Solicita asesoría sin costo"
                        serviceName="consultoria-aduanera"
                    />
                </div>
            </Container>

            <RecommendedReading
                title="Guias que suelen activar una revision tecnica previa"
                subtitle="Si tu duda esta en viabilidad, requisitos o sobrecostos, estos contenidos te dan el contexto antes de una consultoria."
                slugs={[
                    'como-saber-si-tu-producto-necesita-permisos-para-importar-en-peru',
                    'importar-electronicos-a-peru-requisitos-y-permisos',
                    'como-calcular-costos-de-importacion-en-peru',
                ]}
            />

            {/* CTA Final */}
            <CTASection
                title="¿Quieres optimizar tu operación?"
                highlightedWord="optimizar"
                subtitle="Escríbenos y cuéntanos tu situación. Primero resolvemos tus dudas sin costo y, si el caso lo exige, pasamos a una consultoría especializada."
            >
                <WhatsAppLink route="consultoria-aduanera-cta" messageKey="asesoria_gratis" variant="button">
                    Resolver mis dudas primero
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
