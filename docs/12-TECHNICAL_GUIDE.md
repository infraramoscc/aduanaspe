# TECHNICAL_GUIDE.md
## Guia tecnica del proyecto

---

## 0. Proposito del documento

Este documento resume la implementacion real del repositorio para facilitar:

- onboarding tecnico
- mantenimiento del codigo
- extension controlada de rutas y contenido
- ubicacion rapida de modulos clave

No reemplaza la documentacion estrategica de `VISION`, `ARCHITECTURE` o `MAINTENANCE`. La complementa.

---

## 1. Resumen del sistema

El proyecto es una aplicacion Next.js con App Router orientada a captacion y conversion. El codigo actual cubre:

- sitio principal
- blog
- landings de Ads
- formularios
- tracking
- SEO tecnico

El repositorio no esta estructurado como monorepo. Todo corre desde una sola app web.

---

## 2. Mapa general del codigo

### 2.1 `src/app`

Responsable del arbol de rutas.

- `layout.tsx`: layout raiz, metadata global y carga de GA
- `sitemap.ts`: sitemap dinamico
- `robots.ts`: robots
- `(site)`: sitio principal y blog
- `(ads)`: landings de campanas
- `api`: endpoints server-side

### 2.2 `src/components`

Componentes reutilizables separados por dominio:

- `layout`: header, footer, breadcrumbs, container
- `sections`: bloques de paginas marketing
- `forms`: formularios y wrapper base
- `blog`: render, CTA, cards, lead form inline
- `tracking`: GA4, links trackeados y WhatsApp
- `seo`: JSON-LD y componentes SEO
- `ui`: primitives internas

### 2.3 `src/content`

Fuente de contenido estructurado y configuracion editorial:

- `blog/`: posts MDX locales
- `services.ts`: catalogo de servicios
- `comercioExterior.ts`: hubs y sub-landings educativas
- `lp.ts`: definicion de landings de Ads

### 2.4 `src/lib`

Logica compartida:

- `blog/`: agregacion MDX + Sanity
- `email.ts`: envio de correos con Resend
- `routes.ts`: constantes de rutas
- `schema.ts`: schema.org
- `schemas.ts`: validaciones Zod
- `seo.ts`: metadata reutilizable
- `whatsapp.ts`: mensajes y URLs de WhatsApp

---

## 3. Modelo de rutas

### 3.1 Rutas del sitio principal

Viven en `src/app/(site)` y heredan `src/app/(site)/layout.tsx`.

Rutas de mayor relevancia:

- `/`
- `/quienes-somos`
- `/servicios`
- `/servicios/[slug]`
- `/contacto`
- `/comercio-exterior`
- `/comercio-exterior/importacion`
- `/comercio-exterior/exportacion`
- `/comercio-exterior/regimenes-aduaneros`
- `/comercio-exterior/documentos-aduaneros`
- `/blog`
- `/blog/[slug]`

### 3.2 Rutas de Ads

Viven en `src/app/(ads)`.

- `/lp/[slug]`
- `/oferta/primera-importacion`

Las paginas de `Ads` usan metadata `noindex` y deben tratarse como landings de campana, no como activos SEO permanentes.

### 3.3 APIs

- `src/app/api/forms/route.ts`
  - valida con Zod
  - envia correo interno
  - envia confirmacion al usuario si corresponde

- `src/app/api/blog-lead/route.ts`
  - valida nombre/email de forma basica
  - registra el lead en consola
  - todavia no integra CRM o envio real

---

## 4. Blog: arquitectura real

El blog funciona como una capa unificada sobre dos fuentes:

### 4.1 MDX local

- directorio: `src/content/blog`
- lectura y parseo: `src/lib/blog/mdx.ts`

### 4.2 Sanity

- cliente: `src/lib/blog/sanity.ts`
- activacion: `NEXT_PUBLIC_SANITY_PROJECT_ID`

### 4.3 Agregacion

`src/lib/blog/index.ts`:

- obtiene posts de ambas fuentes
- deduplica por `slug`
- prioriza MDX local cuando hay colision
- resuelve listado, paginacion, relacionados y slugs estaticos

### 4.4 Render

- indice: `src/app/(site)/blog/page.tsx`
- detalle: `src/app/(site)/blog/[slug]/page.tsx`

Para posts MDX se usa `next-mdx-remote/rsc` con `remark-gfm`.

---

## 5. Formularios y conversion

Los formularios oficiales son:

- diagnostico
- precotizacion
- contacto

Se implementan en `src/components/forms/` y comparten wrapper en `FormBase.tsx`.

La validacion server-side esta en `src/lib/schemas.ts` mediante una union discriminada con `formType`.

El flujo backend actual es:

1. El cliente envia `POST` a `/api/forms`
2. El servidor valida con Zod
3. Se envia correo interno con `sendNotificationEmail`
4. Se intenta enviar confirmacion al usuario
5. Si no hay `RESEND_API_KEY`, el envio se simula via logs

---

## 6. SEO, redirects y metadata

### 6.1 Metadata

- metadata global: `src/app/layout.tsx`
- helpers reutilizables: `src/lib/seo.ts`
- metadata del blog: `src/lib/blog/seo.ts`

### 6.2 Sitemap y robots

- `src/app/sitemap.ts` incorpora paginas principales y posts del blog
- `src/app/robots.ts` centraliza la politica de rastreo

### 6.3 Datos estructurados

- `src/lib/schema.ts`
- `src/components/seo/StructuredData.tsx`
- `src/components/seo/FaqJsonLd.tsx`

### 6.4 Redirects

`next.config.ts` mantiene redirects de URLs antiguas, principalmente de migracion desde WordPress hacia nuevas rutas del blog y servicios.

---

## 7. Tracking

### 7.1 Google Analytics

Si existe `NEXT_PUBLIC_GA_ID`, `src/components/tracking/GoogleAnalytics.tsx` inserta el snippet de GA4.

### 7.2 Eventos

`src/components/tracking/ga4.ts` define nombres de evento usados por:

- CTA del home y paginas internas
- clics a WhatsApp
- formularios
- eventos del blog

### 7.3 WhatsApp

`src/lib/whatsapp.ts` centraliza:

- numero de WhatsApp
- mensajes prellenados
- soporte futuro para `wa.aduanaspe.com`
- mapeo entre servicio y mensaje

---

## 8. Variables de entorno

Variables detectadas en el codigo:

- `RESEND_API_KEY`
- `EMAIL_TO`
- `EMAIL_FROM`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

Si faltan:

- Resend entra en modo de desarrollo sin envio real
- Sanity se desactiva y el blog usa solo MDX
- GA4 no se carga

---

## 9. Comandos de trabajo

```bash
npm run dev
npm run build
npm run start
npm run lint
```

No se encontro configuracion activa de:

- Jest
- Vitest
- Playwright
- Cypress

---

## 10. Tareas comunes

### 10.1 Crear un nuevo post MDX

1. Agregar archivo en `src/content/blog`
2. Completar frontmatter
3. Probar listado en `/blog`
4. Probar detalle en `/blog/[slug]`
5. Revisar sitemap y metadata

### 10.2 Crear una nueva landing de Ads

1. Agregar entrada en `src/content/lp.ts`
2. Validar `slug`, CTA y `formType`
3. Probar en `/lp/[slug]`
4. Confirmar que la metadata quede en `noindex`

### 10.3 Ajustar un formulario

1. Actualizar componente en `src/components/forms`
2. Alinear schema en `src/lib/schemas.ts`
3. Validar payload hacia `/api/forms`
4. Probar flujo con y sin `RESEND_API_KEY`

### 10.4 Agregar un servicio

1. Editar `src/content/services.ts`
2. Crear o actualizar pagina en `src/app/(site)/servicios`
3. Revisar CTAs, breadcrumbs, schema y links relacionados

---

## 11. Riesgos y deudas tecnicas visibles

- No hay tests automatizados
- `blog-lead` todavia no integra CRM ni email real
- `schema.ts` conserva campos incompletos para direccion y redes sociales
- La mezcla MDX + Sanity exige cuidar `slug` y metadatos para evitar inconsistencias
- La documentacion estrategica y la implementacion ya no coinciden al 100 por ciento: hoy el repo si incluye blog dentro de la misma app

---

## 12. Recomendacion de lectura para onboarding

Orden sugerido:

1. `README.md`
2. `docs/01-Vision.md`
3. `docs/02-ARCHITECTURE.md`
4. `docs/05-FORMS.md`
5. `docs/11-MAINTENANCE.md`
6. este documento

---
