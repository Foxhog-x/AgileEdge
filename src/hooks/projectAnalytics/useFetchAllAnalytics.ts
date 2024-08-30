import { useEffect, useState } from "react";
import { urls } from "../../services/apiServices/urls/urls";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { C } from "@fullcalendar/core/internal-common";
const useFetchAllAnalytics = () => {
  
  const axiosInstance = useCustomAxios();
    const [taskByColumnAnalytics, setTaskByColumnAnalytics] = useState([]);
    const [countByPriority, setCountByPriority] = useState([])
    const [taskCountByMember, setTaskCountByMember] = useState([])
    const getAnalytics = async () => {
        const response = await axiosInstance.get(urls.getTaskAnalytics);
        const numberOfTaskByColumn = response.data.numberOfTaskByColumn
        const countByPriority = response.data.countByPriority
        const countByMember = response.data.taskCountsByMember
        setTaskByColumnAnalytics(numberOfTaskByColumn)
        setCountByPriority(countByPriority)
        setTaskCountByMember(countByMember)

     
      };
  useEffect(() => {
   
    getAnalytics();
  }, []);
  
  return {  taskByColumnAnalytics ,countByPriority,taskCountByMember };
};

export default useFetchAllAnalytics;
