'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout';
import { GA4_EVENTS, TrackedLink, WhatsAppLink } from '@/components/tracking';
import { mainPageImages } from '@/content/mainPageImages';
import { ROUTES } from '@/lib/routes';

const generalMessage = 'Quisiera orientación para mi operación de comercio exterior.\n\nMercancía:\nOrigen y destino:\nEtapa de la operación y en qué necesito ayuda:';

const cargoOptions = [
    {
        id: 'fcl',
        label: 'Contenedor FCL',
        detail: 'Contenedor completo de 20 o 40 pies.',
        message: 'Quisiera cotizar un embarque en contenedor completo (FCL).\n\nMercancía:\nOrigen y destino:\nCantidad y tamaño de contenedores (20 o 40 pies):\nFecha estimada de embarque:',
    },
    {
        id: 'lcl',
        label: 'Carga suelta LCL',
        detail: 'Mercancía consolidada con otros embarques.',
        message: 'Quisiera cotizar un embarque de carga suelta consolidada (LCL).\n\nMercancía:\nOrigen y destino:\nCantidad de bultos, peso y volumen aproximados (kg y m³):\nFecha estimada de embarque:',
    },
    {
        id: 'aereo',
        label: 'Carga aérea',
        detail: 'Para envíos urgentes o de alto valor.',
        message: 'Quisiera cotizar un envío por vía aérea.\n\nMercancía:\nCiudad de origen y destino:\nCantidad de bultos, peso y medidas aproximadas:\nFecha en que necesito recibir la carga:',
    },
    {
        id: 'asesoria',
        label: 'Asesoría y permisos',
        detail: 'Orientación sobre requisitos y trámites aduaneros.',
        message: 'Quisiera orientación sobre los requisitos o permisos para mi operación.\n\nProducto y uso previsto:\nOperación (importación o exportación):\nEtapa de la operación:\nTrámite o duda que quiero resolver:',
    },
] as const;

export function HeroHome() {
    const [cargoId, setCargoId] = useState<string>();
    const cargo = cargoOptions.find((option) => option.id === cargoId);
    const photo = mainPageImages.home.hero;

    return (
        <section
            aria-labelledby="home-hero-title"
            className="relative isolate -mt-16 overflow-hidden bg-[#171634] pt-16 text-white sm:-mt-[108px] sm:pt-[108px]"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_88%_16%,#393370_0%,transparent_58%),linear-gradient(145deg,#1e1b4b,#15142f_72%)]"
            />
            <Container size="xl" className="grid items-center gap-9 py-10 sm:max-md:pt-24 md:py-14 lg:grid-cols-[1fr_0.96fr] lg:gap-12 lg:py-16 xl:gap-16">
                <div className="min-w-0">
                    <h1 id="home-hero-title" className="text-[clamp(2.25rem,5vw,3.875rem)] leading-[1.04] font-extrabold tracking-[-0.04em]">
                        Agencia de aduanas y carga internacional{' '}
                        <span className="whitespace-nowrap text-emerald-300">en Perú.</span>
                    </h1>
                    <p className="mt-4 max-w-[49ch] text-base leading-relaxed text-slate-200 sm:mt-5 sm:text-lg">
                        Coordinamos tu flete, despacho aduanero y transporte local. Empieza con una evaluación sin costo y un ejecutivo que te orienta sobre el siguiente paso.
                    </p>

                    <fieldset className="mt-6 min-w-0 sm:mt-8">
                        <legend className="text-sm font-semibold text-white">
                            Personaliza tu consulta <span className="font-normal text-slate-300">(opcional)</span>
                        </legend>
                        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                            {cargoOptions.map((option) => (
                                <label key={option.id} className="relative cursor-pointer">
                                    <input
                                        type="radio"
                                        name="home-hero-cargo"
                                        value={option.id}
                                        checked={cargoId === option.id}
                                        onChange={() => setCargoId(option.id)}
                                        className="peer sr-only"
                                    />
                                    <span className="flex min-h-11 items-center justify-center rounded-lg border border-white/25 px-2.5 py-2 text-center text-xs font-semibold text-slate-100 transition-colors hover:bg-white/10 peer-checked:border-emerald-300 peer-checked:bg-emerald-300/15 peer-checked:text-emerald-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald-300 sm:px-3 sm:text-sm">
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                        <p aria-live="polite" className="mt-2 min-h-5 text-sm leading-5 text-slate-300">
                            {cargo?.detail ?? 'Elige una opción para preparar el mensaje de WhatsApp.'}
                        </p>
                    </fieldset>

                    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                        <WhatsAppLink
                            messageKey={cargo?.id ?? 'asesoria_gratis'}
                            customMessageBody={cargo?.message ?? generalMessage}
                            route="home-hero"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-bold text-[#10271e] transition-colors hover:bg-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
                        >
                            Consultar por WhatsApp
                        </WhatsAppLink>
                        <TrackedLink
                            href={ROUTES.evaluar}
                            eventName={GA4_EVENTS.CLICK_CTA_TO_PRECOTIZACION}
                            eventParams={{ location: 'home-hero' }}
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                            Evaluar mi operación
                        </TrackedLink>
                    </div>
                </div>

                <div className="relative isolate aspect-[5/3] overflow-hidden rounded-2xl border border-white/20 bg-[#24203e] shadow-2xl lg:aspect-auto lg:self-stretch lg:min-h-[28rem] lg:rounded-3xl">
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        preload
                        sizes="(min-width: 1280px) 560px, (min-width: 1024px) 47vw, 100vw"
                        className="object-cover object-[52%_46%]"
                    />
                </div>
            </Container>
        </section>
    );
}
