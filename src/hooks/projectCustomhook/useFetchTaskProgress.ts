import { useEffect, useState } from "react";
import { urls } from "../../services/apiServices/urls/urls";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import useRefetchProgessStore from "../../store/useRefectchProgressStore";

const useFetchTaskProgress = () => {
  const {refetchProgress} = useRefetchProgessStore()
  const axiosInstance = useCustomAxios();
    const [progress, setProgress] = useState([])
    const getProgress = async () => {
        const response = await axiosInstance.get(urls.getTaskProgress);
        setProgress(response.data.result);
      };
  useEffect(() => {
   
    getProgress();
  }, [refetchProgress]);
 
  return {  progress , getProgress};
};

export default useFetchTaskProgress;
