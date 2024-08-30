import React, { useEffect } from "react";
import "./Homepage.module.css";

import BasicPie from "../../components/muix/BasicPie";
import HorizontalBars from "../../components/muix/HorizontalBars";

import BarChartByAssginee from "../../components/muix/BarChartByAssginee";
import TodaysEvents from "../../components/TodaysEvents";
import useFetchAllAnalytics from "../../hooks/projectAnalytics/useFetchAllAnalytics";
export const Homepage: React.FC = () => {
  const { taskByColumnAnalytics, countByPriority, taskCountByMember } =
    useFetchAllAnalytics();
  console.log(taskByColumnAnalytics, countByPriority, "analytics");
  console.log();
  return (
    <div>
      <div className=" md:flex justify-between p-5 items-center">
        <HorizontalBars taskByColumnAnalytics={taskByColumnAnalytics} />
        <BarChartByAssginee taskCountByMember={taskCountByMember} />
        <BasicPie countByPriority={countByPriority} />
      </div>
      <div>
        <TodaysEvents />
      </div>
    </div>
  );
};
