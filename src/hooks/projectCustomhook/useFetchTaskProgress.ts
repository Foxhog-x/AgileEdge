import { useEffect, useState } from "react";
import { urls } from "../../services/apiServices/urls/urls";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";

const useFetchTaskProgress = () => {
  const axiosInstance = useCustomAxios();
    const [progress, setProgress] = useState(1)
    const getProgress = async () => {
        const response = await axiosInstance.get(urls.getTaskProgress);
        setProgress(response.data.result);
      };
  useEffect(() => {
   
    getProgress();
  }, []);
 console.log(progress, "pro")
  return {  progress , getProgress};
};

export default useFetchTaskProgress;
