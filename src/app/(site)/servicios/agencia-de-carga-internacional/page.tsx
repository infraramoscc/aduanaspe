import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { RecommendedReading } from '@/components/blog';
import { Container } from '@/components/layout';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';
import { JsonLd } from '@/components/seo/JsonLd';
import { mainPageImages } from '@/content/mainPageImages';
import { WhatsAppLink } from '@/components/tracking';
import { ROUTES } from '@/lib/routes';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema';

const serviceUrl = 'https://aduanaspe.com/servicios/agencia-de-carga-internacional/';
const description = 'Conoce cómo coordinamos el transporte internacional marítimo y aéreo, qué revisamos antes de reservar y cómo informamos los cambios hasta la llegada.';

export const metadata: Metadata = {
    title: 'Agencia de Carga Internacional | AduanasPE',
    description,
    alternates: { canonical: serviceUrl },
    robots: { index: true, follow: true },
};

const process = [
    {
        title: 'Entendemos qué necesitas mover',
        work: 'Revisamos qué mercancía es, dónde está, cuándo estará lista y a dónde debe llegar. El peso, las dimensiones, el embalaje y el Incoterm acordado con tu proveedor nos ayudan a definir qué tramo debemos coordinar.',
        update: 'Qué datos están confirmados y qué necesitamos aclarar para comparar rutas.',
    },
    {
        title: 'Comparamos rutas, tiempos y costos',
        work: 'Según la carga, evaluamos alternativas marítimas o aéreas. Revisamos los puntos de salida y llegada, los transbordos y los tiempos estimados. Desglosamos el flete y los gastos de origen y destino que correspondan.',
        update: 'Qué incluye cada opción, qué gastos se calculan aparte y qué fechas siguen sujetas a confirmación.',
    },
    {
        title: 'Reservamos y coordinamos el embarque',
        work: 'Con la opción acordada, solicitamos espacio a la naviera o aerolínea y coordinamos con el proveedor y el agente en origen. Revisamos las fechas límite, la entrega de la carga y los datos del documento de transporte.',
        update: 'La confirmación de la reserva cuando se emite y los pendientes que deben resolverse antes de embarcar.',
    },
    {
        id: 'seguimiento',
        title: 'Seguimos la carga en tránsito',
        work: 'Verificamos el embarque y las novedades que reportan el transportista y los agentes. Si cambia la salida, el transbordo o la llegada prevista, revisamos cómo afecta al resto de la operación.',
        update: 'El último hito confirmado, la fecha estimada vigente y la acción que requiere el cambio, si corresponde.',
    },
    {
        id: 'destino',
        title: 'Preparamos la coordinación en destino',
        work: 'Confirmamos la llegada según la información del operador, revisamos el aviso y la documentación disponible, y coordinamos el traspaso al responsable de la siguiente etapa.',
        update: 'Qué llegó, qué documentos o gastos siguen pendientes y con quién se coordina el despacho o el retiro según el alcance acordado.',
    },
];

const modes = [
    {
        title: 'Marítimo · FCL',
        description: 'Usas un contenedor completo para tu embarque. Lo evaluamos cuando importan el volumen, el tipo de embalaje o el control sobre la manipulación.',
        criteria: 'Tipo de contenedor, fechas de salida, transbordos, días libres y devolución del contenedor cuando corresponda.',
    },
    {
        title: 'Marítimo · LCL',
        description: 'Compartes espacio en un contenedor con otros embarques. Lo evaluamos cuando el volumen permite consolidar la carga.',
        criteria: 'Fecha de consolidación, manipulación, tiempo de desconsolidación y cargos en destino.',
    },
    {
        title: 'Carga aérea',
        description: 'La evaluamos cuando la fecha de entrega pesa más en la decisión o cuando las características del envío hacen viable esta modalidad.',
        criteria: 'Peso facturable, dimensiones, conexiones, compatibilidad de la mercancía y disponibilidad de espacio.',
    },
];

const serviceDetails = [
    {
        title: 'Qué coordinamos',
        description: 'Ruta y flete internacional, reserva de espacio, coordinación del embarque con el proveedor y los operadores, seguimiento del tránsito y aviso de llegada.',
    },
    {
        title: 'Qué recibes',
        description: 'El desglose del alcance y los costos antes de reservar, la confirmación de la reserva cuando se emite y las novedades del embarque hasta la llegada.',
    },
    {
        title: 'Qué acordamos aparte',
        description: 'Según tu operación, confirmamos quién se encarga del recojo en origen, el seguro, el despacho aduanero y el transporte local. Así sabes qué está incluido y quién asume cada tramo.',
    },
];

const shipmentChecklist = [
    'Descripción de la mercancía, cantidad de bultos y tipo de embalaje',
    'Peso y dimensiones de los bultos',
    'Lugar de origen, destino y fecha en que la carga estará lista',
    'Condición de entrega acordada con el proveedor (Incoterm) y necesidades de manejo especial',
];

const faqs = [
    {
        question: '¿Qué necesito tener antes de empezar?',
        answer: 'Para una primera revisión, ten a mano el origen, el destino, el tipo de mercancía, el número de bultos, el peso, las dimensiones y la fecha en que el proveedor espera tener lista la carga. También ayuda saber qué Incoterm acordaron y si la mercancía necesita manejo especial.',
    },
    {
        question: '¿Qué partes del costo se revisan por separado?',
        answer: 'Separamos el flete internacional y los gastos de origen y destino que correspondan. Confirmamos si el seguro, el despacho aduanero o el transporte local forman parte del alcance. Conceptos como el almacenaje pueden depender de lo que ocurra durante la operación.',
    },
    {
        question: '¿Cómo sé si la fecha está confirmada o es estimada?',
        answer: 'Distinguimos los hitos que el transportista o el agente ya confirmó de las fechas previstas para los siguientes tramos. Cuando cambia una estimación, explicamos qué hito se mueve y qué queda por coordinar.',
    },
    {
        question: '¿Qué documento de transporte revisamos?',
        answer: 'En un envío marítimo revisamos el conocimiento de embarque (Bill of Lading o B/L) y en uno aéreo, la guía aérea (Air Waybill o AWB), según corresponda. Verificamos que datos como el consignatario, el número de bultos y el peso concuerden con la información de la operación.',
    },
    {
        question: '¿En qué se diferencian la agencia de carga y el agente de aduanas?',
        answer: 'La agencia de carga coordina el transporte internacional y sus documentos. El agente de aduanas gestiona el despacho aduanero. Ambos se coordinan cuando el embarque necesita pasar de la etapa de transporte al despacho y luego al retiro.',
    },
];

const sectionLink = 'inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4';

export default function AgenciamientoCargaPage() {
    const serviceJsonLd = generateServiceSchema({
        name: 'Agencia de Carga Internacional',
        description,
        url: serviceUrl,
    });
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Servicios', url: 'https://aduanaspe.com/servicios/' },
        { name: 'Agencia de Carga Internacional', url: serviceUrl },
    ]);

    return (
        <>
            <JsonLd json={serviceJsonLd} />
            <JsonLd json={breadcrumbJsonLd} />
            <FaqJsonLd faqs={faqs} />

            <section aria-labelledby="carga-title" className="bg-[#111a2e] text-white">
                <Container className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1fr_1.06fr] lg:gap-12 lg:py-18">
                    <div>
                        <p className="mb-4 text-sm font-bold text-cyan-200">Agencia de carga internacional</p>
                        <h1 id="carga-title" className="text-[clamp(2.35rem,4.25vw,3.55rem)] leading-[1.05] font-extrabold tracking-[-0.045em] text-balance">
                            Así coordinamos tu carga internacional
                        </h1>
                        <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-200 sm:text-lg">
                            Coordinamos el transporte marítimo o aéreo con tu proveedor y los operadores. Conoce qué hacemos en cada etapa y qué información recibes hasta la llegada.
                        </p>
                        <a href="#proceso" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-cyan-200 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-100">
                            Ver cómo trabajamos <span aria-hidden="true">↓</span>
                        </a>
                        <nav aria-label="Contenido de la página" className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-cyan-100">
                            <a href="#alcance" className={sectionLink}>Qué incluye</a>
                            <a href="#seguimiento" className={sectionLink}>Seguimiento</a>
                            <a href="#modalidades" className={sectionLink}>Modalidades</a>
                            <a href="#experiencia" className={sectionLink}>Experiencia</a>
                        </nav>
                    </div>
                    <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-slate-800 lg:aspect-[5/4]">
                        <Image
                            src="/images/landings/importar-china.webp"
                            alt="Buque portacontenedores junto a las grúas de un terminal marítimo"
                            fill
                            preload
                            sizes="(min-width: 1280px) 550px, (min-width: 1024px) 50vw, 100vw"
                            className="object-cover object-[54%_center]"
                        />
                    </div>
                </Container>
            </section>

            <section id="alcance" aria-labelledby="alcance-title" className="scroll-mt-24 bg-white py-12 sm:scroll-mt-36 sm:py-16">
                <Container>
                    <h2 id="alcance-title" className="font-extrabold text-slate-950">Qué incluye el agenciamiento de carga</h2>
                    <dl className="mt-6 grid gap-4 md:grid-cols-3">
                        {serviceDetails.map((item) => (
                            <div key={item.title} className="rounded-xl border border-slate-200 bg-[#f8f7f3] p-5 sm:p-6">
                                <dt className="text-lg font-bold text-indigo-950">{item.title}</dt>
                                <dd className="mt-2 leading-relaxed text-slate-700">{item.description}</dd>
                            </div>
                        ))}
                    </dl>
                </Container>
            </section>

            <section id="proceso" aria-labelledby="proceso-title" className="scroll-mt-24 bg-[#f8f7f3] py-12 sm:scroll-mt-36 sm:py-18">
                <Container className="grid items-start gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
                    <header className="max-w-xl lg:sticky lg:top-36">
                        <h2 id="proceso-title" className="font-extrabold text-slate-950">De la carga lista a la llegada</h2>
                        <p className="mt-4 leading-relaxed text-slate-700">
                            Cada etapa tiene una tarea de coordinación y una actualización que te ayuda a decidir qué hacer después.
                        </p>
                    </header>
                    <ol className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        {process.map((step, index) => (
                            <li key={step.title} id={step.id} className="grid scroll-mt-24 gap-x-4 gap-y-3 border-b border-slate-200 p-5 last:border-b-0 sm:scroll-mt-36 sm:grid-cols-[auto_1fr] sm:p-7">
                                <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-900">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h3 className="text-xl font-extrabold tracking-tight text-slate-950">{step.title}</h3>
                                    <p className="mt-2 leading-relaxed text-slate-700">{step.work}</p>
                                    <p className="mt-4 border-l-2 border-indigo-300 pl-3 text-sm leading-relaxed text-slate-700">
                                        <strong className="text-indigo-950">Qué te informamos.</strong>{' '}{step.update}
                                    </p>
                                    {step.id === 'seguimiento' && (
                                        <div className="mt-5 rounded-xl bg-[#111a2e] p-4 text-white sm:p-6">
                                            <h4 className="font-bold text-cyan-100">Ejemplo de seguimiento por un cambio de itinerario</h4>
                                            <dl className="mt-2 divide-y divide-white/15 text-sm leading-relaxed">
                                                <div className="grid gap-1 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-3">
                                                    <dt className="font-bold">Confirmado</dt>
                                                    <dd className="text-slate-200">La carga salió del puerto de origen.</dd>
                                                </div>
                                                <div className="grid gap-1 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-3">
                                                    <dt className="font-bold">Pendiente</dt>
                                                    <dd className="text-slate-200">La naviera reprogramó el transbordo y aún debe confirmar la nueva fecha de llegada.</dd>
                                                </div>
                                                <div className="grid gap-1 pt-3 sm:grid-cols-[7.5rem_1fr] sm:gap-3">
                                                    <dt className="font-bold">Siguiente paso</dt>
                                                    <dd className="text-slate-200">Verificamos el itinerario actualizado y avisamos al agente en destino para que ajuste la coordinación.</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    )}
                                    {step.id === 'destino' && (
                                        <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-4 sm:p-6">
                                            <h4 className="font-bold text-indigo-950">Quién hace qué al llegar</h4>
                                            <dl className="mt-2 divide-y divide-indigo-100 text-sm leading-relaxed text-slate-700">
                                                <div className="py-3">
                                                    <dt className="font-bold text-indigo-950">Agencia de carga</dt>
                                                    <dd>Compartimos el aviso de llegada, la documentación de transporte disponible y los pendientes de la operación.</dd>
                                                </div>
                                                <div className="pb-3">
                                                    <dt><Link href={ROUTES.servicios.agenciamientoAduanas} className={sectionLink}>Agente de aduanas <span aria-hidden="true">↗</span></Link></dt>
                                                    <dd>Gestiona el despacho aduanero y comunica cuándo la mercancía está liberada para coordinar el retiro.</dd>
                                                </div>
                                                <div>
                                                    <dt><Link href={ROUTES.servicios.transporteDeCarga} className={sectionLink}>Transportista local <span aria-hidden="true">↗</span></Link></dt>
                                                    <dd>Coordina el retiro con el terminal o almacén y traslada la carga al punto acordado.</dd>
                                                </div>
                                            </dl>
                                            <p className="mt-4 text-sm text-slate-700">El alcance acordado define quién coordina el despacho y la entrega local.</p>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </Container>
            </section>

            <section id="modalidades" aria-labelledby="modalidades-title" className="scroll-mt-24 bg-white py-12 sm:scroll-mt-36 sm:py-18">
                <Container>
                    <h2 id="modalidades-title" className="font-extrabold text-slate-950">Cómo comparamos las modalidades</h2>
                    <div className="mt-7 grid gap-4 md:grid-cols-3">
                        {modes.map((mode) => (
                            <div key={mode.title} className="rounded-2xl border border-slate-200 bg-[#f8f7f3] p-5 sm:p-7">
                                <h3 className="text-xl font-bold text-slate-950">{mode.title}</h3>
                                <p className="mt-2 leading-relaxed text-slate-700">{mode.description}</p>
                                <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-700">
                                    <strong className="text-indigo-950">Qué comparamos.</strong>{' '}{mode.criteria}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-5 sm:p-6">
                        <h3 className="text-lg font-bold text-indigo-950">Ejemplo ilustrativo de una decisión de flete</h3>
                        <p className="mt-2 max-w-3xl leading-relaxed text-slate-700">
                            Un proveedor tiene varios bultos listos y el importador necesita una parte para reponer inventario. Podemos comparar enviar todo por mar con despachar solo lo urgente por avión y consolidar el resto. Para decidir, revisamos cuánto cuesta cada opción a destino, si cumple la fecha necesaria y si el proveedor puede separar y documentar ambos envíos.
                        </p>
                    </div>
                </Container>
            </section>

            <section id="experiencia" aria-labelledby="experiencia-title" className="scroll-mt-24 border-y border-slate-200 bg-[#f8f7f3] py-12 sm:scroll-mt-36 sm:py-16">
                <Container className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
                    <div>
                        <h2 id="experiencia-title" className="font-extrabold text-slate-950">La experiencia detrás de tu envío</h2>
                        <p className="mt-4 leading-relaxed text-slate-700">
                            Somos dos hermanos con experiencia en agencias de aduanas. Creamos AduanasPE para acompañar a importadores y exportadores, y hoy coordinamos operaciones desde el Callao, Perú.
                        </p>
                        <p className="mt-3 leading-relaxed text-slate-700">
                            Esa experiencia se refleja en lo que revisamos antes de embarcar. Por ejemplo, contrastamos los datos del documento de transporte con la factura y la lista de empaque para detectar diferencias que puedan complicar el despacho o el retiro.
                        </p>
                        <p className="mt-3 leading-relaxed text-slate-700">
                            Tu ejecutivo es el punto de contacto con el equipo. Te explica qué información falta y coordina con el operador responsable del siguiente paso.
                        </p>
                        <Link href={ROUTES.quienesSomos} className={`mt-3 ${sectionLink} text-indigo-900`}>
                            Conoce la historia y el equipo de AduanasPE <span aria-hidden="true">↗</span>
                        </Link>
                    </div>
                    <figure>
                        <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-slate-200">
                            <Image
                                src={mainPageImages.services.middle.src}
                                alt={mainPageImages.services.middle.alt}
                                fill
                                sizes="(min-width: 1280px) 450px, (min-width: 1024px) 42vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <figcaption className="mt-2 text-sm text-slate-600">Imagen ilustrativa de una revisión documental.</figcaption>
                    </figure>
                </Container>
            </section>

            <section aria-labelledby="carga-contacto-title" className="bg-[#111a2e] py-10 text-white sm:py-14">
                <Container className="flex flex-wrap items-center justify-between gap-6">
                    <div className="max-w-2xl">
                        <h2 id="carga-contacto-title" className="font-extrabold">¿Tienes dudas sobre un envío?</h2>
                        <p className="mt-3 leading-relaxed text-slate-200">
                            Si estás preparando un envío, estos datos nos ayudan a orientarte sobre lo que falta revisar.
                        </p>
                        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-200 marker:text-cyan-200">
                            {shipmentChecklist.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <WhatsAppLink
                            route="agencia-de-carga-internacional-cta"
                            serviceName="agencia-de-carga-internacional"
                            customMessageBody="Tengo una consulta sobre un envío internacional y quisiera saber qué datos debo preparar."
                            className="min-h-12 hover:translate-y-0 focus-visible:outline-cyan-100 motion-reduce:transition-none"
                        >
                            Consultar por WhatsApp
                        </WhatsAppLink>
                        <Link href={ROUTES.contacto} className={`${sectionLink} text-cyan-100`}>
                            Consultar por formulario <span aria-hidden="true">↗</span>
                        </Link>
                    </div>
                </Container>
            </section>

            <section id="preguntas" aria-labelledby="preguntas-title" className="scroll-mt-24 border-y border-slate-200 bg-[#f8f7f3] py-12 sm:scroll-mt-36 sm:py-16">
                <Container className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
                    <h2 id="preguntas-title" className="font-extrabold text-slate-950">Preguntas frecuentes</h2>
                    <div className="grid gap-3">
                        {faqs.map((faq) => (
                            <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white">
                                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 sm:px-5 [&::-webkit-details-marker]:hidden">
                                    {faq.question}
                                    <span aria-hidden="true" className="shrink-0 text-xl text-indigo-800 group-open:rotate-45">+</span>
                                </summary>
                                <p className="px-4 pb-4 leading-relaxed text-slate-700 sm:px-5">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </Container>
            </section>

            <RecommendedReading
                title="Guías para preparar tu embarque"
                subtitle="Revisa cómo elegir entre contenedor completo y carga consolidada, qué gastos pueden aparecer en destino y qué datos confirmar antes de embarcar."
                slugs={[
                    'fcl-vs-lcl-importar-peru',
                    'costos-locales-carga-internacional-peru',
                    'booking-bill-of-lading-importacion-peru',
                ]}
            />

        </>
    );
}
