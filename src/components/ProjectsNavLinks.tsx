import { Button, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
export default function ProjectsNavLinks() {
  return (
    <div>
      <span className="flex justify-between items-center mb-2 pr-2 ">
        Projects
        <IconButton>
          <AddIcon />
        </IconButton>
      </span>

      <li>
        <Button
          startIcon={<HomeIcon />}
          fullWidth
          sx={{
            justifyContent: "flex-start",
            height: 30,
            gap: 1,
            padding: 1,
            mb: 1,

            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
        >
          Alfa
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
            padding: 1,
            mb: 1,

            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
        >
          Ignite
        </Button>
      </li>
    </div>
  );
}
