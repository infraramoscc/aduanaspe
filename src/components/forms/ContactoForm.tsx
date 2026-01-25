'use client';

import { FormBase } from './FormBase';
import { Input, Textarea } from '@/components/ui';
import { trackEvent, GA4_EVENTS } from '@/components/tracking';

interface ContactoFormProps {
    title?: string;
}

function ContactoForm({ title = 'Envíanos un mensaje' }: ContactoFormProps) {
    const handleSubmit = async (formData: FormData) => {
        const data = {
            nombre: formData.get('nombre') as string,
            email: formData.get('email') as string,
            asunto: formData.get('asunto') as string,
            mensaje: formData.get('mensaje') as string,
        };

        const response = await fetch('/api/forms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formType: 'contacto', data }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al enviar formulario');
        }

        trackEvent(GA4_EVENTS.SUBMIT_FORM_CONTACTO);
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
                <Input
                    id="asunto"
                    name="asunto"
                    label="Asunto"
                    placeholder="¿En qué podemos ayudarte?"
                    required
                />
                <Textarea
                    id="mensaje"
                    name="mensaje"
                    label="Mensaje"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                />
            </FormBase>
        </div>
    );
}

export { ContactoForm };
