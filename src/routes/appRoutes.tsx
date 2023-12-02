import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import ProductHistory from "../pages/dashboard/ProductHistory";
import ProductCronograma from "../pages/dashboard/ProductCronograma";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import CostDetailsPage from "../pages/admin/cost_details/CostDetails";
import SaasPage from "../pages/dashboard/SaasPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AlertPage from "../pages/component/AlertPage";
import ButtonPage from "../pages/component/ButtonPage";
import ProductPage from "../pages/component/Product";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />,
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "dashboard.index",
      },
      {
        path: "/dashboard/producthistory",
        element: <ProductHistory />,
        state: "dashboard.producthistory",
        sidebarProps: {
          displayText: "Product History",
        },
      },
      {
        path: "/dashboard/productcronograma",
        element: <ProductCronograma />,
        state: "dashboard.productcronograma",
        sidebarProps: {
          displayText: "Product Cronograma Semanal",
        },
      },
      {
        path: "/dashboard/analytics",
        element: <AnalyticsPage />,
        state: "dashboard.analytics",
        sidebarProps: {
          displayText: "Analytic",
        },
      },
      {
        path: "/dashboard/saas",
        element: <SaasPage />,
        state: "dashboard.saas",
        sidebarProps: {
          displayText: "Saas",
        },
      },
    ],
  },
  {
    path: "/admin",
    element: <DashboardPageLayout />,
    state: "Admin",
    sidebarProps: {
      displayText: "Admin",
      icon: <DashboardOutlinedIcon />,
    },
    child: [
      {
        path: "/admin/costs",
        element: <CostDetailsPage />,
        state: "admin.cost",
        sidebarProps: {
          displayText: "Costs",
        },
      },
    ],
  },
  {
    path: "/component",
    element: <ComponentPageLayout />,
    state: "component",
    sidebarProps: {
      displayText: "Components",
      icon: <AppsOutlinedIcon />,
    },
    child: [
      {
        path: "/component/products",
        element: <ProductPage />,
        state: "component.product",
        sidebarProps: {
          displayText: "Productos",
        },
      },
      {
        path: "/component/alert",
        element: <AlertPage />,
        state: "component.alert",
        sidebarProps: {
          displayText: "Alert",
        },
      },
      {
        path: "/component/button",
        element: <ButtonPage />,
        state: "component.button",
        sidebarProps: {
          displayText: "Button",
        },
      },
    ],
  },
];

export default appRoutes;
