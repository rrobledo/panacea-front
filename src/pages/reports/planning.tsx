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
        headerName: "Producto",
        minWidth: 200,
      },
      {
        field: "precio",
        flex: 1,
        headerName: "Precio Venta",
        type: "number",
        minWidth: 10,
      },
      {
        field: "total",
        flex: 1,
        headerName: "Plan Produccion",
        type: "number",
        minWidth: 10,
      },
      {
        field: "total_actual",
        flex: 1,
        headerName: "Real",
        type: "number",
        minWidth: 10,
      },
      {
        field: "total_venta_planeado",
        flex: 1,
        headerName: "Presupuestado $",
        type: "number",
        minWidth: 10,
      },
      {
        field: "total_venta_actual",
        flex: 1,
        headerName: "Real $",
        type: "number",
        minWidth: 10,
      },
      {
        field: "costo_unitario_total",
        flex: 1,
        headerName: "Costo Unit Total",
        type: "number",
        minWidth: 10,
      },
      {
        field: "costo_total_planeado",
        flex: 1,
        headerName: "Costo Total Presup",
        type: "number",
        minWidth: 20,
      },
      {
        field: "costo_total_actual",
        flex: 1,
        headerName: "Costo Total Real",
        type: "number",
        minWidth: 20,
      },
      {
        field: "ganancia_planeado",
        flex: 1,
        headerName: "Utilidad Presup",
        type: "number",
        minWidth: 20,
      },
      {
        field: "ganancia_actual",
        flex: 1,
        headerName: "Utilidad Real",
        type: "number",
        minWidth: 20,
      },
      {
        field: "porcentaje_ganancia_prod",
        flex: 1,
        headerName: "%Margen de Utilidad",
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
