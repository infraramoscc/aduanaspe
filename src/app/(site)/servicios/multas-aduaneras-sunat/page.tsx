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
    title: 'Multas Aduaneras SUNAT | Revision de Notificaciones | AduanasPE',
    description: 'Revision de multas aduaneras, notificaciones, requerimientos y descargos ante SUNAT Aduanas para importadores y exportadores en Peru.',
    alternates: {
        canonical: 'https://aduanaspe.com/servicios/multas-aduaneras-sunat/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

const urgentCases = [
    {
        icon: '📩',
        title: 'Notificacion recibida',
        description: 'Leemos el acto, ubicamos el plazo y separamos si es requerimiento, fiscalizacion, observacion o multa.',
    },
    {
        icon: '⚖️',
        title: 'Multa aduanera',
        description: 'Identificamos codigo, supuesto, base de calculo y documentos para responder con criterio.',
    },
    {
        icon: '🔎',
        title: 'Fiscalizacion posterior',
        description: 'Ordenamos el expediente post despacho para atender pedidos de informacion sin improvisar.',
    },
    {
        icon: '📋',
        title: 'Error documental',
        description: 'Revisamos DAM, factura, permisos, valor y documentos digitalizados antes de presentar soporte.',
    },
    {
        icon: '🧾',
        title: 'Descargo o respuesta',
        description: 'Definimos que conviene sustentar, subsanar, aclarar o ampliar segun la etapa del caso.',
    },
    {
        icon: '🛡️',
        title: 'Riesgo operativo',
        description: 'Medimos si el problema tambien puede afectar levante, almacenaje, costos o futuras operaciones.',
    },
];

const whyChooseUs = [
    {
        icon: '🧭',
        title: 'Diagnostico rapido del acto recibido',
        description: 'No tratamos igual una esquela, un requerimiento, una resolucion o una comunicacion de fiscalizacion.',
        highlight: 'Primero entendemos que te notificaron',
    },
    {
        icon: '📚',
        title: 'Expediente ordenado antes de responder',
        description: 'Agrupamos DAM, factura, transporte, pagos, permisos y comunicaciones para evitar respuestas desordenadas.',
        highlight: 'Documentos con logica, no archivos sueltos',
    },
    {
        icon: '🎯',
        title: 'Separacion clara de riesgos',
        description: 'Diferenciamos si el problema es valor, permisos, tributos, factura, DAM o fiscalizacion posterior.',
        highlight: 'Cada supuesto pide una estrategia distinta',
    },
    {
        icon: '🤝',
        title: 'Acompanamiento segun alcance',
        description: 'Si el caso requiere descargo, revision tecnica o soporte adicional, definimos el alcance antes de avanzar.',
        highlight: 'Sin promesas vacias ni respuestas genericas',
    },
];

const processSteps = [
    { step: 1, title: 'Envias la notificacion', description: 'Compartes el documento recibido, DAM, factura y datos basicos de la operacion.' },
    { step: 2, title: 'Ubicamos plazo y supuesto', description: 'Revisamos que pide SUNAT, que consecuencia indica y que tipo de respuesta exige.' },
    { step: 3, title: 'Ordenamos el expediente', description: 'Separamos soporte comercial, logistico, aduanero, regulatorio y financiero.' },
    { step: 4, title: 'Definimos la ruta de respuesta', description: 'Evaluamos si corresponde sustentar, subsanar, aclarar, ampliar o preparar descargo.' },
    { step: 5, title: 'Te damos el siguiente paso', description: 'Si el caso requiere analisis profundo, te proponemos un alcance tecnico claro.' },
];

const problemsSolved = [
    { icon: '✕', problem: 'Responder sin saber que acto te notificaron', solution: 'Lectura inicial del documento y del plazo' },
    { icon: '✕', problem: 'Mandar documentos sin orden ni explicacion', solution: 'Expediente armado por tipo de riesgo' },
    { icon: '✕', problem: 'Confundir multa, ajuste de valor y requerimiento', solution: 'Separacion tecnica del supuesto observado' },
    { icon: '✕', problem: 'Llegar al ultimo dia sin estrategia', solution: 'Priorizacion por urgencia y evidencia disponible' },
    { icon: '✕', problem: 'No saber si el error puede repetirse', solution: 'Recomendaciones para corregir el flujo documental' },
];

const documentGroups = [
    {
        title: 'Acto recibido',
        items: ['Notificacion', 'Requerimiento', 'Resolucion', 'Esquela o carta'],
    },
    {
        title: 'Operacion',
        items: ['DAM', 'Factura', 'Packing list', 'Documento de transporte'],
    },
    {
        title: 'Sustento',
        items: ['Pagos', 'Permisos', 'Documentos digitalizados', 'Comunicaciones'],
    },
];

const contentLinks = [
    {
        title: 'Multas aduaneras SUNAT',
        href: '/blog/multas-aduaneras-sunat-como-evitarlas/',
        text: 'Guia principal para entender infracciones, tabla de sanciones y riesgos frecuentes.',
    },
    {
        title: 'Notificacion de SUNAT Aduanas',
        href: '/blog/notificacion-sunat-aduanas-que-hacer/',
        text: 'Que revisar el mismo dia que recibes una comunicacion de la Administracion Aduanera.',
    },
    {
        title: 'Descargo de multa aduanera',
        href: '/blog/descargo-multa-aduanera-sunat/',
        text: 'Como ordenar argumentos, documentos y tiempos antes de presentar un descargo.',
    },
];

const faqs = [
    {
        question: 'Pueden revisar una notificacion que acabo de recibir de SUNAT Aduanas?',
        answer: 'Si. Revisamos el documento, el plazo, el tipo de actuacion, el supuesto observado y la documentacion disponible para definir el siguiente paso antes de responder.',
    },
    {
        question: 'Pueden ayudarme si ya tengo una multa aduanera?',
        answer: 'Si. Primero identificamos el codigo o supuesto de infraccion, la base de calculo, el momento en que se detecto el error y si existe sustento para responder, subsanar o preparar un descargo.',
    },
    {
        question: 'Una multa aduanera siempre se puede eliminar?',
        answer: 'No conviene prometer eso sin revisar el caso. Algunas situaciones permiten sustento, subsanacion o discusion tecnica; otras requieren gestionar el riesgo y evitar que el problema crezca.',
    },
    {
        question: 'Que documentos debo enviar para empezar?',
        answer: 'Como minimo, la notificacion o resolucion recibida, DAM, factura, packing list, documento de transporte, documentos digitalizados, comunicaciones previas y cualquier soporte vinculado al problema observado.',
    },
    {
        question: 'Esto tambien aplica a exportadores?',
        answer: 'Si. Algunos supuestos documentarios de la tabla vigente tambien pueden alcanzar al exportador. La revision depende del tipo de operacion, documento observado y etapa del procedimiento.',
    },
    {
        question: 'Que diferencia hay entre este servicio y ajuste de valor?',
        answer: 'Ajuste de valor se enfoca en valor declarado, duda razonable y sustento economico. Multas aduaneras cubre notificaciones, requerimientos, infracciones, fiscalizacion y descargos de forma mas amplia.',
    },
];

export default function MultasAduanerasSunatPage() {
    const serviceJsonLd = generateServiceSchema({
        name: 'Revision de Multas Aduaneras SUNAT',
        description: 'Revision de multas aduaneras, notificaciones, requerimientos y descargos ante SUNAT Aduanas para importadores y exportadores en Peru.',
        url: 'https://aduanaspe.com/servicios/multas-aduaneras-sunat/',
    });
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Servicios', url: 'https://aduanaspe.com/servicios/' },
        { name: 'Multas Aduaneras SUNAT', url: 'https://aduanaspe.com/servicios/multas-aduaneras-sunat/' },
    ]);

    return (
        <>
            <JsonLd json={serviceJsonLd} />
            <JsonLd json={breadcrumbJsonLd} />
            <FaqJsonLd faqs={faqs} />

            <Hero
                badge="Revision de multas y notificaciones SUNAT"
                title="Te notifico SUNAT Aduanas? Revisemos tu caso antes de responder"
                highlightedWord="Revisemos"
                subtitle="Atendemos notificaciones, requerimientos, fiscalizacion posterior y multas aduaneras. Ordenamos el expediente, identificamos el riesgo y te decimos que ruta conviene seguir."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '📩', title: 'Notificaciones', description: 'Revision inicial' },
                            { icon: '⏱️', title: 'Plazos', description: 'Prioridad clara' },
                            { icon: '📚', title: 'Expediente', description: 'Documentos ordenados' },
                            { icon: '⚖️', title: 'Descargos', description: 'Criterio tecnico' },
                        ]}
                    />
                }
            >
                <WhatsAppLink route="multas-aduaneras-sunat" messageKey="asesoria_gratis" variant="button">
                    Revisar mi notificacion
                </WhatsAppLink>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href="#proceso">
                        <Button variant="secondary" size="lg">
                            Ver proceso
                        </Button>
                    </Link>
                    <Link href="/blog/multas-aduaneras-sunat-como-evitarlas/" className="text-sm text-slate-600 underline decoration-dotted underline-offset-4 transition-all hover:text-slate-950 hover:decoration-solid">
                        Entender multas aduaneras
                    </Link>
                </div>
            </Hero>

            <section className="bg-slate-50 py-20">
                <Container>
                    <div className="mb-14 text-center">
                        <span className="section-badge">Casos que atendemos</span>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Cuando SUNAT ya te escribio, el orden importa
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                            La pagina debe ayudarte a actuar con calma: primero entender el documento, luego revisar evidencia y recien despues responder.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {urgentCases.map((item, index) => {
                            const colors = ['service-pink', 'service-blue', 'service-green', 'service-orange', 'service-cyan', 'service-purple'];
                            return (
                                <article key={item.title} className={`service-card ${colors[index % colors.length]} h-full p-6`}>
                                    <span className="text-4xl">{item.icon}</span>
                                    <h3 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </Container>
            </section>

            <section className="bg-white py-20">
                <Container>
                    <div className="mb-14 text-center">
                        <span className="section-badge">Por que elegirnos</span>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Una respuesta fuerte empieza con una <span className="gradient-text">lectura correcta</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {whyChooseUs.map((item, index) => {
                            const colors = ['pink', 'blue', 'green', 'orange'];
                            return (
                                <div key={item.title} className={`service-card service-${colors[index % colors.length]} h-full p-6`}>
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl">{item.icon}</span>
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                                            <p className="mt-2 leading-7 text-slate-600">{item.description}</p>
                                            <p className="mt-3 border-l-2 border-[#D8D5FF] pl-3 text-sm italic text-slate-500">{item.highlight}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            <section id="proceso" className="bg-slate-50 py-20">
                <Container>
                    <div className="mb-14 text-center">
                        <span className="section-badge">Proceso</span>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Como trabajamos una <span className="gradient-text">notificacion aduanera</span>
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Del documento recibido a una ruta clara de respuesta.
                        </p>
                    </div>
                    <div className="mx-auto max-w-3xl">
                        {processSteps.map((item, index) => (
                            <div key={item.step} className="relative mb-6 flex gap-4">
                                <div className="z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3C3794_0%,#38BDF8_100%)] font-bold text-white shadow-lg">
                                    {item.step}
                                </div>
                                {index < processSteps.length - 1 && (
                                    <div className="absolute bottom-[-24px] left-5 top-10 -z-0 w-0.5 bg-[#ECEBFF]" />
                                )}
                                <div className="flex-1 pb-6 pl-2 pt-1">
                                    <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                                    <p className="mt-1 text-slate-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <SplitFeature
                title="Que documentos revisamos antes de responder"
                description="No todos los anexos pesan igual. Primero ubicamos que esta cuestionando SUNAT y luego armamos el sustento alrededor de ese punto."
                imageSide="right"
                image={
                    <div className="service-card service-card-spacious service-blue">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.12),transparent_26%),radial-gradient(circle_at_left,rgba(56,189,248,0.1),transparent_24%)]" />
                        <div className="relative grid gap-4">
                            {documentGroups.map((group, index) => (
                                <div key={group.title} className={`service-card service-card-roomy ${index === 1 ? 'service-purple text-white' : 'service-cyan'}`}>
                                    <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${index === 1 ? 'text-slate-300' : 'text-slate-500'}`}>
                                        Bloque {index + 1}
                                    </p>
                                    <h3 className="mt-3 text-xl font-bold">{group.title}</h3>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {group.items.map((item) => (
                                            <span key={item} className={`rounded-full px-3 py-1 text-xs font-semibold ${index === 1 ? 'bg-white/10 text-white' : 'bg-white text-slate-700 shadow-sm'}`}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            >
                <div className="grid gap-3 sm:grid-cols-2">
                    {[
                        'Notificacion, requerimiento o resolucion',
                        'DAM, factura, packing list y transporte',
                        'Valor, pagos, flete, seguro y tributos',
                        'Permisos, VUCE o documentos sectoriales',
                        'Comunicaciones con proveedor u operador',
                        'Plazos, subsanaciones y respuestas previas',
                    ].map((item) => (
                        <div key={item} className="service-card service-card-compact service-cyan p-4 text-sm font-semibold text-slate-700">
                            {item}
                        </div>
                    ))}
                </div>
            </SplitFeature>

            <SplitFeature
                title="Que problemas evita este servicio"
                description="El objetivo no es responder mas rapido, sino responder mejor: con el supuesto claro, el expediente completo y una ruta de accion razonable."
                imageSide="left"
            >
                <div className="space-y-3">
                    {problemsSolved.map((item) => (
                        <div key={item.problem} className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50">
                            <span className="mt-1 text-red-500">{item.icon}</span>
                            <div>
                                <span className="block text-sm text-slate-400 line-through">{item.problem}</span>
                                <span className="block font-medium text-[#3C3794]">→ {item.solution}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </SplitFeature>

            <section className="bg-white py-20">
                <Container>
                    <div className="mb-14 text-center">
                        <span className="section-badge">Flujo de decision</span>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Elige la ruta segun el <span className="gradient-text">problema real</span>
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Asi evitamos que multas, ajuste de valor y consultoria general compitan entre si.
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="service-card service-purple p-6 text-center ring-2 ring-[#D8D5FF] ring-offset-2">
                            <span className="mb-3 inline-block rounded-full bg-[#3C3794] px-3 py-1 text-xs font-bold text-white">ESTAS AQUI</span>
                            <span className="mb-2 block text-3xl">⚖️</span>
                            <h3 className="font-bold text-slate-900">Multas y notificaciones</h3>
                            <p className="mt-2 text-sm text-slate-600">Cuando SUNAT ya te notifico o existe riesgo sancionador.</p>
                        </div>
                        <Link href="/servicios/ajuste-de-valor-aduanero" className="service-card service-card-compact service-cyan group block p-6 text-center">
                            <span className="mb-3 inline-block rounded-full bg-slate-400 px-3 py-1 text-xs font-bold text-white">RUTA ESPECIFICA</span>
                            <span className="mb-2 block text-3xl transition-transform group-hover:scale-110">🧾</span>
                            <h3 className="font-bold text-slate-900">Ajuste de valor</h3>
                            <p className="mt-2 text-sm text-slate-600">Si el problema principal es valor declarado o duda razonable.</p>
                        </Link>
                        <Link href="/servicios/consultoria-aduanera" className="service-card service-card-compact service-blue group block p-6 text-center">
                            <span className="mb-3 inline-block rounded-full bg-slate-400 px-3 py-1 text-xs font-bold text-white">PREVENTIVO</span>
                            <span className="mb-2 block text-3xl transition-transform group-hover:scale-110">💡</span>
                            <h3 className="font-bold text-slate-900">Consultoria aduanera</h3>
                            <p className="mt-2 text-sm text-slate-600">Si quieres prevenir errores antes de comprar, embarcar o numerar.</p>
                        </Link>
                    </div>
                </Container>
            </section>

            <section className="bg-slate-50 py-20">
                <Container>
                    <div className="mb-14 text-center">
                        <span className="section-badge">Recursos</span>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Guias para entender tu <span className="gradient-text">notificacion</span>
                        </h2>
                    </div>
                    <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
                        {contentLinks.map((resource) => (
                            <Link key={resource.href} href={resource.href} className="service-card service-card-compact service-green group block p-6">
                                <h3 className="text-lg font-bold text-slate-900">{resource.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600">{resource.text}</p>
                                <p className="mt-4 text-sm font-semibold text-[#3C3794] group-hover:underline">Leer guia →</p>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-white py-20">
                <Container>
                    <div className="mb-14 text-center">
                        <span className="section-badge">Ayuda</span>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Preguntas <span className="gradient-text">frecuentes</span>
                        </h2>
                    </div>
                    <div className="mx-auto max-w-3xl space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="service-card service-card-compact service-blue p-6">
                                <h4 className="text-lg font-semibold text-slate-900">{faq.question}</h4>
                                <p className="mt-2 text-slate-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <Container>
                <div id="cotizacion" className="py-16">
                    <PrecotizacionForm
                        title="Solicita revision de tu notificacion"
                        serviceName="multas-aduaneras-sunat"
                    />
                </div>
            </Container>

            <RecommendedReading
                title="Lecturas para preparar mejor tu respuesta"
                subtitle="Si todavia estas identificando el riesgo, estas guias te ayudan a ordenar el caso antes de enviar documentos."
                slugs={[
                    'notificacion-sunat-aduanas-que-hacer',
                    'requerimiento-aduanero-sunat-como-responder',
                    'descargo-multa-aduanera-sunat',
                ]}
            />

            <CTASection
                title="No respondas una notificacion aduanera a ciegas"
                highlightedWord="notificacion"
                subtitle="Envianos el documento recibido y revisamos contigo el plazo, el riesgo y los documentos que conviene ordenar antes de actuar."
                variant="secondary"
            >
                <WhatsAppLink route="multas-aduaneras-sunat-final" messageKey="asesoria_gratis" variant="button">
                    Revisar mi caso por WhatsApp
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
