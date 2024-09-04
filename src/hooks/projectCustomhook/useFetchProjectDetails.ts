import { useEffect, useState } from "react";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { transFormData } from "../../utils/transFormData";
import { useManageIdStore } from "../../store/useManageIdStore";
import useBackdropStore from "../../store/useBackdropStore";
interface FetchBoardDataProps {
  boardId: string | undefined;
  show:boolean | undefined
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

 
export const useFetchProjectDetails = ({ boardId ,show}: FetchBoardDataProps) => {
  const axiosInstance = useCustomAxios();
  const [projectDetails, setProjectDetails] = useState<ProjectData[]>([]);
  const [sortedData, setSortedData] = useState<ProjectData[]>([]);
  // const [myProjectData, setMyProjectData] = useState<ProjectData[]>([])
  const { showBackdrop, hideBackdrop } = useBackdropStore();

  const fetchProjectDetails = async (boardId: string) => {
    try {
      showBackdrop()
      const response = await axiosInstance.post(urls.fetchAllContents, {
        boardId,
      });
      hideBackdrop()
      setProjectDetails(response.data.result);
    } catch (error) {
      hideBackdrop()
      console.error("Error fetching project details:", error);
    }
  };

console.log(projectDetails, "projectDetails")
  useEffect(() => {
  console.log("first")
    if (boardId) {
        fetchProjectDetails(boardId);  
    }
 
  }, [boardId, axiosInstance]);

  useEffect(() => {
    console.log("second")
    const updateSortedData = async () => {
      if (projectDetails.length > 0) {
        const transformedData = await transFormData(projectDetails);
        setSortedData(transformedData);
      }
    };

    updateSortedData();
  }, [projectDetails]);


  // useEffect(()=>{

  //   if(show){
  //   const mySortedData = async ()=>{
     
  //     if(sortedData.length > 0){
  //       const copySorted = [...sortedData];
  //       const sort = copySorted.map((data)=>{
           
  //       const items =  data.items.filter((value)=>{
             
  //         const result = Array.isArray(value.assignees) && value.assignees.some(assignee => assignee.member_id === member_Id);
      
  //            if(result) return value
  //         })

  //         return {
  //           column_id: data.column_id,
  //           column_name: data.column_name,
  //           column_position: data.column_position,
  //           items:items
      
  //         }
  //       })
  //     setSortedData(sort)
  //     } 
  //   }

  //   mySortedData()
  // }
  // },[show, member_Id])
  return { projectDetails, sortedData, setSortedData, fetchProjectDetails };
};
