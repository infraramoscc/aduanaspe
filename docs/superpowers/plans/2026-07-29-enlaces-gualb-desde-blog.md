# Gualb Blog Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Añadir tres enlaces editoriales contextuales desde artículos de AduanasPE hacia la portada de Gualb.

**Architecture:** Los cambios viven únicamente en contenido MDX y sus metadatos. Una prueba de contenido basada en `node:test` fija los tres artículos, anchors, destino y fecha de actualización para evitar enlaces duplicados o regresiones.

**Tech Stack:** MDX, Node.js `node:test`, npm, Next.js.

---

## File map

- Create: `scripts/seo/gualb-links.test.mjs` — valida destino, anchor, cantidad y `updatedAt` de los tres artículos.
- Modify: `src/content/blog/importar-vs-comprar-al-por-mayor-peru.mdx` — integra la referencia principal dentro de la comparación mayorista.
- Modify: `src/content/blog/como-importar-por-primera-vez-en-peru.mdx` — presenta la compra mayorista como etapa de validación previa.
- Modify: `src/content/blog/importar-mercaderia-campana-navidena-peru.mdx` — incorpora la alternativa local para reducir riesgo estacional.

### Task 1: Crear una prueba de regresión para los enlaces

**Files:**

- Create: `scripts/seo/gualb-links.test.mjs`

- [ ] **Step 1: Escribir la prueba que inicialmente falla**

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const cases = [
    {
        file: 'src/content/blog/importar-vs-comprar-al-por-mayor-peru.mdx',
        anchor: 'importadora mayorista',
    },
    {
        file: 'src/content/blog/como-importar-por-primera-vez-en-peru.mdx',
        anchor: 'productos importados al por mayor',
    },
    {
        file: 'src/content/blog/importar-mercaderia-campana-navidena-peru.mdx',
        anchor: 'alternativas de compra mayorista',
    },
];

for (const { file, anchor } of cases) {
    test(`${file} links contextually to the Gualb homepage`, async () => {
        const content = await readFile(file, 'utf8');
        const homepageLinks = content.match(/\]\(https:\/\/gualb\.com\/\)/g) ?? [];

        assert.equal(homepageLinks.length, 1);
        assert.match(content, new RegExp(`\\[${anchor}\\]\\(https://gualb\\.com/\\)`));
        assert.match(content, /updatedAt: "2026-07-29"/);
    });
}
```

- [ ] **Step 2: Ejecutar la prueba para confirmar el fallo**

Run: `node --test scripts/seo/gualb-links.test.mjs`

Expected: `3` pruebas fallan porque todavía no existen enlaces a la portada con esos anchors.

- [ ] **Step 3: Confirmar que el resto de pruebas SEO conserva su estado**

Run: `npm run seo:test`

Expected: las pruebas existentes pasan; únicamente las tres pruebas nuevas fallan.

### Task 2: Añadir los tres enlaces contextuales

**Files:**

- Modify: `src/content/blog/importar-vs-comprar-al-por-mayor-peru.mdx`
- Modify: `src/content/blog/como-importar-por-primera-vez-en-peru.mdx`
- Modify: `src/content/blog/importar-mercaderia-campana-navidena-peru.mdx`

- [ ] **Step 1: Actualizar la fecha editorial de los tres artículos**

Reemplazar el valor actual de `updatedAt` en cada archivo por:

```yaml
updatedAt: "2026-07-29"
```

- [ ] **Step 2: Integrar el enlace en la comparación mayorista**

Después del primer párrafo bajo `### 1. Todavía no conoces la demanda`, añadir:

```md
También puedes revisar el catálogo de una [importadora mayorista](https://gualb.com/) para comparar categorías y lotes disponibles antes de asumir el volumen y los plazos de una importación propia.
```

- [ ] **Step 3: Integrar el enlace en la guía de primera importación**

Después del párrafo introductorio y antes del primer `<InfoBox>`, añadir:

```md
Si todavía estás validando qué productos tienen salida, comparar [productos importados al por mayor](https://gualb.com/) disponibles en Perú puede ayudarte a probar la demanda antes de comprometer capital en una operación internacional propia.
```

- [ ] **Step 4: Integrar el enlace en el artículo de campaña navideña**

Después del párrafo introductorio y antes de “La pregunta correcta no es solo”, añadir:

```md
Cuando el calendario ya es ajustado o la demanda todavía no está comprobada, revisar [alternativas de compra mayorista](https://gualb.com/) con inventario en Perú puede reducir la exposición a retrasos y exceso de stock.
```

- [ ] **Step 5: Ejecutar la prueba específica**

Run: `node --test scripts/seo/gualb-links.test.mjs`

Expected: `3` pruebas pasan.

- [ ] **Step 6: Revisar todas las referencias a Gualb**

Run: `rg -n "https://gualb\\.com/" src/content/blog`

Expected: aparecen los tres enlaces nuevos a la portada y el enlace existente a `/productos/sublimacion-al-por-mayor/`.

### Task 3: Verificar el contenido y el proyecto

**Files:**

- Test: `scripts/seo/gualb-links.test.mjs`
- Verify: los tres archivos MDX modificados.

- [ ] **Step 1: Ejecutar toda la suite SEO**

Run: `npm run seo:test`

Expected: todas las pruebas pasan sin fallos.

- [ ] **Step 2: Ejecutar lint**

Run: `npm run lint`

Expected: salida exitosa sin errores nuevos.

- [ ] **Step 3: Compilar el sitio**

Run: `npm run build`

Expected: Next.js compila correctamente y genera las rutas de los artículos sin errores MDX.

- [ ] **Step 4: Revisar diferencias y whitespace**

Run: `git diff --check`

Expected: no hay errores de espacios ni conflictos.

Run: `git diff -- scripts/seo/gualb-links.test.mjs src/content/blog/importar-vs-comprar-al-por-mayor-peru.mdx src/content/blog/como-importar-por-primera-vez-en-peru.mdx src/content/blog/importar-mercaderia-campana-navidena-peru.mdx`

Expected: solo aparecen la prueba, las tres fechas y los tres párrafos editoriales aprobados.

- [ ] **Step 5: Crear el commit de implementación**

```bash
git add scripts/seo/gualb-links.test.mjs \
  src/content/blog/importar-vs-comprar-al-por-mayor-peru.mdx \
  src/content/blog/como-importar-por-primera-vez-en-peru.mdx \
  src/content/blog/importar-mercaderia-campana-navidena-peru.mdx
git commit -m "Add contextual links to Gualb wholesale"
```
