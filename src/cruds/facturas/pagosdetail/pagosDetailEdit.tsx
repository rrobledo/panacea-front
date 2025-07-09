import { Form, Input, InputNumber, Select } from "antd";
import DataEdit from "../../../components/DataEdit";
import { useParams } from "react-router-dom";

function CostosEdit(props: any) {
  const params = useParams();
  return (
    <div>
      <DataEdit ds={props.ds} resource={props.resource}>
        <Form.Item label="Codigo de producto" name="producto">
          <Input readOnly={true} />
        </Form.Item>
        <Form.Item label="Codigo de insumo" name="insumo">
          <Input readOnly={true} />
        </Form.Item>

        <Form.Item label="Insumo" name="insumo_nombre">
          <Input readOnly={true} />
        </Form.Item>

        <Form.Item label="Medida" name="insumo_unidad_medida">
          <Input readOnly={true} />
        </Form.Item>

        <Form.Item
          label="Cantidad"
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
      </DataEdit>
    </div>
  );
}

export default CostosEdit;
