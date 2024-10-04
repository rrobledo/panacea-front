import { ColDef, ColGroupDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col, Select, Spin, Checkbox, Modal } from "antd";
import ReactToPrint from "react-to-print";

export class ComponentToPrint extends React.PureComponent {
  render() {
    return <div>My cool content here!</div>;
  }
}

// Create new GridExample component
const Programacion = (props: any) => {
  const [colDefs, setColDefs] = useState<ColGroupDef[]>([]);
  const defaultColDef: ColDef = {
    width: 70,
  };
  const [rowData, setRowData] = useState<[]>([]);
  const [oldRowData, setOldRowData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [responsable, setResponsable] = useState("Todos");
  const [semana, setSemana] = useState(0);
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

  const getList = (
    mes: number = 8,
    responsable: string = "Todos",
    semana: number = 0
  ) => {
    props.ds
      .getList(
        `${props.resource}?mes=${mes}&responsable=${responsable}&semana=${semana}`
      )
      .then((res: any) => {
        let od = [];
        setRowData(res.data);
        for (let k in res.data) {
          od.push({ ...res.data[k] });
        }
        setOldRowData(od);
        setIsLoading(false);
      });
  };

  const onGridReady = (params: any) => {
    setGridApi(params);
    params.api.setGridOption("columnDefs", colDefs);
  };

  const getColumnDef = (mes: number, semana: number = 0) => {
    props.ds
      .getList(`programacion_columnas?mes=${mes}&semana=${semana}`)
      .then((res: any) => {
        refGrid.current.api.setGridOption("columnDefs", res.data);
        setIsLoading(false);
      });
  };

  const onsubmit = () => {
    setIsLoading(true);
    let data: any[] = [];
    updates.forEach((value, key) => {
      let oldData = oldRowData.find((item: any) => {
        return item.id == key;
      });
      if (oldData != null) {
        for (let k in value) {
          if (value.hasOwnProperty(k)) {
            let v = value[k];
            if (k != "id" && k != "responsable" && v == oldData[k]) {
              delete value[k];
            }
          }
        }
        data.push(value);
      }
    });
    props.ds
      .post(`${props.resource}`, data)
      .then((res: any) => {
        setIsLoading(false);
        refresh();
      })
      .finally(() => {
        setIsLoading(false);
        setUpdate(new Map());
      });
  };

  useEffect(() => {
    getColumnDef(mes, semana);
    getList(mes, responsable, semana);
  }, []);

  const refresh = () => {
    getColumnDef(mes, semana);
    getList(mes, responsable, semana);
  };

  const onChangeResponsable = (value: any) => {
    setResponsable(value);
    setIsLoading(true);
    getList(mes, value);
  };

  const onChangeMes = (value: any) => {
    setMes(value);
    setIsLoading(true);
    getColumnDef(value, semana);
    getList(value, responsable, semana);
  };

  const onChangeSemana = (value: any) => {
    setSemana(value);
    setIsLoading(true);
    getColumnDef(mes, value);
    getList(mes, responsable, value);
  };

  const print = () => {
    setOpenPrint(true);
  };

  // Container: Defines the grid's theme & dimensions.
  const componentToPrintRef = useRef(null);

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
        <div>
          <ReactToPrint
            content={() => componentToPrintRef.current}
            trigger={() => <Button>Imprimir</Button>}
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
                <Select.Option value="10">Octubre</Select.Option>
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
                <Select.Option value="Oriana">Oriana</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
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
          </Col>
        </Row>
      </div>
      <div
        style={{
          textAlign: "left",
        }}
      >
        <Row>
          <Col span={2}>
            <Button type="primary" htmlType="submit" onClick={onsubmit}>
              Actualizar
            </Button>
          </Col>
          <Col>
            <ReactToPrint
              content={() => componentToPrintRef.current}
              trigger={() => <Button>Imprimir</Button>}
            />
          </Col>
        </Row>
      </div>
      <Spin tip="Loading" size="large" spinning={isLoading}>
        <div
          className={"ag-theme-quartz"}
          style={{ width: "100%", height: "100%" }}
          ref={componentToPrintRef}
        >
          <AgGridReact
            ref={refGrid}
            rowData={rowData}
            defaultColDef={defaultColDef}
            onCellValueChanged={onCellValueChanged}
            onGridReady={onGridReady}
            getRowHeight={(params: any) => {
              return 25;
            }}
            autoSizeStrategy={{
              type: "fitGridWidth",
            }}
            domLayout="autoHeight"
          />
        </div>
      </Spin>
    </div>
  );
};

export default Programacion;
