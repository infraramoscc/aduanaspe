'use client';

import { FormBase } from './FormBase';
import { Input, Select, Textarea } from '@/components/ui';
import { trackEvent, GA4_EVENTS } from '@/components/tracking';

interface DiagnosticoFormProps {
    title?: string;
}

function DiagnosticoForm({ title = 'Diagnóstico de Comercio Exterior' }: DiagnosticoFormProps) {
    const handleSubmit = async (formData: FormData) => {
        const data = {
            nombre: formData.get('nombre') as string,
            email: formData.get('email') as string,
            tipo_operacion: formData.get('tipo_operacion') as string,
            mensaje: formData.get('mensaje') as string || undefined,
        };

        const response = await fetch('/api/forms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formType: 'diagnostico', data }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al enviar formulario');
        }

        trackEvent(GA4_EVENTS.SUBMIT_FORM_DIAGNOSTICO, {
            tipo_operacion: data.tipo_operacion,
        });
    };

    return (
        <div className="py-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">{title}</h2>
            <FormBase onSubmit={handleSubmit}>
                <Input
                    id="nombre"
                    name="nombre"
                    label="Nombre completo"
                    placeholder="Tu nombre"
                    required
                />
                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Correo electrónico"
                    placeholder="tu@email.com"
                    required
                />
                <Select
                    id="tipo_operacion"
                    name="tipo_operacion"
                    label="Tipo de operación"
                    placeholder="Selecciona una opción"
                    options={[
                        { value: 'importacion', label: 'Importación' },
                        { value: 'exportacion', label: 'Exportación' },
                        { value: 'ambos', label: 'Ambos' },
                        { value: 'no_se', label: 'No estoy seguro' },
                    ]}
                    required
                />
                <Textarea
                    id="mensaje"
                    name="mensaje"
                    label="Cuéntanos sobre tu proyecto"
                    placeholder="Describe brevemente qué productos deseas importar o exportar..."
                />
            </FormBase>
        </div>
    );
}

export { DiagnosticoForm };
