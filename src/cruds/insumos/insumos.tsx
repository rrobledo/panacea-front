import DataList from "../../components/DataList";

function Insumos(props: any) {
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
      title: "Medida",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "Unidades",
      dataIndex: "unidad_medida",
      key: "unidad_medida",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
    },
  ];

  return (
    <div>
      <b>INSUMOS</b>
      <DataList
        ds={props.ds}
        resource={props.resource}
        columns={columns}
        viewAction={false}
      />
    </div>
  );
}

export default Insumos;
