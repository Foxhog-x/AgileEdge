import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";

interface User {
  member_id: number;
  member_name: string;
}

interface AssigneeUserSelectProps {
  assignee: User[]; // Initially assigned users
  setAssignee_id: React.Dispatch<React.SetStateAction<User[]>>; // Function to update assigned users
}

const AssigneeUserSelect: React.FC<AssigneeUserSelectProps> = ({
  assignee = [],
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
  const removeFromDatabase = (removedMember) => {
    console.log(removedMember);
  };
  const handleChange = (event, newValue: User[], reason: string) => {
    if (reason === "removeOption") {
      const removedMember = assignee.find(
        (member) => !newValue.includes(member)
      );
      removeFromDatabase(removedMember);
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
      value={filteredOptions}
      onChange={handleChange}
      id="assignee-autocomplete"
      options={users}
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
