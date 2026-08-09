# Integración local de Graphify

## Objetivo

Dejar Graphify operativo en este repositorio para que Codex pueda consultar un grafo de conocimiento del código sin modificar la aplicación Next.js ni enviar archivos a servicios externos.

## Alcance

La primera integración cubrirá únicamente el código fuente y los archivos que Graphify pueda analizar localmente mediante AST. No incluirá extracción semántica de documentos, PDF, imágenes, bases de datos ni un servidor MCP.

El resultado debe permitir:

- ejecutar el comando `graphify` desde el entorno local;
- indicar a Codex que consulte el grafo antes de recorrer el repositorio manualmente;
- generar `graphify-out/graph.json` y la visualización o reporte que produzca la versión instalada en modo local;
- ejecutar al menos una consulta contra el grafo generado.

## Diseño

### Instalación de la herramienta

Graphify se instalará como herramienta de usuario mediante `uv tool install graphifyy`. No se agregará a `package.json`, porque no es una dependencia de ejecución ni de desarrollo de la aplicación.

Antes de instalar se comprobará si `graphify` ya está disponible. Si existe, se reutilizará o actualizará solo cuando sea necesario para evitar instalaciones duplicadas.

### Integración con Codex

Desde la raíz del repositorio se ejecutará `graphify codex install`. Según el comportamiento documentado de Graphify, esto puede crear o actualizar:

- `AGENTS.md`, con instrucciones para priorizar consultas al grafo;
- `.codex/hooks.json`, con la integración compatible con Codex Desktop.

Antes y después del comando se revisarán esos archivos para asegurar que no se sobrescriban instrucciones existentes. En el estado previo al diseño no existe `AGENTS.md` y `.codex/` no contiene archivos, por lo que no hay configuración conocida que preservar.

### Generación del grafo

Se ejecutará desde la raíz:

```powershell
graphify extract . --code-only
```

El modo `--code-only` mantiene el análisis local, no necesita credenciales de un proveedor de IA y excluye la extracción semántica de documentos y activos.

### Archivos generados y control de versiones

`graphify-out/` se tratará como artefacto local regenerable y se añadirá a `.gitignore`. Esto evita incorporar al repositorio archivos grandes o volátiles y reduce conflictos al actualizar el grafo.

Las instrucciones de integración creadas para Codex sí podrán versionarse, después de revisar su contenido, porque forman parte de la configuración compartida del proyecto.

## Flujo de uso

Después de la instalación inicial:

1. Codex consulta el grafo con `graphify query`, `graphify path` o `graphify explain` para preguntas sobre la arquitectura.
2. Cuando cambie el código, se vuelve a ejecutar `graphify extract . --code-only`; solo se usará un modo incremental si `graphify extract --help` confirma que la versión instalada lo admite.
3. La visualización local queda disponible en `graphify-out/graph.html`.

## Manejo de errores

- Si `uv` no puede descargar el paquete, se detendrá la instalación y se reportará el error sin usar un instalador alternativo automáticamente.
- Si el ejecutable no queda disponible en `PATH`, se localizará mediante `uv tool dir --bin` y se validará la instalación antes de continuar.
- Si `graphify codex install` altera archivos inesperados, no se aceptarán esos cambios hasta inspeccionarlos.
- Si la extracción falla, se conservará cualquier salida previa válida y se reportará la causa; no se forzará una salida parcial.

## Verificación

La integración se considerará correcta cuando:

1. `graphify --help` o el comando equivalente confirme que la CLI está disponible.
2. Las instrucciones de Codex estén presentes y no contradigan las reglas existentes del repositorio.
3. Exista un `graphify-out/graph.json` válido y no vacío.
4. `graphify query` responda una pregunta sencilla sobre el proyecto, por ejemplo qué componentes se relacionan con los formularios.
5. `git status` muestre únicamente los cambios de configuración intencionales y no incluya `graphify-out/`.

## Fuera de alcance

- Configurar Graphify como dependencia npm.
- Analizar semánticamente `docs/`, PDF, imágenes o contenido editorial.
- Añadir credenciales de OpenAI u otro proveedor.
- Ejecutar Graphify como servicio MCP o proceso permanente.
- Automatizar la regeneración en CI o mediante hooks de Git.
