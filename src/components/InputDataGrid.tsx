import { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Form, Modal, Button, Input, Row, Col, Spin, InputNumber } from "antd";
import InputListSearch, { DataListSearch } from "./InputListSearch";
import { withDefaultProps } from "with-default-props";

type Props = {
  value: any;
  onChange: any;
  colDefs: ColDef[];
  defaultColDef: ColDef;
  dataSource: any;
};

function InputDataGridComponent({
  value,
  onChange,
  colDefs,
  defaultColDef,
  dataSource,
}: Props) {
  const [rowData, setRowData] = useState<any[]>(value != null ? value : []);
  const [modalForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const refInputHiddenData = useRef<any>(null);
  const refInputData = useRef<any>(null);
  const refGrid = useRef<AgGridReact>(null);

  const onStateUpdated = (event: any): void => {
    if (event.rowData != undefined && event.rowData.length > 0) {
      onChange(rowData);
    }
  };

  const handleCreate = () => {
    modalForm
      .validateFields()
      .then((values) => {
        modalForm.resetFields();
        let aux = [...rowData];
        aux.push(values);
        setRowData(aux);
        setVisible(false);
      })
      .catch((info) => {
        console.log("Error de Validacion:", info);
      });
  };

  const searchData = (id: any) => {
    Modal.confirm({
      title: "",
      autoFocusButton: null,
      content: (
        <DataListSearch
          ds={dataSource}
          refInputData={refInputData}
          refInputHiddenData={refInputHiddenData}
          resource="productos"
        />
      ),
      onOk() {
        let aux = [...rowData];
        aux.push({
          producto: refInputHiddenData.current.value,
          producto_nombre: refInputData.current.value,
          cantidad: 1,
        });
        setRowData(aux);
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Button type="primary" onClick={searchData}>
            Agregar Producto
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div
            className={"ag-theme-quartz"}
            style={{ height: 300, width: 1000 }}
          >
            <input readOnly={true} ref={refInputData} hidden={true} />
            <input readOnly={true} ref={refInputHiddenData} hidden={true} />
            <AgGridReact
              ref={refGrid}
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              onComponentStateChanged={onStateUpdated}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

const InputDataGrid = withDefaultProps(InputDataGridComponent, {
  value: null,
  onChange: null,
});
export default InputDataGrid;
