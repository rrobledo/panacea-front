import { Link } from "react-router-dom";
import { Table, Button, Space, Modal, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export type useRunOnceProps = {
  fn: () => any;
  sessionKey?: string;
};

const useRunOnce: React.FC<useRunOnceProps> = ({ fn, sessionKey }) => {
  const triggered = useRef<boolean>(false);

  useEffect(() => {
    const hasBeenTriggered = sessionKey
      ? sessionStorage.getItem(sessionKey)
      : triggered.current;

    if (!hasBeenTriggered) {
      fn();
      triggered.current = true;

      if (sessionKey) {
        sessionStorage.setItem(sessionKey, "true");
      }
    }
  }, [fn, sessionKey]);

  return null;
};

function DataGrid(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const columns = props.columns != undefined ? props.columns : "id";
  const rowIdName = props.rowIdName != undefined ? props.rowIdName : "id";
  const resourceParent =
    props.resourceParent != undefined ? `${props.resourceParent}/` : "";

  const [colDefs, setColDefs] = useState<ColGroupDef[]>(columns);
  const defaultColDef: ColDef = { width: 100 };

  const getList = () => {
    props.ds.getList(`${resourceParent}${props.resource}`).then((res: any) => {
      setRowData(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  useRunOnce({
    fn: () => {},
  });

  return (
    <div>
      <Spin tip="Loading" size="large" spinning={isLoading}>
        <div
          className={"ag-theme-quartz"}
          style={{ width: "100%", height: 700 }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </Spin>
    </div>
  );
}

export default DataGrid;
