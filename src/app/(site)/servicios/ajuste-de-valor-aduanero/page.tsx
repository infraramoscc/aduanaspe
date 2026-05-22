import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Ajuste de Valor Aduanero SUNAT | AduanasPE',
    description: 'Revisión de ajuste de valor, duda razonable y sustento del valor declarado ante SUNAT para importadores en Perú.',
    alternates: {
        canonical: 'https://aduanaspe.com/servicios/ajuste-de-valor-aduanero/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

const reviewPoints = [
    'Notificación, requerimiento o comunicación vinculada al valor declarado',
    'Factura comercial, proforma, contrato, orden de compra y descripción de mercancía',
    'Medios de pago, transferencia, Swift, voucher o estado de cuenta',
    'Flete, seguro, gastos conexos y forma de distribución por serie',
    'Descuentos, notas de crédito, listas de precios o condiciones especiales',
    'Coherencia entre documentos antes de responder a SUNAT',
];

const cases = [
    {
        title: 'Recibiste una duda razonable',
        text: 'Ordenamos el expediente, identificamos qué punto está cuestionado y preparamos la lógica de sustento antes de responder.',
    },
    {
        title: 'El precio de tu proveedor parece bajo',
        text: 'Revisamos si el descuento, promoción o condición comercial está documentada antes de pagar o embarcar.',
    },
    {
        title: 'No sabes qué documentos presentar',
        text: 'Te ayudamos a separar lo esencial de lo accesorio: factura, pago, transporte, seguro, descuentos y soporte comercial.',
    },
    {
        title: 'Tu margen depende del valor declarado',
        text: 'Validamos el riesgo antes de que un ajuste cambie el costo real de importación.',
    },
];

const steps = [
    {
        title: 'Revisión inicial',
        text: 'Nos compartes la notificación o los documentos base de la operación para entender el punto crítico.',
    },
    {
        title: 'Mapa de sustento',
        text: 'Identificamos qué documentos existen, cuáles faltan y qué inconsistencias conviene corregir o explicar.',
    },
    {
        title: 'Criterio de respuesta',
        text: 'Te indicamos cómo ordenar el expediente y qué argumento documental conviene priorizar.',
    },
    {
        title: 'Siguiente acción',
        text: 'Si el caso requiere acompañamiento adicional, definimos el alcance antes de preparar una respuesta formal.',
    },
];

const resources = [
    {
        title: 'Ajuste de valor SUNAT',
        href: '/blog/ajuste-de-valor-sunat-importacion/',
        text: 'Qué hacer si ya observaron el valor de tu importación.',
    },
    {
        title: 'Duda razonable',
        href: '/blog/duda-razonable-aduanas-sunat/',
        text: 'Etapas, documentos y errores al sustentar el valor declarado.',
    },
    {
        title: 'Checklist descargable',
        href: '/recursos/checklist-sustentar-valor-declarado-sunat.pdf',
        text: 'Lista práctica para ordenar factura, pagos, flete, seguro y descuentos.',
    },
];

const faqs = [
    {
        question: '¿Pueden revisar mi caso antes de responder a SUNAT?',
        answer: 'Sí. Revisamos la notificación o el requerimiento, los documentos disponibles y el punto técnico que conviene sustentar antes de enviar una respuesta.',
    },
    {
        question: '¿Este servicio sirve si todavía no recibí observación?',
        answer: 'Sí. También sirve como revisión preventiva cuando el precio es bajo, hay descuentos, falta sustento de pago o el valor de la operación es relevante.',
    },
    {
        question: '¿Qué documentos debo enviar para empezar?',
        answer: 'De forma inicial, factura o proforma, documento de transporte si existe, medio de pago, detalle del producto, condiciones de compra y cualquier comunicación de SUNAT si ya fue notificada.',
    },
    {
        question: '¿Ustedes responden directamente a SUNAT?',
        answer: 'Depende del alcance contratado y del estado del caso. Primero revisamos el expediente y luego definimos si corresponde apoyo documental, estrategia de respuesta o acompañamiento más amplio.',
    },
];

export default function AjusteDeValorAduaneroPage() {
    const serviceJsonLd = generateServiceSchema({
        name: 'Ajuste de Valor Aduanero',
        description: 'Revision de ajuste de valor, duda razonable y sustento del valor declarado ante SUNAT para importadores en Peru.',
        url: 'https://aduanaspe.com/servicios/ajuste-de-valor-aduanero/',
    });
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Servicios', url: 'https://aduanaspe.com/servicios/' },
        { name: 'Ajuste de Valor Aduanero', url: 'https://aduanaspe.com/servicios/ajuste-de-valor-aduanero/' },
    ]);

    return (
        <>
            <JsonLd json={serviceJsonLd} />
            <JsonLd json={breadcrumbJsonLd} />
            <FaqJsonLd faqs={faqs} />

            <section className="overflow-hidden bg-slate-950 py-16 text-white md:py-24">
                <Container>
                    <div className="max-w-4xl">
                        <p className="max-w-full break-words text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200 sm:text-sm sm:tracking-[0.18em]">
                            Consultoría aduanera para importadores
                        </p>
                        <h1 className="mt-5 max-w-full text-3xl font-bold leading-tight text-balance sm:text-4xl md:text-6xl">
                            Revisión de ajuste de valor antes de responder a SUNAT
                        </h1>
                        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                            Si SUNAT observó el valor declarado, recibiste una duda razonable o tu precio necesita mejor sustento, revisamos el expediente y te ayudamos a ordenar la respuesta con criterio técnico.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink route="ajuste-de-valor-aduanero" messageKey="asesoria_gratis" variant="button" className="w-full justify-center text-center sm:w-auto">
                                Revisar mi caso por WhatsApp
                            </WhatsAppLink>
                            <Link href="#documentos" className="w-full sm:w-auto">
                                <Button variant="secondary" size="lg" className="w-full text-center sm:w-auto">
                                    Ver qué documentos enviar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-white py-20">
                <Container>
                    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div>
                            <span className="section-badge">Cuándo aplica</span>
                            <h2 className="mt-4 text-3xl font-bold text-slate-950">
                                Casos donde conviene revisar el valor antes de actuar
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                El objetivo no es responder más rápido, sino responder mejor: con documentos ordenados, explicación coherente y claridad sobre el riesgo real.
                            </p>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            {cases.map((item) => (
                                <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                                    <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section id="documentos" className="bg-slate-50 py-20">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="section-badge">Revisión documental</span>
                        <h2 className="mt-4 text-3xl font-bold text-slate-950">
                            Qué revisamos en un caso de valor declarado
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            No todos los documentos pesan igual. Primero ubicamos qué está cuestionado y luego armamos el sustento alrededor de ese punto.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-4 md:grid-cols-2">
                        {reviewPoints.map((point) => (
                            <div key={point} className="rounded-lg border border-slate-200 bg-white p-5 text-sm font-medium leading-7 text-slate-700">
                                {point}
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-white py-20">
                <Container>
                    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div>
                            <span className="section-badge">Proceso</span>
                            <h2 className="mt-4 text-3xl font-bold text-slate-950">
                                Cómo trabajamos la revisión
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                Empezamos por entender el riesgo y el plazo. Si hace falta una respuesta más profunda, definimos el alcance antes de avanzar.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {steps.map((step, index) => (
                                <div key={step.title} className="rounded-lg border border-slate-200 p-6">
                                    <p className="text-sm font-bold text-cyan-700">Paso {index + 1}</p>
                                    <h3 className="mt-2 text-xl font-bold text-slate-950">{step.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-slate-950 py-20 text-white">
                <Container>
                    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                        <div>
                            <span className="section-badge bg-white/10 text-cyan-100">Recursos</span>
                            <h2 className="mt-4 text-3xl font-bold">
                                Lee antes de responder o descargar el checklist
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-300">
                                Estos recursos ayudan a ordenar el caso si todavía estás reuniendo documentos.
                            </p>
                        </div>
                        <div className="grid gap-4">
                            {resources.map((resource) => (
                                <Link key={resource.href} href={resource.href} className="rounded-lg border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
                                    <h3 className="text-lg font-bold text-white">{resource.title}</h3>
                                    <p className="mt-2 text-sm leading-7 text-slate-300">{resource.text}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-white py-20">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="section-badge">Siguiente paso</span>
                        <h2 className="mt-4 text-3xl font-bold text-slate-950">
                            Si ya tienes una observación, no respondas con documentos sueltos
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            Envíanos el contexto básico y te indicamos cómo empezar la revisión. Si el caso es simple, te orientamos; si requiere análisis técnico, te proponemos el alcance.
                        </p>
                        <div className="mt-8">
                            <WhatsAppLink route="ajuste-de-valor-aduanero-final" messageKey="asesoria_gratis" variant="button">
                                Quiero revisar mi ajuste de valor
                            </WhatsAppLink>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
