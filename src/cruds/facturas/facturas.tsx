import DataList, { DataListRef } from "../../components/DataList";
import GenericFilter from "./GenericFilter";
import { useRef } from "react";
import { Form, DatePicker, Select, Col, Row, InputNumber } from "antd";
import dayjs from "dayjs";

function Facturas(props: any) {
  const dataListRef = useRef<DataListRef>(null);
  const dateFormat = "YYYY-MM-DD";
  
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Fecha",
      dataIndex: "fecha_emision",
      key: "fecha_emision",
      width: "10%",
    },
    {
      title: "Tipo Movimiento",
      dataIndex: "tipo_movimiento",
      key: "tipo_movimiento",
      width: "10%",
    },
    {
      title: "Proveedor",
      dataIndex: "proveedor_nombre",
      key: "proveedor_nombre",
      width: "20%",
    },
    {
      title: "Observaciones",
      dataIndex: "observaciones",
      key: "observaciones",
      width: "30%",
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      width: "10%",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      width: "10%",
      key: "estado",
    },
    {
      title: "Importe",
      dataIndex: "importe_total",
      key: "importe_total",
      width: "8%",
      render: (data: any) => {
        return (
          <div style={{ textAlign: "right" }}>
            {data.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </div>
        );
      },
    },
    {
      title: "Importe Pendiente",
      dataIndex: "importe_pendiente",
      key: "importe_pendiente",
      width: "8%",
      render: (data: any) => {
        return (
          <div style={{ textAlign: "right" }}>
            {data.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </div>
        );
      },
    },
  ];
  
  return (
    <>
      <b>FACTURAS/GASTOS</b>
      <DataList
        ref={dataListRef}
        ds={props.ds}
        resource={props.resource}
        columns={columns}
        viewAction={false}
        filterAsForm={
            <GenericFilter 
              attributesToConvertToDate={["fecha_desde", "fecha_hasta"]}
            >
              <Col span={5}>
                <Form.Item
                 label="Fecha Desde"
                 name="fecha_desde"
                 initialValue={dayjs().startOf('month')}
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
            <Col span={5}>
              <Form.Item
                label="Fecha Hasta"
                name="fecha_hasta"
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
            <Col span={5}>
              <Form.Item
                  label="Estado"
                  name="estado"
                  initialValue="TODOS"
                  rules={[
                    {
                      required: true,
                      message: "Por Favor ingrese el valor!",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="TODOS">TODOS</Select.Option>
                    <Select.Option value="PENDIENTE">PENDIENTE</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

          </GenericFilter>
        }
                summaryList={
          <Row>
            <Col span={8}>
              <Form.Item 
                label="Total Facturas Pendientes"
                name="total_facturas_pendientes"
              >
                <InputNumber 
                  style={{ width: "100%", textAlign: "right" }}
                  formatter={(value) => 
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="0.00"
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col span={4}></Col>
            <Col span={8}>
              <Form.Item 
                label="Total Gastos en el Periodo"
                name="total_gastos"
              >
                <InputNumber 
                  style={{ width: "100%", textAlign: "right" }}
                  formatter={(value) => 
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="0.00"
                  readOnly
                />
              </Form.Item>
            </Col>
          </Row>
        }
      />
      ;
    </>
  );
}

export default Facturas;
