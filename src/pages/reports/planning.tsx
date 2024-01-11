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
        minWidth: 20,
      },
      {
        field: "product_name",
        headerName: "Nombre",
        minWidth: 200,
      },
      {
        field: "precio",
        flex: 1,
        headerName: "Precio",
        type: "number",
        minWidth: 10,
      },
      {
        field: "total",
        flex: 1,
        headerName: "Planeado",
        type: "number",
        minWidth: 10,
      },
      {
        field: "total_actual",
        flex: 1,
        headerName: "Actual",
        type: "number",
        minWidth: 10,
      },
      {
        field: "total_venta_planeado",
        flex: 1,
        headerName: "Total Planeado",
        type: "number",
        minWidth: 10,
      },
      {
        field: "total_venta_actual",
        flex: 1,
        headerName: "Total Actual",
        type: "number",
        minWidth: 10,
      },
      {
        field: "costo_producto",
        flex: 1,
        headerName: "Costo",
        type: "number",
        minWidth: 10,
      },
      {
        field: "costo_total_planeado",
        flex: 1,
        headerName: "Costo Total Planeado",
        type: "number",
        minWidth: 20,
      },
      {
        field: "costo_total_actual",
        flex: 1,
        headerName: "Costo Total Actual",
        type: "number",
        minWidth: 20,
      },
      {
        field: "ganancia_planeado",
        flex: 1,
        headerName: "Ganancia Planeado",
        type: "number",
        minWidth: 20,
      },
      {
        field: "ganancia_actual",
        flex: 1,
        headerName: "Ganancia Actual",
        type: "number",
        minWidth: 20,
      },
      {
        field: "porcentaje_ganancia_prod",
        flex: 1,
        headerName: "%Ganancia Prod",
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
