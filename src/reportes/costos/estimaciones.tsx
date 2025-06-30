import DataList from "../../components/DataList";
import { Button, Form, Row, Col, Select, Spin, Checkbox, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";

function Estimaciones(props: any) {
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);

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
      title: "Costo MO",
      dataIndex: "costo_unitario_mo",
      key: "costo_unitario_mo",
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
      dataIndex: "costo_unitario_fab_new",
      key: "costo_unitario_fab_new",
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
      dataIndex: "costo_total_new",
      key: "costo_total_new",
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
      title: "Precio Fab",
      dataIndex: "precio_sugerido",
      key: "precio_sugerido",
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
      title: "Precio Local",
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
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      width: "10%",
    },
    {
      title: "Ganancia Fab",
      dataIndex: "ganancia_fab_new",
      key: "ganancia_fab_new",
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
  ];

  const onChangeAnio = (value: any) => {
    setAnio(value);
  };

  const onChangeMes = (value: any) => {
    setMes(value);
  };

  return (
    <>
      <b>Estimaciones</b>
      <div>
        <Row>
          <Col span={5}>
            <Form.Item label="Anio">
              <Select
                defaultValue={new Date().getFullYear().toString()}
                onChange={onChangeAnio}
              >
                <Select.Option value="2024">2024</Select.Option>
                <Select.Option value="2025">2025</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Mes">
              <Select
                defaultValue={(new Date().getMonth() + 1).toString()}
                onChange={onChangeMes}
              >
                <Select.Option value="1">Enero</Select.Option>
                <Select.Option value="2">Febrero</Select.Option>
                <Select.Option value="4">Abril</Select.Option>
                <Select.Option value="5">Mayo</Select.Option>
                <Select.Option value="6">Junio</Select.Option>
                <Select.Option value="7">Julio</Select.Option>
                <Select.Option value="8">Agosto</Select.Option>
                <Select.Option value="9">Septiembre</Select.Option>
                <Select.Option value="10">Octubre</Select.Option>
                <Select.Option value="11">Noviembre</Select.Option>
                <Select.Option value="12">Diciembre</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>
      <DataList
        ds={props.ds}
        resource={"precio_productos"}
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

export default Estimaciones;
