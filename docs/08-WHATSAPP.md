# WHATSAPP.md
## Uso de WhatsApp externo – wa.aduanaspe.com
### Dominio raíz: aduanaspe.com

---

## 0. Propósito del documento

Este documento define **cómo, cuándo y desde dónde**
se puede utilizar WhatsApp (`wa.aduanaspe.com`)
dentro del ecosistema del dominio raíz **aduanaspe.com**.

WhatsApp es un **canal asistido de contacto**, no un embudo alterno.

---

## 1. Principio rector

> **WhatsApp se usa cuando el usuario ya tiene contexto.  
> No se usa para educar ni filtrar desde cero.**

El sitio web **debe poder convertir sin depender de WhatsApp**.

---

## 2. Rol de WhatsApp en el ecosistema

**WhatsApp cumple tres funciones:**
1. Canal rápido para leads calientes
2. Alternativa asistida para leads tibios
3. Soporte de cierre cuando el usuario lo prefiere

No cumple funciones de:
- Atracción
- Educación
- Clasificación primaria

---

## 3. Dónde SÍ se puede usar WhatsApp

### 3.1 Páginas de Servicios
**Ruta:**
/servicios/*

**Motivo:**
- El usuario ya entiende el problema
- Está evaluando contratar
- Tiene intención comercial

**Uso permitido:**
- Botón visible “Hablar por WhatsApp”
- Enlace externo a `wa.aduanaspe.com/*`

---

### 3.2 Página Contacto
**Ruta:**
/contacto

**Motivo:**
- Etapa final del embudo
- Usuario listo para contacto humano

**Uso permitido:**
- WhatsApp como canal principal o alternativo
- Visible junto al formulario

---

### 3.3 Comercio Exterior (uso moderado)
**Ruta:**

/comercio-exterior/*

**Motivo:**
- Lead tibio
- Usuario con dudas específicas

**Uso permitido:**
- Como **CTA secundario**
- Nunca como CTA principal

Ejemplo de copy:
- “Si tienes un caso específico, puedes consultarnos”

---

## 4. Dónde NO se debe usar WhatsApp

Está prohibido usar WhatsApp como CTA principal en:

- ❌ Home
- ❌ Quiénes somos
- ❌ Primer scroll de Comercio Exterior
- ❌ Navegación principal
- ❌ Footer como llamada dominante

WhatsApp **no debe reemplazar la lectura ni la orientación**.

---

## 5. Convención de uso de `wa.aduanaspe.com`

### 5.1 Uso obligatorio de router

No se debe enlazar directamente a `wa.me`.

Todos los enlaces deben pasar por:
https://wa.aduanaspe.com/{ruta}

---

### 5.2 Rutas permitidas (ejemplo)

/aduanas
/carga
/transporte
/resguardo
/asesoria
/general


Cada ruta:
- Prellena un mensaje distinto
- Identifica el servicio o contexto
- Permite tracking básico

---

## 6. Mensajes prellenados (regla)

Todo enlace a WhatsApp debe:
- Incluir mensaje prellenado
- Pedir información mínima
- No ser genérico

Ejemplo correcto:
> “Hola, quiero información sobre agenciamiento de aduanas.  
> Operación: importación / exportación.  
> Mercancía: __.  
> Origen: __.”

Ejemplo incorrecto:
> “Hola, quiero información.”

---

## 7. Relación WhatsApp ↔ Formularios

- WhatsApp **no reemplaza** a los formularios
- Ambos conviven según etapa:

| Página | Formulario | WhatsApp |
|------|-----------|----------|
Comercio Exterior | Diagnóstico | Secundario |
Servicios | Pre-cotización | Principal |
Contacto | Contacto | Principal |

---

## 8. Reglas técnicas mínimas (fase actual)

En la fase actual:
- ✔ Sin WhatsApp Business API
- ✔ Sin bots
- ✔ Sin automatización compleja
- ✔ Redirección simple + mensaje prellenado

La automatización solo se evalúa cuando:
- El volumen de leads lo justifique
- El embudo esté validado

---

## 9. Criterios de revisión

Antes de colocar un botón de WhatsApp:
- [ ] ¿El usuario ya tiene contexto suficiente?
- [ ] ¿No rompe el embudo?
- [ ] ¿Existe un formulario equivalente?
- [ ] ¿El mensaje está prellenado y orientado?

Si alguna respuesta es “no”, **no se debe usar WhatsApp**.

---

## 10. Regla final

> **WhatsApp acelera una decisión,  
> pero nunca debe reemplazarla.**

---
