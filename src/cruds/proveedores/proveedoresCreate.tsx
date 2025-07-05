import { Form, Input, InputNumber, Select } from "antd";
import DataCreate from "../../components/DataCreate";

function ProveedoresCreate(props: any) {
  return (
    <DataCreate ds={props.ds} resource={props.resource}>
      <Form.Item
        label="Nombre"
        name="nombre"
        rules={[
          {
            required: true,
            message: "Por Favor ingrese el valor!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Cuit"
        name="cuit"
        rules={[
          {
            required: true,
            message: "Por Favor ingrese el valor!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Direccion"
        name="direccion"
        rules={[
          {
            required: true,
            message: "Por Favor ingrese el valor!",
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Telefono"
        name="telefono"
        rules={[
          {
            required: true,
            message: "Por Favor ingrese el valor!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Por Favor ingrese el valor!",
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>
    </DataCreate>
  );
}

export default ProveedoresCreate;
