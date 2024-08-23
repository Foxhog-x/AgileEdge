import { useEffect, useState } from "react";
import { urls } from "../../services/apiServices/urls/urls";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";

const useFetchAvatars = () => {
  const axiosInstance = useCustomAxios();
    const [avatars, setAvatars] = useState([])

  useEffect(() => {
    const getAvatars = async () => {
      const response = await axiosInstance.get(urls.getAvatars);
      setAvatars(response.data.result[0]);
    };
    getAvatars();
  }, []);
 
  return {  avatars };
};

export default useFetchAvatars;
