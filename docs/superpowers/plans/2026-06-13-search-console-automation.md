# Search Console Automation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consultar Search Console mensualmente, comparar dos ventanas de 28 dias y publicar un issue con oportunidades editoriales priorizadas.

**Architecture:** Un CLI Node.js sin dependencias nuevas separara autenticacion/consulta, comparacion, reglas y renderizado Markdown. GitHub Actions ejecutara el CLI por calendario o manualmente y usara `gh` para crear o actualizar un unico issue mensual.

**Tech Stack:** Node.js 22, JavaScript ESM, `node:test`, Google OAuth 2.0 JWT, Search Console REST API, GitHub Actions y GitHub CLI.

---

## File Structure

- `scripts/seo/config.mjs`: umbrales y validacion de variables.
- `scripts/seo/dates.mjs`: ventanas cerradas de 28 dias.
- `scripts/seo/search-console.mjs`: JWT, token OAuth y consultas paginadas.
- `scripts/seo/analysis.mjs`: normalizacion, comparacion, cuarentena y reglas.
- `scripts/seo/report.mjs`: reporte Markdown determinista.
- `scripts/seo/analyze.mjs`: CLI y orquestacion.
- `scripts/seo/*.test.mjs`: pruebas unitarias con Node.
- `.github/workflows/seo-monthly.yml`: calendario, ejecucion manual e issue.
- `docs/seo_tracking/README.md`: configuracion y operacion.
- `package.json`: comandos `seo:test` y `seo:analyze`.

### Task 1: Fechas y configuracion

**Files:**
- Create: `scripts/seo/dates.test.mjs`
- Create: `scripts/seo/config.test.mjs`
- Create: `scripts/seo/dates.mjs`
- Create: `scripts/seo/config.mjs`

- [ ] **Step 1: Write failing tests**

Probar que una ejecucion el `2026-06-13` produce periodo actual
`2026-05-14..2026-06-10`, periodo anterior `2026-04-16..2026-05-13`, y que faltan
mensajes claros para credenciales o propiedad.

- [ ] **Step 2: Verify RED**

Run: `node --test scripts/seo/dates.test.mjs scripts/seo/config.test.mjs`
Expected: FAIL porque los modulos no existen.

- [ ] **Step 3: Implement minimal modules**

Exportar `buildComparisonWindows(now)` y `loadRuntimeConfig(env)`. Los umbrales
versionados incluiran impresiones minimas, limites de posicion, CTR y caidas.

- [ ] **Step 4: Verify GREEN**

Run: `node --test scripts/seo/dates.test.mjs scripts/seo/config.test.mjs`
Expected: PASS.

### Task 2: Cliente Search Console

**Files:**
- Create: `scripts/seo/search-console.test.mjs`
- Create: `scripts/seo/search-console.mjs`

- [ ] **Step 1: Write failing pagination and JWT tests**

Inyectar un `fetch` falso, verificar solicitudes de 25,000 filas con `startRow`,
detencion ante pagina corta, alcance readonly y conversion de `\\n` en la clave
privada.

- [ ] **Step 2: Verify RED**

Run: `node --test scripts/seo/search-console.test.mjs`
Expected: FAIL porque el cliente no existe.

- [ ] **Step 3: Implement REST client**

Crear JWT RS256 con `node:crypto`, intercambiarlo por token OAuth y consultar
`searchAnalytics/query`. Exponer consultas para dimensiones `page`, `query` y
`page,query`.

- [ ] **Step 4: Verify GREEN**

Run: `node --test scripts/seo/search-console.test.mjs`
Expected: PASS.

### Task 3: Motor de analisis

**Files:**
- Create: `scripts/seo/analysis.test.mjs`
- Create: `scripts/seo/analysis.mjs`

- [ ] **Step 1: Write failing behavior tests**

Probar normalizacion de barras finales, porcentajes con base cero, las seis
clasificaciones, canibalizacion y cuarentena exacta de 28 dias.

- [ ] **Step 2: Verify RED**

Run: `node --test scripts/seo/analysis.test.mjs`
Expected: FAIL porque el motor no existe.

- [ ] **Step 3: Implement comparison and rules**

Convertir filas API a mapas, comparar periodos, aplicar umbrales y devolver
oportunidades ordenadas por puntuacion con evidencia y accion sugerida.

- [ ] **Step 4: Verify GREEN**

Run: `node --test scripts/seo/analysis.test.mjs`
Expected: PASS.

### Task 4: Reporte Markdown y CLI

**Files:**
- Create: `scripts/seo/report.test.mjs`
- Create: `scripts/seo/report.mjs`
- Create: `scripts/seo/analyze.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write failing report test**

Probar titulo mensual, rangos, resumen, tabla priorizada, consultas, cuarentena y
salida vacia explicita.

- [ ] **Step 2: Verify RED**

Run: `node --test scripts/seo/report.test.mjs`
Expected: FAIL porque el renderer no existe.

- [ ] **Step 3: Implement renderer and orchestration**

El CLI cargara `seo_log.json`, consultara ambos periodos, escribira el reporte en la
ruta indicada por `SEO_REPORT_PATH` y evitara imprimir secretos.

- [ ] **Step 4: Add package scripts**

Agregar:

```json
"seo:test": "node --test scripts/seo/*.test.mjs",
"seo:analyze": "node scripts/seo/analyze.mjs"
```

- [ ] **Step 5: Verify GREEN**

Run: `npm.cmd run seo:test`
Expected: todas las pruebas pasan.

### Task 5: GitHub Actions

**Files:**
- Create: `.github/workflows/seo-monthly.yml`

- [ ] **Step 1: Add workflow**

Configurar `workflow_dispatch` y cron del primer lunes mediante ejecucion semanal
con una condicion de dia `<= 7`. Conceder `issues: write` y `contents: read`.

- [ ] **Step 2: Configure secrets and report**

Mapear `GSC_CLIENT_EMAIL`, `GSC_PRIVATE_KEY` y `SEARCH_CONSOLE_SITE_URL`. Ejecutar
el analisis y usar `gh issue list/create/edit` para reutilizar el issue
`SEO mensual: YYYY-MM`.

- [ ] **Step 3: Validate syntax**

Parsear el YAML y revisar que ningun secreto aparezca en argumentos o logs.

### Task 6: Documentacion y migracion

**Files:**
- Create: `docs/seo_tracking/README.md`
- Modify: `docs/seo_tracking/analyze.js`

- [ ] **Step 1: Document Google setup**

Explicar proyecto Google Cloud, API, cuenta de servicio, clave JSON, alta del correo
como usuario restringido en Search Console y secretos de GitHub.

- [ ] **Step 2: Document operation**

Explicar ejecucion manual, mensual, lectura del issue, registro posterior en
`seo_log.json` y solucion de errores comunes.

- [ ] **Step 3: Retire legacy entry point safely**

Convertir `docs/seo_tracking/analyze.js` en un mensaje de migracion que indique
`npm run seo:analyze`, sin borrar los CSV historicos.

### Task 7: Full verification

**Files:**
- All changed files.

- [ ] **Step 1: Run tests**

Run: `npm.cmd run seo:test`
Expected: PASS, cero fallos.

- [ ] **Step 2: Run lint**

Run: `npm.cmd run lint`
Expected: exit code 0.

- [ ] **Step 3: Run production build**

Run: `npm.cmd run build`
Expected: exit code 0.

- [ ] **Step 4: Inspect diff and secrets**

Run: `git diff --check`
Expected: sin errores.

Run: `rg -n "BEGIN PRIVATE KEY|private_key_id|client_x509_cert_url" .github scripts docs package.json`
Expected: ninguna credencial real.

- [ ] **Step 5: Manual GitHub run**

Despues de configurar los secretos, ejecutar `SEO Monthly Analysis` desde Actions y
confirmar que crea un unico issue valido. Este paso requiere la cuenta del usuario y
se realizara como configuracion externa guiada.
