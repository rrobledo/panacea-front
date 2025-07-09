import DataList from "../../../components/DataList";

function FacturasPagos(props: any) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Fecha Pago",
      dataIndex: "fecha_emision",
      key: "fecha_emision",
    },
    {
      title: "Importe",
      dataIndex: "importe_total",
      key: "importe_total",
    },
  ];

  return (
    <>
      <b>PAGOS</b>
      <DataList
        ds={props.ds}
        resource={props.resource}
        columns={columns}
        viewAction={false}
      />
      ;
    </>
  );
}

export default FacturasPagos;
