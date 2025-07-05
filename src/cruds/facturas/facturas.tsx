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
      title: "Proveedor",
      dataIndex: "proveedor_nombre",
      key: "proveedor_nombre",
    },
    {
      title: "Fecha",
      dataIndex: "fecha_emision",
      key: "fecha_emision",
    },
    {
      title: "Fecha Vencimiento",
      dataIndex: "fecha_vencimiento",
      key: "fecha_vencimiento",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
    },
  ];

  return (
    <div>
      <b>FACTURAS Y GASTOS</b>
      <DataList
        ds={props.ds}
        resource={props.resource}
        columns={columns}
        viewAction={false}
      />
    </div>
  );
}

export default Facturas;
