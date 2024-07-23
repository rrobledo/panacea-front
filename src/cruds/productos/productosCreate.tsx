import { Form, Input, InputNumber, Select } from "antd";
import DataCreate from "../../components/DataCreate";
import CostosDetail from "./costosdetail/costosDetail";
import { useParams } from "react-router-dom";

function ProductosCreate(props: any) {
  const params = useParams();
  return (
    <div>
      <DataCreate ds={props.ds} resource={props.resource}>
        <Form.Item
          label="Codigo"
          name="codigo"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Precio"
          name="precio_actual"
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
          label="Utilidad"
          name="utilidad"
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
          label="Lote Produccion"
          name="lote_produccion"
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
          label="Medida"
          name="unidad_medida"
          rules={[
            {
              required: true,
              message: "Por Favor ingrese el valor!",
            },
          ]}
        >
          <Select>
            <Select.Option value="GR">Gramos</Select.Option>
            <Select.Option value="UN">Unidades</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Tiempos de produccion"
          name="tiempo_produccion"
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
    </div>
  );
}

export default ProductosCreate;
