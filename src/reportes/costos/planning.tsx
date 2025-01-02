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
const Planning = (props: any) => {
  const [colDefs, setColDefs] = useState<ColGroupDef[]>([]);
  const defaultColDef: ColDef = {
    width: 100,
  };
  const [rowData, setRowData] = useState<[]>([]);
  const [oldRowData, setOldRowData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [anio, setAnio] = useState(new Date().getFullYear());
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

  const getList = (anio: number = 2024) => {
    props.ds.getList(`${props.resource}?anio=${anio}`).then((res: any) => {
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

  const getColumnDef = (anio: number) => {
    props.ds.getList(`planning_columnas?anio=${anio}`).then((res: any) => {
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
    getColumnDef(anio);
    getList(anio);
  }, []);

  const refresh = () => {
    getColumnDef(anio);
    getList(anio);
  };

  const onChangeAnio = (value: any) => {
    setAnio(value);
    setIsLoading(true);
    getColumnDef(value);
    getList(value);
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

export default Planning;
