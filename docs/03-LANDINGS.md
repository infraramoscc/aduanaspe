# LANDINGS.md
## Tipos de landing pages – Dominio raíz aduanaspe.com

---

## 0. Propósito del documento

Este documento define **qué tipos de landing pages pueden existir**
en el dominio raíz **aduanaspe.com**, cuál es su **rol**, su **persistencia**
y **cuándo deben o no crearse**.

Cualquier landing creada fuera de estas reglas se considera
**error de arquitectura**.

---

## 1. Clasificación oficial de landings en el dominio raíz

En `aduanaspe.com` **solo existen dos tipos de landing pages válidas**:

1. **Landing Educativa Evergreen**  
2. **Landing de Servicio (Conversión Comercial)**  

❌ No se crean landings de campaña en el dominio raíz.

---

## 2. Landing Educativa Evergreen  
### (Comercio Exterior)

### 2.1 Definición
Landing educativa, persistente en el tiempo, cuyo objetivo es:
- Educar de forma estructurada
- Filtrar la intención del usuario
- Preparar la conversión hacia Servicios

Es el **destino natural del tráfico del blog**.

---

### 2.2 Dónde vive
/comercio-exterior/*


Ejemplos válidos:
- `/comercio-exterior/importar-desde-china`
- `/comercio-exterior/importa-puerta-a-puerta`
- `/comercio-exterior/courier-vs-carga`
- `/comercio-exterior/documentos-importacion`

---

### 2.3 Características obligatorias
- ✔ Evergreen (no caduca)
- ✔ Recibe tráfico del blog
- ✔ Contenido educativo estructurado
- ✔ Lenguaje claro, no promocional
- ✔ CTA orientativo (no agresivo)

---

### 2.4 Qué SÍ debe contener
- Qué es / cómo funciona
- Cuándo aplica y cuándo no
- Escenarios comunes
- Errores frecuentes
- Qué sigue después (orientación)

---

### 2.5 Qué NO debe contener
- ❌ Precios
- ❌ Promesas comerciales
- ❌ Copy de venta dura
- ❌ Formularios comerciales largos

---

### 2.6 CTA permitido
- “Ver el servicio adecuado”
- “Evaluar mi caso”
- “Hablar con un especialista” (lead tibio)
- Enlace a:
  - Servicios
  - Contacto (en casos claros)
  - WhatsApp externo (uso moderado)

---

## 3. Landing de Servicio  
### (Conversión Comercial)

### 3.1 Definición
Landing comercial cuyo objetivo es:
- Explicar el servicio
- Reducir objeciones
- Convertir leads tibios o calientes

---

### 3.2 Dónde vive
/servicios/*

Ejemplos válidos:
- `/servicios/agenciamiento-aduanas`
- `/servicios/agencia-de-carga-internacional`
- `/servicios/transporte-de-carga`
- `/servicios/resguardo-aduanero`
- `/servicios/consultoria-aduanera`

---

### 3.3 Características obligatorias
- ✔ Persistente
- ✔ Orientada a decisión
- ✔ Copy comercial claro
- ✔ CTA fuerte

---

### 3.4 Qué SÍ debe contener
- Qué incluye el servicio
- Cómo se trabaja
- Alcance y responsabilidades
- Casos típicos
- Pruebas de confianza

---

### 3.5 Qué NO debe contener
- ❌ Educación básica (eso es Comercio Exterior)
- ❌ Contenido tipo artículo
- ❌ Explicaciones genéricas extensas

---

### 3.6 CTA permitido
- “Solicitar cotización”
- “Hablar con un especialista”
- “Evaluar mi caso ahora”
- Enlace a:
  - `/contacto`
  - `wa.aduanaspe.com` (externo)

---

## 4. Landings PROHIBIDAS en el dominio raíz

Las siguientes **NO deben crearse en `aduanaspe.com`**:

### 4.1 Landings de campaña
Ejemplos prohibidos:
- `/importar-china-2026`
- `/promo-importacion`
- `/lp-aduanas`

👉 Si se requieren, deben vivir fuera del root o marcarse como `noindex`.

---

### 4.2 Landings híbridas (educación + venta)
Ejemplos incorrectos:
- Página que explica “qué es importar” y vende servicio al mismo tiempo
- Página que parece blog pero con CTA agresivo

👉 Esto rompe el embudo y baja la conversión.

---

## 5. Regla de persistencia (crítica)

- ✔ Si una landing recibe tráfico del blog → **debe ser evergreen**
- ✔ Las landings evergreen **se actualizan**, no se eliminan
- ❌ No crear múltiples landings para el mismo concepto

Ejemplo:
- ✔ Una sola landing:  
  `/comercio-exterior/importar-desde-china`
- ❌ Varias:
  - `/importar-china`
  - `/importar-china-peru`
  - `/china-importacion`

---

## 6. Relación landing ↔ intención del lead

| Tipo de lead | Landing destino |
|-------------|----------------|
Frío | Comercio Exterior (educativa) |
Tibio | Comercio Exterior → Servicios |
Caliente | Servicios |

---

## 7. Regla final (obligatoria)

> **Si no puedes responder claramente:  
> “¿Esta landing educa o vende?”  
> entonces esa landing no debe crearse.**

---

## 8. Criterio de aprobación

Una landing está bien creada si:
- Tiene un solo rol claro
- Vive en la ruta correcta
- Tiene CTAs coherentes con su etapa
- No compite con otra landing existente
- Respeta el flujo:

Comercio Exterior → Servicios → Contacto

---
