import { Card, Col, Form, Input, Row } from "antd";
import DataEdit from "../../components/DataEdit";

function ProveedoresEdit(props: any) {
  return (
    <DataEdit ds={props.ds} resource={props.resource}>
      {/* Información del Proveedor */}
      <Card title="Información del Proveedor" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={24}>
          <Col xs={24} sm={8} md={4}>
            <Form.Item label="ID" name="id">
              <Input readOnly style={{ backgroundColor: "#f5f5f5" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={16} md={10}>
            <Form.Item
              label="Nombre"
              name="nombre"
              rules={[{ required: true, message: "Ingrese el nombre del proveedor" }]}
            >
              <Input placeholder="Razón social o nombre" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="CUIT"
              name="cuit"
              rules={[{ required: true, message: "Ingrese el CUIT" }]}
            >
              <Input placeholder="XX-XXXXXXXX-X" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Información de Contacto */}
      <Card title="Información de Contacto" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Teléfono"
              name="telefono"
              rules={[{ required: true, message: "Ingrese el teléfono" }]}
            >
              <Input placeholder="Ej: +54 11 1234-5678" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={10}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Ingrese el email" },
                { type: "email", message: "Ingrese un email válido" }
              ]}
            >
              <Input placeholder="correo@ejemplo.com" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Ubicación */}
      <Card title="Ubicación" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={24}>
          <Col xs={24}>
            <Form.Item
              label="Dirección"
              name="direccion"
              rules={[{ required: true, message: "Ingrese la dirección" }]}
            >
              <Input placeholder="Calle, número, localidad, provincia" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </DataEdit>
  );
}

export default ProveedoresEdit;
