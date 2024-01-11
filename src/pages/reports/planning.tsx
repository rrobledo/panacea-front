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

export const Planning: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "product_code",
        headerName: "Codigo",
        minWidth: 200,
      },
      {
        field: "product_name",
        headerName: "Nombre",
        minWidth: 200,
      },
      {
        field: "month",
        headerName: "Mes",
        minWidth: 20,
      },
      {
        field: "total",
        flex: 1,
        headerName: "Planeado",
        type: "number",
        minWidth: 20,
      },
      {
        field: "precio",
        flex: 1,
        headerName: "Precio Actual",
        type: "number",
        minWidth: 20,
      },
      {
        field: "total_venta",
        flex: 1,
        headerName: "Total Planeado",
        type: "number",
        minWidth: 20,
      },
      {
        field: "total_actual",
        flex: 1,
        headerName: "Actual",
        type: "number",
        minWidth: 20,
      },
      {
        field: "total_venta_actual",
        flex: 1,
        headerName: "Total Acutal",
        type: "number",
        minWidth: 20,
      },
      {
        field: "costo_producto",
        flex: 1,
        headerName: "Costo Producto",
        type: "number",
        minWidth: 20,
      },
      {
        field: "ganancia",
        flex: 1,
        headerName: "%Ganancia",
        type: "number",
        minWidth: 20,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        getRowId={(row: any) => row.product_name}
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
