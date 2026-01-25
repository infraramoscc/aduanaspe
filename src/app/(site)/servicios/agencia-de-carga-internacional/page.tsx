import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { Container } from '@/components/layout';
import { Button, Card, CardContent } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { PrecotizacionForm } from '@/components/forms';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Agenciamiento de Carga | Flete Marítimo y Aéreo',
    description: 'Coordinamos tu carga desde origen hasta destino. Flete marítimo y aéreo, booking, seguimiento en tiempo real. Cotización por contenedor, peso o volumen.',
};

// Qué incluye el servicio
const serviceIncludes = [
    { icon: '💰', title: 'Cotización de Flete', description: 'Te cotizamos el flete y todos los gastos asociados a tu carga' },
    { icon: '📅', title: 'Booking', description: 'Reservamos espacio con navieras y aerolíneas' },
    { icon: '🚢', title: 'Coordinación Marítima', description: 'Gestionamos envíos por mar: FCL, LCL, consolidados' },
    { icon: '✈️', title: 'Coordinación Aérea', description: 'Gestionamos carga aérea con aerolíneas internacionales' },
    { icon: '📊', title: 'Seguimiento en Tiempo Real', description: 'Te informamos el estatus de tu carga constantemente' },
    { icon: '📋', title: 'Costeo Detallado', description: 'Desglose claro de todos los costos de tu operación' },
    { icon: '🔄', title: 'Alternativas de Envío', description: 'Te presentamos opciones para optimizar costo y tiempo' },
    { icon: '🤝', title: 'Coordinación con Agentes', description: 'Trabajamos con agentes en origen y destino' },
];

// Por qué elegirnos
const whyChooseUs = [
    {
        icon: '🌍',
        title: 'Red de Agentes Global',
        description: 'Trabajamos con agentes de carga en los principales puertos y aeropuertos del mundo.',
        highlight: 'Tu carga siempre tiene quién la cuide',
    },
    {
        icon: '📊',
        title: 'Costeo Transparente',
        description: 'Te explicamos cada costo. Sin sorpresas al final de la operación.',
        highlight: 'Sabrás exactamente cuánto pagarás antes de decidir',
    },
    {
        icon: '📍',
        title: 'Seguimiento Constante',
        description: 'Te informamos dónde está tu carga sin que tengas que preguntar.',
        highlight: 'Siempre sabrás el estatus de tu mercancía',
    },
    {
        icon: '🔄',
        title: 'Opciones de Envío',
        description: 'Te presentamos alternativas: marítimo vs aéreo, consolidado vs exclusivo.',
        highlight: 'Tú decides, nosotros ejecutamos',
    },
];

// Proceso paso a paso
const processSteps = [
    { step: 1, title: 'Nos envías los datos de tu carga', description: 'Peso, volumen, origen, destino y tipo de mercancía' },
    { step: 2, title: 'Cotizamos las opciones', description: 'Te presentamos alternativas de flete marítimo y/o aéreo' },
    { step: 3, title: 'Reservamos el espacio', description: 'Hacemos el booking con la naviera o aerolínea' },
    { step: 4, title: 'Coordinamos la carga', description: 'Gestionamos la recolección y embarque en origen' },
    { step: 5, title: 'Te informamos el estatus', description: 'Seguimiento constante durante el tránsito' },
    { step: 6, title: 'Llegada a destino', description: 'Coordinamos la llegada y te notificamos para el siguiente paso' },
];

// Modalidades de carga
const cargoModes = [
    {
        title: 'Carga Marítima',
        icon: '🚢',
        options: ['FCL (Contenedor completo)', 'LCL (Carga consolidada)', 'Carga suelta', 'Carga proyecto'],
    },
    {
        title: 'Carga Aérea',
        icon: '✈️',
        options: ['Carga general', 'Carga express', 'Carga consolidada', 'Carga peligrosa (DG)'],
    },
];

// FAQ
const faqs = [
    {
        question: '¿Cuál es la diferencia entre Agenciamiento de Carga y Agenciamiento de Aduanas?',
        answer: 'Son servicios complementarios. El agenciamiento de carga es la primera etapa: coordinamos el transporte desde origen hasta Perú. El agenciamiento de aduanas es la segunda etapa: gestionamos el despacho aduanero. Puedes contratar ambos o solo uno.',
    },
    {
        question: '¿Cómo se cotiza el flete?',
        answer: 'Depende del tipo de carga. Puede ser por contenedor completo (FCL), por peso/volumen (LCL o aéreo), o por unidad. Te presentamos opciones con desglose de costos.',
    },
    {
        question: '¿Pueden coordinar desde cualquier país?',
        answer: 'Sí, trabajamos con agentes en los principales puertos y aeropuertos del mundo: China, USA, Europa, Latinoamérica.',
    },
    {
        question: '¿Puedo hacer seguimiento a mi carga?',
        answer: 'Sí, te enviamos estatus constante durante todo el tránsito. Sabrás cuándo embarca, cuándo está en tránsito y cuándo llega.',
    },
    {
        question: '¿Qué documentos necesito para iniciar?',
        answer: 'Para cotizar solo necesitamos: origen, destino, peso, volumen y tipo de mercancía. Los documentos de embarque se gestionan después.',
    },
];

export default function AgenciamientoCargaPage() {
    return (
        <>
            {/* Hero */}
            <Hero
                title="Agenciamiento de Carga Internacional"
                subtitle="Coordinamos tu carga desde origen hasta destino. Flete marítimo y aéreo con seguimiento en tiempo real y costeo transparente."
                size="lg"
            >
                <WhatsAppLink route="agencia-de-carga-internacional" serviceName="agencia-de-carga-internacional" variant="button">
                    Cotizar mi carga
                </WhatsAppLink>
                <Link href="#proceso">
                    <Button variant="secondary" size="lg">
                        ¿Cómo funciona?
                    </Button>
                </Link>
            </Hero>

            {/* Trust Bar */}
            <TrustBar
                points={[
                    { icon: '🚢', title: 'Flete Marítimo', description: 'FCL y LCL' },
                    { icon: '✈️', title: 'Flete Aéreo', description: 'Todos los destinos' },
                    { icon: '📍', title: 'Seguimiento', description: 'En tiempo real' },
                    { icon: '⚡', title: 'Cotización', description: 'En 1 hora' },
                ]}
            />

            {/* Qué es este servicio */}
            <SplitFeature
                title="¿Qué es el Agenciamiento de Carga?"
                description="Es la coordinación del transporte de tu mercancía desde el país de origen hasta Perú (o viceversa). Nos encargamos de: cotizar el flete, reservar espacio con navieras o aerolíneas, coordinar la recolección en origen, hacer seguimiento durante el tránsito y notificarte la llegada."
                imageSide="right"
            >
                <div className="p-4 bg-violet-50 rounded-xl">
                    <p className="text-sm text-violet-800">
                        <strong>Etapa 1 de 3:</strong> Este es el primer paso de una importación. Después viene el agenciamiento de aduanas (etapa 2) y el transporte local (etapa 3). Puedes contratar cada servicio por separado o solicitar un <strong>servicio integral</strong>.
                    </p>
                </div>
            </SplitFeature>

            {/* Por qué elegirnos */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">¿Por qué coordinar tu carga con nosotros?</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            No solo movemos carga: te mantenemos informado y te damos opciones.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {whyChooseUs.map((item) => (
                            <Card key={item.title} className="h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl">{item.icon}</span>
                                        <div>
                                            <h3 className="text-xl font-semibold text-violet-600">{item.title}</h3>
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

            {/* Modalidades */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Modalidades de Carga</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Trabajamos con carga marítima y aérea en todas sus variantes
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {cargoModes.map((mode) => (
                            <Card key={mode.title}>
                                <CardContent className="p-6">
                                    <div className="text-center mb-4">
                                        <span className="text-5xl">{mode.icon}</span>
                                        <h3 className="mt-4 text-2xl font-bold text-gray-900">{mode.title}</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {mode.options.map((option) => (
                                            <li key={option} className="flex items-center gap-2 text-gray-600">
                                                <span className="text-violet-600">✓</span>
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Qué incluye */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">¿Qué incluye el servicio?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {serviceIncludes.map((item) => (
                            <div key={item.title} className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                                <span className="text-2xl">{item.icon}</span>
                                <h4 className="mt-2 font-semibold text-gray-900">{item.title}</h4>
                                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Proceso */}
            <section id="proceso" className="py-16 bg-gradient-to-br from-violet-50 to-fuchsia-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">¿Cómo funciona?</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Desde que nos contactas hasta que tu carga llega a destino
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {processSteps.map((item, index) => (
                            <div key={item.step} className="flex gap-4 mb-6">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
                                    {item.step}
                                </div>
                                <div className={`flex-1 pb-6 ${index < processSteps.length - 1 ? 'border-l-2 border-violet-200 pl-6 ml-5' : ''}`}>
                                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Secuencia de Servicios */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">¿Y después qué sigue?</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Una importación tiene 3 etapas. Estás viendo la primera.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {/* Etapas principales */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Etapa 1 - Actual */}
                            <div className="p-6 rounded-xl bg-violet-100 border-2 border-violet-500 shadow-lg ring-2 ring-violet-300 ring-offset-2">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-violet-600 text-white text-xs font-bold rounded-full mb-3 animate-pulse">ETAPA 1</span>
                                    <span className="text-3xl block mb-2">🚢</span>
                                    <h3 className="font-bold text-gray-900">Agenciamiento de Carga</h3>
                                    <p className="text-sm text-gray-600 mt-2">Coordinamos el flete desde origen</p>
                                    <p className="text-xs text-violet-600 font-medium mt-2">← Estás aquí</p>
                                </div>
                            </div>
                            {/* Etapa 2 */}
                            <Link href="/servicios/agenciamiento-aduanas" className="group block p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 2</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">📋</span>
                                    <h3 className="font-bold text-gray-900">Agenciamiento de Aduanas</h3>
                                    <p className="text-sm text-gray-600 mt-2">Despacho aduanero en destino</p>
                                    <p className="text-xs text-violet-600 font-medium mt-2">Ver servicio →</p>
                                </div>
                            </Link>
                            {/* Etapa 3 */}
                            <Link href="/servicios/transporte-de-carga" className="group block p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 3</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🚚</span>
                                    <h3 className="font-bold text-gray-900">Transporte de Carga</h3>
                                    <p className="text-sm text-gray-600 mt-2">Entrega en tu almacén</p>
                                    <p className="text-xs text-violet-600 font-medium mt-2">Ver servicio →</p>
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
                                {/* Consultoría Aduanera */}
                                <Link href="/servicios/consultoria-aduanera" className="group flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all hover:-translate-y-1">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">💡</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-gray-900">Consultoría Aduanera</h4>
                                            <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full">OPCIONAL</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Asesoría experta para optimizar tus operaciones</p>
                                        <p className="text-xs text-blue-600 font-medium mt-1 group-hover:underline">Ver más →</p>
                                    </div>
                                </Link>
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
                            <p className="mt-2 text-violet-100">Contratamos las 3 etapas + opcionales por ti. Un solo punto de contacto, una sola factura.</p>
                            <div className="mt-4">
                                <WhatsAppLink route="servicio-integral" serviceName="servicio-integral" variant="button">
                                    Cotizar servicio integral
                                </WhatsAppLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

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
                        title="Cotiza tu carga"
                        serviceName="agencia-de-carga-internacional"
                    />
                </div>
            </Container>

            {/* CTA Final */}
            <CTASection
                title="¿Tienes carga que traer?"
                subtitle="Escríbenos con los datos de tu carga y te cotizamos en menos de 1 hora."
            >
                <WhatsAppLink route="agencia-de-carga-internacional-cta" serviceName="agencia-de-carga-internacional" variant="button">
                    Cotizar por WhatsApp
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
