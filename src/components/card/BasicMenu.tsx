import * as React from "react";
import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { useToastStore } from "../../store/useToastStore";
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

interface SortData {
  column_id: string;
  column_name: string;
  column_position: number | string;
  items: CardData[];
}
interface Props {
  card_Id: string;
  sortedData: SortData[];
  setSortedData: (data: SortData[]) => void;
  column_id: string;
}
export default function BasicMenu({
  card_Id,
  sortedData,
  setSortedData,
}: Props) {
  const axiosInstance = useCustomAxios();
  const { addToast } = useToastStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (card_Id: String) => {
    setAnchorEl(null);
    const updatedSortedData = sortedData.map((column) => ({
      ...column,
      items: column.items.filter((card: CardData) => card.card_id !== card_Id),
    }));
    setSortedData(updatedSortedData);
    try {
      await axiosInstance.delete(urls.deleteCard, { data: { card_Id } });
      addToast("Card Delete successfully", "success");
    } catch (error) {
      console.log(error);
      addToast("ERROR OCCURED", "error");
    }
  };
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ position: "relative", bottom: 10, left: 2 }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleDelete(card_Id)}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
