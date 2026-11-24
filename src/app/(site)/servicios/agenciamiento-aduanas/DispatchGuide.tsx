'use client';

import { useState } from 'react';
import { PrecotizacionForm } from '@/components/forms';
import { WhatsAppLink } from '@/components/tracking';
import type { PrecotizacionData } from '@/lib/schemas';

const stages = {
    planificando: {
        label: 'Estoy planificando',
        title: 'Revisa los requisitos antes de embarcar',
        description: 'Podemos revisar los datos de tu producto para identificar documentos y permisos que podrían afectar el despacho.',
        checklist: ['Descripción y ficha técnica de la mercancía', 'Proforma o factura, si ya la tienes', 'Origen, destino y vía de transporte prevista'],
        message: 'Estoy planificando una operación y quiero revisar los requisitos del despacho aduanero.',
    },
    transito: {
        label: 'Mi carga está en tránsito',
        title: 'Prepara el despacho con los documentos disponibles',
        description: 'Podemos revisar qué información falta para preparar la declaración y coordinar los pasos previos a la llegada o salida de la carga.',
        checklist: ['Factura comercial y lista de empaque', 'Documento de transporte, si ya está emitido', 'Fecha estimada de llegada o salida'],
        message: 'Mi carga está en tránsito y quiero preparar el despacho aduanero.',
    },
    arribada: {
        label: 'Mi carga ya llegó',
        title: 'Identifica qué falta para avanzar con el despacho',
        description: 'Revisamos el estado de la carga, los documentos disponibles y las coordinaciones pendientes con el almacén.',
        checklist: ['Aviso de llegada o referencia de la carga', 'Nombre del terminal o almacén', 'Declaración aduanera, si ya fue presentada'],
        message: 'Mi carga ya llegó y necesito revisar qué falta para avanzar con el despacho aduanero.',
    },
    incidencia: {
        label: 'Tengo una observación',
        title: 'Revisa la observación y su plazo',
        description: 'Revisamos lo que solicita SUNAT y los documentos de respaldo para definir qué acción corresponde.',
        checklist: ['Observación o notificación recibida', 'Fecha de notificación y plazo indicado', 'Declaración y documentos de respaldo disponibles'],
        message: 'Tengo una observación en mi despacho aduanero y quiero revisar cómo atenderla.',
    },
} satisfies Partial<Record<NonNullable<PrecotizacionData['etapa']>, {
    label: string;
    title: string;
    description: string;
    checklist: string[];
    message: string;
}>>;

type Stage = keyof typeof stages;
const stageKeys = Object.keys(stages) as Stage[];

export function DispatchGuide() {
    const [stage, setStage] = useState<Stage>();
    const guide = stage ? stages[stage] : undefined;

    return (
        <div className="grid items-start gap-8 lg:grid-cols-2">
            <div className="min-w-0 rounded-3xl border border-indigo-100 bg-white p-5 sm:p-7">
                <fieldset>
                    <legend className="text-lg font-bold text-slate-950">¿En qué etapa está tu operación?</legend>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {stageKeys.map((key) => (
                            <label key={key} className="relative cursor-pointer">
                                <input
                                    type="radio"
                                    name="guia-etapa"
                                    value={key}
                                    checked={stage === key}
                                    onChange={() => setStage(key)}
                                    className="peer sr-only"
                                />
                                <span className="flex min-h-12 items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold leading-snug text-slate-700 hover:border-indigo-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-950 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-600">
                                    <span aria-hidden="true" data-checked={stage === key} className="size-3.5 shrink-0 rounded-full border border-current bg-white data-[checked=true]:border-4" />
                                    {stages[key].label}
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <div className="mt-5 rounded-2xl bg-[#f0effb] p-5 sm:p-6">
                    <div aria-live="polite" aria-atomic="true">
                        <h3 className="text-xl font-bold tracking-tight text-indigo-950">
                            {guide?.title ?? 'Ten estos datos a mano'}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                            {guide?.description ?? 'Elige tu etapa para ver qué revisar. Con estos datos podemos empezar a evaluar tu solicitud.'}
                        </p>
                        <ul className="mt-4 space-y-2.5 text-sm text-slate-800">
                            {(guide?.checklist ?? ['Qué mercancía estás moviendo', 'Origen, destino y modalidad de carga', 'Documentos que ya tienes disponibles']).map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span aria-hidden="true" className="font-bold text-indigo-700">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <WhatsAppLink
                        route="agenciamiento-aduanas-guia"
                        serviceName="agenciamiento-aduanas"
                        customMessageBody={guide?.message}
                        variant="link"
                        className="mt-3"
                    >
                        Consultar este caso por WhatsApp
                    </WhatsAppLink>
                </div>
            </div>

            <div className="min-w-0 rounded-3xl border border-indigo-100 bg-white px-4 sm:px-6 [&>div]:py-6 [&>div>div]:border-0 [&>div>div]:shadow-none [&>div>div>div]:p-0 [&_h2]:text-left">
                <PrecotizacionForm
                    title="Solicita una cotización"
                    serviceName="agenciamiento-aduanas"
                    operationStage={stage}
                />
            </div>
        </div>
    );
}
