import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const dataset = [
  { label: "High Priority", tasks: 5, color: "#EF9A9A" },
  { label: "Medium Priority", tasks: 10, color: "#FFF59D" },
  { label: "Low Priority", tasks: 3, color: "#A5D6A7" },
];

export default function TaskPriorityPieChart() {
  return (
    <div>
      <PieChart dataset={dataset} title="Task Distribution by Priority" />
    </div>
  );
}
