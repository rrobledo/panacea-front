import DataList from "../../../components/DataList";

function CostosDetail(props: any) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Insumo",
      dataIndex: "insumo_nombre",
      key: "insumo_nombre",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "Medida",
      dataIndex: "insumo_unidad_medida",
      key: "insumo_unidad_medida",
    },
  ];

  return (
    <>
      <DataList
        ds={props.ds}
        columns={columns}
        addAction={true}
        resource={props.resource}
        resourceParent={props.resourceParent}
        viewAction={false}
      />
    </>
  );
}

export default CostosDetail;
