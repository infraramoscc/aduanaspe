import type { Metadata } from 'next';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';
import { JsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Regímenes aduaneros en Perú: tipos y cómo elegir | AduanasPE',
    description: 'Compara los principales regímenes aduaneros en Perú, su finalidad y tratamiento general para elegir la destinación adecuada antes de declarar.',
    alternates: {
        canonical: 'https://aduanaspe.com/comercio-exterior/regimenes-aduaneros/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

const regimenes = [
    {
        title: 'Importación para el consumo',
        desc: 'Es el régimen más común para nacionalizar mercadería destinada al uso o venta definitiva en el país.',
        code: 'Código 10',
        icon: '01',
    },
    {
        title: 'Admisión temporal',
        desc: 'Permite el ingreso temporal de mercancías con suspensión de tributos para un fin específico.',
        code: 'Código 20',
        icon: '02',
    },
    {
        title: 'Exportación definitiva',
        desc: 'Aplica a la salida legal de mercancías nacionales o nacionalizadas hacia mercados del exterior.',
        code: 'Código 40',
        icon: '03',
    },
    {
        title: 'Depósito aduanero',
        desc: 'Permite almacenar mercancías bajo control aduanero sin pagar tributos hasta definir su destinación final.',
        code: 'Código 70',
        icon: '04',
    },
];

const decisionGuide = [
    {
        regimen: 'Importación para el consumo',
        finalidad: 'Ingresar mercancía para usarla o venderla definitivamente en Perú.',
        permanencia: 'Definitiva',
        tributos: 'Se pagan los tributos aplicables al nacionalizar.',
        riesgo: 'Comprar sin validar clasificación, permisos o costo total.',
    },
    {
        regimen: 'Admisión temporal',
        finalidad: 'Ingresar mercancía por un plazo y finalidad específicos.',
        permanencia: 'Temporal',
        tributos: 'Puede suspender tributos mientras se cumplan las condiciones.',
        riesgo: 'Vencer el plazo o usar la mercancía para un fin distinto.',
    },
    {
        regimen: 'Exportación definitiva',
        finalidad: 'Enviar mercancía nacional o nacionalizada al exterior.',
        permanencia: 'Salida definitiva',
        tributos: 'No paga tributos de exportación; puede exigir regularización documental.',
        riesgo: 'Documentos inconsistentes o regularización fuera de plazo.',
    },
    {
        regimen: 'Depósito aduanero',
        finalidad: 'Almacenar mercancía bajo control aduanero antes de definir su destino.',
        permanencia: 'Temporal',
        tributos: 'Difiere el pago hasta la destinación posterior.',
        riesgo: 'No controlar plazos, almacenaje y costos de retiro.',
    },
];

const faqs = [
    {
        question: '¿Cuál es el régimen aduanero más usado para importar a Perú?',
        answer: 'La importación para el consumo es el régimen habitual cuando la mercancía permanecerá en Perú para uso o venta. La elección depende del objetivo, plazo y tratamiento previsto.',
    },
    {
        question: '¿Se puede cambiar de régimen aduanero después?',
        answer: 'Algunas mercancías admiten una destinación posterior, pero no debe asumirse que el cambio siempre es posible. Conviene validar plazos, requisitos y situación de la carga antes de declarar.',
    },
    {
        question: '¿Qué debo revisar antes de elegir un régimen?',
        answer: 'Revisa la finalidad de la mercancía, cuánto tiempo permanecerá en el país, permisos, documentos, tributos, garantías y obligaciones de regularización.',
    },
];

export default function RegimenesAduanerosPage() {
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Comercio Exterior', url: 'https://aduanaspe.com/comercio-exterior/' },
        { name: 'Regimenes Aduaneros', url: 'https://aduanaspe.com/comercio-exterior/regimenes-aduaneros/' },
    ]);

    return (
        <>
            <JsonLd json={breadcrumbJsonLd} />
            <FaqJsonLd faqs={faqs} />
            <Hero
                badge="Regímenes aduaneros"
                title="Elige la destinación correcta antes de mover tu operación"
                highlightedWord="destinación correcta"
                subtitle="Entender el régimen aplicable ayuda a evitar errores, ordenar costos y tomar mejores decisiones tributarias."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '01', title: 'Objetivo de la carga', description: 'Define el régimen' },
                            { icon: '02', title: 'Tributos', description: 'Cambian según la destinación' },
                            { icon: '03', title: 'Riesgos', description: 'Si se elige mal' },
                            { icon: '04', title: 'Asesoría', description: 'Para casos específicos' },
                        ]}
                    />
                }
            >
                <Link href="#tipos">
                    <Button size="lg">Explorar regímenes</Button>
                </Link>
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">Consultar con un experto</Button>
                </Link>
            </Hero>

            <section id="tipos" className="bg-slate-50 py-20">
                <Container>
                    <div className="mb-16 text-center">
                        <span className="section-badge">Clasificación</span>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Regímenes <span className="gradient-text">más consultados</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Estos son algunos de los regímenes más relevantes para operaciones frecuentes de comercio exterior.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {regimenes.map((reg) => (
                            <div key={reg.code} className="service-card service-card-roomy service-blue">
                                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                                    {reg.icon}
                                </span>
                                <span className="mb-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                                    {reg.code}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900">{reg.title}</h3>
                                <p className="mt-3 text-slate-600">{reg.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-white py-20">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="section-badge">Comparación práctica</span>
                        <h2 className="mt-4 text-3xl font-bold text-slate-950">
                            Compara el objetivo antes de elegir el régimen
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-slate-600">
                            El régimen no se elige solo por el nombre de la operación. Primero define qué ocurrirá con la mercancía, por cuánto tiempo y qué obligaciones tendrás que cumplir.
                        </p>
                    </div>
                    <div className="mt-10 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <table className="w-full min-w-[900px] text-left text-sm">
                            <thead className="bg-slate-950 text-white">
                                <tr>
                                    {['Régimen', 'Finalidad', 'Permanencia', 'Tratamiento tributario general', 'Riesgo habitual'].map((label) => (
                                        <th key={label} className="px-5 py-4 font-semibold">{label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {decisionGuide.map((item) => (
                                    <tr key={item.regimen} className="align-top">
                                        <th className="px-5 py-5 font-bold text-slate-950">{item.regimen}</th>
                                        <td className="px-5 py-5 leading-6 text-slate-600">{item.finalidad}</td>
                                        <td className="px-5 py-5 leading-6 text-slate-600">{item.permanencia}</td>
                                        <td className="px-5 py-5 leading-6 text-slate-600">{item.tributos}</td>
                                        <td className="px-5 py-5 leading-6 text-slate-600">{item.riesgo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-5 text-sm leading-6 text-slate-500">
                        Esta comparación es orientativa. La aplicación concreta depende de la mercancía, documentos, plazos y normativa vigente.
                    </p>
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <Link href={ROUTES.comercioExterior.importacion} className="service-card service-blue p-6">
                            <h3 className="font-bold text-slate-950">Si la mercancía ingresará a Perú</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Revisa la guía de importación, costos, documentos y modalidades.</p>
                        </Link>
                        <Link href={ROUTES.comercioExterior.exportacion} className="service-card service-green p-6">
                            <h3 className="font-bold text-slate-950">Si la mercancía saldrá del país</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Revisa requisitos y documentos para exportar desde Perú.</p>
                        </Link>
                        <Link href={ROUTES.servicios.consultoriaAduanera} className="service-card service-orange p-6">
                            <h3 className="font-bold text-slate-950">Si el caso no encaja claramente</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Valida el régimen, los plazos y el tratamiento antes de declarar.</p>
                        </Link>
                    </div>
                </Container>
            </section>

            <SplitFeature
                title="Elegir mal el régimen también tiene costo"
                description="Una destinación incorrecta puede generar contingencias, retrasos o pagos que no correspondían. Por eso conviene revisar el objetivo real de la operación antes de declarar."
                imageSide="right"
            >
                    <div className="space-y-4">
                    <div className="service-card service-card-compact service-coral">
                        <h4 className="font-bold text-red-800">Riesgo operativo</h4>
                        <p className="mt-1 text-sm text-red-700">Observaciones, demoras y costos adicionales por una mala destinación.</p>
                    </div>
                    <div className="service-card service-card-compact service-green">
                        <h4 className="font-bold text-emerald-800">Oportunidad de orden</h4>
                        <p className="mt-1 text-sm text-emerald-700">Con el régimen correcto, la operación se planifica mejor desde el inicio.</p>
                    </div>
                </div>
            </SplitFeature>

            <Container>
                <div className="py-20">
                    <div className="service-card service-dark mx-auto max-w-3xl p-8 text-center text-white md:p-12">
                        <h2 className="text-3xl font-bold">¿No sabes qué régimen aplicar?</h2>
                        <p className="mt-4 text-lg text-slate-300">
                            Cuéntanos qué tipo de mercancía manejas y cuál es el objetivo de la operación para orientarte mejor.
                        </p>
                        <DiagnosticoForm title="" className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-6" />
                    </div>
                </div>
            </Container>

            <section className="bg-slate-50 py-20">
                <Container>
                    <div className="mx-auto max-w-3xl">
                        <span className="section-badge">Preguntas frecuentes</span>
                        <h2 className="mt-4 text-3xl font-bold text-slate-950">Dudas antes de declarar</h2>
                        <div className="mt-8 space-y-5">
                            {faqs.map((faq) => (
                                <article key={faq.question} className="service-card service-blue p-6">
                                    <h3 className="text-lg font-bold text-slate-950">{faq.question}</h3>
                                    <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <CTASection
                title="Asesoría para decisiones aduaneras"
                subtitle="Si tienes una operación más compleja, conviene revisar el régimen antes de seguir avanzando."
            >
                <Link href={ROUTES.servicios.consultoriaAduanera}>
                    <Button size="lg" variant="secondary">
                        Ver servicio de consultoría
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
