import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
  return (
    <div className="flex flex-col items-center gap-5">
      <PieChart
        series={[
          {
            data: [
              { value: 10, label: "High Priority", color: "#EF9A9A" },
              { value: 15, label: "Medium Priority", color: "#FFF59D" },
              { value: 20, label: "Low Priority", color: "#A5D6A7" },
            ],
          },
        ]}
        width={500}
        height={200}
      />
      <h4>Task Priorities Distribution</h4>
    </div>
  );
}
