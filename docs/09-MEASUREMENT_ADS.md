# MEASUREMENT_ADS.md
## Medición (GA4) y reglas para ADS
### Dominio raíz: aduanaspe.com

---

## 0. Propósito del documento

Este documento define cómo se debe **medir el comportamiento del usuario**
en el dominio raíz **aduanaspe.com** usando **Google Analytics 4 (GA4)** y
cómo se deben **crear y usar landings para campañas de ADS** sin afectar
SEO ni arquitectura.

Este documento:
- NO define copy
- NO define campañas
- SÍ define reglas de medición y control

---

## 1. Principio rector de medición

> **Si no se puede medir, no se debe priorizar.**

La web debe diseñarse para:
- Medir intención
- Medir decisión
- Medir conversión

No solo visitas.

---

## 2. Filosofía GA4 del proyecto

GA4 se usa para responder preguntas de negocio, no métricas vanidosas.

### Preguntas clave que GA4 debe responder
- ¿Qué sección genera más intención?
- ¿Qué servicio interesa más?
- ¿Formulario o WhatsApp?
- ¿Orgánico o ADS?
- ¿Dónde se pierde el usuario?

---

## 3. Enfoque técnico: GA4-friendly by design

### 3.1 Componentes medibles (regla obligatoria)

Todos los siguientes elementos deben ser **componentes reutilizables**
y emitir eventos GA4:

- Botones CTA
- Formularios
- Enlaces a WhatsApp
- Enlaces hacia Contacto
- Landings de ADS

❌ No usar botones “sueltos” sin identificación.

---

### 3.2 Convención de nombres de eventos (obligatoria)

Todos los eventos deben seguir esta estructura:

accion_contexto_destino


Ejemplos:
- `click_cta_comercio_servicios`
- `click_cta_servicio_whatsapp`
- `submit_form_diagnostico`
- `submit_form_precotizacion`
- `submit_form_contacto`
- `view_lp_ads`
- `click_lp_ads_whatsapp`

---

## 4. Eventos GA4 mínimos obligatorios

### 4.1 Eventos de navegación
- `view_home`
- `view_comercio_exterior`
- `view_servicios`
- `view_servicio_{nombre}`
- `view_contacto`

---

### 4.2 Eventos de intención (muy importantes)
- `click_cta_to_servicios`
- `click_cta_to_contacto`
- `click_cta_whatsapp`

Estos eventos indican **interés real**, no solo lectura.

---

### 4.3 Eventos de conversión
- `submit_form_diagnostico`
- `submit_form_precotizacion`
- `submit_form_contacto`
- `click_whatsapp_final`

Estos eventos deben marcarse como **conversiones en GA4**.

---

## 5. Medición por sección (alineada al embudo)

### Comercio Exterior
- Objetivo: medir exploración e intención
- Eventos clave:
  - `view_comercio_exterior`
  - `click_cta_to_servicios`

---

### Servicios
- Objetivo: medir decisión
- Eventos clave:
  - `view_servicio_*`
  - `click_cta_whatsapp`
  - `submit_form_precotizacion`

---

### Contacto
- Objetivo: medir cierre
- Eventos clave:
  - `submit_form_contacto`
  - `click_whatsapp_final`

---

## 6. Medición de WhatsApp (`wa.aduanaspe.com`)

Aunque WhatsApp es externo:

- El clic **SIEMPRE se mide antes de salir**
- Todo enlace pasa por:
https://wa.aduanaspe.com/{ruta}


Evento obligatorio:
- `click_whatsapp_{servicio}`

Ejemplos:
- `click_whatsapp_aduanas`
- `click_whatsapp_asesoria`

---

## 7. Landings para ADS (NO SEO)

### 7.1 Rol de las landings ADS

Las landings ADS existen para:
- Conversión rápida
- Testeo de copy
- Mensajes específicos por campaña

No existen para SEO.

---

### 7.2 Convención obligatoria de URL

/lp/*

Ejemplos:
- `/lp/importar-desde-china`
- `/lp/agenciamiento-aduanas-empresas`
- `/lp/fiscalizacion-urgente`

---

### 7.3 Reglas técnicas obligatorias (ADS)

Toda landing ADS debe:
- Tener `noindex, nofollow`
- No aparecer en el menú
- No enlazarse desde páginas SEO
- No recibir enlaces internos
- Medir al menos:
  - `view_lp_ads`
  - `click_cta_lp`
  - `submit_form_lp` o `click_whatsapp_lp`

---

## 8. Relación GA4 ↔ ADS

GA4 debe permitir:
- Ver conversiones por:
  - Campaña
  - Servicio
  - Tipo de CTA
- Comparar:
  - Orgánico vs ADS
  - Servicios vs Comercio Exterior

Las conversiones de ADS deben mapearse a:
- `submit_form_*`
- `click_whatsapp_*`

---

## 9. Qué NO se mide (por diseño)

Para evitar ruido, **no es obligatorio medir**:
- Scroll profundo
- Tiempo exacto de lectura
- Micro-interacciones irrelevantes

Se prioriza **intención y conversión**.

---

## 10. Criterios de revisión de medición

Antes de aprobar una página o landing:
- [ ] ¿Tiene eventos GA4 claros?
- [ ] ¿Sus CTAs son medibles?
- [ ] ¿Sus eventos usan la convención correcta?
- [ ] ¿Las conversiones están definidas?
- [ ] ¿No rompe SEO ni arquitectura?

Si alguna respuesta es “no”, la página **no debe publicarse**.

---

## 11. Regla final

> **GA4 no es un agregado técnico,  
> es parte del diseño del negocio digital.**

---
