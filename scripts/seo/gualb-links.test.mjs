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
