import { useEffect, useState } from "react";
import { urls } from "../../services/apiServices/urls/urls";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
interface ProjectProp{
  board_id: number;
  name:string;
  project_id:number;
}
const useFetchProjects = () => {
  const axiosInstance = useCustomAxios();
  const [projects, setProjects] = useState<ProjectProp[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const getProjects = async () => {
      const response = await axiosInstance.get(urls.getAllProject);
      setProjects(response.data.result[0]);
    };
    getProjects();
  }, [refresh]);
console.log(projects,'xxx')
  return { projects,setProjects, refresh, setRefresh };
};

export default useFetchProjects;
