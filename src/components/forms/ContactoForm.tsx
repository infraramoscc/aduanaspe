'use client';

import { FormBase } from './FormBase';
import { useState } from 'react';
import { contactoSchema } from '@/lib/schemas';
import { Input, Textarea } from '@/components/ui';
import { trackEvent, GA4_EVENTS } from '@/components/tracking';

interface ContactoFormProps {
    title?: string;
}

function ContactoForm({ title = 'Envíanos un mensaje' }: ContactoFormProps) {
    const deliveryError = 'No pudimos enviar tu consulta. Tus datos siguen aquí: intenta otra vez o contáctanos por WhatsApp desde el botón de esta página.';
    const [submitError, setSubmitError] = useState(deliveryError);
    const handleSubmit = async (formData: FormData) => {
        setSubmitError(deliveryError);
        const data = {
            nombre: formData.get('nombre') as string,
            email: formData.get('email') as string,
            asunto: formData.get('asunto') as string,
            mensaje: formData.get('mensaje') as string,
            website: formData.get('website') as string,
        };

        const validation = contactoSchema.safeParse(data);
        if (!validation.success) {
            const message = validation.error.issues.map(issue => issue.message).join('. ');
            setSubmitError(message);
            throw new Error(message);
        }

        const response = await fetch('/api/forms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formType: 'contacto', data }),
        });

        if (!response.ok) {
            const error = await response.json();
            if (response.status === 400 && Array.isArray(error.details)) {
                setSubmitError(error.details.filter((detail: unknown) => typeof detail === 'string').join('. ') || 'Revisa los datos del formulario.');
            }
            throw new Error(error.error || 'Error al enviar formulario');
        }

        trackEvent(GA4_EVENTS.SUBMIT_FORM_CONTACTO);
    };

    return (
        <div>
            {title ? <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">{title}</h2> : null}
            <FormBase onSubmit={handleSubmit} successMessage="Recibimos tu consulta. Te responderemos al correo que indicaste; revisa también la carpeta de spam." errorMessage={submitError}>
                <p className="text-sm leading-6 text-slate-600">Completa los 4 campos. Te responderemos por correo; si prefieres conversar por WhatsApp, usa el enlace de esta página.</p>
                <div hidden aria-hidden="true">
                    <label htmlFor="contact-website">Deja este campo vacío</label>
                    <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <Input
                    id="nombre"
                    name="nombre"
                    minLength={2}
                    aria-describedby="nombre-ayuda"
                    autoComplete="name"
                    label="Nombre completo"
                    placeholder="Tu nombre"
                    required
                />
                <p id="nombre-ayuda" className="text-sm text-slate-600">Mínimo 2 caracteres.</p>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    label="Correo electrónico"
                    placeholder="tu@email.com"
                    required
                />
                <Input
                    id="asunto"
                    name="asunto"
                    minLength={3}
                    aria-describedby="asunto-ayuda"
                    label="¿Sobre qué es tu consulta?"
                    placeholder="Ej.: documentos para importar…"
                    required
                />
                <p id="asunto-ayuda" className="text-sm text-slate-600">Mínimo 3 caracteres.</p>
                <Textarea
                    id="mensaje"
                    name="mensaje"
                    minLength={10}
                    label="Cuéntanos qué necesitas"
                    placeholder="Quiero importar o exportar…"
                    aria-describedby="mensaje-ayuda"
                    required
                />
                <p id="mensaje-ayuda" className="text-sm leading-6 text-slate-600">Mínimo 10 caracteres. Si los conoces, indica el producto, país de origen o destino y en qué etapa estás. Si aún no tienes esos datos, escribe tu duda. No incluyas contraseñas ni datos bancarios.</p>
            </FormBase>
        </div>
    );
}

export { ContactoForm };
