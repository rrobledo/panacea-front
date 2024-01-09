import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useDataGrid } from "@refinedev/mui";

export const CostEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

  const costsData = queryResult?.data?.data;
  const cost_code = costsData?.id?.toString().replace("/", "");

  const { data: costDetailData, isLoading: costDetailLoading } = useList({
    resource: `costs_details`,
    filters: [
      {
        field: "cost_code",
        operator: "eq",
        value: [cost_code],
      },
    ],
  });
  const costDetail: any = costDetailData?.data;
  const { dataGridProps } = useDataGrid();

  const columns: GridColDef[] = [
    {
      field: "supply_name",
      headerName: "Insumo",
      width: 300,
      editable: true,
    },
    {
      field: "supply_measure_units",
      headerName: "Unidad",
      width: 15,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Cantidad",
      type: "number",
      width: 110,
      editable: true,
    },
  ];

  // if (costDetailLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("id", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Id"
          name="id"
          disabled
        />
        <TextField
          {...register("code", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.code}
          helperText={(errors as any)?.code?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Code"
          name="code"
        />
        <TextField
          {...register("revenue", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.revenue}
          helperText={(errors as any)?.revenue?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Porcentaje de Ganancia"
          name="revenue"
        />
        <TextField
          {...register("current_price", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.current_price}
          helperText={(errors as any)?.current_price?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Precio Actual"
          name="current_price"
        />
        <TextField
          {...register("measure_units", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.code}
          helperText={(errors as any)?.code?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Unidad de Medida"
          name="measure_units"
        />
        <TextField
          {...register("units", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.units}
          helperText={(errors as any)?.units?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Unidades Producidas por Lote"
          name="units"
        />
        <TextField
          {...register("production_time", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.code}
          helperText={(errors as any)?.code?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Tiempo total produccion lote"
          name="production_time"
        />
      </Box>
      {/* <DataGrid
        rows={costDetail}
        columns={columns}
        autoHeight
        getRowId={(row: any) => row.supply_code}
      /> */}
    </Edit>
  );
};
