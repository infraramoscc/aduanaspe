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
