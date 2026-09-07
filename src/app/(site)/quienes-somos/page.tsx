import type { Metadata } from 'next';
import Link from 'next/link';
import { CTASection, EditorialMedia, Hero, SplitFeature, TrustBar } from '@/components/sections';
import { Container } from '@/components/layout';
import { WhatsAppLink } from '@/components/tracking';
import { ROUTES } from '@/lib/routes';
import { mainPageImages } from '@/content/mainPageImages';

export const metadata: Metadata = {
    title: 'Quiénes Somos | AduanasPE',
    description: 'Conoce al equipo detrás de AduanasPE y nuestra forma de trabajar: atención cercana, seguimiento claro y foco operativo en comercio exterior.',
    alternates: {
        canonical: 'https://aduanaspe.com/quienes-somos/',
    },
    robots: {
        index: true,
        follow: true,
    },
};

// Equipo
const teamMembers = [
    {
        title: 'Ejecutivo Comercial',
        summary: 'Tu primer contacto. Te asesora, cotiza y acompaña en cada decisión.',
        icon: '💼',
        slug: 'comercial',
    },
    {
        title: 'Ejecutivo de Servicios',
        summary: 'Coordina tus operaciones y te envía el estatus de tu carga constantemente.',
        icon: '📦',
        slug: 'servicios',
    },
    {
        title: 'Liquidador',
        summary: 'Experto en clasificación arancelaria y liquidación de impuestos.',
        icon: '📋',
        slug: 'liquidador',
    },
    {
        title: 'Facturación',
        summary: 'Tus documentos listos cuando los necesitas, sin demoras.',
        icon: '🧾',
        slug: 'facturacion',
    },
];

// Valores
const values = [
    {
        icon: '🔍',
        title: 'Transparencia',
        description: 'Sin costos ocultos ni sorpresas',
    },
    {
        icon: '🤝',
        title: 'Compromiso',
        description: 'Tu operación es nuestra prioridad',
    },
    {
        icon: '💬',
        title: 'Honestidad',
        description: 'Te decimos las cosas como son',
    },
    {
        icon: '❤️',
        title: 'Cercanía',
        description: 'Somos tu equipo, no un proveedor más',
    },
];

export default function QuienesSomosPage() {
    return (
        <>
            <Hero
                badge="Conoce AduanasPE"
                title="Un equipo cercano para entender y acompañar tu operación"
                highlightedWord="equipo cercano"
                subtitle="Somos dos hermanos con experiencia en agencias de aduanas. Creamos AduanasPE para que importadores y exportadores tengan explicaciones claras, seguimiento y una persona de contacto."
                size="lg"
                showStats={false}
                showFloatingCards={false}
                editorialImage={mainPageImages.about.hero}
                centered={false}
                footer={<TrustBar variant="clean" />}
            >
                <Link href="#como-trabajamos" className="inline-flex min-h-12 items-center rounded-full bg-[#3C3794] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#2F2B77] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3C3794]">Conoce cómo te acompañamos</Link>
                <Link href={ROUTES.contacto} className="inline-flex min-h-12 items-center rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4">Hablar con el equipo</Link>
            </Hero>

            <section id="como-trabajamos" aria-labelledby="acompanamiento-titulo" className="scroll-mt-44 bg-slate-50 py-12 md:py-16">
                <Container>
                    <h2 id="acompanamiento-titulo" className="text-balance text-3xl font-bold text-slate-950 md:text-4xl">¿Qué pasa cuando nos escribes?</h2>
                    <ol className="mt-8 grid gap-6 md:grid-cols-3">
                        <li className="border-t-2 border-[#3C3794] pt-5"><span aria-hidden="true" className="text-sm font-bold text-[#3C3794]">01</span><h3 className="mt-3 text-xl font-semibold">Nos cuentas tu situación</h3><p className="mt-3 leading-7 text-slate-600">Qué quieres importar o exportar y en qué etapa estás. No necesitas tener todos los documentos para hacer una primera consulta.</p></li>
                        <li className="border-t-2 border-[#3C3794] pt-5"><span aria-hidden="true" className="text-sm font-bold text-[#3C3794]">02</span><h3 className="mt-3 text-xl font-semibold">Aclaramos el siguiente paso</h3><p className="mt-3 leading-7 text-slate-600">Te orientamos sobre la información que falta y el apoyo que podría necesitar tu operación.</p></li>
                        <li className="border-t-2 border-[#3C3794] pt-5"><span aria-hidden="true" className="text-sm font-bold text-[#3C3794]">03</span><h3 className="mt-3 text-xl font-semibold">Tú decides cómo avanzar</h3><p className="mt-3 leading-7 text-slate-600">Si necesitas un servicio, revisamos su alcance y cotización contigo. La consulta inicial no te compromete a contratar.</p></li>
                    </ol>
                </Container>
            </section>

            {/* Nuestra Historia */}
            <SplitFeature
                title="Nuestra Historia"
                description="Nuestra experiencia en agencias de aduanas nos enseñó cuánto importa acompañar al cliente, además de gestionar su carga. Por eso creamos AduanasPE: para explicar el proceso, mantenerte informado y ayudarte a decidir con más contexto."
                image={<EditorialMedia image={mainPageImages.about.middle} />}
                imageSide="right"
            >
                <p className="text-slate-600 italic border-l-4 border-[#3C3794] pl-4">
                    &ldquo;Lo que nos diferencia no es ser los más grandes, sino los más cercanos. Cada cliente tiene un ejecutivo asignado que conoce su negocio y está disponible cuando lo necesita.&rdquo;
                </p>
            </SplitFeature>

            {/* Por qué somos diferentes */}
            <SplitFeature
                title="¿Por qué somos diferentes?"
                description="Tienes un ejecutivo asignado que conoce tu operación y coordina con el equipo. Así sabes a quién preguntar, qué información falta y cuál es el siguiente paso."
                image={<EditorialMedia image={mainPageImages.about.lower} aspect="compact" />}
                imageSide="left"
            >
                <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                        <span className="text-[#3C3794]">✓</span>
                        <span>Ejecutivo personal asignado a tu cuenta</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#3C3794]">✓</span>
                        <span>Envío de estatus constante sin que lo pidas</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#3C3794]">✓</span>
                        <span>Capacitación y asesoramiento incluido</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#3C3794]">✓</span>
                        <span>Facturación inmediata cuando la necesitas</span>
                    </li>
                </ul>
            </SplitFeature>

            {/* Nuestros Valores */}
            <TrustBar
                title="Nuestros Valores"
                points={values}
            />

            {/* Equipo */}
            <section className="py-20 bg-slate-50">
                <Container>
                    <div className="text-center mb-14">
                        <span className="section-badge">Nuestro Equipo</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Un equipo que te <span className="gradient-text">respalda</span>
                        </h2>
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                            Estas son las funciones que acompañan tu operación. Tu ejecutivo es el punto de contacto para coordinar con ellas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => {
                            const colors = ['pink', 'blue', 'green', 'orange'];
                            const colorClass = colors[index % colors.length];
                            return (
                                <div
                                    key={member.slug}
                                    className={`service-card service-${colorClass} text-center p-6`}
                                >
                                    <span aria-hidden="true" className="text-4xl mb-4 block">{member.icon}</span>
                                    <h3 className="text-lg font-semibold text-slate-900">{member.title}</h3>
                                    <p className="mt-2 text-sm text-slate-500">{member.summary}</p>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Misión */}
            <section className="bg-white py-12">
                <Container>
                    <div className="max-w-3xl border-l-4 border-[#3C3794] pl-6">
                        <h2 className="text-3xl font-bold text-slate-950">Nuestra misión</h2>
                        <p className="mt-4 text-lg leading-8 text-slate-600">Ayudarte a tomar decisiones informadas sobre importación y exportación, y acompañar la gestión aduanera y logística que tu negocio necesita.</p>
                        <Link href={ROUTES.comercioExterior.index} className="mt-5 inline-flex min-h-11 items-center font-semibold text-[#3C3794] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Explorar las guías de comercio exterior</Link>
                    </div>
                </Container>
            </section>

            {/* Ubicación */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="section-badge">Ubicación</span>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            ¿Dónde <span className="gradient-text">estamos</span>?
                        </h2>
                        <p className="text-lg text-slate-600 mb-6">
                            Operamos desde el <strong>Callao, Perú</strong> – el corazón del comercio exterior peruano.
                            Trabajamos de manera 100% remota, lo que nos permite atender clientes de todo el Perú.
                        </p>
                        <p className="text-slate-500">
                            No importa dónde estés: Lima, Arequipa, Trujillo o cualquier otra ciudad.
                            Tu ejecutivo está a un mensaje de distancia.
                        </p>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <CTASection
                title="Conversemos sobre lo que necesitas"
                highlightedWord="Conversemos"
                subtitle="Puedes empezar con una duda. Te orientamos sin costo y sin compromiso de contratar."
            >
                <WhatsAppLink route="quienes-somos" variant="button">
                    Escríbenos por WhatsApp
                </WhatsAppLink>
                <Link href={ROUTES.contacto} className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4">
                    Prefiero escribir por formulario
                </Link>
            </CTASection>
        </>
    );
}
