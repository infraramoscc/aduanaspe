# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

AduanasPE atiende principalmente a importadores, exportadores, emprendedores, pymes y empresas en Perú que necesitan entender o ejecutar operaciones de comercio exterior.

El usuario suele llegar con dudas sobre requisitos, costos, documentos, permisos, modalidades de carga o trámites aduaneros. Su trabajo principal es reducir incertidumbre, preparar correctamente una operación y decidir cuándo necesita apoyo especializado.

## Product Purpose

AduanasPE es un ecosistema educativo y comercial que ayuda a las personas a avanzar desde el aprendizaje hasta una consulta o contratación informada. Combina contenido, herramientas, orientación inicial y servicios de aduanas, carga internacional y comercio exterior.

El éxito del producto significa que el usuario entiende qué necesita, llega al contacto humano con mejor contexto y puede iniciar una operación con menos confusión e idas y vueltas.

## Positioning

La propuesta se basa en una conversión progresiva: primero educar y orientar; después presentar el servicio adecuado; finalmente facilitar el contacto. La asesoría inicial es gratuita y sin compromiso, y cuando una operación requiere gestión se ofrece atención personalizada mediante un ejecutivo asignado y seguimiento claro.

## Operating Context

El recorrido principal conecta contenido educativo, páginas de comercio exterior, páginas de servicios y contacto. Los usuarios pueden investigar importación, exportación, acuerdos comerciales, regímenes y documentación; utilizar herramientas de preparación; solicitar diagnóstico o pre-cotización; y continuar por formulario, correo o WhatsApp según su nivel de intención.

La operación se coordina desde Callao con atención remota y cobertura nacional en Perú. El sitio distingue entre tráfico orgánico, campañas publicitarias y diferentes etapas de madurez del lead.

## Capabilities and Constraints

- Sitio web de marketing y captación construido con Next.js, React, TypeScript y Tailwind CSS.
- Blog educativo con contenido local en MDX y Sanity como fuente opcional.
- Páginas de servicios, comercio exterior, herramientas y landings separadas para campañas.
- Tres formularios con funciones distintas: diagnóstico, pre-cotización y contacto.
- WhatsApp es un canal asistido de contacto; debe conservarse el formulario correspondiente a cada etapa.
- GA4 mide intención y conversión mediante eventos de CTA, formularios y salidas a WhatsApp.
- Resend gestiona las notificaciones por correo cuando está configurado.
- Las landings publicitarias no forman parte de la arquitectura SEO y deben mantenerse fuera del índice y de la navegación orgánica.
- No se deben mezclar educación, evaluación comercial y cierre sin una razón explícita.

## Brand Commitments

- Nombre: AduanasPE.
- Comunicación en español claro, útil y tranquilizadora, sin exigir que el usuario conozca terminología aduanera.
- Asesoría inicial gratuita y sin compromiso.
- Respuesta en menos de una hora dentro del horario de atención.
- Más de cinco años de experiencia en despachos y asesoría.
- Ejecutivo asignado como punto de contacto para las operaciones.
- Operación desde Callao y atención remota a clientes de todo el Perú.

## Evidence on Hand

- Visión y modelo de conversión documentados en `docs/01-Vision.md`.
- Reglas de formularios, navegación, WhatsApp y medición en `docs/05-FORMS.md`, `docs/06-NAVIGATION.md`, `docs/08-WHATSAPP.md` y `docs/09-MEASUREMENT_ADS.md`.
- Implementación visible de páginas de servicios, comercio exterior, blog, herramientas, campañas y contacto bajo `src/app/`.
- Formularios y seguimiento de conversiones implementados bajo `src/components/forms/` y `src/components/tracking/`.
- Las afirmaciones sobre asesoría gratuita, tiempo de respuesta, experiencia, ejecutivo asignado y cobertura nacional fueron confirmadas por el propietario del proyecto durante esta inicialización.
- No se deben fabricar testimonios, clientes, certificaciones, cifras adicionales ni resultados comerciales sin evidencia verificable.

## Product Principles

1. Atraer con contenido, orientar con educación, vender con claridad y cerrar con contexto.
2. Dar a cada página y formulario un propósito claro dentro del recorrido del usuario.
3. Reducir la incertidumbre antes de pedir datos o proponer una contratación.
4. Priorizar leads informados y medibles sobre volumen de contacto sin contexto.
5. Mantener el ecosistema escalable, conectado y comprensible a medida que crece.
