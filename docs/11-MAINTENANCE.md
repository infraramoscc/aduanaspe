# MAINTENANCE.md
## Gobernanza, mantenimiento y crecimiento controlado
### Dominio raíz: aduanaspe.com

---

## 0. Propósito del documento

Este documento define **cómo se mantiene, actualiza y escala**
el dominio raíz **aduanaspe.com** sin romper:

- la arquitectura
- el embudo
- el SEO
- la medición
- la coherencia estratégica

Este documento entra en acción **después del lanzamiento**.

---

## 1. Principio rector de mantenimiento

> **El crecimiento sin reglas destruye la conversión.**

No todo lo que “parece buena idea” debe convertirse en una página.

---

## 2. Tipos de cambios permitidos

En el dominio raíz solo existen **cuatro tipos de cambios válidos**:

1. Actualización de contenido existente  
2. Mejora de conversión (copy / CTA)  
3. Creación de nueva landing (caso justificado)  
4. Ajustes de medición (GA4)

Cualquier cambio fuera de estos tipos debe evaluarse con cuidado.

---

## 3. Actualización de contenido (preferido)

### 3.1 Regla principal
Si un tema ya existe:
- ✔ se **actualiza**
- ❌ no se duplica

Ejemplo correcto:
- Actualizar `/comercio-exterior/importar-desde-china`

Ejemplo incorrecto:
- Crear:
  - `/importar-china`
  - `/importacion-china-peru`

---

### 3.2 Cuándo actualizar
- Cambios normativos
- Nuevos procedimientos SUNAT
- Ajustes de copy por claridad
- Mejoras UX

---

## 4. Creación de nuevas páginas (caso excepcional)

### 4.1 Preguntas obligatorias (checklist)
Antes de crear una nueva página:

- [ ] ¿Existe ya una página que cubra esta intención?
- [ ] ¿Es una intención distinta, no un matiz?
- [ ] ¿Tiene sentido dentro del embudo?
- [ ] ¿Será persistente en el tiempo?
- [ ] ¿Tiene un rol claro (educar o vender)?

Si alguna respuesta es “no” → **NO se crea la página**.

---

### 4.2 Dónde pueden crearse nuevas páginas

- Comercio Exterior → solo si aparece una **nueva categoría real**
- Servicios → solo si se ofrece un **nuevo servicio real**
- ADS → solo bajo `/lp/*` y con `noindex`

---

## 5. Gestión de landings ADS

### 5.1 Naturaleza temporal
Las landings ADS:
- No son patrimonio del sitio
- Se pueden pausar o eliminar
- No transfieren autoridad SEO

---

### 5.2 Limpieza periódica
Cada cierto tiempo:
- Revisar `/lp/*`
- Eliminar las que ya no se usan
- Consolidar aprendizajes en copy (no en páginas SEO)

---

## 6. Mantenimiento de formularios

- No agregar campos sin justificación
- Revisar tasas de conversión
- Simplificar antes de complejizar
- Formularios ≠ encuestas

Regla:
> **Si un campo no se usa, se elimina.**

---

## 7. Mantenimiento de WhatsApp

- Revisar mensajes prellenados
- Ajustar rutas según servicios activos
- No convertir WhatsApp en sustituto del sitio
- No automatizar sin volumen suficiente

---

## 8. Mantenimiento de GA4

### 8.1 Reglas
- No cambiar nombres de eventos sin motivo
- No duplicar eventos similares
- Revisar conversiones activas
- Mantener consistencia histórica

---

### 8.2 Auditoría mínima recomendada
Cada cierto tiempo revisar:
- Eventos activos
- Conversiones configuradas
- Fuentes de tráfico
- Páginas con mayor abandono

---

## 9. Control de crecimiento del menú

- El menú principal **no crece**
- Nuevas páginas no entran al menú por defecto
- El menú representa el modelo mental del negocio, no el sitemap

---

## 10. Onboarding de nuevas personas o IA

Cualquier persona o IA que intervenga debe:

1. Leer `VISION.md`
2. Leer `ARCHITECTURE.md`
3. Respetar `REVIEW_ARTIFACT.md`
4. Usar este `MAINTENANCE.md` como límite

---

## 11. Señales de alerta (red flags)

Detener y revisar si ocurre alguno:

- Muchas páginas nuevas sin tráfico
- CTAs inconsistentes
- Formularios largos sin conversión
- WhatsApp como único canal
- Páginas que no sabes explicar para qué existen

---

## 12. Regla final

> **Un sitio bien gobernado crece lento,
> pero convierte siempre.**

---
