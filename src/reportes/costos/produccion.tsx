import { ColDef, ColGroupDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col, Select, Spin, Checkbox, Modal } from "antd";
import DataGrid from "../../components/DataGrid";
import ReactToPrint from "react-to-print";

// Create new GridExample component
const Produccion = (props: any) => {
  const defaultColDef: ColDef = {
    width: 90,
    cellStyle: { textAlign: "left" },
  };
  const [dataByCategory, setDataByCategory] = useState<[]>([]);
  const [dataByProductos, setDataByProductos] = useState<[]>([]);
  const [dataByInsumos, setDataByInsumos] = useState<[]>([]);
  const [dataByInsumosMensual, setDataByInsumosMensual] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [semana, setSemana] = useState(0);
  const printRefInsumosMensual = useRef(null);
  const printRefInsumos = useRef(null);

  const getByCategoria = (anio: number = 2025, mes: any) => {
    props.ds
      .getList(
        `${props.resource}get_produccion_by_category?anio=${anio}&mes=${mes}`
      )
      .then((res: any) => {
        setDataByCategory(res.data);
        setIsLoading(false);
      });
  };

  const getByProductos = (anio: number = 2025, mes: any) => {
    props.ds
      .getList(
        `${props.resource}get_produccion_by_productos?anio=${anio}&mes=${mes}`
      )
      .then((res: any) => {
        setDataByProductos(res.data);
        setIsLoading(false);
      });
  };

  const getByInsumos = (anio: number = 2025, mes: any, semana: any) => {
    props.ds
      .getList(
        `${props.resource}get_insumos_by_month?anio=${anio}&mes=${mes}&semana=${semana}`
      )
      .then((res: any) => {
        setDataByInsumos(res.data);
        setIsLoading(false);
      });
  };

  const getByInsumosMensual = (anio: number = 2025, mes: any) => {
    props.ds
      .getList(
        `${props.resource}get_insumos_by_month?anio=${anio}&mes=${mes}&by_week=false`
      )
      .then((res: any) => {
        setDataByInsumosMensual(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getByCategoria(anio, mes);
    getByProductos(anio, mes);
    getByInsumos(anio, mes, semana);
    getByInsumosMensual(anio, mes);
  }, []);

  const onChangeAnio = (value: any) => {
    setAnio(value);
    setIsLoading(true);
    getByCategoria(value, mes);
    getByProductos(value, mes);
    getByInsumos(value, mes, semana);
    getByInsumosMensual(value, mes);
  };

  const onChangeMes = (value: any) => {
    setMes(value);
    setIsLoading(true);
    getByCategoria(anio, value);
    getByProductos(anio, value);
    getByInsumos(anio, value, semana);
    getByInsumosMensual(anio, value);
  };

  const onChangeSemana = (value: any) => {
    getByInsumos(anio, mes, value);
  };

  const columnsByCategoria = [
    {
      headerName: "Produccion por Categoria",
      children: [
        {
          field: "categoria",
          width: 150,
          headerName: "Categoria",
        },
        {
          headerName: "Planeado",
          field: "planeado",
        },
        {
          headerName: "Producido",
          field: "producido",
        },
        {
          headerName: "Vendido",
          field: "vendido",
        },
        {
          headerName: "Prod %",
          field: "porcentaje_ejecutado",
        },
        {
          headerName: "Vend %",
          field: "porcentaje_vendido",
        },
      ],
    },
  ];

  const columnsByProductos = [
    {
      headerName: "Produccion por Productos",
      children: [
        {
          field: "categoria",
          width: 150,
          headerName: "Categoria",
        },
        {
          field: "producto",
          width: 250,
          headerName: "Producto",
        },
        {
          headerName: "Planeado",
          field: "planeado",
        },
        {
          headerName: "Producido",
          field: "producido",
        },
        {
          headerName: "Vendido",
          field: "vendido",
        },
        {
          headerName: "Prod %",
          field: "porcentaje_ejecutado",
        },
        {
          headerName: "Vend %",
          field: "porcentaje_vendido",
        },
      ],
    },
  ];

  const columnsByInsumosMensual = [
    {
      headerName: "Insumos Previstos por Mes",
      children: [
        {
          field: "insumo",
          width: 250,
          headerName: "Insumo",
          type: "leftAligned",
        },
        {
          headerName: "Plan",
          type: "numericColumn",
          field: "plan",
        },
        {
          headerName: "Usado",
          type: "numericColumn",
          field: "usado",
        },
        {
          headerName: "Plan$",
          field: "plan_precio",
          type: "numericColumn",
          aggFunc: "sum",
          width: 110,
        },
        {
          headerName: "Usado$",
          field: "usado_precio",
          type: "numericColumn",
          aggFunc: "sum",
          width: 110,
        },
      ],
    },
  ];

  const columnsByInsumos = [
    {
      headerName: "Insumos Previstos por semana",
      children: [
        {
          field: "semana",
          width: 100,
          headerName: "Semana",
        },
        {
          field: "insumo",
          width: 250,
          headerName: "Insumo",
        },
        {
          headerName: "Plan",
          type: "numericColumn",
          field: "plan",
        },
        {
          headerName: "Usado",
          type: "numericColumn",
          field: "usado",
        },
        {
          headerName: "Plan$",
          field: "plan_precio",
          type: "numericColumn",
          aggFunc: "sum",
          width: 110,
        },
        {
          headerName: "Usado$",
          field: "usado_precio",
          type: "numericColumn",
          aggFunc: "sum",
          width: 110,
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
                <Select.Option value="1">Enero</Select.Option>
                <Select.Option value="2">Febrero</Select.Option>
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
        </Row>
      </div>
      <Spin tip="Loading" size="large" spinning={isLoading}>
        <Row>
          <Col span={10}>
            <div
              className={"ag-theme-quartz"}
              style={{ width: "99%", height: 700 }}
            >
              <AgGridReact
                rowData={dataByCategory}
                defaultColDef={defaultColDef}
                columnDefs={columnsByCategoria}
              />
            </div>
          </Col>
          <Col span={14}>
            <div
              className={"ag-theme-quartz"}
              style={{ width: "99%", height: 700 }}
            >
              <AgGridReact
                rowData={dataByProductos}
                defaultColDef={defaultColDef}
                columnDefs={columnsByProductos}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <ReactToPrint
              content={() => printRefInsumosMensual.current}
              trigger={() => <Button>Imprimir</Button>}
            />
            <div
              className={"ag-theme-quartz"}
              style={{ width: "99%", height: 700 }}
              ref={printRefInsumosMensual}
            >
              <AgGridReact
                rowData={dataByInsumosMensual}
                defaultColDef={defaultColDef}
                columnDefs={columnsByInsumosMensual}
                getRowHeight={(params: any) => {
                  return 25;
                }}
                autoSizeStrategy={{
                  type: "fitGridWidth",
                }}
                domLayout="autoHeight"
                grandTotalRow="bottom"
                groupTotalRow="bottom"
              />
            </div>
          </Col>
          <Col span={14}>
            <ReactToPrint
              content={() => printRefInsumos.current}
              trigger={() => <Button>Imprimir</Button>}
            />

            <Form.Item label="Semana">
              <Select defaultValue={"Todas"} onChange={onChangeSemana}>
                <Select.Option value="0">Todas</Select.Option>
                <Select.Option value="1">Semana 1</Select.Option>
                <Select.Option value="2">Semana 2</Select.Option>
                <Select.Option value="3">Semana 3</Select.Option>
                <Select.Option value="4">Semana 4</Select.Option>
                <Select.Option value="5">Semana 5</Select.Option>
              </Select>
            </Form.Item>
            <div
              className={"ag-theme-quartz"}
              style={{ width: "99%", height: 700 }}
              ref={printRefInsumos}
            >
              <AgGridReact
                rowData={dataByInsumos}
                defaultColDef={defaultColDef}
                columnDefs={columnsByInsumos}
                getRowHeight={(params: any) => {
                  return 25;
                }}
                autoSizeStrategy={{
                  type: "fitGridWidth",
                }}
                domLayout="autoHeight"
                grandTotalRow="bottom"
              />
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default Produccion;
