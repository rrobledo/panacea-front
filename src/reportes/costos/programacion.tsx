import { ColDef, ColGroupDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useState } from "react";
import { Button } from "antd";

// Row Data Interface
interface IRow {
  id: string;
  producto: string;
  producto_nombre: string;
  responsable: string;
  s01_lunes_plan: number;
  s01_lunes_real: number;
  s01_martes_plan: number;
  s01_martes_real: number;
  s01_miercoles_plan: number;
  s01_miercoles_real: number;
  s01_jueves_plan: number;
  s01_jueves_real: number;
  s01_viernes_plan: number;
  s01_viernes_real: number;
  s01_sabado_plan: number;
  s01_sabado_real: number;
  s02_lunes_plan: number;
  s02_lunes_real: number;
  s02_martes_plan: number;
  s02_martes_real: number;
  s02_miercoles_plan: number;
  s02_miercoles_real: number;
  s02_jueves_plan: number;
  s02_jueves_real: number;
  s02_viernes_plan: number;
  s02_viernes_real: number;
  s02_sabado_plan: number;
  s02_sabado_real: number;
  s03_lunes_plan: number;
  s03_lunes_real: number;
  s03_martes_plan: number;
  s03_martes_real: number;
  s03_miercoles_plan: number;
  s03_miercoles_real: number;
  s03_jueves_plan: number;
  s03_jueves_real: number;
  s03_viernes_plan: number;
  s03_viernes_real: number;
  s03_sabado_plan: number;
  s03_sabado_real: number;
  s04_lunes_plan: number;
  s04_lunes_real: number;
  s04_martes_plan: number;
  s04_martes_real: number;
  s04_miercoles_plan: number;
  s04_miercoles_real: number;
  s04_jueves_plan: number;
  s04_jueves_real: number;
  s04_viernes_plan: number;
  s04_viernes_real: number;
  s04_sabado_plan: number;
  s04_sabado_real: number;
}

// Create new GridExample component
const Programacion = (props: any) => {
  const [rowData, setRowData] = useState<IRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updates, setUpdate] = useState(new Map());

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColGroupDef[]>([
    {
      headerName: "",
      children: [
        { field: "id", editable: true, hide: true },
        { field: "producto", editable: true, hide: true },
        {
          field: "producto_nombre",
          editable: true,
          width: 200,
          headerName: "Producto",
          pinned: "left",
        },
        {
          field: "responsable",
          editable: true,
          headerName: "Responsable",
          width: 150,
          pinned: "left",
        },
      ],
    },
    {
      headerName: "Semana 1",
      children: [
        {
          headerName: "Lu",
          children: [
            {
              field: "s01_lunes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s01_lunes_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Ma",
          children: [
            {
              field: "s01_martes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s01_martes_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Mi",
          children: [
            {
              field: "s01_miercoles_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s01_miercoles_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Ju",
          children: [
            {
              field: "s01_jueves_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s01_jueves_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Vi",
          children: [
            {
              field: "s01_viernes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s01_viernes_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Sa",
          children: [
            {
              field: "s01_sabado_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s01_sabado_real", editable: true, headerName: "E" },
          ],
        },
      ],
    },
    {
      headerName: "Semana 2",
      children: [
        {
          headerName: "Lu",
          children: [
            {
              field: "s02_lunes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s02_lunes_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Ma",
          children: [
            {
              field: "s02_martes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s02_martes_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Mi",
          children: [
            {
              field: "s02_miercoles_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s02_miercoles_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Ju",
          children: [
            {
              field: "s02_jueves_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s02_jueves_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Vi",
          children: [
            {
              field: "s02_viernes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s02_viernes_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Sa",
          children: [
            {
              field: "s02_sabado_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s02_sabado_real", editable: true, headerName: "E" },
          ],
        },
      ],
    },
    {
      headerName: "Semana 3",
      children: [
        {
          headerName: "Lu",
          children: [
            {
              field: "s03_lunes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s03_lunes_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Ma",
          children: [
            {
              field: "s03_martes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s03_martes_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Mi",
          children: [
            {
              field: "s03_miercoles_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s03_miercoles_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Ju",
          children: [
            {
              field: "s03_jueves_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s03_jueves_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Vi",
          children: [
            {
              field: "s03_viernes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s03_viernes_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Sa",
          children: [
            {
              field: "s03_sabado_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s03_sabado_real", editable: true, headerName: "E" },
          ],
        },
      ],
    },
    {
      headerName: "Semana 4",
      children: [
        {
          headerName: "Lu",
          children: [
            {
              field: "s04_lunes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s04_lunes_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Ma",
          children: [
            {
              field: "s04_martes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s04_martes_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Mi",
          children: [
            {
              field: "s04_miercoles_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s04_miercoles_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Ju",
          children: [
            {
              field: "s04_jueves_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s04_jueves_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Vi",
          children: [
            {
              field: "s04_viernes_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s04_viernes_real", editable: true, headerName: "E" },
          ],
        },
        {
          headerName: "Sa",
          children: [
            {
              field: "s04_sabado_plan",
              editable: true,
              headerName: "P",
              cellStyle: { backgroundColor: "silver" },
            },
            { field: "s04_sabado_real", editable: true, headerName: "E" },
          ],
        },
      ],
    },
  ]);

  const defaultColDef: ColDef = { width: 70 };

  const onCellValueChanged = (event: any) => {
    const key = event.data.id;
    delete event.data["producto"];
    delete event.data["producto_nombre"];
    delete event.data["responsable"];
    updates.set(key, event.data);
    event.colDef.cellStyle = { backgroundColor: "cyan" };
    event.api.refreshCells({
      force: true,
      columns: [event.colDef.field],
      rowNodes: [event.node],
    });
  };

  const getList = () => {
    props.ds.getList(`${props.resource}`).then((res: any) => {
      setRowData(res.data);
      setIsLoading(false);
    });
  };

  const onsubmit = () => {
    setIsLoading(true);
    let data: any[] = [];
    updates.forEach((value, key) => {
      data.push(value);
    });

    props.ds
      .patch(`${props.resource}`, 0, data)
      .then((res: any) => {
        setIsLoading(false);
        window.location.reload();
      })
      .finally(() => {
        setIsLoading(false);
      });
    setUpdate(new Map());
  };

  useEffect(() => {
    getList();
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div>
      <div
        style={{
          textAlign: "left",
        }}
      >
        <Button type="primary" htmlType="submit" onClick={onsubmit}>
          Actualizar
        </Button>
      </div>
      <div className={"ag-theme-quartz"} style={{ width: "100%", height: 700 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
};

export default Programacion;
