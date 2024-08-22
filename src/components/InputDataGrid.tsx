import { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Form, Modal, Button, Input, Row, Col, Spin, InputNumber } from "antd";
import InputListSearch from "./InputListSearch";
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

  return (
    <>
      <Modal
        open={visible}
        title="Agregar"
        okText="Ok"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={handleCreate}
      >
        <Form form={modalForm} layout="vertical">
          <Form.Item
            label="Producto"
            name="producto"
            rules={[
              {
                required: true,
                message: "Por favor seleccione el producto",
              },
            ]}
          >
            <InputListSearch
              ds={dataSource}
              resource="productos"
              targetInput="producto"
              targetInputName="producto_nombre"
              searchFieldName="nombre"
            />
          </Form.Item>
          <Form.Item name="producto_name" label="producto_name" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name="cantidad" label="Cantidad">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
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
            <AgGridReact
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
