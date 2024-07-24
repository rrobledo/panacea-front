import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import DataEdit from "../../components/DataEdit";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

function CostosMateriaPrimaView(props: any) {
  const params = useParams();

  type CustomFormItemProps = {
    value?: [];
    onChange?: (count: number) => void;
  };

  const CustomFormItem: React.FC<CustomFormItemProps> = ({
    value,
    onChange,
  }) => {
    const [count, setCount] = useState(value || 0);

    interface IRow {
      insumo_nombre: string;
      cantidad: number;
      costo_individual: number;
      porcentaje_del_total: number;
    }

    const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
      { field: "insumo_nombre", headerName: "Insumo" },
      { field: "cantidad", headerName: "Cantidad", type: "numericColumn" },
      { field: "costo_individual", headerName: "Costo", type: "numericColumn" },
      {
        field: "porcentaje_del_total",
        headerName: "Porcentaje del Total",
        type: "numericColumn",
      },
    ]);
    const defaultColDef: ColDef = {
      flex: 1,
    };

    console.log(value);
    return (
      <div className={"ag-theme-quartz"} style={{ height: 500, width: 1000 }}>
        <AgGridReact
          rowData={value}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowSelection={"single"}
          suppressHeaderFocus={true}
          suppressCellFocus={false}
          suppressClipboardPaste
        />
      </div>
    );
  };

  return (
    <div>
      <DataEdit ds={props.ds} resource={props.resource} editable={false}>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Producto"
              name="producto_nombre"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input readOnly={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Lote Produccion"
              name="lote_produccion"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <InputNumber readOnly={true} />
            </Form.Item>

            <Form.Item
              label="Tiempo de Produccion"
              name="tiempo_produccion"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <InputNumber readOnly={true} />
            </Form.Item>

            <Form.Item
              label="Precio Actual"
              name="precio_actual"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <InputNumber readOnly={true} />
            </Form.Item>

            <Form.Item
              label="Costo MP"
              name="costo_unitario_mp"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <InputNumber readOnly={true} />
            </Form.Item>

            <Form.Item
              label="Margen de Utilidad MP"
              name="margen_utilidad"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <InputNumber readOnly={true} />
            </Form.Item>

            <Form.Item
              label="Costo Lote Produccion"
              name="costo_lote_mp"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <InputNumber readOnly={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Venta Estima Mensual"
              name="venta_estimada_mensual"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <InputNumber readOnly={true} />
            </Form.Item>

            <Form.Item
              label="Costo estimado Mensual"
              name="costo_estimado_mensual"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <InputNumber readOnly={true} />
            </Form.Item>

            <Form.Item
              label="Total Utilidad Mensual"
              name="total_utilidad_mensual"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <InputNumber readOnly={true} />
            </Form.Item>

            <Form.Item
              label="Utilidad Mensual"
              name="utilidad_mensual"
              rules={[
                {
                  required: true,
                  message: "Por Favor ingrese el valor!",
                },
              ]}
            >
              <InputNumber readOnly={true} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item name="detalle_costo">
            <CustomFormItem />
          </Form.Item>
        </Row>
      </DataEdit>
    </div>
  );
}

export default CostosMateriaPrimaView;
