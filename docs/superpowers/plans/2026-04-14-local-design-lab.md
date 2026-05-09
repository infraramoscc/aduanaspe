# Local Design Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un laboratorio visual local, interactivo y fuera de Git para explorar decisiones de diseño y promover decisiones aprobadas a un archivo local.

**Architecture:** La implementación vive en archivos ignorados localmente por Git y se divide en tres capas: almacenamiento local de decisiones, ruta App Router para el laboratorio y shell cliente con categorías y previews. La UI reutiliza componentes `ui` reales del proyecto y aplica tokens candidatos mediante variables CSS locales para comparar `Current`, `Candidate` y `Applied Preview`.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4, Node fs/promises

---

### Task 1: Aislamiento local y base de decisiones

**Files:**
- Modify: `.git/info/exclude`
- Create: `src/lib/design-lab-local/types.ts`
- Create: `src/lib/design-lab-local/storage.ts`
- Create: `src/lib/design-lab-local/storage.test.ts`
- Create: `docs/design-lab/decisions.local.json`

- [ ] Añadir exclusiones locales para `src/app/__design-lab/`, `src/app/api/__design-lab/`, `src/components/design-lab-local/`, `src/lib/design-lab-local/` y `docs/design-lab/`.
- [ ] Escribir una prueba fallida para inicialización y persistencia del archivo `decisions.local.json`.
- [ ] Implementar tipos y helpers de lectura/escritura con creación segura del archivo.
- [ ] Verificar la prueba con `node src/lib/design-lab-local/storage.test.ts`.

### Task 2: Ruta local y carga de datos

**Files:**
- Create: `src/app/__design-lab/page.tsx`
- Create: `src/app/api/__design-lab/decisions/route.ts`
- Modify: `src/lib/design-lab-local/storage.ts`

- [ ] Crear la página `/__design-lab` fuera de `(site)` para evitar header/footer públicos.
- [ ] Cargar decisiones aprobadas y borradores desde almacenamiento local.
- [ ] Crear endpoint local para guardar decisiones promovidas desde la UI.
- [ ] Proteger el flujo para entorno local y devolver errores legibles si algo falla.

### Task 3: Shell interactivo y dirección visual

**Files:**
- Create: `src/components/design-lab-local/DesignLabShell.tsx`
- Create: `src/components/design-lab-local/designLabData.ts`
- Create: `src/components/design-lab-local/designLabTheme.ts`

- [ ] Construir un shell cliente con sidebar por categorías estilo workshop.
- [ ] Definir una dirección visual clara para el laboratorio, distinta del marketing actual pero compatible con la marca.
- [ ] Implementar los modos `Current`, `Candidate` y `Applied Preview`.
- [ ] Aplicar tokens candidatos mediante variables CSS locales sin tocar `globals.css`.

### Task 4: Categorías y previews reales

**Files:**
- Create: `src/components/design-lab-local/preview/ColorsPanel.tsx`
- Create: `src/components/design-lab-local/preview/TypographyPanel.tsx`
- Create: `src/components/design-lab-local/preview/ButtonsPanel.tsx`
- Create: `src/components/design-lab-local/preview/FormsPanel.tsx`
- Create: `src/components/design-lab-local/preview/CardsPanel.tsx`
- Create: `src/components/design-lab-local/preview/MotionPanel.tsx`

- [ ] Renderizar controles interactivos para `Colors & Tokens`.
- [ ] Renderizar combinaciones de tipografía y jerarquía textual.
- [ ] Reutilizar `Button`, `Input`, `Select`, `Textarea`, `Card` y `Badge` para previews reales.
- [ ] Añadir variantes experimentales y microanimaciones para comparar estilos.

### Task 5: Promoción de decisiones y feedback

**Files:**
- Modify: `src/components/design-lab-local/DesignLabShell.tsx`
- Modify: `src/app/api/__design-lab/decisions/route.ts`
- Modify: `src/lib/design-lab-local/types.ts`

- [ ] Permitir guardar decisiones como `draft` y promoverlas como `approved`.
- [ ] Persistir `category`, `target`, `value`, `status` y `updatedAt`.
- [ ] Mostrar feedback visible de guardado y último estado aplicado.
- [ ] Mantener la UI usable aunque el archivo local todavía no exista.

### Task 6: Verificación

**Files:**
- Review: `src/app/__design-lab/page.tsx`
- Review: `src/app/api/__design-lab/decisions/route.ts`
- Review: `src/components/design-lab-local/**/*.tsx`
- Review: `src/lib/design-lab-local/*`

- [ ] Ejecutar `node src/lib/design-lab-local/storage.test.ts`.
- [ ] Ejecutar `npm.cmd run lint`.
- [ ] Ejecutar `npm.cmd run build`.
- [ ] Revisar manualmente que `/__design-lab` cargue y que escribir una decisión actualice `docs/design-lab/decisions.local.json`.
