import { Button } from "@mui/material";
import ProjectsNavLinks from "./ProjectsNavLinks";
import { Link, useLocation } from "react-router-dom";
import { useManageIdStore } from "../store/useManageIdStore";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
interface NavButtonProps {
  setShowSidebar: (value: boolean) => void;
}
export default function NavButton({ setShowSidebar }: NavButtonProps) {
  const location = useLocation();
  const { removeBoardId } = useManageIdStore();
  const handleClickDashboard = () => {
    removeBoardId("");
    setShowSidebar(false);
  };
  return (
    <div className="flex flex-col flex-1 px-2">
      <ul className="flex flex-col flex-1 gap-3 p-3">
        <li>
          <Button
            component={Link}
            to="/dashboard"
            startIcon={<HomeOutlinedIcon />}
            fullWidth
            onClick={() => handleClickDashboard()}
            sx={{
              justifyContent: "flex-start",
              gap: 1,
              height: 30,
              mb: 1,
              "&:hover": {
                backgroundColor: "secondary.main",
              },
              backgroundColor:
                location.pathname === "/" ? "secondary.main" : "",
            }}
          >
            Dashboard
          </Button>
        </li>
        {/* <li>
          <Button
            component={Link}
            to={"/mytasks/"}
            startIcon={<TaskAltOutlinedIcon />}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              height: 30,
              gap: 1,
              mb: 1,
              "&:hover": {
                backgroundColor: "secondary.main",
              },
              backgroundColor:
                location.pathname === "/mytasks" ? "secondary.main" : "",
            }}
          >
            My Tasks
          </Button>
        </li> */}
        <li>
          <Button
            component={Link}
            to={"/calendar"}
            startIcon={<ScheduleIcon />}
            fullWidth
            onClick={() => setShowSidebar(false)}
            sx={{
              justifyContent: "flex-start",
              height: 30,
              gap: 1,
              mb: 1,
              "&:hover": {
                backgroundColor: "secondary.main",
              },
              backgroundColor:
                location.pathname === "/calendar" ? "secondary.main" : "",
            }}
          >
            Schedule
          </Button>
        </li>
        <ProjectsNavLinks setShowSidebar={setShowSidebar} />
        {/* <TeamsNavLinks /> */}
      </ul>
      {/* <div className="flex-shrink-0 p-3"> ///futrue upgradation
        <div className="flex flex-col">
          <div className="flex flex-1 py-6 justify-center items-center gap-1 ">
            <Switch size="small" defaultChecked />
            <span>Administration</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
