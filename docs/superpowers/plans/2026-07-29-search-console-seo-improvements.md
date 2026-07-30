# Search Console SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve organic CTR and crawl signals for AduanasPE by tightening four search snippets, strengthening two weak pages, and adding contextual internal links without changing any existing URL.

**Architecture:** Keep the current Next.js App Router and MDX content model. Encode the Search Console findings as filesystem-based Node tests, then make the smallest metadata, TSX, MDX, and SEO-log changes needed to pass those tests. Existing canonical generation, `trailingSlash: true`, sitemap generation, and page components remain the source of truth.

**Tech Stack:** Next.js 16, React 19, TypeScript, MDX, Node.js test runner, ESLint.

---

## File map

- Create `scripts/seo/content-quality.test.mjs`: regression tests for metadata, canonical conventions, strengthened page content, contextual links, and SEO-log entries.
- Modify `src/content/blog/importar-de-china-a-peru.mdx`: shorter China-import snippet.
- Modify `src/content/blog/multas-aduaneras-sunat-como-evitarlas.mdx`: snippet aligned to “tabla de sanciones SUNAT”.
- Modify `src/content/blog/registrar-mandato-electronico-sunat.mdx`: concise mandate snippet.
- Modify `src/content/blog/guia-inspeccion-no-intrusiva-puertos-2024.mdx`: concise SINI snippet.
- Modify `src/app/(site)/comercio-exterior/regimenes-aduaneros/page.tsx`: decision-oriented comparison, FAQ schema, and related guidance.
- Modify `src/content/blog/servicios-clave-agencia-de-cargas.mdx`: buyer-oriented cargo-agency guidance and project-cargo links.
- Modify `src/app/(site)/comercio-exterior/importacion/page.tsx`: a second contextual reading cluster for high-risk imports.
- Modify `src/app/(site)/servicios/multas-aduaneras-sunat/page.tsx`: direct links to new fiscalization and restricted-goods articles.
- Modify `docs/seo_tracking/seo_log.json`: record the six material SEO edits and their Search Console baselines.

### Task 1: Protect URL conventions and optimize four high-impression snippets

**Files:**
- Create: `scripts/seo/content-quality.test.mjs`
- Modify: `src/content/blog/importar-de-china-a-peru.mdx:2-5`
- Modify: `src/content/blog/multas-aduaneras-sunat-como-evitarlas.mdx:2-5`
- Modify: `src/content/blog/registrar-mandato-electronico-sunat.mdx:2-5`
- Modify: `src/content/blog/guia-inspeccion-no-intrusiva-puertos-2024.mdx:2-5`

- [ ] **Step 1: Create the failing metadata and URL-convention tests**

Create `scripts/seo/content-quality.test.mjs` with:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function read(path) {
    return readFile(path, 'utf8');
}

function frontmatterValue(content, key) {
    const match = content.match(new RegExp(`^${key}:\\s*"([^"]+)"`, 'm'));
    assert.ok(match, `Missing ${key} in frontmatter`);
    return match[1];
}

const snippetCases = [
    {
        file: 'src/content/blog/importar-de-china-a-peru.mdx',
        title: 'Importar de China a Perú: costos y requisitos 2026',
        description: 'Conoce los costos, requisitos, tributos y documentos para importar de China a Perú en 2026. Evita errores antes de pagar a tu proveedor.',
    },
    {
        file: 'src/content/blog/multas-aduaneras-sunat-como-evitarlas.mdx',
        title: 'Tabla de sanciones SUNAT 2026: multas aduaneras',
        description: 'Consulta la tabla de sanciones SUNAT 2026, multas aduaneras frecuentes y qué revisar para prevenir errores documentarios y tributarios.',
    },
    {
        file: 'src/content/blog/registrar-mandato-electronico-sunat.mdx',
        title: 'Mandato electrónico SUNAT: guía paso a paso 2026',
        description: 'Aprende a registrar el mandato electrónico SUNAT paso a paso en 2026: Clave SOL, vigencia, aduanas, regímenes y descarga del comprobante.',
    },
    {
        file: 'src/content/blog/guia-inspeccion-no-intrusiva-puertos-2024.mdx',
        title: 'SINI en Aduanas: qué es, costos y multas 2026',
        description: 'Conoce qué significa SINI en Aduanas, por qué seleccionan un contenedor, cuánto puede costar y qué ocurre si el escáner detecta diferencias.',
    },
];

for (const expected of snippetCases) {
    test(`${expected.file} has the approved Search Console snippet`, async () => {
        const content = await read(expected.file);
        const title = frontmatterValue(content, 'title');
        const description = frontmatterValue(content, 'description');

        assert.equal(title, expected.title);
        assert.equal(description, expected.description);
        assert.ok(title.length <= 60, `${expected.file} title is ${title.length} characters`);
        assert.ok(description.length >= 120, `${expected.file} description is too short`);
        assert.ok(description.length <= 165, `${expected.file} description is ${description.length} characters`);
        assert.match(content, /updatedAt: "2026-07-29"/);
    });
}

test('Next and sitemap keep the trailing-slash convention', async () => {
    const nextConfig = await read('next.config.ts');
    const sitemap = await read('src/app/sitemap.ts');
    const blogSeo = await read('src/lib/blog/seo.ts');

    assert.match(nextConfig, /trailingSlash:\s*true/);
    assert.match(sitemap, /`\$\{BASE_URL\}\/blog\/\$\{post\.slug\}\/`/);
    assert.match(blogSeo, /`\$\{SITE_URL\}\/blog\/\$\{post\.slug\}\/`/);
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run:

```powershell
node --test scripts/seo/content-quality.test.mjs
```

Expected: four snippet tests fail because the titles, descriptions, or `updatedAt` values still contain the previous copy; the trailing-slash test passes.

- [ ] **Step 3: Apply the approved frontmatter**

Replace only `title`, `description`, and `updatedAt` in the four MDX files:

```yaml
# src/content/blog/importar-de-china-a-peru.mdx
title: "Importar de China a Perú: costos y requisitos 2026"
description: "Conoce los costos, requisitos, tributos y documentos para importar de China a Perú en 2026. Evita errores antes de pagar a tu proveedor."
updatedAt: "2026-07-29"

# src/content/blog/multas-aduaneras-sunat-como-evitarlas.mdx
title: "Tabla de sanciones SUNAT 2026: multas aduaneras"
description: "Consulta la tabla de sanciones SUNAT 2026, multas aduaneras frecuentes y qué revisar para prevenir errores documentarios y tributarios."
updatedAt: "2026-07-29"

# src/content/blog/registrar-mandato-electronico-sunat.mdx
title: "Mandato electrónico SUNAT: guía paso a paso 2026"
description: "Aprende a registrar el mandato electrónico SUNAT paso a paso en 2026: Clave SOL, vigencia, aduanas, regímenes y descarga del comprobante."
updatedAt: "2026-07-29"

# src/content/blog/guia-inspeccion-no-intrusiva-puertos-2024.mdx
title: "SINI en Aduanas: qué es, costos y multas 2026"
description: "Conoce qué significa SINI en Aduanas, por qué seleccionan un contenedor, cuánto puede costar y qué ocurre si el escáner detecta diferencias."
updatedAt: "2026-07-29"
```

Do not change any slug, `date`, `topic`, canonical generator, or body heading.

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run:

```powershell
node --test scripts/seo/content-quality.test.mjs
```

Expected: five tests pass.

- [ ] **Step 5: Commit the snippet regression**

```powershell
git add scripts/seo/content-quality.test.mjs src/content/blog/importar-de-china-a-peru.mdx src/content/blog/multas-aduaneras-sunat-como-evitarlas.mdx src/content/blog/registrar-mandato-electronico-sunat.mdx src/content/blog/guia-inspeccion-no-intrusiva-puertos-2024.mdx
git commit -m "seo: improve high-impression search snippets"
```

### Task 2: Turn the regimes page into a useful decision guide

**Files:**
- Modify: `scripts/seo/content-quality.test.mjs`
- Modify: `src/app/(site)/comercio-exterior/regimenes-aduaneros/page.tsx:1-155`

- [ ] **Step 1: Add a failing test for the decision guide**

Append to `scripts/seo/content-quality.test.mjs`:

```js
test('regimes page contains comparison, FAQs, canonicals, and decision links', async () => {
    const content = await read('src/app/(site)/comercio-exterior/regimenes-aduaneros/page.tsx');

    assert.match(content, /Regímenes aduaneros en Perú: tipos y cómo elegir \| AduanasPE/);
    assert.match(content, /https:\/\/aduanaspe\.com\/comercio-exterior\/regimenes-aduaneros\//);
    assert.match(content, /const decisionGuide = \[/);
    assert.match(content, /Finalidad/);
    assert.match(content, /Tratamiento tributario general/);
    assert.match(content, /Riesgo habitual/);
    assert.match(content, /<FaqJsonLd faqs=\{faqs\} \/>/);
    assert.match(content, /href=\{ROUTES\.comercioExterior\.importacion\}/);
    assert.match(content, /href=\{ROUTES\.comercioExterior\.exportacion\}/);
    assert.match(content, /href=\{ROUTES\.servicios\.consultoriaAduanera\}/);
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run:

```powershell
node --test scripts/seo/content-quality.test.mjs
```

Expected: `regimes page contains comparison...` fails because the comparison and FAQ schema do not exist.

- [ ] **Step 3: Add the imports, metadata, comparison data, and FAQs**

In `src/app/(site)/comercio-exterior/regimenes-aduaneros/page.tsx`, add:

```tsx
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';
```

Replace the metadata title and description with:

```tsx
title: 'Regímenes aduaneros en Perú: tipos y cómo elegir | AduanasPE',
description: 'Compara los principales regímenes aduaneros en Perú, su finalidad y tratamiento general para elegir la destinación adecuada antes de declarar.',
```

After `regimenes`, add:

```tsx
const decisionGuide = [
    {
        regimen: 'Importación para el consumo',
        finalidad: 'Ingresar mercancía para usarla o venderla definitivamente en Perú.',
        permanencia: 'Definitiva',
        tributos: 'Se pagan los tributos aplicables al nacionalizar.',
        riesgo: 'Comprar sin validar clasificación, permisos o costo total.',
    },
    {
        regimen: 'Admisión temporal',
        finalidad: 'Ingresar mercancía por un plazo y finalidad específicos.',
        permanencia: 'Temporal',
        tributos: 'Puede suspender tributos mientras se cumplan las condiciones.',
        riesgo: 'Vencer el plazo o usar la mercancía para un fin distinto.',
    },
    {
        regimen: 'Exportación definitiva',
        finalidad: 'Enviar mercancía nacional o nacionalizada al exterior.',
        permanencia: 'Salida definitiva',
        tributos: 'No paga tributos de exportación; puede exigir regularización documental.',
        riesgo: 'Documentos inconsistentes o regularización fuera de plazo.',
    },
    {
        regimen: 'Depósito aduanero',
        finalidad: 'Almacenar mercancía bajo control aduanero antes de definir su destino.',
        permanencia: 'Temporal',
        tributos: 'Difiere el pago hasta la destinación posterior.',
        riesgo: 'No controlar plazos, almacenaje y costos de retiro.',
    },
];

const faqs = [
    {
        question: '¿Cuál es el régimen aduanero más usado para importar a Perú?',
        answer: 'La importación para el consumo es el régimen habitual cuando la mercancía permanecerá en Perú para uso o venta. La elección depende del objetivo, plazo y tratamiento previsto.',
    },
    {
        question: '¿Se puede cambiar de régimen aduanero después?',
        answer: 'Algunas mercancías admiten una destinación posterior, pero no debe asumirse que el cambio siempre es posible. Conviene validar plazos, requisitos y situación de la carga antes de declarar.',
    },
    {
        question: '¿Qué debo revisar antes de elegir un régimen?',
        answer: 'Revisa la finalidad de la mercancía, cuánto tiempo permanecerá en el país, permisos, documentos, tributos, garantías y obligaciones de regularización.',
    },
];
```

- [ ] **Step 4: Render FAQ schema, comparison, and decision links**

Immediately after the breadcrumb JSON-LD, render:

```tsx
<FaqJsonLd faqs={faqs} />
```

Insert before the existing `SplitFeature`:

```tsx
<section className="bg-white py-20">
    <Container>
        <div className="mx-auto max-w-3xl text-center">
            <span className="section-badge">Comparación práctica</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Compara el objetivo antes de elegir el régimen
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
                El régimen no se elige solo por el nombre de la operación. Primero define qué ocurrirá con la mercancía, por cuánto tiempo y qué obligaciones tendrás que cumplir.
            </p>
        </div>
        <div className="mt-10 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-[900px] w-full text-left text-sm">
                <thead className="bg-slate-950 text-white">
                    <tr>
                        {['Régimen', 'Finalidad', 'Permanencia', 'Tratamiento tributario general', 'Riesgo habitual'].map((label) => (
                            <th key={label} className="px-5 py-4 font-semibold">{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {decisionGuide.map((item) => (
                        <tr key={item.regimen} className="align-top">
                            <th className="px-5 py-5 font-bold text-slate-950">{item.regimen}</th>
                            <td className="px-5 py-5 leading-6 text-slate-600">{item.finalidad}</td>
                            <td className="px-5 py-5 leading-6 text-slate-600">{item.permanencia}</td>
                            <td className="px-5 py-5 leading-6 text-slate-600">{item.tributos}</td>
                            <td className="px-5 py-5 leading-6 text-slate-600">{item.riesgo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-500">
            Esta comparación es orientativa. La aplicación concreta depende de la mercancía, documentos, plazos y normativa vigente.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link href={ROUTES.comercioExterior.importacion} className="service-card service-blue p-6">
                <h3 className="font-bold text-slate-950">Si la mercancía ingresará a Perú</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Revisa la guía de importación, costos, documentos y modalidades.</p>
            </Link>
            <Link href={ROUTES.comercioExterior.exportacion} className="service-card service-green p-6">
                <h3 className="font-bold text-slate-950">Si la mercancía saldrá del país</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Revisa requisitos y documentos para exportar desde Perú.</p>
            </Link>
            <Link href={ROUTES.servicios.consultoriaAduanera} className="service-card service-orange p-6">
                <h3 className="font-bold text-slate-950">Si el caso no encaja claramente</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Valida el régimen, los plazos y el tratamiento antes de declarar.</p>
            </Link>
        </div>
    </Container>
</section>
```

Insert before the final `CTASection`:

```tsx
<section className="bg-slate-50 py-20">
    <Container>
        <div className="mx-auto max-w-3xl">
            <span className="section-badge">Preguntas frecuentes</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Dudas antes de declarar</h2>
            <div className="mt-8 space-y-5">
                {faqs.map((faq) => (
                    <article key={faq.question} className="service-card service-blue p-6">
                        <h3 className="text-lg font-bold text-slate-950">{faq.question}</h3>
                        <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                    </article>
                ))}
            </div>
        </div>
    </Container>
</section>
```

- [ ] **Step 5: Run the focused test and lint**

Run:

```powershell
node --test scripts/seo/content-quality.test.mjs
npm.cmd run lint
```

Expected: all content-quality tests pass and ESLint exits 0.

- [ ] **Step 6: Commit the regimes guide**

```powershell
git add scripts/seo/content-quality.test.mjs "src/app/(site)/comercio-exterior/regimenes-aduaneros/page.tsx"
git commit -m "seo: strengthen customs regimes guide"
```

### Task 3: Reframe the cargo-agency article around provider selection

**Files:**
- Modify: `scripts/seo/content-quality.test.mjs`
- Modify: `src/content/blog/servicios-clave-agencia-de-cargas.mdx:2-123`

- [ ] **Step 1: Add a failing article-quality test**

Append:

```js
test('cargo agency article helps buyers compare providers', async () => {
    const content = await read('src/content/blog/servicios-clave-agencia-de-cargas.mdx');

    assert.match(content, /title: "Qué servicios debe ofrecer una agencia de carga en Perú"/);
    assert.match(content, /updatedAt: "2026-07-29"/);
    assert.match(content, /## Cómo comparar agencias de carga antes de contratar/);
    assert.match(content, /agencia de carga coordina el transporte internacional/i);
    assert.match(content, /agente de aduanas gestiona el despacho/i);
    assert.match(content, /\]\(\/blog\/flat-rack-vs-roro-maquinaria-pesada\/\)/);
    assert.match(content, /\]\(\/blog\/importar-maquinaria-usada-peru\/\)/);
    assert.match(content, /\]\(\/servicios\/agencia-de-carga-internacional\/\)/);
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run:

```powershell
node --test scripts/seo/content-quality.test.mjs
```

Expected: the cargo-agency test fails on the old title and missing comparison section.

- [ ] **Step 3: Update the snippet and opening**

Use:

```yaml
title: "Qué servicios debe ofrecer una agencia de carga en Perú"
description: "Compara los servicios de una agencia de carga en Perú: flete, seguro, documentos, aduanas, transporte local y seguimiento antes de contratar."
updatedAt: "2026-07-29"
```

Replace the opening through the first related links with:

```mdx
## Qué debe resolver una agencia de carga

Una agencia de carga coordina el transporte internacional de tu mercancía: cotiza espacios, reserva con navieras o aerolíneas, organiza documentos de transporte y hace seguimiento desde origen hasta destino. Su valor no está solo en conseguir un flete, sino en evitar que cada etapa avance desconectada.

Antes de comparar precios, separa responsabilidades. La **agencia de carga coordina el transporte internacional**; el **agente de aduanas gestiona el despacho** ante SUNAT; y el transportista local mueve la mercancía desde el puerto o aeropuerto hasta el almacén. Un mismo proveedor puede coordinar los tres servicios, pero debe explicar el alcance de cada uno.

Si todavía estás comparando proveedores, revisa [qué hace una agencia de carga internacional](/blog/que-es-una-agencia-de-carga-internacional/) y la diferencia entre [agente de aduanas y agencia de carga](/blog/agente-de-aduanas-vs-agencia-de-carga/).
```

- [ ] **Step 4: Add buyer criteria and project-cargo links**

Insert before `## Resumen: Checklist de servicios`:

```mdx
## Cómo comparar agencias de carga antes de contratar

No compares únicamente el flete principal. Pide que cada propuesta indique:

- origen, destino, modalidad e Incoterm utilizado
- gastos incluidos en origen y destino
- vigencia de la tarifa y posibles recargos
- días libres, almacenaje y devolución de contenedor
- responsable de revisar el B/L, AWB, factura y packing list
- frecuencia del seguimiento y canal para atender incidencias
- alcance del seguro y exclusiones
- coordinación con aduanas y transporte local

Para cargas fuera de medida, pregunta además quién valida dimensiones, punto de izaje, sujeción y modalidad. Puedes comparar [flat rack y Ro-Ro para maquinaria pesada](/blog/flat-rack-vs-roro-maquinaria-pesada/) y revisar los requisitos para [importar maquinaria usada a Perú](/blog/importar-maquinaria-usada-peru/) antes de confirmar la reserva.

<InfoBox type="important" title="Una cotización barata puede estar incompleta">
  Si una propuesta no separa flete, gastos locales, seguro, aduanas y transporte interno, todavía no permite comparar el costo real de la operación.
</InfoBox>
```

Keep the existing service table, FAQ block, and link to `/servicios/agencia-de-carga-internacional/`.

- [ ] **Step 5: Run the focused test**

Run:

```powershell
node --test scripts/seo/content-quality.test.mjs
```

Expected: all content-quality tests pass.

- [ ] **Step 6: Commit the article improvement**

```powershell
git add scripts/seo/content-quality.test.mjs src/content/blog/servicios-clave-agencia-de-cargas.mdx
git commit -m "seo: improve cargo agency buyer guide"
```

### Task 4: Add contextual crawl paths to priority new articles

**Files:**
- Modify: `scripts/seo/content-quality.test.mjs`
- Modify: `src/app/(site)/comercio-exterior/importacion/page.tsx:62-73`
- Modify: `src/app/(site)/servicios/multas-aduaneras-sunat/page.tsx:152-169`

- [ ] **Step 1: Add failing tests for the priority links**

Append:

```js
test('import hub links to priority high-risk import guides', async () => {
    const content = await read('src/app/(site)/comercio-exterior/importacion/page.tsx');

    for (const slug of [
        'importar-ropa-textiles-china-peru',
        'importar-maquinaria-usada-peru',
        'importar-utiles-escolares-peru-revision-sanitaria',
    ]) {
        assert.match(content, new RegExp(`'${slug}'`));
    }
});

test('SUNAT penalties service links to priority response guides', async () => {
    const content = await read('src/app/(site)/servicios/multas-aduaneras-sunat/page.tsx');

    assert.match(content, /\/blog\/fiscalizacion-aduanera-posterior-sunat\//);
    assert.match(content, /\/blog\/multa-mercancia-restringida-sin-permiso\//);
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run:

```powershell
node --test scripts/seo/content-quality.test.mjs
```

Expected: both new internal-link tests fail.

- [ ] **Step 3: Add a second import reading cluster**

After the existing `RecommendedReading` in `src/app/(site)/comercio-exterior/importacion/page.tsx`, add:

```tsx
<RecommendedReading
    title="Guías para importaciones con mayor control o riesgo"
    subtitle="Revisa permisos, modalidad y documentos antes de comprar mercancías que suelen necesitar una evaluación más cuidadosa."
    slugs={[
        'importar-ropa-textiles-china-peru',
        'importar-maquinaria-usada-peru',
        'importar-utiles-escolares-peru-revision-sanitaria',
    ]}
/>
```

- [ ] **Step 4: Add two specific SUNAT response resources**

Append to `contentLinks` in `src/app/(site)/servicios/multas-aduaneras-sunat/page.tsx`:

```tsx
{
    title: 'Fiscalización aduanera posterior',
    href: '/blog/fiscalizacion-aduanera-posterior-sunat/',
    text: 'Qué documentos ordenar cuando SUNAT revisa una operación después del levante.',
},
{
    title: 'Mercancía restringida sin permiso',
    href: '/blog/multa-mercancia-restringida-sin-permiso/',
    text: 'Cómo ubicar el riesgo cuando la observación se relaciona con permisos o control sectorial.',
},
```

- [ ] **Step 5: Run tests and lint**

Run:

```powershell
node --test scripts/seo/content-quality.test.mjs
npm.cmd run lint
```

Expected: content-quality tests pass and ESLint exits 0.

- [ ] **Step 6: Commit the crawl-path changes**

```powershell
git add scripts/seo/content-quality.test.mjs "src/app/(site)/comercio-exterior/importacion/page.tsx" "src/app/(site)/servicios/multas-aduaneras-sunat/page.tsx"
git commit -m "seo: add crawl paths to priority guides"
```

### Task 5: Record the experiment and run full verification

**Files:**
- Modify: `scripts/seo/content-quality.test.mjs`
- Modify: `docs/seo_tracking/seo_log.json`

- [ ] **Step 1: Add a failing SEO-log test**

Append:

```js
test('SEO log records every material Search Console edit', async () => {
    const entries = JSON.parse(await read('docs/seo_tracking/seo_log.json'));
    const editedUrls = new Set(
        entries
            .filter((entry) => entry.date === '2026-07-29')
            .map((entry) => entry.url)
    );

    for (const url of [
        '/blog/importar-de-china-a-peru/',
        '/blog/multas-aduaneras-sunat-como-evitarlas/',
        '/blog/registrar-mandato-electronico-sunat/',
        '/blog/guia-inspeccion-no-intrusiva-puertos-2024/',
        '/blog/servicios-clave-agencia-de-cargas/',
        '/comercio-exterior/regimenes-aduaneros/',
    ]) {
        assert.ok(editedUrls.has(url), `Missing SEO log entry for ${url}`);
    }
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run:

```powershell
node --test scripts/seo/content-quality.test.mjs
```

Expected: the SEO-log test fails because no 2026-07-29 entries exist.

- [ ] **Step 3: Append the six experiment entries**

Append these objects to the JSON array, preserving valid JSON:

```json
{
  "date": "2026-07-29",
  "url": "/blog/importar-de-china-a-peru/",
  "metric_before": {
    "period": "2026-04-28/2026-07-27",
    "clicks": 289,
    "impressions": 25229,
    "ctr": "1.1%",
    "avg_position": 5.1
  },
  "change_applied": "Título y descripción ajustados para priorizar costos, requisitos y actualidad 2026 sin reescribir el cuerpo.",
  "target_queries": ["como importar de china a peru", "importar de china a peru"],
  "status": "watching"
},
{
  "date": "2026-07-29",
  "url": "/blog/multas-aduaneras-sunat-como-evitarlas/",
  "metric_before": {
    "period": "2026-04-28/2026-07-27",
    "clicks": 411,
    "impressions": 19284,
    "ctr": "2.1%",
    "avg_position": 5.7
  },
  "change_applied": "Snippet reenfocado a tabla de sanciones SUNAT 2026 y prevención de multas.",
  "target_queries": ["tabla de sanciones sunat", "tabla de sanciones aduaneras 2026"],
  "status": "watching"
},
{
  "date": "2026-07-29",
  "url": "/blog/registrar-mandato-electronico-sunat/",
  "metric_before": {
    "period": "2026-04-28/2026-07-27",
    "clicks": 203,
    "impressions": 12002,
    "ctr": "1.7%",
    "avg_position": 4.1
  },
  "change_applied": "Título y descripción acortados para mandato electrónico SUNAT y guía paso a paso 2026.",
  "target_queries": ["mandato electronico sunat", "como hacer un mandato electronico sunat"],
  "status": "watching"
},
{
  "date": "2026-07-29",
  "url": "/blog/guia-inspeccion-no-intrusiva-puertos-2024/",
  "metric_before": {
    "period": "2026-04-28/2026-07-27",
    "clicks": 66,
    "impressions": 8568,
    "ctr": "0.8%",
    "avg_position": 4.3
  },
  "change_applied": "Snippet acortado para explicar SINI, costos y consecuencias del escáner.",
  "target_queries": ["sini", "que es sini en aduanas"],
  "status": "watching"
},
{
  "date": "2026-07-29",
  "url": "/blog/servicios-clave-agencia-de-cargas/",
  "metric_before": {
    "index_status": "Crawled - currently not indexed",
    "last_crawled": "2026-04-11"
  },
  "change_applied": "Artículo reenfocado a comparar proveedores, alcances y servicios de una agencia de carga.",
  "target_queries": ["servicios agencia de carga", "agencia de carga peru"],
  "status": "watching"
},
{
  "date": "2026-07-29",
  "url": "/comercio-exterior/regimenes-aduaneros/",
  "metric_before": {
    "index_status": "Crawled - currently not indexed",
    "last_crawled": "2026-06-15"
  },
  "change_applied": "Página ampliada con comparación de regímenes, criterios de decisión, preguntas frecuentes y enlaces internos.",
  "target_queries": ["regimenes aduaneros en peru", "tipos de regimenes aduaneros"],
  "status": "watching"
}
```

- [ ] **Step 4: Run the full SEO suite**

Run:

```powershell
npm.cmd run seo:test
```

Expected: every test under `scripts/seo/*.test.mjs` passes with zero failures.

- [ ] **Step 5: Run lint**

Run:

```powershell
npm.cmd run lint
```

Expected: ESLint exits 0 with no errors.

- [ ] **Step 6: Run the production build**

Run:

```powershell
npm.cmd run build
```

Expected: Next.js production build exits 0 and generates the modified routes.

- [ ] **Step 7: Inspect the final diff**

Run:

```powershell
git diff --check
git status --short
git diff --stat
```

Expected: no whitespace errors; only the files listed in this plan are modified.

- [ ] **Step 8: Commit the experiment log**

```powershell
git add scripts/seo/content-quality.test.mjs docs/seo_tracking/seo_log.json
git commit -m "docs: record Search Console SEO experiment"
```

## Requirements traceability

- Four low-CTR snippets: Task 1.
- Regimes page depth, comparison, FAQ, canonical, and decision links: Task 2.
- Cargo-agency article depth and differentiation: Task 3.
- Contextual links to priority discovered URLs: Tasks 3 and 4.
- Trailing slash and canonical regression protection: Task 1.
- Search Console quarantine and measurement record: Task 5.
- Full verification with SEO tests, lint, build, and diff inspection: Task 5.
- No slug changes, new landing pages, deployment, or Search Console mutations: enforced throughout all tasks.
