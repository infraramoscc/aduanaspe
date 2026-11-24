import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { RecommendedReading } from '@/components/blog';
import { Container } from '@/components/layout';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';
import { JsonLd } from '@/components/seo/JsonLd';
import { WhatsAppLink } from '@/components/tracking';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema';
import { DispatchGuide } from './DispatchGuide';
import { DispatchJourney } from './DispatchJourney';

const serviceUrl = 'https://aduanaspe.com/servicios/agenciamiento-aduanas/';

export const metadata: Metadata = {
    title: 'Agenciamiento de Aduanas en Perú | Despacho y seguimiento',
    description: 'Nos encargamos de tu despacho aduanero: revisión de documentos, clasificación arancelaria, DAM, tributos y coordinación con SUNAT y almacenes.',
    alternates: { canonical: serviceUrl },
    robots: { index: true, follow: true },
};

const faqs = [
    {
        question: '¿Qué documentos necesito para iniciar el despacho?',
        answer: 'Para empezar solemos pedir la factura comercial, el documento de transporte y la lista de empaque. Según el producto, también pueden hacer falta permisos o certificados. Podemos revisar contigo qué falta.',
    },
    {
        question: '¿Cuánto tiempo demora el proceso?',
        answer: 'Depende de la documentación, los permisos, el almacén y el canal de control que asigne SUNAT. Revisamos el caso para identificar qué podría afectar el plazo.',
    },
    {
        question: '¿Puedo hacer seguimiento a mi carga?',
        answer: 'Sí. Un ejecutivo sigue tu operación y te explica qué viene después. Te avisa si necesitamos un documento, un pago o una decisión de tu parte.',
    },
    {
        question: '¿Qué pasa si hay observaciones de SUNAT?',
        answer: 'Revisamos qué observó SUNAT y qué sustento existe. Luego te explicamos el escenario y coordinamos la respuesta según el alcance del servicio.',
    },
    {
        question: '¿Cómo se cotiza el servicio?',
        answer: 'Revisamos el tipo de carga, el régimen aduanero, el valor de la mercancía y el estado de tus documentos. Con esos datos definimos qué cubre el servicio y cuánto cuesta para tu operación.',
    },
];

const relatedServices = [
    { href: '/servicios/agencia-de-carga-internacional', label: 'Agencia de carga internacional', description: 'Flete marítimo o aéreo desde origen.' },
    { href: '/servicios/transporte-de-carga', label: 'Transporte de carga', description: 'Retiro y traslado hasta tu almacén.' },
    { href: '/servicios/consultoria-aduanera', label: 'Consultoría aduanera', description: 'Revisión técnica de una decisión o contingencia.' },
    { href: '/servicios/resguardo-aduanero', label: 'Resguardo aduanero', description: 'Custodia durante el traslado de tu mercancía.' },
];

const quoteLinkClass = 'inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[var(--home-brand)] px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-[var(--home-brand-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-700';

export default function AgenciamientoAduanasPage() {
    const serviceJsonLd = generateServiceSchema({
        name: 'Agenciamiento de Aduanas en Perú',
        description: 'Despacho aduanero para importación y exportación con revisión documental, clasificación arancelaria y seguimiento de la operación.',
        url: serviceUrl,
    });
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Servicios', url: 'https://aduanaspe.com/servicios/' },
        { name: 'Agenciamiento de Aduanas', url: serviceUrl },
    ]);

    return (
        <>
            <JsonLd json={serviceJsonLd} />
            <JsonLd json={breadcrumbJsonLd} />
            <FaqJsonLd faqs={faqs} />

            <section aria-labelledby="despacho-title" className="bg-[#f8f7f3]">
                <Container>
                    <div className="grid items-center gap-8 pt-10 pb-8 sm:gap-10 sm:pt-16 lg:grid-cols-[1.06fr_1fr] lg:gap-12 lg:pt-20">
                        <div>
                            <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-indigo-800">
                                <span aria-hidden="true" className="size-2 rounded-full bg-indigo-600" />
                                Agenciamiento de aduanas en Perú
                            </p>
                            <h1 id="despacho-title" className="text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.03] font-extrabold tracking-[-0.055em] text-slate-950">
                                Nos encargamos de tu despacho aduanero de principio a fin
                            </h1>
                            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
                                Revisamos tus documentos, preparamos la declaración y coordinamos con SUNAT y el almacén. Un ejecutivo te mantiene al tanto de tu importación o exportación.
                            </p>
                            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
                                <a href="#cotizacion" className={quoteLinkClass}>
                                    Cotizar mi despacho <span aria-hidden="true">↓</span>
                                </a>
                                <WhatsAppLink route="agenciamiento-aduanas" serviceName="agenciamiento-aduanas" variant="link">
                                    Consultar por WhatsApp
                                </WhatsAppLink>
                            </div>
                            <a href="#proceso" className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-indigo-800 underline decoration-indigo-300 underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-700">
                                Ver el recorrido de una carga <span aria-hidden="true">↓</span>
                            </a>
                        </div>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200 lg:aspect-auto lg:min-h-[28rem] lg:self-stretch">
                            <Image
                                src="/images/despacho/terminal.webp"
                                alt="Vista ilustrativa de un terminal marítimo con grúas y patios de contenedores"
                                fill
                                preload
                                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 100vw"
                                className="object-cover object-[58%_center]"
                            />
                        </div>
                    </div>
                    <ul className="grid gap-3 border-t border-slate-200 py-5 text-sm font-semibold text-slate-800 sm:grid-cols-3 sm:py-6">
                        <li>Revisión documental antes de declarar</li>
                        <li>Un ejecutivo para tu operación</li>
                        <li>Seguimiento hasta coordinar el retiro</li>
                    </ul>
                </Container>
            </section>

            <DispatchJourney />

            <section id="cotizacion" aria-labelledby="cotizacion-title" className="scroll-mt-24 border-y border-indigo-100 bg-[#f5f4fd] py-12 sm:scroll-mt-32 sm:py-16">
                <Container>
                    <header className="mb-7 max-w-2xl">
                        <h2 id="cotizacion-title" className="font-extrabold text-slate-950">Prepara tu cotización</h2>
                        <p className="mt-3 text-base leading-relaxed text-slate-700">
                            Cuéntanos qué estás importando o exportando. Elige la etapa de tu operación para ver qué información conviene tener a mano.
                        </p>
                    </header>
                    <DispatchGuide />
                </Container>
            </section>

            <section aria-labelledby="preguntas-title" className="border-y border-slate-200 bg-[#f8f7f3] py-12 sm:py-16">
                <Container>
                    <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
                        <div>
                            <h2 id="preguntas-title" className="font-extrabold text-slate-950">Preguntas frecuentes</h2>
                            <Link href="/blog/todo-sobre-agencias-de-aduanas" className="mt-4 inline-flex min-h-11 items-center font-semibold text-indigo-800 underline underline-offset-4">
                                Guía sobre agencias de aduanas
                            </Link>
                        </div>
                        <div className="grid gap-3">
                            {faqs.map((faq) => (
                                <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white">
                                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 sm:px-5 [&::-webkit-details-marker]:hidden">
                                        {faq.question}
                                        <span aria-hidden="true" className="shrink-0 text-xl leading-none text-indigo-800 transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
                                    </summary>
                                    <p className="px-4 pb-4 leading-relaxed text-slate-700 sm:px-5">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section aria-labelledby="complementos-title" className="bg-white py-12 sm:py-16">
                <Container>
                    <h2 id="complementos-title" className="mb-6 font-extrabold text-slate-950">Servicios para completar tu operación</h2>
                    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedServices.map((service) => (
                            <li key={service.href}>
                                <Link href={service.href} className="block h-full rounded-xl border border-slate-200 p-4 transition-colors hover:border-indigo-300 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
                                    <span className="font-bold text-indigo-900">{service.label} <span aria-hidden="true">↗</span></span>
                                    <span className="mt-1 block text-sm leading-relaxed text-slate-700">{service.description}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Container>
            </section>

            <RecommendedReading
                title="Guías para llegar mejor preparado al despacho"
                slugs={[
                    'como-importar-por-primera-vez-en-peru',
                    'agente-de-aduanas-vs-agencia-de-carga',
                    'como-saber-si-tu-producto-necesita-permisos-para-importar-en-peru',
                ]}
            />

            <section aria-labelledby="despacho-contacto-title" className="border-t border-indigo-100 bg-[#eeedfb] py-10 sm:py-12">
                <Container>
                    <div className="flex flex-wrap items-center justify-between gap-5">
                        <h2 id="despacho-contacto-title" className="font-extrabold text-slate-950">¿Revisamos tu próxima operación?</h2>
                        <a href="#cotizacion" className={quoteLinkClass}>Cotizar mi despacho <span aria-hidden="true">↑</span></a>
                    </div>
                </Container>
            </section>
        </>
    );
}
