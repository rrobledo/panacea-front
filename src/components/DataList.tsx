import { Link } from "react-router-dom";
import { Table, Button, Space, Modal } from "antd";
import { useEffect, useRef, useState } from "react";

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

function DataList(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);

  const addAction = props.addAction != undefined ? props.addAction : true;
  const delAction = props.delAction != undefined ? props.delAction : true;
  const editAction = props.editAction != undefined ? props.editAction : true;
  const viewAction = props.viewAction != undefined ? props.viewAction : true;
  const rowIdName = props.rowIdName != undefined ? props.rowIdName : "id";
  const resourceParent =
    props.resourceParent != undefined ? `${props.resourceParent}/` : "";

  const getList = () => {
    props.ds.getList(`${resourceParent}${props.resource}`).then((res: any) => {
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
          .then((res: any) => {})
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
        />
      </div>
    </div>
  );
}

export default DataList;
