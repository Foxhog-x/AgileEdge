import { Button, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import useCustomAxios from "../services/apiServices/customAxios/customAxios";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { useEffect } from "react";
import { urls } from "../services/apiServices/urls/urls";
export default function ProjectsNavLinks() {
  const axiosInstance = useCustomAxios();

  useEffect(() => {
    const getallEvent = async () => {
      try {
        const response = await axiosInstance.get(urls.getEvents);

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getallEvent();
  }, []);

  return (
    <div>
      <span className="flex justify-between items-center mb-2 pr-2 ">
        Projects
        <IconButton>
          <AddIcon />
        </IconButton>
      </span>
      <ul>
        {["alfa", "omega"].map((name, index) => {
          return (
            <li key={index}>
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
                <Link to={`/project/${name}`}>{name}</Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
