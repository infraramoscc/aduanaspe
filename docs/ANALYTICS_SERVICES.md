# Medición del recorrido de servicios

El recorrido principal se mide sin enviar nombres, teléfonos, correos ni el texto escrito por la persona.

## Eventos

| Evento | Momento | Parámetros útiles |
| --- | --- | --- |
| `click_cta_to_servicios` | La persona abre el directorio desde la portada o la portada de servicios | `location`, `href` |
| `service_selected` | Elige una ficha de servicio | `location`, `service_slug`, `service_group`, `href` |
| `whatsapp_clicked` | Abre WhatsApp desde cualquier CTA | `location`, `service_slug`, `message_key` |
| `click_cta_to_contacto` | Prefiere el formulario o contacto directo | `location`, `href` |
| `submit_form_contacto` | Envía el formulario de contacto | parámetros existentes del formulario |
| `submit_form_precotizacion` | Envía una precotización desde una página de servicio | parámetros existentes del formulario |

## Embudo recomendado en GA4

1. Visita a `/` o `/servicios`.
2. Evento `service_selected` o visita a una URL que empiece con `/servicios/`.
3. Evento `whatsapp_clicked`, `submit_form_contacto` o `submit_form_precotizacion`.

Segmentar por `location` permite comparar portada, directorio, navegación de servicios y CTA final. `service_slug` permite saber qué servicio genera más intención de contacto.

## Validación tras publicar

1. Abrir GA4 en **Tiempo real** o **DebugView**.
2. Entrar a la portada, elegir un servicio y pulsar su CTA de WhatsApp.
3. Confirmar la secuencia `service_selected` → `whatsapp_clicked` y revisar sus parámetros.
4. Marcar `whatsapp_clicked`, `submit_form_contacto` y `submit_form_precotizacion` como eventos clave si el equipo los considera conversiones comerciales.
