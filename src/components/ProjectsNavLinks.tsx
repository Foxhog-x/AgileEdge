import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate, useParams } from "react-router-dom";
import useCustomAxios from "../services/apiServices/customAxios/customAxios";
import { urls } from "../services/apiServices/urls/urls";
import { useProjectDialog } from "../store/useProjectDialog";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import useFetchProjects from "../hooks/projectCustomhook/usefetchProjects";
import CreateProjectForm from "./formcontainer/component/CreateProjectForm";
import { useToastStore } from "../store/useToastStore";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import EditProjectForm from "./formcontainer/component/EditProjectForm";
import { useManageIdStore } from "../store/useManageIdStore";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";

interface ProjectNavProps {
  setShowSidebar: (value: boolean) => void;
}
export default function ProjectsNavLinks({ setShowSidebar }: ProjectNavProps) {
  const { projects, setProjects, refresh, setRefresh } = useFetchProjects();
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const axiosInstance = useCustomAxios();
  const { board_Id, saveBoardId, saveProjectName } = useManageIdStore();
  const { openProjectDialog } = useProjectDialog();
  const [editProject, setEditProject] = useState("");
  const [open, setOpen] = useState(false);

  const redirectRoute = (project_Id: String | number) => {
    const routes = projects.filter((route) => route.project_id != project_Id);
    setProjects(routes);
    if (routes.length > 0) {
      if (boardId === board_Id) {
        const nextProject = routes[0];
        navigate(`/project/${nextProject?.board_id}`, { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  const handleDeleteProject = async (project_Id: number) => {
    const confirmation = confirm("Do you really want to delete this");

    if (confirmation) {
      try {
        await axiosInstance.delete(urls.deleteProject, {
          data: { project_Id },
        });
        addToast("Deleted", "success");
        redirectRoute(project_Id);
        setRefresh(!refresh);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  const handleEdit = (id: string, currentName: string) => {
    saveBoardId(id);
    setEditProject(currentName);
    setOpen(true);
  };
  const handleEditSubmit = async () => {
    const project_Id = board_Id; // remember to me that here we actually deal with board directly because board and project are the same
    const newProjectName = editProject;

    try {
      await axiosInstance.put(urls.editProject, {
        project_Id,
        newProjectName,
      });
      addToast("Successfully Edited", "success");
      setRefresh(!refresh);
      setOpen(false);
    } catch (error) {
      console.log(error);
      addToast("ERROR", "error");
    }
  };
  const handleProject = (projectName: string) => {
    saveProjectName(projectName);
    setShowSidebar(false);
  };
  return (
    <div>
      <CreateProjectForm refresh={refresh} setRefresh={setRefresh} />
      <EditProjectForm
        editProject={editProject}
        setEditProject={setEditProject}
        setOpen={setOpen}
        open={open}
        handleEditSubmit={handleEditSubmit}
      />
      <span className="flex justify-between items-center mb-2 min-w-56 pr-2 ">
        Projects
        <IconButton onClick={() => openProjectDialog()}>
          <AddIcon />
        </IconButton>
      </span>
      <ul>
        {projects.map((project: any, index) => {
          return (
            <div className="flex items-center mr-2" key={index}>
              <li key={index} className="flex-1 flex">
                <Button
                  component={Link}
                  to={`/project/${project.name}/${project.board_id}`}
                  startIcon={<AutoAwesomeMosaicOutlinedIcon />}
                  fullWidth
                  onClick={() => handleProject(project.name)}
                  sx={{
                    justifyContent: "flex-start",
                    gap: 1,
                    padding: 1,
                    mb: 1,
                    alignItems: "center",

                    "&:hover": {
                      backgroundColor: "secondary.main",
                    },
                    display: "flex",
                    backgroundColor:
                      project?.board_id == board_Id ? "secondary.main" : "",
                  }}
                >
                  <div>{project?.name}</div>
                </Button>
                <>
                  <IconButton
                    className="relative bottom-1.5"
                    onClick={() => handleEdit(project.board_id, project.name)}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                </>
              </li>
              <IconButton
                className="relative bottom-1.5"
                onClick={() => handleDeleteProject(project.project_id)}
              >
                <DeleteForeverOutlinedIcon />
              </IconButton>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
