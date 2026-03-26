# Blog Index Filterable Design

**Fecha:** 2026-03-26

## Objetivo

Mejorar `/blog` para que funcione mejor como indice filtrable orientado a escaneo rapido.

## Prioridad UX

1. Escaneo rapido
2. Filtros claros por categoria
3. Coherencia visual con el nuevo estilo editorial del articulo

## Problema Actual

- El hero del blog ocupa demasiado para una vista cuyo objetivo principal es encontrar articulos.
- Los filtros funcionan, pero todavia se sienten como una fila de chips, no como un sistema de exploracion.
- Las cards estan bien resueltas, pero no optimizan tanto el escaneo por categoria, metadata y tema.

## Enfoque Aprobado

Direccion visual: **panel editorial filtrable**.

- Hero mas corto y funcional.
- Barra de filtros mas visible, con mejor estado activo y recuentos mas legibles.
- Cards orientadas a encontrar rapido que leer.
- Mantener SEO y estructura actual sin convertir el blog en un directorio frio.

## Cambios de Diseño

### 1. Hero del indice

- Reducir altura y ruido visual.
- Mostrar el blog como espacio explorable, no como landing.
- Mantener resumen de volumen y cobertura.

### 2. Sistema de filtros

- Separar claramente etiqueta de exploracion y rail de categorias.
- Reforzar la categoria activa.
- Hacer mas facil limpiar el filtro.

### 3. Listado de resultados

- Mejorar la lectura rapida de metadata.
- Dar mas jerarquia al articulo destacado sin volverlo demasiado pesado.
- Hacer que las cards normales se lean por bloques: categoria, fecha, titulo, descripcion corta, tags.

## Alcance

- `src/app/(site)/blog/page.tsx`
- `src/components/blog/PostCard.tsx`
- componente auxiliar para rail de filtros si conviene

## Fuera de Alcance

- Cambio del sistema de busqueda
- Filtros adicionales por autor, fecha o topic
- Paginacion avanzada o infinite scroll
