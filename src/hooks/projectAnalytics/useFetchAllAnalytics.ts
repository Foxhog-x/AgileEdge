import { useEffect, useState } from "react";
import { urls } from "../../services/apiServices/urls/urls";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import useBackdropStore from "../../store/useBackdropStore";
const useFetchAllAnalytics = () => {
  
  const axiosInstance = useCustomAxios();
    const [taskByColumnAnalytics, setTaskByColumnAnalytics] = useState([]);
    const [countByPriority, setCountByPriority] = useState([])
    const [taskCountByMember, setTaskCountByMember] = useState([])
    const {showBackdrop, hideBackdrop} = useBackdropStore()
    const getAnalytics = async () => {
        showBackdrop()
        const response = await axiosInstance.get(urls.getTaskAnalytics);
        const numberOfTaskByColumn = response.data.numberOfTaskByColumn
        const countByPriority = response.data.countByPriority
        const countByMember = response.data.taskCountsByMember
        setTaskByColumnAnalytics(numberOfTaskByColumn)
        setCountByPriority(countByPriority)
        setTaskCountByMember(countByMember)
        hideBackdrop()
     
      };
  useEffect(() => {
   
    getAnalytics();
  }, []);
  
  return {  taskByColumnAnalytics ,countByPriority,taskCountByMember };
};

export default useFetchAllAnalytics;
