import { ColDef, ColGroupDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col, Select, Spin, Checkbox, Modal } from "antd";

// Row Data Interface
interface IRow {
  id: string;
  producto: string;
  producto_nombre: string;
  planificado: number;
  responsable: string;
  s01_lunes_plan: number;
  s01_lunes_real: number;
  s01_martes_plan: number;
  s01_martes_real: number;
  s01_miercoles_plan: number;
  s01_miercoles_real: number;
  s01_jueves_plan: number;
  s01_jueves_real: number;
  s01_viernes_plan: number;
  s01_viernes_real: number;
  s01_sabado_plan: number;
  s01_sabado_real: number;
  s02_lunes_plan: number;
  s02_lunes_real: number;
  s02_martes_plan: number;
  s02_martes_real: number;
  s02_miercoles_plan: number;
  s02_miercoles_real: number;
  s02_jueves_plan: number;
  s02_jueves_real: number;
  s02_viernes_plan: number;
  s02_viernes_real: number;
  s02_sabado_plan: number;
  s02_sabado_real: number;
  s03_lunes_plan: number;
  s03_lunes_real: number;
  s03_martes_plan: number;
  s03_martes_real: number;
  s03_miercoles_plan: number;
  s03_miercoles_real: number;
  s03_jueves_plan: number;
  s03_jueves_real: number;
  s03_viernes_plan: number;
  s03_viernes_real: number;
  s03_sabado_plan: number;
  s03_sabado_real: number;
  s04_lunes_plan: number;
  s04_lunes_real: number;
  s04_martes_plan: number;
  s04_martes_real: number;
  s04_miercoles_plan: number;
  s04_miercoles_real: number;
  s04_jueves_plan: number;
  s04_jueves_real: number;
  s04_viernes_plan: number;
  s04_viernes_real: number;
  s04_sabado_plan: number;
  s04_sabado_real: number;
}

// Create new GridExample component
const Programacion = (props: any) => {
  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColGroupDef[]>([
    {
      headerName: "",
      children: [
        { field: "id", hide: true },
        { field: "producto", hide: true },
        {
          field: "producto_nombre",
          width: 200,
          headerName: "Producto",
          pinned: "left",
        },
        {
          field: "planeado",
          width: 70,
          headerName: "Plan",
          pinned: "left",
        },
        {
          valueGetter: 'parseInt(getValue("planeado") / 4)',
          width: 70,
          headerName: "Semanal",
          pinned: "left",
        },
        {
          field: "responsable",
          editable: true,
          headerName: "Responsable",
          width: 150,
        },
      ],
    },
    {
      headerName: "Semana 1",
      children: [
        {
          headerName: "Lu",
          children: [
            {
              field: "s01_lunes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s01_lunes_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Ma",
          children: [
            {
              field: "s01_martes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s01_martes_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Mi",
          children: [
            {
              field: "s01_miercoles_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s01_miercoles_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Ju",
          children: [
            {
              field: "s01_jueves_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s01_jueves_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Vi",
          children: [
            {
              field: "s01_viernes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s01_viernes_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Sa",
          children: [
            {
              field: "s01_sabado_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s01_sabado_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
      ],
    },
    {
      headerName: "Semana 2",
      children: [
        {
          headerName: "Lu",
          children: [
            {
              field: "s02_lunes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s02_lunes_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Ma",
          children: [
            {
              field: "s02_martes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s02_martes_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Mi",
          children: [
            {
              field: "s02_miercoles_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s02_miercoles_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Ju",
          children: [
            {
              field: "s02_jueves_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s02_jueves_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Vi",
          children: [
            {
              field: "s02_viernes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s02_viernes_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Sa",
          children: [
            {
              field: "s02_sabado_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s02_sabado_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
      ],
    },
    {
      headerName: "Semana 3",
      children: [
        {
          headerName: "Lu",
          children: [
            {
              field: "s03_lunes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s03_lunes_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Ma",
          children: [
            {
              field: "s03_martes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s03_martes_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Mi",
          children: [
            {
              field: "s03_miercoles_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s03_miercoles_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Ju",
          children: [
            {
              field: "s03_jueves_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s03_jueves_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Vi",
          children: [
            {
              field: "s03_viernes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s03_viernes_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Sa",
          children: [
            {
              field: "s03_sabado_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s03_sabado_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
      ],
    },
    {
      headerName: "Semana 4",
      children: [
        {
          headerName: "Lu",
          children: [
            {
              field: "s04_lunes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s04_lunes_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Ma",
          children: [
            {
              field: "s04_martes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s04_martes_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Mi",
          children: [
            {
              field: "s04_miercoles_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s04_miercoles_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Ju",
          children: [
            {
              field: "s04_jueves_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s04_jueves_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Vi",
          children: [
            {
              field: "s04_viernes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s04_viernes_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
        {
          headerName: "Sa",
          children: [
            {
              field: "s04_sabado_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            {
              field: "s04_sabado_real",
              editable: true,
              headerName: "E",
            },
          ],
        },
      ],
    },
  ]);
  const defaultColDef: ColDef = { width: 70 };
  const [rowData, setRowData] = useState<IRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [responsable, setResponsable] = useState("Todos");
  const [updates, setUpdate] = useState(new Map());
  const [openPrint, setOpenPrint] = useState(false);

  const onCellValueChanged = (event: any) => {
    const key = event.data.id;
    delete event.data["producto"];
    delete event.data["producto_nombre"];
    updates.set(key, event.data);
    event.colDef.cellStyle = { backgroundColor: "cyan" };
    event.api.refreshCells({
      force: true,
      columns: [event.colDef.field],
      rowNodes: [event.node],
    });
  };

  const getList = (responsable: string = "Todos") => {
    props.ds
      .getList(`${props.resource}?responsable=${responsable}`)
      .then((res: any) => {
        setRowData(res.data);
        setIsLoading(false);
      });
  };

  const onsubmit = () => {
    setIsLoading(true);
    let data: any[] = [];
    updates.forEach((value, key) => {
      data.push(value);
    });

    props.ds
      .patch(`${props.resource}`, 0, data)
      .then((res: any) => {
        setIsLoading(false);
        window.location.reload();
      })
      .finally(() => {
        setIsLoading(false);
      });
    setUpdate(new Map());
  };

  useEffect(() => {
    getList();
  }, []);

  const onChangeResponsable = (value: any) => {
    setResponsable(value);
    setIsLoading(true);
    getList(value);
  };

  const print = () => {
    setOpenPrint(true);
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div>
      <Modal
        title=""
        centered
        open={openPrint}
        onOk={() => setOpenPrint(false)}
        onCancel={() => setOpenPrint(false)}
        width={"100%"}
        height={"100%"}
      >
        <div
          className={"ag-theme-quartz"}
          style={{ width: "100%", height: 1100 }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </Modal>
      <div
        style={{
          textAlign: "left",
        }}
      >
        <Button type="primary" htmlType="submit" onClick={onsubmit}>
          Actualizar
        </Button>
        <Button onClick={print}>Imprimir</Button>
      </div>
      <div>
        <Row>
          <Col span={5}>
            <Form.Item label="Responsable">
              <Select defaultValue="Todos" onChange={onChangeResponsable}>
                <Select.Option value="Todos">Todos</Select.Option>
                <Select.Option value="Dalma">Dalma</Select.Option>
                <Select.Option value="Kevin">Kevin</Select.Option>
                <Select.Option value="Marcos">Marcos</Select.Option>
                <Select.Option value="Malena">Malena</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>
      <Spin tip="Loading" size="large" spinning={isLoading}>
        <div
          className={"ag-theme-quartz"}
          style={{ width: "100%", height: 700 }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </Spin>
    </div>
  );
};

export default Programacion;
