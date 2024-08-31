import { useState, useEffect } from 'react';
import useCustomAxios from '../../services/apiServices/customAxios/customAxios';
import { urls } from '../../services/apiServices/urls/urls';

type Avatar = {
  avatar: string;
  member_id: number;
};

const useFetchAvatars = () => {
  const axiosInstance = useCustomAxios();
  const [avatars, setAvatars] = useState<Avatar[]>([]);

  useEffect(() => {
    const getAvatars = async () => {
      try {
        const response = await axiosInstance.get(urls.getAvatars);

        // Assuming the structure of response.data.result[0] is an array of Avatar objects
        if (Array.isArray(response.data.result)) {
          setAvatars(response.data.result[0]);
        } else if (response.data.result) {
          // If response.data.result[0] contains the avatars array
          setAvatars(response.data.result[0]);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    getAvatars();
  }, [axiosInstance]);

  return avatars;
};

export default useFetchAvatars;
