import { BarChart } from "@mui/x-charts/BarChart";

// export const dataset = [
//   { member_name: "Onkar", task_count: 21 },
//   { member_name: "Swapanil", task_count: 13 },
//   { member_name: "mytask", task_count: 17 },
//   { member_name: "zero", task_count: 17 },
// ];
// interface CountMember {
//   member_name: string;
//   task_count: number;
// }
// interface BarChartByAssgineeProps {
//   taskCountByMember: CountMember[];
// }

export default function BarChartByAssginee({ taskCountByMember }: any) {
  const chartSetting = {
    width: 400,
    height: 300,
    margin: { left: 90 },
  };

  return (
    <div>
      <BarChart
        dataset={taskCountByMember}
        yAxis={[{ scaleType: "band", dataKey: "member_name" }]}
        xAxis={[
          {
            label: "Number of Tasks",
            scaleType: "linear", // Linear scale for continuous data
          },
        ]}
        series={[
          {
            dataKey: "task_count",
            label: "Number Of Tasks Assign To Member",
          },
        ]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
}
