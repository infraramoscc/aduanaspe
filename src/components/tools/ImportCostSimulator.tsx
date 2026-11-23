'use client';

import Link from 'next/link';
import { GA4_EVENTS, trackEvent } from '@/components/tracking/ga4';
import { WhatsAppLink } from '@/components/tracking/WhatsAppLink';
import { useId, useState, type FormEvent } from 'react';
import { calculateImportCosts, importModes, LOGISTICS_IGV_RATE, type ContainerType, type ImportMode, type Incoterm } from '@/lib/importCosts';
import { IMPORT_COST_SIMULATOR_PATH } from '@/content/tools';

const usd = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'USD', currencyDisplay: 'code' });
const quantity = new Intl.NumberFormat('es-PE', { maximumFractionDigits: 3 });
const controlClass = 'min-h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200';
const labelClass = 'mb-1 block text-sm font-semibold text-slate-800';
const resultRowClass = 'flex flex-wrap justify-between gap-x-3 gap-y-1 py-2 text-sm';

type Estimate = ReturnType<typeof calculateImportCosts>;

const freightNote = 'El agente de carga cobra este servicio por coordinar el transporte internacional de la mercancía.';
const notes: Record<string, string> = {
    'Flete marítimo FCL': freightNote,
    'Flete marítimo LCL': freightNote,
    'Flete aéreo': freightNote,
    'Costos EXW en origen': 'El agente de carga suele cobrar el recojo en las instalaciones del proveedor y los servicios en origen para preparar el embarque.',
    'Visto bueno': 'La naviera o su agente suele cobrar la validación documental para liberar la carga.',
    'Gate In': 'El depósito de contenedores suele cobrar la recepción del contenedor vacío después de la entrega.',
    'Comisión de agenciamiento de aduanas': 'El agente de aduanas cobra sus honorarios por gestionar el despacho aduanero.',
    'Gastos operativos': 'El agente de aduanas suele cobrar la coordinación y la gestión documental del despacho.',
    'Depósito temporal': 'El depósito temporal cobra por recibir, manipular y almacenar la carga antes de su retiro.',
    'Transporte de carga': 'El transportista local cobra el traslado desde el punto de retiro hasta el lugar de entrega.',
    'Desconsolidación': 'El agente de carga o el operador del almacén suele cobrar la separación de tu mercancía del embarque consolidado.',
    'Handling': 'El agente de carga aérea o su representante suele cobrar la gestión del embarque en destino.',
    'Transmisión': 'El agente de carga aérea suele cobrar el envío electrónico de los datos del embarque a la aduana.',
};

function ChargeNote({ label, note }: { label: string; note: string }) {
    const id = useId();
    const [visible, setVisible] = useState(false);
    return (
        <div onPointerEnter={(event) => { if (event.pointerType === 'mouse') setVisible(true); }}
            onPointerLeave={(event) => { if (event.pointerType === 'mouse') setVisible(false); }}>
            <button type="button" aria-expanded={visible} aria-controls={id}
                onFocus={() => setVisible(true)} onBlur={() => setVisible(false)} onClick={() => setVisible(true)}
                onKeyDown={(event) => { if (event.key === 'Escape') setVisible(false); }}
                className="cursor-help text-left underline decoration-dotted underline-offset-4">
                {label} <span aria-hidden="true" className="text-indigo-700">ⓘ</span>
            </button>
            <p id={id} hidden={!visible} className="mt-1 rounded border-l-2 border-amber-400 bg-amber-100 px-2 py-1 text-xs leading-relaxed text-amber-950">{note}</p>
        </div>
    );
}

function ChargeGroup({ title, charges, subtotal }: { title: string; charges: Estimate['taxable']; subtotal: number }) {
    return (
        <div>
            <h4 className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-bold text-[#262254]">{title}</h4>
            <dl className="divide-y divide-slate-100 px-3">
                {charges.map((charge) => (
                    <div key={charge.label} className={resultRowClass}>
                        <dt className="min-w-0 flex-1 text-slate-700">
                            <ChargeNote label={charge.label} note={notes[charge.label]} />
                            {charge.basis && <span className="mt-0.5 block text-xs text-slate-500">{charge.basis}</span>}
                        </dt>
                        <dd className="m-0 font-semibold tabular-nums">{usd.format(charge.amount)}</dd>
                    </div>
                ))}
                <div className={`${resultRowClass} font-bold`}>
                    <dt>Subtotal</dt>
                    <dd className="m-0 tabular-nums">{usd.format(subtotal)}</dd>
                </div>
            </dl>
        </div>
    );
}

export function ImportCostSimulator({ embedded = false }: { embedded?: boolean }) {
    const id = useId();
    const trackingLocation = embedded ? 'blog_import_cost_simulator' : 'import_cost_simulator';
    const [mode, setMode] = useState<ImportMode | null>(null);
    const [result, setResult] = useState<(Estimate & { incoterm: Incoterm; quoteMessage: string }) | null>(null);

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!mode) return;

        const form = new FormData(event.currentTarget);
        const incoterm = form.get('incoterm') === 'EXW' ? 'EXW' : 'FOB';
        const estimate = calculateImportCosts(mode === 'fcl' ? {
            mode,
            incoterm,
            containerType: form.get('containerType') as ContainerType,
            containerCount: Number(form.get('containerCount')),
        } : {
            mode,
            incoterm,
            weightKg: Number(form.get('weightKg')),
            volumeM3: Number(form.get('volumeM3')),
        });
        const cargo = mode === 'fcl'
            ? `${form.get('containerCount')} × contenedor de ${form.get('containerType') === '40HC' ? '40 pies High Cube' : `${form.get('containerType')} pies`}`
            : `${form.get('weightKg')} kg y ${form.get('volumeM3')} m³`;
        const quoteMessage = [
            'Quisiera una cotización más precisa para esta importación.',
            `China → ${importModes[mode].destination} · ${importModes[mode].label} · ${incoterm}`,
            `Carga: ${cargo}`,
            `Total logístico referencial: ${usd.format(estimate.total)}`,
        ].join('\n');
        setResult({ ...estimate, incoterm, quoteMessage });
        trackEvent(GA4_EVENTS.IMPORT_COST_CALCULATED, {
            location: trackingLocation,
            transport_mode: mode,
            incoterm,
        });
    }

    const weight = result?.chargeableWeight;

    return (
        <section
            aria-labelledby={`${id}-title`}
            style={embedded ? { borderColor: '#7FC4A9' } : undefined}
            className={`@container not-prose my-6 text-slate-900 ${embedded
                ? 'service-card service-card-highlight service-green p-4 md:p-6'
                : 'rounded-3xl border border-indigo-100 bg-white p-4 shadow-sm sm:p-6'
            }`}
        >
            <div className="border-b border-slate-200 pb-4">
                <h2 id={`${id}-title`} className="text-xl font-bold tracking-tight sm:text-2xl">
                    {embedded ? 'Simulador de costos de importación' : 'Datos de tu importación'}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Selecciona la modalidad e ingresa los datos de tu carga para estimar los gastos logísticos en USD.
                </p>
            </div>

            <div className="mt-5 grid items-start gap-5 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                <form onSubmit={submit} onChange={() => setResult(null)} onReset={() => { setMode(null); setResult(null); }} className="min-w-0 space-y-5">
                    <fieldset>
                        <legend className="mb-2 text-sm font-bold">Modalidad de transporte</legend>
                        <div className="grid gap-2 @lg:grid-cols-3">
                            {Object.entries(importModes).map(([value, option]) => (
                                <label key={value} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="mode"
                                        value={value}
                                        checked={mode === value}
                                        onChange={() => setMode(value as ImportMode)}
                                        required
                                        className="peer sr-only"
                                    />
                                    <span className="flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-2 py-2 text-center text-sm font-semibold text-slate-700 peer-checked:border-[#3c3794] peer-checked:bg-indigo-50 peer-checked:text-[#3c3794] peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500">
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    {mode && (
                        <>
                            <fieldset className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/75 px-3 pb-3 pt-1 sm:px-4 sm:pb-4">
                                <legend className="px-1 text-sm font-bold">Datos de la carga</legend>
                                <div className="grid gap-3 @sm:grid-cols-2">
                                    {mode === 'fcl' ? (
                                        <>
                                            <label>
                                                <span className={labelClass}>Cantidad de contenedores</span>
                                                <input className={controlClass} name="containerCount" type="number" inputMode="numeric" min="1" step="1" required />
                                            </label>
                                            <label>
                                                <span className={labelClass}>Tipo de contenedor</span>
                                                <select className={controlClass} name="containerType" defaultValue="" required>
                                                    <option value="" disabled>Selecciona un tipo</option>
                                                    <option value="20">20 pies</option>
                                                    <option value="40">40 pies</option>
                                                    <option value="40HC">40 HC</option>
                                                </select>
                                            </label>
                                        </>
                                    ) : (
                                        <>
                                            <label>
                                                <span className={labelClass}>Peso bruto (kg)</span>
                                                <input className={controlClass} name="weightKg" type="number" inputMode="decimal" min="0.001" step="0.001" required />
                                            </label>
                                            <label>
                                                <span className={labelClass}>Cubicaje (m³)</span>
                                                <input className={controlClass} name="volumeM3" type="number" inputMode="decimal" min="0.001" step="0.001" required />
                                            </label>
                                        </>
                                    )}
                                </div>
                            </fieldset>

                            <fieldset className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/75 px-3 pb-3 pt-1 sm:px-4 sm:pb-4">
                                <legend className="px-1 text-sm font-bold">Ruta e Incoterm</legend>
                                <div className="grid gap-3 @sm:grid-cols-2">
                                    <label>
                                        <span className={labelClass}>Origen</span>
                                        <input className={`${controlClass} read-only:bg-slate-100`} name="origin" value="China" readOnly />
                                    </label>
                                    <label>
                                        <span className={labelClass}>Destino</span>
                                        <input className={`${controlClass} read-only:bg-slate-100`} value={importModes[mode].destination} readOnly />
                                    </label>
                                    <label>
                                        <span className={labelClass}>Incoterm</span>
                                        <select className={controlClass} name="incoterm" defaultValue="" required>
                                            <option value="" disabled>Selecciona un Incoterm</option>
                                            <option value="EXW">EXW</option>
                                            <option value="FOB">FOB</option>
                                        </select>
                                    </label>
                                </div>
                            </fieldset>

                            <div className="flex flex-wrap items-center gap-3">
                                <button type="submit" className="min-h-11 rounded-xl bg-[#3c3794] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2f2b77]">Calcular costos</button>
                                <button type="reset" className="min-h-11 rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">Limpiar</button>
                            </div>
                        </>
                    )}
                </form>

                <div className="min-w-0 overflow-hidden rounded-2xl border border-indigo-100">
                    <div role="status" className="bg-[#262254] p-4 text-white sm:p-5">
                        <h3 className="text-sm font-semibold">Resumen de gastos</h3>
                        {result && mode ? (
                            <>
                                <p className="mt-1 break-words text-sm text-indigo-100">
                                    China → {importModes[mode].destination} · {result.incoterm}
                                </p>
                            </>
                        ) : <p className="mt-2 text-sm text-indigo-100">Completa los datos de la carga para ver el desglose.</p>}
                    </div>
                    {result && (
                        <div className="space-y-4 bg-white p-3 sm:p-4">
                            {weight?.mode === 'lcl' && (
                                <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                                    El flete se calcula sobre {quantity.format(weight.freightUnits)} t/m³, el mayor entre {quantity.format(weight.weightTonnes)} t y {quantity.format(weight.volumeM3)} m³, sujeto al mínimo.
                                </p>
                            )}
                            {weight?.mode === 'air' && (
                                <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                                    Peso facturable: <strong>{quantity.format(weight.chargeableKg)} kg</strong>. Es el mayor entre {quantity.format(weight.actualKg)} kg reales y {quantity.format(weight.volumetricKg)} kg volumétricos (m³ × 1 000 000 ÷ 6 000).
                                </p>
                            )}
                            <ChargeGroup title="Gastos no afectos al IGV" charges={result.nonTaxable} subtotal={result.nonTaxableSubtotal} />
                            <ChargeGroup title="Gastos afectos al IGV" charges={result.taxable} subtotal={result.taxableSubtotal} />
                            <dl className="divide-y divide-indigo-100 rounded-lg bg-indigo-50/75 px-3">
                                <div className={resultRowClass}>
                                    <dt><ChargeNote label={`IGV (${LOGISTICS_IGV_RATE} %)`} note="El proveedor incluye el impuesto en la factura de los servicios afectos. Aquí se calcula sobre el subtotal de esos servicios." /></dt>
                                    <dd className="m-0 font-semibold tabular-nums">{usd.format(result.igv)}</dd>
                                </div>
                                <div className={`${resultRowClass} font-bold`}>
                                    <dt>Gastos afectos con IGV</dt>
                                    <dd className="m-0 tabular-nums">{usd.format(result.taxableTotal)}</dd>
                                </div>
                            </dl>
                            <div role="status" className="rounded-xl bg-[#262254] p-4 text-white">
                                <h4 className="text-sm font-semibold">Total logístico estimado</h4>
                                <p className="mt-1 break-words text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">{usd.format(result.total)}</p>
                            </div>
                            <WhatsAppLink messageKey="carga" customMessageBody={result.quoteMessage}
                                route={trackingLocation}
                                className="w-full justify-center text-center">
                                Pedir cotización por WhatsApp
                            </WhatsAppLink>
                        </div>
                    )}
                </div>
            </div>
            <p className="mt-5 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-600">
                Estimación referencial de servicios logísticos. Los importes pueden variar según el operador y el embarque. El total excluye la mercancía, el seguro y los tributos de importación.
            </p>
            {embedded && (
                <Link className="mt-3 inline-block text-sm font-semibold text-[#3c3794] underline underline-offset-4" href={IMPORT_COST_SIMULATOR_PATH}>Abrir el simulador</Link>
            )}
        </section>
    );
}
