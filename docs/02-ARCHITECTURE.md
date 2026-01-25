# ARCHITECTURE.md
## Arquitectura del dominio raíz – aduanaspe.com

---

## 0. Alcance del proyecto (root-only)

Este proyecto **desarrolla únicamente el dominio raíz**:

- ✅ Dominio incluido: **https://aduanaspe.com**
- ❌ Fuera de alcance (se desarrollan aparte):
  - blog.aduanaspe.com (Atracción / SEO)
  - tools.aduanaspe.com (Herramientas)
  - wa.aduanaspe.com (WhatsApp / Router)

El dominio raíz **recibe tráfico ya educado** y se enfoca en **conversión estratégica y comercial**.

---

## 1. Flujo rector del sistema

BLOG (externo)
↓
COMERCIO EXTERIOR
↓
SERVICIOS
↓
CONTACTO


Dentro de este repositorio se controla estrictamente:

COMERCIO EXTERIOR → SERVICIOS → CONTACTO


---

## 2. Estructura principal del sitio (menú)

/
├─ Home
├─ Quiénes somos
├─ Servicios
├─ Comercio Exterior
└─ Contacto


---

## 3. Componentes del dominio raíz

### 3.1 Home (`/`)
**Rol:** Hub principal  
**Función:** Distribuir tráfico y reforzar confianza

- Enlaces a Comercio Exterior, Servicios y Contacto
- Sin contenido tipo blog
- Sin cierre forzado

---

### 3.2 Quiénes somos (`/quienes-somos`)
**Rol:** Institucional  
**Función:** Confianza B2B

- Experiencia, metodología, respaldo
- No educación técnica
- No conversión directa

---

### 3.3 Comercio Exterior (`/comercio-exterior`)
**Rol:** 🟡 Conversión estratégica  
**Función:** Educar, filtrar y orientar  
**Principal receptor de CTAs del blog**

**Reglas**
- Páginas evergreen (persistentes)
- Contenido estructurado (no artículos)
- No venta agresiva
- CTA hacia Servicios / Contacto / WhatsApp (externo)

#### 3.3.1 Hubs (pilares)
/comercio-exterior
├─ /importacion
├─ /exportacion
├─ /regimenes-aduaneros
├─ /documentos-aduaneros
└─ /errores-frecuentes (opcional)


#### 3.3.2 Sub-landings educativas (ejemplos)
Importación:
/comercio-exterior/importacion
├─ /importar-desde-china
├─ /importa-puerta-a-puerta
├─ /courier-vs-carga
└─ /documentos-importacion


Exportación:
/comercio-exterior/exportacion
├─ /como-exportar
└─ /documentos-exportacion


Regímenes:
/comercio-exterior/regimenes-aduaneros
├─ /importacion-definitiva
├─ /temporal
└─ /courier


> Regla: URLs técnicas y estables; títulos (H1) amigables.

---

### 3.4 Servicios (`/servicios`)
**Rol:** 🟠 Conversión comercial  
**Función:** Convencer y convertir leads tibios/calientes

**Reglas**
- Páginas persistentes
- CTA fuerte
- No educación básica

#### 3.4.1 Hub
/servicios


#### 3.4.2 Landings por servicio
/servicios
├─ /agenciamiento-aduanas
├─ /agencia-de-carga-internacional
├─ /transporte-de-carga
├─ /resguardo-aduanero
└─ /consultoria-aduanera


> No crear sub-servicios sin evidencia de demanda.

---

### 3.5 Contacto (`/contacto`)
**Rol:** 🔴 Cierre  
**Función:** Contacto humano final

- Formulario corto
- Enlace a WhatsApp (externo)
- Sin contenido educativo

---

## 4. Conexión con subdominios (solo enlaces)

- `https://blog.aduanaspe.com` → Atracción
- `https://tools.aduanaspe.com` → Herramientas
- `https://wa.aduanaspe.com` → WhatsApp

**Reglas**
- Blog → enlaza a Comercio Exterior
- Comercio Exterior → enlaza a Servicios / Tools / WA (tibio)
- Servicios → enlaza a Contacto / WA (caliente)
- Contacto → cierre

---

## 5. Reglas de gobernanza

1. **Una página = un rol**
2. Si recibe CTA del blog → **evergreen**
3. Educación ≠ venta
4. Pocos hubs fuertes > muchas páginas sueltas
5. No mezclar campañas dentro de esta arquitectura

---

## 6. Criterios de aprobación

La arquitectura es correcta si:
- El blog dirige principalmente a Comercio Exterior
- Comercio Exterior filtra y orienta
- Servicios convierten
- Contacto cierra
- No hay solapamiento de funciones

---
