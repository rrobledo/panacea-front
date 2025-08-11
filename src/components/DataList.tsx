import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Space, Modal } from "antd";

export type useRunOnceProps = {
  fn: () => any;
  sessionKey?: string;
};

export interface GenericFilterRef {
  getFilterValues: () => any;
  resetFilter: () => void;
  setFilterValues: (values: any) => void;
  refreshList: () => void;
}

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

function DataList(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const filterRef = useRef<GenericFilterRef>(null);

  const addAction = props.addAction != undefined ? props.addAction : true;
  const delAction = props.delAction != undefined ? props.delAction : true;
  const editAction = props.editAction != undefined ? props.editAction : true;
  const viewAction = props.viewAction != undefined ? props.viewAction : true;
  const rowIdName = props.rowIdName != undefined ? props.rowIdName : "id";
  const summary = props.summary;
  const scroll = props.scroll;
  const resourceParent =
    props.resourceParent != undefined ? `${props.resourceParent}/` : "";

  const getList = () => {
    const filterValues = filterRef.current?.getFilterValues();
    const queryParams = filterValues ? new URLSearchParams(filterValues).toString() : '';
    const url = queryParams ? `${resourceParent}${props.resource}?${queryParams}` : `${resourceParent}${props.resource}`;
    
    props.ds.getList(url).then((res: any) => {
      setDataSource(res.data);
      setIsLoading(false);
    });
  };

  const addActions = () => {
    let cols = props.columns != undefined ? props.columns : [];

    if (delAction == true || editAction == true || viewAction == true) {
      cols.push({
        title: "Accion",
        key: "action",
        render: (_: any, record: any) => (
          <Space size="middle">
            <Link
              to={{
                pathname: `/${resourceParent}${props.resource}/view/${record[rowIdName]}`,
              }}
              state={{ resourceParent: resourceParent }}
              hidden={!viewAction}
            >
              Ver
            </Link>
            <Link
              to={{
                pathname: `/${resourceParent}${props.resource}/edit/${record[rowIdName]}`,
              }}
              state={{ resourceParent: resourceParent }}
              hidden={!editAction}
            >
              Editar
            </Link>
            <a
              onClick={() => {
                deleteItem(record[rowIdName]);
              }}
              hidden={!delAction}
            >
              Eliminar
            </a>
          </Space>
        ),
      });
    }
    setColumns(cols);
  };

  const deleteItem = (id: any) => {
    Modal.confirm({
      title: "",
      content: "Esta Seguro que desea borrar este registro?",
      onOk() {
        props.ds
          .delete(`${resourceParent}${props.resource}`, id)
          .then((res: any) => {
            window.location.reload();
          })
          .catch((error: any) => {
            console.log(error);
          })
          .finally(() => {});
      },
      onCancel() {},
    });
  };


  useEffect(() => {
    getList();
  }, []);

  useRunOnce({
    fn: () => {
      addActions();
    },
  });


  return (
    <div>
      { React.isValidElement(props.filterAsForm) ? React.cloneElement(props.filterAsForm, { ref: filterRef, onRefreshList: getList }) : null}
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Link
          to={{ pathname: `/${resourceParent}${props.resource}/create` }}
          state={{
            resourceParent: resourceParent,
          }}
          hidden={!addAction}
        >
          <Button type="primary">Nuevo</Button>
        </Link>
      </div>
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          pagination={false}
          scroll={scroll}
          summary={summary}
        />
      </div>
    </div>
  );
};

DataList.displayName = 'DataList';

export default DataList;
