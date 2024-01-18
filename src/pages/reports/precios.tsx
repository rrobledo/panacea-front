import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";
import { useList, keys } from "@refinedev/core";

export const Precios: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "product_code",
        headerName: "Codigo",
        minWidth: 50,
      },
      {
        field: "product_name",
        flex: 1,
        headerName: "Producto",
        minWidth: 200,
      },
      {
        field: "units",
        flex: 1,
        headerName: "Lote de Prod",
        type: "number",
        minWidth: 90,
      },
      {
        field: "production_time",
        flex: 1,
        headerName: "Horas Prod",
        type: "number",
        minWidth: 90,
      },
      {
        field: "current_price",
        flex: 1,
        headerName: "Precio Venta",
        type: "number",
        minWidth: 90,
      },
      {
        field: "costo_unitario_mp",
        flex: 1,
        headerName: "Costo MP Unit",
        type: "number",
        minWidth: 100,
      },
      {
        field: "current_revenue",
        flex: 1,
        headerName: "Margen Util MP%",
        type: "number",
        minWidth: 120,
      },
      {
        field: "utilidad_del_lote",
        flex: 1,
        headerName: "Utilidad por Lote",
        type: "number",
        minWidth: 120,
      },
      {
        field: "estimate_monthly_sales",
        flex: 1,
        headerName: "Ventas Estim. Total",
        type: "number",
        minWidth: 120,
      },
      {
        field: "estimate_monthly_cost",
        flex: 1,
        headerName: "Cost Estim. Total",
        type: "number",
        minWidth: 120,
      },
      {
        field: "prod_revenue_monthly",
        flex: 1,
        headerName: "Prod Utilidad Total",
        type: "number",
        minWidth: 120,
      },
      {
        field: "total_revenue_monthly",
        flex: 1,
        headerName: "Utilidad Total",
        type: "number",
        minWidth: 120,
      },
      {
        field: "revenue_monthly",
        flex: 1,
        headerName: "Utilidad %",
        type: "number",
        minWidth: 120,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <ShowButton hideText recordItemId={row.product_code} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        getRowId={(row: any) => row.product_code}
        autoHeight
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              id: false,
              product_code: false,
            },
          },
        }}
      />
    </List>
  );
};
