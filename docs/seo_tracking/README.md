# Medicion automatica de Search Console

Este sistema consulta Google Search Console, compara dos periodos cerrados de 28
dias y crea un issue mensual con oportunidades para mejorar articulos. No modifica
contenido automaticamente.

## Frecuencia

- Ejecucion programada: primer lunes de cada mes a las 13:15 UTC.
- Ejecucion manual: disponible desde GitHub Actions.
- Datos analizados: ultimos 28 dias finalizados tres dias antes de la ejecucion.
- Comparacion: los 28 dias inmediatamente anteriores.

El workflow se despierta cada lunes para poder identificar el primero del mes, pero
en los demas lunes termina antes de descargar el repositorio o instalar paquetes.

## 1. Crear el acceso en Google Cloud

1. Abre [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un proyecto, por ejemplo `aduanaspe-seo`.
3. En **APIs y servicios > Biblioteca**, habilita **Google Search Console API**.
4. En **IAM y administracion > Cuentas de servicio**, crea una cuenta llamada
   `search-console-reader`.
5. No le asignes roles del proyecto. El acceso a Search Console se concede aparte.
6. Abre la cuenta de servicio, entra a **Claves**, selecciona **Agregar clave >
   Crear clave nueva > JSON** y descarga el archivo.

La clave JSON es sensible. No debe copiarse al repositorio ni enviarse por chat.

Documentacion oficial:

- [Autorizacion de Search Console API](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing)
- [Crear cuentas de servicio](https://cloud.google.com/iam/docs/service-accounts-create)

## 2. Autorizar la cuenta en Search Console

1. Abre [Google Search Console](https://search.google.com/search-console).
2. Selecciona la propiedad de AduanasPE.
3. Entra a **Configuracion > Usuarios y permisos**.
4. Selecciona **Agregar usuario**.
5. Copia el valor `client_email` del JSON descargado.
6. Concede permiso **Restringido**. El sistema solo necesita leer rendimiento.

Para una propiedad de dominio, el identificador esperado normalmente es:

```text
sc-domain:aduanaspe.com
```

Si Search Console usa una propiedad de prefijo de URL, usa exactamente el valor que
aparece en la propiedad, por ejemplo:

```text
https://aduanaspe.com/
```

## 3. Crear secretos en GitHub

En el repositorio, abre **Settings > Secrets and variables > Actions > New
repository secret** y crea:

| Secreto | Valor |
|---|---|
| `GSC_CLIENT_EMAIL` | Valor `client_email` del JSON |
| `GSC_PRIVATE_KEY` | Valor completo `private_key`, incluyendo BEGIN/END |
| `SEARCH_CONSOLE_SITE_URL` | `sc-domain:aduanaspe.com` o el prefijo exacto |

GitHub acepta secretos multilina. Pega la clave privada completa sin comillas.

No se necesitan `private_key_id`, `client_id`, certificados ni el archivo JSON
completo.

## 4. Probar manualmente

1. Abre la pestana **Actions** del repositorio.
2. Selecciona **SEO Monthly Analysis**.
3. Pulsa **Run workflow**.
4. Espera a que finalice.
5. Abre **Issues** y revisa `SEO mensual: YYYY-MM`.

Una segunda ejecucion dentro del mismo mes actualiza ese issue.

## Ejecucion local

Define las tres variables de entorno y ejecuta:

```powershell
$env:GSC_CLIENT_EMAIL="search-console-reader@proyecto.iam.gserviceaccount.com"
$env:GSC_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----`n...`n-----END PRIVATE KEY-----`n"
$env:SEARCH_CONSOLE_SITE_URL="sc-domain:aduanaspe.com"
npm.cmd run seo:analyze
```

El reporte se escribe en `seo-report.md`. La ruta puede cambiarse con
`SEO_REPORT_PATH`.

Para ejecutar las pruebas sin contactar Google:

```powershell
npm.cmd run seo:test
```

## Interpretacion

- **Caida de trafico:** revisar vigencia, intencion y cambios de competencia.
- **CTR bajo:** evaluar titulo y descripcion antes de reescribir contenido.
- **Cerca del top:** reforzar cobertura y enlaces internos.
- **Consulta nueva:** decidir si ampliar una pagina o crear contenido dedicado.
- **Posible canibalizacion:** revisar si dos URLs resuelven la misma intencion.
- **Ganador:** mantener estable y evitar cambios innecesarios.

Las recomendaciones son candidatas para revision humana. Una caida no implica por si
sola que el articulo deba reescribirse.

## Registro de cambios

Cuando se actualice un articulo, agrega la fecha, URL, metrica previa, cambio y
consultas objetivo en `seo_log.json`. Durante 28 dias esa URL aparecera como
`watching` y no recibira nuevas recomendaciones de edicion.

## Problemas comunes

- **403 sufficient permission:** confirma que `client_email` fue agregado a la
  propiedad correcta de Search Console.
- **Faltan variables requeridas:** revisa los nombres exactos de los tres secretos.
- **Invalid JWT Signature:** vuelve a pegar `private_key` completa, sin comillas.
- **Reporte sin filas:** confirma el identificador de propiedad y que tenga datos en
  los rangos consultados.
- **No aparece el workflow:** el archivo debe estar presente en la rama principal de
  GitHub.

## Archivos historicos

Los directorios diarios `2026-02-*` permanecen como archivo historico. El sistema
nuevo consulta la API y ya no depende de esos CSV.
