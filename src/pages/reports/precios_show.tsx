import { useShow, IResourceComponentsProps } from "@refinedev/core";
import React from "react";
import { Box, TextField } from "@mui/material";
import { Show, UrlField, NumberField } from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";

export const CostDetailShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { dataGridProps } = useDataGrid();

  const detail = record?.cost_detail;

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "supply_name",
        headerName: "Insumo",
        minWidth: 200,
      },
      {
        field: "amount",
        flex: 1,
        headerName: "Cantidad",
        type: "number",
        minWidth: 20,
      },
      {
        field: "individual_cost",
        flex: 1,
        headerName: "Costo",
        type: "number",
        minWidth: 50,
      },
      {
        field: "percentage_over_cost",
        flex: 1,
        headerName: "Porcentaje sobre Costo Total",
        type: "number",
        minWidth: 20,
      },
    ],
    []
  );

  return (
    <Show isLoading={isLoading}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Producto"
          value={record?.product_name}
          disabled
        />
        <TextField
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Unidades"
          value={record?.units ?? ""}
          disabled
        />
        <TextField
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Precio Actual"
          value={record?.current_price ?? ""}
          disabled
        />
        <TextField
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Costo"
          value={record?.suggested_price ?? ""}
          disabled
        />
        <TextField
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Ganancia%"
          value={record?.current_revenue ?? ""}
          disabled
        />
      </Box>

      {!isLoading && (
        <DataGrid
          rows={record?.cost_detail}
          columns={columns}
          getRowId={(row: any) => row.supply_name}
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
      )}
    </Show>
  );
};
