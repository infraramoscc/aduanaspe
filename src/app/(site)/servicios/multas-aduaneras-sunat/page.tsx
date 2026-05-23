import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';
import { JsonLd } from '@/components/seo/JsonLd';
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
        title: 'Recibiste una notificacion de SUNAT Aduanas',
        text: 'Revisamos que acto te notificaron, que plazo tienes, que informacion piden y cual es el riesgo real antes de responder.',
    },
    {
        title: 'Te impusieron o anunciaron una multa aduanera',
        text: 'Identificamos el codigo, supuesto de infraccion, base de calculo y documentos que pueden ayudar a sustentar tu posicion.',
    },
    {
        title: 'Tienes un requerimiento o fiscalizacion posterior',
        text: 'Ordenamos el expediente para responder con trazabilidad, no con archivos sueltos enviados a ultimo momento.',
    },
    {
        title: 'Hay errores en DAM, factura, valor o permisos',
        text: 'Separamos si el problema es de valor, documentacion, mercancia restringida, tributos, regimen o transmision de datos.',
    },
];

const reviewScope = [
    'Notificacion, requerimiento, esquela, resolucion o comunicacion recibida',
    'Codigo o supuesto de infraccion invocado por SUNAT, si ya aparece en el documento',
    'Declaracion aduanera, factura, packing list, documento de transporte y documentos digitalizados',
    'Valor declarado, tributos, recargos, percepcion, pagos y sustento comercial',
    'Permisos, autorizaciones, VUCE, vistos buenos o documentos sectoriales aplicables',
    'Plazos, estado del expediente y riesgo de responder sin ordenar la evidencia',
];

const responseRoutes = [
    {
        title: 'Revision inicial de la notificacion',
        text: 'Leemos el documento y ubicamos que exige SUNAT, cual es el plazo y que consecuencia podria tener no responder bien.',
    },
    {
        title: 'Mapa de riesgo y documentos',
        text: 'Clasificamos el problema: valor, datos de la DAM, factura, permisos, documentacion incompleta, fiscalizacion o regimen.',
    },
    {
        title: 'Criterio de respuesta o descargo',
        text: 'Definimos que conviene sustentar, subsanar, aclarar o ampliar antes de presentar una respuesta formal.',
    },
    {
        title: 'Acompanamiento segun alcance',
        text: 'Si el caso requiere trabajo tecnico adicional, delimitamos el alcance antes de preparar escritos o revisar expedientes extensos.',
    },
];

const contentLinks = [
    {
        title: 'Multas aduaneras SUNAT',
        href: '/blog/multas-aduaneras-sunat-como-evitarlas/',
        text: 'Guia principal para entender tipos de infracciones, tabla de sanciones y riesgos frecuentes.',
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
    {
        title: 'Fiscalizacion aduanera posterior',
        href: '/blog/fiscalizacion-aduanera-posterior-sunat/',
        text: 'Que suele pedir SUNAT despues del despacho y como prepararte documentalmente.',
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

            <section className="overflow-hidden bg-slate-950 py-16 text-white md:py-24">
                <Container>
                    <div className="max-w-4xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-200 sm:text-sm sm:tracking-[0.18em]">
                            Revision urgente para importadores y exportadores
                        </p>
                        <h1 className="mt-5 text-3xl font-bold leading-tight text-balance sm:text-4xl md:text-6xl">
                            Te notifico SUNAT Aduanas o tienes una multa aduanera?
                        </h1>
                        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                            Revisamos tu notificacion, requerimiento o resolucion para entender el riesgo, ordenar los documentos y definir como responder con criterio tecnico antes de que el problema avance.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <WhatsAppLink route="multas-aduaneras-sunat" messageKey="asesoria_gratis" variant="button" className="w-full justify-center text-center sm:w-auto">
                                Revisar mi notificacion por WhatsApp
                            </WhatsAppLink>
                            <Link href="#documentos" className="w-full sm:w-auto">
                                <Button variant="secondary" size="lg" className="w-full text-center sm:w-auto">
                                    Ver documentos a enviar
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
                            <span className="section-badge">Casos urgentes</span>
                            <h2 className="mt-4 text-3xl font-bold text-slate-950">
                                No respondas una notificacion aduanera sin entender el supuesto
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                Una comunicacion de SUNAT puede ser un pedido de informacion, una actuacion de fiscalizacion, una observacion documental o una multa. El primer paso es leerla bien y separar el problema real.
                            </p>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            {urgentCases.map((item) => (
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
                        <span className="section-badge">Revision documental</span>
                        <h2 className="mt-4 text-3xl font-bold text-slate-950">
                            Que revisamos antes de recomendar una respuesta
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            El objetivo es evitar una respuesta improvisada. Primero ubicamos el tipo de actuacion, el plazo, el supuesto y la evidencia que puede sostener tu posicion.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-4 md:grid-cols-2">
                        {reviewScope.map((point) => (
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
                                Como trabajamos tu caso
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                No todos los casos requieren el mismo nivel de respuesta. Algunos se resuelven con una revision puntual; otros necesitan preparar sustento, descargo o estrategia documental.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {responseRoutes.map((step, index) => (
                                <div key={step.title} className="rounded-lg border border-slate-200 p-6">
                                    <p className="text-sm font-bold text-rose-700">Paso {index + 1}</p>
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
                    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div>
                            <span className="section-badge bg-white/10 text-rose-100">Contenido util</span>
                            <h2 className="mt-4 text-3xl font-bold">
                                Lee segun el tipo de problema que recibiste
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-300">
                                Si aun estas identificando el riesgo, estas guias te ayudan a ordenar la situacion antes de escribir o presentar documentos.
                            </p>
                        </div>
                        <div className="grid gap-4">
                            {contentLinks.map((resource) => (
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
                            Envia la notificacion antes de responder por tu cuenta
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            Te orientamos sobre el tipo de documento recibido y, si el caso requiere analisis tecnico, te proponemos un alcance claro para revisar expediente, sustento y estrategia de respuesta.
                        </p>
                        <div className="mt-8">
                            <WhatsAppLink route="multas-aduaneras-sunat-final" messageKey="asesoria_gratis" variant="button" className="justify-center text-center">
                                Quiero revisar mi multa aduanera
                            </WhatsAppLink>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
