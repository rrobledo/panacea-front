import { Form, Input, InputNumber, Select } from "antd";
import DataEdit from "../../components/DataEdit";
import CostosDetail from "./costosdetail/costosDetail";
import { useParams } from "react-router-dom";

function ProductosEdit(props: any) {
  const params = useParams();
  return (
    <div>
      <DataEdit ds={props.ds} resource={props.resource}>
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
          <Input readOnly={true} />
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
          label="Id de referencia"
          name="ref_id"
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
      </DataEdit>
      <CostosDetail
        ds={props.ds}
        resourceParent={`${props.resource}/${params.id}`}
        resource="costos"
      />
    </div>
  );
}

export default ProductosEdit;
