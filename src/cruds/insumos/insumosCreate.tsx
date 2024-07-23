import { Form, Input, InputNumber, Select } from "antd";
import DataCreate from "../../components/DataCreate";

function InsumosCreate(props: any) {
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
        label="Medida"
        name="cantidad"
        rules={[
          {
            required: true,
            message: "Por Favor ingrese el valor!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Unidades"
        name="unidad_medida"
        rules={[
          {
            required: true,
            message: "Por Favor ingrese el valor!",
          },
        ]}
      >
        <Select>
          <Select.Option value="ML">Mililitros</Select.Option>
          <Select.Option value="GR">Gramos</Select.Option>
          <Select.Option value="UN">Unidades</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Precio"
        name="precio"
        rules={[
          {
            required: true,
            message: "Por Favor ingrese el valor!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
    </DataCreate>
  );
}

export default InsumosCreate;
