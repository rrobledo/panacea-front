import DataList from "../../components/DataList";

function Proveedores(props: any) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Cuit",
      dataIndex: "cuit",
      key: "cuit",
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
      key: "telefono",
    },
  ];

  return (
    <div>
      <b>PROVEEDORES</b>
      <DataList
        ds={props.ds}
        resource={props.resource}
        columns={columns}
        viewAction={false}
      />
    </div>
  );
}

export default Proveedores;
