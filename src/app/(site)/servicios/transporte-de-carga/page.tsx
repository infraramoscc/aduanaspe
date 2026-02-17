import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { PrecotizacionForm } from '@/components/forms';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
    title: 'Transporte de Carga | Entrega Segura desde Puerto',
    description: 'Transporte de carga desde puerto/aeropuerto hasta tu almacén. GPS, seguimiento constante. Callao, Lima y provincias. Resguardo opcional.',
    alternates: {
        canonical: 'https://aduanaspe.com/servicios/transporte-de-carga',
    },
    robots: {
        index: true,
        follow: true,
    },
};

// Qué incluye el servicio
const serviceIncludes = [
    { icon: '🚚', title: 'Transporte desde Puerto', description: 'Retiro de carga desde Callao y traslado a Lima' },
    { icon: '✈️', title: 'Transporte desde Aeropuerto', description: 'Retiro de carga aérea y entrega en destino' },
    { icon: '🏭', title: 'Entrega en Almacén', description: 'Llevamos la carga hasta tu puerta' },
    { icon: '🛡️', title: 'Resguardo de Carga', description: 'Custodia durante todo el traslado' },
    { icon: '📍', title: 'GPS y Monitoreo', description: 'Seguimiento en tiempo real de tu carga' },
    { icon: '📊', title: 'Estatus Constante', description: 'Te informamos sin que tengas que preguntar' },
    { icon: '🔄', title: 'Coordinación Provincial', description: 'Enlace con agencias para envíos a provincia' },
    { icon: '📋', title: 'Gestión Operativa', description: 'Nos encargamos de todo el proceso' },
];

// Tipos de unidades
const vehicleTypes = [
    { icon: '📦', title: 'Furgones', description: 'Para cargas pequeñas y medianas' },
    { icon: '🚛', title: 'Camiones', description: 'Para cargas grandes' },
    { icon: '🦅', title: 'Alas de Gaviota', description: 'Puertas laterales para carga y descarga rápida' },
    { icon: '🏗️', title: 'Plataformas', description: 'Para traslado de contenedores' },
];

// Por qué elegirnos
const whyChooseUs = [
    {
        icon: '📍',
        title: 'Monitoreo GPS',
        description: 'Todas las unidades cuentan con GPS. Sabemos dónde está tu carga en todo momento.',
        highlight: 'Visibilidad total del traslado',
    },
    {
        icon: '✅',
        title: 'Experiencia Comprobada',
        description: 'Conocemos las rutas, los depósitos y los procesos. Sabemos mover carga.',
        highlight: 'Años de experiencia en logística',
    },
    {
        icon: '📊',
        title: 'Comunicación Permanente',
        description: 'Te informamos el estado de tu carga sin que tengas que llamar al chofer.',
        highlight: 'Información centralizada y clara',
    },
    {
        icon: '🚚',
        title: 'Disponibilidad de Unidades',
        description: 'Red de transportistas que nos permite atender cualquier tipo de carga.',
        highlight: 'Siempre hay una unidad para ti',
    },
];

// Cobertura
const coverage = [
    { zone: 'Callao', description: 'Retiro desde puerto y depósitos temporales', icon: '🚢' },
    { zone: 'Lima Metropolitana', description: 'Entrega en todos los distritos', icon: '🏙️' },
    { zone: 'Provincias', description: 'Coordinación con agencias especializadas', icon: '🗺️' },
];

// Problemas que resuelve
const problemsSolved = [
    'No tener que buscar transportistas por tu cuenta',
    'No tener que llamar constantemente al chofer',
    'No tener que hacer seguimiento manual',
    'Recibir información actualizada y centralizada',
    'Contar con unidades adecuadas para tu tipo de carga',
];

// FAQ
const faqs = [
    {
        question: '¿Cómo se cotiza el transporte?',
        answer: 'La cotización considera: zona de destino, tipo de carga, peso y volumen. Te damos un precio claro antes de confirmar el servicio.',
    },
    {
        question: '¿El servicio incluye seguro?',
        answer: 'El seguro no está incluido por defecto, pero puede gestionarse como servicio adicional según la necesidad del cliente.',
    },
    {
        question: '¿Hacen entregas a provincia?',
        answer: 'Sí, coordinamos con agencias de transporte provinciales especializadas como Marvisur para asegurar la continuidad del traslado.',
    },
    {
        question: '¿Puedo contratar solo el resguardo sin transporte?',
        answer: 'Sí, el resguardo puede contratarse de manera independiente si ya tienes transporte pero necesitas custodia.',
    },
    {
        question: '¿Qué tipos de carga pueden transportar?',
        answer: 'Carga general, voluminosa, sobredimensionada, maquinaria. Contamos con furgones, camiones, alas de gaviota y plataformas.',
    },
];

export default function TransportePage() {
    return (
        <>
            {/* Hero */}
            <Hero
                badge="✨ Transporte de Carga"
                title="Transporte de Carga Local y Nacional desde Puerto"
                highlightedWord="Puerto"
                subtitle="Llevamos tu mercancía desde el puerto hasta tu almacén. Con GPS, seguimiento en tiempo real y comunicación permanente."
                size="lg"
                showStats={false}
                showFloatingCards={true}
                centered={true}
                footer={
                    <TrustBar
                        variant="clean"
                        points={[
                            { icon: '📍', title: 'GPS', description: 'Monitoreo en tiempo real' },
                            { icon: '🚚', title: 'Flota Diversa', description: 'Furgones a plataformas' },
                            { icon: '📊', title: 'Estatus Constante', description: 'Sin preguntar' },
                            { icon: '⚡', title: 'Cotización', description: 'En 1 hora' },
                        ]}
                    />
                }
            >
                <WhatsAppLink route="transporte-de-carga" serviceName="transporte-de-carga" variant="button">
                    Cotizar transporte
                </WhatsAppLink>
                <Link href="#unidades">
                    <Button variant="secondary" size="lg">
                        Ver tipos de unidades
                    </Button>
                </Link>
            </Hero>

            {/* Trust Bar integrated into Hero */}

            {/* Secuencia de Servicios */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Flujo de Trabajo</span>
                        <h2 className="text-3xl font-bold text-slate-900">Etapa final de tu <span className="gradient-text">importación</span></h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Este es el último paso. Tu carga ya pasó por aduanas, ahora la llevamos a tu almacén.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {/* Etapas principales */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Etapa 1 */}
                            <Link href="/servicios/agencia-de-carga-internacional" className="group block p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full mb-3">ETAPA 1</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🚢</span>
                                    <h3 className="font-bold text-slate-900">Agenciamiento de Carga</h3>
                                    <p className="text-sm text-slate-600 mt-2">Flete desde origen</p>
                                    <p className="text-xs text-green-600 font-medium mt-2">✓ Completada</p>
                                </div>
                            </Link>
                            {/* Etapa 2 */}
                            <Link href="/servicios/agenciamiento-aduanas" className="group block p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full mb-3">ETAPA 2</span>
                                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">📋</span>
                                    <h3 className="font-bold text-slate-900">Agenciamiento de Aduanas</h3>
                                    <p className="text-sm text-slate-600 mt-2">Despacho aduanero</p>
                                    <p className="text-xs text-green-600 font-medium mt-2">✓ Completada</p>
                                </div>
                            </Link>
                            {/* Etapa 3 - Actual */}
                            <div className="p-6 rounded-xl bg-purple-50 border-2 border-purple-500 shadow-lg ring-2 ring-purple-200 ring-offset-2 scale-105">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full mb-3 animate-pulse">ETAPA 3</span>
                                    <span className="text-3xl block mb-2">🚚</span>
                                    <h3 className="font-bold text-slate-900">Transporte de Carga</h3>
                                    <p className="text-sm text-slate-600 mt-2">Entrega en tu almacén</p>
                                    <p className="text-xs text-purple-600 font-medium mt-2">← Estás aquí</p>
                                </div>
                            </div>
                        </div>

                        {/* Servicios Opcionales */}
                        <div className="mt-12">
                            <div className="text-center mb-6">
                                <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full">
                                    ⚡ Servicios Opcionales - Contrátalos en cualquier etapa
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Consultoría Aduanera */}
                                <Link href="/servicios/consultoria-aduanera" className="group flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 hover:border-cyan-400 hover:shadow-lg transition-all hover:-translate-y-1">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">💡</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900">Consultoría Aduanera</h4>
                                            <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full">OPCIONAL</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-1">Asesoría experta para optimizar tus operaciones</p>
                                        <p className="text-xs text-blue-600 font-medium mt-1 group-hover:underline">Ver más →</p>
                                    </div>
                                </Link>
                                {/* Resguardo Aduanero */}
                                <Link href="/servicios/resguardo-aduanero" className="group flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all hover:-translate-y-1">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">🛡️</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900">Resguardo Aduanero</h4>
                                            <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-full">OPCIONAL</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-1">Custodia y seguridad para tu mercancía</p>
                                        <p className="text-xs text-orange-600 font-medium mt-1 group-hover:underline">Ver más →</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Servicio Integral */}
                        <div className="mt-8 p-8 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold">¿Prefieres un servicio integral?</h3>
                            <p className="mt-2 text-blue-100 text-lg">Contratamos las 3 etapas + opcionales por ti. Un solo punto de contacto, una sola factura.</p>
                            <div className="mt-6">
                                <WhatsAppLink route="servicio-integral" serviceName="servicio-integral" variant="button">
                                    Cotizar servicio integral
                                </WhatsAppLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Qué es el servicio */}
            <SplitFeature
                title="¿Qué hacemos por ti?"
                description="Nos encargamos del traslado de tu mercancía desde el puerto o aeropuerto hasta tu almacén. Actuamos como gestores logísticos: coordinamos la unidad, hacemos seguimiento, te informamos y resolvemos cualquier contratiempo."
                imageSide="right"
                image={
                    <div className="w-full h-full bg-slate-50 relative rounded-2xl overflow-hidden flex items-center justify-center min-h-[300px]">
                        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
                        <div className="relative text-center p-8">
                            <div className="text-8xl mb-4 animate-bounce">🚛</div>
                            <div className="flex gap-8 justify-center items-center text-4xl mt-4 opacity-50">
                                <span>⚓</span>
                                <span className="text-slate-300 tracking-widest text-lg">••••••</span>
                                <span>🏭</span>
                            </div>
                            <div className="mt-4 inline-block px-4 py-1 bg-white rounded-full shadow-sm border border-slate-100 text-xs font-medium text-slate-500">
                                Monitoreo 24/7
                            </div>
                        </div>
                    </div>
                }
            >
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <p className="text-sm text-purple-800">
                        <strong>Nuestro valor:</strong> Gestión, control y acompañamiento permanente de tu carga. Tú te dedicas a tu negocio, nosotros nos encargamos del transporte.
                    </p>
                </div>
            </SplitFeature>

            {/* Por qué elegirnos */}
            <section className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">¿Por qué elegirnos?</span>
                        <h2 className="text-3xl font-bold text-slate-900">Razones para <span className="gradient-text">confiar</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {whyChooseUs.map((item, index) => {
                            const colors = ['pink', 'blue', 'green', 'orange'];
                            const colorClass = colors[index % colors.length];
                            return (
                                <div key={item.title} className={`service-card service-${colorClass} h-full p-6`}>
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl">{item.icon}</span>
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                                            <p className="mt-2 text-slate-600">{item.description}</p>
                                            <p className="mt-3 text-sm italic text-slate-500 border-l-2 border-purple-300 pl-2">{item.highlight}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Tipos de unidades */}
            <section id="unidades" className="py-20 bg-white">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Flota</span>
                        <h2 className="text-3xl font-bold text-slate-900">Tipos de <span className="gradient-text">Unidades</span></h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Seleccionamos la unidad según el tipo y características de tu carga
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {vehicleTypes.map((vehicle, index) => {
                            const colorClass = ['service-blue', 'service-pink', 'service-green', 'service-orange'][index % 4];
                            return (
                                <div key={vehicle.title} className={`service-card ${colorClass} overflow-hidden p-0 h-full group`}>
                                    <div className="relative h-48 w-full bg-gradient-to-br from-white to-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:8px_8px]" />
                                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-100/50 to-transparent" />

                                        <div className="text-8xl transform group-hover:scale-110 transition-transform duration-500 drop-shadow-xl filter pb-4">
                                            {vehicle.icon}
                                        </div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="font-bold text-slate-900">{vehicle.title}</h3>
                                        <p className="mt-2 text-sm text-slate-600">{vehicle.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Servicio de Resguardo */}
            <section className="py-20 bg-gradient-to-br from-slate-900 to-purple-900 text-white">
                <Container>
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-6xl inline-block animate-bounce">🛡️</span>
                        <h2 className="mt-6 text-3xl font-bold">¿Necesitas Resguardo?</h2>
                        <p className="mt-4 text-lg text-slate-300">
                            Ofrecemos custodia de carga durante el traslado. Dos modalidades disponibles:
                        </p>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                                <span className="text-4xl">👤</span>
                                <h3 className="mt-4 text-xl font-bold text-purple-400">Resguardo Cabina</h3>
                                <p className="mt-2 text-slate-400">Personal de seguridad armado viaja en la cabina del camión junto al conductor.</p>
                            </div>
                            <div className="p-6 bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                                <span className="text-4xl">🚗</span>
                                <h3 className="mt-4 text-xl font-bold text-purple-400">Resguardo Vehículo</h3>
                                <p className="mt-2 text-slate-400">Vehículo de seguridad escolta a la unidad de transporte durante todo el trayecto.</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <Link href="/servicios/resguardo-aduanero">
                                <Button size="lg" variant="primary">Ver servicio de Resguardo</Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Cobertura */}
            <section className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-slate-900">Cobertura</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {coverage.map((item, index) => {
                            const colorClass = ['service-blue', 'service-green', 'service-orange'][index % 3];
                            return (
                                <div key={item.zone} className={`service-card ${colorClass} text-center p-6 bg-white`}>
                                    <span className="text-4xl">{item.icon}</span>
                                    <h3 className="mt-4 font-bold text-slate-900">{item.zone}</h3>
                                    <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Qué incluye */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Incluido</span>
                        <h2 className="text-3xl font-bold text-slate-900">¿Qué incluye el <span className="gradient-text">servicio</span>?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {serviceIncludes.map((item) => (
                            <div key={item.title} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                                <span className="text-2xl">{item.icon}</span>
                                <h4 className="mt-2 font-semibold text-slate-900">{item.title}</h4>
                                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Problemas que resuelve */}
            <SplitFeature
                title="¿Qué problemas resuelve?"
                description="Nos encargamos del control operativo para que tengas tranquilidad y visibilidad permanente."
                imageSide="right"
                image={
                    <div className="w-full h-full bg-slate-50 relative rounded-2xl overflow-hidden flex items-center justify-center min-h-[300px]">
                        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

                        {/* Central Card */}
                        <div className="relative bg-white p-6 rounded-xl shadow-lg border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-4 border-b border-slate-100 pb-2">
                                <span className="text-4xl">📋</span>
                                <div>
                                    <div className="h-2 w-24 bg-slate-200 rounded mb-1"></div>
                                    <div className="h-2 w-16 bg-slate-100 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500 text-lg">✓</span>
                                    <div className="h-2 w-32 bg-slate-100 rounded"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500 text-lg">✓</span>
                                    <div className="h-2 w-28 bg-slate-100 rounded"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500 text-lg">✓</span>
                                    <div className="h-2 w-36 bg-slate-100 rounded"></div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-3 -right-3 bg-green-500 text-white p-2 rounded-full shadow-lg animate-bounce">
                                <span className="text-xl">✨</span>
                            </div>
                        </div>
                    </div>
                }
            >
                <ul className="space-y-3">
                    {problemsSolved.map((problem) => (
                        <li key={problem} className="flex items-start gap-3 text-slate-600">
                            <span className="text-purple-600 mt-1">✓</span>
                            <span>{problem}</span>
                        </li>
                    ))}
                </ul>
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
                        title="Cotiza tu transporte"
                        serviceName="transporte-de-carga"
                    />
                </div>
            </Container>

            {/* CTA Final */}
            <CTASection
                title="¿Necesitas mover tu carga?"
                highlightedWord="carga"
                subtitle="Escríbenos con los datos de tu mercancía y te cotizamos en menos de 1 hora."
            >
                <WhatsAppLink route="transporte-de-carga-cta" serviceName="transporte-de-carga" variant="button">
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
