import DataList from "../../components/DataList";

function PrecioProductos(props: any) {
  const columns = [
    {
      title: "Producto ID",
      dataIndex: "producto_id",
      key: "producto_id",
      hidden: true,
    },
    {
      title: "Producto",
      dataIndex: "producto_nombre",
      key: "producto_nombre",
      width: "20%",
    },
    {
      title: "Producto VA",
      dataIndex: "articulo_va",
      key: "articulo_va",
      width: "20%",
    },
    {
      title: "Producto CP",
      dataIndex: "articulo_cp",
      key: "articulo_cp",
      width: "20%",
    },
    {
      title: "Precio VA",
      dataIndex: "precio_va",
      key: "precio_va",
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
      title: "Precio CP",
      dataIndex: "precio_cp",
      key: "precio_cp",
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
      title: "Costo Fab",
      dataIndex: "costo_unitario_fab",
      key: "costo_unitario_fab",
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
      title: "Costo Total",
      dataIndex: "costo_total",
      key: "costo_total",
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
      title: "Utilidad VA",
      dataIndex: "porcentaje_va",
      key: "porcentaje_va",
      width: "10%",
      render: (data: any) => {
        return <div style={{ textAlign: "right" }}>{`${data}%`}</div>;
      },
    },
    {
      title: "Utilidad CP",
      dataIndex: "porcentaje_cp",
      key: "porcentaje_cp",
      width: "10%",
      render: (data: any) => {
        return <div style={{ textAlign: "right" }}>{`${data}%`}</div>;
      },
    },
  ];

  return (
    <>
      <b>PRECIO PRODUCTOS</b>
      <DataList
        ds={props.ds}
        resource={props.resource}
        columns={columns}
        addAction={false}
        delAction={false}
        editAction={false}
        rowIdName="producto_id"
      />
      ;
    </>
  );
}

export default PrecioProductos;
