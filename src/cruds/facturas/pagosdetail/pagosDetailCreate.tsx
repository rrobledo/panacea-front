import { Form, Input, InputNumber, Select } from "antd";
import { useParams } from "react-router-dom";
import DataCreate from "../../../components/DataCreate";
import InputListSearch from "../../../components/InputListSearch";
import { useEffect, useRef } from "react";

function CostosDetailCreate(props: any) {
  const params = useParams();
  const dataSource = props.ds;
  const ref = useRef<any>(null);
  const form = Form.useForm()[0];

  const getItem = () => {
    dataSource
      .get(`${props.resourceParent}`, params.producto_id)
      .then((res: any) => {
        form.setFieldsValue({
          producto: res.data.absolute_url,
        });
      });
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div>
      <DataCreate ds={props.ds} resource={props.resource} form={form}>
        <Form.Item
          label="Codigo Producto"
          name="producto"
          rules={[
            {
              required: true,
              message: "Por Favor ingrese el valor!",
            },
          ]}
        >
          <Input ref={ref} />
        </Form.Item>
        <Form.Item
          label="Insumo"
          name="insumo"
          rules={[
            {
              required: true,
              message: "Por Favor ingrese el valor!",
            },
          ]}
        >
          <InputListSearch
            ds={props.ds}
            resource="insumos"
            searchFieldName="nombre"
          />
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
      </DataCreate>
    </div>
  );
}

export default CostosDetailCreate;
