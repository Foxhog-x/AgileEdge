import { useEffect, useState } from "react";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { transFormData } from "../../utils/transFormData";
interface FetchBoardDataProps {
  boardId: string;
}

export const useFetchProjectDetails = ({ boardId }: FetchBoardDataProps) => {
  const axiosInstance = useCustomAxios();
  const [projectDetails, setProjectDetails] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const fetchProjectDetails = async (boardId: string) => {
      try {
        const response = await axiosInstance.post(urls.fetchAllContents, {
          boardId,
        });
        console.log();
        setProjectDetails(response.data.result);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    if (boardId) {
      fetchProjectDetails(boardId);
    }
  }, [boardId, axiosInstance]);

  useEffect(() => {
    const updateSortedData = async () => {
      if (projectDetails.length > 0) {
        const transformedData = await transFormData(projectDetails);
        setSortedData(transformedData);
      }
    };

    updateSortedData();
  }, [projectDetails]);
  console.log(projectDetails);
  console.log(sortedData, "sorted");
  return { projectDetails, sortedData, setSortedData };
};
