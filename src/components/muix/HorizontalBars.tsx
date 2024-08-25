import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  xAxis: [
    {
      label: "Number of Tasks",
      tickFormatter: (tick) => Math.floor(tick), // Ensures that ticks are whole numbers
    },
  ],
  width: 400,
  height: 300,
};

export const dataset = [
  { column_name: "Todo", tasks: 2, color: "green" },
  { column_name: "Doing", tasks: 5 },
  { column_name: "Done", tasks: 3 },
  { column_name: "Review", tasks: 6 },
];

const valueFormatter = (value: number | null) => `${Math.floor(value)}`; // Ensures values are displayed as whole numbers

export default function HorizontalBars() {
  const chartSetting = {
    width: 400,
    height: 300,
    margin: { left: 80 },
  };
  return (
    <div>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: "band", dataKey: "column_name" }]}
        xAxis={[{ label: "Number of Tasks" }]}
        series={[
          {
            dataKey: "tasks",
            label: "Task Distribution Across Columns",
            valueFormatter,
          },
        ]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
}
