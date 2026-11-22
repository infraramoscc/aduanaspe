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

## Activación de PostHog y Microsoft Clarity

El despliegue lee estas variables públicas en el momento de compilar.

| Variable | Valor |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | ID de medición de la propiedad de GA4 existente. |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | ID de Microsoft Clarity, en **Settings → Setup**. |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | Token público del proyecto, en **Project settings**. |
| `NEXT_PUBLIC_POSTHOG_HOST` | Host de ingestión del proyecto, por ejemplo `https://us.i.posthog.com` o `https://eu.i.posthog.com`. |
| `NEXT_PUBLIC_ANALYTICS_HOSTNAME` | Opcional. Reemplaza `aduanaspe.com` y `www.aduanaspe.com` por un host exacto. Para una prueba local usa `localhost` con proyectos de prueba. |

En Clarity, activa **Consent Mode** y selecciona **Strict** en **Settings → Masking** antes de cargar el ID en producción. Los formularios de contacto, diagnóstico, precotización y blog tienen además enmascaramiento explícito en el HTML.

Los proveedores se cargan tras aceptar en **Preferencias de analítica**. El sitio permite retirar el permiso desde el pie de página. Si Clarity está cargado, se aplica la revocación y se recarga la pestaña para evitar que continúe en su modo limitado.

### Embudo en PostHog

1. Configura un embudo de `$pageview` para la portada, el directorio o el contenido de entrada.
2. Añade una vista de ficha filtrada por `$pathname`, o usa `service_selected` para analizar el paso desde el directorio.
3. Crea resultados separados para `whatsapp_clicked`, `submit_form_contacto` y `submit_form_precotizacion`. Los tres reutilizan los puntos de captura existentes. El clic en WhatsApp mide intención y el evento de formulario se registra tras una respuesta exitosa de la API. También están disponibles `submit_form_diagnostico` y `generate_lead`.

Usa el desglose por dispositivo, `location` o `service_slug`. PostHog recibe vistas de ruta sin parámetros ni fragmentos y solo los eventos comerciales seleccionados. Las grabaciones se revisan en Clarity.

## Validación tras publicar

1. Abrir una sesión privada. Antes de elegir y después de rechazar, verificar en la pestaña **Red** que no se soliciten los scripts ni se envíen eventos a los proveedores.
2. Aceptar, entrar al directorio, elegir un servicio y pulsar su CTA de WhatsApp. Confirmar en **Tiempo real** de GA4 y en la actividad de PostHog la secuencia `service_selected` → `whatsapp_clicked`. Verificar que PostHog cuente una vista por cambio de ruta.
3. Con datos de prueba, verificar que una respuesta exitosa emita el evento de formulario y que un error de la API quede fuera de las conversiones. Revisar que los eventos y grabaciones no expongan los datos ingresados.
4. Retirar el permiso desde el pie de página y comprobar que cesen las solicitudes de analítica y que la decisión se conserve al volver al sitio.
5. Marcar `whatsapp_clicked`, `submit_form_contacto` y `submit_form_precotizacion` como eventos clave en GA4 si el equipo los usa como conversiones comerciales.
