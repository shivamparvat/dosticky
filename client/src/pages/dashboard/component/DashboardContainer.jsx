import "../DeshboardCaintaint.css";
import Widget from "./DeshboardCaintaint/Widget";
import Chart from "./DeshboardCaintaint/Chart";

function DashboardContainer() {
  return (
    <div className="DeshboardCaintaint">
      <Widget />
      <h2 className="chartTitle">charts</h2>
      <div className="totalsellChart">
        <div className="chart">
          <Chart />
        </div>
      </div>
      {/* <h2 className="chartTitle">recent orders</h2>
      <div className="listOfRecentOrder">

      </div> */}
    </div>
  );
}

export default DashboardContainer;
