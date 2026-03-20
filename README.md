# AduanasPE

Sitio web de AduanasPE construido con Next.js para captacion de leads, contenido SEO y landings de campanas para servicios de comercio exterior en Peru.

## Objetivo del proyecto

Este repositorio concentra la aplicacion web principal de `aduanaspe.com`. Hoy incluye:

- Sitio marketing principal
- Blog con contenido local en MDX y soporte opcional para Sanity
- Landings de Ads bajo rutas separadas
- Formularios de diagnostico, pre-cotizacion y contacto
- Tracking GA4, SEO tecnico y envio de emails con Resend

La documentacion estrategica vive en [`docs/`](./docs). Este `README` funciona como guia tecnica de entrada.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- MDX para contenido local del blog
- Sanity como fuente opcional adicional del blog
- Resend para notificaciones por email
- Google Analytics 4 para medicion

## Requisitos

- Node.js 20 o superior recomendado
- npm

## Puesta en marcha

1. Instala dependencias:

```bash
npm install
```

2. Crea tu archivo local de entorno:

```bash
cp .env.local.example .env.local
```

En Windows PowerShell:

```powershell
Copy-Item .env.local.example .env.local
```

3. Inicia el entorno de desarrollo:

```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Variables actualmente consumidas por el codigo:

| Variable | Uso | Obligatoria |
| --- | --- | --- |
| `RESEND_API_KEY` | Envio real de correos desde formularios | No |
| `EMAIL_TO` | Destinatario interno de leads | No |
| `EMAIL_FROM` | Remitente de Resend | No |
| `NEXT_PUBLIC_GA_ID` | Inserta el snippet de GA4 | No |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Activa lectura de posts desde Sanity | No |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset de Sanity | No |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Version de API para Sanity | No |

Notas:

- Si `RESEND_API_KEY` no existe, los formularios siguen funcionando en modo desarrollo y los correos se registran en consola.
- Si `NEXT_PUBLIC_SANITY_PROJECT_ID` no existe, el blog usa solo el contenido local en `src/content/blog`.
- Si `NEXT_PUBLIC_GA_ID` no existe, no se inyecta Google Analytics.

## Scripts disponibles

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Observacion: no hay suite de tests automatizados configurada actualmente.

## Estructura del proyecto

```text
src/
  app/
    (site)/              Sitio principal y blog
    (ads)/               Landings de campanas
    api/                 Endpoints de formularios y blog leads
    layout.tsx           Layout raiz y GA
    sitemap.ts           Sitemap dinamico
    robots.ts            Robots metadata
  components/
    blog/                Componentes de blog
    forms/               Formularios y wrapper base
    layout/              Header, footer, breadcrumbs, container
    sections/            Bloques de paginas marketing
    seo/                 JSON-LD y helpers visuales SEO
    tracking/            GA4, links trackeados y WhatsApp
    ui/                  Componentes base
  content/
    blog/                Posts MDX locales
    comercioExterior.ts  Data de hubs educativos
    lp.ts                Data de landings de Ads
    services.ts          Data de servicios
  lib/
    blog/                Capa de agregacion MDX + Sanity
    email.ts             Envio de correos con Resend
    routes.ts            Rutas centralizadas
    schema.ts            Datos estructurados
    schemas.ts           Validaciones Zod
    seo.ts               Metadata SEO reutilizable
    whatsapp.ts          Mensajes y URLs prellenadas
docs/                    Documentacion estrategica y operativa
.wordpress/              Exportaciones de WordPress para migracion
```

## Arquitectura de rutas

### Sitio principal

Las rutas del sitio viven en `src/app/(site)`:

- `/`
- `/quienes-somos`
- `/servicios`
- `/servicios/[slug]`
- `/comercio-exterior/*`
- `/contacto`
- `/blog`
- `/blog/[slug]`

### Landings de Ads

Las rutas de campanas viven en `src/app/(ads)`:

- `/lp/[slug]`
- `/oferta/primera-importacion`

Estas paginas se generan desde `src/content/lp.ts` y usan metadata `noindex`.

### APIs

- `src/app/api/forms/route.ts`: recibe formularios oficiales del sitio, valida con Zod y envia correos.
- `src/app/api/blog-lead/route.ts`: captura leads del blog. Hoy registra el lead y deja pendiente la integracion con CRM/email.

## Modulos importantes

### Blog

El blog mezcla dos fuentes:

- MDX local: `src/content/blog/*.mdx`
- Sanity: `src/lib/blog/sanity.ts`

La agregacion unificada vive en `src/lib/blog/index.ts`, donde se combinan, ordenan y deduplican los posts.

### Formularios

Los tres formularios oficiales viven en `src/components/forms/`:

- `DiagnosticoForm`
- `PrecotizacionForm`
- `ContactoForm`

La validacion del request se hace en `src/lib/schemas.ts`.

### Tracking y WhatsApp

- `src/components/tracking/GoogleAnalytics.tsx` inyecta GA4 si hay `NEXT_PUBLIC_GA_ID`.
- `src/components/tracking/ga4.ts` centraliza nombres de eventos.
- `src/lib/whatsapp.ts` define numero, mensajes prellenados y mapeo por servicio.

### SEO tecnico

- `src/app/sitemap.ts` genera sitemap incluyendo posts del blog
- `src/app/robots.ts` define robots
- `src/lib/seo.ts` centraliza metadata
- `src/lib/schema.ts` y `src/components/seo/` generan JSON-LD
- `next.config.ts` contiene redirects, especialmente de migracion desde WordPress

## Flujo de contenido

### Agregar un post del blog

1. Crear un archivo `.mdx` en `src/content/blog/`
2. Completar frontmatter consistente con `src/lib/blog/types.ts`
3. Verificar que aparezca en `/blog`
4. Si aplica, revisar enlaces internos y CTA del articulo

### Agregar o editar una landing de Ads

1. Editar `src/content/lp.ts`
2. Confirmar que el `slug` exista en `src/app/(ads)/lp/[slug]/page.tsx`
3. Verificar formulario y CTA correctos

### Agregar o editar un servicio

1. Editar `src/content/services.ts`
2. Crear o actualizar la ruta correspondiente en `src/app/(site)/servicios/`
3. Revisar enlazado desde home, hub de servicios y CTA relacionados

## Documentacion interna recomendada

Documentos de alto valor ya existentes:

- [`docs/01-Vision.md`](./docs/01-Vision.md)
- [`docs/02-ARCHITECTURE.md`](./docs/02-ARCHITECTURE.md)
- [`docs/05-FORMS.md`](./docs/05-FORMS.md)
- [`docs/07-SEO_RULES.md`](./docs/07-SEO_RULES.md)
- [`docs/09-MEASUREMENT_ADS.md`](./docs/09-MEASUREMENT_ADS.md)
- [`docs/11-MAINTENANCE.md`](./docs/11-MAINTENANCE.md)
- [`docs/12-TECHNICAL_GUIDE.md`](./docs/12-TECHNICAL_GUIDE.md)

## Estado actual y riesgos conocidos

- No hay tests automatizados ni configuracion de e2e visible.
- La API de `blog-lead` aun no integra CRM ni envio real.
- `src/lib/schema.ts` mantiene datos SEO incompletos para direccion y perfiles sociales.
- El repositorio conserva redirects y activos de migracion desde WordPress.
- Parte de la documentacion estrategica fue escrita antes de la incorporacion del blog dentro de este mismo repo; conviene leerla como principio rector, no como reflejo exacto del estado tecnico actual.
