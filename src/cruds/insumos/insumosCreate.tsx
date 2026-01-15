import { Card, Col, Form, Input, InputNumber, Row, Select } from "antd";
import DataCreate from "../../components/DataCreate";

const UNIDADES = [
  { value: "ML", label: "Mililitros" },
  { value: "GR", label: "Gramos" },
  { value: "UN", label: "Unidades" },
  { value: "KG", label: "Kilogramos" },
  { value: "LT", label: "Litros" },
];

function InsumosCreate(props: any) {
  return (
    <DataCreate ds={props.ds} resource={props.resource}>
      {/* Información del Insumo */}
      <Card title="Información del Insumo" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={24}>
          <Col xs={24} sm={12} md={12}>
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
    </DataCreate>
  );
}

export default InsumosCreate;
