# SEO_RULES.md
## Reglas SEO internas – Dominio raíz aduanaspe.com

---

## 0. Propósito del documento

Este documento define las **reglas SEO oficiales** del dominio raíz
**aduanaspe.com**, con el objetivo de:

- Proteger la autoridad del sitio
- Evitar canibalización
- Separar claramente:
  - Landings evergreen (SEO)
  - Landings de ADS (NO SEO)

Cualquier página que no respete estas reglas se considera
**error de estrategia SEO**.

---

## 1. Principio rector SEO

> **Una intención de búsqueda = una sola página evergreen.**

El dominio raíz no compite consigo mismo ni con el blog.

---

## 2. Tipos de páginas según SEO

En `aduanaspe.com` existen **dos tipos de páginas desde el punto de vista SEO**:

### 2.1 Páginas SEO (indexables)
- Landings educativas evergreen (Comercio Exterior)
- Landings de Servicios (branding + intención comercial)

### 2.2 Páginas NO SEO (no indexables)
- Landings para campañas de ADS
- Páginas temporales
- Variantes de copy para conversión

---

## 3. Páginas SEO (indexables)

### 3.1 Qué páginas se indexan

#### Comercio Exterior
/comercio-exterior/*

- Educativas
- Evergreen
- Reciben autoridad del blog
- Pilar semántico

#### Servicios
/servicios/*

- Intención comercial
- Branding
- Conversión orgánica secundaria

---

### 3.2 Reglas obligatorias para páginas SEO

- ✔ Una sola URL por concepto
- ✔ Contenido estable y actualizable
- ✔ Enlaces internos coherentes
- ✔ Títulos y H1 claros
- ❌ No duplicar contenido del blog
- ❌ No crear variantes innecesarias

---

## 4. Landings de ADS (NO SEO)

### 4.1 Definición

Landings creadas **exclusivamente para campañas pagadas**, cuyo objetivo es:

- Maximizar conversión
- Testear copy
- Atacar una intención puntual

No buscan posicionar orgánicamente.

---

### 4.2 Dónde viven (convención obligatoria)

Las landings de ADS deben vivir bajo una convención clara:

/lp/*

Ejemplos:
- `/lp/importar-desde-china`
- `/lp/agenciamiento-aduanas-empresas`
- `/lp/fiscalizacion-aduanera-urgente`

---

### 4.3 Reglas técnicas obligatorias (ADS)

Toda landing bajo `/lp/` debe tener:

- `noindex, nofollow`
- ❌ No enlazar desde menú
- ❌ No enlazar desde páginas SEO
- ❌ No enlazar desde el footer
- ❌ No recibir enlaces internos

Estas páginas **no forman parte del ecosistema SEO**.

---

### 4.4 Relación ADS ↔ SEO

- ADS puede apuntar a:
  - `/lp/*`
  - `/servicios/*`
- ADS **NO debe apuntar** a:
  - `/comercio-exterior/*` (salvo campañas informativas muy específicas)

---

## 5. Regla de canibalización (crítica)

Está prohibido:

- Crear varias páginas para la misma intención
- Duplicar una landing evergreen en versión ADS indexable
- Competir entre:
  - `/comercio-exterior/importar-desde-china`
  - `/lp/importar-desde-china`

Solución correcta:
- Evergreen SEO → `/comercio-exterior/importar-desde-china`
- ADS → `/lp/importar-desde-china` (noindex)

---

## 6. Relación dominio raíz ↔ blog (SEO)

- El blog:
  - Ataca keywords informativas largas
  - Enlaza a Comercio Exterior
- El dominio raíz:
  - No replica artículos
  - No compite por long-tail informativa
  - Absorbe autoridad vía enlaces

Regla:
> **El blog posiciona, el root consolida y convierte.**

---

## 7. Indexación y rastreo (control)

### 7.1 Deben indexarse
- `/`
- `/quienes-somos`
- `/comercio-exterior/*`
- `/servicios/*`
- `/contacto`

### 7.2 Deben NO indexarse
- `/lp/*`
- Páginas de test
- Páginas duplicadas
- Páginas temporales

---

## 8. Enlaces internos y SEO

- Comercio Exterior:
  - Enlaza a Servicios
  - No enlaza a `/lp/*`
- Servicios:
  - Enlaza a Contacto y WhatsApp
  - No enlaza a `/lp/*`
- `/lp/*`:
  - No enlaza a páginas SEO

---

## 9. Criterios de revisión SEO

Antes de aprobar una página nueva:
- [ ] ¿Existe ya una página para esta intención?
- [ ] ¿Debe ser evergreen o ADS?
- [ ] ¿Está en la ruta correcta?
- [ ] ¿Tiene la indexación correcta?
- [ ] ¿No compite con otra página?

Si alguna respuesta es “no”, la página **no debe publicarse**.

---

## 10. Regla final

> **El SEO se protege diciendo más veces “no”
> que creando nuevas páginas.**

---
