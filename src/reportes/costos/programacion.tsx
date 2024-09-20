import { ColDef, ColGroupDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col, Select, Spin, Checkbox, Modal } from "antd";

// Create new GridExample component
const Programacion = (props: any) => {
  const [colDefs, setColDefs] = useState<ColGroupDef[]>([]);
  const defaultColDef: ColDef = { width: 70 };
  const [rowData, setRowData] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [responsable, setResponsable] = useState("Todos");
  const [updates, setUpdate] = useState(new Map());
  const [openPrint, setOpenPrint] = useState(false);
  const [gridApi, setGridApi] = useState();
  const refGrid = useRef<any>(null);

  const onCellValueChanged = (event: any) => {
    let data = { ...event.data };
    const key = data.id;
    delete data["producto"];
    delete data["producto_nombre"];
    updates.set(key, data);
    event.colDef.cellStyle = { backgroundColor: "cyan" };
    event.api.refreshCells({
      force: true,
      columns: [event.colDef.field],
      rowNodes: [event.node],
    });
  };

  const getList = (mes: number = 8, responsable: string = "Todos") => {
    props.ds
      .getList(`${props.resource}?mes=${mes}&responsable=${responsable}`)
      .then((res: any) => {
        setRowData(res.data);
        setIsLoading(false);
      });
  };

  const onGridReady = (params: any) => {
    setGridApi(params);
    params.api.setGridOption("columnDefs", colDefs);
  };

  const getColumnDef = (mes: number) => {
    props.ds.getList(`programacion_columnas?mes=${mes}`).then((res: any) => {
      refGrid.current.api.setGridOption("columnDefs", res.data);
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
      .post(`${props.resource}`, data)
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
    getColumnDef(mes);
    getList(mes, responsable);
  }, []);

  const onChangeResponsable = (value: any) => {
    setResponsable(value);
    setIsLoading(true);
    getList(mes, value);
  };

  const onChangeMes = (value: any) => {
    setMes(value);
    setIsLoading(true);
    getColumnDef(value);
    getList(value, responsable);
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
            ref={refGrid}
            rowData={rowData}
            defaultColDef={defaultColDef}
            onCellValueChanged={onCellValueChanged}
            onGridReady={onGridReady}
          />
        </div>
      </Spin>
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
    </div>
  );
};

export default Programacion;
