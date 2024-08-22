import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";

interface User {
  member_id: number;
  member_name: string;
}

interface AssigneeUserSelectProps {
  // Initially assigned users
  selectedAssignee: User[];
  setAssignee_id: React.Dispatch<React.SetStateAction<User[]>>; // Function to update assigned users
}

const AssigneeUserNotSelect: React.FC<AssigneeUserSelectProps> = ({
  selectedAssignee,
  setAssignee_id,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const parsedData = JSON.parse(localStorage.getItem("userData"));
    const users = Array.isArray(parsedData) ? parsedData : [parsedData];
    setTimeout(() => {
      setUsers(users);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Autocomplete
      fullWidth
      multiple
      onChange={(_, newValue) => {
        setAssignee_id(newValue);
      }}
      id="assignee-autocomplete"
      options={users}
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
            label={option.member_name}
            {...getTagProps({ index })}
            key={option.member_id}
          />
        ))
      }
    />
  );
};

export default AssigneeUserNotSelect;
