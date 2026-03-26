# Blog Editorial Clean Design

**Fecha:** 2026-03-26

## Objetivo

Mejorar la experiencia de lectura del blog priorizando:

1. Menos fricción visual
2. Mejor navegación en artículos largos
3. Mejor adaptación móvil sin convertir esto en un rediseño global del sitio

## Problema Actual

- La página de artículo tiene demasiados contenedores y bloques antes de entrar a leer.
- El índice lateral es útil en desktop, pero se siente estático y llega tarde en móvil.
- El formulario inline y algunos CTAs compiten visualmente con la lectura.
- Falta una acción simple de compartir mediante copia de enlace.
- El layout general cumple, pero todavía está más cerca de una página de marketing que de una pieza editorial limpia.

## Enfoque Aprobado

Dirección visual: **editorial limpio**.

- El contenido manda.
- Menos bordes y cajas alrededor del texto.
- Header más abierto y menos pesado.
- Navegación lateral más útil, con estado activo.
- CTA y formulario más suaves para no romper el flujo.
- Móvil optimizado con intervenciones ligeras, no con una reconstrucción completa.

## Cambios de Diseño

### 1. Estructura editorial del artículo

- Convertir el header del artículo en una cabecera más aireada.
- Quitar el bloque superior de "Contexto del artículo" del flujo principal.
- Reducir la sensación de tarjeta cerrada alrededor del arranque del artículo.
- Mantener metadatos, autor y descripción, pero con jerarquía más limpia.

### 2. Navegación para artículos largos

- Reemplazar la tabla de contenidos estática por una versión con estado activo.
- Añadir una versión compacta del índice al inicio en móvil.
- Añadir acción de `Copiar enlace` en el bloque de compartir.
- Mantener navegación de retorno al blog solo donde aporte valor real.

### 3. CTA y formulario

- Bajar el peso visual del CTA inline.
- Mantener el formulario inline, pero con contenedor más calmado.
- Mejorar feedback de error para no depender de un mensaje genérico.

### 4. Accesibilidad y lectura

- Añadir skip link al contenido principal.
- Mantener foco visible consistente.
- Mejorar el uso semántico del contenido navegable.

## Alcance

Archivos objetivo:

- `src/app/(site)/layout.tsx`
- `src/app/(site)/blog/[slug]/page.tsx`
- `src/components/blog/InlineLeadForm.tsx`
- `src/components/blog/ServiceCTA.tsx`
- `src/components/blog/RelatedServices.tsx`
- `src/components/blog/index.ts`
- Nuevos componentes auxiliares para TOC/acciones si hace falta

## Fuera de Alcance

- Rediseño completo del índice del blog
- Cambio global de branding del sitio
- Reestructuración del contenido MDX existente
