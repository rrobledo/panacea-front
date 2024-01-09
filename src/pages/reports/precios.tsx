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
        headerName: "Nombre",
        minWidth: 200,
      },
      {
        field: "units",
        flex: 1,
        headerName: "Unidades",
        type: "number",
        minWidth: 200,
      },
      {
        field: "suggested_price",
        flex: 1,
        headerName: "Costo",
        type: "number",
        minWidth: 200,
      },
      {
        field: "current_price",
        flex: 1,
        headerName: "Precio Actual",
        type: "number",
        minWidth: 200,
      },
      {
        field: "current_revenue",
        flex: 1,
        headerName: "Ganancia",
        type: "number",
        minWidth: 200,
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
              pruduct_code: false,
            },
          },
        }}
      />
    </List>
  );
};
