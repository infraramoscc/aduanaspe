const SERVICE_CTA_TAG_PATTERN = /<ServiceCTA(?=[\s/>])/;
const FENCE_PATTERN = /^\s*(`{3,}|~{3,})/;

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

    return SERVICE_CTA_TAG_PATTERN.test(visibleLines.join('\n'));
}
