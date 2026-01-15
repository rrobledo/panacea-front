# Skills - Patrones y Comportamientos de UI

Esta carpeta contiene la documentación de los patrones de diseño y comportamientos implementados en la aplicación. Sirve como referencia para mantener consistencia al crear nuevos formularios o componentes.

## Contenido

1. [Patrones de Formularios](./form-patterns.md) - Layout, estructura y organización de formularios
2. [Componente DataEdit](./data-edit-behavior.md) - Comportamiento del formulario de edición
3. [Componente DataCreate](./data-create-behavior.md) - Comportamiento del formulario de creación
4. [Plantilla de Ejemplo](./form-template-example.tsx) - Código de ejemplo para nuevos formularios

## Principios de Diseño

### 1. Consistencia
- Todos los formularios deben seguir el mismo patrón de layout
- Los botones siempre van en la esquina superior derecha
- Los mensajes de error y éxito usan el sistema de notificaciones centralizado

### 2. Usabilidad
- Campos agrupados lógicamente en Cards
- Layout responsive usando Row/Col de Ant Design
- Feedback visual cuando hay cambios sin guardar

### 3. Feedback al Usuario
- Toast notifications para operaciones exitosas
- Alerts para errores
- Indicadores de estado (loading, dirty, etc.)

## Cómo Usar

Al crear un nuevo formulario CRUD:

1. Copiar la plantilla de `form-template-example.tsx`
2. Seguir los patrones documentados en `form-patterns.md`
3. Usar los componentes `DataCreate` y `DataEdit` que ya implementan los comportamientos estándar
