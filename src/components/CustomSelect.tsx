import React, { useEffect, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Box,
} from "@mui/material";
import { useManageIdStore } from "../store/useManageIdStore";

interface CustomSelectProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}
const CustomSelect = ({
  selectedOption,
  setSelectedOption,
}: CustomSelectProps) => {
  const { saveFilterBy } = useManageIdStore();
  const [customValue, setCustomValue] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleChange = (event: any) => {
    const value = event.target.value;
    localStorage.setItem("filterBy", value);
    saveFilterBy(value);
    setSelectedOption(value);
    if (value === "other") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setCustomValue("");
    }
  };

  const handleCustomValueChange = (event: any) => {
    setCustomValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="custom-select-label">
        <FilterAltOutlinedIcon />
        Select Filter
      </InputLabel>
      <Select
        labelId="custom-select-label"
        id="custom-select"
        value={selectedOption}
        onChange={handleChange}
        label="Select Option"
      >
        <MenuItem value="All tasks">All Tasks</MenuItem>
        <MenuItem value="My tasks">My tasks</MenuItem>
        <MenuItem value="High priority">High priority</MenuItem>
        <MenuItem value="Medium priority">Medium priority</MenuItem>
        <MenuItem value="Low priority">Low priority</MenuItem>
        {/* <MenuItem value="">Filter by End_date</MenuItem> */}
      </Select>
      {showCustomInput && (
        <Box mt={2}>
          <TextField
            label="Specify Other"
            variant="outlined"
            fullWidth
            value={customValue}
            onChange={handleCustomValueChange}
          />
        </Box>
      )}
    </FormControl>
  );
};

export default CustomSelect;
