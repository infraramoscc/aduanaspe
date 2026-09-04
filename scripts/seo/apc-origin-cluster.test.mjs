import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const officialApcUrl = 'https://www.acuerdoscomerciales.gob.pe/En_Vigencia/EEUU/inicio.html';
const hubSlug = 'reglas-origen-tlc-peru-estados-unidos';
const tutorialSlug = 'llenar-certificado-origen-peru-estados-unidos';
const serviceCtaDetectorUrl = new URL('../../src/lib/blog/mdx-content.mjs', import.meta.url);

async function loadServiceCtaDetector() {
    try {
        const detectorModule = await import(serviceCtaDetectorUrl);
        assert.equal(typeof detectorModule.hasServiceCtaOutsideFencedCode, 'function');
        return detectorModule.hasServiceCtaOutsideFencedCode;
    } catch (error) {
        assert.fail(`Unable to load the ServiceCTA detector: ${error.message}`);
    }
}

const articles = [
    {
        file: 'src/content/blog/reglas-origen-tlc-peru-estados-unidos.mdx',
        title: 'Reglas de origen del TLC Perú-Estados Unidos: guía práctica',
        headings: [
            'Origen, procedencia y país de compra no significan lo mismo',
            'Los tres criterios de origen del APC',
            'Cómo analizar el origen paso a paso',
            'Casos prácticos de reglas de origen',
            'Preguntas frecuentes',
        ],
    },
    {
        file: 'src/content/blog/exportar-estados-unidos-tlc-reglas-origen.mdx',
        title: 'Exportar a Estados Unidos con el TLC: reglas de origen y certificación',
        headings: [
            'Qué debe confirmar el exportador antes de ofrecer la preferencia',
            'Qué debe contener la certificación de origen',
            'Documentos que debe conservar la empresa',
            'Casos prácticos para exportadores peruanos',
            'Preguntas frecuentes',
        ],
    },
    {
        file: 'src/content/blog/importar-estados-unidos-peru-tlc-certificado-origen.mdx',
        title: 'Importar de Estados Unidos a Perú con el TLC: origen y certificado',
        headings: [
            'Comprar en Estados Unidos no demuestra origen estadounidense',
            'Qué pedir al proveedor antes de pagar',
            'Cómo revisar la certificación antes del despacho',
            'Casos prácticos para importadores peruanos',
            'Preguntas frecuentes',
        ],
    },
    {
        file: 'src/content/blog/llenar-certificado-origen-peru-estados-unidos.mdx',
        title: 'Cómo llenar el certificado de origen Perú-Estados Unidos',
        headings: [
            'Antes de llenar el certificado',
            'Cómo llenar los campos 1 al 11',
            'Ejemplos de certificados según el criterio de origen',
            'Errores frecuentes al completar el formato',
            'Preguntas frecuentes',
        ],
    },
];

function escaped(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

for (const article of articles) {
    test(`${article.file} fulfills the APC origin article contract`, async () => {
        const content = await readFile(article.file, 'utf8');

        assert.match(content, new RegExp(`^title: "${escaped(article.title)}"$`, 'm'));
        assert.match(content, /^updatedAt: "2026-09-04"$/m);
        for (const heading of article.headings) {
            assert.match(content, new RegExp(`^## ${escaped(heading)}$`, 'm'));
        }
        assert.match(content, /<FaqGroup\b/);
        assert.match(content, /<ServiceCTA topic="consultoria"\s*\/>/);
        assert.match(content, new RegExp(escaped(officialApcUrl)));
    });
}

test('the APC origin hub links to all three satellite articles', async () => {
    const content = await readFile('src/content/blog/reglas-origen-tlc-peru-estados-unidos.mdx', 'utf8');

    for (const slug of [
        'exportar-estados-unidos-tlc-reglas-origen',
        'importar-estados-unidos-peru-tlc-certificado-origen',
        tutorialSlug,
    ]) {
        assert.match(content, new RegExp(`\\]\\(/blog/${escaped(slug)}/\\)`));
    }
});

test('the ServiceCTA detector recognizes a real component tag', async () => {
    const hasServiceCta = await loadServiceCtaDetector();

    assert.equal(hasServiceCta('<ServiceCTA topic="consultoria" />'), true);
});

test('the ServiceCTA detector rejects longer component names', async () => {
    const hasServiceCta = await loadServiceCtaDetector();

    assert.equal(hasServiceCta('<ServiceCTAFake topic="consultoria" />'), false);
});

test('the ServiceCTA detector ignores tags inside fenced code', async () => {
    const hasServiceCta = await loadServiceCtaDetector();

    assert.equal(hasServiceCta('```mdx\n<ServiceCTA topic="consultoria" />\n```'), false);
    assert.equal(hasServiceCta('~~~mdx\n<ServiceCTA topic="consultoria" />\n~~~'), false);
    assert.equal(
        hasServiceCta('```mdx\n```not-a-closing-fence\n<ServiceCTA topic="consultoria" />\n```'),
        false,
    );
});

test('the ServiceCTA detector ignores tags inside inline code spans', async () => {
    const hasServiceCta = await loadServiceCtaDetector();

    assert.equal(hasServiceCta('Ejemplo: `<ServiceCTA topic="consultoria" />`.'), false);
    assert.equal(hasServiceCta('Ejemplo: ``<ServiceCTA topic="consultoria" />``.'), false);
    assert.equal(hasServiceCta('Ejemplo: ```<ServiceCTA topic="consultoria" />```.'), false);
    assert.equal(
        hasServiceCta('`<ServiceCTA topic="consultoria" />`\n<ServiceCTA topic="consultoria" />'),
        true,
    );
});

test('the ServiceCTA detector ignores tags inside MDX comments', async () => {
    const hasServiceCta = await loadServiceCtaDetector();

    assert.equal(hasServiceCta('{/* <ServiceCTA topic="consultoria" /> */}'), false);
    assert.equal(hasServiceCta('{/*\n<ServiceCTA topic="consultoria" />\n*/}'), false);
});

test('the ServiceCTA detector ignores tags inside HTML comments', async () => {
    const hasServiceCta = await loadServiceCtaDetector();

    assert.equal(hasServiceCta('<!-- <ServiceCTA topic="consultoria" /> -->'), false);
    assert.equal(hasServiceCta('<!--\n<ServiceCTA topic="consultoria" />\n-->'), false);
});

test('the ServiceCTA detector treats null raw content as no inline CTA', async () => {
    const hasServiceCta = await loadServiceCtaDetector();

    assert.equal(hasServiceCta(null), false);
});

test('the blog page suppresses its footer CTA only when the detector finds one', async () => {
    const page = await readFile('src/app/(site)/blog/[slug]/page.tsx', 'utf8');

    assert.match(
        page,
        /import \{ hasServiceCtaOutsideFencedCode \} from '@\/lib\/blog\/mdx-content\.mjs';/,
    );
    assert.match(
        page,
        /const hasInlineServiceCta = hasServiceCtaOutsideFencedCode\(rawContent\);/,
    );
    assert.match(
        page,
        /\{!hasInlineServiceCta && \(\s*<div[^>]*>\s*<ServiceCTA topic=\{post\.topic\} position="footer" \/>\s*<\/div>\s*\)\}/,
    );
});

test('the blog page suppresses its inline lead form when the article has a ServiceCTA', async () => {
    const page = await readFile('src/app/(site)/blog/[slug]/page.tsx', 'utf8');

    assert.match(
        page,
        /const showInlineLeadForm = !hasInlineServiceCta && Boolean\(topicMapping\?\.showInlineForm \|\| topicMapping\?\.temperature === 'caliente'\);/,
    );
});

test('the certificate tutorial contains all required fields and guidance', async () => {
    const content = await readFile(`src/content/blog/${tutorialSlug}.mdx`, 'utf8');

    for (let field = 1; field <= 11; field += 1) {
        assert.match(content, new RegExp(`^### Campo ${field}$`, 'm'));
    }
    for (const criterion of ['4.1(a)', '4.1(b)', '4.1(c)']) {
        assert.match(content, new RegExp(escaped(criterion)));
    }
    assert.match(content, /máximo de 12 meses/i);
    assert.match(content, /código `PE`/i);
    assert.match(content, /no existe un formato único obligatorio/i);
});

test('field 10 distinguishes the basic declaration from conditional transit statements', async () => {
    const content = await readFile(`src/content/blog/${tutorialSlug}.mdx`, 'utf8');
    const fieldTen = content.match(/^### Campo 10$([\s\S]*?)(?=^### Campo 11$)/m)?.[1] ?? '';

    assert.match(fieldTen, /declaración básica de quien firma/i);
    assert.match(fieldTen, /cuando el formato o procedimiento aplicable lo exija/i);
    assert.match(fieldTen, /especialmente si certifica el importador/i);
});

test('the export guide links the CBP reference and covers exporter evidence', async () => {
    const content = await readFile('src/content/blog/exportar-estados-unidos-tlc-reglas-origen.mdx', 'utf8');

    assert.match(content, /https:\/\/www\.cbp\.gov\/trade\/free-trade-agreements\/peru/);
    for (const phrase of ['lista de materiales', 'valor de contenido regional', 'cinco años', 'control aduanero']) {
        assert.match(content, new RegExp(escaped(phrase), 'i'));
    }
});

test('the existing export certificate article is updated and points to the cluster', async () => {
    const content = await readFile('src/content/blog/certificado-origen-exportacion-peru.mdx', 'utf8');

    assert.match(content, /^updatedAt: "2026-09-04"$/m);
    assert.match(content, new RegExp(`\\]\\(/blog/${hubSlug}/\\)`));
    assert.match(content, new RegExp(`\\]\\(/blog/${tutorialSlug}/\\)`));
});

test('SEO content map and source registry contain the APC origin cluster', async () => {
    const contentMap = await readFile('docs/seo_content_map.csv', 'utf8');
    const sourceRegistry = await readFile('docs/docs_recursos/registro_fuentes_blog.csv', 'utf8');

    for (const { file } of articles) {
        const slug = file.split('/').pop().replace('.mdx', '');
        assert.match(contentMap, new RegExp(`"${escaped(slug)}"`));
        assert.match(sourceRegistry, new RegExp(`"${escaped(slug)}"`));
    }
    assert.match(sourceRegistry, /05-manual-sobre-reglas-de-origen-del-apc-peru-ee-uu\.pdf/);
    assert.match(sourceRegistry, /06-certificado-origen-exportacion-peru-eeuu-formato\.doc/);
});
