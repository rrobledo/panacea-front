import { Table } from "antd";
import DataList from "../../components/DataList";
import DataGrid from "../../components/DataGrid";

function Planning2024(props: any) {
  const columns = [
    {
      headerName: "",
      children: [
        {
          field: "producto",
          width: 200,
          headerName: "Producto",
          pinned: "left",
        },
      ],
    },
    {
      headerName: "Enero",
      children: [
        {
          headerName: "Plan",
          field: "enero_plan",
        },
        {
          headerName: "Venta",
          field: "enero_venta",
        },
      ],
    },
    {
      headerName: "Febrero",
      children: [
        {
          headerName: "Plan",
          field: "febrero",
        },
        {
          headerName: "Venta",
          field: "febrero_venta",
        },
      ],
    },
    {
      headerName: "Marzo",
      children: [
        {
          headerName: "Plan",
          field: "marzo",
        },
        {
          headerName: "Venta",
          field: "marzo_venta",
        },
      ],
    },
    {
      headerName: "Abril",
      children: [
        {
          headerName: "Plan",
          field: "abril",
        },
        {
          headerName: "Venta",
          field: "abril_venta",
        },
      ],
    },
    {
      headerName: "Mayo",
      children: [
        {
          headerName: "Plan",
          field: "mayo",
        },
        {
          headerName: "Corr",
          field: "mayo_corregido",
        },
        {
          headerName: "Prod",
          field: "mayo_prod",
        },
        {
          headerName: "Venta",
          field: "mayo_venta",
        },
      ],
    },
    {
      headerName: "Junio",
      children: [
        {
          headerName: "Plan",
          field: "junio",
        },
        {
          headerName: "Corr",
          field: "junio_corregido",
        },
        {
          headerName: "Prod",
          field: "junio_prod",
        },
        {
          headerName: "Venta",
          field: "junio_venta",
        },
      ],
    },
    {
      headerName: "Julio",
      children: [
        {
          headerName: "Plan",
          field: "julio",
        },
        {
          headerName: "Corr",
          field: "julio_corregido",
        },
        {
          headerName: "Prod",
          field: "julio_prod",
        },
        {
          headerName: "Venta",
          field: "julio_venta",
        },
      ],
    },
    {
      headerName: "Agosto",
      children: [
        {
          headerName: "Plan",
          field: "agosto",
        },
        {
          headerName: "Corr.",
          field: "agosto_corregido",
        },
        {
          headerName: "Prod",
          field: "agosto_prod",
        },
        {
          headerName: "Venta",
          field: "agosto_venta",
        },
      ],
    },
  ];

  const columns1 = [
    {
      title: "Producto",
      dataIndex: "producto",
      key: "producto",
      fixed: "left",
      with: 200,
    },
    {
      title: "Enero Plan",
      dataIndex: "enero_plan",
      key: "enero_plan",
    },
    {
      title: "Enero Real",
      dataIndex: "enero_venta",
      key: "enero_venta",
    },
    {
      title: " Febrero",
      dataIndex: "febrero",
      key: "febrero",
    },
    {
      title: "Febrero Real",
      dataIndex: "febrero_venta",
      key: "febrero_venta",
    },
    {
      title: "Marzo",
      dataIndex: "marzo",
      key: "marzo",
    },
    {
      title: "Marzo Real",
      dataIndex: "marzo_venta",
      key: "marzo_venta",
    },
    {
      title: "Abril",
      dataIndex: "abril",
      key: "abril",
    },
    {
      title: "Abril Real",
      dataIndex: "abril_venta",
      key: "abril_venta",
    },
    {
      title: "Mayo",
      dataIndex: "mayo",
      key: "mayo",
    },
    {
      title: "Mayo Corr",
      dataIndex: "mayo_corregido",
      key: "mayo_corregido",
    },
    {
      title: "Mayo Real",
      dataIndex: "mayo_venta",
      key: "mayo_venta",
    },
    {
      title: "Junio",
      dataIndex: "junio",
      key: "junio",
    },
    {
      title: "Junio Corr",
      dataIndex: "junio_corregido",
      key: "junio_corregido",
    },
    {
      title: "Junio Real",
      dataIndex: "junio_venta",
      key: "junio_venta",
    },
    {
      title: "Julio",
      dataIndex: "julio",
      key: "julio",
    },
    {
      title: "Julio Corr",
      dataIndex: "julio_corregido",
      key: "julio_corregido",
    },
    {
      title: "Julio Real",
      dataIndex: "julio_venta",
      key: "julio_venta",
    },
    {
      title: "Agosto",
      dataIndex: "agosto",
      key: "agosto",
    },
    {
      title: "Agosto Corr.",
      dataIndex: "agosto_corregido",
      key: "agosto_corregido",
    },
  ];

  return (
    <>
      <b>PLANNING 2024</b>
      <DataGrid
        ds={props.ds}
        resource={props.resource}
        columns={columns}
      ></DataGrid>
    </>
  );
}

export default Planning2024;
