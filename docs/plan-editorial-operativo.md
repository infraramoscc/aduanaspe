# Plan Editorial Operativo del Blog

Fecha: 2026-03-25

Este documento complementa el roadmap vigente en `docs/editorial-roadmap-importadores.md`.
No reemplaza la estrategia. La baja a ejecucion usando el contexto del producto y un flujo de produccion repetible.

## 1. Objetivo operativo

Publicar articulos del blog que atraigan importadores nuevos, ordenen su decision y los deriven al siguiente paso correcto dentro del ecosistema:

`/blog` -> `/comercio-exterior/*` -> `/servicios/*` -> `/contacto`

El objetivo no es publicar por volumen. Es publicar piezas que:

- capturen intencion organica util
- filtren al lector por nivel de madurez
- reduzcan dudas previas al contacto
- empujen a un CTA coherente con la etapa del usuario

## 2. Skills que se usaran en el flujo

### Skills base

- `product-marketing-context`: fija el lenguaje, ICP, objeciones y tono base.
- `content-strategy`: prioriza clusters, buyer stage e interlinking.
- `copywriting`: convierte cada tema en brief y luego en articulo.
- `copy-editing`: elimina relleno, repeticiones y promesas blandas.

### Skills de optimizacion

- `seo-audit`: decide si conviene crear, actualizar o consolidar contenido.
- `ai-seo`: adapta la pieza para AI Overviews y respuestas citables.
- `schema-markup`: define FAQ, Article o Breadcrumb cuando aporte.
- `analytics-tracking`: conecta el articulo con eventos, CTA y leads.

### Skills de distribucion

- `social-content`: extrae piezas para LinkedIn y formatos cortos.
- `email-sequence`: reutiliza los mejores articulos en nurturing.

## 3. Flujo editorial por articulo

Para cada articulo nuevo:

1. Confirmar tema desde el roadmap vigente.
2. Clasificar la pieza por intencion:
   - informativa
   - comercial
   - transaccional
3. Definir un solo CTA principal.
4. Definir el destino correcto:
   - `/comercio-exterior/*` si el lector sigue aprendiendo
   - `/servicios/*` si el lector ya evalua o tiene urgencia
   - `/contacto` solo si el caso ya admite cierre
5. Definir:
   - keyword principal
   - keyword secundaria
   - buyer stage
   - servicio destino
   - 3 articulos internos obligatorios
6. Redactar en MDX con frontmatter valido.
7. Revisar con `copy-editing`.
8. Optimizar con `ai-seo` y `schema-markup` si aplica.
9. Publicar y medir con `analytics-tracking`.

## 4. Regla de mapeo editorial

Como `src/lib/blog/types.ts` tiene un set limitado de `topic`, los nuevos articulos deben usar el topic existente mas cercano para evitar friccion tecnica:

| Tema del articulo | category sugerida | topic sugerido |
|---|---|---|
| valoracion aduanera | Consultoria | consultoria |
| multas e infracciones | Consultoria | fiscalizacion |
| importacion sectorial | Importacion | importacion |
| calculo de tributos | Importacion | importacion |
| regimenes aduaneros | Comercio Exterior | comercio-exterior |
| courier vs carga | Importacion | courier-vs-carga |
| glosario y documentos | Comercio Exterior | comercio-exterior |

## 5. Cola de ejecucion prioritaria

### Sprint 1

#### 1. valoracion-aduanera-peru
- Titulo de trabajo: `Valoracion aduanera en Peru: metodos, calculo y errores comunes`
- Intencion: informativa / comercial
- Buyer stage: validacion economica
- Problema que resuelve: el usuario no entiende como SUNAT determina valor, tributos y riesgo de observacion
- CTA principal: revision de caso antes de pagar al proveedor
- Destino CTA: `/servicios/consultoria-aduanera`
- Enlaces internos minimos:
  - `/blog/como-calcular-costos-de-importacion-en-peru/`
  - `/blog/como-importar-por-primera-vez-en-peru/`
  - `/blog/acreditacion-medios-de-pago-comercio-internacional/`
- Servicio secundario posible: `/servicios/agenciamiento-aduanas`
- Notas: pieza pilar de alta autoridad; debe incluir ejemplos simples de valor CIF, ajustes y errores comunes.

#### 2. multas-aduaneras-sunat-como-evitarlas
- Titulo de trabajo: `Multas aduaneras SUNAT: infracciones comunes y como evitarlas`
- Intencion: informativa / transaccional
- Buyer stage: validacion regulatoria
- Problema que resuelve: miedo a sanciones, observaciones y errores evitables
- CTA principal: evaluar el caso antes de numerar o regularizar
- Destino CTA: `/servicios/consultoria-aduanera`
- Enlaces internos minimos:
  - `/blog/registrar-mandato-electronico-sunat/`
  - `/blog/notificacion-de-salida-de-mercancias/`
  - `/blog/agente-de-aduanas-vs-agencia-de-carga/`
- Servicio secundario posible: `/servicios/agenciamiento-aduanas`
- Notas: debe evitar sonar alarmista; el angulo correcto es riesgo real + prevencion + siguiente paso claro.

### Sprint 2

#### 3. importar-ropa-textiles-china-peru
- Titulo de trabajo: `Importar ropa y textiles de China a Peru: aranceles, antidumping y requisitos`
- Intencion: sectorial / transaccional
- Buyer stage: validacion regulatoria
- Problema que resuelve: importador con producto definido, pero sin claridad sobre restricciones ni costos
- CTA principal: revisar viabilidad antes de cerrar compra con proveedor
- Destino CTA: `/servicios/consultoria-aduanera`
- Enlaces internos minimos:
  - `/blog/importar-de-china-a-peru/`
  - `/blog/como-calcular-costos-de-importacion-en-peru/`
  - `/blog/como-saber-si-tu-producto-necesita-permisos-para-importar-en-peru/`
- Servicio secundario posible: `/servicios/agencia-de-carga-internacional`
- Notas: si el articulo no aterriza antidumping, etiquetado y documentos, queda incompleto.

#### 4. importar-suplementos-vitaminas-peru
- Titulo de trabajo: `Importar suplementos y vitaminas a Peru: requisitos, DIGESA y riesgos`
- Intencion: sectorial / transaccional
- Buyer stage: validacion regulatoria
- Problema que resuelve: producto sensible con alto riesgo de permiso mal gestionado
- CTA principal: validar permisos y documentos antes de importar
- Destino CTA: `/servicios/consultoria-aduanera`
- Enlaces internos minimos:
  - `/blog/como-saber-si-tu-producto-necesita-permisos-para-importar-en-peru/`
  - `/blog/como-importar-por-primera-vez-en-peru/`
  - `/blog/como-calcular-costos-de-importacion-en-peru/`
- Servicio secundario posible: `/servicios/agenciamiento-aduanas`
- Notas: debe dejar muy claro cuando el problema es regulatorio y no logistico.

### Sprint 3

#### 5. calcular-tributos-importacion-peru
- Titulo de trabajo: `Calcular tributos de importacion en Peru: ejemplo paso a paso`
- Intencion: informativa / comercial
- Buyer stage: validacion economica
- Problema que resuelve: el usuario no sabe cuanto terminara pagando realmente
- CTA principal: revisar costos reales antes de importar
- Destino CTA: `/servicios/consultoria-aduanera`
- Enlaces internos minimos:
  - `/blog/como-calcular-costos-de-importacion-en-peru/`
  - `/blog/valoracion-aduanera-peru/`
  - `/blog/importar-de-china-a-peru/`
- Servicio secundario posible: `/servicios/agenciamiento-aduanas`
- Notas: si se publica antes que `valoracion-aduanera-peru`, reemplazar ese enlace por uno transitorio y actualizar despues.

#### 6. regimenes-aduaneros-peru
- Titulo de trabajo: `Regimenes aduaneros en Peru: cual conviene para tu operacion`
- Intencion: comercial
- Buyer stage: validacion operativa
- Problema que resuelve: el lector ya sabe que operara, pero no que esquema le conviene
- CTA principal: definir el esquema correcto de operacion
- Destino CTA: `/comercio-exterior/regimenes-aduaneros`
- Enlaces internos minimos:
  - `/blog/como-importar-por-primera-vez-en-peru/`
  - `/blog/agente-de-aduanas-vs-agencia-de-carga/`
  - `/blog/como-calcular-costos-de-importacion-en-peru/`
- Servicio secundario posible: `/servicios/consultoria-aduanera`
- Notas: esta pieza debe complementar la landing existente, no duplicarla.

## 6. Brief minimo obligatorio por articulo

Antes de redactar, cada articulo debe tener este brief:

- `working_title`
- `slug`
- `primary_keyword`
- `secondary_keywords`
- `search_intent`
- `buyer_stage`
- `category`
- `topic`
- `primary_cta_copy`
- `primary_cta_url`
- `secondary_service_url`
- `required_internal_links`
- `faq_candidates`
- `proof_or_examples_needed`

## 7. Estructura recomendada de cada pieza

### Para piezas informativas / comerciales

1. problema real del lector
2. explicacion clara del concepto
3. errores frecuentes
4. ejemplo o caso simple
5. cuando conviene pedir ayuda
6. CTA final

### Para piezas sectoriales / transaccionales

1. para quien aplica el articulo
2. producto y escenario comun
3. permisos o restricciones
4. tributos y costos base
5. errores o riesgos principales
6. recomendacion de siguiente paso
7. CTA final

## 8. Reglas de calidad

- Un articulo, un CTA principal.
- Toda pieza debe enlazar al menos a 3 posts del cluster.
- Toda pieza debe enlazar al menos a 1 servicio o hub relevante.
- No duplicar el angulo de una pagina ya existente en `/comercio-exterior`.
- No prometer precios cerrados sin contexto.
- No usar tono de venta agresiva en piezas de etapa temprana.
- Si el articulo toca regulacion sensible, priorizar claridad y criterio, no "tips rapidos".

## 9. Distribucion minima por articulo

Al publicar una pieza nueva, generar como minimo:

- 1 resumen para LinkedIn con angulo educativo
- 3 hooks cortos para social
- 1 email corto para base de leads tibios
- 1 lista de FAQs reutilizables para schema o futuras piezas

## 10. Definition of Done editorial

Un articulo se considera listo cuando:

- existe el archivo MDX en `src/content/blog/`
- tiene frontmatter valido segun `src/lib/blog/types.ts`
- refleja el CTA correcto para su etapa
- enlaza correctamente al cluster y al servicio
- pasa una revision de claridad y tono
- tiene metadata y descripcion alineadas a intencion de busqueda
- deja clara la siguiente accion para el lector

## 11. Orden recomendado de trabajo con skills

Para ejecutar cada articulo:

1. `content-strategy` para confirmar angulo y lugar en el cluster
2. `copywriting` para brief + estructura + borrador
3. `copy-editing` para pulido
4. `ai-seo` para mejorar citabilidad y estructura de respuesta
5. `schema-markup` para FAQ o Article si corresponde
6. `social-content` y `email-sequence` para distribucion

## 12. Riesgo actual a tener en cuenta

El endpoint `src/app/api/blog-lead/route.ts` aun no integra CRM ni envio real segun `README.md`.
Mientras eso no cambie, no conviene apoyar toda la conversion del blog en formularios inline. El CTA principal debe seguir favoreciendo rutas ya maduras como WhatsApp, servicios y contacto.
