# Perfil de skills de AduanasPE

Configurado el 6 de septiembre de 2026 mediante archivos `SKILL.disabled.md` dentro de `.agents/skills`.

## Criterio

AduanasPE es una empresa de servicios de comercio exterior, no un SaaS. El sitio educa a importadores y exportadores, organiza guías y casos por acuerdos comerciales, preserva fuentes revisadas y facilita consultas pertinentes sin venta agresiva. La biblioteca de China, Estados Unidos y Unión Europea seguirá creciendo.

## Selección

Se mantienen 15 de las 50 skills de `.agents/skills`:

- Contenido: `content-strategy`, `copy-editing`, `copywriting`.
- Descubrimiento y estructura: `seo-audit`, `ai-seo`, `schema-markup`, `site-architecture`.
- Utilidad y captación: `free-tool-strategy`, `analytics-tracking`, `page-cro`.
- Desarrollo y calidad: `frontend-design`, `web-design-guidelines`, `systematic-debugging`, `test-driven-development`, `verification-before-completion`.

Graphify permanece en `.codex/skills/graphify`. No se modifican las skills personales, del sistema o de plugins, incluidas las de PDF y documentos.

Las otras 35 quedan desactivadas renombrando únicamente `SKILL.md` a `SKILL.disabled.md`, no eliminadas. Se reservan para campañas, email, redes, monetización, flujos SaaS o procesos especializados. También se desactiva la cadena general de Superpowers para evitar que toda tarea sencilla active planificación, delegación y cierre adicionales. Se conservan pruebas, diagnóstico y verificación explícitos.

## Aplicación y reversión

El cambio es exclusivo de este proyecto y no depende de rutas absolutas. No contiene credenciales ni cambia permisos. No se ha modificado la configuración global. Se probó primero `skills.config`, pero el catálogo del CLI seguía mostrando las entradas; se retiró esa configuración y se verificó el método de renombrado.

Abrir una tarea nueva o reiniciar Codex para recargar la selección; esta conversación ya contiene las descripciones anteriores. Para recuperar una skill, renombrar su `SKILL.disabled.md` a `SKILL.md`. Para revertir todo el perfil, repetir ese renombrado en las 35 carpetas afectadas. Los contenidos originales y recursos permanecen intactos. Una reinstalación de skills podría volver a crear sus entradas; comprobar el catálogo después de actualizar paquetes.

Las copias o worktrees existentes conservan su selección anterior hasta recibir estos cambios. No se promete una reducción porcentual de tokens: bajar el catálogo y evitar activaciones innecesarias no elimina el historial ni los demás componentes del contexto.

## Verificación local

El catálogo generado por `codex debug prompt-input` dejó de mostrar `using-superpowers` y conservó las skills esenciales. Quedan 15 entradas `SKILL.md` y 35 `SKILL.disabled.md` en `.agents/skills`. Se verificó el contenido de las 35 contra sus blobs originales de Git. Las rutas duplicadas de `.agent/skills` que aparecen en el estado de Git son junctions hacia estas mismas carpetas, no otro proyecto.

Este perfil no incorpora cambios del sitio, commits ni push.

Documentación oficial: [Skills](https://learn.chatgpt.com/docs/build-skills), [configuración por proyecto](https://learn.chatgpt.com/docs/config-file/config-reference).
