import { useEffect, useState } from "react";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { transFormData } from "../../utils/transFormData";
interface FetchBoardDataProps {
  boardId: string | undefined;
}
interface User {
  member_id: number;
  member_name: string;
}
interface CardData {
  assignees: User[];
  card_id: string;
  card_column_id: string;
  column_position: number | string;
  description: string;
  end_date: Date;
  name: string;
  priority: string;
}

interface ProjectData {
  column_id: string;
  column_name: string;
  column_position: number | string;
  items: CardData[];
}

 
export const useFetchProjectDetails = ({ boardId }: FetchBoardDataProps) => {
  const axiosInstance = useCustomAxios();
  const [projectDetails, setProjectDetails] = useState<ProjectData[]>([]);
  const [sortedData, setSortedData] = useState<ProjectData[]>([]);

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

console.log(projectDetails, "projectDetails")
  useEffect(() => {
   

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

  return { projectDetails, sortedData, setSortedData, fetchProjectDetails };
};
