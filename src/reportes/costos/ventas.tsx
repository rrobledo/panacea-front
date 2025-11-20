import { ColDef, ColGroupDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col, Select, Spin } from "antd";
import ReactToPrint from "react-to-print";

// Create new GridExample component
const Ventas = (props: any) => {
  const defaultColDef: ColDef = {
    width: 150,
    cellStyle: { textAlign: "left" },
  };
  const [dataByCliente, setDataByCliente] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [cliente, setCliente] = useState("Todos");
  const [semana, setSemana] = useState(0);
  const printRefByCliente = useRef(null);

  const getVentaPorCliente = (anio: number, mes: any, cliente: any) => {
    props.ds
      .getList(
        `${props.resource}get_ventas_por_cliente?anio=${anio}&mes=${mes}&cliente=${cliente}`
      )
      .then((res: any) => {
        setDataByCliente(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getVentaPorCliente(anio, mes, cliente);
  }, []);

  const onChangeAnio = (value: any) => {
    setAnio(value);
    setIsLoading(true);
    getVentaPorCliente(value, mes, cliente);
  };

  const onChangeMes = (value: any) => {
    setMes(value);
    setIsLoading(true);
    getVentaPorCliente(anio, value, cliente);
  };

  const onChangeCliente = (value: any) => {
    setCliente(value);
    setIsLoading(true);
    getVentaPorCliente(anio, mes, value);
  };

  const columnsByCliente = [
    {
      headerName: "Ventas por Cliente",
      children: [
        {
          field: "week_of_month",
          width: 100,
          headerName: "Periodo",
        },
        {
          headerName: "Cliente",
          width: 200,
          field: "cliente",
        },
      ],
    },
    {
      headerName: "Cantidad",
      children: [
        {
          field: "cantidad_maniana",
          headerName: "Maniana",
          cellStyle: { textAlign: "right" },
        },
        {
          field: "cantidad_tarde",
          headerName: "Tarde",
          cellStyle: { textAlign: "right" },
        },
        {
          field: "cantidad",
          headerName: "Total",
          cellStyle: { textAlign: "right" },
        },
      ],
    },
    {
      headerName: "Totales",
      children: [
        {
          field: "subtotal_maniana",
          headerName: "Maniana",
          cellStyle: { textAlign: "right" },
        },
        {
          field: "subtotal_tarde",
          headerName: "Tarde",
          cellStyle: { textAlign: "right" },
        },
        {
          field: "subtotal",
          headerName: "Total",
          cellStyle: { textAlign: "right" },
        },
      ],
    },
  ];

  return (
    <div>
      <div>
        <Row>
          <Col span={5}>
            <Form.Item label="Anio">
              <Select
                defaultValue={new Date().getFullYear().toString()}
                onChange={onChangeAnio}
              >
                <Select.Option value="2024">2024</Select.Option>
                <Select.Option value="2025">2025</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item label="Mes">
              <Select
                defaultValue={(new Date().getMonth() + 1).toString()}
                onChange={onChangeMes}
              >
                <Select.Option value="0">Todos</Select.Option>
                <Select.Option value="1">Enero</Select.Option>
                <Select.Option value="2">Febrero</Select.Option>
                <Select.Option value="3">Marzo</Select.Option>
                <Select.Option value="4">Abril</Select.Option>
                <Select.Option value="5">Mayo</Select.Option>
                <Select.Option value="6">Junio</Select.Option>
                <Select.Option value="7">Julio</Select.Option>
                <Select.Option value="8">Agosto</Select.Option>
                <Select.Option value="9">Septiembre</Select.Option>
                <Select.Option value="10">Octubre</Select.Option>
                <Select.Option value="11">Noviembre</Select.Option>
                <Select.Option value="12">Diciembre</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Cliente">
              <Select defaultValue={"Todos"} onChange={onChangeCliente}>
                <Select.Option value="Todos">Todos</Select.Option>
                <Select.Option value="TOTAL">TOTAL</Select.Option>
                <Select.Option value="SUBTOTAL">SUBTOTAL</Select.Option>
                <Select.Option value="Panacea Carlos Paz">
                  Panacea Carlos Paz (TOTAL)
                </Select.Option>
                <Select.Option value=" Panacea Carlos Paz">
                  Panacea Carlos Paz (SUBTOTAL)
                </Select.Option>
                <Select.Option value="Panacea Villa Allende">
                  Panacea Villa Allende (TOTAL)
                </Select.Option>
                <Select.Option value=" Panacea Villa Allende">
                  Panacea Villa Allende (SUBTOTAL)
                </Select.Option>
                <Select.Option value="Panacea Cordoba">
                  Panacea Cordoba (TOTAL)
                </Select.Option>
                <Select.Option value=" Panacea Cordoba">
                  Panacea Cordoba (SUBTOTAL)
                </Select.Option>
                <Select.Option value="Dieteticas">
                  Dieteticas (TOTAL)
                </Select.Option>
                <Select.Option value=" Dieteticas">
                  Dieteticas (SUBTOTAL)
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <ReactToPrint
              content={() => printRefByCliente.current}
              trigger={() => <Button>Imprimir</Button>}
            />
          </Col>
        </Row>
      </div>
      <Spin tip="Loading" size="large" spinning={isLoading}>
        <Row>
          <Col span={24}>
            <div
              className={"ag-theme-quartz"}
              style={{ width: "99%", height: 700 }}
              ref={printRefByCliente}
            >
              <AgGridReact
                rowData={dataByCliente}
                defaultColDef={defaultColDef}
                columnDefs={columnsByCliente}
                getRowHeight={(params: any) => {
                  return 25;
                }}
                autoSizeStrategy={{
                  type: "fitGridWidth",
                }}
                domLayout="autoHeight"
              />
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default Ventas;
