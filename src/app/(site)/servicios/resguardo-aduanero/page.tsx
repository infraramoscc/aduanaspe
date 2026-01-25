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
    },
    {
        icon: '📍',
        title: 'Monitoreo Constante',
        description: 'Comunicación permanente entre el resguardo, la central y el cliente durante todo el traslado.',
    },
    {
        icon: '🔄',
        title: 'Flexibilidad',
        description: 'Puede contratarse junto con nuestro servicio de transporte o de manera independiente si ya tienes transportista.',
    },
    {
        icon: '📋',
        title: 'Cobertura Completa',
        description: 'Desde el punto de recojo hasta la entrega final en tu almacén.',
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
                title="Resguardo de Carga"
                subtitle="Custodia y acompañamiento de tu mercancía durante todo el traslado. Seguridad desde el recojo hasta la entrega."
                size="lg"
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

            {/* Trust Bar */}
            <TrustBar
                points={[
                    { icon: '👤', title: 'Resguardo Cabina', description: 'En la unidad' },
                    { icon: '🚗', title: 'Resguardo Vehículo', description: 'Seguimiento' },
                    { icon: '📍', title: 'Monitoreo', description: 'Constante' },
                    { icon: '🛡️', title: 'Seguridad', description: 'Garantizada' },
                ]}
            />

            {/* Contexto: Dónde encaja el Resguardo */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Servicio opcional para cualquier etapa</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            El resguardo puede contratarse en cualquier momento del proceso de importación
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {/* Etapas principales */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Etapa 1 */}
                            <Link href="/servicios/agencia-de-carga-internacional" className="group block p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 1</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🚢</span>
                                    <h3 className="font-bold text-gray-900">Agenciamiento de Carga</h3>
                                    <p className="text-sm text-gray-600 mt-2">Flete desde origen</p>
                                    <p className="text-xs text-orange-600 font-medium mt-2">+ Resguardo opcional</p>
                                </div>
                            </Link>
                            {/* Etapa 2 */}
                            <Link href="/servicios/agenciamiento-aduanas" className="group block p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 2</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">📋</span>
                                    <h3 className="font-bold text-gray-900">Agenciamiento de Aduanas</h3>
                                    <p className="text-sm text-gray-600 mt-2">Despacho aduanero</p>
                                    <p className="text-xs text-orange-600 font-medium mt-2">+ Resguardo opcional</p>
                                </div>
                            </Link>
                            {/* Etapa 3 */}
                            <Link href="/servicios/transporte-de-carga" className="group block p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full mb-3">ETAPA 3</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🚚</span>
                                    <h3 className="font-bold text-gray-900">Transporte de Carga</h3>
                                    <p className="text-sm text-gray-600 mt-2">Entrega en tu almacén</p>
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
                                <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-orange-100 to-amber-100 border-2 border-orange-500 shadow-lg ring-2 ring-orange-300 ring-offset-2">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-orange-200 flex items-center justify-center">
                                        <span className="text-2xl">🛡️</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-gray-900">Resguardo Aduanero</h4>
                                            <span className="px-2 py-0.5 bg-orange-600 text-white text-[10px] font-bold rounded-full animate-pulse">ESTÁS AQUÍ</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Custodia y seguridad para tu mercancía</p>
                                    </div>
                                </div>
                                {/* Consultoría Aduanera */}
                                <Link href="/servicios/consultoria-aduanera" className="group flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all hover:-translate-y-1">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">💡</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-gray-900">Consultoría Aduanera</h4>
                                            <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full">OPCIONAL</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Asesoría experta para optimizar tus operaciones</p>
                                        <p className="text-xs text-blue-600 font-medium mt-1 group-hover:underline">Ver más →</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Servicio Integral */}
                        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-center shadow-xl">
                            <h3 className="text-xl font-bold">¿Prefieres un servicio integral?</h3>
                            <p className="mt-2 text-violet-100">Contratamos las 3 etapas + resguardo + consultoría por ti. Un solo punto de contacto, una sola factura.</p>
                            <div className="mt-4">
                                <WhatsAppLink route="servicio-integral" serviceName="servicio-integral" variant="button">
                                    Cotizar servicio integral
                                </WhatsAppLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Qué es */}
            <SplitFeature
                title="¿Qué es el resguardo de carga?"
                description="El resguardo consiste en la custodia y acompañamiento de tu mercancía durante todo el traslado. Personal de seguridad acompaña el transporte desde el punto de recojo hasta la entrega final, reduciendo riesgos y fortaleciendo la seguridad de la operación logística."
                imageSide="right"
            >
                <div className="p-4 bg-violet-50 rounded-xl">
                    <p className="text-sm text-violet-800">
                        <strong>Importante:</strong> El resguardo puede contratarse junto con nuestro servicio de transporte o de manera independiente si ya tienes transportista.
                    </p>
                </div>
            </SplitFeature>

            {/* Modalidades */}
            <section id="modalidades" className="py-16 bg-gradient-to-br from-violet-50 to-fuchsia-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Modalidades de Resguardo</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Elige la que mejor se adapte a tu operación
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {resguardoModes.map((mode) => (
                            <Card key={mode.title} className="h-full">
                                <CardContent className="p-8">
                                    <div className="text-center mb-6">
                                        <span className="text-6xl">{mode.icon}</span>
                                        <h3 className="mt-4 text-2xl font-bold text-violet-600">{mode.title}</h3>
                                        <p className="mt-3 text-gray-600">{mode.description}</p>
                                    </div>
                                    <ul className="space-y-3">
                                        {mode.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2 text-gray-600">
                                                <span className="text-violet-600 flex-shrink-0">✓</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-6 p-3 bg-violet-100 rounded-lg">
                                        <p className="text-sm text-violet-800 text-center">{mode.recommended}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Por qué elegirnos */}
            <section className="py-16 bg-white">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">¿Por qué contratar resguardo?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {whyChooseUs.map((item) => (
                            <Card key={item.title} className="h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl">{item.icon}</span>
                                        <div>
                                            <h3 className="text-xl font-semibold text-violet-600">{item.title}</h3>
                                            <p className="mt-2 text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Cuándo contratar */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">¿Cuándo necesitas resguardo?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {whenToHire.map((item) => (
                            <div key={item.scenario} className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                                <h4 className="font-semibold text-gray-900">{item.scenario}</h4>
                                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
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
            >
                <Link href="/servicios/transporte-de-carga">
                    <Button>Ver servicio de Transporte</Button>
                </Link>
            </SplitFeature>

            {/* FAQ */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Preguntas Frecuentes</h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="bg-white rounded-xl p-6 shadow-sm">
                                <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                                <p className="mt-2 text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Formulario */}
            <Container>
                <div id="cotizacion" className="py-12">
                    <PrecotizacionForm
                        title="Cotiza tu resguardo"
                        serviceName="resguardo-aduanero"
                    />
                </div>
            </Container>

            {/* CTA Final */}
            <CTASection
                title="¿Necesitas proteger tu carga?"
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
