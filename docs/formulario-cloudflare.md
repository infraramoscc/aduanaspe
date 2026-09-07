# Formulario de contacto: Cloudflare

El formulario de Contacto llama desde Next.js al Worker `aduanaspe-contacto.infra-ramoscc.workers.dev`. El Worker usa el binding `SEND_EMAIL` y envía únicamente al destinatario verificado. Los formularios de diagnóstico y precotización mantienen Resend. La API REST anterior no se usa en el recorrido normal.

## Activación pendiente en cada entorno

1. Confirmar Email Routing activo para `aduanaspe.com` y el destinatario `jean.ramos@perkel.com.pe` verificado.
2. Copiar `workers/contacto/worker.mjs` completo al editor `worker.js` de Cloudflare y desplegar. Conservar el binding Email Service llamado `SEND_EMAIL`.
3. Crear una clave aleatoria de al menos 32 caracteres y guardar el mismo valor como secreto `CONTACT_SECRET` del Worker y como `CLOUDFLARE_CONTACT_SECRET` en `.env.local` y en las variables privadas del hosting. No es un token de API de Cloudflare. Sin esa clave, los envíos se rechazan.
4. Reiniciar el servidor local o desplegar para aplicar variables.
5. Enviar una prueba autorizada y verificar recepción en Perkel, incluida la carpeta de spam. La respuesta del Worker confirma aceptación por el servicio, no recepción final en bandeja.

No pegar tokens en chats, archivos versionados ni variables `NEXT_PUBLIC_`. No es necesario crear un buzón para el remitente ni mostrar correos en la página.

## Alcance y límites

- Destinatario interno fijo; el visitante no puede elegirlo.
- Mensaje en texto plano y `replyTo` con el correo validado del visitante.
- No se envían confirmaciones automáticas a visitantes: solo confirmación en pantalla, para mantener el caso de destinatario verificado gratuito.
- Validación de campos, comprobación de origen, límite de tamaño y honeypot. Estas medidas básicas no sustituyen Turnstile o límites de frecuencia distribuidos si hay abuso.
- No hay reintentos automáticos para evitar duplicados cuando la entrega queda incierta.
- Los errores del servidor registran estado y códigos, no tokens ni contenido del visitante.
- No activar planes pagados: si la cuenta rechaza la API por permisos o disponibilidad, revisar ese requisito antes de continuar.

Referencias oficiales: https://developers.cloudflare.com/email-service/api/send-emails/rest-api/ y https://developers.cloudflare.com/email-service/platform/pricing/
