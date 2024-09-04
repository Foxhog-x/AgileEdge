import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { removeTokenData } from "../services/localStorage/authUtil";
import { useNavigate } from "react-router-dom";
import useCustomAxios from "../services/apiServices/customAxios/customAxios";
import { urls } from "../services/apiServices/urls/urls";
import { useManageIdStore } from "../store/useManageIdStore";
import profileImageOnline from "../assets/profileimage.png";
import useBackdropStore from "../store/useBackdropStore";

const settings = ["My-profile", "Logout"];

interface ProfileAvatar {
  avatar: string;
  member_id: number;
  member_name: string;
}

export const ProfileImage = () => {
  const axiosInstance = useCustomAxios();
  const navigate = useNavigate();
  const { showBackdrop, hideBackdrop } = useBackdropStore();
  const [currentDetails, setCurrentDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    avatar: "",
  });

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const fetchUserIcon = async () => {
    try {
      showBackdrop();
      const response = await axiosInstance.get(urls.getUserProfile);
      const data = response.data.result;
      setCurrentDetails((prev) => {
        return {
          ...prev,
          avatar: data[0]?.avatar,
          firstName: data[0]?.first_name,
          lastName: data[0]?.last_name,
          email: data[0]?.email,
          address: data[0]?.address,
        };
      });
      hideBackdrop();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserIcon();
  }, []);

  if (!currentDetails) {
    return <>Loading</>;
  }

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    switch (setting) {
      case "Logout":
        removeTokenData();
        navigate("/login");
        break;
      case "My-profile":
        navigate("/userprofile", { state: currentDetails });
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ flexGrow: 0, display: "flex", padding: 3 }}>
      <Tooltip title="Open settings">
        <div className="flex gap-2 items-center">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt={currentDetails?.firstName || "Guest"}
              src={`data:image/jpeg;base64,${currentDetails.avatar}`}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="h2"
            className="text-2xl text-black"
          >
            {currentDetails.firstName || "Guest"}
          </Typography>
        </div>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
