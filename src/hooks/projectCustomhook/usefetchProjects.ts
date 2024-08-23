import { useEffect, useState } from "react";
import { urls } from "../../services/apiServices/urls/urls";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";

const useFetchProjects = () => {
  const axiosInstance = useCustomAxios();
  const [projects, setProjects] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      const response = await axiosInstance.get(urls.getAllProject);
      setProjects(response.data.result[0]);
    };
    getProjects();
  }, [refresh]);

  return { projects,setProjects, refresh, setRefresh };
};

export default useFetchProjects;
