# Mejora visual y de credibilidad de landings de Ads

## Objetivo

Mejorar la presentación profesional y la credibilidad de las cuatro landings de campañas de AduanasPE mediante fotografía editorial generada, una composición visual consistente y contenido comercial verificable.

## Rutas incluidas

- `/lp/importar-china-2024`
- `/lp/agente-aduanas-lima`
- `/lp/asesoria-comercio-exterior`
- `/oferta/primera-importacion`

Las páginas de servicios y el resto del sitio quedan fuera de este alcance.

## Dirección visual

La dirección elegida es fotografía editorial documental: escenas plausibles de comercio exterior, luz natural o industrial controlada, composición limpia y tratamiento cromático compatible con los violetas y azules actuales de AduanasPE.

Las imágenes no deben incluir:

- logos de SUNAT, BASC, OEA, navieras u otras organizaciones;
- uniformes o credenciales que simulen autorizaciones oficiales;
- texto generado dentro de la imagen;
- documentos con datos legibles o personales;
- personas reconocibles como clientes reales;
- escenas espectaculares o irreales que resten confianza.

## Activos

Se generarán cuatro imágenes hero independientes:

1. **Importación desde China:** contenedores y operación portuaria internacional, con una ruta visual Asia–Pacífico implícita y sin mapas o banderas artificiales.
2. **Agente de aduanas en Lima:** revisión operativa de carga en un entorno portuario inspirado en Callao, sin insignias oficiales.
3. **Asesoría en comercio exterior:** especialista revisando documentos de importación y datos logísticos en una oficina profesional; los documentos no tendrán texto legible.
4. **Primera importación:** pequeña empresa recibiendo carga consolidada, con una escena humana natural y sin representar a una persona como cliente real de AduanasPE.

Los archivos finales se guardarán bajo `public/images/landings/` con nombres descriptivos. Se preferirá WebP optimizado cuando el flujo de generación y conversión preserve la calidad; PNG o JPEG será aceptable como fuente y se convertirá antes de integrarlo.

Cada activo tendrá texto alternativo específico y no repetirá el título comercial de la página.

## Landing compartida `/lp/[slug]`

### Modelo de contenido

`src/content/lp.ts` se ampliará con campos tipados para:

- ruta de imagen hero;
- texto alternativo;
- etiqueta o línea de contexto;
- beneficios específicos y verificables;
- mensaje de confianza relacionado con el servicio.

Las tres landings seguirán usando un único template para evitar duplicación.

### Hero

El hero pasará de una composición centrada sin imagen a una cuadrícula de dos columnas:

- contenido, CTA y señales de confianza a la izquierda;
- imagen editorial con recorte controlado a la derecha;
- degradado de marca más sobrio, reservado para fondo y overlays;
- orden invertido o apilado en móvil, conservando título y CTA antes de contenido secundario.

La imagen se cargará con `next/image`, `sizes` adecuado y prioridad únicamente por estar sobre el pliegue.

### Contenido

La franja genérica de “Atención directa / Seguimiento claro / Respuesta rápida” se reemplazará por beneficios concretos provenientes del modelo de cada landing. Los formularios y CTA actuales conservarán su comportamiento y tracking.

## Landing `/oferta/primera-importacion`

La página conservará su flujo de conversión por WhatsApp, pero se alineará con el mismo lenguaje visual de las landings compartidas.

Cambios de credibilidad:

- eliminar el banner de urgencia “último día” y “3 cupos” mientras no exista una campaña verificable que lo respalde;
- reemplazar “Cero Multas”, “Tracking 24/7” y tiempos absolutos por formulaciones prudentes sobre revisión previa, coordinación y seguimiento;
- eliminar logos de confianza simulados;
- retirar testimonios con nombres e historias que no estén documentados como testimonios reales;
- conservar preguntas frecuentes, proceso y alcance del servicio, corrigiendo cualquier promesa absoluta;
- sustituir el bloque gráfico basado en emoji por una imagen editorial contextual.

No se inventarán cifras, certificaciones, clientes ni alianzas.

## Componentes

Se preferirá ampliar componentes existentes o crear un componente pequeño y reutilizable para el hero visual de Ads. El componente tendrá una interfaz clara para imagen, contenido, CTA y beneficios, sin conocer los detalles de cada campaña.

No se modificará el sistema visual global ni se hará un rediseño de los componentes de páginas de servicios.

## Accesibilidad y rendimiento

- contraste WCAG AA para texto y controles principales;
- jerarquía correcta de encabezados;
- alternativas textuales útiles;
- imágenes responsivas sin provocar layout shift;
- CTA accesibles por teclado y con foco visible;
- respeto por preferencias de movimiento reducido en cualquier efecto añadido;
- activos comprimidos para no degradar LCP de forma innecesaria.

## Manejo de fallos

- Si una imagen generada contiene texto, logos, anatomía defectuosa o elementos operativos poco plausibles, se descartará y se regenerará con una corrección específica.
- Si una imagen no funciona en recortes móvil y escritorio, se generará otra composición en vez de forzar el recorte.
- Si la conversión a WebP introduce artefactos visibles, se conservará un formato alternativo optimizado.
- Si se encuentra evidencia real de alguna afirmación retirada, podrá reincorporarse posteriormente con su respaldo correspondiente.

## Verificación

La implementación se considerará correcta cuando:

1. Las cuatro rutas rendericen sin errores.
2. Cada ruta muestre una imagen diferenciada y coherente con su intención.
3. No queden logos simulados, testimonios ficticios ni promesas absolutas identificadas en este diseño.
4. Las imágenes mantengan una composición útil en anchos móvil y escritorio.
5. `npm run lint` y `npm run build` finalicen correctamente.
6. Una revisión visual confirme contraste, jerarquía, recortes, ausencia de overflow y coherencia entre las cuatro páginas.

## Fuera de alcance

- Crear o modificar el logotipo de AduanasPE.
- Publicar las landings o modificar campañas externas.
- Añadir un CMS de imágenes.
- Fotografiar operaciones reales.
- Rediseñar páginas de servicios, home o blog.
- Afirmar certificaciones o relaciones institucionales no verificadas.
