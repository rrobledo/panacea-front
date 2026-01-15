# Comportamiento del Componente DataEdit

## Descripción

`DataEdit` es el componente wrapper para formularios de edición. Maneja automáticamente:
- Carga de datos existentes
- Detección de cambios (dirty state)
- Guardado con feedback
- Manejo de errores
- Navegación

## Ubicación

```
src/components/DataEdit.tsx
```

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `ds` | DataResource | Sí | Instancia del DataProvider |
| `resource` | string | Sí | Nombre del recurso API |
| `editable` | boolean | No | Si el formulario es editable (default: true) |
| `attributesToConvertToDate` | string[] | No | Campos a convertir a fecha |
| `imageAttributes` | string[] | No | Campos de imagen para base64 |
| `children` | ReactNode | Sí | Contenido del formulario |

## Estados Internos

```tsx
const [isLoading, setIsLoading] = useState(true);      // Cargando datos
const [isSaving, setIsSaving] = useState(false);       // Guardando
const [isFormDirty, setIsFormDirty] = useState(false); // Cambios sin guardar
const [error, setError] = useState<string | null>(null);      // Error de carga
const [saveError, setSaveError] = useState<string | null>(null); // Error de guardado
```

## Comportamientos

### 1. Carga de Datos

Al montar el componente:
1. Muestra spinner de carga
2. Obtiene datos del API usando el `id` de la URL
3. Setea los valores en el formulario
4. Resetea el estado `isFormDirty` a false

```tsx
const getItem = () => {
  setIsLoading(true);
  setError(null);

  dataSource
    .get(`${resourceParent}${props.resource}`, params.id)
    .then((res) => {
      form.setFieldsValue(res.data);
      setIsFormDirty(false);
    })
    .catch((err) => {
      setError(err.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
```

### 2. Detección de Cambios (Dirty State)

- Se activa `isFormDirty = true` cuando cualquier campo cambia
- El botón "Actualizar" está deshabilitado si no hay cambios
- Se muestra alerta amarilla cuando hay cambios sin guardar
- Al intentar salir con cambios, se muestra confirmación

```tsx
const handleValuesChange = () => {
  setIsFormDirty(true);
};

// En el Form
<Form onValuesChange={handleValuesChange}>
```

### 3. Botón de Actualizar

| Estado | Texto | Habilitado | Icono |
|--------|-------|------------|-------|
| Sin cambios | "Sin cambios" | No | SaveOutlined |
| Con cambios | "Actualizar" | Sí | SaveOutlined |
| Guardando | "Actualizar" | No (loading) | Spinner |

```tsx
<Button
  type="primary"
  icon={<SaveOutlined />}
  onClick={() => form.submit()}
  loading={isSaving}
  disabled={!isFormDirty}
>
  {isFormDirty ? "Actualizar" : "Sin cambios"}
</Button>
```

### 4. Confirmación al Salir

Si hay cambios sin guardar y el usuario intenta salir:

```tsx
const handleCancel = () => {
  if (isFormDirty) {
    if (window.confirm("Hay cambios sin guardar. ¿Desea salir de todas formas?")) {
      navigate(-1);
    }
  } else {
    navigate(-1);
  }
};
```

### 5. Manejo de Errores

**Error de carga:**
- Muestra pantalla de error con botones "Volver" y "Reintentar"

**Error de guardado:**
- Muestra Alert rojo en la parte superior
- Permite cerrar el alert y reintentar

### 6. Notificaciones

- **Éxito:** Toast verde "Registro actualizado correctamente"
- **Error:** Notification roja con detalles del error

## Layout Visual

```
┌─────────────────────────────────────────────────────────────────┐
│ << Atras                         [Cancelar] [Actualizar/Sin c.] │
├─────────────────────────────────────────────────────────────────┤
│ ✕ Error al guardar: [mensaje] (si hay error)                    │
├─────────────────────────────────────────────────────────────────┤
│ ⚠ Hay cambios sin guardar (si isFormDirty)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    [Contenido del Formulario]                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Uso

```tsx
import DataEdit from "../../components/DataEdit";
import { Card, Col, Form, Input, Row } from "antd";

function MiEntidadEdit(props: any) {
  return (
    <DataEdit ds={props.ds} resource={props.resource}>
      <Card title="Información" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Campo"
              name="campo"
              rules={[{ required: true, message: "Requerido" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </DataEdit>
  );
}

export default MiEntidadEdit;
```

## Flujo de Estados

```
[Montaje]
    │
    ▼
[isLoading=true] ──► Spinner "Cargando..."
    │
    ▼
[API.get()]
    │
    ├──► [Error] ──► Pantalla de error con "Reintentar"
    │
    └──► [Éxito] ──► [isLoading=false, isFormDirty=false]
                          │
                          ▼
                    [Usuario edita]
                          │
                          ▼
                    [isFormDirty=true]
                    Alerta amarilla
                    Botón habilitado
                          │
                          ▼
                    [Usuario guarda]
                          │
                          ▼
                    [isSaving=true] ──► Botón loading
                          │
                          ├──► [Error] ──► Alert rojo, permite reintentar
                          │
                          └──► [Éxito] ──► Toast verde, navigate(-1)
```

## Iconos Utilizados

```tsx
import {
  ReloadOutlined,  // Botón reintentar
  SaveOutlined,    // Botón actualizar
  CloseOutlined    // Botón cancelar
} from "@ant-design/icons";
```
