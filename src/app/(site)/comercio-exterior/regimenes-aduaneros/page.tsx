import type { Metadata } from 'next';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { DiagnosticoForm } from '@/components/forms';
import { Container } from '@/components/layout';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Regímenes Aduaneros en Perú | Guía Completa 2026',
    description: 'Conoce los regímenes de importación, exportación y perfeccionamiento. Elige el correcto para optimizar costos tributarios.',
};

const regimenes = [
    {
        title: 'Importación para el Consumo',
        desc: 'El régimen más utilizado. Permite el ingreso de mercancías al territorio aduanero para su uso o consumo definitivo, luego del pago de tributos (Ad Valorem, IGV, IPM).',
        code: 'Código 10',
        icon: '📦'
    },
    {
        title: 'Admisión Temporal',
        desc: 'Permite recibir mercancías con suspensión de tributos para un fin específico (ej. exhibición, equipo para obras) con la condición de ser reexportadas en un plazo.',
        code: 'Código 20',
        icon: '⏱️'
    },
    {
        title: 'Exportación Definitiva',
        desc: 'Permite la salida legal de mercancías nacionales o nacionalizadas para su uso o consumo definitivo en el exterior. No está afecta a tributos.',
        code: 'Código 40',
        icon: '✈️'
    },
    {
        title: 'Depósito Aduanero',
        desc: 'Permite almacenar mercancías bajo control aduanero hasta por 12 meses sin pagar tributos, pudiendo realizar despachos parciales según necesidad.',
        code: 'Código 70',
        icon: '🏭'
    }
];

export default function RegimenesAduanerosPage() {
    return (
        <>
            <Hero
                badge="⚖️ Normativa Aduanera"
                title="Regímenes Aduaneros"
                highlightedWord="Regímenes"
                subtitle="Elige la modalidad correcta para tu operación y optimiza tu carga tributaria legalmente."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '📋', title: 'Ley General', description: 'De Aduanas' },
                            { icon: '💰', title: 'Optimización', description: 'De tributos' },
                            { icon: '✅', title: 'Cumplimiento', description: 'Normativo' },
                            { icon: '🔍', title: 'Destinación', description: 'Correcta' },
                        ]}
                    />
                }
            >
                <Link href="#tipos">
                    <Button size="lg">Explorar Regímenes</Button>
                </Link>
                <Link href={ROUTES.contacto}>
                    <Button size="lg" variant="secondary">Consultar con experto</Button>
                </Link>
            </Hero>

            {/* Trust Bar integrated into Hero */}

            <section id="tipos" className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-16">
                        <span className="section-badge">Clasificación</span>
                        <h2 className="text-3xl font-bold text-slate-900">Principales <span className="gradient-text">Regímenes</span></h2>
                        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                            Existen diversos regímenes según la finalidad de tu mercancía. Aquí te explicamos los más comunes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {regimenes.map((reg, index) => (
                            <div key={reg.code} className="group relative bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl select-none pointer-events-none">
                                    {reg.icon}
                                </div>
                                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mb-4 group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                                    {reg.code}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">{reg.title}</h3>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    {reg.desc}
                                </p>
                                <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                                    <span className="text-sm text-slate-400 font-medium">Más detalles</span>
                                    <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                                        →
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Card "Ver todos" */}
                        <div className="flex flex-col justify-center items-center p-8 rounded-2xl border-2 border-dashed border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer group">
                            <span className="text-4xl mb-4 text-slate-300 group-hover:scale-110 transition-transform">📚</span>
                            <h3 className="text-lg font-bold text-slate-500 group-hover:text-purple-700">¿Buscas otro régimen?</h3>
                            <p className="text-center text-sm text-slate-400 mt-2">Hay más de 15 regímenes aduaneros diferentes.</p>
                            <Link href={ROUTES.contacto}>
                                <Button variant="ghost" size="sm" className="mt-4 text-purple-600">Consultar lista completa</Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            <SplitFeature
                title="¿Por qué es importante elegir bien?"
                description="Una destinación aduanera incorrecta puede generar multas severas, demoras en el despacho o el pago innecesario de impuestos que no podrás recuperar."
                imageSide="right"
            >
                <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-lg bg-red-50 border border-red-100">
                        <span className="text-2xl">🚫</span>
                        <div>
                            <h4 className="font-bold text-red-800">Riesgo de Multas</h4>
                            <p className="text-sm text-red-600">Sanciones por declaración incorrecta ante SUNAT.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-lg bg-green-50 border border-green-100">
                        <span className="text-2xl">💰</span>
                        <div>
                            <h4 className="font-bold text-green-800">Oportunidad de Ahorro</h4>
                            <p className="text-sm text-green-600">Regímenes suspensivos permiten diferir el pago de impuestos.</p>
                        </div>
                    </div>
                </div>
            </SplitFeature>

            <Container>
                <div className="py-20">
                    <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 z-0"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-6">¿No sabes cuál régimen aplicar?</h2>
                            <p className="text-slate-300 mb-8 text-lg">
                                Cuéntanos sobre tu operación y te diremos exactamente qué régimen aduanero te conviene para optimizar costos y tiempos.
                            </p>
                            <DiagnosticoForm title="" className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl" />
                        </div>
                    </div>
                </div>
            </Container>

            <CTASection
                title="Asesoría experta en aduanas"
                subtitle="Más de 10 años ayudando a empresas a importar y exportar bajo el régimen correcto."
            >
                <Link href={ROUTES.servicios.consultoriaAduanera}>
                    <Button size="lg" variant="secondary">
                        Ver servicio de Consultoría
                    </Button>
                </Link>
            </CTASection>
        </>
    );
}
