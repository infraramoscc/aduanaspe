# APC Perú Estados Unidos Rules of Origin Content Cluster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish four interconnected, source-backed articles about APC Perú-Estados Unidos rules of origin, add a field-by-field certificate tutorial, and update the existing general certificate article and editorial registries.

**Architecture:** Keep every search intent in its own MDX file: a conceptual hub, one operational guide for each trade direction, and one export-certificate tutorial. Reuse the existing `InfoBox`, `StepProcess`, `Step`, `FaqGroup`, and `ServiceCTA` MDX components; use a dedicated Node test to lock the cluster structure, source links, internal links, and form-field coverage.

**Tech Stack:** Next.js 16, React 19, MDX, Node test runner, CSV editorial registries, official MINCETUR and CBP sources.

---

## File map

**Create**

- `src/content/blog/reglas-origen-tlc-peru-estados-unidos.mdx` — conceptual hub and decision path.
- `src/content/blog/exportar-estados-unidos-tlc-reglas-origen.mdx` — operational guide for Peruvian exporters and U.S. importers.
- `src/content/blog/importar-estados-unidos-peru-tlc-certificado-origen.mdx` — operational guide for Peruvian importers buying U.S.-origin goods.
- `src/content/blog/llenar-certificado-origen-peru-estados-unidos.mdx` — field-by-field export certificate tutorial.
- `scripts/seo/apc-origin-cluster.test.mjs` — structural and editorial contract for all five cluster articles.
- `docs/docs_recursos/06-certificado-origen-exportacion-peru-eeuu-formato.doc` — stable repository copy of the supplied official reference form.

**Modify**

- `src/content/blog/certificado-origen-exportacion-peru.mdx` — retain broad intent while linking to the new APC-specific cluster.
- `docs/seo_content_map.csv` — register four new URLs and update the existing owner rule.
- `docs/docs_recursos/registro_fuentes_blog.csv` — record use of the MINCETUR manual and supporting certificate form.

**Do not modify**

- The original file under `C:/Users/Gualbert/Downloads/`.
- `src/lib/blog/types.ts`; existing categories and topics are sufficient.
- `src/components/blog/*`; existing MDX components cover the design.
- Graphify configuration; it is outside the approved scope.

### Task 1: Add the cluster contract test

**Files:**

- Create: `scripts/seo/apc-origin-cluster.test.mjs`

- [ ] **Step 1: Write a failing structural test**

Create the test with the exact article paths, titles, required headings, internal links, official-source links, form fields, and registry expectations:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(path, 'utf8');

const articles = [
  {
    file: 'src/content/blog/reglas-origen-tlc-peru-estados-unidos.mdx',
    title: 'Reglas de origen del TLC Perú-Estados Unidos: guía práctica',
    headings: [
      '## Origen, procedencia y país de compra no significan lo mismo',
      '## Los tres criterios de origen del APC',
      '## Cómo analizar el origen paso a paso',
      '## Casos prácticos de reglas de origen',
      '## Preguntas frecuentes',
    ],
  },
  {
    file: 'src/content/blog/exportar-estados-unidos-tlc-reglas-origen.mdx',
    title: 'Exportar a Estados Unidos con el TLC: reglas de origen y certificación',
    headings: [
      '## Qué debe confirmar el exportador antes de ofrecer la preferencia',
      '## Qué debe contener la certificación de origen',
      '## Documentos que debe conservar la empresa',
      '## Casos prácticos para exportadores peruanos',
      '## Preguntas frecuentes',
    ],
  },
  {
    file: 'src/content/blog/importar-estados-unidos-peru-tlc-certificado-origen.mdx',
    title: 'Importar de Estados Unidos a Perú con el TLC: origen y certificado',
    headings: [
      '## Comprar en Estados Unidos no demuestra origen estadounidense',
      '## Qué pedir al proveedor antes de pagar',
      '## Cómo revisar la certificación antes del despacho',
      '## Casos prácticos para importadores peruanos',
      '## Preguntas frecuentes',
    ],
  },
  {
    file: 'src/content/blog/llenar-certificado-origen-peru-estados-unidos.mdx',
    title: 'Cómo llenar el certificado de origen Perú-Estados Unidos',
    headings: [
      '## Antes de llenar el certificado',
      '## Cómo llenar los campos 1 al 11',
      '## Ejemplos de certificados según el criterio de origen',
      '## Errores frecuentes al completar el formato',
      '## Preguntas frecuentes',
    ],
  },
];

for (const article of articles) {
  test(`${article.file} follows the approved APC content contract`, async () => {
    const content = await read(article.file);
    assert.match(content, new RegExp(`title: "${article.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
    assert.match(content, /updatedAt: "2026-09-04"/);
    assert.match(content, /<FaqGroup/);
    assert.match(content, /<ServiceCTA topic="consultoria" \/>/);
    assert.match(content, /https:\/\/www\.acuerdoscomerciales\.gob\.pe\/En_Vigencia\/EEUU\/inicio\.html/);
    for (const heading of article.headings) assert.ok(content.includes(heading), `Missing ${heading}`);
  });
}

test('hub links to the three operational guides', async () => {
  const content = await read(articles[0].file);
  for (const slug of [
    'exportar-estados-unidos-tlc-reglas-origen',
    'importar-estados-unidos-peru-tlc-certificado-origen',
    'llenar-certificado-origen-peru-estados-unidos',
  ]) assert.match(content, new RegExp(`\\]\\(\\/blog\\/${slug}\\/\\)`));
});

test('certificate tutorial explains every numbered field and preference criterion', async () => {
  const content = await read(articles[3].file);
  for (let field = 1; field <= 11; field += 1) {
    assert.match(content, new RegExp(`### Campo ${field}(?:\\D|$)`));
  }
  for (const criterion of ['4.1(a)', '4.1(b)', '4.1(c)']) assert.ok(content.includes(criterion));
  assert.match(content, /máximo de 12 meses/i);
  assert.match(content, /código `PE`/);
  assert.match(content, /no existe un formato único obligatorio/i);
});

test('export guide cites CBP and covers substantiation', async () => {
  const content = await read(articles[1].file);
  assert.match(content, /https:\/\/www\.cbp\.gov\/trade\/free-trade-agreements\/peru/);
  for (const term of ['lista de materiales', 'valor de contenido regional', 'cinco años', 'control aduanero']) {
    assert.match(content, new RegExp(term, 'i'));
  }
});

test('general certificate article links to the APC hub and tutorial', async () => {
  const content = await read('src/content/blog/certificado-origen-exportacion-peru.mdx');
  assert.match(content, /updatedAt: "2026-09-04"/);
  assert.match(content, /\/blog\/reglas-origen-tlc-peru-estados-unidos\//);
  assert.match(content, /\/blog\/llenar-certificado-origen-peru-estados-unidos\//);
});

test('editorial registries contain every new slug and source', async () => {
  const seoMap = await read('docs/seo_content_map.csv');
  const sources = await read('docs/docs_recursos/registro_fuentes_blog.csv');
  for (const { file } of articles) {
    const slug = file.split('/').at(-1).replace('.mdx', '');
    assert.match(seoMap, new RegExp(`"${slug}"`));
    assert.match(sources, new RegExp(`"${slug}"`));
  }
  assert.match(sources, /05-manual-sobre-reglas-de-origen-del-apc-peru-ee-uu\.pdf/);
  assert.match(sources, /06-certificado-origen-exportacion-peru-eeuu-formato\.doc/);
});
```

- [ ] **Step 2: Run the test and confirm the expected failure**

Run:

```powershell
node --test scripts/seo/apc-origin-cluster.test.mjs
```

Expected: FAIL with `ENOENT` for `src/content/blog/reglas-origen-tlc-peru-estados-unidos.mdx`.

- [ ] **Step 3: Commit the test**

```powershell
git add scripts/seo/apc-origin-cluster.test.mjs
git commit -m "test: define APC origin content cluster"
```

### Task 2: Publish the conceptual hub

**Files:**

- Create: `src/content/blog/reglas-origen-tlc-peru-estados-unidos.mdx`

- [ ] **Step 1: Add exact frontmatter and the decision framework**

Use:

```mdx
---
title: "Reglas de origen del TLC Perú-Estados Unidos: guía práctica"
description: "Aprende cómo evaluar el origen de una mercancía bajo el TLC Perú-Estados Unidos: criterios, cambio arancelario, VCR, documentos y casos."
date: "2026-09-04"
updatedAt: "2026-09-04"
author: "AduanasPE"
category: "Comercio Exterior"
topic: "consultoria"
tags: ["reglas de origen TLC Perú Estados Unidos", "APC Perú Estados Unidos", "preferencia arancelaria", "valor de contenido regional", "certificado de origen"]
image: ""
imageAlt: ""
featured: false
---
```

Explain these exact decisions in plain language:

- Shipment from a country does not establish preferential origin.
- Only originating goods may receive the APC preference.
- `4.1(a)` covers wholly obtained or entirely produced goods.
- `4.1(b)` covers production with non-originating materials that satisfies the product-specific rule.
- `4.1(c)` requires every material used to be originating.
- Product and material classifications must be compared using the nomenclature required by the Agreement; examples using SA 2002 cannot be copied automatically into a current operation.
- A product-specific rule can require tariff shift, regional value content, a technical process, or a combination.
- De minimis, accumulation, sets, textiles, and short-supply rules are exceptions or flexibilities, not default shortcuts.

- [ ] **Step 2: Add the six-step MDX decision path**

Use `StepProcess` and six `Step` components with these titles:

```mdx
<StepProcess>
  <Step n={1} title="Clasificar la mercancía">Confirma la clasificación del producto final antes de buscar su regla específica.</Step>
  <Step n={2} title="Identificar materiales y países">Separa materiales originarios, no originarios y aquellos cuyo origen no puede documentarse.</Step>
  <Step n={3} title="Localizar la regla específica">Consulta el Anexo 4.1 o, para textiles y vestido, el Anexo 3-A.</Step>
  <Step n={4} title="Probar cada exigencia">Evalúa cambio arancelario, contenido regional y procesos obligatorios según la redacción completa de la regla.</Step>
  <Step n={5} title="Revisar flexibilidades y excepciones">Aplica acumulación, de minimis, reglas de surtidos o escaso abasto solo cuando sus condiciones se cumplen.</Step>
  <Step n={6} title="Construir el expediente">Conserva la certificación, la lista de materiales, los cálculos y la evidencia de producción y proveedores.</Step>
</StepProcess>
```

- [ ] **Step 3: Add cases, sources, links, FAQ, and CTA**

Include concise cases for cacao, tomato sauce with Brazilian sugar, U.S.-purchased Chinese goods, de minimis, a set containing one non-originating good, and transit through a third country. Link all three operational guides and the existing general certificate article. Cite MINCETUR, the official Agreement chapters/annexes, and CBP near the claims they support. End with five FAQs and:

```mdx
<ServiceCTA topic="consultoria" />
```

- [ ] **Step 4: Run the focused test**

Run `node --test scripts/seo/apc-origin-cluster.test.mjs`.

Expected: hub-specific assertions PASS; remaining tests FAIL because the satellite files do not yet exist.

- [ ] **Step 5: Commit the hub**

```powershell
git add src/content/blog/reglas-origen-tlc-peru-estados-unidos.mdx
git commit -m "feat: add APC rules of origin hub"
```

### Task 3: Publish the guide for Peruvian exporters

**Files:**

- Create: `src/content/blog/exportar-estados-unidos-tlc-reglas-origen.mdx`

- [ ] **Step 1: Add exact frontmatter**

```mdx
---
title: "Exportar a Estados Unidos con el TLC: reglas de origen y certificación"
description: "Guía para exportar a Estados Unidos con el TLC: cómo validar origen, preparar la certificación, conservar documentos y responder ante CBP."
date: "2026-09-04"
updatedAt: "2026-09-04"
author: "AduanasPE"
category: "Exportación"
topic: "exportacion"
tags: ["exportar a Estados Unidos TLC", "certificación de origen Estados Unidos", "CBP Perú TPA", "origen mercancías Perú", "documentos exportación"]
image: ""
imageAlt: ""
featured: false
---
```

- [ ] **Step 2: Write the exporter workflow and evidence checklist**

Cover these facts without overstating them:

- The U.S. importer makes and owns the preference claim.
- Producer, exporter, or U.S. importer may prepare the certification when they possess the required knowledge and support.
- CBP does not require a unique layout; the reference template is optional but the required data elements are not.
- For a manufactured product, the support may include the product-specific rule, technical description, bill of materials with classification and origin, supplier affidavits, cost data, and VCR computation.
- A producer may send confidential substantiation directly to CBP.
- Records described by the Agreement should be preserved for five years from certification.
- A certification for identical goods can cover no more than 12 months.
- A later-discovered error requires written notice to certificate recipients.
- Third-country transit does not allow entry into that country's commerce or further processing; goods must remain under customs control.

- [ ] **Step 3: Add exporter cases and FAQ**

Use cases for cacao under `4.1(a)`, sauce or footwear under `4.1(b)`, jelly under `4.1(c)`, Chinese sewing thread in a Peruvian poncho, and a changed supplier during a blanket period. Add at least six FAQs covering the optional format, who signs, documents requested by CBP, confidential manufacturer data, correcting errors, and certification timing. Link the hub and certificate tutorial; end with `ServiceCTA topic="consultoria"`.

- [ ] **Step 4: Run the focused test and commit**

Run `node --test scripts/seo/apc-origin-cluster.test.mjs`.

Expected: hub and exporter assertions PASS; import and tutorial files still fail with `ENOENT`.

```powershell
git add src/content/blog/exportar-estados-unidos-tlc-reglas-origen.mdx
git commit -m "feat: add APC exporter origin guide"
```

### Task 4: Publish the guide for Peruvian importers

**Files:**

- Create: `src/content/blog/importar-estados-unidos-peru-tlc-certificado-origen.mdx`

- [ ] **Step 1: Add exact frontmatter**

```mdx
---
title: "Importar de Estados Unidos a Perú con el TLC: origen y certificado"
description: "Aprende cómo importar de Estados Unidos a Perú con el TLC: verifica origen, preferencia, certificado, proveedor y documentos antes de comprar."
date: "2026-09-04"
updatedAt: "2026-09-04"
author: "AduanasPE"
category: "Importación"
topic: "importacion"
tags: ["importar de Estados Unidos a Perú TLC", "certificado de origen Estados Unidos", "preferencia arancelaria Perú", "origen estadounidense", "APC Perú Estados Unidos"]
image: ""
imageAlt: ""
featured: false
---
```

- [ ] **Step 2: Write the pre-purchase checklist and import workflow**

Require the reader to obtain product description, current classification, manufacturer, production country, bill of materials when relevant, applicable origin rule, issuer details, invoice, blanket period if any, and supporting declarations. Explain that a U.S. reseller of Chinese goods cannot create U.S. origin merely by invoicing or shipping the product from the United States.

Use the separate MINCETUR reference format for U.S.-origin imports to Peru; do not reuse the export form's `PE` field instruction. Explain accumulation with a U.S.-produced good using a documented Peruvian originating material. Distinguish preference eligibility from permits, valuation, IGV, antidumping, and other import requirements.

- [ ] **Step 3: Add importer cases and FAQ**

Use cases for U.S.-manufactured machinery, Chinese merchandise sold by a U.S. distributor, a U.S. product with Peruvian originating material, a recurring shipment with a supplier change, and a certificate inconsistent with the invoice. Add at least six FAQs and link to the hub, the first-import guide, digital import documents, and consultation service. End with `ServiceCTA topic="consultoria"`.

- [ ] **Step 4: Run the focused test and commit**

Run `node --test scripts/seo/apc-origin-cluster.test.mjs`.

Expected: all article tests except the tutorial and registries PASS.

```powershell
git add src/content/blog/importar-estados-unidos-peru-tlc-certificado-origen.mdx
git commit -m "feat: add APC importer origin guide"
```

### Task 5: Publish the field-by-field certificate tutorial

**Files:**

- Create: `src/content/blog/llenar-certificado-origen-peru-estados-unidos.mdx`
- Create: `docs/docs_recursos/06-certificado-origen-exportacion-peru-eeuu-formato.doc`

- [ ] **Step 1: Preserve the supplied form without modifying the original**

Run:

```powershell
Copy-Item -LiteralPath 'C:\Users\Gualbert\Downloads\APC_Peru-USA_CO__Exportaciones_dePeru_aUSA_FORMATO (4) (1).doc' -Destination 'docs\docs_recursos\06-certificado-origen-exportacion-peru-eeuu-formato.doc'
```

Expected: the destination exists and has the same byte length as the source.

- [ ] **Step 2: Add exact frontmatter**

```mdx
---
title: "Cómo llenar el certificado de origen Perú-Estados Unidos"
description: "Aprende a llenar los 11 campos del certificado de origen Perú-Estados Unidos, elegir el criterio 4.1 y evitar errores antes de entregarlo."
date: "2026-09-04"
updatedAt: "2026-09-04"
author: "AduanasPE"
category: "Exportación"
topic: "exportacion"
tags: ["llenar certificado de origen Perú Estados Unidos", "formato certificado origen", "criterio preferencial 4.1", "certificación origen CBP", "TLC Perú Estados Unidos"]
image: ""
imageAlt: ""
featured: false
---
```

- [ ] **Step 3: Explain all eleven fields with operational examples**

Create `### Campo 1` through `### Campo 11`. Use fictitious data clearly labeled as examples. State:

- Fields 1–3 identify importer, exporter, and producer; producer data is included if known.
- Field 4 applies only to identical goods over a maximum 12-month blanket period.
- Field 5 must reconcile to invoice and HS description.
- Field 6 uses six or more digits as required by the rule; the current classification and Agreement nomenclature must be reconciled.
- Field 7 is `4.1(a)`, `4.1(b)`, or `4.1(c)` only after origin analysis.
- Field 8 identifies the invoice for a single shipment.
- Field 9 uses code `PE` in this Peru-to-U.S. form.
- Field 10 requires signature, date, company, title, telephone, fax/e-mail as applicable, knowledge of facts, and authority to bind the company.
- Field 11 records relevant rulings or observations.
- The declaration's page count includes attachments.

- [ ] **Step 4: Add four worked certificate scenarios**

Use a compact table for cacao `4.1(a)`, tomato sauce `4.1(b)`, strawberry jelly `4.1(c)`, and monthly identical shipments. Do not publish a completed official-looking certificate with invented company identities; instead show only a field-value matrix headed `Ejemplo educativo`.

- [ ] **Step 5: Resolve form FAQs and caveats**

Answer at least ten questions. Include CBP's positions that the layout is optional, certification must be signed and dated, an incorrect classification may trigger a request for an amended certification with the original attached, supporting data may be supplied directly by the producer, and a digitized certification described in the dated CBP FAQ is informational guidance that should be rechecked for the current filing context. Link the hub and exporter guide; end with `ServiceCTA topic="consultoria"`.

- [ ] **Step 6: Run the focused test and commit**

Run `node --test scripts/seo/apc-origin-cluster.test.mjs`.

Expected: article and tutorial assertions PASS; registry assertions still FAIL.

```powershell
git add src/content/blog/llenar-certificado-origen-peru-estados-unidos.mdx docs/docs_recursos/06-certificado-origen-exportacion-peru-eeuu-formato.doc
git commit -m "feat: add APC certificate completion tutorial"
```

### Task 6: Update the general certificate guide

**Files:**

- Modify: `src/content/blog/certificado-origen-exportacion-peru.mdx`

- [ ] **Step 1: Update metadata and add a scoped APC section**

Change only:

```yaml
updatedAt: "2026-09-04"
```

Insert before `## Cuándo pedir apoyo`:

```mdx
## Certificación bajo el TLC Perú-Estados Unidos

El APC Perú-Estados Unidos utiliza autocertificación. Eso significa que el análisis no termina al conseguir un sello: productor, exportador o importador puede emitir la certificación cuando cuenta con conocimiento y documentos suficientes para sostener el origen.

Revisa primero la [guía de reglas de origen del TLC Perú-Estados Unidos](/blog/reglas-origen-tlc-peru-estados-unidos/) y, si tu operación va de Perú hacia Estados Unidos, consulta [cómo llenar el certificado de origen campo por campo](/blog/llenar-certificado-origen-peru-estados-unidos/).

La certificación para múltiples embarques puede cubrir mercancías idénticas durante un periodo máximo de 12 meses. La empresa también debe conservar el sustento del origen y revisar el certificado cuando cambien materiales, proveedores o procesos.
```

- [ ] **Step 2: Run the focused test and commit**

Run `node --test scripts/seo/apc-origin-cluster.test.mjs`.

Expected: general-article assertion PASS; registries still FAIL.

```powershell
git add src/content/blog/certificado-origen-exportacion-peru.mdx
git commit -m "docs: connect general origin guide to APC cluster"
```

### Task 7: Register URLs and sources

**Files:**

- Modify: `docs/seo_content_map.csv`
- Modify: `docs/docs_recursos/registro_fuentes_blog.csv`

- [ ] **Step 1: Append four SEO map rows**

Add one CSV row per slug using these fixed ownership rules:

- Hub owns `reglas de origen TLC Perú Estados Unidos` and must not absorb field-by-field filling intent.
- Export guide owns `exportar a Estados Unidos TLC` and must not become a general export guide.
- Import guide owns `importar de Estados Unidos a Perú TLC` and must not duplicate the first-import pillar.
- Tutorial owns `llenar certificado de origen Perú Estados Unidos` and must not duplicate the general certificate guide.

Set status `published`, source PDF ID `2023-09-mincetur-manual-reglas-origen-apc-peru-eeuu`, CTA `/servicios/consultoria-aduanera`, review date `2026-09-04`, and cannibalization risk `medio` for all four because the cluster intentionally overlaps at its edges.

- [ ] **Step 2: Append source registry rows**

Create source ID `2023-09-mincetur-manual-reglas-origen-apc-peru-eeuu` for `05-manual-sobre-reglas-de-origen-del-apc-peru-ee-uu.pdf` and one row for each of the four new slugs plus `certificado-origen-exportacion-peru`. Set usage status to `usado`, review/update dates to `2026-09-04`, and describe the article-specific use.

Create source ID `2026-09-04-formato-certificado-origen-peru-eeuu-exportacion` for `06-certificado-origen-exportacion-peru-eeuu-formato.doc`, related to the tutorial, with source kind `Formato oficial referencial` and usage type `tutorial de llenado campo por campo`.

- [ ] **Step 3: Run the complete focused test**

Run:

```powershell
node --test scripts/seo/apc-origin-cluster.test.mjs
```

Expected: all tests PASS.

- [ ] **Step 4: Commit registries**

```powershell
git add docs/seo_content_map.csv docs/docs_recursos/registro_fuentes_blog.csv
git commit -m "docs: register APC origin cluster sources"
```

### Task 8: Validate the finished cluster

**Files:**

- Verify all files changed in Tasks 1–7.

- [ ] **Step 1: Run targeted and existing tests**

```powershell
node --test scripts/seo/apc-origin-cluster.test.mjs
npm.cmd run seo:test
npm.cmd run lint
```

Expected: all commands exit `0` with no failing tests or ESLint errors.

- [ ] **Step 2: Run the production build**

```powershell
npm.cmd run build
```

Expected: Next.js build exits `0`; all four new `/blog/<slug>/` routes are generated without MDX compilation errors.

- [ ] **Step 3: Review sensitive claims and source placement**

For each new MDX file, confirm:

- a source link appears next to the legal or procedural claim it supports;
- CBP FAQ guidance is identified by date and not presented as binding law;
- no example classification is described as automatically applicable today;
- the import guide does not reuse `PE` as the origin code for U.S.-origin goods;
- no fictional data resembles a real client, company, invoice, or ruling;
- one primary consultation CTA appears at the end.

- [ ] **Step 4: Review Git state**

```powershell
git status --short
git diff --check HEAD~7..HEAD
```

Expected: no temporary files are staged or committed; the user-supplied PDF remains untouched; only the planned source form, MDX, test, and registry changes are included.

- [ ] **Step 5: Commit any verification-only corrections**

If verification required corrections, stage only the corrected planned files and use:

```powershell
git commit -m "fix: finalize APC origin content cluster"
```

If no corrections were required, do not create an empty commit.
