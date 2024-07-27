import { IconButton } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

export default function Column() {
  return (
    <div className="md:flex gap-2 p-4 ">
      <div className="flex flex-col border p-4 min-w-96">
        <div className="flex justify-between items-center">
          <span>Todo</span>
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col border p-4 min-w-96">
        <div className="flex justify-between items-center">
          <span>Doing</span>
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
