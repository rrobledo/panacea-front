import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  UrlField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps } from "@refinedev/core";

export const CostList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        minWidth: 50,
      },
      {
        field: "code",
        flex: 1,
        headerName: "Code",
        minWidth: 200,
      },
      {
        field: "revenue",
        flex: 1,
        headerName: "Porcentaje Ganancia",
        type: "number",
        minWidth: 20,
      },
      {
        field: "current_price",
        flex: 1,
        headerName: "Costo Materia Prima",
        type: "number",
        minWidth: 50,
      },
      {
        field: "measure_units",
        flex: 1,
        headerName: "Medida Unidades",
        minWidth: 20,
      },
      {
        field: "units",
        flex: 1,
        headerName: "Unidades Producidas",
        type: "number",
        minWidth: 20,
      },
      {
        field: "production_time",
        flex: 1,
        headerName: "Tiempo Total Produccion Lote",
        type: "number",
        minWidth: 30,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
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
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
