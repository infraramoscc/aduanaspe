# Blog Editorial Clean Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mejorar la lectura del blog con una página de artículo más editorial, menos fricción visual y mejor navegación en artículos largos.

**Architecture:** Se mantiene la arquitectura actual del blog en Next.js, pero se introduce una capa ligera de interacción cliente para la tabla de contenidos y las acciones de compartir. El resto del cambio se concentra en jerarquía visual, layout y accesibilidad de la página de artículo.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS

---

### Task 1: Base editorial y accesibilidad global

**Files:**
- Modify: `src/app/(site)/layout.tsx`
- Modify: `src/app/(site)/blog/[slug]/page.tsx`

- [ ] Añadir skip link al `main` del sitio.
- [ ] Dar un `id` estable al contenido principal del artículo.
- [ ] Simplificar la cabecera del artículo para bajar peso visual.

### Task 2: Navegación en artículos largos

**Files:**
- Create: `src/components/blog/ArticleToc.tsx`
- Modify: `src/components/blog/index.ts`
- Modify: `src/app/(site)/blog/[slug]/page.tsx`

- [ ] Crear TOC cliente con estado activo por sección.
- [ ] Renderizar TOC completo en sidebar desktop.
- [ ] Renderizar TOC compacto al inicio para móvil.

### Task 3: Acciones de compartir y orientación

**Files:**
- Create: `src/components/blog/ArticleShareActions.tsx`
- Modify: `src/components/blog/index.ts`
- Modify: `src/app/(site)/blog/[slug]/page.tsx`

- [ ] Añadir acción `Copiar enlace`.
- [ ] Mantener LinkedIn y WhatsApp, dejando X como opción secundaria.
- [ ] Mejorar la sección final de navegación del artículo.

### Task 4: CTA y formulario menos intrusivos

**Files:**
- Modify: `src/components/blog/InlineLeadForm.tsx`
- Modify: `src/components/blog/ServiceCTA.tsx`
- Modify: `src/components/blog/RelatedServices.tsx`

- [ ] Reducir densidad visual de bordes y contenedores.
- [ ] Mejorar feedback del formulario en estado de error.
- [ ] Mantener la intención comercial sin romper el flujo de lectura.

### Task 5: Verificación

**Files:**
- Review: `src/app/(site)/blog/[slug]/page.tsx`
- Review: `src/components/blog/*.tsx`

- [ ] Ejecutar `npm.cmd run build`.
- [ ] Confirmar que no se rompe el render del blog.
- [ ] Revisar el resultado contra las guías UI usadas en la auditoría.
