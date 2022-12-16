import React from "react";
import { Interaction, PieChart } from "bizcharts";
import { Card } from "antd";


function ProductPieChart(props) {
  const { pieData } = props;

  return (
    <Card bordered={false}>
      <PieChart
        forceFit
        height={250}
        data={pieData}
        radius={0.8}
        angleField="value"
        colorField="type"
        label={{
          visible: true,
          type: "outer",
          offset: 20,
          formatter: (val) => `${val.type} - ${val.value}%`,
        }}
      >
        <Interaction type="element-single-selected" />
      </PieChart>
    </Card>
  );
}

export default ProductPieChart;
