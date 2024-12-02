import { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Form, Modal, Button, Input, Row, Col, Spin } from "antd";
import { withDefaultProps } from "with-default-props";

interface IRow {
  nombre: string;
}

export function DataListSearch(props: any) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [data, setData] = useState([]);
  const refInputData = props.refInputData;
  const resource = props.resource;
  const refInputHiddenData = props.refInputHiddenData;
  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([{ field: "nombre" }]);
  const refInputSearch = useRef<any>(null);

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  const onSearch = (key: any) => {
    setIsLoading(true);
    props.ds
      .getList(resource, { nombre: key })
      .then((res: any) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const defaultColDef: ColDef = {
    flex: 1,
  };

  const onCellFocused = (event: any) => {
    // Mark the column selected on key down and up.
    let nodes = event.api.getRenderedNodes();
    nodes[event.rowIndex].setSelected(true);
    setInputValue(nodes[event.rowIndex].data.nombre);
    refInputHiddenData.current.value = nodes[event.rowIndex].data.absolute_url;
    refInputData.current.value = nodes[event.rowIndex].data.nombre;
  };

  const gridRef = useRef<HTMLDivElement>(null);
  const onStateUpdated = (event: any): void => {
    if (event.rowData != undefined && event.rowData.length > 0) {
      // Set the focus on the first row of the grid, after search was executed.
      let nodes = event.api.getRenderedNodes();
      nodes[0].setSelected(true);
      const firstCol = event.api.getAllDisplayedColumns()[0];
      event.api.setFocusedCell(0, firstCol);
    }
  };

  const onCellKeyDown = (event: any): void => {
    if (event.event.code == "Enter") {
      console.log("Enter");
      console.log();
    }
  };

  useEffect(() => {
    console.log(refInputSearch);
    refInputSearch.current.focus({
      cursor: "start",
    });
  }, []);

  return (
    <div>
      <Input.Search
        placeholder="Buscar..."
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        enterButton
        style={{ width: "300px" }}
        autoFocus={true}
        ref={refInputSearch}
      />
      <Spin tip="Loading" size="large" spinning={isLoading}>
        <div
          className={"ag-theme-quartz"}
          style={{ height: 300, width: 300 }}
          ref={gridRef}
        >
          <AgGridReact
            rowData={data}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowSelection={"single"}
            suppressHeaderFocus={true}
            suppressCellFocus={false}
            suppressClipboardPaste
            onCellFocused={onCellFocused}
            onComponentStateChanged={onStateUpdated}
            onCellKeyDown={onCellKeyDown}
          />
        </div>
      </Spin>
    </div>
  );
}

type Props = {
  value: any;
  onChange: any;
  ds: any;
  resource: any;
  targetInput: any;
  targetInputName: any;
  searchFieldName: any;
};

function InputListSearchComponent({
  value,
  onChange,
  ds,
  resource,
  targetInput,
  targetInputName,
  searchFieldName,
}: Props) {
  const refInputHiddenData = useRef<any>(null);
  const refInputData = useRef<any>(null);

  const getLabel = () => {
    if (value != null) {
      ds.getUrl(value).then((res: any) => {
        refInputData.current.value = res.data.nombre;
      });
    }
  };

  const searchData = (id: any) => {
    Modal.confirm({
      title: "",
      autoFocusButton: null,
      content: (
        <DataListSearch
          ds={ds}
          refInputData={refInputData}
          refInputHiddenData={refInputHiddenData}
          resource={resource}
        />
      ),
      onOk() {
        onChange(refInputHiddenData.current.value);
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    getLabel();
  }, []);

  return (
    <>
      <Row>
        <Col span={20}>
          <input
            readOnly={true}
            ref={refInputData}
            style={{
              borderWidth: 0,
              borderRadius: 6,
              padding: "8px 11px",
              width: "100%",
              background: "rgba(0, 0, 0, 0.04)",
            }}
            type="text"
            value={value}
          />
        </Col>
        <Col span={4} style={{ display: "flex", justifyContent: "left" }}>
          <Button onClick={searchData}>...</Button>
        </Col>
      </Row>
      <Form.Item name={targetInput} hidden={true}>
        <Input readOnly={true} />
      </Form.Item>
      <Form.Item name={targetInputName} hidden={true}>
        <Input readOnly={true} />
      </Form.Item>
      <input readOnly={true} ref={refInputHiddenData} hidden={true} />
    </>
  );
}

const InputListSearch = withDefaultProps(InputListSearchComponent, {
  value: null,
  onChange: null,
  ds: null,
  resource: "/",
  targetInput: "",
  targetInputName: "",
  searchFieldName: "",
});
export default InputListSearch;
