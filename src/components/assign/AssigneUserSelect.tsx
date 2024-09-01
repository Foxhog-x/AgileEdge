import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box, Chip, CircularProgress } from "@mui/material";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { useLocation } from "react-router-dom";
import { useToastStore } from "../../store/useToastStore";

interface User {
  member_id: number;
  member_name: string;
}

interface AssigneeUserSelectProps {
  assignee: User[]; // Initially assigned users
  setAssignee_id: React.Dispatch<React.SetStateAction<User[]>>;
}

const AssigneeUserSelect: React.FC<AssigneeUserSelectProps> = ({
  assignee = [],
  setAssignee_id,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const axiosInstance = useCustomAxios();
  const { addToast } = useToastStore();
  useEffect(() => {
    const parsedData = JSON.parse(localStorage.getItem("userData") || "[]");
    const users = Array.isArray(parsedData) ? parsedData : [parsedData];
    setTimeout(() => {
      setUsers(users);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (<Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
          // Light background color
      }}
    >
      <CircularProgress size={20} />
    </Box>);
  }
  const removeAssigneFromdb = async (assigneeObj: any, cardId: any) => {
    try {
      await axiosInstance.delete(urls.removeAssignee, {
        data: { assigneeObj, cardId },
      });
      addToast("deallocate", "success");
    } catch (error) {
      console.log(error);
      addToast("error occured", "error");
    }
  };
  const addAssigneToDb = async (assigneeObj: any, cardId: any) => {
    try {
      await axiosInstance.post(urls.addAssignees, {
        data: { assigneeObj, cardId },
      });
      addToast("Assign", "success");
    } catch (error) {
      console.log(error);
      addToast("error occured whiile assign", "error");
    }
  };
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: User[],
    reason: string
  ) => {
    event.preventDefault();
    const path = location.pathname;
    const match = path.match(/(\d+)$/);
    const cardId = match ? parseInt(match[0], 10) : null;
    if (reason === "removeOption") {
      const removedMember = assignee.find(
        (member) => !newValue.includes(member)
      );

      removeAssigneFromdb(removedMember, cardId);
    } else if (reason === "selectOption") {
      const addedMember = newValue.find((member) => !assignee.includes(member));
      addAssigneToDb(addedMember, cardId);
    }
    setAssignee_id(newValue);
  };

  const filteredOptions = users.filter(
    (user) =>
      !assignee.some((selected) => selected?.member_id === user?.member_id)
  );

  return (
    <Autocomplete
      multiple
      value={assignee}
      onChange={handleChange}
      id="assignee-autocomplete"
      isOptionEqualToValue={(option, value) =>
        option?.member_id === value?.member_id
      }
      options={filteredOptions}
      getOptionLabel={(option) => option?.member_name}
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
            label={option?.member_name}
            {...getTagProps({ index })}
            key={option?.member_id}
          />
        ))
      }
    />
  );
};

export default AssigneeUserSelect;
