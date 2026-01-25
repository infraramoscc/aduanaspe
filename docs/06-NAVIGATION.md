# NAVIGATION.md
## Reglas de navegación y enlaces internos – aduanaspe.com

---

## 0. Propósito del documento

Este documento define las **reglas oficiales de navegación**
del dominio raíz **aduanaspe.com**, incluyendo:

- Menú principal
- Jerarquía de páginas
- Enlaces internos permitidos
- Enlaces hacia subdominios externos

Su objetivo es garantizar:
- Claridad para el usuario
- Flujo de conversión coherente
- Mantenibilidad a largo plazo

Cualquier navegación que rompa estas reglas se considera
**error de arquitectura**.

---

## 1. Principio rector de navegación

> **La navegación debe acompañar el embudo,
> no distraerlo ni romperlo.**

El usuario siempre debe saber:
- dónde está
- qué puede hacer después
- por qué ese siguiente paso tiene sentido

---

## 2. Menú principal (global)

### 2.1 Estructura obligatoria

El menú principal del dominio raíz debe contener **solo**:

Home
Quiénes somos
Servicios
Comercio Exterior
Contacto


---

### 2.2 Reglas del menú principal

- ✔ Visible en todas las páginas
- ✔ Orden lógico (de general a específico)
- ❌ No incluir:
  - Sub-landings
  - Páginas internas profundas
  - Enlaces a subdominios externos

El menú **no es un mapa completo del sitio**, es una guía de alto nivel.

---

## 3. Navegación dentro de Comercio Exterior

### 3.1 Jerarquía interna

/comercio-exterior
→ /importacion
→ sub-landings
→ /exportacion
→ sub-landings
→ /regimenes-aduaneros
→ sub-landings


---

### 3.2 Reglas internas

- ✔ Mostrar breadcrumbs
- ✔ Enlaces entre páginas relacionadas
- ✔ CTA claros hacia Servicios
- ❌ No enlazar a Contacto en primer nivel
- ❌ No enlazar directamente a WhatsApp como CTA principal

---

## 4. Navegación dentro de Servicios

### 4.1 Jerarquía interna

/servicios
→ /agenciamiento-aduanas
→ /agencia-de-carga-internacional
→ /transporte-de-carga
→ /resguardo-aduanero
→ /consultoria-aduanera


---

### 4.2 Reglas internas

- ✔ Enlaces cruzados solo si hay relación clara
- ✔ CTA visibles a Contacto y WhatsApp
- ❌ No enlazar a páginas educativas profundas
- ❌ No volver a explicar conceptos básicos

---

## 5. Navegación hacia Contacto

### 5.1 Acceso permitido

Contacto puede ser accesible desde:
- Menú principal
- Footer
- CTA fuerte en Servicios
- CTA puntual en Comercio Exterior (solo casos claros)

---

### 5.2 Reglas

- ✔ Acceso sencillo
- ✔ No esconder el contacto
- ❌ No usar Contacto como “escape” prematuro
- ❌ No usar Contacto como CTA principal en Comercio Exterior

---

## 6. Footer (navegación secundaria)

### 6.1 Contenido permitido

- Enlaces institucionales
- Acceso rápido a Servicios
- Enlace a Contacto
- Enlaces a subdominios externos

Ejemplo:

Servicios
Comercio Exterior
Contacto
Blog (externo)
Tools (externo)


---

### 6.2 Reglas del footer

- ✔ Puede enlazar a subdominios externos
- ✔ Puede ser más completo que el menú
- ❌ No duplicar navegación compleja
- ❌ No sobrecargar con enlaces innecesarios

---

## 7. Enlaces hacia subdominios (externos)

### 7.1 Subdominios permitidos

- `blog.aduanaspe.com`
- `tools.aduanaspe.com`
- `wa.aduanaspe.com`

---

### 7.2 Reglas de enlace

- Blog:
  - Enlazado desde footer o CTA contextual
  - No prioritario en el menú principal
- Tools:
  - Enlace contextual desde Comercio Exterior
- WhatsApp:
  - Desde Servicios y Contacto
  - Uso moderado desde Comercio Exterior

---

## 8. Reglas de enlaces internos (muy importantes)

1. No crear loops innecesarios
2. No enlazar todo con todo
3. Cada enlace debe tener un propósito claro
4. El usuario no debe “retroceder” de etapa sin motivo

Ejemplo incorrecto:
- Servicios → Comercio Exterior → Servicios → Home

---

## 9. Breadcrumbs y contexto

- Obligatorios en Comercio Exterior
- Recomendados en Servicios
- No necesarios en Home ni Contacto

Ejemplo:
Inicio > Comercio Exterior > Importación > Importar desde China


---

## 10. Criterios de revisión de navegación

Antes de aprobar una página:
- [ ] ¿El usuario sabe dónde está?
- [ ] ¿El siguiente paso es lógico?
- [ ] ¿No se rompe el embudo?
- [ ] ¿No se sobrecarga el menú?

Si alguna respuesta es “no”, la navegación debe corregirse.

---

## 11. Regla final

> **Una buena navegación no muestra todo,
> muestra solo lo necesario en el momento correcto.**

---
