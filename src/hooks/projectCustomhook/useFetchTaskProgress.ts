import { useEffect, useState } from "react";
import { urls } from "../../services/apiServices/urls/urls";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import useRefetchProgessStore from "../../store/useRefectchProgressStore";
interface ProgressData {
  card_id: number;
  completed_subtasks: string;
  completion_percentage: string;
  task_name: string;
  total_subtasks: number;
}
const useFetchTaskProgress = () => {
  const {refetchProgress} = useRefetchProgessStore()
  const axiosInstance = useCustomAxios();
    const [progress, setProgress] = useState<ProgressData[]>([])
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
