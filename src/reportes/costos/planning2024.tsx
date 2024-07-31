import { Table } from "antd";
import DataList from "../../components/DataList";

function Planning2024(props: any) {
  const columns = [
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
    // {
    //   title: "Septiembre",
    //   dataIndex: "septiembre",
    //   key: "septiembre",
    // },
    // {
    //   title: "Octubre",
    //   dataIndex: "octubre",
    //   key: "octubre",
    // },
    // {
    //   title: "Noviembre",
    //   dataIndex: "noviembre",
    //   key: "noviembre",
    // },
    // {
    //   title: "Diciembre",
    //   dataIndex: "diciembre",
    //   key: "diciembre",
    // },
  ];

  return (
    <>
      <b>PLANNING 2024</b>
      <DataList
        ds={props.ds}
        resource={props.resource}
        columns={columns}
        addAction={false}
        delAction={false}
        editAction={false}
        viewAction={false}
        rowIdName="ref_id"
      />
      ;
    </>
  );
}

export default Planning2024;
