# REVIEW_ARTIFACT.md
## Artefacto de revisión y aprobación – Dominio raíz aduanaspe.com

---

## 0. Propósito del artefacto

Este documento sirve para **revisar, validar y aprobar** que la
implementación del dominio raíz **aduanaspe.com** cumple con:

- La visión del proyecto
- La arquitectura definida
- Las reglas de SEO, navegación y medición
- El uso correcto de formularios y WhatsApp
- La separación entre SEO y ADS

Este artefacto **no diseña ni desarrolla**: **audita**.

---

## 1. Resultado de la revisión

**Estado final (marcar uno):**
- [ ] APROBADO
- [ ] APROBADO CON OBSERVACIONES
- [ ] RECHAZADO

**Fecha de revisión:** ____ / ____ / ______  
**Revisor:** ______________________________

---

## 2. Control de alcance (root-only)

- [ ] Solo se desarrolla `https://aduanaspe.com`
- [ ] No se implementan subdominios:
  - [ ] blog.aduanaspe.com
  - [ ] tools.aduanaspe.com
  - [ ] wa.aduanaspe.com (solo enlaces)
- [ ] El root recibe tráfico educado y convierte

❌ Si se desarrolla lógica de subdominios, **RECHAZADO**.

---

## 3. Flujo rector validado

Flujo obligatorio:
BLOG → COMERCIO EXTERIOR → SERVICIOS → CONTACTO


- [ ] Comercio Exterior filtra y orienta
- [ ] Servicios convierten
- [ ] Contacto cierra
- [ ] No hay saltos incoherentes de etapa

---

## 4. Arquitectura del sitio

### Menú principal
- [ ] Home
- [ ] Quiénes somos
- [ ] Servicios
- [ ] Comercio Exterior
- [ ] Contacto

❌ No hay enlaces a sub-landings ni `/lp/*` en el menú.

---

### Comercio Exterior
- [ ] Vive en `/comercio-exterior/*`
- [ ] Páginas evergreen
- [ ] Contenido educativo estructurado
- [ ] CTA hacia Servicios / Contacto (moderado)
- [ ] No venta agresiva

---

### Servicios
- [ ] Vive en `/servicios/*`
- [ ] Páginas persistentes
- [ ] Copy comercial
- [ ] CTA fuerte a Contacto / WhatsApp

---

### Contacto
- [ ] Vive en `/contacto`
- [ ] Formulario corto
- [ ] WhatsApp visible
- [ ] Sin contenido educativo

---

## 5. Landings y SEO

### Páginas SEO (indexables)
- [ ] `/`
- [ ] `/quienes-somos`
- [ ] `/comercio-exterior/*`
- [ ] `/servicios/*`
- [ ] `/contacto`

---

### Landings ADS
- [ ] Viven en `/lp/*`
- [ ] Tienen `noindex, nofollow`
- [ ] No están en menú ni footer
- [ ] No reciben enlaces internos
- [ ] No duplican páginas SEO

❌ Si una landing ADS es indexable, **RECHAZADO**.

---

## 6. Formularios

### Diagnóstico (Comercio Exterior)
- [ ] Máx. 3–4 campos
- [ ] No pide datos comerciales extensos
- [ ] Orienta, no cierra

---

### Pre-cotización (Servicios)
- [ ] 5–7 campos
- [ ] Califica al lead
- [ ] Prepara contacto humano

---

### Contacto (Cierre)
- [ ] 3–4 campos
- [ ] Sin fricción
- [ ] Canal directo

❌ No se usa el mismo formulario en todo el sitio.

---

## 7. WhatsApp (`wa.aduanaspe.com`)

- [ ] Todos los enlaces pasan por `wa.aduanaspe.com`
- [ ] Mensajes prellenados
- [ ] Uso moderado en Comercio Exterior
- [ ] Uso principal en Servicios y Contacto
- [ ] No es CTA principal del Home

---

## 8. Medición (GA4)

- [ ] GA4 implementado
- [ ] CTAs medibles
- [ ] Formularios emiten eventos
- [ ] WhatsApp emite evento antes de salir
- [ ] Convenciones de eventos respetadas

### Conversiones GA4
- [ ] submit_form_diagnostico
- [ ] submit_form_precotizacion
- [ ] submit_form_contacto
- [ ] click_whatsapp_final

---

## 9. Navegación y experiencia

- [ ] Navegación clara
- [ ] Breadcrumbs en Comercio Exterior
- [ ] No loops innecesarios
- [ ] El usuario entiende el siguiente paso

---

## 10. Observaciones (si aplica)

____________________________________________________________________  
____________________________________________________________________  
____________________________________________________________________  

---

## 11. Decisión final

- [ ] Publicar
- [ ] Corregir observaciones y revisar nuevamente
- [ ] Replantear arquitectura

---

## 12. Declaración final

> Este dominio raíz se considera **apto para escalar**
> solo si respeta estrictamente la visión, arquitectura,
> medición y reglas definidas en los documentos del proyecto.

---
