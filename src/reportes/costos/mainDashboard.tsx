import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col, Select, Spin, Checkbox, Modal } from "antd";
import {
  BarController,
  LinearScale,
  BarElement,
  TimeScale,
  Tooltip,
  ScatterController,
  PointElement,
  LineController,
  LineElement,
} from "chart.js";
import { ReactChart } from "chartjs-react";
import { CategoryScale } from "chart.js";

ReactChart.register(
  BarController,
  LinearScale,
  BarElement,
  TimeScale,
  Tooltip,
  CategoryScale,
  ScatterController,
  LineController,
  LineElement,
  PointElement
);

const MainDashboard = (props: any) => {
  const chartOption = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // data of chart similar to v2, check the migration guide
  const chartData = {
    datasets: [
      {
        label: "Bar Dataset",
        data: [10, 20, 30, 40],
        borderColor: "rgb(75, 192, 192)",
      },
      {
        label: "Line Dataset",
        data: [10, 35, 30, 25],
        borderColor: "rgb(75, 75, 192)",
      },
    ],
    labels: ["January", "February", "March", "April"],
  };

  return (
    <>
      <ReactChart
        type="bar"
        data={chartData}
        options={chartOption}
        height={400}
      />
    </>
  );
};

export default MainDashboard;
