# Comportamiento del Componente DataCreate

## Descripción

`DataCreate` es el componente wrapper para formularios de creación. Maneja automáticamente:
- Valores por defecto
- Envío de datos
- Manejo de errores
- Navegación

## Ubicación

```
src/components/DataCreate.tsx
```

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `ds` | DataResource | Sí | Instancia del DataProvider |
| `resource` | string | Sí | Nombre del recurso API |
| `defaultValues` | object | No | Valores iniciales del formulario |
| `form` | FormInstance | No | Instancia de Form externa |
| `attributesToConvertToDate` | string[] | No | Campos a convertir a fecha |
| `imageAttributes` | string[] | No | Campos de imagen para base64 |
| `children` | ReactNode | Sí | Contenido del formulario |

## Estados Internos

```tsx
const [isLoading, setIsLoading] = useState(false);     // Guardando
const [error, setError] = useState<string | null>(null); // Error de guardado
```

## Comportamientos

### 1. Valores por Defecto

Si se proporcionan `defaultValues`, se setean al montar:

```tsx
useEffect(() => {
  if (defaultValues !== undefined) {
    form.setFieldsValue(defaultValues);
  }
}, []);
```

### 2. Envío del Formulario

```tsx
const onsubmit = async (values) => {
  setError(null);

  // Conversión de fechas
  attributesToConvertToDate.forEach((key) => {
    if (values[key]) {
      values[key] = dayjs(values[key]).format("YYYY-MM-DD");
    }
  });

  // Conversión de imágenes a base64
  for (const key of imageAttributes) {
    if (values[key]) {
      values[key] = await toBase64(values[key]);
    }
  }

  setIsLoading(true);
  dataSource
    .post(`${resourceParentParam}${props.resource}`, values)
    .then(() => {
      toast.success("Registro creado correctamente");
      navigate(-1);
    })
    .catch((err) => {
      setError(err.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
```

### 3. Manejo de Errores

- Muestra Alert rojo en la parte superior
- Permite cerrar el alert
- El formulario permanece con los datos para corregir

### 4. Notificaciones

- **Éxito:** Toast verde "Registro creado correctamente"
- **Error:** Notification roja con detalles (desde DataProvider)

## Layout Visual

```
┌─────────────────────────────────────────────────────────────────┐
│ << Atras                              [Cancelar] [+ Crear]      │
├─────────────────────────────────────────────────────────────────┤
│ ✕ Error al crear: [mensaje] (si hay error)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    [Contenido del Formulario]                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Botones

| Botón | Icono | Acción |
|-------|-------|--------|
| Cancelar | CloseOutlined | Vuelve a la página anterior |
| Crear | PlusOutlined | Envía el formulario |

```tsx
<Space>
  <Button
    icon={<CloseOutlined />}
    onClick={() => navigate(-1)}
    disabled={isLoading}
  >
    Cancelar
  </Button>
  <Button
    type="primary"
    icon={<PlusOutlined />}
    onClick={() => form.submit()}
    loading={isLoading}
  >
    Crear
  </Button>
</Space>
```

## Uso

```tsx
import DataCreate from "../../components/DataCreate";
import { Card, Col, Form, Input, Row } from "antd";

function MiEntidadCreate(props: any) {
  return (
    <DataCreate ds={props.ds} resource={props.resource}>
      <Card title="Nueva Entidad" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Campo"
              name="campo"
              rules={[{ required: true, message: "Requerido" }]}
            >
              <Input placeholder="Ingrese valor" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </DataCreate>
  );
}

export default MiEntidadCreate;
```

## Con Valores por Defecto

```tsx
function MiEntidadCreate(props: any) {
  return (
    <DataCreate
      ds={props.ds}
      resource={props.resource}
      defaultValues={{
        estado: "ACTIVO",
        habilitado: true,
        cantidad: 1
      }}
    >
      {/* Campos del formulario */}
    </DataCreate>
  );
}
```

## Con Conversión de Fechas

```tsx
function MiEntidadCreate(props: any) {
  return (
    <DataCreate
      ds={props.ds}
      resource={props.resource}
      attributesToConvertToDate={["fecha_inicio", "fecha_fin"]}
    >
      <Form.Item label="Fecha Inicio" name="fecha_inicio">
        <DatePicker format="DD/MM/YYYY" />
      </Form.Item>
    </DataCreate>
  );
}
```

## Flujo de Estados

```
[Montaje]
    │
    ├──► [defaultValues?] ──► form.setFieldsValues()
    │
    ▼
[Formulario listo]
    │
    ▼
[Usuario completa y envía]
    │
    ▼
[isLoading=true] ──► Spinner "Guardando..."
    │
    ▼
[API.post()]
    │
    ├──► [Error] ──► Alert rojo, formulario intacto
    │
    └──► [Éxito] ──► Toast verde, navigate(-1)
```

## Diferencias con DataEdit

| Aspecto | DataCreate | DataEdit |
|---------|------------|----------|
| Carga inicial | No carga datos | Carga datos existentes |
| Dirty state | No aplica | Detecta cambios |
| Confirmación salir | No | Sí (si hay cambios) |
| Método API | POST | PATCH |
| Botón principal | "Crear" | "Actualizar" |
| Icono | PlusOutlined | SaveOutlined |

## Iconos Utilizados

```tsx
import {
  PlusOutlined,   // Botón crear
  CloseOutlined   // Botón cancelar
} from "@ant-design/icons";
```
