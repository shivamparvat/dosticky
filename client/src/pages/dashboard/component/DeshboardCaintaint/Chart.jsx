import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./ChartWidget.css";

function ChartWidget() {
  const [chart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
        ],
      },
    },
    series: [
      {
        name: "user",
        data: [153, 123, 264, 168, 206, 458, 83, 110],
      },
      {
        name: "order",
        data: [15, 10, 30, 50, 43, 60, 28, 61],
      },
    ],
  });
  const [chartType, setChartType] = useState("bar");

  const Chartfunc = ({ chartType }) => {
    return (
      <Chart
        options={chart.options}
        series={chart.series}
        type={chartType}
        width="100%"
        height="400px"
      />
    );
  };
  return (
    <div className="ChartWidget">
      <select
        onChange={(e) => setChartType(e.target.value)}
        name="chartType"
        id="chartType"
      >
        <option selected value="bar">
          Bar
        </option>
        <option value="line">Line</option>
        <option value="area">Area</option>
        <option value="radar">Radar</option>
      </select>
      <Chartfunc chartType={chartType} />
    </div>
  );
}

export default ChartWidget;
