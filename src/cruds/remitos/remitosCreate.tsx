import { DatePicker, Form, Select } from "antd";
import DataCreate from "../../components/DataCreate";
import InputListSearch from "../../components/InputListSearch";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import InputDataGrid from "../../components/InputDataGrid";

function RemitosCreate(props: any) {
  const dateFormat = "DD/MM/YYYY";
  const defaultValues = {
    fecha_entrega: dayjs(),
    vendedor: "Villa Allende",
  };
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      field: "producto",
      width: 300,
      headerName: "Producto",
      hide: true,
    },
    {
      field: "producto_nombre",
      width: 600,
      headerName: "Producto",
    },
    {
      field: "cantidad",
      width: 300,
      headerName: "cantidad",
      editable: true,
    },
  ]);
  const defaultColDef: ColDef = { width: 70 };

  return (
    <DataCreate
      ds={props.ds}
      resource={props.resource}
      defaultValues={defaultValues}
    >
      <Form.Item
        label="Cliente"
        name="cliente"
        rules={[
          {
            required: true,
            message: "Por Favor ingrese el valor!",
          },
        ]}
      >
        <InputListSearch
          ds={props.ds}
          resource="clientes"
          targetInput="cliente"
          searchFieldName="nombre"
        />
      </Form.Item>
      <Form.Item
        label="Fecha Entrega"
        name="fecha_entrega"
        rules={[
          {
            required: true,
            message: "Por Favor ingrese el valor!",
          },
        ]}
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        label="Observaciones"
        name="observaciones"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>
      <Form.Item
        label="Vendedor"
        name="vendedor"
        rules={[
          {
            required: true,
            message: "Por Favor ingrese el valor!",
          },
        ]}
      >
        <Select>
          <Select.Option value="Villa Allende">Villa Allende</Select.Option>
          <Select.Option value="Carlos Paz">Carlos Paz</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Productos" name="productos">
        <InputDataGrid
          colDefs={colDefs}
          defaultColDef={defaultColDef}
          dataSource={props.ds}
        />
      </Form.Item>
    </DataCreate>
  );
}

export default RemitosCreate;
