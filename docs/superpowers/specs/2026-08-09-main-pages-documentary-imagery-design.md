# Imágenes documentales para páginas principales

**Fecha:** 2026-08-09  
**Estado:** Aprobado para planificación

## Objetivo

Extender el lenguaje visual profesional de las landing pages de Ads a las cuatro páginas principales de AduanasPE: Inicio, Servicios, Comercio Exterior y Quiénes Somos. La mejora debe aportar vida y credibilidad mediante fotografías que parezcan tomadas durante operaciones reales, tanto en el hero como en el cuerpo de cada página.

## Alcance

Se incorporarán tres fotografías únicas en cada página:

1. Una escena amplia en el hero para establecer contexto.
2. Una escena humana o de coordinación a mitad de página.
3. Un detalle operativo en la parte inferior del cuerpo.

El alcance total es de doce imágenes nuevas, sin reutilización entre páginas. No se modificarán las landing pages de Ads, el blog, las herramientas ni las páginas individuales de servicios en esta fase.

## Dirección visual

Las fotografías seguirán un estilo de reportaje operativo:

- Luz natural o ambiental y color sobrio.
- Encuadres ligeramente imperfectos y gestos espontáneos.
- Balance entre personas trabajando y elementos de la operación.
- Entornos peruanos plausibles, con referencias discretas al Callao cuando correspondan.
- Vestimenta y equipos de trabajo creíbles, sin poses publicitarias.
- Sin marcas, logotipos, textos legibles, cifras ni documentos inventados.
- Sin dramatización de riesgo, congestión extrema o incumplimientos de seguridad.

Las imágenes deberán sentirse relacionadas entre sí, pero no idénticas. Se conservará la estética editorial e industrial adoptada en las landing pages de Ads.

## Mapa de escenas

| Página | Hero | Imagen intermedia | Imagen inferior |
|---|---|---|---|
| Inicio | Coordinación de carga cerca del Callao | Asesor revisando documentos con un importador | Inspección natural de mercancía |
| Servicios | Equipo coordinando una operación logística | Revisión de DAM, factura y documentos | Transferencia entre contenedor, transporte y almacén |
| Comercio Exterior | Persona aprendiendo y planificando una importación | Comparación de documentos y clasificación | Uso práctico de guías y herramientas digitales |
| Quiénes Somos | Retrato espontáneo del equipo trabajando | Conversación real con un cliente | Acompañamiento durante una operación |

## Composición de página

### Hero

El componente `Hero` incorporará una variante fotográfica dividida. En escritorio, el contenido ocupará una columna y la imagen otra; en móvil, la imagen se apilará debajo de la propuesta de valor. El hero mantendrá un único `h1`, sus CTA actuales y la información de confianza existente.

### Cuerpo

Las escenas del cuerpo se integrarán mediante un componente editorial reutilizable que admita:

- Imagen local optimizada.
- Texto alternativo obligatorio.
- Pie de foto breve y verificable.
- Posición a izquierda o derecha.
- Relación de aspecto y punto focal configurables.
- Contenido textual y CTA existentes como hijos del componente.

Las imágenes alternarán de lado para crear ritmo. Los pies de foto explicarán el tipo de actividad representada y no presentarán la escena generada como evidencia de una operación o cliente específico.

## Arquitectura técnica

### Componentes

- Extender `src/components/sections/Hero.tsx` con una variante fotográfica opcional, conservando el comportamiento actual como valor predeterminado.
- Crear un componente de imagen editorial reutilizable en `src/components/sections/`.
- Reutilizar o extender `SplitFeature` cuando la estructura existente permita integrar la fotografía sin duplicar maquetación.
- Mantener las rutas, metadatos, CTA, seguimiento y datos estructurados existentes.

### Activos

- Guardar las doce imágenes finales bajo `public/images/main-pages/`.
- Usar nombres semánticos y estables por página y función.
- Convertir los archivos finales a WebP.
- Dimensionar cada imagen para su uso real y comprimirla antes de incorporarla.
- Usar `next/image`; solo las imágenes de hero tendrán `priority`.

### Accesibilidad y rendimiento

- Proporcionar `alt` descriptivo cuando la imagen aporte contexto.
- No repetir en el `alt` información ya expresada de forma idéntica en el pie de foto.
- Conservar contraste suficiente en textos superpuestos y evitar texto esencial dentro de imágenes.
- Reservar proporciones estables para evitar saltos de diseño.
- Cargar de forma diferida todas las imágenes del cuerpo.

## Contenido y credibilidad

El contenido comercial y SEO actual se conservará salvo ajustes mínimos necesarios para acompañar las escenas. Los pies de foto deberán usar lenguaje prudente, por ejemplo “Coordinación documentaria antes del despacho”, y nunca atribuir una imagen generada a un cliente, embarque, terminal o caso real.

No se introducirán métricas, testimonios, acreditaciones, tiempos garantizados ni afirmaciones operativas que no estén respaldadas por el contenido existente.

## Validación

La implementación se considerará completa cuando cumpla lo siguiente:

- Doce imágenes locales, únicas y optimizadas.
- Tres imágenes visibles en cada una de las cuatro páginas.
- Hero fotográfico y dos escenas dentro del cuerpo por página.
- Uso de `next/image`, con prioridad solo en el hero.
- Un solo `h1` por página.
- Sin desplazamiento horizontal en anchos móviles y de escritorio.
- Texto alternativo y pies de foto adecuados.
- Sin marcas, texto generado legible ni afirmaciones de confianza no sustentadas.
- Pruebas específicas de contrato visual aprobadas.
- Pruebas SEO, lint y build de producción aprobados.
- Revisión visual en escritorio y móvil de las cuatro rutas.

## Fuera de alcance

- Publicación o despliegue a producción.
- Cambios de marca o logotipo.
- Fotografía real contratada o sesión presencial.
- Rediseño integral de navegación, footer o formularios.
- Incorporación de imágenes al blog, herramientas o páginas secundarias.
