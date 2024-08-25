import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  xAxis: [
    {
      label: "Number of Tasks By Assign Memebers",
      tickFormatter: (tick) => Math.floor(tick), // Ensures that ticks are whole numbers
    },
  ],
  width: 400,
  height: 300,
};

export const dataset = [
  { member_name: "Onkar", task_count: 21 },
  { member_name: "Swapanil", task_count: 13 },
  { member_name: "mytask", task_count: 17 },
  { member_name: "zero", task_count: 17 },
];

const valueFormatter = (value: number | null) => `${Math.floor(value)}`; // Ensures values are displayed as whole numbers

export default function BarChartByAssginee() {
  const chartSetting = {
    width: 400,
    height: 300,
    margin: { left: 90 },
  };
  return (
    <div>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: "band", dataKey: "member_name" }]}
        xAxis={[{ label: "Number of Tasks" }]}
        series={[
          {
            dataKey: "task_count",
            label: "Number Of Tasks Assign To Member",
            valueFormatter,
          },
        ]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
}
