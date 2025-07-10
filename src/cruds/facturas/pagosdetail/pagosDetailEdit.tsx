import DataEdit from "../../../components/DataEdit";
import { useParams } from "react-router-dom";
import { DatePicker, Form, Input, InputNumber, Select, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import ClipboardImageItem from "../../../components/ClipboardImageItem";
import { useEffect, useRef } from "react";

function FacturaPagosEdit(props: any) {
  const dateFormat = "YYYY-MM-DD";
  const params = useParams();
  const dataSource = props.ds;
  const ref = useRef<any>(null);
  const form = Form.useForm()[0];

  const getItem = () => {
    console.log(form);
    dataSource
      .get(`${props.resourceParent}`, params.factura_id)
      .then((res: any) => {
        form.setFieldsValue({
          factura_id: params.factura_id,
          proveedor: res.data.proveedor,
        });
      });
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div>
      <DataEdit
        ds={props.ds}
        resource={props.resource}
        form={form}
        attributesToConvertToDate={["fecha_emision", "fecha_vencimiento"]}
        imageAttributes={["image"]}
      >
        <Row>
          <Col span={0}>
            <Form.Item label="Factura Id" name="factura_id" hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Proveedor"
              name="proveedor"
              hidden={true}
              initialValue={0}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Provedor"
              name="tipo_movimiento"
              initialValue={"PAGO"}
              hidden={true}
            ></Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Número Comprobante"
              name="numero"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              label="Fecha Pago"
              name="fecha_emision"
              getValueProps={(value) => ({ value: value && dayjs(value) })}
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <DatePicker format={dateFormat} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Importe Total"
              name="importe_total"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} readOnly={true} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Categoría"
              name="categoria"
              initialValue={"OTROS"}
              hidden={true}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Tipo de Pago"
              name="tipo_pago"
              initialValue={"TRANSFERENCIA"}
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <Select>
                <Select.Option value="EFECTIVO">EFECTIVO</Select.Option>
                <Select.Option value="TRANSFERENCIA">
                  TRANSFERENCIA
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="CAJA" name="caja" initialValue={"VA"}>
              <Select>
                <Select.Option value="VA">VA</Select.Option>
                <Select.Option value="CP">CP</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              label="Observaciones"
              name="observaciones"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="image">
              <ClipboardImageItem />
            </Form.Item>
          </Col>
        </Row>
      </DataEdit>
    </div>
  );
}

export default FacturaPagosEdit;
