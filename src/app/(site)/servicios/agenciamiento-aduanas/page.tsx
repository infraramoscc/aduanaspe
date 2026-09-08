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
    title: 'Agenciamiento de Aduanas en Perú | Despacho y seguimiento',
    description: 'Nos encargamos de tu despacho aduanero: revisión de documentos, clasificación arancelaria, DAM, tributos y coordinación con SUNAT y almacenes.',
    alternates: {
        canonical: 'https://aduanaspe.com/servicios/agenciamiento-aduanas/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

// Qué incluye el servicio
const serviceIncludes = [
    { title: 'Revisión de documentos', description: 'Comprobamos factura, documento de transporte, packing list y los requisitos de tu mercancía.' },
    { title: 'Clasificación arancelaria', description: 'Revisamos qué partida corresponde y qué condiciones se aplican a tu producto.' },
    { title: 'Numeración de la DAM', description: 'Preparamos y presentamos la declaración aduanera con la información de la operación.' },
    { title: 'Cálculo de tributos', description: 'Te explicamos los impuestos y coordinamos el pago antes de continuar.' },
    { title: 'Permisos y vistos buenos', description: 'Si tu producto lo requiere, coordinamos con la entidad correspondiente.' },
    { title: 'Coordinación con el almacén', description: 'Gestionamos las comunicaciones necesarias para avanzar con el despacho y el retiro.' },
    { title: 'Seguimiento del despacho', description: 'Te informamos qué etapa está en curso y qué necesitamos de tu parte.' },
    { title: 'Cierre de la operación', description: 'Ordenamos la documentación final y confirmamos los siguientes pasos para el retiro.' },
];

// Por qué elegirnos
const whyChooseUs = [
    {
        title: 'Un responsable para tu operación',
        description: 'No tienes que averiguar con quién hablar en cada etapa. Un ejecutivo sigue tu operación y te explica qué viene después.',
        highlight: 'Tienes un punto de contacto desde el inicio.',
    },
    {
        title: 'Revisamos antes de presentar',
        description: 'Contrastamos los documentos y la información de la mercancía antes de numerar la declaración.',
        highlight: 'Es mejor detectar una diferencia antes de enviarla a SUNAT.',
    },
    {
        title: 'Te hablamos claro',
        description: 'Si falta un documento, aparece una observación o cambia el plazo, te contamos qué ocurre y qué opciones tienes.',
        highlight: 'Sin respuestas ambiguas ni términos innecesarios.',
    },
    {
        title: 'Coordinamos las partes del despacho',
        description: 'Mantenemos conectados los documentos, SUNAT, el almacén y el retiro para que la operación no dependa de llamadas sueltas.',
        highlight: 'Tú recibes el estado de la operación en un solo lugar.',
    },
];

// Proceso paso a paso
const processSteps = [
    { step: 1, title: 'Nos cuentas sobre tu operación', description: 'Cuéntanos qué estás importando o exportando, de dónde viene y en qué etapa se encuentra.' },
    { step: 2, title: 'Revisamos los documentos', description: 'Validamos la información disponible y te avisamos si falta algo antes de numerar.' },
    { step: 3, title: 'Preparamos el despacho', description: 'Definimos la clasificación, calculamos los tributos y presentamos la DAM.' },
    { step: 4, title: 'Coordinamos el control y el retiro', description: 'Atendemos el canal asignado y coordinamos con el almacén o las entidades que correspondan.' },
    { step: 5, title: 'Te confirmamos el cierre', description: 'Te entregamos la documentación final y dejamos claro cómo continúa el retiro o transporte.' },
];

// Problemas que resuelve
const problemsSolved = [
    { problem: 'No sabes si los documentos están completos', solution: 'Los revisamos antes de presentar la declaración' },
    { problem: 'Tienes dudas sobre la partida o los tributos', solution: 'Revisamos el producto y te explicamos el cálculo' },
    { problem: 'SUNAT formula una observación', solution: 'Te explicamos qué solicita y coordinamos la atención' },
    { problem: 'El almacén y el retiro no avanzan', solution: 'Centralizamos la coordinación para identificar el pendiente' },
    { problem: 'Nadie te informa en qué etapa está el despacho', solution: 'Recibes actualizaciones y sabes qué viene después' },
];

// FAQ
const faqs = [
    {
        question: '¿Qué documentos necesito para iniciar el despacho?',
        answer: 'Para empezar solemos pedir la factura comercial, el documento de transporte —BL o AWB— y el packing list. Dependiendo del producto, también pueden hacer falta permisos, certificados u otros documentos. Si todavía no los tienes todos, revisamos contigo qué falta.',
    },
    {
        question: '¿Cuánto tiempo demora el proceso?',
        answer: 'Depende de la documentación, los permisos, el almacén y el canal de control que asigne SUNAT. Antes de darte una fecha cerrada revisamos el caso y te indicamos qué puede afectar el plazo.',
    },
    {
        question: '¿Puedo hacer seguimiento a mi carga?',
        answer: 'Sí. Tu ejecutivo te informa cuando el despacho cambia de etapa y te avisa si necesitamos un documento, un pago o una decisión de tu parte.',
    },
    {
        question: '¿Qué pasa si hay observaciones de SUNAT?',
        answer: 'Primero revisamos qué observó SUNAT y qué sustento existe. Luego te explicamos el escenario y coordinamos la respuesta que corresponda según el alcance del servicio.',
    },
    {
        question: '¿Cómo se cotiza el servicio?',
        answer: 'Necesitamos conocer el tipo de carga, el régimen, el valor y el estado de los documentos. Con esa información te enviamos una cotización acorde con la operación, sin asumir servicios que quizá no necesitas.',
    },
];

export default function AgenciamientoAduanasPage() {
    const serviceJsonLd = generateServiceSchema({
        name: 'Agenciamiento de Aduanas en Peru',
        description: 'Despacho aduanero para importacion y exportacion con revision documentaria, clasificacion arancelaria y seguimiento claro de la operacion.',
        url: 'https://aduanaspe.com/servicios/agenciamiento-aduanas/',
    });
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Servicios', url: 'https://aduanaspe.com/servicios/' },
        { name: 'Agenciamiento de Aduanas', url: 'https://aduanaspe.com/servicios/agenciamiento-aduanas/' },
    ]);

    return (
        <>
            <JsonLd json={serviceJsonLd} />
            <JsonLd json={breadcrumbJsonLd} />
            <FaqJsonLd faqs={faqs} />
            {/* Hero */}
            <Hero
                badge="Agenciamiento de Aduanas"
                title="Nos encargamos de tu despacho aduanero de principio a fin"
                highlightedWord="despacho aduanero"
                subtitle="Revisamos tus documentos, preparamos la declaración, coordinamos con SUNAT y el almacén, y te mantenemos informado durante la operación."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { title: 'Documentos revisados', description: 'Antes de numerar la DAM' },
                            { title: 'Ejecutivo asignado', description: 'Un contacto para tu operación' },
                            { title: 'Seguimiento claro', description: 'Sabes qué etapa está en curso' },
                            { title: 'Respuesta en 1 hora', description: 'En horario de atención' },
                        ]}
                    />
                }
            >
                <WhatsAppLink route="agenciamiento-aduanas" serviceName="agenciamiento-aduanas" variant="button">
                    Cuéntanos sobre tu carga
                </WhatsAppLink>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="#proceso">
                        <Button variant="secondary" size="lg">
                            Ver cómo trabajamos
                        </Button>
                    </Link>
                    <Link href="/blog/todo-sobre-agencias-de-aduanas" className="text-sm text-slate-300 hover:text-white underline decoration-dotted underline-offset-4 hover:decoration-solid transition-all">
                        Primero quiero entender el servicio
                    </Link>
                </div>
            </Hero>

            {/* Trust Bar integrated into Hero */}

            {/* Por qué elegirnos */}
            <section className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">¿Por qué elegirnos?</span>
                        <h2 className="text-3xl font-bold text-slate-900">No deberías perseguir a varias personas para saber qué pasa</h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Centralizamos el despacho y te explicamos cada decisión con palabras claras.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {whyChooseUs.map((item, index) => {
                            const colors = ['pink', 'blue', 'green', 'orange'];
                            const colorClass = colors[index % colors.length];
                            return (
                                <div key={item.title} className={`service-card service-${colorClass} h-full p-6`}>
                                    <div className="flex items-start gap-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                                            <p className="mt-2 text-slate-600">{item.description}</p>
                                            <p className="mt-3 text-sm italic text-slate-500 border-l-2 border-[#D8D5FF] pl-2">{item.highlight}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Qué incluye */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Cobertura Total</span>
                        <h2 className="text-3xl font-bold text-slate-900">Esto es lo que hacemos en tu despacho</h2>
                        <p className="mt-4 text-lg text-slate-600">
                            El alcance exacto depende de tu operación, pero estas son las coordinaciones habituales.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {serviceIncludes.map((item) => (
                            <div key={item.title} className="service-card service-card-compact service-cyan p-4">
                                <h4 className="mt-2 font-semibold text-slate-900">{item.title}</h4>
                                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Proceso */}
            <section id="proceso" className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Proceso</span>
                        <h2 className="text-3xl font-bold text-slate-900">Así avanzamos contigo</h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Primero entendemos el caso. Después presentamos, coordinamos y cerramos el despacho.
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {processSteps.map((item, index) => (
                            <div key={item.step} className="flex gap-4 mb-6 relative">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[linear-gradient(135deg,#3C3794_0%,#38BDF8_100%)] text-white flex items-center justify-center font-bold z-10 shadow-lg">
                                    {item.step}
                                </div>
                                {/* Línea conectora */}
                                {index < processSteps.length - 1 && (
                                    <div className="absolute left-5 top-10 bottom-[-24px] w-0.5 bg-[#ECEBFF] -z-0"></div>
                                )}
                                <div className="flex-1 pb-6 pt-1 pl-2">
                                    <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                                    <p className="mt-1 text-slate-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Problemas que resuelve */}
            <SplitFeature
                title="Cuando el despacho se complica, estas son las dudas más comunes"
                description="No todo problema se resuelve igual. Identificamos el pendiente y te decimos qué acción corresponde."
                imageSide="right"
            >
                <div className="space-y-3">
                    {problemsSolved.map((item) => (
                        <div key={item.problem} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                            <div>
                                <span className="line-through text-slate-400 block text-sm">{item.problem}</span>
                                <span className="text-[#3C3794] font-medium block">→ {item.solution}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </SplitFeature>

            {/* Para quién es */}
            <SplitFeature
                title="Podemos ayudarte si ya tienes una operación en marcha"
                description="Este servicio tiene sentido cuando necesitas ejecutar o coordinar un despacho formal de importación o exportación."
                imageSide="left"
            >
                <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-2">
                        <span className="text-[#3C3794] mt-1">✓</span>
                        <span>Tienes carga marítima o aérea próxima a llegar o salir</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#3C3794] mt-1">✓</span>
                        <span>Necesitas revisar documentos antes de presentar la DAM</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#3C3794] mt-1">✓</span>
                        <span>Quieres un responsable que centralice la coordinación</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#3C3794] mt-1">✓</span>
                        <span>Prefieres entender el estado del despacho sin perseguir respuestas</span>
                    </li>
                </ul>
            </SplitFeature>

            {/* Secuencia de Servicios */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Flujo de Trabajo</span>
                        <h2 className="text-3xl font-bold text-slate-900">Tu despacho no ocurre de forma aislada</h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Si también necesitas traer la carga desde origen o entregarla en tu almacén, podemos coordinar esas etapas contigo.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {/* Etapas principales */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Etapa 1 */}
                            <Link href="/servicios/agencia-de-carga-internacional" className="service-card service-card-compact service-blue group block p-6">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full mb-3">ETAPA 1</span>
                                    <h3 className="font-bold text-slate-900">Agenciamiento de Carga</h3>
                                    <p className="text-sm text-slate-600 mt-2">Flete desde origen</p>
                                    <p className="text-xs text-green-600 font-medium mt-2">✓ Completada (si aplica)</p>
                                </div>
                            </Link>
                            {/* Etapa 2 - Actual */}
                            <div className="service-card service-purple p-6 text-center ring-2 ring-[#D8D5FF] ring-offset-2 scale-105">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-[#3C3794] text-white text-xs font-bold rounded-full mb-3">ETAPA 2</span>
                                    <h3 className="font-bold text-slate-900">Agenciamiento de Aduanas</h3>
                                    <p className="text-sm text-slate-600 mt-2">Despacho aduanero</p>
                                    <p className="text-xs text-[#3C3794] font-medium mt-2">← Estás aquí</p>
                                </div>
                            </div>
                            {/* Etapa 3 */}
                            <Link href="/servicios/transporte-de-carga" className="service-card service-card-compact service-blue group block p-6">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-slate-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 3</span>
                                    <h3 className="font-bold text-slate-900">Transporte de Carga</h3>
                                    <p className="text-sm text-slate-600 mt-2">Entrega en tu almacén</p>
                                    <p className="text-xs text-blue-600 font-medium mt-2">Ver servicio →</p>
                                </div>
                            </Link>
                        </div>

                        {/* Servicios Opcionales */}
                        <div className="mt-12">
                            <div className="text-center mb-6">
                                <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full">
                                    Servicios adicionales que puedes contratar cuando los necesites
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Consultoría Aduanera */}
                                <Link href="/servicios/consultoria-aduanera" className="service-card service-card-compact service-cyan group flex items-center gap-4 p-5">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900">Consultoría Aduanera</h4>
                                            <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full">OPCIONAL</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-1">Revisión técnica para resolver una decisión o contingencia concreta</p>
                                        <p className="text-xs text-blue-600 font-medium mt-1 group-hover:underline">Ver más →</p>
                                    </div>
                                </Link>
                                {/* Resguardo Aduanero */}
                                <Link href="/servicios/resguardo-aduanero" className="service-card service-card-compact service-orange group flex items-center gap-4 p-5">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                        <div className="mt-8 p-8 rounded-xl bg-[linear-gradient(135deg,#3C3794_0%,#2F2B77_62%,#38BDF8_100%)] text-white text-center shadow-xl">
                                <h3 className="text-2xl font-bold">¿También necesitas carga internacional o transporte?</h3>
                                <p className="mt-2 text-blue-100 text-lg">Podemos coordinar las etapas necesarias y mantener un solo punto de contacto para tu operación.</p>
                            <div className="mt-6">
                                <WhatsAppLink route="servicio-integral" serviceName="servicio-integral" variant="button">
                                        Revisar mi operación completa
                                </WhatsAppLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Ayuda</span>
                        <h2 className="text-3xl font-bold text-slate-900">Lo que normalmente nos preguntan</h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="service-card service-card-compact service-blue p-6">
                                <h4 className="font-semibold text-slate-900 text-lg">{faq.question}</h4>
                                <p className="mt-2 text-slate-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Formulario de cotización */}
            <Container>
                <div id="cotizacion" className="py-16">
                    <PrecotizacionForm
                        title="Cuéntanos qué necesitas despachar"
                        serviceName="agenciamiento-aduanas"
                    />
                </div>
            </Container>

            <RecommendedReading
                title="Guías para llegar mejor preparado al despacho"
                subtitle="Si todavía estás revisando costos, permisos o qué operador necesitas, empieza por estas lecturas."
                slugs={[
                    'como-importar-por-primera-vez-en-peru',
                    'agente-de-aduanas-vs-agencia-de-carga',
                    'como-saber-si-tu-producto-necesita-permisos-para-importar-en-peru',
                ]}
            />

            {/* CTA Final */}
            <CTASection
                title="¿Revisamos tu próxima operación?"
                highlightedWord="próxima operación"
                subtitle="Cuéntanos qué mercancía estás moviendo y en qué etapa te encuentras. Te respondemos en menos de una hora dentro del horario de atención."
            >
                <WhatsAppLink route="agenciamiento-aduanas-cta" serviceName="agenciamiento-aduanas" variant="button">
                    Contarnos el caso por WhatsApp
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
