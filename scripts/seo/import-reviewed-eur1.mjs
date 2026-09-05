// Mechanical migration of the reviewed source; no editorial rewriting.
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';

const doc = new JSDOM(fs.readFileSync('docs/docs_recursos/articulo_EUR1.html', 'utf8')).window.document;
const article = doc.querySelector('article');
const title = article.querySelector('h1').textContent;
const description = doc.querySelector('meta[name="description"]').content;
article.querySelector('h1').remove();
article.querySelector('.toc').remove();
article.querySelectorAll('.num').forEach(node => node.remove());
fs.mkdirSync('public/images/blog/eur1', {recursive:true});
let imageIndex = 0;
for (const img of article.querySelectorAll('img')) {
    const data = /^data:image\/png;base64,([\s\S]+)$/.exec(img.src);
    if (!data) throw new Error('Unexpected source image');
    const bytes = Buffer.from(data[1], 'base64');
    const name = imageIndex++ === 0 ? 'formulario-completo.png' : `casilla-${String(imageIndex-1).padStart(2,'0')}.png`;
    fs.writeFileSync(`public/images/blog/eur1/${name}`,bytes);
    const {width,height} = await sharp(bytes).metadata();
    img.dataset.component = `<DocumentImage src="/images/blog/eur1/${name}" alt=${JSON.stringify(img.alt)} width="${width}" height="${height}" />`;
}
function convert(node) {
    if(node.nodeType===3) return node.textContent.replace(/\s+/g,' ').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/{/g,'&#123;').replace(/}/g,'&#125;');
    if(node.nodeType!==1) return '';
    const children=()=>[...node.childNodes].map(convert).join('');
    const tag=node.tagName.toLowerCase();
    if(tag==='img') return `\n\n${node.dataset.component}\n\n`;
    // Repeated review labels belong to their casilla, not to duplicate TOC anchors.
    if(tag==='h3' && node.textContent.trim()==='Qué debes revisar antes del despacho')return `\n\n**${children().trim()}**\n\n`;
    if(/^h[2-6]$/.test(tag))return `\n\n${'#'.repeat(Number(tag[1]))} ${children().trim()}\n\n`;
    if(tag==='strong'||tag==='b')return `**${children().trim()}**`;
    if(tag==='em'||tag==='i')return `*${children().trim()}*`;
    if(tag==='li')return `\n- ${children().trim()}\n`;
    if(tag==='ul'||tag==='ol')return `\n${children()}\n`;
    if(tag==='table') {
        const rows=[...node.querySelectorAll('tr')].map(tr=>[...tr.children].map(cell=>convert(cell).trim().replace(/\n+/g,' ').replace(/\|/g,'&#124;')));
        return `\n\n| ${rows[0].join(' | ')} |\n| ${rows[0].map(()=> '---').join(' | ')} |\n${rows.slice(1).map(row=>`| ${row.join(' | ')} |`).join('\n')}\n\n`;
    }
    if(tag==='br')return ' ';
    if(['p','div','section','header','figure','figcaption'].includes(tag))return `\n\n${children().trim()}\n\n`;
    if(['script','style'].includes(tag))throw new Error('Executable content is not supported');
    return children();
}
const body=convert(article).replace(/\n[ \t]+/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
const frontmatter=`---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\ndate: "2026-09-05"\nauthor: "AduanasPE"\ncategory: "Comercio Exterior"\ntopic: "comercio-exterior"\ntags: ["EUR.1", "Unión Europea", "certificado de origen", "importación"]\nimage: ""\nimageAlt: ""\nfeatured: false\n---`;
fs.writeFileSync('src/content/blog/certificado-eur1-union-europea-peru.mdx',`${frontmatter}\n\n${body}\n\n<div data-integration-navigation="true">\n\n[Volver al centro de acuerdos comerciales](/comercio-exterior/acuerdos-comerciales/) · [Contactarnos](/contacto/)\n\n</div>\n`,'utf8');
console.log(`Converted reviewed article and extracted ${imageIndex} original PNG images.`);
