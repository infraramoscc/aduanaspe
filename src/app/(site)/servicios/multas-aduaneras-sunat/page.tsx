import type { Metadata } from 'next';
import Link from 'next/link';
import { RecommendedReading } from '@/components/blog';
import { Hero, CTASection, TrustBar } from '@/components/sections';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { PrecotizacionForm } from '@/components/forms';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';
import { JsonLd } from '@/components/seo/JsonLd';
import { ROUTES } from '@/lib/routes';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Multas Aduaneras SUNAT | Revisión de Notificaciones | AduanasPE',
    description: 'Revisión de multas aduaneras, notificaciones, requerimientos y descargos ante SUNAT Aduanas para importadores y exportadores en Perú.',
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
        title: 'Notificación recibida',
        description: 'Leemos el acto, ubicamos el plazo y separamos si es requerimiento, fiscalización, observación o multa.',
    },
    {
        icon: '⚖️',
        title: 'Multa aduanera',
        description: 'Identificamos código, supuesto, base de cálculo y documentos para responder con criterio.',
    },
    {
        icon: '🔎',
        title: 'Fiscalización posterior',
        description: 'Ordenamos el expediente post despacho para atender pedidos de información sin improvisar.',
    },
    {
        icon: '📋',
        title: 'Error documental',
        description: 'Revisamos DAM, factura, permisos, valor y documentos digitalizados antes de presentar soporte.',
    },
    {
        icon: '🧾',
        title: 'Descargo o respuesta',
        description: 'Definimos qué conviene sustentar, subsanar, aclarar o ampliar según la etapa del caso.',
    },
    {
        icon: '🛡️',
        title: 'Riesgo operativo',
        description: 'Medimos si el problema también puede afectar levante, almacenaje, costos o futuras operaciones.',
    },
];

const whyChooseUs = [
    {
        icon: '🧭',
        title: 'Diagnóstico rápido del acto recibido',
        description: 'No tratamos igual una esquela, un requerimiento, una resolución o una comunicación de fiscalización.',
        highlight: 'Primero entendemos qué te notificaron',
    },
    {
        icon: '📚',
        title: 'Expediente ordenado antes de responder',
        description: 'Agrupamos DAM, factura, transporte, pagos, permisos y comunicaciones para evitar respuestas desordenadas.',
        highlight: 'Documentos con lógica, no archivos sueltos',
    },
    {
        icon: '🎯',
        title: 'Separación clara de riesgos',
        description: 'Diferenciamos si el problema es valor, permisos, tributos, factura, DAM o fiscalización posterior.',
        highlight: 'Cada supuesto pide una estrategia distinta',
    },
    {
        icon: '🤝',
        title: 'Acompañamiento según alcance',
        description: 'Si el caso requiere descargo, revisión técnica o soporte adicional, definimos el alcance antes de avanzar.',
        highlight: 'Sin promesas vacías ni respuestas genéricas',
    },
];

const processSteps = [
    { step: 1, title: 'Envías la notificación', description: 'Compartes el documento recibido, DAM, factura y datos básicos de la operación.' },
    { step: 2, title: 'Ubicamos plazo y supuesto', description: 'Revisamos qué pide SUNAT, qué consecuencia indica y qué tipo de respuesta exige.' },
    { step: 3, title: 'Ordenamos el expediente', description: 'Separamos soporte comercial, logístico, aduanero, regulatorio y financiero.' },
    { step: 4, title: 'Definimos la ruta de respuesta', description: 'Evaluamos si corresponde sustentar, subsanar, aclarar, ampliar o preparar descargo.' },
    { step: 5, title: 'Te damos el siguiente paso', description: 'Si el caso requiere análisis profundo, te proponemos un alcance técnico claro.' },
];

const documentFlow = [
    {
        step: '1',
        title: 'Envíanos lo que recibiste',
        text: 'No necesitas tener todo perfecto para empezar. Con el documento de SUNAT y los soportes principales podemos ubicar el caso, el plazo y la operación relacionada.',
        items: ['Notificación o resolución', 'DAM', 'Factura', 'Documento de transporte'],
    },
    {
        step: '2',
        title: 'Revisamos qué está cuestionando SUNAT',
        text: 'Separamos si el problema es de valor, tributos, permisos, factura, datos de la DAM, documentación digitalizada o fiscalización posterior.',
        items: ['Plazo', 'Supuesto de infracción', 'Valor o tributos', 'Permisos o VUCE'],
    },
    {
        step: '3',
        title: 'Te damos una ruta clara',
        text: 'Al final sabes qué falta, qué riesgo existe y cuál es el siguiente paso razonable antes de enviar una respuesta o preparar un descargo.',
        items: ['Riesgo principal', 'Documentos faltantes', 'Siguiente acción', 'Alcance si aplica'],
    },
];

const checklistItems = [
    'Notificación, requerimiento o resolución',
    'DAM, factura, packing list y transporte',
    'Valor, pagos, flete, seguro y tributos',
    'Permisos, VUCE o documentos sectoriales',
    'Comunicaciones con proveedor u operador',
    'Plazos, subsanaciones y respuestas previas',
];

const problemsSolved = [
    {
        step: '01',
        title: 'Entiendes qué te notificaron antes de responder',
        text: 'No todas las comunicaciones de SUNAT significan lo mismo. Primero identificamos si se trata de una carta, requerimiento, fiscalización, resolución o multa, porque cada documento exige una respuesta distinta.',
    },
    {
        step: '02',
        title: 'Ordenas los documentos que sí ayudan al caso',
        text: 'Evitas enviar archivos por enviar. Revisamos DAM, factura, transporte, pagos, permisos y comunicaciones según el punto observado para que la respuesta tenga coherencia.',
    },
    {
        step: '03',
        title: 'Separas multas, valor, permisos y errores documentarios',
        text: 'Un ajuste de valor no se defiende igual que una multa por documento, una mercancía restringida o un dato incorrecto en la DAM. Separar el problema evita respuestas débiles.',
    },
    {
        step: '04',
        title: 'Priorizas lo urgente sin perder el sustento',
        text: 'Si el plazo está cerca, definimos qué debe resolverse primero y qué evidencia falta. La idea es responder a tiempo sin improvisar ni dejar puntos importantes fuera.',
    },
    {
        step: '05',
        title: 'Sales con una decisión práctica',
        text: 'Después de revisar el expediente, te indicamos si conviene sustentar, subsanar, aclarar, ampliar información o preparar un descargo más completo.',
    },
];

const contentLinks = [
    {
        title: 'Multas aduaneras SUNAT',
        href: '/blog/multas-aduaneras-sunat-como-evitarlas/',
        text: 'Guía principal para entender infracciones, tabla de sanciones y riesgos frecuentes.',
    },
    {
        title: 'Notificación de SUNAT Aduanas',
        href: '/blog/notificacion-sunat-aduanas-que-hacer/',
        text: 'Qué revisar el mismo día que recibes una comunicación de la Administración Aduanera.',
    },
    {
        title: 'Descargo de multa aduanera',
        href: '/blog/descargo-multa-aduanera-sunat/',
        text: 'Cómo ordenar argumentos, documentos y tiempos antes de presentar un descargo.',
    },
];

const faqs = [
    {
        question: '¿Pueden revisar una notificación que acabo de recibir de SUNAT Aduanas?',
        answer: 'Sí. Revisamos el documento, el plazo, el tipo de actuación, el supuesto observado y la documentación disponible para definir el siguiente paso antes de responder.',
    },
    {
        question: '¿Pueden ayudarme si ya tengo una multa aduanera?',
        answer: 'Sí. Primero identificamos el código o supuesto de infracción, la base de cálculo, el momento en que se detectó el error y si existe sustento para responder, subsanar o preparar un descargo.',
    },
    {
        question: '¿Una multa aduanera siempre se puede eliminar?',
        answer: 'No conviene prometer eso sin revisar el caso. Algunas situaciones permiten sustento, subsanación o discusión técnica; otras requieren gestionar el riesgo y evitar que el problema crezca.',
    },
    {
        question: '¿Qué documentos debo enviar para empezar?',
        answer: 'Como mínimo, la notificación o resolución recibida, DAM, factura, packing list, documento de transporte, documentos digitalizados, comunicaciones previas y cualquier soporte vinculado al problema observado.',
    },
    {
        question: '¿Esto también aplica a exportadores?',
        answer: 'Sí. Algunos supuestos documentarios de la tabla vigente también pueden alcanzar al exportador. La revisión depende del tipo de operación, documento observado y etapa del procedimiento.',
    },
    {
        question: '¿Qué diferencia hay entre este servicio y ajuste de valor?',
        answer: 'Ajuste de valor se enfoca en valor declarado, duda razonable y sustento económico. Multas aduaneras cubre notificaciones, requerimientos, infracciones, fiscalización y descargos de forma más amplia.',
    },
];

export default function MultasAduanerasSunatPage() {
    const serviceJsonLd = generateServiceSchema({
        name: 'Revisión de Multas Aduaneras SUNAT',
        description: 'Revisión de multas aduaneras, notificaciones, requerimientos y descargos ante SUNAT Aduanas para importadores y exportadores en Perú.',
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
                badge="Revisión de multas y notificaciones SUNAT"
                title="¿Te notificó SUNAT Aduanas? Revisemos tu caso antes de responder"
                highlightedWord="Revisemos"
                subtitle="Atendemos notificaciones, requerimientos, fiscalización posterior y multas aduaneras. Ordenamos el expediente, identificamos el riesgo y te decimos qué ruta conviene seguir."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '📩', title: 'Notificaciones', description: 'Revisión inicial' },
                            { icon: '⏱️', title: 'Plazos', description: 'Prioridad clara' },
                            { icon: '📚', title: 'Expediente', description: 'Documentos ordenados' },
                            { icon: '⚖️', title: 'Descargos', description: 'Criterio técnico' },
                        ]}
                    />
                }
            >
                <WhatsAppLink route="multas-aduaneras-sunat" messageKey="asesoria_gratis" variant="button">
                    Revisar mi notificación
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
                            Cuando SUNAT ya te escribió, el orden importa
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                            Primero entendemos el documento, luego revisamos evidencia y recién después definimos cómo responder.
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
                        <span className="section-badge">Por qué elegirnos</span>
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
                            Cómo trabajamos una <span className="gradient-text">notificación aduanera</span>
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

            <section className="bg-white py-20">
                <Container>
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <span className="section-badge">Documentos</span>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                            Qué enviar y qué hacemos con tus documentos
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            No buscamos que el cliente adivine qué presentar. La idea es avanzar con una lectura simple: primero vemos lo que recibiste, luego ordenamos el expediente y finalmente definimos el siguiente paso.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {documentFlow.map((group) => (
                            <article key={group.title} className="service-card service-card-spacious service-blue h-full p-7">
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3C3794] text-sm font-bold text-white shadow-sm">
                                    {group.step}
                                </span>
                                <h3 className="mt-6 text-2xl font-bold text-slate-950">{group.title}</h3>
                                <p className="mt-4 text-base leading-8 text-slate-600">{group.text}</p>
                                <div className="mt-6 space-y-3">
                                    {group.items.map((item) => (
                                        <div key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                        <h3 className="text-xl font-bold text-slate-950">Documentos que normalmente ayudan a empezar</h3>
                        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                            Si tienes algunos de estos soportes, envíalos. Si falta alguno, igual podemos iniciar la revisión y decirte qué conviene completar.
                        </p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {checklistItems.map((item) => (
                                <div key={item} className="rounded-2xl border border-white bg-white p-4 text-sm font-semibold leading-6 text-slate-700 shadow-sm">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-slate-50 py-20">
                <Container>
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <span className="section-badge">Lectura clara</span>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                            Qué problemas evita este servicio
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            Cuando llega una notificación de SUNAT, el mayor riesgo es contestar rápido sin entender el fondo. Esta revisión ayuda a bajar la ansiedad y convertir el caso en pasos concretos.
                        </p>
                    </div>

                    <div className="mx-auto max-w-5xl space-y-5">
                        {problemsSolved.map((item) => (
                            <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#D8D5FF] hover:shadow-md md:p-8">
                                <div className="flex flex-col gap-5 md:flex-row md:items-start">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-sm font-bold text-[#3C3794]">
                                        {item.step}
                                    </span>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-950">{item.title}</h3>
                                        <p className="mt-3 text-base leading-8 text-slate-600">{item.text}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mx-auto mt-8 max-w-5xl rounded-3xl border border-emerald-100 bg-emerald-50 p-6 md:p-8">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Resultado esperado</p>
                        <h3 className="mt-3 text-2xl font-bold text-slate-950">
                            Una respuesta más clara, sustentada y a tiempo
                        </h3>
                        <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
                            El cliente termina entendiendo qué está en discusión, qué documentos faltan y si corresponde sustentar, subsanar, aclarar, ampliar información o preparar un descargo.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="bg-white py-20">
                <Container>
                    <div className="mb-14 text-center">
                        <span className="section-badge">Flujo de decisión</span>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Elige la ruta según el <span className="gradient-text">problema real</span>
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Así evitamos que multas, ajuste de valor y consultoría general compitan entre sí.
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="service-card service-purple p-6 text-center ring-2 ring-[#D8D5FF] ring-offset-2">
                            <span className="mb-3 inline-block rounded-full bg-[#3C3794] px-3 py-1 text-xs font-bold text-white">ESTÁS AQUÍ</span>
                            <span className="mb-2 block text-3xl">⚖️</span>
                            <h3 className="font-bold text-slate-900">Multas y notificaciones</h3>
                            <p className="mt-2 text-sm text-slate-600">Cuando SUNAT ya te notificó o existe riesgo sancionador.</p>
                        </div>
                        <Link href="/servicios/ajuste-de-valor-aduanero" className="service-card service-card-compact service-cyan group block p-6 text-center">
                            <span className="mb-3 inline-block rounded-full bg-slate-400 px-3 py-1 text-xs font-bold text-white">RUTA ESPECÍFICA</span>
                            <span className="mb-2 block text-3xl transition-transform group-hover:scale-110">🧾</span>
                            <h3 className="font-bold text-slate-900">Ajuste de valor</h3>
                            <p className="mt-2 text-sm text-slate-600">Si el problema principal es valor declarado o duda razonable.</p>
                        </Link>
                        <Link href="/servicios/consultoria-aduanera" className="service-card service-card-compact service-blue group block p-6 text-center">
                            <span className="mb-3 inline-block rounded-full bg-slate-400 px-3 py-1 text-xs font-bold text-white">PREVENTIVO</span>
                            <span className="mb-2 block text-3xl transition-transform group-hover:scale-110">💡</span>
                            <h3 className="font-bold text-slate-900">Consultoría aduanera</h3>
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
                            Guías para entender tu <span className="gradient-text">notificación</span>
                        </h2>
                    </div>
                    <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
                        {contentLinks.map((resource) => (
                            <Link key={resource.href} href={resource.href} className="service-card service-card-compact service-green group block p-6">
                                <h3 className="text-lg font-bold text-slate-900">{resource.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600">{resource.text}</p>
                                <p className="mt-4 text-sm font-semibold text-[#3C3794] group-hover:underline">Leer guía →</p>
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
                        title="Solicita revisión de tu notificación"
                        serviceName="multas-aduaneras-sunat"
                    />
                </div>
            </Container>

            <RecommendedReading
                title="Lecturas para preparar mejor tu respuesta"
                subtitle="Si todavía estás identificando el riesgo, estas guías te ayudan a ordenar el caso antes de enviar documentos."
                slugs={[
                    'notificacion-sunat-aduanas-que-hacer',
                    'requerimiento-aduanero-sunat-como-responder',
                    'descargo-multa-aduanera-sunat',
                ]}
            />

            <CTASection
                title="No respondas una notificación aduanera a ciegas"
                highlightedWord="notificación"
                subtitle="Envíanos el documento recibido y revisamos contigo el plazo, el riesgo y los documentos que conviene ordenar antes de actuar."
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
