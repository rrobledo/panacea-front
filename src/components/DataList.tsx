import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Space, Modal, Form, Result, Alert } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { toast } from "../utils/notification";
import { useListState } from "../utils/useListState";

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

export interface DataListRef {
  refreshList: () => void;
  getFilterRef: () => GenericFilterRef | null;
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 15,
    },
    sm: {
      span: 15,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 15,
    },
  },
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

const DataList = forwardRef<DataListRef, any>((props, ref) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [stateRestored, setStateRestored] = useState(false);
  const filterRef = useRef<GenericFilterRef>(null);
  const form = Form.useForm()[0];

  // State persistence
  const listKey = props.listKey || props.resource;
  const { saveState, getState, scrollToRow } = useListState(listKey);
  const pendingScrollRowId = useRef<string | number | null>(null);

  const addAction = props.addAction !== undefined ? props.addAction : true;
  const delAction = props.delAction !== undefined ? props.delAction : true;
  const editAction = props.editAction !== undefined ? props.editAction : true;
  const viewAction = props.viewAction !== undefined ? props.viewAction : true;
  const rowIdName = props.rowIdName !== undefined ? props.rowIdName : "id";
  const summary = props.summary;
  const scroll = props.scroll;
  const resourceParent =
    props.resourceParent !== undefined ? `${props.resourceParent}/` : "";

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    refreshList: getList,
    getFilterRef: () => filterRef.current,
  }));

  const getList = useCallback(() => {
    setIsLoading(true);
    setError(null);

    const filterValues = filterRef.current?.getFilterValues();
    const queryParams = filterValues ? new URLSearchParams(filterValues).toString() : '';
    const url = queryParams ? `${resourceParent}${props.resource}?${queryParams}` : `${resourceParent}${props.resource}`;
    const urlResumen = queryParams ? `${resourceParent}${props.resource}resumen?${queryParams}` : `${resourceParent}${props.resource}resumen`;

    props.ds.getList(url)
      .then((res: any) => {
        setDataSource(res.data);
        setError(null);
      })
      .catch((err: any) => {
        setError(err.message || "Error al cargar los datos");
        setDataSource([]);
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (React.isValidElement(props.summaryList)) {
      props.ds.getList(urlResumen)
        .then((res: any) => {
          form.setFieldsValue(res.data[0]);
        })
        .catch((err: any) => {
          console.warn("Error loading summary:", err.message);
        });
    }
  }, [props.ds, props.resource, props.summaryList, resourceParent, form]);

  // Save state before navigating
  const handleNavigate = useCallback((path: string, state?: any, rowId?: string | number) => {
    const filterValues = filterRef.current?.getFilterValues();
    saveState(filterValues || {}, window.scrollY, rowId);
    navigate(path, { state });
  }, [navigate, saveState]);

  const addActions = () => {
    let cols = props.columns !== undefined ? props.columns : [];

    if (delAction === true || editAction === true || viewAction === true) {
      cols.push({
        title: "Accion",
        key: "action",
        render: (_: any, record: any) => (
          <Space size="middle">
            {viewAction && (
              <a
                onClick={() => handleNavigate(
                  `/${resourceParent}${props.resource}/view/${record[rowIdName]}`,
                  { resourceParent: resourceParent },
                  record[rowIdName]
                )}
              >
                Ver
              </a>
            )}
            {editAction && (
              <a
                onClick={() => handleNavigate(
                  `/${resourceParent}${props.resource}/edit/${record[rowIdName]}`,
                  { resourceParent: resourceParent },
                  record[rowIdName]
                )}
              >
                Editar
              </a>
            )}
            {delAction && (
              <a
                onClick={() => {
                  deleteItem(record[rowIdName]);
                }}
              >
                Eliminar
              </a>
            )}
          </Space>
        ),
      });
    }
    setColumns(cols);
  };

  const deleteItem = (id: any) => {
    Modal.confirm({
      title: "Confirmar eliminación",
      content: "¿Está seguro que desea borrar este registro?",
      okText: "Sí, eliminar",
      cancelText: "Cancelar",
      okType: "danger",
      onOk() {
        return props.ds
          .delete(`${resourceParent}${props.resource}`, id)
          .then(() => {
            toast.success("Registro eliminado correctamente");
            getList();
          })
          .catch(() => {
            // Error notification is already handled by DataProvider
          });
      },
      onCancel() {},
    });
  };

  // Restore state on mount
  useEffect(() => {
    const savedState = getState();
    if (savedState && savedState.filters && Object.keys(savedState.filters).length > 0) {
      // Store the row ID to scroll to after data loads
      if (savedState.selectedRowId) {
        pendingScrollRowId.current = savedState.selectedRowId;
      }
      // Wait for filter component to be ready, then restore values
      const restoreTimer = setTimeout(() => {
        if (filterRef.current) {
          filterRef.current.setFilterValues(savedState.filters);
          setStateRestored(true);
        }
      }, 50);
      return () => clearTimeout(restoreTimer);
    } else {
      setStateRestored(true);
    }
  }, [getState]);

  // Load data after state is restored
  useEffect(() => {
    if (stateRestored) {
      getList();
    }
  }, [stateRestored]);

  // Scroll to the selected row after data loads
  useEffect(() => {
    if (!isLoading && dataSource.length > 0 && pendingScrollRowId.current !== null) {
      scrollToRow(pendingScrollRowId.current, 100);
      pendingScrollRowId.current = null;
    }
  }, [isLoading, dataSource, scrollToRow]);

  useRunOnce({
    fn: () => {
      addActions();
    },
  });

  // Error state display
  if (error && !isLoading && dataSource.length === 0) {
    return (
      <div>
        <Form
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: "100%",
          }}
          form={form}
          labelAlign="left"
        >
          { React.isValidElement(props.summaryList) ? props.summaryList : null}
        </Form>
        { React.isValidElement(props.filterAsForm) ? React.cloneElement(props.filterAsForm, { ref: filterRef, onRefreshList: getList }) : null}
        <Result
          status="error"
          title="Error al cargar los datos"
          subTitle={error}
          extra={[
            <Button
              key="retry"
              type="primary"
              icon={<ReloadOutlined />}
              onClick={getList}
            >
              Reintentar
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div>
      <Form
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: "100%",
          }}
          form={form}
          labelAlign="left"
        >
          { React.isValidElement(props.summaryList) ? props.summaryList : null}
      </Form>
      { React.isValidElement(props.filterAsForm) ? React.cloneElement(props.filterAsForm, { ref: filterRef, onRefreshList: getList }) : null}

      {/* Show error alert if there's an error but we still have cached data */}
      {error && dataSource.length > 0 && (
        <Alert
          message="Error al actualizar"
          description={error}
          type="warning"
          showIcon
          closable
          style={{ marginBottom: 16 }}
          action={
            <Button size="small" onClick={getList}>
              Reintentar
            </Button>
          }
        />
      )}

      <div
        style={{
          textAlign: "right",
        }}
      >
        {addAction && (
          <Button
            type="primary"
            onClick={() => handleNavigate(
              `/${resourceParent}${props.resource}/create`,
              { resourceParent: resourceParent }
            )}
          >
            Nuevo
          </Button>
        )}
      </div>
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          pagination={false}
          scroll={scroll}
          summary={summary}
          rowKey={rowIdName}
        />
      </div>
    </div>
  );
});

DataList.displayName = 'DataList';

export default DataList;
