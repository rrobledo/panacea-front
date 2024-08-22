import DataList from "../../components/DataList";

function Remitos(props: any) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Cliente",
      dataIndex: "cliente_nombre",
      key: "cliente_nombre",
    },
    {
      title: "Vendedor",
      dataIndex: "vendedor",
      key: "vendedor",
    },
    {
      title: "Fecha Entrega",
      dataIndex: "fecha_entrega",
      key: "fecha_entrega",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
    },
  ];

  return (
    <div>
      <b>REMITOS</b>
      <DataList
        ds={props.ds}
        resource={props.resource}
        columns={columns}
        viewAction={false}
      />
    </div>
  );
}

export default Remitos;
