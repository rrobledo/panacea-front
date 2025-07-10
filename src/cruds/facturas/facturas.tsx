import DataList from "../../components/DataList";

function Facturas(props: any) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Fecha",
      dataIndex: "fecha_emision",
      key: "fecha_emision",
      width: "10%",
    },
    {
      title: "Proveedor",
      dataIndex: "proveedor_nombre",
      key: "proveedor_nombre",
      width: "20%",
    },
    {
      title: "Observaciones",
      dataIndex: "observaciones",
      key: "observaciones",
      width: "30%",
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      width: "10%",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      width: "10%",
      key: "estado",
    },
    {
      title: "Importe",
      dataIndex: "importe_total",
      key: "importe_total",
      width: "8%",
      render: (data: any) => {
        return (
          <div style={{ textAlign: "right" }}>
            {data.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <b>FACTURAS/GASTOS</b>
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

export default Facturas;
