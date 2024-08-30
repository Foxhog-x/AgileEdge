import { useEffect, useState } from "react";
import { urls } from "../../services/apiServices/urls/urls";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { C } from "@fullcalendar/core/internal-common";
const useFetchAllAnalytics = () => {
  
  const axiosInstance = useCustomAxios();
    const [taskByColumnAnalytics, setTaskByColumnAnalytics] = useState([]);
    const [countByPriority, setCountByPriority] = useState([])
    const getAnalytics = async () => {
        const response = await axiosInstance.get(urls.getTaskAnalytics);
        const numberOfTaskByColumn = response.data.numberOfTaskByColumn
        const countByPriority = response.data.countByPriority
        setTaskByColumnAnalytics(numberOfTaskByColumn)
        setCountByPriority(countByPriority)
     
      };
  useEffect(() => {
   
    getAnalytics();
  }, []);
 
  return {  taskByColumnAnalytics ,countByPriority, };
};

export default useFetchAllAnalytics;
