import { useEffect, useState } from "react";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { transFormData } from "../../utils/transFormData";
import useBackdropStore from "../../store/useBackdropStore";
import { useManageIdStore } from "../../store/useManageIdStore";
import useRefetchProjectDetails from "../../store/useRefetchProjectDetails";

interface FetchBoardDataProps {
  boardId: string | undefined;
 
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

 
export const useFetchProjectDetails = ({ boardId , selectedOption}: FetchBoardDataProps) => {
  // const {filterBy} = useManageIdStore()
  const axiosInstance = useCustomAxios();
  const { member_Id } = useManageIdStore();
  const [projectDetails, setProjectDetails] = useState<ProjectData[]>([]);
  const [sortedData, setSortedData] = useState<ProjectData[]>([]);
  const { showBackdrop, hideBackdrop } = useBackdropStore();
   const {refetchProgress} = useRefetchProjectDetails()

 
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
 
  }, [boardId, axiosInstance,refetchProgress ]);

  const updateSortedData = async () => {
    if (projectDetails.length > 0) {
      const transformedData = await transFormData(projectDetails);
      setSortedData(transformedData);
    }
  };
  useEffect(() => {
    updateSortedData();
  }, [projectDetails]);


   
 
  const filterByOption = async () => {
   
    if (selectedOption === "My tasks") {
      const copySorted =  await transFormData(projectDetails);
      if (member_Id === null) return;
      const filteredData = await copySorted.map((data:ProjectData) => {
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

    }else if (selectedOption === "High priority" || selectedOption === "Medium priority" || selectedOption === "Low priority") {
      const copySorted = await transFormData(projectDetails);
    
      
      const filteredData = copySorted.map((data: ProjectData) => {
        if (Array.isArray(data.items) && data.items.length > 0) {
          
          const priorityFilter = selectedOption.split(" ")[0];  
          const filteredItems = data.items.filter((item) => item.priority === priorityFilter);
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
  };

 useEffect(()=>{
   filterByOption()
 }, [selectedOption])

  return { projectDetails, sortedData, setSortedData, fetchProjectDetails };
};
