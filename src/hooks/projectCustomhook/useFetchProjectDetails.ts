import { useEffect, useState } from "react";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { transFormData } from "../../utils/transFormData";
import useBackdropStore from "../../store/useBackdropStore";
import { useManageIdStore } from "../../store/useManageIdStore";
import { Console } from "console";
import { Filter } from "@mui/icons-material";
interface FetchBoardDataProps {
  boardId: string | undefined;
  show:boolean | undefined;
  selectedOption: string;
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

 
export const useFetchProjectDetails = ({ boardId ,show, selectedOption}: FetchBoardDataProps) => {
  // const {filterBy} = useManageIdStore()
  const axiosInstance = useCustomAxios();
  const { member_Id } = useManageIdStore();
  const [projectDetails, setProjectDetails] = useState<ProjectData[]>([]);
  const [sortedData, setSortedData] = useState<ProjectData[]>([]);
  const { showBackdrop, hideBackdrop } = useBackdropStore();
  const {filterBy} = useManageIdStore()
 console.log(filterBy,"filter")
 
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

 
  useEffect(() => {
 
    if (boardId) {
        fetchProjectDetails(boardId);  
    }
 
  }, [boardId, axiosInstance]);

  const updateSortedData = async () => {
    if (projectDetails.length > 0) {
      const transformedData = await transFormData(projectDetails);
      setSortedData(transformedData);
    }
  };
  useEffect(() => {
    
 

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
 
  const filterByOption = async () => {
    const copySorted = [...sortedData];
    if (selectedOption === "My tasks") {
      if (member_Id === null) return;
      const filteredData = await copySorted.map((data) => {
        // If items exist and are an array, filter them based on assignees' member_id
        if (Array.isArray(data.items)) {
          const filteredItems = data.items.filter((item) => {
            return (
              Array.isArray(item.assignees) &&
              item.assignees.some(
                (assignee) => assignee.member_id === member_Id
              )
            );
          });

          return {
            ...data,
            items: filteredItems,
          };
        }

        return {
          ...data,
          items: [],
        };
      });
      setSortedData(filteredData);
    }
    if(selectedOption === "All tasks"){
      updateSortedData()
    }
    console.log(selectedOption,"se")
    if(selectedOption === "High priority" || "Medium priority" || "Low priority"){
      const option = selectedOption
      const filteredData = copySorted.map((data) => {
        if (Array.isArray(data.items)) {
          const filteredItems = data.items.filter((item) => {
            return item.priority === option; // Filter items with "High" priority
          });
  
          return {
            ...data,
            items: filteredItems,
          };
        }
        return {
          ...data,
          items: [],
        };
      });
      setSortedData(filteredData);
    }
     
  };

 useEffect(()=>{
 
   filterByOption()
 }, [selectedOption])
   
     
    
   
   
 
  
  return { projectDetails, sortedData, setSortedData, fetchProjectDetails };
};
