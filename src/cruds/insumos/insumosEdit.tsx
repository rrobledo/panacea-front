import { Card, Col, Form, Input, InputNumber, Row, Select } from "antd";
import DataEdit from "../../components/DataEdit";

const UNIDADES = [
  { value: "ML", label: "Mililitros" },
  { value: "GR", label: "Gramos" },
  { value: "UN", label: "Unidades" },
  { value: "KG", label: "Kilogramos" },
  { value: "LT", label: "Litros" },
];

function InsumosEdit(props: any) {
  return (
    <DataEdit ds={props.ds} resource={props.resource}>
      {/* Información del Insumo */}
      <Card title="Información del Insumo" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={24}>
          <Col xs={24} sm={8} md={4}>
            <Form.Item
              label="ID"
              name="id"
            >
              <Input readOnly style={{ backgroundColor: "#f5f5f5" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={16} md={12}>
            <Form.Item
              label="Nombre"
              name="nombre"
              rules={[{ required: true, message: "Ingrese el nombre del insumo" }]}
            >
              <Input placeholder="Nombre del insumo" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Medidas y Precio */}
      <Card title="Medidas y Precio" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8}>
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
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Unidad de Medida"
              name="unidad_medida"
              rules={[{ required: true, message: "Seleccione la unidad" }]}
            >
              <Select placeholder="Seleccione unidad">
                {UNIDADES.map((u) => (
                  <Select.Option key={u.value} value={u.value}>
                    {u.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
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
          </Col>
        </Row>
      </Card>
    </DataEdit>
  );
}

export default InsumosEdit;
