import React from "react";
import { Chart, Interval, Interaction } from "bizcharts";
import "./chart.less";
import autoHeight from "./autoHeight";

function MiniBar(props) {
  const { data } = props;

  return (
    <div style={{ paddingTop: "20px" }}>
      <Chart autoFit pure data={data}>
        <Interval position="day*addition" />
        <Interaction type="element-highlight" />
        <Interaction type="active-region" />
      </Chart>
    </div>
  );
}

export default MiniBar;
