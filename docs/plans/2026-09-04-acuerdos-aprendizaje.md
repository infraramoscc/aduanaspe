# Acuerdos comerciales: primera entrega educativa

## Diseño aprobado

Mantener los artículos en `/blog/` y crear un centro en `/comercio-exterior/acuerdos-comerciales/`. Primera entrega: China (cuatro guías nuevas) y enlaces al contenido existente de Estados Unidos. Preparar una estructura ampliable sin presentar como terminadas guías de otros acuerdos.

Audiencia: personas que quieren aprender y quienes preparan una importación o exportación desde Perú. Priorizar decisiones, evidencia documental, ejemplos ficticios explicados y errores frecuentes. No confundir origen con procedencia, certificado con autorización sanitaria ni preferencia con exoneración de todos los tributos.

## Plan de implementación

1. Contrastar el manual MINCETUR 2017 con el capítulo 3, anexo 5 y procedimiento SUNAT DESPA-PE.01.22. Registrar fecha y estado del protocolo de optimización. No trasladar nomenclaturas antiguas a operaciones actuales.
2. Redactar cuatro artículos: `reglas-origen-tlc-peru-china`, `importar-china-peru-preferencia-arancelaria`, `certificado-origen-china-peru`, `exportar-china-certificado-origen`. Incluir recorrido de aprendizaje, casos, listas de comprobación, fuentes oficiales y una sola llamada comercial por artículo. El tutorial cubrirá los 14 campos y dos ejemplos ficticios, uno por dirección.
3. Construir el centro de acuerdos con rutas para aprender, importar y exportar, tarjetas China/Estados Unidos, enlaces a fuentes oficiales y límites de cobertura. Conectar navegación, categorías, sitemap y artículos relacionados sin duplicar contenido.
4. Actualizar mapa editorial y registro de fuentes. Conservar el PDF original del usuario y distinguirlo de las fuentes normativas vigentes.
5. Revisar contenido y enlaces, compilar MDX, ejecutar pruebas SEO, lint y build; revisar especificación y calidad. Actualizar el grafo local de código. No publicar remotamente sin autorización.

## Criterios de aceptación

- Centro y cuatro artículos navegables, sin enlaces internos rotos.
- Tutorial con los 14 campos, papeles del exportador/importador/entidad y ejemplos identificados como ficticios, no certificados utilizables.
- Casos de terceros, tránsito, materiales extranjeros, errores, certificados tardíos y diferencias con Estados Unidos.
- Fuentes oficiales adyacentes y fecha de revisión 2026-09-04; protocolo pendiente claramente separado.
- Validación técnica sin regresiones atribuibles a esta entrega.

## Entrega y verificación

Implementados el centro, las cuatro guías, navegación, sitemap, enlaces desde cinco artículos existentes y registros editoriales. El manual original se conserva como fuente; los registros nuevos usan `ready-local`, no publicación confirmada.

- 51 pruebas SEO aprobadas (incluida resolución de artículos y anclas del centro).
- ESLint sin errores.
- Build de producción aprobado: 115 páginas generadas. El primer intento quedó bloqueado por descarga de Google Fonts; el segundo con acceso de red aprobó. Aviso no bloqueante de múltiples lockfiles por el worktree.
- Cuatro MDX compilados con remark-gfm; enlaces internos y una sola ServiceCTA comprobados.
- Revisión independiente sin hallazgos; revisión visual del centro en escritorio y móvil y del tutorial en móvil, sin desbordamiento horizontal. Navegación desde el centro al tutorial confirmada con teclado.
- Graphify local actualizado con `extract . --code-only`: 803 nodos y 1752 relaciones. No extracción semántica ni envío de documentos a servicios externos.
- No push, despliegue ni integración con main en esta entrega.
