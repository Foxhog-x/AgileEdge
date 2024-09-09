import { Avatar, Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
import CustomSelect from "../components/CustomSelect";

const baseDomain = import.meta.env.VITE_BASE_URL;
interface Avatar {
  member_id: number;
  avatar: string;
}

interface HeaderProps {
  avatars: Avatar[];
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

export default function Header({
  avatars,
  setShowSidebar,
  showSidebar,
  setSelectedOption,
  selectedOption,
}: HeaderProps) {
  const location = useLocation();
  const [showAll, setShowAll] = useState(false);
  const [applyprojectName, setApplyProjectName] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [FilterHide, setFilterHide] = useState(false);

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
  console.log(selectedOption);
  const { addOnline, onlineUser } = useOnlineStore();
  const [localOnlineUsers, setLocalOnlineUsers] = useState(onlineUser || []);
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

    if (path === "/" || path === "/dashboard") {
      setFilterHide(true);
      setApplyProjectName("Dashboard");
    }
    if (path === "/" || path === "/calendar") {
      setApplyProjectName("Schedule");
      setFilterHide(true);
    } else {
      const match = path.match(/^\/project\/([^\/]+)\/\d+$/);

      if (match) {
        const projectName = match[1];
        setApplyProjectName(projectName);
        setFilterHide(false);
      }
    }
  }, [location.pathname]);
  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <div className="md:flex justify-between items-center p-4">
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

        {FilterHide ? (
          ""
        ) : (
          <CustomSelect
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        )}

        <div className="divider border"></div>
        {/* <IconButton>
        
        </IconButton> */}

        <div className="flex gap-3">
          {FilterHide ? (
            ""
          ) : (
            <Button
              startIcon={<AddCircleOutlineIcon />}
              variant="contained"
              onClick={HandleFunction}
            >
              Task
            </Button>
          )}

          <CreateTaskColumn open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
}
