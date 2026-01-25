# PROMPT BOOTSTRAP – NEXT.JS BASE ESCALABLE + UI BONITA (TAILWIND)
## Proyecto: aduanaspe.com (FASE 1 – BASE + DISEÑO)

Eres un **arquitecto y desarrollador senior en Next.js (App Router + TypeScript)**.
Tu objetivo es **crear la base técnica y visual** del dominio raíz
**https://aduanaspe.com**, preparada para:

- Escalar en contenido sin refactor
- Reutilizar componentes
- Medición futura (GA4-ready)
- Separar SEO vs ADS
- Mantener orden a largo plazo
- UI **bonita, limpia y profesional** usando **TailwindCSS**

⚠️ IMPORTANTE (FASE 1):
- NO implementar contenido final (solo placeholders)
- NO inventar servicios nuevos
- NO optimizar copy ni SEO profundo
- NO automatizar procesos complejos (CRM, bots, etc.)
- Sí dejar todo listo para "rellenar contenido" luego

---

## 1) ALCANCE DE ESTA FASE

Debes entregar:
- Estructura de carpetas y rutas
- Layout global (header/footer)
- Navegación y breadcrumbs
- Componentes reutilizables (UI + secciones)
- Plantillas de páginas por tipo
- SEO técnico mínimo (metadata + robots)
- Hooks de tracking listos (GA4-ready, sin configuración real)

NO debes entregar:
- Textos definitivos
- Copy de ventas o educativo real
- Integraciones externas complejas

---

## 2) ARQUITECTURA OBLIGATORIA (CARPETAS)

Implementa **exactamente** esta estructura:

```txt
src/
  app/
    (site)/
      layout.tsx
      page.tsx
      quienes-somos/page.tsx
      servicios/
        page.tsx
        agenciamiento-aduanas/page.tsx
        agencia-de-carga-internacional/page.tsx
        transporte-de-carga/page.tsx
        resguardo-aduanero/page.tsx
        consultoria-aduanera/page.tsx
      comercio-exterior/
        page.tsx
        importacion/page.tsx
        exportacion/page.tsx
        regimenes-aduaneros/page.tsx
        documentos-aduaneros/page.tsx
        importacion/
          importar-desde-china/page.tsx
          importa-puerta-a-puerta/page.tsx
          courier-vs-carga/page.tsx
      contacto/page.tsx

    (ads)/
      lp/
        [slug]/page.tsx
        [slug]/layout.tsx   # layout opcional sin menú (para conversión)

  components/
    layout/
      Header.tsx
      Footer.tsx
      Container.tsx
      Breadcrumbs.tsx
    ui/
      Button.tsx
      Card.tsx
      Input.tsx
      Select.tsx
      Textarea.tsx
      Badge.tsx
    sections/
      Hero.tsx
      HubCards.tsx
      CTASection.tsx
      TrustBar.tsx
      SplitFeature.tsx
    forms/
      FormBase.tsx
      DiagnosticoForm.tsx
      PrecotizacionForm.tsx
      ContactoForm.tsx
    tracking/
      ga4.ts
      CTAButton.tsx
      TrackedLink.tsx
      WhatsAppLink.tsx

  content/
    services.ts
    comercioExterior.ts
    lp.ts

  lib/
    routes.ts
    seo.ts
    utils.ts
```

## 3) REGLAS DURAS (NO NEGOCIABLES)

### 3.1 Páginas = composición de secciones

Cada page.tsx debe ser corto y componer secciones.

NO duplicar HTML largo.

### 3.2 Menú principal (global)

Debe contener SOLO:

Home | Quiénes somos | Servicios | Comercio Exterior | Contacto
No sub-landings

No /lp/*

### 3.3 ADS aislado

Todas las landings ADS viven en /lp/*

Deben tener noindex, nofollow

Layout ADS opcional sin menú (más enfocado a conversión)

## 4) UI "BONITA" CON TAILWIND (ESTÁNDAR VISUAL)

Diseño profesional B2B, minimalista, con:

Contenedores centrados, buen espaciado (max-w-6xl, px-4, py-12)

Tarjetas con bordes suaves, sombras ligeras (rounded-2xl, shadow-sm, border)

Tipografía clara y jerarquía (text-3xl, text-xl, text-sm)

Botones consistentes (primary/secondary/ghost)

Microinteracciones suaves (hover, transition, focus-visible)

Estados accesibles (focus ring, contraste correcto)

⚠️ No uses librerías UI extra salvo que sea necesario.
Construye componentes simples con Tailwind.

## 5) COMPONENTES REUTILIZABLES (OBLIGATORIOS)

### 5.1 UI base (Tailwind)

Button, Card, Input, Select, Textarea, Badge

### 5.2 Secciones (para armar páginas)

Hero (título + subtítulo + 1 CTA placeholder)

HubCards (grid de cards desde content/*.ts)

TrustBar (3–5 puntos de confianza placeholder)

SplitFeature (bloque 2 columnas: texto + visual placeholder)

CTASection (bloque final de conversión placeholder)

### 5.3 Tracking wrappers (GA4-ready)

TrackedLink

CTAButton

WhatsAppLink (siempre https://wa.aduanaspe.com/{ruta})

## 6) FORMULARIOS (3 TIPOS, CON PLACEHOLDERS)

Implementa con UI bonita (Card + spacing) y validación mínima.

Diagnóstico (Comercio Exterior): 3–4 campos máx.

Pre-cotización (Servicios): 5–7 campos

Contacto: 3–4 campos

Todos deben:

Usar FormBase para estados loading/success/error

Disparar evento GA4 en submit (ver sección 7)

La acción de envío puede ser mock o endpoint simple.
Lo importante: base lista.

## 7) GA4-READY (SIN CONFIG REAL AÚN)

Crea tracking/ga4.ts con:

trackEvent(name, params?)

Disparar desde componentes:

click_cta_to_servicios

click_cta_to_contacto

click_whatsapp_{servicio}

submit_form_diagnostico

submit_form_precotizacion

submit_form_contacto

⚠️ No configurar GA4 real en esta fase, solo dejar el sistema listo.

## 8) SEO TÉCNICO MÍNIMO (FASE 1)

Metadata básica por página (title/description placeholders)

Canonical placeholder

/lp/* debe usar:

noindex, nofollow en metadata (robots)

## 9) CONTENIDO DECLARATIVO (CONFIG-DRIVEN)

Crear content/services.ts y content/comercioExterior.ts para renderizar hubs.

Ejemplo de campos:

title, slug, summary, ctaLabel, ctaHref, icon (opcional)

Las páginas deben consumir estos arrays para no hardcodear listados.

## 10) PÁGINAS A ENTREGAR (MVP)

Home: Hero + TrustBar + HubCards(Servicios) + HubCards(Comercio) + CTASection

Quiénes somos: Hero + SplitFeature + TrustBar + CTASection

Servicios hub: Hero + HubCards(Servicios) + CTASection

Servicio detalle (x5): Hero + SplitFeature + PrecotizacionForm + CTASection

Comercio Exterior hub: Hero + HubCards(Categorías) + CTASection

Comercio Exterior categoría: Hero + HubCards(Sub-landings) + DiagnosticoForm

Contacto: Hero + ContactoForm + WhatsAppLink

ADS landing template /lp/[slug]: Hero + 1 bloque + CTA + (form o WhatsApp) sin menú

Todo con placeholders.

## 11) CRITERIO DE ÉXITO

Corre sin errores

UI limpia y consistente (Tailwind)

Reutilización real (secciones y config-driven)

/lp/* aislado y noindex

Todos los CTAs y forms tienen hooks de tracking listos

Agregar una nueva landing luego sea solo:

sumar un entry en content/ + crear page con plantilla

## 12) FORMA DE ENTREGA

Entrega en la respuesta:

Árbol final de carpetas

Componentes clave (resumen)

Ejemplo de una página armada con secciones

Dónde se agregará contenido luego (qué archivos tocar)

## REGLA FINAL

Construye la base como si el contenido fuese a cambiar 100 veces.
La arquitectura y los componentes no deben romperse.
