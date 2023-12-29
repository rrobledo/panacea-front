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

  const { data, isLoading } = useList({
    resource: "reports/prices",
    config: {
      filters: [
        {
          field: "status",
          operator: "eq",
          value: "draft",
        },
      ],
      pagination: { pageSize: 1 },
    },
  });

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
            },
          },
        }}
      />
    </List>
  );
};
