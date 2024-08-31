import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie({ countByPriority }: any) {
  const copyPriority = [...countByPriority];
  const result: any = copyPriority.map((element) => {
    if (element.priority === "High") {
      return {
        value: element.task_count,
        label: "High Priority",
        color: "#EF9A9A",
      };
    }
    if (element.priority === "Medium") {
      return {
        value: element.task_count,
        label: "Medium Priority",
        color: "#FFF59D",
      };
    }
    if (element.priority === "Low") {
      return {
        value: element.task_count,
        label: "Low Priority",
        color: "#A5D6A7",
      };
    }
  });

  return (
    <div className="flex flex-col items-center gap-5">
      <PieChart
        series={[
          {
            data: result,
          },
        ]}
        width={500}
        height={200}
      />
      <h4>Task Priorities Distribution</h4>
    </div>
  );
}
