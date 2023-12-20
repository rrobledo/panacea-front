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

export const InsumosList: React.FC<IResourceComponentsProps> = () => {
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
        headerName: "Codigo",
        minWidth: 200,
      },
      {
        field: "name",
        flex: 1,
        headerName: "Nombre",
        minWidth: 200,
      },
      {
        field: "measure",
        flex: 1,
        headerName: "Capacidad",
        type: "number",
        minWidth: 200,
      },
      {
        field: "price",
        flex: 1,
        headerName: "Precio",
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
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              {/* <DeleteButton hideText recordItemId={row.id} /> */}
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
