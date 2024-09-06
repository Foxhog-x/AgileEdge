import { Avatar, Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useEffect, useState } from "react";
import { getTokenData } from "../services/localStorage/authUtil";
import { io } from "socket.io-client";
import { useOnlineStore } from "../store/useOnlineUserStore";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import CreateTaskColumn from "../components/formcontainer/component/CreateTaskColumn";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router-dom";

const baseDomain = import.meta.env.VITE_BASE_URL;
interface Avatar {
  member_id: number;
  avatar: string;
}

interface HeaderProps {
  avatars: Avatar[];
  setShowSidebar: (value: boolean) => void;
}

export default function Header({ avatars, setShowSidebar }: HeaderProps) {
  const location = useLocation();

  const [showAll, setShowAll] = useState(false);
  const [applyprojectName, setApplyProjectName] = useState("");
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
  console.log(localOnlineUsers, "localhost");
  useEffect(() => {
    const token = getTokenData();
    const newsocket = io(`${baseDomain}/homepage`, {
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

  const visibleUsers = showAll
    ? localOnlineUsers
    : localOnlineUsers.slice(0, 5);

  useEffect(() => {
    const path = location.pathname;

    // Check if the pathname is one of the specific routes
    if (path === "/" || path === "/dashboard") {
      setApplyProjectName("Dashboard");
    }
    if (path === "/" || path === "/calendar") {
      setApplyProjectName("Schedule");
    } else {
      // Match pathname format /project/<projectName>/<someId>
      const match = path.match(/^\/project\/([^\/]+)\/\d+$/);

      if (match) {
        // Extract projectName from the matched groups
        const projectName = match[1];
        setApplyProjectName(projectName);
      }
      // Otherwise, keep the last valid project name (no update needed)
    }
  }, [location.pathname]);
  const handleSidebar = () => {
    setShowSidebar(true);
  };
  return (
    <div className="md:flex justify-between items-center p-6">
      <div className="flex justify-start gap-1 items-center md:flex">
        <div className="md:hidden">
          <IconButton onClick={handleSidebar}>
            <MenuIcon fontSize={"large"} />
          </IconButton>
        </div>
        <h1 className="md:text-4xl sm:text-2xl">{applyprojectName} </h1>
      </div>

      <div className="flex justify-between md:flex gap-4">
        <div className="md:flex items-center gap-1 flex-row-reverse">
          {visibleUsers.map((user) => {
            return avatars.map((userAvatar) => {
              if (userAvatar.member_id === user.member_id) {
                return (
                  <StyledBadge
                    key={user.member_id}
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
              return null;
            });
          })}

          {localOnlineUsers.length > 5 && !showAll && (
            <IconButton onClick={() => setShowAll(true)} size="small">
              <AddIcon />
              {localOnlineUsers.length - 5} more
            </IconButton>
          )}
        </div>
        <div className="divider border"></div>
        {/* <IconButton>
          <FilterAltIcon />
        </IconButton> */}

        <div className="flex gap-3">
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
