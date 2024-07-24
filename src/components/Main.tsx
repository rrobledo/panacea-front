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
import Planning2024 from "../reportes/costos/planning2024";

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [provider, setProvider] = useLocalStorage("token", null);
  const [profile, setProfile] = useLocalStorage("profile", null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dataResource: DataResource = new DataResource(
    "https://panacea-one.vercel.app/costos"
    // "http://localhost:8000/costos"
  );

  const items = [
    {
      key: "/insumos",
      icon: <FormOutlined />,
      label: <Link to="/insumos">Insumos</Link>,
    },
    {
      key: "/productos",
      icon: <FormOutlined />,
      label: <Link to="/productos">Productos</Link>,
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
          key: "/planning_2024",
          icon: <GroupOutlined />,
          label: <Link to="/planning_2024">Planning 2024</Link>,
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
                      element={<Insumos ds={dataResource} resource="insumos" />}
                    ></Route>
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

                    {/* PRODUCTOS*/}
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
                      key="/planning_2024"
                      path="/planning_2024"
                      element={
                        <Planning2024
                          ds={dataResource}
                          resource="planning_2024"
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
