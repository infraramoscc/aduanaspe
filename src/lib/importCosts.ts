export const LOGISTICS_IGV_RATE = 18;

export const importModes = {
    fcl: { label: 'FCL marítimo', destination: 'Callao' },
    lcl: { label: 'LCL marítimo', destination: 'Callao' },
    air: { label: 'Aéreo', destination: 'Lima' },
} as const;

export const containerFreight = { '20': 6000, '40': 6200, '40HC': 6200 } as const;

export type ImportMode = keyof typeof importModes;
export type ContainerType = keyof typeof containerFreight;
export type Incoterm = 'EXW' | 'FOB';

type ImportShipment = { incoterm: Incoterm } & (
    | { mode: 'fcl'; containerType: ContainerType; containerCount: number }
    | { mode: 'lcl' | 'air'; weightKg: number; volumeM3: number }
);

type Charge = { label: string; amount: number; basis?: string };

type ChargeableWeight =
    | { mode: 'lcl'; weightTonnes: number; volumeM3: number; freightUnits: number }
    | { mode: 'air'; volumetricKg: number; actualKg: number; chargeableKg: number };

const customsCharges: Charge[] = [
    { label: 'Comisión de agenciamiento de aduanas', amount: 160 },
    { label: 'Gastos operativos', amount: 50 },
];

function roundMoney(amount: number) {
    return Math.round((amount + Number.EPSILON * amount) * 100) / 100;
}

export function calculateImportCosts(shipment: ImportShipment) {
    const nonTaxable: Charge[] = [];
    const taxable: Charge[] = [];
    let chargeableWeight: ChargeableWeight | null = null;

    if (shipment.mode === 'fcl') {
        const count = shipment.containerCount;
        const container = shipment.containerType === '40HC' ? '40 HC' : `${shipment.containerType} pies`;
        const perContainer = `${count} × contenedor de ${container}`;
        nonTaxable.push({ label: 'Flete marítimo FCL', amount: containerFreight[shipment.containerType] * count, basis: perContainer });
        if (shipment.incoterm === 'EXW') {
            nonTaxable.push({ label: 'Costos EXW en origen', amount: 1600 * count, basis: perContainer });
        }
        taxable.push(
            { label: 'Visto bueno', amount: 350 * count, basis: perContainer },
            { label: 'Gate In', amount: 250 * count, basis: perContainer },
            ...customsCharges,
            { label: 'Depósito temporal', amount: 1000 * count, basis: perContainer },
            { label: 'Transporte de carga', amount: 450 * count, basis: perContainer },
        );
    } else {
        if (shipment.mode === 'lcl') {
            const weightTonnes = shipment.weightKg / 1000;
            const freightUnits = Math.max(weightTonnes, shipment.volumeM3);
            chargeableWeight = { mode: 'lcl', weightTonnes, volumeM3: shipment.volumeM3, freightUnits };
            nonTaxable.push({ label: 'Flete marítimo LCL', amount: Math.max(120, 120 * freightUnits), basis: 'USD 120 por tonelada o m³, mínimo USD 120' });
            taxable.push(
                { label: 'Visto bueno', amount: 180 },
                { label: 'Desconsolidación', amount: Math.max(50, 50 * weightTonnes), basis: 'USD 50 por tonelada, mínimo USD 50' },
                ...customsCharges,
                { label: 'Depósito temporal', amount: 450 },
            );
        } else {
            const volumetricKg = shipment.volumeM3 * 1_000_000 / 6000;
            const chargeableKg = Math.max(shipment.weightKg, volumetricKg);
            chargeableWeight = { mode: 'air', volumetricKg, actualKg: shipment.weightKg, chargeableKg };
            nonTaxable.push({ label: 'Flete aéreo', amount: Math.max(100, 9 * chargeableKg), basis: 'USD 9 por kg facturable, mínimo USD 100' });
            taxable.push(
                { label: 'Handling', amount: 90 },
                { label: 'Transmisión', amount: 50 },
                ...customsCharges,
                { label: 'Depósito temporal', amount: 650, basis: 'Importe aproximado' },
            );
        }
        if (shipment.incoterm === 'EXW') {
            nonTaxable.push({ label: 'Costos EXW en origen', amount: 500 });
        }
        taxable.push({ label: 'Transporte de carga', amount: 200 });
    }

    const nonTaxableSubtotal = roundMoney(nonTaxable.reduce((sum, charge) => sum + roundMoney(charge.amount), 0));
    const taxableSubtotal = roundMoney(taxable.reduce((sum, charge) => sum + roundMoney(charge.amount), 0));
    const igv = roundMoney(taxableSubtotal * LOGISTICS_IGV_RATE / 100);
    const taxableTotal = roundMoney(taxableSubtotal + igv);

    return {
        nonTaxable,
        taxable,
        nonTaxableSubtotal,
        taxableSubtotal,
        igv,
        taxableTotal,
        total: roundMoney(nonTaxableSubtotal + taxableTotal),
        chargeableWeight,
    };
}
