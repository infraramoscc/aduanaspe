'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { WhatsAppLink } from '@/components/tracking';

type CargoType = {
    id: 'fcl' | 'lcl' | 'aereo' | 'asesoria';
    label: string;
    icon: string;
    detail: string;
    waMessage: string;
};

const cargoOptions: CargoType[] = [
    {
        id: 'fcl',
        label: 'Contenedor FCL',
        icon: '🚢',
        detail: 'Contenedor completo de 20\' o 40\'',
        waMessage: 'Hola, necesito agenciamiento y flete para un Contenedor Completo (FCL).',
    },
    {
        id: 'lcl',
        label: 'Carga Suelta LCL',
        icon: '📦',
        detail: 'Consolidado o carga por metros cúbicos',
        waMessage: 'Hola, deseo cotizar flete y aduanas para Carga Suelta (LCL).',
    },
    {
        id: 'aereo',
        label: 'Aéreo Express',
        icon: '✈️',
        detail: 'Carga urgente o de alto valor por vía aérea',
        waMessage: 'Hola, tengo una carga aérea urgente que necesito importar/exportar.',
    },
    {
        id: 'asesoria',
        label: 'Asesoría / Permisos',
        icon: '📋',
        detail: 'Trámites VUCE, DIGESA, MTC o duda tributaria',
        waMessage: 'Hola, necesito asesoría especializada para trámites/permisos de aduanas.',
    },
];

export function HeroHome() {
    const [selectedCargo, setSelectedCargo] = useState<CargoType>(cargoOptions[0]);

    return (
        <section className="relative isolate flex flex-col overflow-hidden bg-[#1E1B4B] border-b border-[#3C3794]/40 text-white min-h-[100svh] -mt-16 sm:-mt-[108px] pt-16 sm:pt-[108px]">
            {/* Background Image with Dark Purple Gradient Overlay */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <Image
                    src="/images/hero_port_bg.png"
                    alt="Operaciones de comercio exterior y aduanas en Perú"
                    fill
                    priority
                    quality={95}
                    sizes="100vw"
                    className="object-cover object-center opacity-70 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E1B4B] via-[#1E1B4B]/85 to-[#1E1B4B]/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B] via-transparent to-[#0D0B26]/50" />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:4rem_4rem]"
                />
            </div>

            {/* Top gradient to keep navbar links legible over the port image */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#1E1B4B]/90 via-[#1E1B4B]/50 to-transparent"
            />

            <Container size="xl" className="relative flex flex-1 items-center w-full py-10">
                <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                    {/* Left Column: Value Proposition & Direct CTAs */}
                    <div className="lg:col-span-7">
                        {/* Header Badge */}
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3.5 py-1 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">
                                Agencia de Aduanas & Carga Internacional en Perú
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem] lg:text-5xl">
                            TÚ IMPORTAS.{' '}
                            <span className="text-emerald-400">
                                NOSOTROS DESPACHAMOS Y TRANSPORTAMOS.
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="mt-3 max-w-[56ch] text-sm text-slate-200 sm:text-base md:text-base md:leading-relaxed">
                            Evaluación previa sin costo, despacho aduanero asegurado sin multas y seguimiento en tiempo real con tu ejecutivo asignado.
                        </p>

                        {/* Action Buttons Direct Under Text */}
                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <WhatsAppLink
                                customMessage={selectedCargo.waMessage}
                                route="home-hero"
                                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-extrabold text-slate-950 shadow-[0_0_30px_rgba(52,211,153,0.4)] transition-all hover:scale-[1.02] hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40"
                            >
                                <span className="hidden sm:inline">Cotizar {selectedCargo.label} por WhatsApp</span>
                                <span className="sm:hidden">Cotizar por WhatsApp</span>
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </WhatsAppLink>

                            <Link
                                href="#evaluar"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-all hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                            >
                                Evaluar caso en formulario
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Qualification Panel & Metrics */}
                    <div className="lg:col-span-5">
                        {/* Interactive Qualification Selector */}
                        <div className="rounded-2xl border border-[#3C3794]/60 bg-[#131037]/90 p-4 md:p-5 backdrop-blur-md shadow-2xl">
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300 mb-3">
                                Selecciona el tipo de carga a cotizar:
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                                {cargoOptions.map((option) => {
                                    const isSelected = selectedCargo.id === option.id;
                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => setSelectedCargo(option)}
                                            className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-center transition-all duration-200 border ${
                                                isSelected
                                                    ? 'border-[#3C3794] bg-[#3C3794]/70 text-white ring-2 ring-indigo-400/50'
                                                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10'
                                            }`}
                                        >
                                            <span className="text-lg">{option.icon}</span>
                                            <span className="mt-1 text-xs font-bold">{option.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-300">
                                <span><strong className="text-white">Detalle:</strong> {selectedCargo.detail}</span>
                                <span className="text-emerald-400 font-semibold">✓ Cotización rápida</span>
                            </div>
                        </div>

                        {/* Metric Badges / Trust Cards */}
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-center backdrop-blur-sm">
                                <span className="text-base font-black text-emerald-400">+1K</span>
                                <p className="text-[10px] font-bold text-white mt-0.5">Despachos</p>
                            </div>

                            <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-center backdrop-blur-sm">
                                <span className="text-base font-black text-emerald-400">0</span>
                                <p className="text-[10px] font-bold text-white mt-0.5">Multas</p>
                            </div>

                            <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-center backdrop-blur-sm">
                                <span className="text-base font-black text-emerald-400">&lt;1h</span>
                                <p className="text-[10px] font-bold text-white mt-0.5">Respuesta</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
