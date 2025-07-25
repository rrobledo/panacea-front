import React, { useCallback, useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import useLocalStorage from "../utils/localStorage";
import getList from "./DataProvider";
import { FundOutlined, GroupOutlined, FormOutlined } from "@ant-design/icons";

import {
  AlignLeftOutlined,
  LeftCircleFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Insumos from "../cruds/insumos/insumos";
import InsumosCreate from "../cruds/insumos/insumosCreate";
import InsumosEdit from "../cruds/insumos/insumosEdit";
import path from "path";

import { LoginSocialGoogle, IResolveParams } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import DataResource from "./DataProvider";
import CostosDetailEdit from "../cruds/productos/costosdetail/costosDetailEdit";
import CostosDetailCreate from "../cruds/productos/costosdetail/costosDetailCreate";
import Productos from "../cruds/productos/productos";
import ProductosEdit from "../cruds/productos/productosEdit";
import ProductosCreate from "../cruds/productos/productosCreate";
import CostosMateriaPrima from "../reportes/costos/costosMateriaPrima";
import CostosMateriaPrimaView from "../reportes/costos/costosMateriaPrimaView";
import Programacion from "../reportes/costos/programacion";
import Remitos from "../cruds/remitos/remitos";
import RemitosEdit from "../cruds/remitos/remitosEdit";
import RemitosCreate from "../cruds/remitos/remitosCreate";
import MainDashboard from "../reportes/costos/mainDashboard";
import Produccion from "../reportes/costos/produccion";
import Ventas from "../reportes/costos/ventas";
import Planning from "../reportes/costos/planning";
import PrecioProductos from "../reportes/costos/precioProductos";
import Estimaciones from "../reportes/costos/estimaciones";
import Proveedores from "../cruds/proveedores/proveedores";
import ProveedoresEdit from "../cruds/proveedores/proveedoresEdit";
import ProveedoresCreate from "../cruds/proveedores/proveedoresCreate";
import Facturas from "../cruds/facturas/facturas";
import FacturasCreate from "../cruds/facturas/facturasCreate";
import FacturasEdit from "../cruds/facturas/facturasEdit";
import PagosCreate from "../cruds/facturas/pagosdetail/pagosDetailCreate";
import FacturasPagos from "../cruds/facturas/pagosdetail/pagosDetail";
import FacturaPagosCreate from "../cruds/facturas/pagosdetail/pagosDetailCreate";
import FacturaPagosEdit from "../cruds/facturas/pagosdetail/pagosDetailEdit";

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [provider, setProvider] = useLocalStorage("token", null);
  const [profile, setProfile] = useLocalStorage("profile", null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dataResource: DataResource = new DataResource(
    "https://panacea-one.vercel.app/costos"
    //"http://localhost:8000/costos"
  );

  const items = [
    // {
    //   key: "/main",
    //   icon: <FormOutlined />,
    //   label: <Link to="/main_dashboard">DashBoard</Link>,
    // },
    {
      key: "/remitos",
      icon: <FormOutlined />,
      label: <Link to="/remitos">Remitos</Link>,
    },
    {
      key: "/productos",
      icon: <FormOutlined />,
      label: <Link to="/productos">Productos</Link>,
    },
    {
      key: "/programacion",
      icon: <GroupOutlined />,
      label: <Link to="/programacion">Programacion</Link>,
    },

    {
      key: "Proveedores",
      label: "Proveedores",
      icon: <FundOutlined />,
      children: [
        {
          key: "/insumos",
          icon: <FormOutlined />,
          label: <Link to="/insumos">Insumos</Link>,
        },
        {
          key: "/proveedores",
          icon: <FormOutlined />,
          label: <Link to="/proveedores">Proveedores</Link>,
        },
        {
          key: "/ctacteprov",
          icon: <FormOutlined />,
          label: <Link to="/ctacteprov">Facturas/Gastos</Link>,
        },
      ],
    },

    {
      key: "reportes",
      label: "Reportes",
      icon: <FundOutlined />,
      children: [
        {
          key: "/costos_materia_prima",
          icon: <GroupOutlined />,
          label: <Link to="/costos_materia_prima">Costo Materia Prima</Link>,
        },
        {
          key: "/planning",
          icon: <GroupOutlined />,
          label: <Link to="/planning">Planning</Link>,
        },
        {
          key: "/produccion",
          icon: <GroupOutlined />,
          label: <Link to="/produccion">Produccion</Link>,
        },
        {
          key: "/ventas",
          icon: <GroupOutlined />,
          label: <Link to="/Ventas">Ventas</Link>,
        },
        {
          key: "/precioproductos",
          icon: <GroupOutlined />,
          label: <Link to="/precioproductos">Precio Productos</Link>,
        },
        {
          key: "/estimaciones",
          icon: <GroupOutlined />,
          label: <Link to="/estimaciones">Estimaciones</Link>,
        },
      ],
    },
  ];

  const menuOnClick = (info: any) => {
    console.log(`se hizo click ${info.key}`);
  };

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {
    alert("logout");
    setProfile(null);
    setProvider("");
  }, []);

  const initDataProvider = useCallback(() => {
    console.log("dataprovider init");
  }, []);

  const REDIRECT_URI = "http://localhost:3000/account/login";
  const GOOGLE_CLIENT_ID =
    "52953085630-97k8qungk58v9pcbsg6o879l5udhg5db.apps.googleusercontent.com";

  var homePage;

  initDataProvider();

  if (!provider || !profile) {
    homePage = (
      <div>
        <LoginSocialGoogle
          client_id={GOOGLE_CLIENT_ID || ""}
          onLoginStart={onLoginStart}
          redirect_uri={REDIRECT_URI}
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>{" "}
      </div>
    );
  } else {
    homePage = (
      <div>
        <BrowserRouter>
          <Layout>
            <Layout.Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {
                // console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                // console.log(collapsed, type);
              }}
              trigger={null}
              collapsible
              collapsed={collapsed}
            >
              <img src="logopanacea.png" height="100" />
              <Menu
                style={{ textAlign: "left" }}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["0"]}
                items={items}
              />
            </Layout.Sider>
            <Layout>
              <Layout.Header
                style={{
                  padding: 0,
                  background: colorBgContainer,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto",
                  }}
                >
                  <div
                    style={{
                      textAlign: "left",
                    }}
                  >
                    <Button
                      type="text"
                      icon={
                        collapsed ? (
                          <MenuUnfoldOutlined />
                        ) : (
                          <MenuFoldOutlined />
                        )
                      }
                      onClick={() => setCollapsed(!collapsed)}
                      style={{
                        fontSize: "16px",
                        width: 64,
                        height: 64,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      paddingRight: 30,
                    }}
                  >
                    <Button onClick={onLogout}>Logout</Button>
                  </div>
                </div>
              </Layout.Header>
              <Layout.Content
                style={{
                  margin: "24px 16px",
                }}
              >
                <div
                  style={{
                    padding: 24,
                    width: "100%",
                    minHeight: "85vh",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <Routes>
                    <Route
                      key="/"
                      path="/"
                      // element={<MainDashboard ds={dataResource} />}
                      element={<Produccion ds={dataResource} resource="" />}
                    />

                    <Route
                      key="/main_dashboard"
                      path="/main_dashboard"
                      element={<MainDashboard ds={dataResource} />}
                    />

                    {/* REMITOS */}
                    <Route
                      key="/remitos"
                      path="/remitos"
                      element={<Remitos ds={dataResource} resource="remitos" />}
                    />
                    <Route
                      key="/remitos/edit/:id"
                      path="/remitos/edit/:id"
                      element={
                        <RemitosEdit ds={dataResource} resource="remitos" />
                      }
                    />
                    <Route
                      key="/remitos/create"
                      path="/remitos/create"
                      element={
                        <RemitosCreate ds={dataResource} resource="remitos" />
                      }
                    />

                    {/* INSUMOS */}
                    <Route
                      key="/insumos"
                      path="/insumos"
                      element={<Insumos ds={dataResource} resource="insumos" />}
                    />
                    <Route
                      key="/insumos/edit/:id"
                      path="/insumos/edit/:id"
                      element={
                        <InsumosEdit ds={dataResource} resource="insumos" />
                      }
                    />
                    <Route
                      key="/insumos/create"
                      path="/insumos/create"
                      element={
                        <InsumosCreate ds={dataResource} resource="insumos" />
                      }
                    />

                    {/* PROVEEDORES */}
                    <Route
                      key="/proveedores"
                      path="/proveedores"
                      element={
                        <Proveedores ds={dataResource} resource="proveedores" />
                      }
                    />
                    <Route
                      key="/proveedores/edit/:id"
                      path="/proveedores/edit/:id"
                      element={
                        <ProveedoresEdit
                          ds={dataResource}
                          resource="proveedores"
                        />
                      }
                    />
                    <Route
                      key="/proveedores/create"
                      path="/proveedores/create"
                      element={
                        <ProveedoresCreate
                          ds={dataResource}
                          resource="proveedores"
                        />
                      }
                    />

                    {/* FACTURAS */}
                    <Route
                      key="/ctacteprov"
                      path="/ctacteprov"
                      element={
                        <Facturas ds={dataResource} resource="ctacteprov" />
                      }
                    />
                    <Route
                      key="/ctacteprov/edit/:id"
                      path="/ctacteprov/edit/:id"
                      element={
                        <FacturasEdit ds={dataResource} resource="ctacteprov" />
                      }
                    />
                    <Route
                      key="/ctacteprov/create"
                      path="/ctacteprov/create"
                      element={
                        <FacturasCreate
                          ds={dataResource}
                          resource="ctacteprov"
                        />
                      }
                    />

                    {/* FACTURA PAGOS*/}
                    <Route
                      key="/ctacteprov/:factura_id/pagos/edit/:id"
                      path="/ctacteprov/:factura_id/pagos/edit/:id"
                      element={
                        <FacturaPagosEdit
                          ds={dataResource}
                          resource="pagos"
                          resourceParent="ctacteprov"
                        />
                      }
                    />
                    <Route
                      key="/ctacteprov/:factura_id/pagos/create"
                      path="/ctacteprov/:factura_id/pagos/create"
                      element={
                        <FacturaPagosCreate
                          ds={dataResource}
                          resource="pagos"
                          resourceParent="ctacteprov"
                        />
                      }
                    />

                    {/* PRODUCTOS */}
                    <Route
                      key="/productos"
                      path="/productos"
                      element={
                        <Productos ds={dataResource} resource="productos" />
                      }
                    />
                    <Route
                      key="/productos/create"
                      path="/productos/create"
                      element={
                        <ProductosCreate
                          ds={dataResource}
                          resource="productos"
                        />
                      }
                    />
                    <Route
                      key="/productos/edit/:id"
                      path="/productos/edit/:id"
                      element={
                        <ProductosEdit ds={dataResource} resource="productos" />
                      }
                    />

                    {/* PRODUCTOS COSTOS*/}
                    <Route
                      key="/productos/:producto_id/costos/edit/:id"
                      path="/productos/:producto_id/costos/edit/:id"
                      element={
                        <CostosDetailEdit ds={dataResource} resource="costos" />
                      }
                    />
                    <Route
                      key="/productos/:producto_id/costos/create"
                      path="/productos/:producto_id/costos/create"
                      element={
                        <CostosDetailCreate
                          ds={dataResource}
                          resource="costos"
                          resourceParent="productos"
                        />
                      }
                    />

                    {/* REPORTES*/}
                    <Route
                      key="/costos_materia_prima"
                      path="/costos_materia_prima"
                      element={
                        <CostosMateriaPrima
                          ds={dataResource}
                          resource="costos_materia_prima"
                        />
                      }
                    />
                    <Route
                      key="/costos_materia_prima/view/:id"
                      path="/costos_materia_prima/view/:id"
                      element={
                        <CostosMateriaPrimaView
                          ds={dataResource}
                          resource="costos_materia_prima"
                        />
                      }
                    />
                    <Route
                      key="/planning"
                      path="/planning"
                      element={
                        <Planning ds={dataResource} resource="planning" />
                      }
                    />
                    <Route
                      key="/programacion"
                      path="/programacion"
                      element={
                        <Programacion
                          ds={dataResource}
                          resource="programacion"
                        />
                      }
                    />
                    <Route
                      key="/produccion"
                      path="/produccion"
                      element={<Produccion ds={dataResource} resource="" />}
                    />
                    <Route
                      key="/ventas"
                      path="/ventas"
                      element={<Ventas ds={dataResource} resource="" />}
                    />
                    <Route
                      key="/precioproductos"
                      path="/precioproductos"
                      element={
                        <PrecioProductos
                          ds={dataResource}
                          resource="precio_productos"
                        />
                      }
                    />
                    <Route
                      key="/precio_productos/view/:id"
                      path="/precio_productos/view/:id"
                      element={
                        <CostosMateriaPrimaView
                          ds={dataResource}
                          resource="costos_materia_prima"
                        />
                      }
                    />
                    <Route
                      key="/estimaciones"
                      path="/estimaciones"
                      element={
                        <Estimaciones
                          ds={dataResource}
                          resource="precio_productos"
                        />
                      }
                    />
                  </Routes>
                </div>
              </Layout.Content>
              <Layout.Footer
                style={{
                  textAlign: "center",
                }}
              >
                Drummond Lab Design ©{new Date().getFullYear()} Created by
                Drummond Labs
              </Layout.Footer>
            </Layout>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }

  return <>{homePage}</>;
};

export default Main;
