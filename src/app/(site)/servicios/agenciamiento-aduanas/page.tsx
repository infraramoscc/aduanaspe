import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { Container } from '@/components/layout';
import { Button, Card, CardContent } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { PrecotizacionForm } from '@/components/forms';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Agenciamiento de Aduanas | Despacho de Importación y Exportación',
    description: 'Servicio de agenciamiento aduanero con atención personalizada. Clasificación arancelaria, numeración DAM, seguimiento en tiempo real. Cotización en 1 hora.',
};

// Qué incluye el servicio
const serviceIncludes = [
    { icon: '📋', title: 'Revisión Documentaria', description: 'Revisamos cada documento con precisión milimétrica' },
    { icon: '🏷️', title: 'Clasificación Arancelaria', description: 'Clasificamos tu mercancía correctamente, evitando errores y multas' },
    { icon: '📝', title: 'Numeración DAM', description: 'Gestionamos la Declaración Aduanera de Mercancías' },
    { icon: '💰', title: 'Liquidación de Tributos', description: 'Calculamos y gestionamos el pago de impuestos' },
    { icon: '✅', title: 'Coordinación de Vistos Buenos', description: 'Tramitamos permisos con entidades como SENASA, DIGEMID, etc.' },
    { icon: '🏭', title: 'Coordinación con Almacenes', description: 'Gestionamos directamente con depósitos temporales' },
    { icon: '📊', title: 'Seguimiento en Tiempo Real', description: 'Te informamos el estatus sin que tengas que preguntar' },
    { icon: '🧾', title: 'Facturación Inmediata', description: 'Documentos listos al momento del retiro de carga' },
];

// Por qué elegirnos
const whyChooseUs = [
    {
        icon: '💼',
        title: 'Facturación Sin Contratiempos',
        description: 'Facturación clara y puntual, sin sorpresas. Te informamos con total transparencia desde el inicio.',
        highlight: 'Tu negocio merece orden, nosotros te lo garantizamos',
    },
    {
        icon: '🎯',
        title: 'Expertise en Valoración Aduanera',
        description: 'Contamos con un equipo experto que clasifica tu mercancía correctamente, evitando errores, retrasos y penalidades.',
        highlight: 'Lo hacemos como si fuera nuestra propia carga',
    },
    {
        icon: '✅',
        title: 'Revisión Documentaria Detallada',
        description: 'Revisamos cada documento con precisión milimétrica. Desde facturas hasta certificados, todo en regla y sin estrés.',
        highlight: 'Tú nos confías tu carga, nosotros te respondemos con detalle',
    },
    {
        icon: '📍',
        title: 'Seguimiento de Carga en Tiempo Real',
        description: 'Te informamos cada paso del proceso: desde la salida hasta la entrega. Siempre sabrás dónde está tu mercancía.',
        highlight: 'Porque entendemos que detrás de cada carga hay un compromiso',
    },
];

// Proceso paso a paso
const processSteps = [
    { step: 1, title: 'Envías tu documentación', description: 'Nos envías factura, BL/AWB, packing list y documentos adicionales' },
    { step: 2, title: 'Revisamos y clasificamos', description: 'Nuestro equipo revisa los documentos y realiza la clasificación arancelaria' },
    { step: 3, title: 'Numeramos la DAM', description: 'Generamos la Declaración Aduanera de Mercancías ante SUNAT' },
    { step: 4, title: 'Liquidamos tributos', description: 'Calculamos impuestos y coordinamos el pago' },
    { step: 5, title: 'Gestionamos vistos buenos', description: 'Tramitamos permisos con entidades correspondientes' },
    { step: 6, title: 'Coordinamos el retiro', description: 'Gestionamos con almacén para que retires tu carga' },
    { step: 7, title: 'Te entregamos factura', description: 'Facturación inmediata al finalizar la operación' },
];

// Problemas que resuelve
const problemsSolved = [
    { icon: '❌', problem: 'Errores en clasificación arancelaria', solution: 'Clasificación correcta por expertos' },
    { icon: '❌', problem: 'Multas y observaciones de SUNAT', solution: 'Documentación revisada al detalle' },
    { icon: '❌', problem: 'Demoras en almacén', solution: 'Coordinación proactiva con depósitos' },
    { icon: '❌', problem: 'Sobrecostos por mala gestión', solution: 'Transparencia total en cada paso' },
    { icon: '❌', problem: 'Incertidumbre sobre tu carga', solution: 'Estatus constante sin pedirlo' },
];

// FAQ
const faqs = [
    {
        question: '¿Qué documentos necesito para iniciar el despacho?',
        answer: 'Principalmente: Factura comercial, Bill of Lading (BL) o Air Waybill (AWB), Packing List. Según el producto, pueden requerirse certificados de origen, permisos sanitarios u otros.',
    },
    {
        question: '¿Cuánto tiempo demora el proceso?',
        answer: 'Depende del canal de control asignado. Un despacho canal verde puede salir el mismo día, mientras que canal rojo puede tomar 2-3 días adicionales por aforo físico.',
    },
    {
        question: '¿Puedo hacer seguimiento a mi carga?',
        answer: 'Sí, te enviamos estatus constante durante todo el proceso. No tienes que preguntar, te informamos proactivamente en cada etapa.',
    },
    {
        question: '¿Qué pasa si hay observaciones de SUNAT?',
        answer: 'Nuestro equipo se encarga de responder las observaciones. Te explicamos la situación y gestionamos la solución para que el impacto sea mínimo.',
    },
    {
        question: '¿Cómo se cotiza el servicio?',
        answer: 'La cotización depende del tipo de despacho, valor CIF y tipo de carga. No manejamos montos fijos, cada operación se cotiza de forma personalizada.',
    },
];

export default function AgenciamientoAduanasPage() {
    return (
        <>
            {/* Hero */}
            <Hero
                title="Agenciamiento de Aduanas para Importación y Exportación"
                subtitle="Tu agente de aduanas de confianza. Despacho aduanero con atención personalizada, seguimiento en tiempo real y respuesta en menos de 1 hora."
                size="lg"
            >
                <WhatsAppLink route="agenciamiento-aduanas" serviceName="agenciamiento-aduanas" variant="button">
                    Solicitar Cotización
                </WhatsAppLink>
                <Link href="#proceso">
                    <Button variant="secondary" size="lg">
                        ¿Cómo funciona?
                    </Button>
                </Link>
            </Hero>

            {/* Trust Bar - Servicios destacados */}
            <TrustBar
                points={[
                    { icon: '📋', title: 'Revisión Documentaria', description: '★★★★★' },
                    { icon: '📍', title: 'Seguimiento de Carga', description: '★★★★★' },
                    { icon: '🏷️', title: 'Clasificación Arancelaria', description: '★★★★★' },
                    { icon: '⚡', title: 'Respuesta en 1 hora', description: 'Garantizado' },
                ]}
            />

            {/* Por qué elegirnos */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">¿Por qué elegir nuestra Agencia de Aduanas?</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            En AduanasPE, nuestra atención personalizada nos diferencia. Estas son nuestras fortalezas.
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

            {/* Qué incluye */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">¿Qué incluye el servicio?</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Cubrimos de manera integral todo el proceso de importación y exportación
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {serviceIncludes.map((item) => (
                            <div key={item.title} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
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
                        <h2 className="text-3xl font-bold text-gray-900">¿Cómo trabajamos tu importación?</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Desde el primer contacto hasta el retiro de tu carga, así funciona el proceso
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

            {/* Problemas que resuelve */}
            <SplitFeature
                title="¿Qué problemas resuelve este servicio?"
                description="Al contratar nuestro agenciamiento de aduanas, evitas los dolores de cabeza más comunes de importar."
                imageSide="right"
            >
                <div className="space-y-3">
                    {problemsSolved.map((item) => (
                        <div key={item.problem} className="flex items-start gap-3">
                            <span className="text-red-500">{item.icon}</span>
                            <div>
                                <span className="line-through text-gray-400">{item.problem}</span>
                                <span className="text-violet-600 ml-2">→ {item.solution}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </SplitFeature>

            {/* Para quién es */}
            <SplitFeature
                title="¿Este servicio es para ti?"
                description="Nuestro servicio de agenciamiento de aduanas está diseñado para:"
                imageSide="left"
            >
                <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                        <span className="text-violet-600">✓</span>
                        <span>Importadores y exportadores con carga marítima o aérea</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-violet-600">✓</span>
                        <span>Empresas con operaciones regulares o esporádicas</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-violet-600">✓</span>
                        <span>Negocios que buscan una agencia personalizada, no masiva</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-violet-600">✓</span>
                        <span>Clientes que valoran respuestas claras y asesoría continua</span>
                    </li>
                </ul>
            </SplitFeature>

            {/* Secuencia de Servicios */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">¿Cómo encaja este servicio?</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Una importación tiene 3 etapas. Estás viendo la segunda.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {/* Etapas principales */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Etapa 1 */}
                            <Link href="/servicios/agencia-de-carga-internacional" className="group block p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full mb-3">ETAPA 1</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🚢</span>
                                    <h3 className="font-bold text-gray-900">Agenciamiento de Carga</h3>
                                    <p className="text-sm text-gray-600 mt-2">Flete desde origen</p>
                                    <p className="text-xs text-green-600 font-medium mt-2">✓ Completada (si aplica)</p>
                                </div>
                            </Link>
                            {/* Etapa 2 - Actual */}
                            <div className="p-6 rounded-xl bg-violet-100 border-2 border-violet-500 shadow-lg ring-2 ring-violet-300 ring-offset-2">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-violet-600 text-white text-xs font-bold rounded-full mb-3 animate-pulse">ETAPA 2</span>
                                    <span className="text-3xl block mb-2">📋</span>
                                    <h3 className="font-bold text-gray-900">Agenciamiento de Aduanas</h3>
                                    <p className="text-sm text-gray-600 mt-2">Despacho aduanero</p>
                                    <p className="text-xs text-violet-600 font-medium mt-2">← Estás aquí</p>
                                </div>
                            </div>
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

            {/* Formulario de cotización */}
            <Container>
                <div id="cotizacion" className="py-12">
                    <PrecotizacionForm
                        title="Solicita tu cotización"
                        serviceName="agenciamiento-aduanas"
                    />
                </div>
            </Container>

            {/* CTA Final */}
            <CTASection
                title="¿Listo para importar sin complicaciones?"
                subtitle="Escríbenos y recibe una cotización personalizada en menos de 1 hora. Sin compromiso."
            >
                <WhatsAppLink route="agenciamiento-aduanas-cta" serviceName="agenciamiento-aduanas" variant="button">
                    Contactar por WhatsApp
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
