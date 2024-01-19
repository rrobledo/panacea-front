import React from "react";
import Select from "react-dropdown-select";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { log } from "console";

class ProductCronogramaByWeekOfMonthPage extends React.Component<
  {},
  {
    error: any;
    isLoaded: boolean;
    series: any;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      series: [],
    };
  }

  onChangeProduct(values: any) {
    // fetch(`http://localhost:8000/costos/cronograma/${values[0].value}`)
    fetch(`https://panacea-one.vercel.app/costos/cronograma/${values[0].value}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            series: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const columns: GridColDef[] = [
      {
        field: "product",
        headerName: "Producto",
        minWidth: 200,
      },
      {
        field: "lunes_local",
        flex: 1,
        headerName: "Lunes",
        type: "number",
        minWidth: 10,
      },
      {
        field: "martes_local",
        flex: 1,
        headerName: "Martes",
        type: "number",
        minWidth: 10,
      },
      {
        field: "miercoles_local",
        flex: 1,
        headerName: "Miercoles",
        type: "number",
        minWidth: 10,
      },
      {
        field: "jueves_local",
        flex: 1,
        headerName: "Jueves",
        type: "number",
        minWidth: 10,
      },
      {
        field: "viernes_local",
        flex: 1,
        headerName: "Viernes",
        type: "number",
        minWidth: 10,
      },
      {
        field: "sabado_local",
        flex: 1,
        headerName: "Sabado",
        type: "number",
        minWidth: 10,
      },
      {
        field: "total_semanal_local",
        flex: 1,
        headerName: "Total Semanal",
        type: "number",
        minWidth: 10,
      },
    ];

    const { error, isLoaded } = this.state;
    const options = [
      { value: 1, label: "Semana 1 al 7" },
      { value: 2, label: "Semana 8 al 15" },
      { value: 3, label: "Semana 16 al 23" },
      { value: 4, label: "Semana 24 al 31" },
    ];

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <b>Estimado Ventas Local</b>
          <Select
            options={options}
            values={[]}
            onChange={(values) => this.onChangeProduct(values)}
          />
          <div>
            <DataGrid
              rows={this.state.series}
              columns={columns}
              getRowId={(row: any) => row.product}
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
          </div>
        </div>
      );
    }
  }
}

export default ProductCronogramaByWeekOfMonthPage;
