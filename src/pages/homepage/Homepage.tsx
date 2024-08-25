import React, { useEffect } from "react";
import "./Homepage.module.css";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import BasicPie from "../../components/muix/BasicPie";
import HorizontalBars from "../../components/muix/HorizontalBars";
import PriorityPieChart from "../../components/muix/PriorityPieChart";
import TaskPriorityPieChart from "../../components/muix/TaskPriorityPieChart";
import BarChartByAssginee from "../../components/muix/BarChartByAssginee";
export const Homepage: React.FC = () => {
  return (
    <div>
      <div className=" md:flex justify-between p-5 items-center">
        <HorizontalBars />
        <BarChartByAssginee />
        <BasicPie />
      </div>
    </div>
  );
};
