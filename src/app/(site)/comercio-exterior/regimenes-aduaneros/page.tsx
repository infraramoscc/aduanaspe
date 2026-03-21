import type { Metadata } from 'next';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import { JsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Regímenes Aduaneros en Perú | AduanasPE',
    description: 'Conoce los principales regímenes aduaneros en Perú y cómo elegir la destinación correcta según el objetivo de tu operación.',
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

export default function RegimenesAduanerosPage() {
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Comercio Exterior', url: 'https://aduanaspe.com/comercio-exterior/' },
        { name: 'Regimenes Aduaneros', url: 'https://aduanaspe.com/comercio-exterior/regimenes-aduaneros/' },
    ]);

    return (
        <>
            <JsonLd json={breadcrumbJsonLd} />
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
                            <div key={reg.code} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
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

            <SplitFeature
                title="Elegir mal el régimen también tiene costo"
                description="Una destinación incorrecta puede generar contingencias, retrasos o pagos que no correspondían. Por eso conviene revisar el objetivo real de la operación antes de declarar."
                imageSide="right"
            >
                <div className="space-y-4">
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                        <h4 className="font-bold text-red-800">Riesgo operativo</h4>
                        <p className="mt-1 text-sm text-red-700">Observaciones, demoras y costos adicionales por una mala destinación.</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                        <h4 className="font-bold text-emerald-800">Oportunidad de orden</h4>
                        <p className="mt-1 text-sm text-emerald-700">Con el régimen correcto, la operación se planifica mejor desde el inicio.</p>
                    </div>
                </div>
            </SplitFeature>

            <Container>
                <div className="py-20">
                    <div className="mx-auto max-w-3xl rounded-3xl bg-slate-900 p-8 text-center text-white md:p-12">
                        <h2 className="text-3xl font-bold">¿No sabes qué régimen aplicar?</h2>
                        <p className="mt-4 text-lg text-slate-300">
                            Cuéntanos qué tipo de mercancía manejas y cuál es el objetivo de la operación para orientarte mejor.
                        </p>
                        <DiagnosticoForm title="" className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-6" />
                    </div>
                </div>
            </Container>

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
