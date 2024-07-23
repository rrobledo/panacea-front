import DataList from "../../components/DataList";

function CostosMateriaPrima(props: any) {
  const columns = [
    {
      title: "Producto",
      dataIndex: "producto_nombre",
      key: "producto_nombre",
      width: "20%",
    },
    {
      title: "Lote De Produc.",
      dataIndex: "lote_produccion",
      key: "lote_produccion",
      width: "5%",
    },
    {
      title: "Tiempo de Produc.",
      dataIndex: "tiempo_produccion",
      key: "tiempo_produccion",
      width: "5%",
    },
    {
      title: "Precio Venta",
      dataIndex: "precio_actual",
      key: "precio_actual",
      width: "10%",
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
    {
      title: "Costo MP",
      dataIndex: "costo_unitario_mp",
      key: "costo_unitario_mp",
      width: "10%",
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
    {
      title: "Margen Utilidad MP",
      dataIndex: "margen_utilidad",
      key: "margen_utilidad",
      width: "10%",
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
    {
      title: "Ventas Estimadas Mensual",
      dataIndex: "venta_estimada_mensual",
      key: "venta_estimada_mensual",
      width: "10%",
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
    {
      title: "Costo Estimado Mensual",
      dataIndex: "costo_estimado_mensual",
      key: "costo_estimado_mensual",
      width: "10%",
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
    {
      title: "Total Utilidad Mensual",
      dataIndex: "total_utilidad_mensual",
      key: "total_utilidad_mensual",
      width: "10%",
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
    {
      title: "Utilidad Mensual",
      dataIndex: "utilidad_mensual",
      key: "utilidad_mensual",
      width: "10%",
      render: (data: any) => {
        return <div style={{ textAlign: "right" }}>{`${data}%`}</div>;
      },
    },
  ];

  return (
    <>
      <b>COSTOS MATERIA PRIMA</b>
      <DataList ds={props.ds} resource={props.resource} columns={columns} />;
    </>
  );
}

export default CostosMateriaPrima;
