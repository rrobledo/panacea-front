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
        headerName: "Revenue",
        type: "number",
        minWidth: 200,
      },
      {
        field: "current_price",
        flex: 1,
        headerName: "Current Price",
        type: "number",
        minWidth: 200,
      },
      {
        field: "units",
        flex: 1,
        headerName: "Units",
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
