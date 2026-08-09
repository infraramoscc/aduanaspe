# Ads Landing Visual Credibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar las cuatro landings de Ads con fotografía editorial específica, una jerarquía visual profesional y señales de confianza verificables.

**Architecture:** Un nuevo `CampaignHero` presentará el contenido y la imagen de cada campaña con una API reusable. Las tres rutas dinámicas recibirán sus datos visuales desde `src/content/lp.ts`; la landing de primera importación reutilizará el mismo hero y conservará su flujo de WhatsApp. Los activos serán archivos WebP locales servidos por `next/image`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, `next/image`, Node test runner, built-in ImageGen.

---

## File map

- Create `src/components/ads/CampaignHero.tsx`: hero reutilizable para campañas con imagen, CTA y beneficios.
- Create `src/components/ads/index.ts`: export público del componente.
- Create `scripts/ads/landing-credibility.test.mjs`: contrato estático de contenido, activos y eliminación de afirmaciones no verificadas.
- Create `public/images/landings/importar-china.webp`: hero de importación desde China.
- Create `public/images/landings/agente-aduanas-lima.webp`: hero de despacho aduanero.
- Create `public/images/landings/asesoria-comercio-exterior.webp`: hero de asesoría.
- Create `public/images/landings/primera-importacion.webp`: hero de primera importación.
- Modify `src/content/lp.ts`: añadir datos visuales y beneficios específicos.
- Modify `src/app/(ads)/lp/[slug]/page.tsx`: usar el nuevo hero y beneficios tipados.
- Modify `src/app/(ads)/oferta/primera-importacion/page.tsx`: usar el nuevo hero y retirar señales no verificadas.
- Modify `package.json`: añadir un script de pruebas específico para Ads.

### Task 1: Lock the credibility contract with a failing test

**Files:**
- Create: `scripts/ads/landing-credibility.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Create the static contract test**

Create `scripts/ads/landing-credibility.test.mjs` with:

```js
import assert from 'node:assert/strict';
import { access, readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const landingSource = 'src/content/lp.ts';
const sharedPage = 'src/app/(ads)/lp/[slug]/page.tsx';
const offerPage = 'src/app/(ads)/oferta/primera-importacion/page.tsx';

const assets = [
    'public/images/landings/importar-china.webp',
    'public/images/landings/agente-aduanas-lima.webp',
    'public/images/landings/asesoria-comercio-exterior.webp',
    'public/images/landings/primera-importacion.webp',
];

test('every Ads landing has a local optimized hero asset', async () => {
    for (const asset of assets) {
        await access(asset);
        const file = await stat(asset);
        assert.ok(file.size > 20_000, `${asset} is unexpectedly small`);
        assert.ok(file.size < 700_000, `${asset} should stay below 700 KB`);
    }
});

test('landing content exposes the visual credibility contract', async () => {
    const source = await readFile(landingSource, 'utf8');
    for (const field of ['eyebrow', 'heroImage', 'heroImageAlt', 'benefits', 'trustNote']) {
        assert.match(source, new RegExp(`${field}:`));
    }
    for (const image of [
        '/images/landings/importar-china.webp',
        '/images/landings/agente-aduanas-lima.webp',
        '/images/landings/asesoria-comercio-exterior.webp',
    ]) {
        assert.match(source, new RegExp(image.replaceAll('/', '\\/')));
    }
});

test('both Ads experiences use the reusable campaign hero', async () => {
    const [shared, offer] = await Promise.all([
        readFile(sharedPage, 'utf8'),
        readFile(offerPage, 'utf8'),
    ]);
    assert.match(shared, /<CampaignHero/);
    assert.match(offer, /<CampaignHero/);
    assert.match(shared, /lp\.heroImage/);
    assert.match(offer, /\/images\/landings\/primera-importacion\.webp/);
});

test('first-import offer avoids unsupported urgency and trust claims', async () => {
    const offer = await readFile(offerPage, 'utf8');
    for (const unsupported of [
        /ÚLTIMO DÍA/i,
        /3 cupos/i,
        /Cero Multas/i,
        /Tracking 24\/7/i,
        /menos de 30 minutos/i,
        /Carlos Mendoza/i,
        /Ana Ramírez/i,
        />SUNAT</,
        />BASC</,
        />OEA</,
        /Cámara de Comercio/,
    ]) {
        assert.doesNotMatch(offer, unsupported);
    }
});
```

- [ ] **Step 2: Add the Ads test script**

Add this entry to `package.json` under `scripts`:

```json
"ads:test": "node --test scripts/ads/*.test.mjs"
```

- [ ] **Step 3: Run the test and confirm the expected failure**

Run:

```powershell
npm.cmd run ads:test
```

Expected: FAIL because the four WebP files and the `CampaignHero` integration do not exist yet.

- [ ] **Step 4: Commit the failing contract**

```powershell
git add package.json scripts/ads/landing-credibility.test.mjs
git commit -m "test: define Ads landing credibility contract"
```

### Task 2: Generate and optimize the four editorial assets

**Files:**
- Create: `public/images/landings/importar-china.webp`
- Create: `public/images/landings/agente-aduanas-lima.webp`
- Create: `public/images/landings/asesoria-comercio-exterior.webp`
- Create: `public/images/landings/primera-importacion.webp`

- [ ] **Step 1: Generate the China import hero with built-in ImageGen**

Use this prompt:

```text
Use case: photorealistic-natural
Asset type: wide website landing-page hero
Primary request: an authentic international container-port operation representing imports from China to Peru
Scene/backdrop: modern Pacific container terminal at early morning, container stacks, one cargo vessel and working gantry cranes
Style/medium: premium documentary corporate photography, realistic operational detail, not stock-photo glossy
Composition/framing: 3:2 landscape, activity concentrated on the right half, generous darker negative space on the left, useful crop at 16:10 and 4:3
Lighting/mood: soft dawn light, calm, capable, trustworthy
Color palette: restrained steel blue, deep violet accents, neutral containers
Constraints: no identifiable people, no flags, no company logos, no readable text, no watermark, physically plausible port equipment
Avoid: futuristic port, dramatic disaster lighting, oversaturated colors, floating containers, fake maps
```

- [ ] **Step 2: Generate the Lima customs hero with built-in ImageGen**

Use this prompt:

```text
Use case: photorealistic-natural
Asset type: wide website landing-page hero
Primary request: professional customs cargo review in a Peruvian Pacific port environment inspired by Callao
Scene/backdrop: covered cargo inspection area beside sealed containers, two logistics professionals reviewing an unlabeled clipboard near palletized goods
Style/medium: credible documentary corporate photography, natural skin and fabric texture
Composition/framing: 3:2 landscape, professionals and cargo on the right, clean negative space on the left, faces turned away or not identifiable
Lighting/mood: bright overcast industrial daylight, orderly and trustworthy
Color palette: slate, steel blue, restrained violet safety accents
Constraints: generic safety clothing, no government insignia, no SUNAT logo, no readable documents, no company logos, no watermark
Avoid: police scene, contraband imagery, posed handshake, hard hats with text, chaotic warehouse
```

- [ ] **Step 3: Generate the consulting hero with built-in ImageGen**

Use this prompt:

```text
Use case: photorealistic-natural
Asset type: wide website landing-page hero
Primary request: a commerce specialist analyzing an import operation for a small Peruvian business
Scene/backdrop: modern understated office, laptop with abstract logistics charts, shipping documents with no readable text, small container model and calculator
Style/medium: editorial business photography, candid and realistic
Composition/framing: 3:2 landscape, work scene on the right, negative space on the left, hands and profile visible but person not identifiable
Lighting/mood: natural window light, analytical, calm and approachable
Color palette: warm neutrals, slate blue and subtle violet accents
Constraints: no readable screens or documents, no logos, no watermark, plausible desk setup
Avoid: staged boardroom handshake, holograms, floating charts, suit-and-tie cliché, excessive neon
```

- [ ] **Step 4: Generate the first-import hero with built-in ImageGen**

Use this prompt:

```text
Use case: photorealistic-natural
Asset type: wide website landing-page hero
Primary request: a small-business owner receiving a consolidated import shipment with professional logistics support
Scene/backdrop: clean urban loading area in Peru, modest palletized cartons being checked beside a delivery truck, two people collaborating naturally
Style/medium: premium documentary photography, authentic small-business scale
Composition/framing: 3:2 landscape, people and shipment on the right, usable negative space on the left, faces not identifiable
Lighting/mood: soft morning daylight, reassuring and optimistic without looking promotional
Color palette: neutral concrete, deep blue, restrained violet and green accents
Constraints: generic unbranded cartons and clothing, no logos, no readable text, no watermark, realistic load size
Avoid: luxury warehouse, giant shipment, celebratory pose, handshake, fake customs uniforms, exaggerated smiles
```

- [ ] **Step 5: Inspect every generated image**

Use `view_image` on each selected output. Reject an image if it includes readable text, logos, implausible cargo equipment, deformed people, or a composition that cannot crop well for mobile.

- [ ] **Step 6: Copy and optimize the selected outputs**

Copy each selected source into `public/images/landings/`, then convert to WebP at approximately 1600×1067 with quality 82. Use the bundled workspace Python/Pillow runtime discovered through `load_workspace_dependencies`; do not add a production dependency.

Final filenames must exactly match the four paths in the file map. Confirm every file is between 20 KB and 700 KB.

- [ ] **Step 7: Run the asset contract**

```powershell
npm.cmd run ads:test
```

Expected: the asset-size test passes; source-integration tests still fail.

- [ ] **Step 8: Commit the image assets**

```powershell
git add public/images/landings
git commit -m "assets: add editorial Ads landing imagery"
```

### Task 3: Add the reusable campaign hero

**Files:**
- Create: `src/components/ads/CampaignHero.tsx`
- Create: `src/components/ads/index.ts`

- [ ] **Step 1: Create the hero component**

Create `src/components/ads/CampaignHero.tsx` with this public API and implementation:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/layout';

export interface CampaignBenefit {
    title: string;
    description: string;
}

export interface CampaignHeroProps {
    eyebrow: string;
    title: string;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
    actions: ReactNode;
    benefits: CampaignBenefit[];
    trustNote: string;
    showBrand?: boolean;
}

export function CampaignHero({
    eyebrow,
    title,
    subtitle,
    imageSrc,
    imageAlt,
    actions,
    benefits,
    trustNote,
    showBrand = true,
}: CampaignHeroProps) {
    return (
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(99,102,241,0.32),transparent_32%),linear-gradient(135deg,#15133f_0%,#20205b_52%,#0f4759_100%)]" />
            <Container className="relative grid items-center gap-10 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:py-20">
                <div className="max-w-2xl">
                    {showBrand && (
                        <Link href="/" className="mb-9 inline-flex text-2xl font-black tracking-tight text-white">
                            AduanasPE<span className="text-emerald-400">.</span>
                        </Link>
                    )}
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">{eyebrow}</p>
                    <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">{subtitle}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
                    <p className="mt-4 text-sm text-slate-300">{trustNote}</p>
                </div>

                <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900 shadow-2xl sm:min-h-[430px]">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        priority
                        sizes="(max-width: 1023px) 100vw, 48vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-white/5" />
                </div>
            </Container>

            <Container className="relative grid gap-px overflow-hidden border-t border-white/10 bg-white/10 sm:grid-cols-3">
                {benefits.map((benefit) => (
                    <div key={benefit.title} className="bg-slate-950/70 px-6 py-6 backdrop-blur-sm">
                        <h2 className="font-semibold text-white">{benefit.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{benefit.description}</p>
                    </div>
                ))}
            </Container>
        </section>
    );
}
```

- [ ] **Step 2: Export the component**

Create `src/components/ads/index.ts`:

```ts
export {
    CampaignHero,
    type CampaignBenefit,
    type CampaignHeroProps,
} from './CampaignHero';
```

- [ ] **Step 3: Run lint**

```powershell
npm.cmd run lint -- src/components/ads/CampaignHero.tsx src/components/ads/index.ts
```

Expected: exit code 0.

- [ ] **Step 4: Commit the component**

```powershell
git add src/components/ads
git commit -m "feat: add reusable campaign hero"
```

### Task 4: Enrich and render the three dynamic landings

**Files:**
- Modify: `src/content/lp.ts`
- Modify: `src/app/(ads)/lp/[slug]/page.tsx`

- [ ] **Step 1: Expand the landing type**

Add these fields to `LandingPage`:

```ts
eyebrow: string;
heroImage: string;
heroImageAlt: string;
benefits: { title: string; description: string }[];
trustNote: string;
```

- [ ] **Step 2: Add exact campaign content**

Use these values for the three records:

```ts
// importar-china-2024
eyebrow: 'Importación internacional para pymes',
heroImage: '/images/landings/importar-china.webp',
heroImageAlt: 'Terminal de contenedores durante una operación de carga internacional',
trustNote: 'Orientación inicial por WhatsApp en horario de atención.',
benefits: [
    { title: 'Costos con contexto', description: 'Revisamos flete, gastos locales y tributos según los datos de tu carga.' },
    { title: 'Documentos antes del embarque', description: 'Identificamos la información necesaria para preparar la importación.' },
    { title: 'Modalidad adecuada', description: 'Comparamos alternativas marítimas o aéreas según volumen y urgencia.' },
],

// agente-aduanas-lima
eyebrow: 'Despacho aduanero en Lima y Callao',
heroImage: '/images/landings/agente-aduanas-lima.webp',
heroImageAlt: 'Profesionales revisando carga y documentación en una zona portuaria',
trustNote: 'Evaluamos cada operación según régimen, mercancía y documentación disponible.',
benefits: [
    { title: 'Revisión documentaria', description: 'Validamos la información necesaria antes de numerar el despacho.' },
    { title: 'Seguimiento operativo', description: 'Mantenemos claridad sobre hitos, observaciones y próximos pasos.' },
    { title: 'Coordinación integral', description: 'Articulamos el despacho con carga, almacén y transporte cuando corresponde.' },
],

// asesoria-comercio-exterior
eyebrow: 'Decisiones de comercio exterior con criterio',
heroImage: '/images/landings/asesoria-comercio-exterior.webp',
heroImageAlt: 'Especialista analizando documentos y costos de una operación de importación',
trustNote: 'La recomendación se basa en los datos y documentos disponibles de tu caso.',
benefits: [
    { title: 'Diagnóstico del caso', description: 'Ordenamos el problema y distinguimos riesgos operativos, documentarios y tributarios.' },
    { title: 'Ruta de acción', description: 'Definimos pasos concretos y prioridades para avanzar con mayor claridad.' },
    { title: 'Explicación comprensible', description: 'Traducimos requisitos técnicos a decisiones prácticas para tu empresa.' },
],
```

- [ ] **Step 3: Replace the old hero and generic trust bar**

Import `CampaignHero`, then render it before the form:

```tsx
<CampaignHero
    eyebrow={lp.eyebrow}
    title={lp.title}
    subtitle={lp.subtitle}
    imageSrc={lp.heroImage}
    imageAlt={lp.heroImageAlt}
    benefits={lp.benefits}
    trustNote={lp.trustNote}
    actions={
        <>
            <a href={lp.ctaLink}>
                <Button size="lg" variant="secondary">{lp.ctaLabel}</Button>
            </a>
            <WhatsAppLink messageKey="general" variant="button">
                Escribir por WhatsApp
            </WhatsAppLink>
        </>
    }
/>
```

Delete the old gradient hero and the generic three-item trust strip. Keep the existing form and final CTA.

- [ ] **Step 4: Run the Ads contract**

```powershell
npm.cmd run ads:test
```

Expected: asset and dynamic-landing assertions pass; the first-import assertions still fail.

- [ ] **Step 5: Commit the dynamic landing redesign**

```powershell
git add src/content/lp.ts 'src/app/(ads)/lp/[slug]/page.tsx'
git commit -m "feat: redesign dynamic Ads landings"
```

### Task 5: Rebuild the first-import offer around credible proof

**Files:**
- Modify: `src/app/(ads)/oferta/primera-importacion/page.tsx`

- [ ] **Step 1: Remove unsupported urgency**

Delete the entire amber banner containing “ÚLTIMO DÍA” and “3 cupos”. Keep the minimal header.

- [ ] **Step 2: Replace `WhatsAppHero` with `CampaignHero`**

Render:

```tsx
<CampaignHero
    eyebrow="Primera importación desde China"
    title="Importa con una ruta clara desde la compra hasta la entrega"
    subtitle="Te ayudamos a revisar modalidad, documentos, costos y coordinación logística antes de mover tu carga."
    imageSrc="/images/landings/primera-importacion.webp"
    imageAlt="Pequeña empresa recibiendo una carga consolidada con apoyo logístico"
    showBrand={false}
    trustNote="Orientación inicial por WhatsApp en horario de atención."
    benefits={[
        { title: 'Revisión previa', description: 'Ordenamos la información de producto, proveedor y documentos antes del embarque.' },
        { title: 'Costos explicados', description: 'Separamos flete, gastos locales, tributos y entrega para evaluar la operación.' },
        { title: 'Un punto de coordinación', description: 'Conectamos carga internacional, despacho y transporte según tu necesidad.' },
    ]}
    actions={
        <WhatsAppLink
            messageKey="ads_primera_importacion"
            customNumber="51944785974"
            variant="button"
            className="px-8 py-4 text-base"
        >
            Revisar mi primera importación
        </WhatsAppLink>
    }
/>
```

- [ ] **Step 3: Replace unsupported feature language**

Use these service-card headings and descriptions wherever the old absolute claims appear:

```ts
[
    { title: 'Cotización con información suficiente', desc: 'Te indicamos qué datos necesitamos para estimar la operación con mayor precisión.' },
    { title: 'Revisión antes de embarcar', desc: 'Identificamos documentos y posibles restricciones según el producto declarado.' },
    { title: 'Seguimiento por etapas', desc: 'Te informamos los principales hitos y las acciones necesarias durante la coordinación.' },
]
```

- [ ] **Step 4: Remove simulated proof sections**

Delete the full testimonial section containing Carlos Mendoza and Ana Ramírez. Delete the trust-logo strip containing SUNAT, BASC, OEA and Cámara de Comercio. Do not replace them with new names or logos.

- [ ] **Step 5: Replace the emoji graphic block**

Import `Image` from `next/image`. Replace the purple block containing the handshake emoji with:

```tsx
<div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
    <Image
        src="/images/landings/primera-importacion.webp"
        alt="Carga consolidada preparada para su entrega a una pequeña empresa"
        fill
        sizes="(max-width: 767px) 100vw, 50vw"
        className="object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-8">
        <h3 className="text-2xl font-bold text-white">Un solo punto de coordinación</h3>
        <p className="mt-3 text-base leading-7 text-slate-200">
            Conectamos carga internacional, despacho aduanero y transporte según el alcance acordado para tu operación.
        </p>
    </div>
</div>
```

- [ ] **Step 6: Run the full credibility contract**

```powershell
npm.cmd run ads:test
```

Expected: all tests pass.

- [ ] **Step 7: Commit the offer cleanup**

```powershell
git add 'src/app/(ads)/oferta/primera-importacion/page.tsx'
git commit -m "feat: strengthen first-import landing credibility"
```

### Task 6: Verify quality, responsiveness, and production build

**Files:**
- Verify: `src/components/ads/CampaignHero.tsx`
- Verify: `src/content/lp.ts`
- Verify: `src/app/(ads)/lp/[slug]/page.tsx`
- Verify: `src/app/(ads)/oferta/primera-importacion/page.tsx`

- [ ] **Step 1: Run targeted tests**

```powershell
npm.cmd run ads:test
```

Expected: all Ads credibility tests pass.

- [ ] **Step 2: Run lint**

```powershell
npm.cmd run lint
```

Expected: exit code 0 with no new warnings in modified files.

- [ ] **Step 3: Run the production build**

```powershell
npm.cmd run build
```

Expected: Next.js build succeeds and statically generates all three `/lp/[slug]` routes plus `/oferta/primera-importacion`.

- [ ] **Step 4: Start the local app and inspect all routes**

Start the dev server with `npm.cmd run dev`. Use the in-app browser to inspect desktop and mobile widths for:

```text
http://localhost:3000/lp/importar-china-2024/
http://localhost:3000/lp/agente-aduanas-lima/
http://localhost:3000/lp/asesoria-comercio-exterior/
http://localhost:3000/oferta/primera-importacion/
```

Check hero crop, text contrast, CTA focus, heading hierarchy, absence of overflow, form anchoring, and visual consistency. Capture screenshots for the final handoff.

- [ ] **Step 5: Re-run verification after any visual correction**

```powershell
npm.cmd run ads:test
npm.cmd run lint
npm.cmd run build
```

Expected: all commands exit 0.

- [ ] **Step 6: Commit scoped QA corrections**

```powershell
git add src/components/ads src/content/lp.ts 'src/app/(ads)/lp/[slug]/page.tsx' 'src/app/(ads)/oferta/primera-importacion/page.tsx'
git commit -m "fix: polish Ads landing responsive presentation"
```

Skip this commit when Step 4 required no source correction; record that the verified tree remained unchanged.
