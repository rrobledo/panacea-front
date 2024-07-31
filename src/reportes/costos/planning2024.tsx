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
          headerName: "Real",
          field: "enero_real",
        },
      ],
    },
    {
      headerName: "Febero",
      children: [
        {
          headerName: "Plan",
          field: "febrero",
        },
        {
          headerName: "Real",
          field: "febrero_real",
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
          headerName: "Real",
          field: "marzo_real",
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
          headerName: "Real",
          field: "abril_real",
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
          headerName: "Real",
          field: "mayo_real",
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
          headerName: "Real",
          field: "junio_real",
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
          headerName: "Real",
          field: "julio_real",
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
          headerName: "Real",
          field: "agosto_real",
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
      dataIndex: "enero_real",
      key: "enero_real",
    },
    {
      title: " Febrero",
      dataIndex: "febrero",
      key: "febrero",
    },
    {
      title: "Febrero Real",
      dataIndex: "febrero_real",
      key: "febrero_real",
    },
    {
      title: "Marzo",
      dataIndex: "marzo",
      key: "marzo",
    },
    {
      title: "Marzo Real",
      dataIndex: "marzo_real",
      key: "marzo_real",
    },
    {
      title: "Abril",
      dataIndex: "abril",
      key: "abril",
    },
    {
      title: "Abril Real",
      dataIndex: "abril_real",
      key: "abril_real",
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
      dataIndex: "mayo_real",
      key: "mayo_real",
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
      dataIndex: "junio_real",
      key: "junio_real",
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
      dataIndex: "julio_real",
      key: "julio_real",
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
