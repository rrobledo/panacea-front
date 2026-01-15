# Patrones de Formularios

## Estructura General

### Layout del Formulario

```
┌─────────────────────────────────────────────────────────────────┐
│ << Atras                              [Cancelar] [Acción]       │
├─────────────────────────────────────────────────────────────────┤
│ ⚠ Alerta de estado (si aplica)                                  │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Card: Sección 1                                             │ │
│ │ ┌──────────┐ ┌──────────┐ ┌──────────┐                     │ │
│ │ │ Campo 1  │ │ Campo 2  │ │ Campo 3  │                     │ │
│ │ └──────────┘ └──────────┘ └──────────┘                     │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Card: Sección 2                                             │ │
│ │ ┌──────────┐ ┌──────────┐                                  │ │
│ │ │ Campo 4  │ │ Campo 5  │                                  │ │
│ │ └──────────┘ └──────────┘                                  │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Componentes Utilizados

### Imports Necesarios

```tsx
import {
  Card,       // Para agrupar campos relacionados
  Col,        // Columnas del grid
  Row,        // Filas del grid
  Form,       // Formulario de Ant Design
  Input,      // Campo de texto
  InputNumber,// Campo numérico
  Select,     // Selector desplegable
  Switch,     // Toggle on/off
  Divider     // Separador visual (opcional)
} from "antd";
```

## Sistema de Grid

### Breakpoints Responsive

| Breakpoint | Código | Descripción |
|------------|--------|-------------|
| Extra small | `xs` | < 576px (móviles) |
| Small | `sm` | ≥ 576px (tablets) |
| Medium | `md` | ≥ 768px (desktop pequeño) |
| Large | `lg` | ≥ 992px (desktop) |
| Extra large | `xl` | ≥ 1200px (desktop grande) |

### Configuraciones Comunes de Columnas

```tsx
// 3 columnas en desktop, 2 en tablet, 1 en móvil
<Col xs={24} sm={12} md={8}>

// 4 columnas en desktop, 2 en tablet, 1 en móvil
<Col xs={24} sm={12} md={6}>

// 2 columnas en desktop y tablet, 1 en móvil
<Col xs={24} sm={12} md={12}>

// Switches pequeños (6 columnas en una fila)
<Col xs={12} sm={6} md={4}>
```

## Organización de Campos

### Agrupación Lógica

Los campos deben agruparse en Cards según su relación:

1. **Información Básica** - Identificadores y datos principales
   - Código, Nombre, Categoría
   - Estados (habilitado, activo, etc.)

2. **Precios y Valores** - Datos monetarios y porcentajes
   - Precio, Costo, Utilidad, Descuentos

3. **Producción/Operación** - Datos operativos
   - Cantidades, Unidades, Tiempos

4. **Referencias** - IDs externos y relaciones
   - IDs de sistemas externos, Relaciones con otras entidades

### Ejemplo de Card

```tsx
<Card title="Información Básica" size="small" style={{ marginBottom: 16 }}>
  <Row gutter={24}>
    <Col xs={24} sm={12} md={8}>
      <Form.Item
        label="Código"
        name="codigo"
        rules={[{ required: true, message: "Ingrese el código" }]}
      >
        <Input placeholder="Ej: PROD001" />
      </Form.Item>
    </Col>
    {/* Más campos... */}
  </Row>
</Card>
```

## Tipos de Campos

### Campo de Texto

```tsx
<Form.Item
  label="Nombre"
  name="nombre"
  rules={[{ required: true, message: "Ingrese el nombre" }]}
>
  <Input placeholder="Descripción del campo" />
</Form.Item>
```

### Campo de Texto Solo Lectura

```tsx
<Form.Item label="Código" name="codigo">
  <Input readOnly style={{ backgroundColor: "#f5f5f5" }} />
</Form.Item>
```

### Campo Numérico

```tsx
<Form.Item
  label="Cantidad"
  name="cantidad"
  rules={[{ required: true, message: "Ingrese la cantidad" }]}
>
  <InputNumber
    style={{ width: "100%" }}
    min={0}
    placeholder="0"
  />
</Form.Item>
```

### Campo de Precio

```tsx
<Form.Item
  label="Precio"
  name="precio"
  rules={[{ required: true, message: "Ingrese el precio" }]}
>
  <InputNumber
    style={{ width: "100%" }}
    prefix="$"
    precision={2}
    min={0}
    placeholder="0.00"
  />
</Form.Item>
```

### Campo de Porcentaje

```tsx
<Form.Item
  label="Utilidad (%)"
  name="utilidad"
  rules={[{ required: true, message: "Ingrese la utilidad" }]}
>
  <InputNumber
    style={{ width: "100%" }}
    suffix="%"
    min={0}
    max={100}
    placeholder="0"
  />
</Form.Item>
```

### Selector (Select)

```tsx
const OPCIONES = [
  { value: "OPCION1", label: "Opción 1" },
  { value: "OPCION2", label: "Opción 2" },
];

<Form.Item
  label="Categoría"
  name="categoria"
  rules={[{ required: true, message: "Seleccione una opción" }]}
>
  <Select placeholder="Seleccione">
    {OPCIONES.map((opt) => (
      <Select.Option key={opt.value} value={opt.value}>
        {opt.label}
      </Select.Option>
    ))}
  </Select>
</Form.Item>
```

### Switch (Toggle)

```tsx
<Form.Item
  label="Habilitado"
  name="habilitado"
  valuePropName="checked"  // ¡Importante para Switch!
>
  <Switch />
</Form.Item>
```

## Validación

### Reglas Comunes

```tsx
// Campo requerido
rules={[{ required: true, message: "Este campo es requerido" }]}

// Email
rules={[
  { required: true, message: "Ingrese el email" },
  { type: "email", message: "Email inválido" }
]}

// Longitud mínima/máxima
rules={[
  { required: true, message: "Ingrese el valor" },
  { min: 3, message: "Mínimo 3 caracteres" },
  { max: 50, message: "Máximo 50 caracteres" }
]}

// Patrón regex
rules={[
  { required: true, message: "Ingrese el código" },
  { pattern: /^[A-Z0-9]+$/, message: "Solo mayúsculas y números" }
]}
```

## Estilos

### Espaciado entre Cards

```tsx
<Card style={{ marginBottom: 16 }}>
```

### Gutter entre Columnas

```tsx
<Row gutter={24}>  {/* 24px de espacio entre columnas */}
```

### InputNumber Ancho Completo

```tsx
<InputNumber style={{ width: "100%" }} />
```

## Constantes Reutilizables

Definir opciones de selectores como constantes fuera del componente:

```tsx
const CATEGORIAS = [
  { value: "CAT1", label: "Categoría 1" },
  { value: "CAT2", label: "Categoría 2" },
];

const UNIDADES = [
  { value: "GR", label: "Gramos" },
  { value: "UN", label: "Unidades" },
  { value: "KG", label: "Kilogramos" },
  { value: "LT", label: "Litros" },
];

const ESTADOS = [
  { value: "ACTIVO", label: "Activo" },
  { value: "INACTIVO", label: "Inactivo" },
  { value: "PENDIENTE", label: "Pendiente" },
];
```
