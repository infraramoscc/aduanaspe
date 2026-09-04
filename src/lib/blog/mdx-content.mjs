const SERVICE_CTA_TAG_PATTERN = /<ServiceCTA(?=[\s/>])/;
const FENCE_PATTERN = /^\s*(`{3,}|~{3,})/;
const MDX_COMMENT_PATTERN = /\{\/\*[\s\S]*?\*\/\}/g;
const HTML_COMMENT_PATTERN = /<!--[\s\S]*?-->/g;

function stripInlineCodeSpans(content) {
    let visibleContent = '';
    let visibleStart = 0;
    let cursor = 0;

    while (cursor < content.length) {
        if (content[cursor] !== '`') {
            cursor += 1;
            continue;
        }

        const openingStart = cursor;
        while (content[cursor] === '`') cursor += 1;
        const delimiterLength = cursor - openingStart;
        let closingEnd = null;

        while (cursor < content.length) {
            const nextRunStart = content.indexOf('`', cursor);
            if (nextRunStart === -1) break;

            cursor = nextRunStart;
            while (content[cursor] === '`') cursor += 1;

            if (cursor - nextRunStart === delimiterLength) {
                closingEnd = cursor;
                break;
            }
        }

        if (closingEnd !== null) {
            visibleContent += content.slice(visibleStart, openingStart);
            visibleStart = closingEnd;
        } else {
            cursor = openingStart + delimiterLength;
        }
    }

    return visibleContent + content.slice(visibleStart);
}

/**
 * Detect a real ServiceCTA component tag outside Markdown fenced code blocks.
 *
 * @param {string | null} rawContent
 * @returns {boolean}
 */
export function hasServiceCtaOutsideFencedCode(rawContent) {
    if (!rawContent) return false;

    const visibleLines = [];
    let activeFence = null;

    for (const line of rawContent.split(/\r?\n/)) {
        const fenceMatch = FENCE_PATTERN.exec(line);

        if (fenceMatch) {
            const marker = fenceMatch[1];

            if (!activeFence) {
                activeFence = marker;
            } else if (marker[0] === activeFence[0] && marker.length >= activeFence.length) {
                activeFence = null;
            }

            continue;
        }

        if (!activeFence) visibleLines.push(line);
    }

    const visibleContent = visibleLines
        .join('\n')
        .replace(MDX_COMMENT_PATTERN, '')
        .replace(HTML_COMMENT_PATTERN, '');

    return SERVICE_CTA_TAG_PATTERN.test(stripInlineCodeSpans(visibleContent));
}
