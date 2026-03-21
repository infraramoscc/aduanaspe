# Skills Index

Este indice sirve como puerta de entrada antes de ejecutar tareas de marketing, CRO, SEO, contenido, growth o diseno en este workspace.

## Regla de uso

Antes de empezar una tarea:

1. Leer este indice.
2. Detectar la categoria y las senales de la tarea.
3. Elegir el conjunto minimo de skills aplicables.
4. Abrir el `SKILL.md` de cada skill elegida en `.agents/skills/<skill>/SKILL.md`.
5. Si la tarea pertenece a un proyecto nuevo o falta contexto base, revisar primero `product-marketing-context`.

## Heuristica rapida

- Si el usuario pide estrategia general o no sabe por donde empezar, revisar `marketing-ideas`.
- Si el usuario necesita definir producto, ICP, posicionamiento o mensajes base, revisar `product-marketing-context`.
- Si el usuario pide copy, revisar `copywriting` o `copy-editing` segun parta de cero o desde texto existente.
- Si el usuario pide conversion, revisar primero la skill CRO mas especifica antes de usar una general.
- Si el usuario pide SEO, empezar por `seo-audit` salvo que ya sea claro que necesita `programmatic-seo`, `schema-markup` o `ai-seo`.
- Si el usuario pide una interfaz o una pagina, revisar `frontend-design`; si pide auditoria UX/UI o accesibilidad, revisar `web-design-guidelines`.
- Si el usuario compara variantes o pregunta que version rinde mejor, revisar `ab-test-setup`.
- Si el usuario pregunta como medir o atribuir resultados, revisar `analytics-tracking`.

## Mapa de seleccion

| Skill | Usar cuando | Combinar con |
| --- | --- | --- |
| `product-marketing-context` | Hay que definir producto, audiencia, ICP, posicionamiento o contexto reusable. | `copywriting`, `content-strategy`, `paid-ads`, `launch-strategy` |
| `marketing-ideas` | El usuario quiere ideas, canales o prioridades de crecimiento. | `content-strategy`, `paid-ads`, `social-content`, `launch-strategy` |
| `marketing-psychology` | Quiere aplicar persuasion, sesgos o behavioral science al mensaje o funnel. | `copywriting`, `page-cro`, `pricing-strategy`, `paywall-upgrade-cro` |
| `content-strategy` | Necesita definir que contenidos crear, clusters o roadmap editorial. | `copywriting`, `social-content`, `programmatic-seo`, `seo-audit` |
| `copywriting` | Hay que escribir o reescribir copy de pagina, hero, CTA o propuesta de valor. | `copy-editing`, `page-cro`, `popup-cro`, `email-sequence` |
| `copy-editing` | Ya existe texto y hay que pulirlo, acortarlo o mejorarlo. | `copywriting`, `marketing-psychology` |
| `sales-enablement` | Necesita decks, one-pagers, objection handling o guiones de demo. | `competitor-alternatives`, `copywriting`, `cold-email` |
| `cold-email` | Necesita emails outbound B2B o secuencias de follow-up. | `sales-enablement`, `revops`, `email-sequence` |
| `email-sequence` | Quiere una secuencia automatizada, nurture, onboarding o win-back. | `copywriting`, `onboarding-cro`, `churn-prevention` |
| `social-content` | Quiere posts, hilos, calendarios o repurposing para redes sociales. | `content-strategy`, `launch-strategy` |
| `ad-creative` | Necesita headlines, primary text o muchas variantes de anuncios. | `paid-ads`, `copywriting`, `ab-test-setup` |
| `paid-ads` | Quiere estrategia, targeting, presupuesto o optimizacion de campañas PPC. | `ad-creative`, `page-cro`, `analytics-tracking` |
| `launch-strategy` | Va a lanzar producto, feature, beta o anuncio publico. | `marketing-ideas`, `social-content`, `email-sequence`, `sales-enablement` |
| `lead-magnets` | Quiere crear o mejorar un recurso para captar leads. | `copywriting`, `form-cro`, `popup-cro`, `email-sequence` |
| `free-tool-strategy` | Quiere un tool, calculator, grader o generator como growth asset. | `programmatic-seo`, `lead-magnets`, `frontend-design` |
| `competitor-alternatives` | Quiere paginas tipo alternative, vs, comparison o battlecards. | `sales-enablement`, `seo-audit`, `copywriting` |
| `revops` | Quiere definir lifecycle, scoring, routing, handoff o automatizaciones CRM. | `analytics-tracking`, `cold-email`, `email-sequence` |
| `referral-program` | Quiere referral, affiliate o loops de word of mouth. | `launch-strategy`, `pricing-strategy`, `analytics-tracking` |
| `pricing-strategy` | Hay que definir precios, tiers, valor metrica o packaging. | `paywall-upgrade-cro`, `marketing-psychology`, `page-cro` |
| `page-cro` | Quiere mejorar conversion de homepage, landing, pricing o feature page. | `copywriting`, `ab-test-setup`, `analytics-tracking` |
| `popup-cro` | Quiere optimizar popups, modals, overlays o banners. | `copywriting`, `form-cro`, `page-cro` |
| `form-cro` | Quiere optimizar formularios de contacto, demo, encuesta o checkout. | `popup-cro`, `analytics-tracking`, `page-cro` |
| `signup-flow-cro` | Quiere mejorar registro, trial signup o account creation. | `onboarding-cro`, `analytics-tracking`, `ab-test-setup` |
| `onboarding-cro` | Quiere mejorar activacion, first-run, checklist o time-to-value. | `signup-flow-cro`, `email-sequence`, `analytics-tracking` |
| `paywall-upgrade-cro` | Quiere mejorar upgrade prompts, paywalls o gates in-app. | `pricing-strategy`, `marketing-psychology`, `ab-test-setup` |
| `churn-prevention` | Quiere reducir cancelaciones, dunning o crear save offers. | `email-sequence`, `paywall-upgrade-cro`, `ab-test-setup` |
| `ab-test-setup` | Quiere planear experimentos, hipotesis, variantes o sample size. | `analytics-tracking`, `page-cro`, `ad-creative` |
| `analytics-tracking` | Quiere medir, atribuir, instrumentar eventos o validar tracking. | `ab-test-setup`, `paid-ads`, `revops`, `onboarding-cro` |
| `seo-audit` | Quiere diagnosticar problemas SEO tecnicos u on-page. | `schema-markup`, `ai-seo`, `programmatic-seo` |
| `schema-markup` | Quiere agregar o corregir JSON-LD y rich results. | `seo-audit`, `ai-seo` |
| `ai-seo` | Quiere aparecer en AI Overviews o respuestas de LLMs. | `schema-markup`, `content-strategy`, `seo-audit` |
| `programmatic-seo` | Quiere crear muchas paginas SEO con plantillas y datos. | `content-strategy`, `site-architecture`, `competitor-alternatives` |
| `site-architecture` | Quiere definir sitemap, jerarquia, navegacion o linking interno. | `seo-audit`, `programmatic-seo`, `content-strategy` |
| `frontend-design` | Hay que construir o estilizar UI, landing, componentes o layouts. | `copywriting`, `page-cro`, `web-design-guidelines` |
| `web-design-guidelines` | Quiere review UX/UI, accesibilidad o mejores practicas de interfaz. | `frontend-design`, `page-cro`, `signup-flow-cro` |

## Reglas de prioridad

- Preferir la skill mas especifica antes que una skill general.
- Combinar skills solo si agregan valor real; evitar mezclar demasiadas.
- Si la tarea es de ejecucion y de revision a la vez, usar primero la skill de construccion y luego la de review.
- Si la tarea tiene ambiguedad entre estrategia y ejecucion, resolver primero contexto con `product-marketing-context` o `marketing-ideas`.
- Si la tarea es nueva pero pide resultados medibles, agregar `analytics-tracking` o `ab-test-setup` segun corresponda.

## Casos comunes

- Landing page nueva: `product-marketing-context` -> `copywriting` -> `frontend-design` -> `page-cro`
- Auditoria de pagina con baja conversion: `page-cro` -> `copywriting` -> `ab-test-setup` -> `analytics-tracking`
- Lanzamiento de feature: `launch-strategy` -> `email-sequence` -> `social-content` -> `sales-enablement`
- SEO tecnico: `seo-audit` -> `schema-markup`
- SEO a escala: `programmatic-seo` -> `site-architecture` -> `copywriting`
- Mejora de trial o signup: `signup-flow-cro` -> `onboarding-cro` -> `analytics-tracking`
- Ads nuevos: `paid-ads` -> `ad-creative` -> `page-cro` -> `analytics-tracking`
- Retencion y cancelacion: `churn-prevention` -> `email-sequence` -> `ab-test-setup`

## Alcance

Este indice resume las skills locales del repo y esta pensado para consulta rapida. La ejecucion real de una skill siempre debe apoyarse en su `SKILL.md` y, cuando exista, en sus `references/`.
