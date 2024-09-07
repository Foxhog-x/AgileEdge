import React from "react";
import "./Homepage.module.css";

import BasicPie from "../../components/muix/BasicPie";
import HorizontalBars from "../../components/muix/HorizontalBars";

import BarChartByAssginee from "../../components/muix/BarChartByAssginee";
import TodaysEvents from "../../components/TodaysEvents";
import useFetchAllAnalytics from "../../hooks/projectAnalytics/useFetchAllAnalytics";
export const Homepage: React.FC = () => {
  const { taskByColumnAnalytics, countByPriority, taskCountByMember } =
    useFetchAllAnalytics();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col-reverse md:flex justify-between gap-10 p-5 items-center min-h-full">
        <HorizontalBars taskByColumnAnalytics={taskByColumnAnalytics} />
        <BarChartByAssginee taskCountByMember={taskCountByMember} />
        <BasicPie countByPriority={countByPriority} />
        <div className="min-w-80">
          <TodaysEvents />
        </div>
      </div>
    </div>
  );
};
