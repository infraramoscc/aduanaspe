const TYPE_LABELS = {
    traffic_drop: 'Caida de trafico',
    low_ctr: 'CTR bajo',
    striking_distance: 'Cerca del top',
    new_query: 'Consulta nueva',
    cannibalization: 'Posible canibalizacion',
    winner: 'Ganador',
};

function integer(value) {
    return new Intl.NumberFormat('es-PE', {
        maximumFractionDigits: 0,
    }).format(value || 0);
}

function percent(value) {
    return `${((value || 0) * 100).toFixed(2)}%`;
}

function decimal(value) {
    return Number(value || 0).toFixed(2);
}

function escapeCell(value) {
    return String(value ?? '-').replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function metricLine(metric) {
    if (!metric) return 'Sin datos anteriores.';
    return [
        `${integer(metric.clicks)} clics`,
        `${integer(metric.impressions)} impresiones`,
        `${percent(metric.ctr)} CTR`,
        `posicion ${decimal(metric.position)}`,
    ].join(', ');
}

function renderQueries(queries) {
    if (!queries?.length) return '_Sin consultas relacionadas en la muestra._';

    return [
        '| Consulta | Clics | Impresiones | Posicion |',
        '|---|---:|---:|---:|',
        ...queries.map((query) => [
            `| ${escapeCell(query.query)}`,
            integer(query.clicks),
            integer(query.impressions),
            `${decimal(query.position)} |`,
        ].join(' | ')),
    ].join('\n');
}

function renderOpportunity(item, index) {
    const target = item.url
        ? `[${item.url}](${item.url})`
        : item.urls?.map((url) => `[${url}](${url})`).join('<br>') || '-';
    const query = item.query ? `\n\n**Consulta:** \`${item.query}\`` : '';

    return [
        `### ${index + 1}. ${TYPE_LABELS[item.type] || item.type}`,
        '',
        `**Pagina:** ${target}${query}`,
        '',
        `**Periodo actual:** ${metricLine(item.current)}`,
        '',
        `**Periodo anterior:** ${metricLine(item.previous)}`,
        '',
        `**Motivo:** ${item.reason}`,
        '',
        `**Accion sugerida:** ${item.action}`,
        '',
        renderQueries(item.relatedQueries),
    ].join('\n');
}

export function renderSeoReport({
    windows,
    analysis,
    reportMonth = windows.current.endDate.slice(0, 7),
}) {
    const lines = [
        `# SEO mensual: ${reportMonth}`,
        '',
        `- **Periodo actual:** ${windows.current.startDate} a ${windows.current.endDate}`,
        `- **Comparacion:** ${windows.previous.startDate} a ${windows.previous.endDate}`,
        '- **Fuente:** Google Search Console, busqueda web, datos finalizados',
        '',
        '## Resumen',
        '',
        '| Periodo | Clics | Impresiones | CTR |',
        '|---|---:|---:|---:|',
        `| Actual | ${integer(analysis.summary.current.clicks)} | ${integer(analysis.summary.current.impressions)} | ${percent(analysis.summary.current.ctr)} |`,
        `| Anterior | ${integer(analysis.summary.previous.clicks)} | ${integer(analysis.summary.previous.impressions)} | ${percent(analysis.summary.previous.ctr)} |`,
        '',
        '## Oportunidades priorizadas',
        '',
    ];

    if (analysis.opportunities.length === 0) {
        lines.push('No se detectaron oportunidades con los umbrales actuales.');
    } else {
        lines.push(
            ...analysis.opportunities.map((item, index) => renderOpportunity(item, index))
        );
    }

    lines.push('', '## Paginas en observacion', '');
    if (analysis.watching.length === 0) {
        lines.push('No hay paginas dentro de la cuarentena editorial de 28 dias.');
    } else {
        lines.push(
            '| Pagina | Rendimiento actual |',
            '|---|---|',
            ...analysis.watching.map((item) => (
                `| [${escapeCell(item.url)}](${item.url}) | ${metricLine(item.current)} |`
            ))
        );
    }

    lines.push(
        '',
        '## Siguiente paso',
        '',
        'Revisar cada recomendacion contra el articulo y la intencion de busqueda antes de editar. Registrar los cambios aprobados en `docs/seo_tracking/seo_log.json`.',
        ''
    );

    return lines.join('\n');
}
