import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { Container } from '@/components/layout';
import { Button, Card, CardContent } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { PrecotizacionForm } from '@/components/forms';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Resguardo de Carga | Custodia y Seguridad',
    description: 'Servicio de resguardo para tu carga. Modalidades cabina y vehículo. Custodia desde recojo hasta entrega. Contratación junto con transporte o independiente.',
    alternates: {
        canonical: 'https://aduanaspe.com/servicios/resguardo-aduanero',
    },
    robots: {
        index: true,
        follow: true,
    },
};

// Modalidades de resguardo
const resguardoModes = [
    {
        icon: '👤',
        title: 'Resguardo Cabina',
        description: 'Personal de seguridad que acompaña al chofer dentro de la cabina durante todo el trayecto.',
        features: [
            'Presencia física junto al conductor',
            'Supervisión directa de la carga',
            'Comunicación constante con central',
            'Ideal para cargas de valor medio',
        ],
        recommended: 'Recomendado para traslados dentro de Lima',
    },
    {
        icon: '🚗',
        title: 'Resguardo Vehículo',
        description: 'Vehículo de seguridad que sigue al transporte durante todo el recorrido.',
        features: [
            'Seguimiento vehicular constante',
            'Mayor capacidad de respuesta',
            'Equipo de seguridad dedicado',
            'Ideal para cargas de alto valor',
        ],
        recommended: 'Recomendado para traslados largos o carga valiosa',
    },
];

// Por qué elegirnos
const whyChooseUs = [
    {
        icon: '🛡️',
        title: 'Reducción de Riesgos',
        description: 'La presencia de resguardo disuade intentos de robo y permite respuesta inmediata ante cualquier incidente.',
        highlight: 'Seguridad proactiva',
    },
    {
        icon: '📍',
        title: 'Monitoreo Constante',
        description: 'Comunicación permanente entre el resguardo, la central y el cliente durante todo el traslado.',
        highlight: 'Ojos en tu carga 24/7',
    },
    {
        icon: '🔄',
        title: 'Flexibilidad',
        description: 'Puede contratarse junto con nuestro servicio de transporte o de manera independiente si ya tienes transportista.',
        highlight: 'Se adapta a tu operación',
    },
    {
        icon: '📋',
        title: 'Cobertura Completa',
        description: 'Desde el punto de recojo hasta la entrega final en tu almacén.',
        highlight: 'Protección de puerta a puerta',
    },
];

// Cuándo contratar resguardo
const whenToHire = [
    { scenario: 'Carga de alto valor', description: 'Electrónicos, maquinaria, productos premium' },
    { scenario: 'Rutas de riesgo', description: 'Zonas con mayor incidencia de robos' },
    { scenario: 'Horarios nocturnos', description: 'Traslados fuera del horario laboral' },
    { scenario: 'Productos sensibles', description: 'Medicamentos, alimentos, etc.' },
    { scenario: 'Requerimiento del seguro', description: 'Algunas pólizas exigen resguardo' },
];

// FAQ
const faqs = [
    {
        question: '¿Puedo contratar solo resguardo sin transporte?',
        answer: 'Sí, el resguardo puede contratarse de manera independiente si ya tienes tu propio transportista o quieres agregar seguridad a una operación existente.',
    },
    {
        question: '¿Cuál modalidad me conviene?',
        answer: 'Resguardo Cabina es ideal para traslados dentro de Lima con carga de valor medio. Resguardo Vehículo es mejor para trayectos largos, carga de alto valor o cuando se requiere mayor capacidad de respuesta.',
    },
    {
        question: '¿El resguardo va armado?',
        answer: 'El personal de resguardo cuenta con las autorizaciones y equipamiento correspondientes según la normativa vigente.',
    },
    {
        question: '¿Cómo se cotiza el resguardo?',
        answer: 'La cotización depende de la modalidad (cabina o vehículo), la ruta, la duración estimada del traslado y el tipo de carga.',
    },
    {
        question: '¿Qué pasa si hay un incidente durante el traslado?',
        answer: 'El personal de resguardo está capacitado para manejar situaciones de emergencia, mantener comunicación con la central y coordinar con las autoridades si es necesario.',
    },
];

export default function ResguardoPage() {
    return (
        <>
            {/* Hero */}
            <Hero
                badge="✨ Resguardo de Carga"
                title="Custodia y Seguridad para tu Carga"
                highlightedWord="Seguridad"
                subtitle="Custodia y acompañamiento de tu mercancía durante todo el traslado. Seguridad desde el recojo hasta la entrega."
                size="lg"
                showStats={false}
                showFloatingCards={true}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '👤', title: 'Resguardo Cabina', description: 'En la unidad' },
                            { icon: '🚗', title: 'Resguardo Vehículo', description: 'Seguimiento' },
                            { icon: '📍', title: 'Monitoreo', description: 'Constante' },
                            { icon: '🛡️', title: 'Seguridad', description: 'Garantizada' },
                        ]}
                    />
                }
            >
                <WhatsAppLink route="resguardo-aduanero" serviceName="resguardo-aduanero" variant="button">
                    Cotizar resguardo
                </WhatsAppLink>
                <Link href="#modalidades">
                    <Button variant="secondary" size="lg">
                        Ver modalidades
                    </Button>
                </Link>
            </Hero>

            {/* Trust Bar integrated into Hero */}

            {/* Qué es */}
            <SplitFeature
                title="¿Qué es el resguardo de carga?"
                description="El resguardo consiste en la custodia y acompañamiento de tu mercancía durante todo el traslado. Personal de seguridad acompaña el transporte desde el punto de recojo hasta la entrega final, reduciendo riesgos y fortaleciendo la seguridad de la operación logística."
                imageSide="right"
                image={
                    <div className="relative w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-300/30 to-transparent"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <span className="text-9xl filter drop-shadow-2xl animate-pulse">🛡️</span>
                            <div className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg shadow-xl border border-slate-700 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                                <span className="font-mono text-sm">SISTEMA ACTIVO</span>
                            </div>
                        </div>
                    </div>
                }
            >
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <p className="text-sm text-orange-800">
                        <strong>Importante:</strong> El resguardo puede contratarse junto con nuestro servicio de transporte o de manera independiente si ya tienes transportista.
                    </p>
                </div>
            </SplitFeature>

            {/* Modalidades */}
            <section id="modalidades" className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Modalidades</span>
                        <h2 className="text-3xl font-bold text-slate-900">Elige tu nivel de <span className="gradient-text">Protección</span></h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Dos opciones adaptadas a tus necesidades
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {resguardoModes.map((mode, index) => {
                            const colorClass = index === 0 ? 'service-blue' : 'service-orange';
                            return (
                                <div key={mode.title} className={`service-card ${colorClass} h-full p-8`}>
                                    <div className="text-center mb-6">
                                        <span className="text-6xl filter drop-shadow-md">{mode.icon}</span>
                                        <h3 className="mt-4 text-2xl font-bold text-slate-900">{mode.title}</h3>
                                        <p className="mt-3 text-slate-600 font-medium">{mode.description}</p>
                                    </div>
                                    <ul className="space-y-4 mb-6">
                                        {mode.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3 text-slate-600">
                                                <span className="text-purple-600 flex-shrink-0 mt-1">✓</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-auto p-4 bg-white/50 rounded-xl border border-white/60">
                                        <p className="text-sm text-slate-800 text-center font-semibold">💡 {mode.recommended}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Contexto: Dónde encaja el Resguardo */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Integración</span>
                        <h2 className="text-3xl font-bold text-slate-900">Servicio opcional para cualquier <span className="gradient-text">etapa</span></h2>
                        <p className="mt-4 text-lg text-slate-600">
                            El resguardo puede contratarse en cualquier momento del proceso
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {/* Etapas principales */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Etapa 1 */}
                            <Link href="/servicios/agencia-de-carga-internacional" className="group block p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-slate-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 1</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🚢</span>
                                    <h3 className="font-bold text-slate-900">Agenciamiento de Carga</h3>
                                    <p className="text-sm text-slate-600 mt-2">Flete desde origen</p>
                                    <p className="text-xs text-orange-600 font-medium mt-2">+ Resguardo opcional</p>
                                </div>
                            </Link>
                            {/* Etapa 2 */}
                            <Link href="/servicios/agenciamiento-aduanas" className="group block p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-slate-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 2</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">📋</span>
                                    <h3 className="font-bold text-slate-900">Agenciamiento de Aduanas</h3>
                                    <p className="text-sm text-slate-600 mt-2">Despacho aduanero</p>
                                    <p className="text-xs text-orange-600 font-medium mt-2">+ Resguardo opcional</p>
                                </div>
                            </Link>
                            {/* Etapa 3 */}
                            <Link href="/servicios/transporte-de-carga" className="group block p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-slate-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 3</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🚚</span>
                                    <h3 className="font-bold text-slate-900">Transporte de Carga</h3>
                                    <p className="text-sm text-slate-600 mt-2">Entrega en tu almacén</p>
                                    <p className="text-xs text-orange-600 font-medium mt-2">+ Resguardo opcional</p>
                                </div>
                            </Link>
                        </div>

                        {/* Servicios Opcionales */}
                        <div className="mt-10">
                            <div className="text-center mb-6">
                                <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full">
                                    ⚡ Servicios Opcionales - Contrátalos en cualquier etapa
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Resguardo Aduanero - Actual */}
                                <div className="flex items-center gap-4 p-5 rounded-xl bg-orange-50 border-2 border-orange-500 shadow-lg ring-2 ring-orange-200 ring-offset-2 scale-105">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-orange-200 flex items-center justify-center">
                                        <span className="text-2xl">🛡️</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900">Resguardo Aduanero</h4>
                                            <span className="px-2 py-0.5 bg-orange-600 text-white text-[10px] font-bold rounded-full animate-pulse">ESTÁS AQUÍ</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-1">Custodia y seguridad para tu mercancía</p>
                                    </div>
                                </div>
                                {/* Consultoría Aduanera */}
                                <Link href="/servicios/consultoria-aduanera" className="group flex items-center gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">💡</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900">Consultoría Aduanera</h4>
                                            <span className="px-2 py-0.5 bg-cyan-500 text-white text-[10px] font-bold rounded-full">OPCIONAL</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-1">Asesoría experta para optimizar tus operaciones</p>
                                        <p className="text-xs text-cyan-600 font-medium mt-1 group-hover:underline">Ver más →</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Servicio Integral */}
                        <div className="mt-8 p-8 rounded-xl bg-gradient-to-r from-slate-800 to-purple-800 text-white text-center shadow-xl">
                            <h3 className="text-xl font-bold">¿Prefieres un servicio integral?</h3>
                            <p className="mt-2 text-slate-300">Contratamos las 3 etapas + resguardo + consultoría por ti. Un solo punto de contacto, una sola factura.</p>
                            <div className="mt-6">
                                <WhatsAppLink route="servicio-integral" serviceName="servicio-integral" variant="button">
                                    Cotizar servicio integral
                                </WhatsAppLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Por qué elegirnos */}
            <section className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Beneficios</span>
                        <h2 className="text-3xl font-bold text-slate-900">¿Por qué contratar <span className="gradient-text">resguardo</span>?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {whyChooseUs.map((item, index) => {
                            const colors = ['orange', 'green', 'blue', 'pink'];
                            const colorClass = colors[index % colors.length];
                            return (
                                <div key={item.title} className={`service-card service-${colorClass} h-full p-6`}>
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl">{item.icon}</span>
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                                            <p className="mt-2 text-slate-600">{item.description}</p>
                                            <p className="mt-3 text-sm italic text-slate-500 border-l-2 border-orange-300 pl-2">{item.highlight}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Cuándo contratar */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Recomendación</span>
                        <h2 className="text-3xl font-bold text-slate-900">¿Cuándo necesitas <span className="gradient-text">resguardo</span>?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {whenToHire.map((item) => (
                            <div key={item.scenario} className="p-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-default">
                                <h4 className="font-semibold text-slate-900 text-lg border-b border-slate-200 pb-2 mb-2">{item.scenario}</h4>
                                <p className="text-sm text-slate-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Relación con Transporte */}
            <SplitFeature
                title="Resguardo + Transporte"
                description="Si necesitas tanto el transporte como el resguardo, podemos ofrecerte un paquete integrado. Un solo punto de contacto, coordinación simplificada y mejor precio."
                imageSide="left"
                image={
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="p-6 bg-white rounded-2xl shadow-xl border border-slate-100 transform -rotate-6 z-10">
                                <span className="text-6xl">🚚</span>
                            </div>
                            <div className="p-6 bg-orange-500 rounded-2xl shadow-xl border-4 border-white transform rotate-6 z-20">
                                <span className="text-6xl">👮</span>
                            </div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-slate-300 skew-y-3"></div>
                    </div>
                }
            >
                <Link href="/servicios/transporte-de-carga">
                    <Button>Ver servicio de Transporte</Button>
                </Link>
            </SplitFeature>

            {/* FAQ */}
            <section className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Ayuda</span>
                        <h2 className="text-3xl font-bold text-slate-900">Preguntas <span className="gradient-text">Frecuentes</span></h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-slate-900 text-lg">{faq.question}</h4>
                                <p className="mt-2 text-slate-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Formulario */}
            <Container>
                <div id="cotizacion" className="py-16">
                    <PrecotizacionForm
                        title="Cotiza tu resguardo"
                        serviceName="resguardo-aduanero"
                    />
                </div>
            </Container>

            {/* CTA Final */}
            <CTASection
                title="¿Necesitas proteger tu carga?"
                highlightedWord="proteger"
                subtitle="Escríbenos y te cotizamos el resguardo según tu operación."
            >
                <WhatsAppLink route="resguardo-aduanero-cta" serviceName="resguardo-aduanero" variant="button">
                    Cotizar por WhatsApp
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
