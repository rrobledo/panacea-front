import { Routes, Route, Link } from "react-router-dom";
import { Table, Space } from "antd";
import { useEffect, useState } from "react";
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
    },
    {
      title: "Proveedor",
      dataIndex: "proveedor_nombre",
      key: "proveedor_nombre",
    },
    {
      title: "Importe",
      dataIndex: "importe_total",
      key: "importe_total",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
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
