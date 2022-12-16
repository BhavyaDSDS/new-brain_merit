import React from "react";
import { Chart, Interval, Tooltip } from "bizcharts";
import { Card } from "antd";

function ProductBarChart(props) {
  const { barData } = props;

  return (
    <Card bordered={false}>
      <Chart
        height={250}
        autoFit
        data={barData}
        interactions={["active-region"]}
      >
        <Interval position="x*y" />
        <Tooltip shared />
      </Chart>
    </Card>
  );
}

export default ProductBarChart;
