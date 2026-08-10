import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CampaignHero } from '@/components/ads';
import { Container } from '@/components/layout';
import { WhatsAppLink } from '@/components/tracking';

export const metadata: Metadata = {
    title: 'Primera Importación desde China | AduanasPE',
    description: 'Orientación para evaluar modalidad, documentos, costos y coordinación de una primera importación desde China a Perú.',
    robots: {
        index: false,
        follow: false,
    },
};

const processSteps = [
    {
        number: '01',
        title: 'Cuéntanos qué quieres importar',
        description: 'Comparte producto, valor, cantidad, peso, volumen y ciudad de entrega. Si aún falta información, te indicamos cómo completarla.',
    },
    {
        number: '02',
        title: 'Revisamos la operación',
        description: 'Evaluamos modalidad de transporte, documentos disponibles, posibles restricciones y componentes del costo.',
    },
    {
        number: '03',
        title: 'Coordinamos el alcance',
        description: 'Definimos qué etapas necesitas: carga internacional, despacho aduanero, transporte local o acompañamiento puntual.',
    },
];

const serviceAreas = [
    {
        code: 'FLETE',
        title: 'Carga internacional',
        description: 'Comparamos alternativas marítimas y aéreas según volumen, urgencia, origen y condiciones de entrega.',
        cta: 'Revisar mi flete',
    },
    {
        code: 'ADUANA',
        title: 'Despacho aduanero',
        description: 'Ordenamos la documentación necesaria y coordinamos el despacho según mercancía, régimen y canal asignado.',
        cta: 'Revisar mi despacho',
    },
    {
        code: 'ENTREGA',
        title: 'Transporte local',
        description: 'Coordinamos el traslado desde puerto o almacén hasta el destino acordado cuando forma parte del servicio.',
        cta: 'Consultar entrega',
    },
];

const faqs = [
    {
        question: '¿Qué información necesito para una primera evaluación?',
        answer: 'Producto, cantidad, valor comercial, país y ciudad de origen, peso, volumen y destino en Perú. También ayudan la factura proforma, ficha técnica y fotografías del producto.',
    },
    {
        question: '¿Pueden revisar los documentos de mi proveedor?',
        answer: 'Podemos revisar la documentación comercial y logística disponible para detectar información faltante o inconsistente. Esta revisión no sustituye una verificación legal o financiera independiente del proveedor.',
    },
    {
        question: '¿También atienden cargas pequeñas?',
        answer: 'Evaluamos carga consolidada marítima y alternativas aéreas. La modalidad adecuada depende del producto, volumen, urgencia, restricciones y costo total estimado.',
    },
    {
        question: '¿Cuánto demora una importación desde China?',
        answer: 'El plazo depende de la ruta, modalidad, disponibilidad, documentación y controles aplicables. Al revisar tus datos podemos darte una referencia actualizada para esa operación.',
    },
];

export default function PrimeraImportacionLanding() {
    return (
        <main className="min-h-screen bg-[#f5f6f8] text-slate-900">
            <header className="border-b border-slate-200 bg-white/95 py-4 backdrop-blur">
                <Container>
                    <div className="flex items-center justify-between gap-4">
                        <Link href="/" className="text-2xl font-black tracking-tight text-[#2F2B77]">
                            AduanasPE<span className="text-emerald-500">.</span>
                        </Link>
                        <WhatsAppLink
                            messageKey="ads_primera_importacion"
                            customNumber="51944785974"
                            variant="button"
                            className="hidden px-5 py-2.5 text-sm sm:inline-flex"
                        >
                            Consultar operación
                        </WhatsAppLink>
                    </div>
                </Container>
            </header>

            <CampaignHero
                eyebrow="Primera importación desde China"
                title="Importa con una ruta clara desde la compra hasta la entrega"
                subtitle="Te ayudamos a revisar modalidad, documentos, costos y coordinación logística antes de mover tu carga."
                imageSrc="/images/landings/primera-importacion.webp"
                imageAlt="Pequeña empresa recibiendo una carga consolidada con apoyo logístico"
                showBrand={false}
                trustNote="Orientación inicial por WhatsApp en horario de atención."
                benefits={[
                    { title: 'Revisión previa', description: 'Ordenamos la información de producto, proveedor y documentos antes del embarque.' },
                    { title: 'Costos explicados', description: 'Separamos flete, gastos locales, tributos y entrega para evaluar la operación.' },
                    { title: 'Un punto de coordinación', description: 'Conectamos carga internacional, despacho y transporte según tu necesidad.' },
                ]}
                actions={
                    <WhatsAppLink
                        messageKey="ads_primera_importacion"
                        customNumber="51944785974"
                        variant="button"
                        className="px-8 py-4 text-base"
                    >
                        Revisar mi primera importación
                    </WhatsAppLink>
                }
            />

            <section className="border-b border-slate-200 bg-white py-20">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3C3794]">Cómo empezamos</p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                                Tres decisiones antes de mover la carga
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                Una primera importación se vuelve manejable cuando la información, el alcance y los costos se ordenan desde el inicio.
                            </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            {processSteps.map((step) => (
                                <article key={step.number} className="border-l-2 border-slate-200 py-2 pl-5">
                                    <p className="text-xs font-bold tracking-[0.2em] text-cyan-700">{step.number}</p>
                                    <h3 className="mt-3 text-lg font-bold text-slate-950">{step.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-20">
                <Container>
                    <div className="max-w-3xl">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3C3794]">Alcance modular</p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                            Contrata solo las etapas que tu operación necesita
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            Te indicamos qué parte podemos coordinar y qué información falta para construir una cotización útil.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        {serviceAreas.map((service) => (
                            <article key={service.code} className="group flex min-h-80 flex-col border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-slate-300">
                                <p className="text-[10px] font-bold tracking-[0.22em] text-cyan-700">{service.code}</p>
                                <h3 className="mt-6 text-2xl font-bold text-slate-950">{service.title}</h3>
                                <p className="mt-4 flex-1 leading-7 text-slate-600">{service.description}</p>
                                <WhatsAppLink
                                    messageKey="ads_primera_importacion"
                                    customNumber="51944785974"
                                    variant="link"
                                    className="mt-8 font-semibold text-[#3C3794]"
                                >
                                    {service.cta} →
                                </WhatsAppLink>
                            </article>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-[#111827] py-20 text-white">
                <Container>
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">Coordinación operativa</p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                                Menos intermediación para ti, más claridad sobre cada etapa
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-300">
                                Definimos responsables, entregables y supuestos antes de iniciar. Así puedes distinguir el costo estimado de los importes que dependen de terceros o de la autoridad.
                            </p>
                            <ul className="mt-8 space-y-5">
                                {[
                                    'Alcance y exclusiones explicados antes de coordinar.',
                                    'Revisión preventiva de la información disponible.',
                                    'Comunicación por hitos y próximos pasos.',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-slate-200">
                                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
                            <Image
                                src="/images/landings/primera-importacion.webp"
                                alt="Carga consolidada preparada para su entrega a una pequeña empresa"
                                fill
                                sizes="(max-width: 1023px) 100vw, 50vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-8">
                                <h3 className="text-2xl font-bold text-white">Un solo punto de coordinación</h3>
                                <p className="mt-3 text-base leading-7 text-slate-200">
                                    Conectamos carga internacional, despacho aduanero y transporte según el alcance acordado para tu operación.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="border-b border-slate-200 bg-white py-20">
                <Container>
                    <div className="mx-auto max-w-4xl">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3C3794]">Preguntas frecuentes</p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                                Lo que conviene aclarar antes de cotizar
                            </h2>
                        </div>
                        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
                            {faqs.map((faq, index) => (
                                <article key={faq.question} className="grid gap-4 py-7 md:grid-cols-[3rem_1fr]">
                                    <p className="text-xs font-bold tracking-[0.2em] text-cyan-700">0{index + 1}</p>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-950">{faq.question}</h3>
                                        <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-[#ecebff] py-16">
                <Container>
                    <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3C3794]">Siguiente paso</p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                                Revisa tu operación antes de comprometer la carga
                            </h2>
                            <p className="mt-4 text-lg leading-8 text-slate-600">
                                Envíanos los datos disponibles y te indicaremos qué hace falta para evaluar el alcance.
                            </p>
                        </div>
                        <WhatsAppLink
                            messageKey="ads_primera_importacion"
                            customNumber="51944785974"
                            variant="button"
                            className="px-8 py-4 text-base"
                        >
                            Enviar datos por WhatsApp
                        </WhatsAppLink>
                    </div>
                </Container>
            </section>

            <footer className="bg-white py-8">
                <Container>
                    <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                        <p>© {new Date().getFullYear()} AduanasPE. Todos los derechos reservados.</p>
                        <p>Servicios de comercio exterior en Perú</p>
                    </div>
                </Container>
            </footer>
        </main>
    );
}
