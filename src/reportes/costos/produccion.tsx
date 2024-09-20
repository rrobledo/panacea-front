import { ColDef, ColGroupDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col, Select, Spin, Checkbox, Modal } from "antd";
import DataGrid from "../../components/DataGrid";

// Create new GridExample component
const Produccion = (props: any) => {
  const defaultColDef: ColDef = { width: 100 };
  const [dataByCategory, setDataByCategory] = useState<[]>([]);
  const [dataByProductos, setDataByProductos] = useState<[]>([]);
  const [dataByInsumos, setDataByInsumos] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mes, setMes] = useState(new Date().getMonth() + 1);

  const getByCategoria = (mes: any) => {
    props.ds
      .getList(`${props.resource}get_produccion_by_category?mes=${mes}`)
      .then((res: any) => {
        setDataByCategory(res.data);
        setIsLoading(false);
      });
  };

  const getByProductos = (mes: any) => {
    props.ds
      .getList(`${props.resource}get_produccion_by_productos?mes=${mes}`)
      .then((res: any) => {
        setDataByProductos(res.data);
        setIsLoading(false);
      });
  };

  const getByInsumos = (mes: any) => {
    props.ds
      .getList(`${props.resource}get_insumos_by_month?mes=${mes}`)
      .then((res: any) => {
        setDataByInsumos(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getByCategoria(mes);
    getByProductos(mes);
    getByInsumos(mes);
  }, []);

  const onChangeMes = (value: any) => {
    setMes(value);
    setIsLoading(true);
    getByCategoria(value);
    getByProductos(value);
    getByInsumos(value);
  };

  const columnsByCategoria = [
    {
      headerName: "Produccion por Categoria",
      children: [
        {
          field: "categoria",
          width: 250,
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
          headerName: "Porcentaje Ejecucion",
          field: "porcentaje_ejecutado",
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
          width: 250,
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
          headerName: "Porcentaje Ejecucion",
          field: "porcentaje_ejecutado",
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
          width: 250,
          headerName: "Semana",
        },
        {
          field: "insumo",
          width: 250,
          headerName: "Insumo",
        },
        {
          headerName: "Cantidad",
          field: "cantidad",
        },
      ],
    },
  ];

  return (
    <div>
      <div>
        <Row>
          <Col span={5}>
            <Form.Item label="Mes">
              <Select
                defaultValue={(new Date().getMonth() + 1).toString()}
                onChange={onChangeMes}
              >
                <Select.Option value="4">Abril</Select.Option>
                <Select.Option value="5">Mayo</Select.Option>
                <Select.Option value="6">Junio</Select.Option>
                <Select.Option value="7">Julio</Select.Option>
                <Select.Option value="8">Agosto</Select.Option>
                <Select.Option value="9">Septiembre</Select.Option>
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
            <div
              className={"ag-theme-quartz"}
              style={{ width: "99%", height: 700 }}
            >
              <AgGridReact
                rowData={dataByInsumos}
                defaultColDef={defaultColDef}
                columnDefs={columnsByInsumos}
              />
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default Produccion;
