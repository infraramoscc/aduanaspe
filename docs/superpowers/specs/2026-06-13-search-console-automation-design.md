# Automatizacion de Search Console

## Objetivo

Crear un sistema de bajo consumo que consulte Google Search Console automaticamente,
compare periodos equivalentes y produzca recomendaciones priorizadas para actualizar
articulos de AduanasPE. El sistema mide y recomienda; no modifica contenido sin
revision humana.

## Arquitectura

GitHub Actions ejecutara un script Node.js el primer lunes de cada mes y tambien
permitira ejecucion manual. El script se autenticara con una cuenta de servicio de
Google que tendra acceso de solo lectura a la propiedad de Search Console.

La consulta usara dos ventanas cerradas de 28 dias:

- Periodo actual: los 28 dias finalizados tres dias antes de la ejecucion.
- Periodo anterior: los 28 dias inmediatamente anteriores.

El margen de tres dias evita basar decisiones en datos recientes que todavia puedan
estar incompletos.

## Componentes

### Cliente de Search Console

Responsable de:

- Obtener un token OAuth 2.0 mediante una cuenta de servicio.
- Consultar la propiedad configurada en `SEARCH_CONSOLE_SITE_URL`.
- Recuperar datos paginados de pagina y consulta.
- Solicitar exclusivamente el alcance `webmasters.readonly`.

Las credenciales completas se guardaran en GitHub Secrets y nunca en el repositorio.

### Motor de comparacion

Normalizara URLs para tratar variantes con y sin barra final como una misma pagina.
Comparara clics, impresiones, CTR y posicion media entre ambos periodos.

Clasificara oportunidades en:

- `traffic_drop`: caida relevante de clics o impresiones.
- `low_ctr`: muchas impresiones y CTR bajo en posiciones competitivas.
- `striking_distance`: posicion media entre 4 y 15 con demanda suficiente.
- `new_query`: consulta creciente sin cobertura clara en el periodo anterior.
- `cannibalization`: una consulta relevante aparece asociada a varias URLs.
- `winner`: crecimiento que aconseja evitar cambios innecesarios.

Los umbrales estaran centralizados en un archivo de configuracion versionado para
que puedan ajustarse sin reescribir el motor.

### Registro editorial

`docs/seo_tracking/seo_log.json` seguira registrando cambios editoriales. Una URL
modificada durante los ultimos 28 dias quedara en cuarentena y no recibira una nueva
recomendacion de modificacion. El sistema podra mostrar sus metricas, pero la marcara
como `watching`.

### Reporte

Cada ejecucion generara Markdown con:

- Rango actual y rango de comparacion.
- Resumen de rendimiento del sitio.
- Lista priorizada de articulos.
- Consultas relacionadas y variaciones.
- Motivo y accion sugerida.
- Paginas en cuarentena.
- Advertencias de datos o autenticacion.

GitHub Actions publicara o actualizara un issue mensual titulado
`SEO mensual: YYYY-MM`. La ejecucion manual podra generar el mismo reporte sin crear
issues duplicados.

## Flujo operativo

1. GitHub Actions inicia por calendario o manualmente.
2. El script valida secretos y propiedad de Search Console.
3. Consulta ambos periodos usando datos finalizados.
4. Normaliza y compara las metricas.
5. Aplica reglas y cuarentena editorial.
6. Genera el reporte Markdown.
7. El workflow crea o actualiza el issue mensual.
8. El usuario trae el reporte a Codex para revisar articulos y aprobar cambios.
9. Cada cambio aplicado se registra en `seo_log.json`.
10. El resultado se vuelve a evaluar despues de 28 dias.

## Ejecucion local

El repositorio expondra:

```powershell
npm run seo:analyze
```

La ejecucion local aceptara credenciales mediante variables de entorno y podra usar
un modo de datos de prueba para verificar las reglas sin contactar Google.

## Seguridad y consumo

- Cuenta de servicio separada con acceso de lectura.
- Credenciales almacenadas como GitHub Secrets.
- Un workflow mensual, mas ejecuciones manuales.
- Sin BigQuery, base de datos ni funciones de Vercel.
- Sin llamadas a modelos de IA durante la automatizacion.
- Sin commits automaticos de contenido.

## Errores

El proceso fallara con un mensaje accionable cuando falten secretos, la cuenta no
tenga acceso, la propiedad no coincida o Google devuelva un error. No publicara un
reporte incompleto como si fuera valido.

Si una consulta pagina parcialmente y luego falla, la ejecucion completa se marcara
como fallida. Los issues solo se crearan cuando el analisis haya terminado.

## Pruebas

Las pruebas unitarias cubriran:

- Calculo de ventanas de 28 dias.
- Normalizacion de URLs.
- Comparacion y porcentajes con valores cero.
- Clasificacion de cada tipo de oportunidad.
- Cuarentena de 28 dias.
- Generacion estable del reporte.
- Paginacion del cliente con un transporte HTTP simulado.

El workflow se validara mediante ejecucion manual antes de habilitar el calendario.

## Migracion

Los CSV diarios existentes permaneceran como archivo historico durante la primera
implementacion. El nuevo sistema dejara de depender de ellos. Una limpieza o
consolidacion posterior sera una tarea separada para evitar eliminar datos durante
la migracion.

## Criterios de aceptacion

- Se puede ejecutar localmente con un solo comando.
- GitHub Actions puede ejecutarlo manualmente y mensualmente.
- Ninguna credencial aparece en Git o en los logs.
- El reporte compara dos periodos de 28 dias y explica cada recomendacion.
- Los articulos modificados recientemente quedan en cuarentena.
- La automatizacion no modifica articulos.
- Una segunda ejecucion del mismo mes actualiza el issue existente.
