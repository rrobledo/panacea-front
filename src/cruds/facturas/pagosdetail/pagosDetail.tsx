import DataList from "../../../components/DataList";

function FacturasPagos(props: any) {
  console.log(props.proveedor);
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
        columns={columns}
        addAction={true}
        resource={props.resource}
        resourceParent={props.resourceParent}
        viewAction={false}
      />
      ;
    </>
  );
}

export default FacturasPagos;
