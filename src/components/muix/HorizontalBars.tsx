import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const valueFormatter = (value: number | null) => `${Math.floor(value)}`;

export default function HorizontalBars({ taskByColumnAnalytics }) {
  const chartSetting = {
    width: 400,
    height: 300,
    margin: { left: 80 },
  };

  return (
    <div>
      <BarChart
        dataset={taskByColumnAnalytics} // Use the prop as the dataset
        yAxis={[{ scaleType: "band", dataKey: "column_name" }]} // y-axis dataKey set to 'column_name'
        xAxis={[{ label: "Number of Tasks" }]}
        series={[
          {
            dataKey: "task_count", // dataKey should match the key in the dataset
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
