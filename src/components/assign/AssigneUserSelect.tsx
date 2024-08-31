import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { useLocation } from "react-router-dom";
import { useToastStore } from "../../store/useToastStore";
import { AxiosError } from "axios";

interface User {
  member_id: number;
  member_name: string;
}

interface AssigneeUserSelectProps {
  assignee: User[];
  setAssignee_id: React.Dispatch<React.SetStateAction<User[]>>;
}

const AssigneeUserSelect: React.FC<AssigneeUserSelectProps> = ({
  assignee = [],
  setAssignee_id,
}: AssigneeUserSelectProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const axiosInstance = useCustomAxios();
  const { addToast } = useToastStore();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parsedData = userData ? JSON.parse(userData) : [];
    const usersArray = Array.isArray(parsedData) ? parsedData : [parsedData];
    setTimeout(() => {
      setUsers(usersArray);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const removeAssigneeFromDb = async (
    assigneeObj: User | undefined,
    cardId: number | string | null
  ) => {
    try {
      await axiosInstance.delete(urls.removeAssignee, {
        data: { assigneeObj, cardId },
      });
      addToast("Deallocated successfully", "success");
    } catch (error) {
      const axiosError = error as AxiosError;
      addToast(axiosError.message, "error");
    }
  };

  const addAssigneeToDb = async (
    assigneeObj: User | undefined,
    cardId: number | null | string
  ) => {
    try {
      await axiosInstance.post(urls.addAssignees, {
        data: { assigneeObj, cardId },
      });
      addToast("Assigned successfully", "success");
    } catch (error) {
      const axiosError = error as AxiosError;
      addToast(axiosError.message, "error");
    }
  };

  const handleChange = (newValue: User[], reason: string) => {
    const path = location.pathname;
    const match = path.match(/(\d+)$/);
    const cardId = match ? parseInt(match[0], 10) : null;

    if (reason === "removeOption") {
      const assigneeObj = assignee.find(
        (member) =>
          !newValue.some((selected) => selected.member_id === member.member_id)
      );
      removeAssigneeFromDb(assigneeObj, cardId);
    } else if (reason === "selectOption") {
      const addedMember = newValue.find(
        (member) =>
          !assignee.some((existing) => existing.member_id === member.member_id)
      );
      addAssigneeToDb(addedMember, cardId);
    }
    setAssignee_id(newValue);
  };

  const filteredOptions = users.filter(
    (user) =>
      !assignee.some((selected) => selected.member_id === user.member_id)
  );

  return (
    <Autocomplete
      multiple
      value={assignee}
      onChange={handleChange as () => void}
      id="assignee-autocomplete"
      isOptionEqualToValue={(option, value) =>
        option.member_id === value.member_id
      }
      options={filteredOptions}
      getOptionLabel={(option) => option.member_name}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Select or add assignees"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
          }}
        />
      )}
      renderTags={(value: User[], getTagProps) =>
        value.map((option: User, index: number) => (
          <Chip
            label={option.member_name}
            {...getTagProps({ index })}
            key={option.member_id}
          />
        ))
      }
    />
  );
};

export default AssigneeUserSelect;
