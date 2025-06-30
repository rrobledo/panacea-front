import { Form, Input, InputNumber, Select, Switch } from "antd";
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

        <Form.Item label="Categoria" name="categoria">
          <Select>
            <Select.Option value="ALFAJORES">ALFAJORES</Select.Option>
            <Select.Option value="BOLLERIA">BOLLERIA</Select.Option>
            <Select.Option value="BUDINES">BUDINES</Select.Option>
            <Select.Option value="CUADRADOS">CUADRADOS</Select.Option>
            <Select.Option value="FACTURAS">FACTURAS</Select.Option>
            <Select.Option value="GALLETAS">GALLETAS</Select.Option>
            <Select.Option value="PANADERIA">PANADERIA</Select.Option>
            <Select.Option value="PASTAS">PASTAS</Select.Option>
            <Select.Option value="PASTELERIA">PASTELERIA</Select.Option>
            <Select.Option value="PIZZAS">PIZZAS</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Habilitado" name="habilitado">
          <Switch />
        </Form.Item>

        <Form.Item label="Producto Final" name="is_producto">
          <Switch />
        </Form.Item>

        <Form.Item
          label="Prioridad"
          name="prioridad"
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
