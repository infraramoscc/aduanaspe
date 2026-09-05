import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const hub = 'src/app/(site)/comercio-exterior/acuerdos-comerciales/page.tsx';

test('the agreements hub connects learners to real blog articles without broken anchors', () => {
    assert.ok(fs.existsSync(path.join(root, hub)), 'The learning hub route must exist');
    const source = fs.readFileSync(path.join(root, hub), 'utf8');
    const links = [...source.matchAll(/['"](\/blog\/[^'"#]+\/)['"]/g)].map((match) => match[1]);
    assert.ok(links.length > 0, 'The hub must expose learning resources');
    for (const href of links) {
        const slug = href.split('/')[2];
        assert.ok(fs.existsSync(path.join(root, 'src/content/blog', `${slug}.mdx`)), `Missing article: ${href}`);
    }
    for (const match of source.matchAll(/href="#([^"]+)"/g)) {
        assert.ok(source.includes(`id="${match[1]}"`), `Missing hub section: ${match[1]}`);
    }
});
