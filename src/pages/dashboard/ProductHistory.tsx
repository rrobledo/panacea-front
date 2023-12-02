import React from "react";
import ReactApexChart from "react-apexcharts";
import Select from "react-dropdown-select";

// type Props = {};

// const ProductHistoryPage = (props: Props) => {
//   return <div>DefaultPage</div>;
// };

// export default ProductHistoryPage;

class ProductHistoryPage extends React.Component<
  {},
  {
    error: any;
    isLoaded: boolean;
    series: any;
    categories: any;
    options: any;
    prod_options: any;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      series: [],
      categories: [],
      prod_options: [],
      options: {
        chart: {
          height: 350,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Produccion por semanas",
          align: "left",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: [],
          title: {
            text: "Meses",
          },
        },
        yaxis: {
          title: {
            text: "Cantidad",
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    };
  }

  componentDidMount() {
    fetch(
      "https://panacea-q5h5b8doi-rauls-projects-d37b0ed8.vercel.app/costos/products/XXX/history"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          let new_option = this.state.options;
          new_option.xaxis.categories = result.categories;
          this.setState({
            isLoaded: true,
            prod_options: result.products,
            options: new_option,
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

  onChangeProduct(values: any) {
    fetch(
      `https://panacea-q5h5b8doi-rauls-projects-d37b0ed8.vercel.app/costos/products/${values[0].value}/history`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            series: result.series,
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
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Select
            options={this.state.prod_options}
            values={[]}
            onChange={(values) => this.onChangeProduct(values)}
          />
          <div id="chart">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="area"
              width={"90%"}
              height={"auto"}
            />
          </div>
        </div>
      );
    }
  }
}

export default ProductHistoryPage;
