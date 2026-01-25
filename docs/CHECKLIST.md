# Checklist de Desarrollo – aduanaspe.com

> Actualizado: 2026-01-04

---

## Fase 1: Base Técnica + Diseño ✅

### Inicialización
- [x] Proyecto Next.js 15 (App Router + TypeScript)
- [x] TailwindCSS 4 configurado
- [x] Estructura de carpetas según arquitectura
- [x] ESLint configurado

### Componentes UI Base
- [x] Button (primary/secondary/ghost + tamaños)
- [x] Card (Header, Content, Footer)
- [x] Input (con label y error)
- [x] Select (con opciones)
- [x] Textarea
- [x] Badge (5 variantes)

### Componentes Layout
- [x] Header (navegación desktop/mobile)
- [x] Footer (links, contacto, copyright)
- [x] Container (responsive)
- [x] Breadcrumbs (dinámicos)

### Componentes de Secciones
- [x] Hero (gradiente + CTAs)
- [x] HubCards (grid config-driven)
- [x] CTASection (bloque conversión)
- [x] TrustBar (puntos de confianza)
- [x] SplitFeature (2 columnas)

### Formularios
- [x] FormBase (loading/success/error)
- [x] DiagnosticoForm (comercio exterior)
- [x] PrecotizacionForm (servicios)
- [x] ContactoForm (general)

### Sistema Tracking (GA4-ready)
- [x] ga4.ts (trackEvent function)
- [x] CTAButton
- [x] TrackedLink
- [x] WhatsAppLink

### Contenido Declarativo
- [x] services.ts (5 servicios)
- [x] comercioExterior.ts (4 categorías + 3 sub-landings)
- [x] lp.ts (3 landings ADS)

### SEO Técnico
- [x] Metadata por página
- [x] robots.ts (bloquea /lp/*)
- [x] Canonical URLs

### Paleta de Colores
- [x] Paleta vibrante implementada (violet/fuchsia/cyan)
- [x] Gradientes modernos en Hero y CTA
- [x] Variables CSS personalizadas

---

## Fase 2: Contenido y Copy 🔲

### Páginas Principales
- [x] Home – copy final
- [x] Quiénes Somos – historia real, equipo, valores
- [x] Contacto – dirección, teléfonos, horarios reales

### Servicios (5 páginas) – Rol: Conversión Comercial
- [x] Agenciamiento de Aduanas – copy detallado
- [x] Agenciamiento de Carga – copy detallado
- [x] Transporte – copy detallado
  - [x] Hero (título, subtítulo, CTAs)
  - [x] Trust Bar (puntos de confianza)
  - [x] Secuencia de Servicios (3 etapas + integral)
  - [x] Qué hacemos por ti (descripción)
  - [x] Por qué elegirnos (4 tarjetas)
  - [x] Tipos de Unidades (furgones, camiones, etc.)
  - [x] Sección Resguardo (resumen + enlace)
  - [x] Cobertura (zonas)
  - [x] Qué incluye (8 items)
  - [x] Problemas que resuelve
  - [x] FAQ (preguntas frecuentes)
  - [x] Formulario + CTA final
- [x] Resguardo – copy detallado (página propia)
  - [x] Hero (título, subtítulo, CTAs)
  - [x] Trust Bar (puntos de confianza)
  - [x] Secuencia de Servicios (3 etapas + servicios opcionales + integral)
  - [x] Qué es el resguardo (descripción)
  - [x] Modalidades (Cabina y Vehículo)
  - [x] Por qué contratar resguardo (4 tarjetas)
  - [x] Cuándo necesitas resguardo (5 escenarios)
  - [x] Resguardo + Transporte (paquete integrado)
  - [x] FAQ (preguntas frecuentes)
  - [x] Formulario + CTA final
- [x] Consultoría Aduanera – copy detallado
  - [x] Hero (título, subtítulo, CTAs)
  - [x] Trust Bar (puntos de confianza)
  - [x] Secuencia de Servicios (3 etapas + servicios opcionales + integral)
  - [x] Qué hacemos por ti (descripción)
  - [x] Servicios de Consultoría (6 items)
  - [x] Por qué elegirnos (4 tarjetas)
  - [x] Para quién es (4 audiencias)
  - [x] Problemas que resuelve
  - [x] FAQ (preguntas frecuentes)
  - [x] Formulario + CTA final

### Comercio Exterior (4 categorías) – Rol: Conversión Estratégica
- [ ] Importación Hub – guía estructurada evergreen
- [ ] Exportación Hub – guía estructurada evergreen
- [ ] Regímenes Aduaneros Hub – explicaciones detalladas
- [ ] Documentos Aduaneros Hub – guías con ejemplos

### Sub-landings Importación (páginas evergreen)
- [ ] Importar desde China – guía paso a paso
- [ ] Importa Puerta a Puerta – descripción servicio
- [ ] Courier vs Carga – comparativa completa

---

## Fase 3: Assets Visuales 🔲

### Logo y Branding
- [ ] `logo.svg` – Logo principal AduanasPE (recomendado: vector SVG)
- [ ] `logo-white.svg` – Logo versión blanca para fondos oscuros
- [ ] `favicon.ico` – Favicon del sitio (32x32 y 16x16)

### Imágenes de Vehículos (Transporte)
> Ubicación: `/public/images/`
> Recomendado: 800x600px, formato WebP o PNG

- [ ] `furgon.png` – Furgón de carga (para cargas pequeñas/medianas)
- [ ] `camion.png` – Camión de carga grande
- [ ] `ala-gaviota.png` – Camión con puertas laterales tipo alas de gaviota
- [ ] `plataforma.png` – Plataforma para contenedores

### Imágenes Hero (Secciones Principales)
> Ubicación: `/public/images/hero/`
> Recomendado: 1920x1080px, formato WebP

- [ ] `hero-home.webp` – Puerto/contenedores/importación (Home)
- [ ] `hero-servicios.webp` – Operación logística general
- [ ] `hero-agenciamiento-aduanas.webp` – Documentos/trámites aduaneros
- [ ] `hero-agencia-carga.webp` – Barco/puerto/contenedores
- [ ] `hero-transporte.webp` – Camión en carretera/entrega
- [ ] `hero-resguardo.webp` – Seguridad/custodia de carga
- [ ] `hero-consultoria.webp` – Asesoría/reunión de negocios

### Imágenes para SplitFeature (Secciones de contenido)
> Ubicación: `/public/images/features/`
> Recomendado: 800x600px, formato WebP

- [ ] `que-hacemos.webp` – Equipo trabajando/logística
- [ ] `por-que-elegirnos.webp` – Profesionalismo/confianza
- [ ] `proceso-importacion.webp` – Flujo de importación visual
- [ ] `proceso-exportacion.webp` – Flujo de exportación visual
- [ ] `clasificacion-arancelaria.webp` – Documentos/códigos
- [ ] `tratados-comerciales.webp` – Mapa Perú + países TLC

### Imágenes Quiénes Somos
> Ubicación: `/public/images/equipo/`
> Recomendado: 400x400px para personas, 1200x800px para oficina

- [ ] `oficina.webp` – Foto de oficinas/instalaciones
- [ ] `equipo.webp` – Foto grupal del equipo (opcional)
- [ ] `ceo.webp` – Foto del gerente/director (opcional)

### Iconos Personalizados (Opcional)
> Si prefieres iconos custom en vez de emojis

- [ ] Set de iconos para servicios (agenciamiento, carga, transporte, resguardo, consultoría)
- [ ] Set de iconos para beneficios (experiencia, seguridad, rapidez, etc.)

### Optimización
- [ ] Convertir imágenes a WebP
- [ ] Implementar next/image en todos los componentes
- [ ] Lazy loading configurado

---

## Fase 4: Integraciones 🔲

### 4.1 Formularios – Backend

#### 4.1.1 API Route para formularios
- [x] Crear `/app/api/forms/route.ts`
- [x] Definir tipos para cada formulario (Diagnóstico, Precotización, Contacto)
- [x] Validación con Zod en server-side
- [x] Manejo de errores y respuestas HTTP

#### 4.1.2 Envío de emails
- [x] Configurar proveedor de email (Resend, SendGrid, o Nodemailer)
- [x] Crear template de email para notificación interna
- [x] Crear template de email de confirmación al usuario
- [ ] Testear envío de emails (requiere API key de Resend)

#### 4.1.3 Conectar formularios al backend
- [x] Actualizar `DiagnosticoForm` para usar API
- [x] Actualizar `PrecotizacionForm` para usar API
- [x] Actualizar `ContactoForm` para usar API
- [x] Implementar estados loading/success/error en UI

---

### 4.2 Google Analytics 4

#### 4.2.1 Configuración inicial
- [x] Crear propiedad GA4 en Google Analytics
- [x] Obtener Measurement ID (G-F5B56K03D8)
- [x] Crear variable de entorno `NEXT_PUBLIC_GA_ID`

#### 4.2.2 Implementación en Next.js
- [x] Instalar gtag script en `layout.tsx`
- [x] Crear componente `GoogleAnalytics.tsx`
- [x] Verificar que se registran page views

#### 4.2.3 Eventos personalizados (ya implementados en componentes)
- [x] Eventos de página: tracking automático con gtag
- [x] Eventos de CTA:
  - [x] `click_cta_to_servicios`
  - [x] `click_cta_to_contacto`
- [x] Eventos de formulario:
  - [x] `submit_form_diagnostico`
  - [x] `submit_form_precotizacion`
  - [x] `submit_form_contacto`
- [x] Eventos de WhatsApp:
  - [x] `click_whatsapp_{servicio}`

#### 4.2.4 Conversiones
- [ ] Marcar `submit_form_*` como conversiones en GA4 (configurar en panel GA4)
- [ ] Marcar `click_whatsapp_*` como conversiones en GA4 (configurar en panel GA4)

---

### 4.3 WhatsApp Business

#### 4.3.1 Configuración básica
- [ ] Definir número de WhatsApp Business (actualizar en `src/lib/whatsapp.ts`)
- [x] Crear mensajes prellenados por servicio

#### 4.3.2 Mensajes por servicio
- [x] `aduanas` → Mensaje para Agenciamiento de Aduanas
- [x] `carga` → Mensaje para Agencia de Carga Internacional
- [x] `transporte` → Mensaje para Transporte de Carga
- [x] `resguardo` → Mensaje para Resguardo Aduanero
- [x] `consultoria` → Mensaje para Consultoría Aduanera
- [x] `general` → Mensaje general de contacto
- [x] `contacto` → Mensaje corto de contacto

#### 4.3.3 Integración con componentes
- [x] Actualizar `WhatsAppLink` con mensajes prellenados
- [x] Verificar tracking de eventos al hacer clic

#### 4.3.4 Router wa.aduanaspe.com (Opcional/Futuro)
- [ ] Configurar subdominio en DNS
- [ ] Crear redirecciones por ruta

---

## Fase 5: SEO Avanzado 🔲

### Optimización On-Page
- [x] Titles y descriptions (configurados en layouts con template)
- [x] Heading structure (H1-H6) - implementado en cada página
- [ ] Alt text en imágenes (pendiente cuando se agreguen imágenes)
- [x] Schema.org markup (LocalBusiness) - `StructuredData.tsx`

### Técnico
- [x] Sitemap.xml dinámico - `sitemap.ts`
- [x] Verificar robots.txt final - configurado con noindex para /lp/
- [x] Configurar dominio en Cloudflare DNS
- [x] Configurar Cloudflare Worker para blog proxy
- [x] Configurar Google Search Console:
  - [x] Agregar propiedad `aduanaspe.com` (dominio principal)
  - [x] Verificar propiedad con DNS TXT en Cloudflare
  - [x] Enviar sitemap principal: `https://aduanaspe.com/sitemap.xml`
  - [x] Enviar sitemap del blog: `https://aduanaspe.com/blog/sitemap_index.xml`
  - [ ] Verificar cobertura de indexación (esperar 2-3 días)
  - [ ] Configurar usuarios con acceso (email equipo)
- [ ] Performance audit (Core Web Vitals)

### Reglas SEO (según 07-SEO_RULES.md)
- [x] Páginas SEO correctamente indexables
- [x] /lp/* con noindex, nofollow (en robots.txt)
- [x] No canibalización entre páginas (estructura clara)

---

## Fase 6: Validación Arquitectura (según DOCS) ✅

### Flujo del Embudo (según 01-VISION.md)
- [x] Blog → Comercio Exterior → Servicios → Contacto
- [x] No saltos incoherentes de etapa

### Navegación (según 06-NAVIGATION.md)
- [x] Menú: Home, Quiénes Somos, Servicios, Comercio Exterior, Contacto
- [x] Breadcrumbs en todas las páginas
- [x] No enlaces a /lp/* desde menú ni footer

### Formularios por Etapa (según 05-FORMS.md)
- [x] Diagnóstico solo en Comercio Exterior (3-4 campos)
- [x] Pre-cotización solo en Servicios (5-7 campos)
- [x] Contacto solo en /contacto (3-4 campos)

### WhatsApp por Etapa (según 08-WHATSAPP.md)
- [x] WhatsAppLink con mensajes prellenados
- [x] Tracking de eventos GA4 al hacer clic
- [x] Footer usa WhatsAppLink correctamente

---

## Fase 7: Testing y QA 🔲

### Build y Compilación
- [x] Build de producción sin errores (`npm run build`)
- [x] TypeScript sin errores
- [x] 26 páginas generadas correctamente

### Funcional (Pendiente testing manual en producción)
- [ ] Test navegación completa
- [ ] Test formularios (submit, validación)
- [ ] Test responsive (mobile, tablet, desktop)
- [ ] Test links externos

### Cross-browser (Pendiente testing manual)
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Accesibilidad (Pendiente testing manual)
- [ ] Contraste de colores
- [ ] Navegación por teclado
- [ ] Screen reader compatible
- [ ] Focus states visibles

---

## Fase 8: Deployment 🔲

### Preparación
- [x] Variables de entorno producción (Vercel)
- [x] Configurar dominio aduanaspe.com (Cloudflare + Vercel)
- [x] Certificado SSL (Cloudflare + Vercel automático)
- [x] CDN configurado (Cloudflare)

### Deploy
- [x] Build de producción sin errores
- [x] Deploy a Vercel
- [x] Verificar todas las rutas
- [x] Configurar redirects (25 redirecciones + blog proxy)

### Post-deploy
- [ ] Verificar analytics funcionando
- [ ] Test formularios en producción
- [ ] Verificar velocidad de carga
- [ ] Monitoreo de errores configurado

---

## Fase 9: Landings ADS (según 07-SEO_RULES.md) 🔲

### Estructura
- [ ] Todas en /lp/*
- [ ] noindex, nofollow obligatorio
- [ ] No enlazadas desde menú ni footer
- [ ] No reciben enlaces internos

### Campañas (cuando se requieran)
- [ ] /lp/importar-desde-china
- [ ] /lp/agenciamiento-aduanas-empresas
- [ ] /lp/fiscalizacion-urgente

### Medición ADS
- [ ] `view_lp_ads`, `click_cta_lp`, `submit_form_lp`
- [ ] Tracking de conversiones separado
- [ ] Pixel de remarketing (si aplica)

---

## Fase 10: Revisión Final (según 10-REVIEW_ARTIFACT.md) 🔲

- [ ] Completar artefacto de revisión
- [ ] Validar cumplimiento de VISION.md
- [ ] Validar cumplimiento de ARCHITECTURE.md
- [ ] Aprobar para producción

---

## Leyenda

| Símbolo | Estado |
|---------|--------|
| ✅ | Fase completada |
| 🔲 | Fase pendiente |
| [x] | Tarea completada |
| [/] | En progreso |
| [ ] | Pendiente |
