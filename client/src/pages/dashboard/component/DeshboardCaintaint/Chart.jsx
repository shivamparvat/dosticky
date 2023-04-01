import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./ChartWidget.css"

function ChartWidget() {
  const [chart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "series-2",
        data: [3, 56, 75, 50, 43, 60, 28, 61],
      },
    ],
  });
  const [chartType, setChartType] = useState("bar");

  const Chartfunc=({chartType})=>{
    return <Chart
    options={chart.options}
    series={chart.series}
    type={chartType}
    width="100%"
    height="400px"
  />
  }
  return (
    <div className="ChartWidget">
        <select onChange={(e)=>setChartType(e.target.value)} name="chartType" id="chartType">
            <option selected value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="area">Area</option>
            <option value="radar">Radar</option>
        </select>
        <Chartfunc chartType={chartType}/>
    </div>
  );
}

export default ChartWidget;
