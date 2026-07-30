# Mejoras SEO basadas en Search Console

**Fecha:** 2026-07-29

**Sitio:** `https://aduanaspe.com`

**Objetivo:** aumentar clics orgánicos y acelerar la indexación de páginas valiosas sin cambiar URLs ni perjudicar contenido que ya posiciona.

## Contexto

La revisión de Google Search Console mostró una base técnica saludable:

- 2,270 clics y 145,100 impresiones durante los últimos tres meses.
- CTR medio de 1.6% y posición media de 6.1.
- 71 de las 88 URLs del sitemap indexadas.
- 15 URLs del sitemap descubiertas, pero todavía sin rastrear.
- 2 URLs rastreadas, pero no indexadas.
- Core Web Vitals, HTTPS, breadcrumbs, acciones manuales y seguridad sin incidencias.

Las oportunidades principales no requieren una reconstrucción del sitio. El mayor retorno esperado proviene de mejorar snippets con muchas impresiones, reforzar dos páginas débiles y concentrar enlaces internos en contenido nuevo con intención comercial o preventiva.

## Alcance

### 1. Optimización de snippets

Se editarán el título y la descripción de:

- `src/content/blog/importar-de-china-a-peru.mdx`
- `src/content/blog/multas-aduaneras-sunat-como-evitarlas.mdx`
- `src/content/blog/registrar-mandato-electronico-sunat.mdx`
- `src/content/blog/guia-inspeccion-no-intrusiva-puertos-2024.mdx`

Los títulos deberán:

- conservar la intención y el año cuando aporte actualidad;
- incluir la consulta principal cerca del inicio;
- evitar duplicar términos;
- mantenerse dentro de un tamaño razonable al añadir `| AduanasPE`;
- representar con precisión el contenido existente.

Las descripciones deberán:

- explicar el beneficio concreto;
- incorporar la consulta principal de forma natural;
- anticipar costos, requisitos, pasos o riesgos según el artículo;
- evitar promesas no demostradas;
- mantenerse aproximadamente entre 140 y 160 caracteres cuando sea posible.

No se cambiarán slugs, fechas de publicación ni canonical.

### 2. Refuerzo de la página de regímenes aduaneros

Se ampliará:

- `src/app/(site)/comercio-exterior/regimenes-aduaneros/page.tsx`

La página deberá incluir:

- una explicación práctica de cómo elegir un régimen según el objetivo de la operación;
- una tabla o estructura comparativa con finalidad, permanencia, tratamiento tributario general y riesgo habitual;
- enlaces hacia importación, exportación y consultoría aduanera;
- preguntas frecuentes que respondan dudas reales sin sustituir una evaluación técnica;
- metadata alineada con la consulta “regímenes aduaneros en Perú”.

El contenido debe ser educativo, claro y útil para importadores y responsables de operaciones. No se convertirán reglas generales en asesoría jurídica personalizada.

### 3. Refuerzo del artículo sobre agencias de carga

Se mejorará:

- `src/content/blog/servicios-clave-agencia-de-cargas.mdx`

La revisión deberá:

- orientar el artículo hacia la selección y evaluación de una agencia de carga;
- explicar qué incluye cada servicio y por qué importa para el cliente;
- diferenciar agencia de carga, agente de aduanas y transporte local;
- incorporar señales prácticas para comparar proveedores;
- enlazar a la página comercial de agencia de carga internacional y a contenido relacionado;
- actualizar `updatedAt` para reflejar una revisión material.

La URL seguirá siendo la misma para conservar cualquier señal histórica.

### 4. Enlaces internos hacia contenido pendiente

Se reforzarán enlaces hacia páginas descubiertas pero no rastreadas desde hubs y artículos consolidados. Los enlaces deberán:

- aparecer dentro de párrafos relevantes;
- usar texto descriptivo y natural;
- evitar repetir el mismo destino en exceso;
- priorizar artículos alineados con importación, fiscalización, valor aduanero, permisos y maquinaria;
- evitar enlaces desde landings publicitarias bajo `/lp/`.

Antes de añadir un enlace se comprobará si el destino ya está enlazado desde la página. No se crearán bloques masivos de enlaces.

### 5. Canonicalización y barra final

La configuración existente `trailingSlash: true` y los canonical absolutos se conservarán. Se añadirán o ampliarán pruebas para impedir regresiones:

- las URLs indexables usan barra final;
- el sitemap emite URLs con barra final;
- las páginas objetivo conservan canonical absoluto;
- los enlaces internos nuevos respetan la convención.

No se añadirán redirecciones duplicadas si Next.js ya normaliza la URL. Los pares históricos con y sin barra se tratarán como residuos de rastreo y se validarán mediante pruebas de configuración y build.

## Enfoques considerados

### Enfoque seleccionado: optimización conservadora

Mejora snippets, contenido débil, enlaces internos y pruebas sin modificar URLs ni rehacer artículos que ya posicionan. Reduce el riesgo y permite medir el efecto por página.

### Alternativa descartada: reescritura profunda

Podría mejorar la cobertura temática, pero alteraría varias páginas con posiciones medias entre 4 y 6. Se reservará para páginas que continúen perdiendo clics después de medir los cambios conservadores.

### Alternativa descartada: nuevas landings SEO

Crearía más superficies para consultas relacionadas, pero contradice la regla interna “una intención de búsqueda = una página evergreen” y aumentaría el riesgo de canibalización.

## Arquitectura y componentes

La implementación seguirá los patrones existentes:

- frontmatter MDX para metadata editorial;
- `generateBlogPostMetadata` para canonical, Open Graph y robots;
- componentes actuales de secciones y enlaces de Next.js;
- `RecommendedReading` cuando encaje con el diseño existente;
- pruebas Node bajo `scripts/seo/` para reglas editoriales y técnicas;
- ESLint y `next build` para verificar JSX, tipos, rutas y generación estática.

No se introducirán dependencias nuevas ni componentes genéricos salvo que el contenido comparativo no pueda expresarse con los patrones actuales.

## Pruebas y criterios de aceptación

La implementación se considerará lista cuando:

1. Las pruebas nuevas fallen antes de los cambios de producción y pasen después.
2. Los cuatro artículos tengan títulos y descripciones precisos, diferenciados y dentro de los límites definidos por las pruebas.
3. La página de regímenes incluya comparación, criterios de elección, preguntas frecuentes y enlaces internos pertinentes.
4. El artículo sobre servicios de agencia de carga tenga una propuesta editorial clara, enlaces comerciales pertinentes y fecha de actualización.
5. Las páginas nuevas prioritarias reciban enlaces contextuales sin duplicación innecesaria.
6. No se cambie ningún slug ni canonical de las páginas existentes.
7. `npm run seo:test`, `npm run lint` y `npm run build` terminen correctamente.

## Medición posterior

Tras publicar, se observarán durante tres o cuatro semanas:

- CTR y clics de las cuatro páginas optimizadas;
- evolución de la página “Importar de China a Perú” frente al periodo anterior;
- indexación de las 17 URLs pendientes del sitemap;
- consultas y páginas que entren o salgan de las primeras diez posiciones.

No se iniciará una validación en Search Console antes de publicar. Una solicitud de indexación manual solo se considerará para páginas prioritarias que continúen sin rastrear después del despliegue y de comprobar sus enlaces internos.

## Fuera de alcance

- publicar o desplegar cambios;
- solicitar indexación o validar correcciones en Search Console;
- crear nuevas páginas o cambiar slugs;
- ejecutar campañas de enlaces externos;
- reescribir todos los artículos del blog;
- modificar landings publicitarias;
- alterar analítica, formularios o eventos de conversión.
