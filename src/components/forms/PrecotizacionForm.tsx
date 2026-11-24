'use client';

import { FormBase } from './FormBase';
import { Input, Select, Textarea } from '@/components/ui';
import { trackEvent, GA4_EVENTS } from '@/components/tracking';
import type { PrecotizacionData } from '@/lib/schemas';

interface PrecotizacionFormProps {
    title?: string;
    serviceName?: string;
    variant?: 'default' | 'home';
    operationStage?: PrecotizacionData['etapa'];
}

function PrecotizacionForm({
    title = 'Solicita una Pre-cotización',
    serviceName = 'general',
    variant = 'default',
    operationStage,
}: PrecotizacionFormProps) {
    const handleSubmit = async (formData: FormData) => {
        const data = {
            nombre: formData.get('nombre') as string,
            empresa: formData.get('empresa') as string || undefined,
            email: formData.get('email') as string,
            telefono: formData.get('telefono') as string || undefined,
            necesidad: formData.get('necesidad') as string || undefined,
            etapa: formData.get('etapa') as string || undefined,
            tipo_carga: formData.get('tipo_carga') as string,
            origen_destino: formData.get('origen_destino') as string || undefined,
            mercancia: formData.get('mercancia') as string || undefined,
            peso_volumen: formData.get('peso_volumen') as string || undefined,
            fecha_estimada: formData.get('fecha_estimada') as string || undefined,
            descripcion: formData.get('descripcion') as string || undefined,
            servicio: serviceName,
        };

        const response = await fetch('/api/forms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formType: 'precotizacion', data }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al enviar formulario');
        }

        trackEvent(GA4_EVENTS.SUBMIT_FORM_PRECOTIZACION, {
            service: serviceName,
            tipo_carga: data.tipo_carga,
            necesidad: data.necesidad ?? 'no_indicada',
            etapa: data.etapa ?? 'no_indicada',
        });
    };

    return (
        <div className={variant === 'home' ? 'py-2' : 'py-12'}>
            <h2 className={variant === 'home' ? 'mb-6 text-2xl font-extrabold text-slate-950' : 'mb-6 text-center text-2xl font-bold text-gray-900'}>{title}</h2>
            <FormBase
                onSubmit={handleSubmit}
                className={variant === 'home' ? 'max-w-none border-0 shadow-[0_28px_70px_-46px_rgba(23,32,51,0.8)]' : undefined}
                submitLabel={variant === 'home' ? 'Enviar datos para evaluación' : 'Enviar solicitud'}
                successMessage="Recibimos los datos de tu operación. Los revisaremos y te responderemos por correo dentro de las próximas 24 horas hábiles."
            >
                {variant === 'default' && operationStage && (
                    <input type="hidden" name="etapa" value={operationStage} />
                )}
                {variant === 'home' && (
                    <>
                        <fieldset className="space-y-4">
                            <legend className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--home-brand)]">1. Tu necesidad</legend>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Select
                                    id="necesidad"
                                    name="necesidad"
                                    label="¿Qué necesitas resolver?"
                                    placeholder="Selecciona una opción"
                                    options={[
                                        { value: 'integral', label: 'Operación integral: flete, aduanas y entrega' },
                                        { value: 'flete', label: 'Solo flete internacional' },
                                        { value: 'aduanas', label: 'Despacho aduanero' },
                                        { value: 'incidencia', label: 'Observación o incidencia SUNAT' },
                                        { value: 'orientacion', label: 'Aún necesito orientación' },
                                    ]}
                                    required
                                />
                                <Select
                                    id="etapa"
                                    name="etapa"
                                    label="¿En qué etapa estás?"
                                    placeholder="Selecciona una etapa"
                                    options={[
                                        { value: 'planificando', label: 'Estoy planificando' },
                                        { value: 'proveedor_listo', label: 'Ya tengo proveedor o proforma' },
                                        { value: 'reservada', label: 'La carga ya está reservada' },
                                        { value: 'transito', label: 'La carga está en tránsito' },
                                        { value: 'arribada', label: 'La carga ya arribó' },
                                        { value: 'incidencia', label: 'Tengo una incidencia' },
                                    ]}
                                    required
                                />
                            </div>
                        </fieldset>
                        <div className="h-px bg-slate-200" />
                    </>
                )}

                {variant === 'home' && (
                    <fieldset className="space-y-4">
                        <legend className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--home-brand)]">2. Datos de la operación</legend>
                        <Input
                            id="mercancia"
                            name="mercancia"
                            label="Mercancía"
                            placeholder="Ej: repuestos, textiles o maquinaria"
                            required
                        />
                    </fieldset>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Select
                        id="tipo_carga"
                        name="tipo_carga"
                        label="Modalidad de carga"
                        placeholder="Selecciona una opción"
                        options={[
                            { value: 'maritima', label: 'Carga marítima' },
                            { value: 'aerea', label: 'Carga aérea' },
                            { value: 'terrestre', label: 'Carga terrestre' },
                            { value: 'courier', label: 'Courier' },
                            { value: 'no_se', label: 'Aún no lo sé' },
                        ]}
                        required
                    />
                    <Input
                        id="origen_destino"
                        name="origen_destino"
                        label="Origen y destino"
                        placeholder="Ej: Shanghái → Callao"
                    />
                </div>

                {variant === 'home' && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            id="peso_volumen"
                            name="peso_volumen"
                            label="Peso o volumen aproximado"
                            placeholder="Ej: 850 kg o 4.2 m³"
                        />
                        <Input
                            id="fecha_estimada"
                            name="fecha_estimada"
                            type="date"
                            label="Fecha estimada"
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        id="nombre"
                        name="nombre"
                        label="Nombre completo"
                        placeholder="Tu nombre"
                        autoComplete="name"
                        required
                    />
                    <Input
                        id="empresa"
                        name="empresa"
                        label="Empresa"
                        placeholder="Nombre de tu empresa"
                        autoComplete="organization"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Correo electrónico"
                        placeholder="tu@email.com"
                        autoComplete="email"
                        required
                    />
                    <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        label="Teléfono"
                        placeholder="+51 999 999 999"
                        autoComplete="tel"
                    />
                </div>
                <Textarea
                    id="descripcion"
                    name="descripcion"
                    label={variant === 'home' ? 'Contexto adicional' : 'Descripción de la carga'}
                    placeholder={variant === 'home' ? 'Incoterm, documentos disponibles, dudas o restricciones que debamos revisar.' : 'Describe el tipo de mercancía, cantidad estimada, peso aproximado...'}
                />
                {variant === 'home' && (
                    <p className="text-sm leading-6 text-slate-600">Primero confirmamos alcance y viabilidad. Una evaluación completa requiere información suficiente y no constituye una cotización automática.</p>
                )}
            </FormBase>
        </div>
    );
}

export { PrecotizacionForm };
