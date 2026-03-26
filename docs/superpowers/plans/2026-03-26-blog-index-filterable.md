# Blog Index Filterable Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mejorar el indice del blog para que escanee mejor por categorias y resultados.

**Architecture:** Se mantiene la logica server actual del listado y filtros por query param, pero se reorganiza la presentacion del hero, el rail de categorias y las cards. Si hace falta, se agrega un componente presentacional para encapsular el rail filtrable.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS

---

### Task 1: Replantear el encabezado del indice

**Files:**
- Modify: `src/app/(site)/blog/page.tsx`

- [ ] Reducir el peso del hero.
- [ ] Mostrar el blog como indice explorable.
- [ ] Hacer mas clara la relacion entre volumen total y categoria activa.

### Task 2: Mejorar el sistema de filtros

**Files:**
- Create: `src/components/blog/BlogFilterBar.tsx`
- Modify: `src/components/blog/index.ts`
- Modify: `src/app/(site)/blog/page.tsx`

- [ ] Crear rail de categorias con mejor jerarquia visual.
- [ ] Mantener filtros en URL.
- [ ] Mejorar el estado activo y el CTA de limpiar filtro.

### Task 3: Ajustar las cards para escaneo

**Files:**
- Modify: `src/components/blog/PostCard.tsx`

- [ ] Mejorar el featured para lectura rapida.
- [ ] Hacer mas compactas y legibles las cards normales.
- [ ] Exponer mejor metadata y tags.

### Task 4: Verificacion

**Files:**
- Review: `src/app/(site)/blog/page.tsx`
- Review: `src/components/blog/PostCard.tsx`
- Review: `src/components/blog/BlogFilterBar.tsx`

- [ ] Ejecutar `npm.cmd run build`.
- [ ] Verificar que filtros, paginacion y cards rendericen correctamente.
