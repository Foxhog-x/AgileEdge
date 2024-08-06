import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CardOutline } from "../card/CardOutline";

export default function Column() {
  return (
    <div className="md:flex gap-2 p-4 ">
      <div className="flex flex-col p-4 min-h-full min-w-80 max-w-96 gap-1">
        <div className="flex justify-between items-center">
          <span>Todo</span>
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>
        <CardOutline />
      </div>
    </div>
  );
}
