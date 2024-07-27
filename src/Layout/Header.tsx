import { Avatar, Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
export default function Header() {
  return (
    <div className="flex justify-between p-4 items-center px-6">
      <div className="flex items-center gap-4">
        <h1>alfa</h1>
        <h1>12</h1>
      </div>
      <div className="flex gap-8">
        <div className="flex items-center gap-1">
          <Avatar sx={{ height: 30, width: 30 }} />
          <Avatar sx={{ height: 30, width: 30 }} />
        </div>
        <div className="divider border"></div>
        {/* <IconButton>
          <FilterAltIcon />
        </IconButton> */}

        <div className="flex gap-2">
          <Button startIcon={<AddCircleOutlineIcon />} variant="contained">
            Task
          </Button>
          <IconButton>
            <FilterAltOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
