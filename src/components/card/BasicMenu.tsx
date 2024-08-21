import * as React from "react";
import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { removeTokenData } from "../../services/localStorage/authUtil";
import { useNavigate } from "react-router-dom";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { useToastStore } from "../../store/useToastStore";
export default function BasicMenu({
  card_Id,
  sortedData,
  setSortedData,
  column_id,
}) {
  const axiosInstance = useCustomAxios();
  const { addToast } = useToastStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (card_Id) => {
    setAnchorEl(null);
    const updatedSortedData = sortedData.map((column) => ({
      ...column,
      items: column.items.filter((card) => card.card_id !== card_Id),
    }));
    setSortedData(updatedSortedData);
    try {
      await axiosInstance.delete(urls.deleteCard, { data: { card_Id } });
      addToast("Card Delete successfully", "success");
    } catch (error) {
      console.log(error);
      addToast(error.message, "error");
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
