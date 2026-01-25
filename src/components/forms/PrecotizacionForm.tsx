'use client';

import { FormBase } from './FormBase';
import { Input, Select, Textarea } from '@/components/ui';
import { trackEvent, GA4_EVENTS } from '@/components/tracking';

interface PrecotizacionFormProps {
    title?: string;
    serviceName?: string;
}

function PrecotizacionForm({
    title = 'Solicita una Pre-cotización',
    serviceName = 'general'
}: PrecotizacionFormProps) {
    const handleSubmit = async (formData: FormData) => {
        const data = {
            nombre: formData.get('nombre') as string,
            empresa: formData.get('empresa') as string || undefined,
            email: formData.get('email') as string,
            telefono: formData.get('telefono') as string || undefined,
            tipo_carga: formData.get('tipo_carga') as string,
            origen_destino: formData.get('origen_destino') as string || undefined,
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
        });
    };

    return (
        <div className="py-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">{title}</h2>
            <FormBase onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        id="nombre"
                        name="nombre"
                        label="Nombre completo"
                        placeholder="Tu nombre"
                        required
                    />
                    <Input
                        id="empresa"
                        name="empresa"
                        label="Empresa"
                        placeholder="Nombre de tu empresa"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Correo electrónico"
                        placeholder="tu@email.com"
                        required
                    />
                    <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        label="Teléfono"
                        placeholder="+51 999 999 999"
                    />
                </div>
                <Select
                    id="tipo_carga"
                    name="tipo_carga"
                    label="Tipo de carga"
                    placeholder="Selecciona una opción"
                    options={[
                        { value: 'maritima', label: 'Carga Marítima' },
                        { value: 'aerea', label: 'Carga Aérea' },
                        { value: 'terrestre', label: 'Carga Terrestre' },
                        { value: 'courier', label: 'Courier' },
                    ]}
                    required
                />
                <Input
                    id="origen_destino"
                    name="origen_destino"
                    label="Origen / Destino"
                    placeholder="Ej: China → Lima"
                />
                <Textarea
                    id="descripcion"
                    name="descripcion"
                    label="Descripción de la carga"
                    placeholder="Describe el tipo de mercancía, cantidad estimada, peso aproximado..."
                />
            </FormBase>
        </div>
    );
}

export { PrecotizacionForm };
