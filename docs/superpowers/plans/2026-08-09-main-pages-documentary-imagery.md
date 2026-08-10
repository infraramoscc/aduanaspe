# Main Pages Documentary Imagery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three unique, candid documentary-style photographs to each of the four principal site pages while preserving their SEO, CTA tracking, accessibility, and performance.

**Architecture:** Centralize image metadata in a typed content registry, render it through one reusable `EditorialMedia` component, and add an opt-in photographic variant to the existing `Hero`. Each page consumes its own hero, middle, and lower image; a Node contract test verifies the complete asset and integration surface.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, `next/image`, Node test runner, Sharp, built-in ImageGen.

---

## File map

- Create `scripts/site/main-page-imagery.test.mjs`: static contract tests for asset count, file size, image metadata, component behavior, and page integration.
- Create `scripts/site/optimize-main-images.mjs`: deterministic PNG/JPEG-to-WebP optimizer for the twelve generated sources.
- Modify `package.json` and `package-lock.json`: expose `site:visual-test` and declare Sharp explicitly for the optimizer.
- Create `public/images/main-pages/*.webp`: twelve final project assets.
- Create `src/content/mainPageImages.ts`: typed source of paths, alt text, captions, and focal positions.
- Create `src/components/sections/EditorialMedia.tsx`: reusable responsive figure built on `next/image`.
- Modify `src/components/sections/Hero.tsx`: add the opt-in split photographic hero without changing the default hero.
- Modify `src/components/sections/index.ts`: export the new component and types.
- Modify `src/app/(site)/page.tsx`: integrate the three Home images.
- Modify `src/app/(site)/servicios/page.tsx`: integrate the three Services images and two short narrative sections.
- Modify `src/app/(site)/comercio-exterior/page.tsx`: integrate the three Commerce images and two short educational narrative sections.
- Modify `src/app/(site)/quienes-somos/page.tsx`: integrate the three About images into existing narrative sections.

### Task 1: Define the documentary imagery contract

**Files:**
- Create: `scripts/site/main-page-imagery.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Add the failing static contract test**

Create `scripts/site/main-page-imagery.test.mjs` with these checks:

```js
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();
const pages = ['home', 'services', 'trade', 'about'];
const slots = ['hero', 'middle', 'lower'];
const assets = pages.flatMap((page) =>
  slots.map((slot) => `public/images/main-pages/${page}-${slot}.webp`),
);

const read = (path) => readFileSync(join(root, path), 'utf8');

test('all twelve main-page images exist and stay lightweight', () => {
  assert.equal(assets.length, 12);
  for (const asset of assets) {
    const absolute = join(root, asset);
    assert.ok(existsSync(absolute), `${asset} must exist`);
    assert.ok(statSync(absolute).size > 20_000, `${asset} is unexpectedly small`);
    assert.ok(statSync(absolute).size < 280_000, `${asset} exceeds 280 KB`);
  }
});

test('image registry defines hero, middle, and lower metadata per page', () => {
  const registry = read('src/content/mainPageImages.ts');
  for (const page of pages) {
    assert.match(registry, new RegExp(`${page}:\\s*{`));
    for (const slot of slots) {
      assert.match(registry, new RegExp(`${slot}:\\s*{`));
      assert.match(registry, new RegExp(`${page}-${slot}\\.webp`));
    }
  }
  assert.doesNotMatch(registry, /cliente real|caso real|operaci[oó]n real/i);
});

test('EditorialMedia uses next/image with lazy body-image defaults', () => {
  const component = read('src/components/sections/EditorialMedia.tsx');
  assert.match(component, /from 'next\/image'/);
  assert.match(component, /priority = false/);
  assert.match(component, /<figure/);
  assert.match(component, /<figcaption/);
  assert.match(component, /sizes=/);
});

test('Hero supports an opt-in editorial image without removing its default path', () => {
  const hero = read('src/components/sections/Hero.tsx');
  assert.match(hero, /editorialImage\?:/);
  assert.match(hero, /<EditorialMedia/);
  assert.match(hero, /editorialImage \?/);
  assert.match(hero, /centered \?/);
});

test('each principal page consumes exactly three registered images', () => {
  const routes = {
    home: 'src/app/(site)/page.tsx',
    services: 'src/app/(site)/servicios/page.tsx',
    trade: 'src/app/(site)/comercio-exterior/page.tsx',
    about: 'src/app/(site)/quienes-somos/page.tsx',
  };

  for (const [page, route] of Object.entries(routes)) {
    const source = read(route);
    assert.match(source, new RegExp(`mainPageImages\\.${page}\\.hero`));
    assert.match(source, new RegExp(`mainPageImages\\.${page}\\.middle`));
    assert.match(source, new RegExp(`mainPageImages\\.${page}\\.lower`));
  }
});
```

- [ ] **Step 2: Expose the test command**

Add this script to `package.json`:

```json
"site:visual-test": "node --test scripts/site/*.test.mjs"
```

- [ ] **Step 3: Run the test and confirm the intended failure**

Run: `npm.cmd run site:visual-test`

Expected: FAIL because the twelve assets, registry, and `EditorialMedia` do not exist yet.

- [ ] **Step 4: Commit the contract**

```powershell
git add package.json scripts/site/main-page-imagery.test.mjs
git commit -m "test: define main page imagery contract"
```

### Task 2: Generate and optimize the twelve source photographs

**Files:**
- Create: `scripts/site/optimize-main-images.mjs`
- Create: `public/images/main-pages/home-hero.webp`
- Create: `public/images/main-pages/home-middle.webp`
- Create: `public/images/main-pages/home-lower.webp`
- Create: `public/images/main-pages/services-hero.webp`
- Create: `public/images/main-pages/services-middle.webp`
- Create: `public/images/main-pages/services-lower.webp`
- Create: `public/images/main-pages/trade-hero.webp`
- Create: `public/images/main-pages/trade-middle.webp`
- Create: `public/images/main-pages/trade-lower.webp`
- Create: `public/images/main-pages/about-hero.webp`
- Create: `public/images/main-pages/about-middle.webp`
- Create: `public/images/main-pages/about-lower.webp`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Declare the image optimizer explicitly**

Run: `npm.cmd install --save-dev sharp@0.34.5`

Expected: `sharp` appears in `devDependencies` and the lockfile remains valid.

- [ ] **Step 2: Generate one image per prompt with built-in ImageGen**

Use the shared constraints for every call:

```text
Use case: photorealistic-natural
Asset type: editorial photograph for an AduanasPE website page
Style: candid documentary photography, natural available light, modest contrast, subtle sensor grain, slightly imperfect handheld framing, believable Peruvian people and environment
Composition: landscape 3:2, subject away from extreme edges, enough breathing room for responsive cropping
Constraints: safe professional behavior, plausible logistics details, no posed advertising smiles
Avoid: logos, brands, readable text, watermarks, cinematic teal-orange grading, glossy stock-photo perfection, impossible machinery, duplicated hands or objects
```

Issue twelve separate calls, appending the corresponding scene:

1. `home-hero`: Small customs and logistics team coordinating container cargo near Callao, overcast coastal daylight, one person checking a clipboard while another observes the loading area.
2. `home-middle`: Adviser and first-time importer reviewing invoices and shipping papers at a practical office table, candid side angle, laptop and calculator present but screens unreadable.
3. `home-lower`: Worker and adviser naturally inspecting boxed merchandise in a modest warehouse, opened carton in foreground, respectful distance and correct safety equipment.
4. `services-hero`: Three-person operations team coordinating an international shipment between office window and container yard, active discussion, no one looking at camera.
5. `services-middle`: Close documentary view of hands organizing a DAM-style form, invoice, packing list, calculator and pen; all document text blurred and unreadable.
6. `services-lower`: Safe handoff from container area to a local cargo truck and warehouse, workers coordinating from the side, realistic Callao light and restrained activity.
7. `trade-hero`: Peruvian small-business owner planning an import with maps, samples and shipping notes on a desk, thoughtful candid moment, daylight from side window.
8. `trade-middle`: Adviser comparing product information and customs classification references with a business owner, over-shoulder angle, pages contain no readable text.
9. `trade-lower`: Person using a laptop, calculator and handwritten notes to estimate an import, practical workspace, screen interface abstract and unreadable.
10. `about-hero`: Small sibling-led customs team working together in a modest bright office, spontaneous collaboration, neither subject posing or looking at camera.
11. `about-middle`: Adviser listening to a client across a table with documents between them, warm but restrained human interaction, candid profile view.
12. `about-lower`: Two team members accompanying a warehouse cargo check, natural working posture, correct safety vest and helmet, documentary distance.

Copy each selected generated PNG into `tmp/main-pages-source/` with the matching semantic basename. Inspect every source with `view_image` before acceptance.

- [ ] **Step 3: Create the deterministic optimizer**

Create `scripts/site/optimize-main-images.mjs`:

```js
import { mkdir, readdir } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const sourceDir = join(process.cwd(), 'tmp', 'main-pages-source');
const outputDir = join(process.cwd(), 'public', 'images', 'main-pages');
await mkdir(outputDir, { recursive: true });

const files = (await readdir(sourceDir)).filter((file) => /\.(png|jpe?g)$/i.test(file));
if (files.length !== 12) {
  throw new Error(`Expected 12 source images, received ${files.length}`);
}

for (const file of files) {
  const output = `${basename(file, extname(file))}.webp`;
  await sharp(join(sourceDir, file))
    .rotate()
    .resize(1600, 1067, { fit: 'cover', position: 'attention' })
    .webp({ quality: 78, effort: 6 })
    .toFile(join(outputDir, output));
  console.log(output);
}
```

- [ ] **Step 4: Optimize and inspect the final assets**

Run: `node scripts/site/optimize-main-images.mjs`

Expected: twelve filenames printed; each WebP is between 20 KB and 280 KB. Inspect all twelve WebPs with `view_image`, rejecting visible text, brand marks, anatomy defects, unsafe behavior, or repeated scenes.

- [ ] **Step 5: Commit the asset pipeline and final images**

```powershell
git add package.json package-lock.json scripts/site/optimize-main-images.mjs public/images/main-pages
git commit -m "assets: add documentary main page imagery"
```

Do not add `tmp/main-pages-source/` to Git.

### Task 3: Build the reusable editorial image system

**Files:**
- Create: `src/content/mainPageImages.ts`
- Create: `src/components/sections/EditorialMedia.tsx`
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/index.ts`

- [ ] **Step 1: Add the typed image registry**

Create `src/content/mainPageImages.ts` with this shape and the twelve paths:

```ts
export interface EditorialImageData {
    src: string;
    alt: string;
    caption: string;
    objectPosition?: string;
}

interface MainPageImageSet {
    hero: EditorialImageData;
    middle: EditorialImageData;
    lower: EditorialImageData;
}

export const mainPageImages: Record<'home' | 'services' | 'trade' | 'about', MainPageImageSet> = {
    home: {
        hero: { src: '/images/main-pages/home-hero.webp', alt: 'Equipo coordinando carga en una zona logística portuaria', caption: 'Coordinación clara desde el inicio de la operación.' },
        middle: { src: '/images/main-pages/home-middle.webp', alt: 'Asesor e importador revisando documentos sobre una mesa', caption: 'Revisamos documentos y dudas antes de avanzar.' },
        lower: { src: '/images/main-pages/home-lower.webp', alt: 'Revisión de mercancía embalada dentro de un almacén', caption: 'Acompañamiento práctico para quien importa por primera vez.' },
    },
    services: {
        hero: { src: '/images/main-pages/services-hero.webp', alt: 'Equipo logístico coordinando un embarque internacional', caption: 'Un solo equipo conecta cada etapa de la operación.' },
        middle: { src: '/images/main-pages/services-middle.webp', alt: 'Documentos de importación organizados para su revisión', caption: 'La operación comienza con documentación ordenada.' },
        lower: { src: '/images/main-pages/services-lower.webp', alt: 'Coordinación de carga entre contenedor, camión y almacén', caption: 'Coordinamos la continuidad hasta la entrega local.' },
    },
    trade: {
        hero: { src: '/images/main-pages/trade-hero.webp', alt: 'Importador planificando una compra internacional en su espacio de trabajo', caption: 'Información práctica para decidir antes de operar.' },
        middle: { src: '/images/main-pages/trade-middle.webp', alt: 'Asesor y empresario comparando información de producto y documentos', caption: 'Cada producto requiere revisar requisitos y clasificación.' },
        lower: { src: '/images/main-pages/trade-lower.webp', alt: 'Persona calculando costos de importación con una computadora', caption: 'Herramientas para convertir datos en decisiones.' },
    },
    about: {
        hero: { src: '/images/main-pages/about-hero.webp', alt: 'Equipo pequeño colaborando en una oficina de comercio exterior', caption: 'Un equipo cercano que conoce cada operación.' },
        middle: { src: '/images/main-pages/about-middle.webp', alt: 'Asesor escuchando a un cliente durante una revisión documentaria', caption: 'La atención comienza por entender el contexto.' },
        lower: { src: '/images/main-pages/about-lower.webp', alt: 'Equipo acompañando una revisión de carga en almacén', caption: 'Cercanía también durante la ejecución operativa.' },
    },
};
```

- [ ] **Step 2: Create `EditorialMedia`**

Create `src/components/sections/EditorialMedia.tsx`:

```tsx
import Image from 'next/image';
import type { EditorialImageData } from '@/content/mainPageImages';
import { cn } from '@/lib/utils';

interface EditorialMediaProps {
    image: EditorialImageData;
    priority?: boolean;
    aspect?: 'landscape' | 'compact';
    className?: string;
}

function EditorialMedia({
    image,
    priority = false,
    aspect = 'landscape',
    className,
}: EditorialMediaProps) {
    return (
        <figure className={cn('group', className)}>
            <div
                className={cn(
                    'relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-slate-100 shadow-[0_24px_70px_-32px_rgba(15,23,42,0.45)]',
                    aspect === 'landscape' ? 'aspect-[3/2]' : 'aspect-[4/3]',
                )}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={priority}
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                    style={{ objectPosition: image.objectPosition ?? 'center' }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-white/5" />
            </div>
            <figcaption className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-500">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                {image.caption}
            </figcaption>
        </figure>
    );
}

export { EditorialMedia, type EditorialMediaProps };
```

- [ ] **Step 3: Extend `Hero` without changing existing consumers**

Add to `HeroProps`:

```ts
editorialImage?: EditorialImageData;
```

Import `EditorialMedia` and `EditorialImageData`, then add `editorialImage` to the function destructuring. Extract the current badge, `h1`, subtitle, children, and stats into a single `heroContent` variable. Replace only the current content wrapper inside `Container` with this exact branch:

```tsx
{editorialImage ? (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:gap-16">
        <div className="max-w-3xl text-left">{heroContent}</div>
        <EditorialMedia image={editorialImage} priority />
    </div>
) : (
    <div className={cn('relative', centered ? 'mx-auto max-w-4xl text-center' : 'max-w-3xl')}>
        {heroContent}
    </div>
)}
```

Keep floating cards, the optional low-opacity legacy `image`, the section background, and footer outside this branch. The extracted `heroContent` must contain the original elements verbatim so default consumers do not change, and the `h1` exists only once in the JSX tree.

- [ ] **Step 4: Export the component and types**

Add to `src/components/sections/index.ts`:

```ts
export { EditorialMedia, type EditorialMediaProps } from './EditorialMedia';
```

- [ ] **Step 5: Run focused checks**

Run: `npm.cmd run site:visual-test`

Expected: registry and component tests pass; page-integration test still fails.

Run: `npm.cmd run lint`

Expected: PASS.

- [ ] **Step 6: Commit the visual system**

```powershell
git add src/content/mainPageImages.ts src/components/sections/EditorialMedia.tsx src/components/sections/Hero.tsx src/components/sections/index.ts
git commit -m "feat: add editorial imagery system"
```

### Task 4: Integrate three images on Home

**Files:**
- Modify: `src/app/(site)/page.tsx`

- [ ] **Step 1: Import the registry and media component**

Import `EditorialMedia` from `@/components/sections` and `mainPageImages` from `@/content/mainPageImages`.

- [ ] **Step 2: Convert the hero to the photographic variant**

Pass `editorialImage={mainPageImages.home.hero}` and `centered={false}` to the existing `Hero`. Preserve its badge, title, subtitle, CTA, tracking events, trust note, and footer.

- [ ] **Step 3: Add the two body photographs**

Pass these nodes to the existing `SplitFeature` blocks:

```tsx
image={<EditorialMedia image={mainPageImages.home.middle} />}
```

for “¿Por qué trabajar con nosotros?”, and:

```tsx
image={<EditorialMedia image={mainPageImages.home.lower} aspect="compact" />}
```

for “¿Primera vez importando?”. Do not alter the surrounding links or claims.

- [ ] **Step 4: Verify and commit Home**

Run: `npm.cmd run site:visual-test`

Expected: only Services, Trade, and About route assertions remain failing.

```powershell
git add "src/app/(site)/page.tsx"
git commit -m "feat: add documentary imagery to home"
```

### Task 5: Integrate three images on Services

**Files:**
- Modify: `src/app/(site)/servicios/page.tsx`

- [ ] **Step 1: Add photographic hero**

Import `EditorialMedia`, `SplitFeature`, and `mainPageImages`; pass `editorialImage={mainPageImages.services.hero}` and `centered={false}` to `Hero`.

- [ ] **Step 2: Add the document-review narrative before the service map**

Insert a `SplitFeature` before `HubCards`:

```tsx
<SplitFeature
    title="Una operación ordenada empieza antes del despacho"
    description="Revisamos la información comercial y aduanera para identificar requisitos, documentos y próximos pasos antes de coordinar la ejecución."
    imageSide="right"
    image={<EditorialMedia image={mainPageImages.services.middle} />}
/>
```

- [ ] **Step 3: Add the continuity narrative after the service map**

Insert a second `SplitFeature` after `HubCards`:

```tsx
<SplitFeature
    title="Cada etapa conversa con la siguiente"
    description="Conectamos la coordinación internacional, el despacho y la entrega local para que tengas un punto de contacto y una secuencia operativa clara."
    imageSide="left"
    image={<EditorialMedia image={mainPageImages.services.lower} aspect="compact" />}
/>
```

- [ ] **Step 4: Verify and commit Services**

Run: `npm.cmd run site:visual-test`

Expected: only Trade and About route assertions remain failing.

```powershell
git add "src/app/(site)/servicios/page.tsx"
git commit -m "feat: add documentary imagery to services"
```

### Task 6: Integrate three images on Comercio Exterior

**Files:**
- Modify: `src/app/(site)/comercio-exterior/page.tsx`

- [ ] **Step 1: Add photographic hero**

Import `EditorialMedia`, `SplitFeature`, and `mainPageImages`; pass `editorialImage={mainPageImages.trade.hero}` and `centered={false}` to `Hero`.

- [ ] **Step 2: Add the planning narrative before categories**

Insert:

```tsx
<SplitFeature
    title="Primero entiende tu operación"
    description="Origen, producto, valor, permisos y modalidad de transporte cambian las decisiones. Nuestras guías te ayudan a ordenar esas variables antes de cotizar."
    imageSide="right"
    image={<EditorialMedia image={mainPageImages.trade.middle} />}
/>
```

- [ ] **Step 3: Add the tools narrative before the existing utilities section**

Insert:

```tsx
<SplitFeature
    title="Convierte información en una decisión práctica"
    description="Usa calculadoras, comparativas y guías como punto de partida; cuando el caso lo requiera, revisamos contigo los datos concretos de la operación."
    imageSide="left"
    image={<EditorialMedia image={mainPageImages.trade.lower} aspect="compact" />}
/>
```

- [ ] **Step 4: Verify and commit Comercio Exterior**

Run: `npm.cmd run site:visual-test`

Expected: only About route assertions remain failing.

```powershell
git add "src/app/(site)/comercio-exterior/page.tsx"
git commit -m "feat: add documentary imagery to trade hub"
```

### Task 7: Integrate three images on Quiénes Somos

**Files:**
- Modify: `src/app/(site)/quienes-somos/page.tsx`

- [ ] **Step 1: Add photographic hero**

Import `EditorialMedia` and `mainPageImages`; pass `editorialImage={mainPageImages.about.hero}` and `centered={false}` to `Hero`.

- [ ] **Step 2: Add the middle photograph to “Nuestra Historia”**

Pass:

```tsx
image={<EditorialMedia image={mainPageImages.about.middle} />}
```

Keep the existing quotation as children and retain `imageSide="right"`.

- [ ] **Step 3: Add the lower photograph to “¿Por qué somos diferentes?”**

Pass:

```tsx
image={<EditorialMedia image={mainPageImages.about.lower} aspect="compact" />}
```

Keep the existing list and `imageSide="left"`. Leave the Mission block on the existing abstract visual so the page does not become a continuous photo gallery.

- [ ] **Step 4: Verify and commit Quiénes Somos**

Run: `npm.cmd run site:visual-test`

Expected: 5 tests pass, 0 fail.

```powershell
git add "src/app/(site)/quienes-somos/page.tsx"
git commit -m "feat: add documentary imagery to about page"
```

### Task 8: Complete automated and visual verification

**Files:**
- Modify only if verification reveals a scoped defect in files already listed above.

- [ ] **Step 1: Run the complete automated suite**

Run sequentially:

```powershell
npm.cmd run site:visual-test
npm.cmd run ads:test
npm.cmd run seo:test
npm.cmd run lint
npm.cmd run build
```

Expected: visual 5/5, Ads 5/5, SEO 31/31, lint exit 0, build exit 0 with all four principal routes generated.

- [ ] **Step 2: Start an isolated local server**

Run the production build on a free port different from existing servers, for example:

```powershell
npm.cmd run start -- -p 3020
```

Expected routes:

- `http://localhost:3020/`
- `http://localhost:3020/servicios/`
- `http://localhost:3020/comercio-exterior/`
- `http://localhost:3020/quienes-somos/`

- [ ] **Step 3: Inspect desktop and mobile**

For every route, verify at approximately 1440 px and 390 px:

- All three images load and are visually distinct.
- Hero subject remains visible after responsive cropping.
- Body images alternate naturally and captions remain legible.
- Exactly one `h1` exists.
- `document.documentElement.scrollWidth <= window.innerWidth`.
- No browser console errors or image warnings.
- Existing CTA links and WhatsApp actions remain present.

- [ ] **Step 4: Confirm Git scope and commit any verification fixes**

Run:

```powershell
git diff --check
git status --short
git log --oneline --decorate -8
```

If a verification fix was required, stage only the affected scoped files and commit:

```powershell
git commit -m "fix: polish documentary page layouts"
```

Expected: clean worktree and no unrelated files in the feature history.
