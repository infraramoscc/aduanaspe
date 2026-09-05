import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { compileMDX } from 'next-mdx-remote/rsc';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';

const file = 'src/content/blog/certificado-eur1-union-europea-peru.mdx';
const normalize = text => text.normalize('NFC').replace(/\s+/g, '');
test('EUR.1 preserves the reviewed text and all original image bytes', async () => {
    assert.ok(fs.existsSync(file), 'Reviewed EUR.1 article must exist');
    const original = new JSDOM(fs.readFileSync('docs/docs_recursos/articulo_EUR1.html', 'utf8')).window.document;
    const article = original.querySelector('article');
    const title = article.querySelector('h1').textContent;
    article.querySelector('.toc').remove();
    article.querySelector('h1').remove();
    article.querySelectorAll('.num').forEach(node => node.remove());
    const parsed = matter(fs.readFileSync(file, 'utf8'));
    assert.equal(parsed.data.title, title);
    const {content} = await compileMDX({source:parsed.content, options:{mdxOptions:{remarkPlugins:[remarkGfm]}}, components:{DocumentImage:props=>createElement('img',props)}});
    const rendered = new JSDOM(renderToStaticMarkup(content)).window.document;
    rendered.querySelector('[data-integration-navigation]').remove();
    assert.equal(normalize(rendered.body.textContent), normalize(article.textContent), 'Technical copy must stay unchanged');
    const images = [...rendered.querySelectorAll('img')];
    const originals = [...article.querySelectorAll('img')];
    assert.equal(images.length, 13);
    images.forEach((img,index)=>{
        const src=img.getAttribute('src');
        assert.ok(src.startsWith('/images/blog/eur1/'));
        assert.equal(img.alt, originals[index].alt);
        assert.deepEqual(fs.readFileSync(`public${src}`), Buffer.from(originals[index].src.split(',')[1], 'base64'));
        assert.ok(Number(img.getAttribute('width'))>0 && Number(img.getAttribute('height'))>0);
    });
});
