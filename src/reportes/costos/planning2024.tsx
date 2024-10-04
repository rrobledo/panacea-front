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
          width: 250,
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
    {
      headerName: "Septiembre",
      children: [
        {
          headerName: "Plan",
          field: "septiembre",
        },
        {
          headerName: "Corr.",
          field: "septiembre_corregido",
        },
        {
          headerName: "Prod",
          field: "septiembre_prod",
        },
        {
          headerName: "Venta",
          field: "septiembre_venta",
        },
      ],
    },
    {
      headerName: "Octubre",
      children: [
        {
          headerName: "Plan",
          field: "octubre",
        },
        {
          headerName: "Corr.",
          field: "octubre_corregido",
        },
        {
          headerName: "Prod",
          field: "octubre_prod",
        },
        {
          headerName: "Venta",
          field: "octubre_venta",
        },
      ],
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
