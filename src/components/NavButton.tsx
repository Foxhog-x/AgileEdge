import { Button } from "@mui/material";
import ProjectsNavLinks from "./ProjectsNavLinks";
import { Link, useLocation } from "react-router-dom";
import { useManageIdStore } from "../store/useManageIdStore";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
export default function NavButton() {
  const location = useLocation();
  const { removeBoardId } = useManageIdStore();
  return (
    <div className="flex flex-col flex-1 px-2">
      <ul className="flex flex-col flex-1 gap-3 p-3">
        <li>
          <Button
            component={Link}
            to="/"
            startIcon={<HomeOutlinedIcon />}
            fullWidth
            onClick={() => removeBoardId("")}
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
            Homepage
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
        <ProjectsNavLinks />
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
