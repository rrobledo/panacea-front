import { Card, Col, Divider, Form, Input, InputNumber, Row, Select, Switch } from "antd";
import DataEdit from "../../components/DataEdit";
import CostosDetail from "./costosdetail/costosDetail";
import { useParams } from "react-router-dom";

const CATEGORIAS = [
  { value: "ALFAJORES", label: "Alfajores" },
  { value: "BOLLERIA", label: "Bollería" },
  { value: "BUDINES", label: "Budines" },
  { value: "CUADRADOS", label: "Cuadrados" },
  { value: "FACTURAS", label: "Facturas" },
  { value: "GALLETAS", label: "Galletas" },
  { value: "PANADERIA", label: "Panadería" },
  { value: "PASTAS", label: "Pastas" },
  { value: "PASTELERIA", label: "Pastelería" },
  { value: "PIZZAS", label: "Pizzas" },
];

const UNIDADES = [
  { value: "GR", label: "Gramos" },
  { value: "UN", label: "Unidades" },
];

function ProductosEdit(props: any) {
  const params = useParams();

  return (
    <div>
      <DataEdit ds={props.ds} resource={props.resource}>
        {/* Información Básica */}
        <Card title="Información Básica" size="small" style={{ marginBottom: 16 }}>
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Código"
                name="codigo"
                rules={[{ required: true, message: "Ingrese el código" }]}
              >
                <Input readOnly style={{ backgroundColor: "#f5f5f5" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[{ required: true, message: "Ingrese el nombre" }]}
              >
                <Input placeholder="Nombre del producto" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Categoría"
                name="categoria"
                rules={[{ required: true, message: "Seleccione una categoría" }]}
              >
                <Select placeholder="Seleccione categoría">
                  {CATEGORIAS.map((cat) => (
                    <Select.Option key={cat.value} value={cat.value}>
                      {cat.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={12} sm={6} md={4}>
              <Form.Item
                label="Habilitado"
                name="habilitado"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Item
                label="Producto Final"
                name="is_producto"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Id Referencia"
                name="ref_id"
                rules={[{ required: true, message: "Ingrese el ID de referencia" }]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="ID externo" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Precios */}
        <Card title="Precios y Márgenes" size="small" style={{ marginBottom: 16 }}>
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Precio Actual"
                name="precio_actual"
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
            </Col>
            <Col xs={24} sm={12} md={8}>
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
            </Col>
          </Row>
        </Card>

        {/* Producción */}
        <Card title="Producción" size="small" style={{ marginBottom: 16 }}>
          <Row gutter={24}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label="Lote Producción"
                name="lote_produccion"
                rules={[{ required: true, message: "Ingrese el lote" }]}
              >
                <InputNumber style={{ width: "100%" }} min={1} placeholder="Cantidad" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label="Unidad de Medida"
                name="unidad_medida"
                rules={[{ required: true, message: "Seleccione la unidad" }]}
              >
                <Select placeholder="Seleccione">
                  {UNIDADES.map((u) => (
                    <Select.Option key={u.value} value={u.value}>
                      {u.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label="Tiempo Producción (min)"
                name="tiempo_produccion"
                rules={[{ required: true, message: "Ingrese el tiempo" }]}
              >
                <InputNumber style={{ width: "100%" }} min={0} placeholder="Minutos" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label="Prioridad"
                name="prioridad"
                rules={[{ required: true, message: "Ingrese la prioridad" }]}
              >
                <InputNumber style={{ width: "100%" }} min={0} placeholder="1-100" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </DataEdit>

      {/* Costos del Producto */}
      <Divider orientation="left">Costos del Producto</Divider>
      <CostosDetail
        ds={props.ds}
        resourceParent={`${props.resource}/${params.id}`}
        resource="costos"
      />
    </div>
  );
}

export default ProductosEdit;
