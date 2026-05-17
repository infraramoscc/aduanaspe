# Contexto de continuidad para trabajar con Codex

Última actualización: 2026-05-17

Este archivo sirve para abrir una conversación nueva de Codex sin perder el hilo del trabajo realizado en AduanasPE. La idea es que el nuevo chat lea este archivo junto con los CSV de control antes de continuar.

## Archivos de control que deben revisarse primero

- `docs/contexto-continuidad-codex.md`: resumen narrativo del estado del proyecto y próximos pasos.
- `docs/control_trabajo_codex.csv`: tablero operativo simple para continuar por tareas.
- `docs/seo_content_map.csv`: mapa SEO de páginas, artículos, keywords, rol de contenido y canibalización.
- `docs/docs_recursos/registro_fuentes_blog.csv`: registro de PDFs y fuentes ya usadas para no repetir contenido.

## Trabajo realizado hasta ahora

### 1. Sistema para trabajar con PDFs

Se creó una lógica de trabajo basada en PDFs guardados en `docs/docs_recursos/`.

El objetivo es que cada PDF quede registrado con:

- Nombre del PDF.
- Tema.
- Fecha de publicación.
- Estado de uso.
- Página o artículo donde se usó.
- Nota editorial para evitar duplicidad.

El archivo principal para esto es `docs/docs_recursos/registro_fuentes_blog.csv`.

### 2. Mapa SEO y control de canibalización

Se creó o actualizó `docs/seo_content_map.csv` como inventario central de contenido.

Este archivo se debe usar para decidir:

- Si conviene crear una página nueva.
- Si conviene actualizar un artículo existente.
- Qué URL es dueña de una keyword.
- Qué artículos deben enlazar a una página pilar.
- Si hay riesgo de canibalización.

Regla acordada: las páginas evergreen o guías pilar van fuera del blog cuando son temas principales de importación o comercio exterior. El blog queda para noticias, casos, actualizaciones normativas y artículos satélite.

### 3. Estructura SEO para importación por categorías

Se acordó que las guías por tipo de producto deben vivir bajo:

`/comercio-exterior/importacion/`

Ejemplos futuros:

- `/comercio-exterior/importacion/importar-juguetes-utiles-escritorio/`
- `/comercio-exterior/importacion/importar-productos-ferreteria/`
- `/comercio-exterior/importacion/importar-productos-veterinarios/`

La razón SEO es que estas páginas son evergreen, comerciales e informativas. No deben vivir dentro de `/blog`.

### 4. Guía evergreen de juguetes y útiles de escritorio

Se trabajó una guía pilar para:

`/comercio-exterior/importacion/importar-juguetes-utiles-escritorio/`

Tema: importar juguetes y útiles de escritorio al Perú.

Fuente principal:

`docs/docs_recursos/03-8116237-resolucion-ministerial-n-457-2026-minsa.pdf`

Punto legal importante: la R.M. N.° 457-2026/MINSA publica un proyecto de Decreto Supremo para comentarios. No debe presentarse como norma final vigente.

La guía debe tratar:

- Revisión sanitaria.
- DIGESA / MINSA.
- Documentos del proveedor.
- Rotulado.
- Riesgos antes de embarcar.
- Escenarios reales de importación.
- Fuentes oficiales.
- Preguntas frecuentes.

También se creó un PDF descargable:

`public/recursos/checklist-importar-juguetes-utiles-escritorio.pdf`

Ese PDF funciona como checklist complementario. La página web sigue siendo el contenido principal para SEO.

### 5. Patrón visual de tarjetas

Se tomó como referencia el estilo de las tarjetas de la página:

`/comercio-exterior/importacion/`

Características del patrón:

- Fondo blanco.
- Borde suave.
- Sombra ligera.
- Mucho aire interno.
- Hover con elevación.
- Glow radial sutil según color.
- CTA textual con flecha simple `->`.

Se reforzó la clase global `service-card` en:

`src/app/globals.css`

Y se aplicó a componentes compartidos como:

- `src/components/sections/HubCards.tsx`
- `src/components/blog/PostCard.tsx`
- `src/components/blog/RecommendedReading.tsx`
- `src/components/blog/RelatedServices.tsx`
- `src/components/blog/ServiceCTA.tsx`
- `src/components/blog/FaqGroup.tsx`
- `src/components/forms/FormBase.tsx`

Pendiente recomendado: revisar visualmente con browser las páginas principales para comprobar que todas las tarjetas mantienen buen espaciado en desktop y móvil.

## Estado de verificación

Antes del traspaso se verificó:

- `npm.cmd run build`: pasó correctamente después de permitir acceso a fuentes de Google.
- ESLint específico de componentes modificados: pasó correctamente.

Nota: el lint global puede fallar por carpetas ajenas o generadas como `.agents`, `.worktrees` o `.next`. No tomar ese resultado como error directo del trabajo de contenido sin revisar el origen.

## Cómo continuar en otro chat

Mensaje recomendado para iniciar otra conversación:

```text
Lee primero docs/contexto-continuidad-codex.md, docs/control_trabajo_codex.csv, docs/seo_content_map.csv y docs/docs_recursos/registro_fuentes_blog.csv. Luego revisa el estado actual del proyecto y continuemos con las páginas evergreen de importación por categoría.
```

Si el nuevo chat tiene browser activo, pedir:

```text
Abre http://localhost:3000/comercio-exterior/importacion/ y revisa visualmente el patrón de tarjetas, hover, espaciado desktop/móvil y navegación hacia la guía de juguetes.
```

## Recomendación de control

Usar dos niveles de control:

- Markdown para contexto narrativo y decisiones estratégicas.
- CSV para estado operativo, fuentes, slugs, keywords y próximos pasos.

Esto permite trabajar en varios chats sin depender de memoria conversacional.
