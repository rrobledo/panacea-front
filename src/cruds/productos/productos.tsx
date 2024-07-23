import { Routes, Route, Link } from "react-router-dom";
import { Table, Space } from "antd";
import { useEffect, useState } from "react";
import DataList from "../../components/DataList";

function Productos(props: any) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Codigo",
      dataIndex: "codigo",
      key: "codigo",
      hidden: true,
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Referencia",
      dataIndex: "ref_id",
      key: "ref_id",
    },
    {
      title: "Utiliad",
      dataIndex: "utilidad",
      key: "utilidad",
    },
    {
      title: "Precio Actual",
      dataIndex: "precio_actual",
      key: "precio_actual",
    },
    {
      title: "Lote Produccion",
      dataIndex: "lote_produccion",
      key: "lote_produccion",
    },
    {
      title: "Medida",
      dataIndex: "unidad_medida",
      key: "unidad_medida",
    },
    {
      title: "Tiempo de Produccion",
      dataIndex: "tiempo_produccion",
      key: "tiempo_produccion",
    },
  ];

  return (
    <>
      <b>PRODUCTOS</b>
      <DataList
        ds={props.ds}
        resource={props.resource}
        columns={columns}
        addAction={true}
      />
      ;
    </>
  );
}

export default Productos;
