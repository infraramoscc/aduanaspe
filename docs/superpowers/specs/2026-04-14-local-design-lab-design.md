# Local Design Lab Design

**Fecha:** 2026-04-14

## Objetivo

Crear un laboratorio visual local para definir el sistema de diseño del proyecto sin riesgo de enviar experimentos a Git o a producción.

## Prioridad UX

1. Comparar decisiones visuales en componentes reales y variantes experimentales
2. Guardar decisiones aprobadas de forma estructurada
3. Convertir esas decisiones en cambios aplicables al sistema real del proyecto

## Problema Actual

- El proyecto mezcla variables globales amplias con componentes `ui` más sobrios.
- No existe una superficie única para comparar paletas, tipografías, animaciones y componentes.
- Las decisiones visuales dependen de prueba y error manual sobre archivos productivos.
- No hay un flujo intermedio entre “me gusta esta dirección” y “aplícalo a todo el proyecto”.

## Enfoque Aprobado

Dirección del producto interno: **laboratorio local interactivo estilo design system workshop**.

- Ruta local solo para desarrollo y fuera de Git.
- Navegación por categorías similar al orden mental de `shadcn/ui`.
- Comparación entre estado actual, propuesta candidata y preview aplicada.
- Botón para promover decisiones aprobadas a un archivo local estructurado.
- El laboratorio nunca modifica directamente el código productivo.
- El agente aplica después las decisiones aprobadas al sistema real mediante una tarea explícita.

## Cambios de Diseño

### 1. Laboratorio local aislado

- Crear una ruta local tipo `/__design-lab`.
- Implementarla en archivos ignorados por Git para que no entren al repositorio.
- Mantenerla fuera de la navegación pública y fuera del flujo productivo.
- Reusar el layout global mínimo necesario, pero sin `Header`, `Footer` ni nudges comerciales.

### 2. Navegación por categorías

Categorías iniciales:

- `Colors & Tokens`
- `Typography`
- `Buttons`
- `Forms`
- `Cards & Surfaces`
- `Motion`

Cada categoría tendrá:

- panel principal de preview
- panel lateral de controles
- vista `Current`
- vista `Candidate`
- vista `Applied Preview`

### 3. Interacción y toma de decisiones

- El usuario podrá ajustar valores interactivos por categoría.
- Los previews se actualizarán en vivo usando componentes reales y variantes experimentales.
- Cada decisión podrá guardarse como `draft` o promoverse como `approved`.
- El botón principal de promoción escribirá una decisión estructurada y no un parche directo al código.

### 4. Archivo local de decisiones

- Guardar decisiones en un archivo ignorado por Git, por ejemplo `docs/design-lab/decisions.local.json`.
- Modelar decisiones por categoría, token y estado.
- La estructura debe ser fácil de leer por el agente y suficientemente estricta para evitar ambigüedad.

Estructura base esperada:

- `tokens.colors`
- `typography`
- `components.button`
- `components.form`
- `components.card`
- `motion`

Cada entrada debe incluir al menos:

- `category`
- `target`
- `value`
- `status`
- `updatedAt`

### 5. Promoción al sistema real

Flujo aprobado:

1. El usuario prueba variantes en el laboratorio local.
2. Marca una decisión como aprobada.
3. El laboratorio actualiza `decisions.local.json`.
4. El usuario pide al agente aplicar las decisiones aprobadas.
5. El agente lee el archivo y actualiza tokens y componentes reales del proyecto.
6. Esos cambios ya entran al flujo normal de revisión, commit y despliegue.

### 6. Aplicación esperada en el proyecto

La promoción posterior debe impactar principalmente:

- `src/app/globals.css`
- componentes en `src/components/ui`
- estilos compartidos usados por secciones y formularios

La primera versión debe preparar el terreno para aplicar:

- colores base y semánticos
- tipografías y jerarquías
- estilos base de botones
- estilos base de formularios
- superficies y cards
- motion tokens y transiciones compartidas

## Flujo de Datos

- El laboratorio genera estado visual local en memoria para la sesión.
- Al promover una decisión, ese estado se serializa al archivo local de decisiones.
- El sistema productivo no consume ese archivo automáticamente.
- El agente actúa como paso explícito de traducción entre decisiones aprobadas y código real.

## Seguridad y Guardrails

- El laboratorio debe estar aislado del código versionado.
- El archivo de decisiones también debe quedar ignorado por Git.
- Solo decisiones con estado `approved` pueden considerarse candidatas para aplicación real.
- Los borradores no deben alterar el sistema productivo.
- Si el archivo local no existe, el laboratorio debe poder inicializarlo de forma segura.
- Si una categoría todavía no tiene decisión aprobada, el agente no debe inventar valores al promover.

## Verificación

- Confirmar que la ruta local funcione solo en entorno local.
- Confirmar que los archivos del laboratorio y decisiones estén ignorados por Git.
- Confirmar que cada categoría refleje cambios en previews reales.
- Confirmar que `decisions.local.json` se escriba con forma consistente.
- Confirmar que el flujo de promoción posterior pueda mapear decisiones a archivos reales del proyecto.

## Alcance

- Ruta local de laboratorio visual
- Shell del laboratorio con sidebar y categorías iniciales
- Estado interactivo para previews
- Escritura local de decisiones aprobadas
- Estructura base para futura aplicación por agente

## Fuera de Alcance

- Aplicación automática al sistema productivo desde la propia UI del laboratorio
- Persistencia remota o multiusuario
- Versionado histórico complejo de decisiones
- Apertura pública del laboratorio en staging o producción
- Cobertura completa de todos los componentes del proyecto en la primera iteración
