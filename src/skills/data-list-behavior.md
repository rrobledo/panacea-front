# Comportamiento del Componente DataList

## Descripcion

`DataList` es el componente wrapper para listados de datos. Maneja automaticamente:
- Carga de datos con filtros
- Persistencia de estado (filtros, scroll y fila seleccionada)
- Acciones CRUD (Ver, Editar, Eliminar)
- Manejo de errores
- Navegacion con restauracion de estado

## Ubicacion

```
src/components/DataList.tsx
src/utils/useListState.ts
```

## Props

| Prop | Tipo | Requerido | Descripcion |
|------|------|-----------|-------------|
| `ds` | DataResource | Si | Instancia del DataProvider |
| `resource` | string | Si | Nombre del recurso API |
| `columns` | ColumnType[] | Si | Columnas de la tabla |
| `listKey` | string | No | Clave unica para persistencia (default: resource) |
| `addAction` | boolean | No | Mostrar boton Nuevo (default: true) |
| `editAction` | boolean | No | Mostrar accion Editar (default: true) |
| `viewAction` | boolean | No | Mostrar accion Ver (default: true) |
| `delAction` | boolean | No | Mostrar accion Eliminar (default: true) |
| `rowIdName` | string | No | Nombre del campo ID (default: "id") |
| `filterAsForm` | ReactElement | No | Componente de filtros (GenericFilter) |
| `summaryList` | ReactElement | No | Componente de resumen |
| `scroll` | object | No | Configuracion de scroll de la tabla |
| `summary` | function | No | Funcion de resumen de la tabla |

## Ref Expuesto

```tsx
export interface DataListRef {
  refreshList: () => void;
  getFilterRef: () => GenericFilterRef | null;
}
```

## Persistencia de Estado

### Hook useListState

El hook `useListState` maneja la persistencia del estado del listado en sessionStorage.

```tsx
interface ListState {
  filters: Record<string, any>;  // Valores de los filtros
  scrollTop: number;              // Posicion de scroll
  timestamp: number;              // Timestamp para expiracion
  selectedRowId?: string | number; // ID de la fila seleccionada
}
```

### Funciones del Hook

```tsx
const { saveState, getState, clearState, scrollToRow } = useListState(listKey);
```

| Funcion | Descripcion |
|---------|-------------|
| `saveState(filters, scrollTop?, rowId?)` | Guarda el estado actual |
| `getState()` | Obtiene el estado guardado (null si expiro) |
| `clearState()` | Limpia el estado guardado |
| `scrollToRow(rowId, delay?)` | Hace scroll a una fila especifica y la resalta |

### Expiracion

El estado expira automaticamente despues de **30 minutos** de inactividad.

```tsx
const STATE_EXPIRY_MS = 30 * 60 * 1000; // 30 minutos
```

## Comportamientos

### 1. Guardado de Estado al Navegar

Cuando el usuario hace clic en "Ver", "Editar" o "Nuevo":
1. Se guardan los valores actuales de los filtros
2. Se guarda la posicion de scroll
3. Se guarda el ID de la fila clickeada (para Ver/Editar)
4. Se navega a la ruta correspondiente

```tsx
const handleNavigate = useCallback((path: string, state?: any, rowId?: string | number) => {
  const filterValues = filterRef.current?.getFilterValues();
  saveState(filterValues || {}, window.scrollY, rowId);
  navigate(path, { state });
}, [navigate, saveState]);
```

### 2. Restauracion de Estado al Volver

Al montar el componente:
1. Se obtiene el estado guardado de sessionStorage
2. Si existe y no ha expirado:
   - Se restauran los valores de los filtros
   - Se guarda el ID de fila pendiente para scroll
3. Se carga la data con los filtros restaurados
4. Despues de cargar, se hace scroll a la fila seleccionada

```tsx
// Restore state on mount
useEffect(() => {
  const savedState = getState();
  if (savedState && savedState.filters && Object.keys(savedState.filters).length > 0) {
    if (savedState.selectedRowId) {
      pendingScrollRowId.current = savedState.selectedRowId;
    }
    const restoreTimer = setTimeout(() => {
      if (filterRef.current) {
        filterRef.current.setFilterValues(savedState.filters);
        setStateRestored(true);
      }
    }, 50);
    return () => clearTimeout(restoreTimer);
  } else {
    setStateRestored(true);
  }
}, [getState]);
```

### 3. Scroll y Highlight de Fila

Despues de que la data carga, si hay una fila pendiente:
1. Se hace scroll para centrar la fila en la pantalla
2. Se aplica la clase `ant-table-row-selected` para resaltarla
3. El highlight se remueve automaticamente despues de 2 segundos

```tsx
const scrollToRow = useCallback((rowId: string | number, delay: number = 100) => {
  setTimeout(() => {
    const rowElement = document.querySelector(`tr[data-row-key="${rowId}"]`);
    if (rowElement) {
      rowElement.scrollIntoView({ behavior: "auto", block: "center" });
      // Add a brief highlight effect
      rowElement.classList.add("ant-table-row-selected");
      setTimeout(() => {
        rowElement.classList.remove("ant-table-row-selected");
      }, 2000);
    }
  }, delay);
}, []);
```

### 4. Conversion de Fechas en Filtros

El `GenericFilter` convierte fechas automaticamente:
- Al guardar: dayjs objects -> strings "YYYY-MM-DD"
- Al restaurar: strings "YYYY-MM-DD" -> dayjs objects

```tsx
// En GenericFilter.tsx
setFilterValues: (values: any) => {
  const processedValues = { ...values };
  attributesToConvertToDate?.forEach((key) => {
    if (processedValues[key] !== null && processedValues[key] !== undefined && typeof processedValues[key] === 'string') {
      processedValues[key] = dayjs(processedValues[key]);
    }
  });
  form.setFieldsValue(processedValues);
}
```

## Layout Visual

```
┌─────────────────────────────────────────────────────────────────┐
│ [Resumen - summaryList]                                         │
├─────────────────────────────────────────────────────────────────┤
│ [Filtros - filterAsForm]                    [Aplicar Filtros]   │
├─────────────────────────────────────────────────────────────────┤
│                                                       [Nuevo]   │
├─────────────────────────────────────────────────────────────────┤
│ | Col1 | Col2 | Col3 | ... | Accion                             │
│ |------|------|------|-----|----------------------------------- │
│ | dato | dato | dato | ... | Ver | Editar | Eliminar            │
│ | dato | dato | dato | ... | Ver | Editar | Eliminar            │
│ | dato | dato | dato | ... | Ver | Editar | Eliminar  <-- fila  │
│ | dato | dato | dato | ... | Ver | Editar | Eliminar     resalt │
│ | dato | dato | dato | ... | Ver | Editar | Eliminar            │
└─────────────────────────────────────────────────────────────────┘
```

## Uso con Filtros

```tsx
import DataList, { DataListRef } from "../../components/DataList";
import GenericFilter from "./GenericFilter";
import { useRef } from "react";
import { Form, DatePicker, Select, Col } from "antd";
import dayjs from "dayjs";

function MiEntidadList(props: any) {
  const dataListRef = useRef<DataListRef>(null);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    // ... mas columnas
  ];

  return (
    <DataList
      ref={dataListRef}
      ds={props.ds}
      resource={props.resource}
      columns={columns}
      filterAsForm={
        <GenericFilter
          attributesToConvertToDate={["fecha_desde", "fecha_hasta"]}
        >
          <Col span={5}>
            <Form.Item
              label="Fecha Desde"
              name="fecha_desde"
              initialValue={dayjs().startOf('month')}
            >
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="Estado"
              name="estado"
              initialValue="TODOS"
            >
              <Select>
                <Select.Option value="TODOS">TODOS</Select.Option>
                <Select.Option value="ACTIVO">ACTIVO</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </GenericFilter>
      }
    />
  );
}

export default MiEntidadList;
```

## Flujo de Estados

```
[Montaje del Listado]
    │
    ▼
[getState() - Busca estado guardado]
    │
    ├──► [No hay estado] ──► [stateRestored=true]
    │                              │
    │                              ▼
    │                        [getList()]
    │                              │
    │                              ▼
    │                        [Muestra datos]
    │
    └──► [Hay estado guardado]
              │
              ▼
         [Guarda pendingScrollRowId]
              │
              ▼
         [Restaura filtros en GenericFilter]
              │
              ▼
         [stateRestored=true]
              │
              ▼
         [getList() con filtros restaurados]
              │
              ▼
         [isLoading=false, data cargada]
              │
              ▼
         [scrollToRow(pendingScrollRowId)]
              │
              ▼
         [Scroll + Highlight 2s]


[Usuario hace clic en Editar]
    │
    ▼
[handleNavigate()]
    │
    ▼
[saveState(filters, scrollY, rowId)]
    │
    ▼
[Guarda en sessionStorage]
    │
    ▼
[navigate() a edicion]
    │
    ▼
[Usuario edita y guarda/cancela]
    │
    ▼
[navigate(-1) vuelve al listado]
    │
    ▼
[Se repite flujo de montaje con estado]
```

## GenericFilter Interface

```tsx
export interface GenericFilterRef {
  getFilterValues: () => any;      // Obtiene valores (fechas como strings)
  resetFilter: () => void;          // Resetea el formulario
  setFilterValues: (values: any) => void;  // Setea valores (convierte strings a dayjs)
}
```

## Notas Importantes

1. **rowKey**: La tabla debe usar `rowKey={rowIdName}` para que el selector `tr[data-row-key="..."]` funcione
2. **Expiracion**: El estado expira a los 30 minutos para evitar datos obsoletos
3. **Fechas**: Siempre usar `attributesToConvertToDate` en GenericFilter cuando haya DatePickers
4. **listKey**: Usar `listKey` prop si multiples listados usan el mismo `resource`
