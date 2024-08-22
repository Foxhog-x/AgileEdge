import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { removeTokenData } from "../services/localStorage/authUtil";
import { useNavigate } from "react-router-dom";
import useCustomAxios from "../services/apiServices/customAxios/customAxios";
import { urls } from "../services/apiServices/urls/urls";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Logout"];

export const ProfileImage = () => {
  const axiosInstance = useCustomAxios();
  const navigate = useNavigate();
  const [profileAvatar, setProfileAvatar] = useState("");
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const fetchUserIcon = async () => {
    try {
      const response = await axiosInstance.get(urls.getUserAvatar);
      const data = response.data.result;
      setProfileAvatar(data[0]?.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserIcon();
  }, []);

  const handleCloseUserMenu = (data) => {
    setAnchorElUser(null);
    switch (data) {
      case "Logout":
        removeTokenData();
        navigate("/login");
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
              alt="Remy Sharp"
              src={`data:image/jpeg;base64,${profileAvatar}`}
            />
          </IconButton>
          <h2 className="text-2xl text-black">Onkar</h2>
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
