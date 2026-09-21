import { writeFileSync } from 'node:fs';

const [wsUrl, pageUrl, widthText, heightText, outputPath] = process.argv.slice(2);
const width = Number(widthText);
const height = Number(heightText);

if (!wsUrl || !pageUrl || !width || !height || !outputPath) {
    throw new Error('Usage: node responsive-browser-audit.mjs <ws-url> <page-url> <width> <height> <output.png>');
}

const socket = new WebSocket(wsUrl);
const pending = new Map();
let nextId = 1;

socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
});

await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
});

const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
});

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 600,
});
await send('Page.navigate', { url: pageUrl });
await new Promise(resolve => setTimeout(resolve, 1800));

const evaluation = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `JSON.stringify({
        url: location.href,
        viewport: { width: innerWidth, height: innerHeight },
        document: {
            scrollWidth: document.documentElement.scrollWidth,
            scrollHeight: document.documentElement.scrollHeight,
            hasHorizontalOverflow: document.documentElement.scrollWidth > innerWidth
        },
        currentService: document.querySelector('[aria-current="page"]')?.textContent?.trim() || null,
        heading: document.querySelector('h1')?.textContent?.trim() || null
    })`,
});

const screenshot = await send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false,
});
writeFileSync(outputPath, Buffer.from(screenshot.data, 'base64'));
console.log(evaluation.result.value);
socket.close();
