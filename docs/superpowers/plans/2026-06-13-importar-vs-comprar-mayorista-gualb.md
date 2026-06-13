# Importar vs comprar al por mayor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar en AduanasPE un articulo comparativo que ayude a decidir entre importar directamente y comprar a un mayorista local, mencionando a Gualb una sola vez como ejemplo de productos de sublimacion al por mayor.

**Architecture:** El contenido se implementara como un archivo MDX dentro del sistema de blog existente. Se reutilizaran los componentes editoriales disponibles (`InfoBox`, `Callout`, `StepProcess`, `FaqGroup` y `ServiceCTA`) y se validaran metadatos, enlaces y compilacion con las herramientas actuales del repositorio.

**Tech Stack:** Next.js 16, React 19, TypeScript, MDX, ESLint.

---

### Task 1: Crear el articulo MDX

**Files:**
- Create: `src/content/blog/importar-vs-comprar-al-por-mayor-peru.mdx`

- [ ] **Step 1: Confirmar las rutas internas**

Run:

```powershell
$routes = @(
  'src/content/blog/como-importar-por-primera-vez-en-peru.mdx',
  'src/content/blog/como-calcular-costos-de-importacion-en-peru.mdx',
  'src/content/blog/importar-de-china-a-peru.mdx',
  'src/content/blog/como-saber-si-tu-producto-necesita-permisos-para-importar-en-peru.mdx'
)
$routes | ForEach-Object { "$($_): $(Test-Path $_)" }
rg -n 'slug: "consultoria-aduanera"|consultoria-aduanera' src/content src/app
```

Expected: Los cuatro archivos devuelven `True` y existe la ruta `/servicios/consultoria-aduanera/`.

- [ ] **Step 2: Crear el contenido**

Crear `src/content/blog/importar-vs-comprar-al-por-mayor-peru.mdx` con:

- frontmatter completo;
- respuesta directa al inicio;
- tabla comparativa;
- criterios para comprar localmente;
- criterios para importar;
- una sola mencion enlazada a Gualb;
- metodo de decision en cinco pasos;
- errores frecuentes;
- enlaces internos;
- FAQ;
- CTA de consultoria.

- [ ] **Step 3: Validar restricciones editoriales**

Run:

```powershell
rg -n -i 'gualb|cliente|socio|mejor proveedor|recomendado por aduanaspe' src/content/blog/importar-vs-comprar-al-por-mayor-peru.mdx
```

Expected: Una sola linea de contenido contiene el enlace a Gualb; no hay afirmaciones de cliente, socio, superioridad o recomendacion.

- [ ] **Step 4: Revisar el diff**

Run:

```powershell
git diff --check
git diff -- src/content/blog/importar-vs-comprar-al-por-mayor-peru.mdx
```

Expected: `git diff --check` no muestra errores y el articulo coincide con la especificacion.

### Task 2: Verificar la integracion

**Files:**
- Verify: `src/content/blog/importar-vs-comprar-al-por-mayor-peru.mdx`

- [ ] **Step 1: Ejecutar ESLint**

Run:

```powershell
npm.cmd run lint
```

Expected: Exit code `0`.

- [ ] **Step 2: Ejecutar build**

Run:

```powershell
npm.cmd run build
```

Expected: Exit code `0` y la ruta del nuevo articulo se genera sin errores MDX.

- [ ] **Step 3: Revisar estado final**

Run:

```powershell
git status --short
git diff --stat
```

Expected: Solo aparecen el plan y el nuevo articulo como cambios pendientes.

- [ ] **Step 4: Registrar la implementacion**

```powershell
git add -- docs/superpowers/plans/2026-06-13-importar-vs-comprar-mayorista-gualb.md src/content/blog/importar-vs-comprar-al-por-mayor-peru.mdx
git commit -m "content: compare importing with local wholesale sourcing"
```
