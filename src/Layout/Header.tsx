import { Avatar, Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useEffect, useState } from "react";
import { getTokenData } from "../services/localStorage/authUtil";
import { io } from "socket.io-client";
import { urls } from "../services/apiServices/urls/urls";
import useCustomAxios from "../services/apiServices/customAxios/customAxios";
import { useOnlineStore } from "../store/useOnlineUserStore";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { HandymanOutlined } from "@mui/icons-material";
import CreateTaskColumn from "../components/formcontainer/component/CreateTaskColumn";
export default function Header({ avatars }) {
  const [open, setOpen] = useState(false);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const { addOnline, onlineUser } = useOnlineStore();
  const [localOnlineUsers, setLocalOnlineUsers] = useState(onlineUser || []);
  console.log(localOnlineUsers, "local");
  useEffect(() => {
    const token = getTokenData();
    const newsocket = io("http://localhost:8000/homepage", {
      query: { token },
    });
    newsocket.emit("userLogin", token);
    newsocket.on("userUpdate", (users) => {
      setLocalOnlineUsers(users);
      addOnline(users);
    });
    return () => {
      newsocket.disconnect();
    };
  }, [addOnline]);
  const HandleFunction = () => {
    setOpen(true);
  };
  return (
    <div className="md:flex justify-between p-4 items-center px-6">
      <div className="flex items-center gap-4">
        <h1>alfa</h1>
        <h1>12</h1>
      </div>
      <div className="flex gap-8">
        <div className="flex items-center gap-1">
          {localOnlineUsers.map((user, index) => {
            return avatars.map((userAvatar) => {
              if (userAvatar.member_id === user.member_id) {
                return (
                  <StyledBadge
                    key={index}
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      alt="pic not available"
                      src={`data:image/jpeg;base64,${userAvatar?.avatar}`}
                    >
                      {user.member_name.slice(0, 2).toLowerCase()}
                    </Avatar>
                  </StyledBadge>
                );
              }
            });
          })}
        </div>
        <div className="divider border"></div>
        {/* <IconButton>
          <FilterAltIcon />
        </IconButton> */}

        <div className="flex gap-2">
          <Button
            startIcon={<AddCircleOutlineIcon />}
            variant="contained"
            onClick={HandleFunction}
          >
            Task
          </Button>
          <span>
            <IconButton>
              <FilterAltOutlinedIcon />
            </IconButton>
          </span>
          <CreateTaskColumn open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
}
