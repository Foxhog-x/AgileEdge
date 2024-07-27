import { Button, Switch } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ProjectsNavLinks from "./ProjectsNavLinks";
import TeamsNavLinks from "./TeamsNavLinks";

export default function NavButton() {
  return (
    <div className="flex flex-col flex-1 px-6">
      <ul className="flex flex-col flex-1 gap-3 p-3">
        <li>
          <Button
            startIcon={<HomeIcon />}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              gap: 1,
              height: 30,
              mb: 1,
              "&:hover": {
                backgroundColor: "secondary.main",
              },
            }}
          >
            Home
          </Button>
        </li>
        <li>
          <Button
            startIcon={<HomeIcon />}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              height: 30,
              gap: 1,
              mb: 1,
              "&:hover": {
                backgroundColor: "secondary.main",
              },
            }}
          >
            Tasks
          </Button>
        </li>
        <ProjectsNavLinks />
        <TeamsNavLinks />
      </ul>
      <div className="flex-shrink-0 p-3">
        <div className="flex flex-col">
          <div className="flex flex-1 py-6 justify-center items-center gap-1 ">
            <Switch size="small" defaultChecked />
            <span>Administration</span>
          </div>
        </div>
      </div>
    </div>
  );
}
