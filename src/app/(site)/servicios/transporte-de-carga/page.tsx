import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero, SplitFeature, CTASection, TrustBar } from '@/components/sections';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { WhatsAppLink } from '@/components/tracking';
import { PrecotizacionForm } from '@/components/forms';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';
import { JsonLd } from '@/components/seo/JsonLd';
import { ROUTES } from '@/lib/routes';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Transporte de Carga desde Puerto y Aeropuerto | AduanasPE',
    description: 'Transporte terrestre de carga desde puerto o aeropuerto hasta tu almacén, con monitoreo, coordinación operativa y cobertura en Lima y provincias.',
    alternates: {
        canonical: 'https://aduanaspe.com/servicios/transporte-de-carga/',
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
    const serviceJsonLd = generateServiceSchema({
        name: 'Transporte de Carga desde Puerto y Aeropuerto',
        description: 'Transporte terrestre de carga desde puerto o aeropuerto hasta tu almacen, con monitoreo, coordinacion operativa y cobertura en Lima y provincias.',
        url: 'https://aduanaspe.com/servicios/transporte-de-carga/',
    });
    const breadcrumbJsonLd = generateBreadcrumbSchema([
        { name: 'Inicio', url: 'https://aduanaspe.com/' },
        { name: 'Servicios', url: 'https://aduanaspe.com/servicios/' },
        { name: 'Transporte de Carga', url: 'https://aduanaspe.com/servicios/transporte-de-carga/' },
    ]);

    return (
        <>
            <JsonLd json={serviceJsonLd} />
            <JsonLd json={breadcrumbJsonLd} />
            <FaqJsonLd faqs={faqs} />
            {/* Hero */}
            <Hero
                badge="✨ Transporte de Carga"
                title="Transporte de Carga Local y Nacional desde Puerto"
                highlightedWord="Puerto"
                subtitle="Llevamos tu mercancía desde el puerto hasta tu almacén. Con GPS, seguimiento en tiempo real y comunicación permanente."
                size="lg"
                showStats={false}
                showFloatingCards={false}
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
                            <Link href="/servicios/agencia-de-carga-internacional" className="service-card service-card-compact service-blue group block p-6">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full mb-3">ETAPA 1</span>
                                    <h3 className="font-bold text-slate-900">Agenciamiento de Carga</h3>
                                    <p className="text-sm text-slate-600 mt-2">Flete desde origen</p>
                                    <p className="text-xs text-green-600 font-medium mt-2">✓ Completada</p>
                                </div>
                            </Link>
                            {/* Etapa 2 */}
                            <Link href="/servicios/agenciamiento-aduanas" className="service-card service-card-compact service-purple group block p-6">
                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full mb-3">ETAPA 2</span>
                                    <h3 className="font-bold text-slate-900">Agenciamiento de Aduanas</h3>
                                    <p className="text-sm text-slate-600 mt-2">Despacho aduanero</p>
                                    <p className="text-xs text-green-600 font-medium mt-2">✓ Completada</p>
                                </div>
                            </Link>
                            {/* Etapa 3 - Actual */}
                            <div className="service-card service-purple p-6 text-center ring-2 ring-[#D8D5FF] ring-offset-2 scale-105">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-[#3C3794] text-white text-xs font-bold rounded-full mb-3">ETAPA 3</span>
                                    <h3 className="font-bold text-slate-900">Transporte de Carga</h3>
                                    <p className="text-sm text-slate-600 mt-2">Entrega en tu almacén</p>
                                    <p className="text-xs text-[#3C3794] font-medium mt-2">← Estás aquí</p>
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
                                <Link href="/servicios/consultoria-aduanera" className="service-card service-card-compact service-cyan group flex items-center gap-4 p-5">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                                <Link href="/servicios/resguardo-aduanero" className="service-card service-card-compact service-orange group flex items-center gap-4 p-5">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                        <div className="mt-8 p-8 rounded-xl bg-[linear-gradient(135deg,#3C3794_0%,#2F2B77_62%,#38BDF8_100%)] text-white text-center shadow-xl">
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
                    <div className="service-transport-panel">
                        <p className="text-sm font-semibold text-sky-200">Coordinación del traslado</p>
                        <h3 className="mt-2 text-3xl font-bold leading-tight">Del punto de retiro hasta tu destino</h3>
                        <ul className="mt-7">
                            <li><b>01</b><span><strong className="block">Unidad adecuada</strong><span className="text-sm text-slate-300">Según carga, peso, volumen y ruta.</span></span></li>
                            <li><b>02</b><span><strong className="block">Retiro coordinado</strong><span className="text-sm text-slate-300">Desde puerto, aeropuerto o almacén.</span></span></li>
                            <li><b>03</b><span><strong className="block">Entrega informada</strong><span className="text-sm text-slate-300">Seguimiento durante el recorrido acordado.</span></span></li>
                        </ul>
                    </div>
                }
            >
                <div className="service-card service-card-compact service-purple p-4">
                    <p className="text-sm text-[#2F2B77]">
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
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                                            <p className="mt-2 text-slate-600">{item.description}</p>
                                            <p className="mt-3 text-sm italic text-slate-500 border-l-2 border-[#D8D5FF] pl-2">{item.highlight}</p>
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
                                <div key={vehicle.title} className={`service-card ${colorClass} h-full border-t-4 p-6`}>
                                    <div>
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
            <section className="py-20 bg-[linear-gradient(135deg,#3C3794_0%,#2F2B77_58%,#0E7490_100%)] text-white">
                <Container>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold">¿Necesitas resguardo?</h2>
                        <p className="mt-4 text-lg text-slate-300">
                            Ofrecemos custodia de carga durante el traslado. Dos modalidades disponibles:
                        </p>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="rounded-xl bg-white/10 p-6 text-left">
                                <h3 className="text-xl font-bold text-sky-100">Resguardo cabina</h3>
                                <p className="mt-2 text-slate-200">Personal de seguridad acompaña la unidad junto al conductor.</p>
                            </div>
                            <div className="rounded-xl bg-white/10 p-6 text-left">
                                <h3 className="text-xl font-bold text-sky-100">Resguardo vehículo</h3>
                                <p className="mt-2 text-slate-200">Un vehículo de seguridad acompaña la unidad durante el trayecto.</p>
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
                            <div key={item.title} className="service-card service-card-compact service-cyan p-4">
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
                        <div className="service-control-panel">
                            <p className="text-sm font-semibold text-sky-200">Control operativo</p>
                            <h3 className="mt-2 text-3xl font-bold leading-tight">Un solo punto de coordinación</h3>
                            <p className="mt-4 max-w-md text-slate-300">Centralizamos la unidad, el retiro, el recorrido y la confirmación de entrega para reducir llamadas y decisiones dispersas.</p>
                        </div>
                }
            >
                <ul className="space-y-3">
                    {problemsSolved.map((problem) => (
                        <li key={problem} className="flex items-start gap-3 text-slate-600">
                            <span className="text-[#3C3794] mt-1">✓</span>
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
                            <div key={faq.question} className="service-card service-card-compact service-blue p-6">
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
