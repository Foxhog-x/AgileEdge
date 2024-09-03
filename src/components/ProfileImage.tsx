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
const settings = ["My-profile", "Logout"];
interface ProfileAvatar {
  avatar: string;
  member_id: number;
  member_name: string;
}
export const ProfileImage = () => {
  const axiosInstance = useCustomAxios();
  const navigate = useNavigate();
  const [profileAvatar, setProfileAvatar] = useState<String | null | undefined>(
    null
  );
  const [profileName, setProfileName] = useState<String | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { saveMemberId } = useManageIdStore();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const fetchUserIcon = async () => {
    try {
      const response = await axiosInstance.get(urls.getUserProfile);
      const data = response.data.result;
      console.log(data, "data");
      saveMemberId(data[0]?.member_id);
      setProfileAvatar(data[0]?.avatar);

      setProfileName(data[0]?.first_name);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(saveMemberId, profileAvatar, "pppp");
  useEffect(() => {
    fetchUserIcon();
  }, []);

  const handleCloseUserMenu = (data: String) => {
    setAnchorElUser(null);
    switch (data) {
      case "Logout":
        removeTokenData();
        navigate("/login");
        break;
      case "My-profile":
        navigate("/userprofile");
        break;
      default:
        break;
    }
  };
  const base64Pattern = /^[A-Za-z0-9+/]+[=]{0,2}$/;

  return (
    <Box sx={{ flexGrow: 0, display: "flex", padding: 3 }}>
      <Tooltip title="Open settings">
        <div className="flex gap-2 items-center">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="Guest"
              src={`data:image/jpeg;base64,${profileAvatar}`}
            />
          </IconButton>
          <h2 className="text-2xl text-black">{profileName}</h2>
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
        onClose={handleCloseUserMenu}
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
