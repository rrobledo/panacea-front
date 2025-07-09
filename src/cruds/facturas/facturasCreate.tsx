import { DatePicker, Form, Input, InputNumber, Select, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import DataCreate from "../../components/DataCreate";
import { useParams } from "react-router-dom";
import InputListSearch from "../../components/InputListSearch";
import dayjs from "dayjs";

function FacturaCreate(props: any) {
  const dateFormat = "YYYY-MM-DD";
  const params = useParams();

  return (
    <div>
      <DataCreate
        ds={props.ds}
        resource={props.resource}
        attributesToConvertToDate={["fecha_emision", "fecha_vencimiento"]}
      >
        <Row>
          <Col span={8}>
            <Form.Item
              label="Provedor"
              name="tipo_movimiento"
              initialValue={"FACTURA"}
              hidden={true}
            ></Form.Item>
            <Form.Item
              label="Provedor"
              name="proveedor"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <InputListSearch
                ds={props.ds}
                resource="proveedores"
                searchFieldName="nombre"
                idFieldName="id"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
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
              label="Fecha"
              name="fecha_emision"
              initialValue={dayjs()}
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
            <Form.Item label="Fecha Vencimiento" name="fecha_vencimiento">
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
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Categoría"
              name="categoria"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <Select>
                <Select.Option value="MATERIA_PRIMA">
                  MATERIA PRIMA
                </Select.Option>
                <Select.Option value="SUELDO">SUELDO</Select.Option>
                <Select.Option value="MANTENIMIENTO">
                  MANTENIMIENTO
                </Select.Option>
                <Select.Option value="DELIVERY">DELIVERY</Select.Option>
                <Select.Option value="ALQUILERES">ALQUILERES</Select.Option>
                <Select.Option value="IMPUESTOS">IMPUESTOS</Select.Option>
                <Select.Option value="HONORARIOS">HONORARIOS</Select.Option>
                <Select.Option value="SERVICIOS">SERVICIOS</Select.Option>
                <Select.Option value="OTROS">OTROS</Select.Option>
              </Select>
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
                <Select.Option value="CUENTA_CORRIENTE">
                  CUENTA CORRIENTE
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
      </DataCreate>
    </div>
  );
}

export default FacturaCreate;
