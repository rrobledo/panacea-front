import {
  AuthBindings,
  Authenticated,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";
import {
  InsumosCreate,
  InsumosEdit,
  InsumosList,
  InsumosShow,
} from "./pages/insumos";
import { CostCreate, CostEdit, CostList, CostShow } from "./pages/costs";
import { Login } from "./pages/login";
import { parseJwt } from "./utils/parse-jwt";
import { Precios, CostDetailShow, Planning } from "./pages/reports";
import ProductHistoryPage from "./pages/reports/product_history";
import ProductCronogramaPage from "./pages/reports/product_cronograma";
import ProductCronogramaByWeekOfMonthPage from "./pages/reports/product_cronograma_by_week_of_month";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
          })
        );

        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(
                  "https://panacea-one.vercel.app/costos"
                  // "http://localhost:8000/costos"
                )}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: "insumos",
                    identifier: "Insumos",
                    list: "/supplies",
                    create: "/supplies/create",
                    edit: "/supplies/edit/:id/",
                    show: "/supplies/show/:id",
                    meta: {
                      canDelete: false,
                    },
                  },
                  {
                    name: "costos",
                    list: "/costs",
                    create: "/costs/create",
                    edit: "/costs/edit/:id/",
                    show: "/costs/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "Reportes",
                  },
                  {
                    name: "costos_materia_prima",
                    list: "/costos_materia_prima",
                    show: "/costos_materia_prima/show/:id",
                    meta: {
                      parent: "reportes",
                    },
                  },
                  {
                    name: "planning",
                    list: "/planning",
                    meta: {
                      parent: "reportes",
                    },
                  },
                  {
                    name: "Historia de Productos ",
                    list: "/product_history",
                    meta: {
                      parent: "reportes",
                    },
                  },
                  {
                    name: "Cronograma Semanal Local",
                    list: "/product_cronograma_by_week",
                    meta: {
                      parent: "reportes",
                    },
                  },
                  {
                    name: "Cronograma",
                    list: "/product_cronograma",
                    meta: {
                      parent: "reportes",
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 Header={() => <Header sticky />}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route path="/">
                      <Route index element={<InsumosList />} />
                    </Route>
                    <Route path="/planning">
                      <Route index element={<Planning />} />
                    </Route>
                    <Route path="/costos_materia_prima">
                      <Route index element={<Precios />} />
                      <Route path="show/:id" element={<CostDetailShow />} />
                    </Route>
                    <Route path="/product_history">
                      <Route index element={<ProductHistoryPage />} />
                    </Route>
                    <Route path="/product_cronograma_by_week">
                      <Route
                        index
                        element={<ProductCronogramaByWeekOfMonthPage />}
                      />
                    </Route>
                    <Route path="/product_cronograma">
                      <Route index element={<ProductCronogramaPage />} />
                    </Route>
                    <Route path="/supplies">
                      <Route index element={<InsumosList />} />
                      <Route path="create" element={<InsumosCreate />} />
                      <Route path="edit/:id/" element={<InsumosEdit />} />
                      <Route path="show/:id" element={<InsumosShow />} />
                    </Route>
                    <Route path="/costs">
                      <Route index element={<CostList />} />
                      <Route path="create" element={<CostCreate />} />
                      <Route path="edit/:id/" element={<CostEdit />} />
                      <Route path="show/:id" element={<CostShow />} />
                    </Route>
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* <DevtoolsPanel /> */}
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
