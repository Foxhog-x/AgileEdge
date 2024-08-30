import { Button, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
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
import { useEffect, useState } from "react";
import EditProjectForm from "./formcontainer/component/EditProjectForm";
import { useManageIdStore } from "../store/useManageIdStore";
export default function ProjectsNavLinks() {
  const { projects, setProjects, refresh, setRefresh } = useFetchProjects();
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const axiosInstance = useCustomAxios();
  const { board_Id, saveBoardId } = useManageIdStore();
  const { openProjectDialog } = useProjectDialog();
  const [editProject, setEditProject] = useState("");
  const [open, setOpen] = useState(false);
  console.log(projects);
  const redirectRoute = (project_Id) => {
    const routes = projects.filter((route) => route.project_id != project_Id);
    setProjects(routes);
    if (boardId === board_Id) {
      const nextProject = routes[0];
      navigate(`/project/${nextProject?.board_id}`, { replace: true });
    } else {
      navigate("/", { replace: true });
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
  const handleEdit = (id, currentName) => {
    saveBoardId(id);
    setEditProject(currentName);
    setOpen(true);
  };
  const handleEditSubmit = async () => {
    const project_Id = board_Id; // remember to me that here we actually deal with board directly because board and project are the same
    const newProjectName = editProject;
    console.log(project_Id, newProjectName);
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
      <span className="flex justify-between items-center mb-2 pr-2 ">
        Projects
        <IconButton onClick={() => openProjectDialog()}>
          <AddIcon />
        </IconButton>
      </span>
      <ul>
        {projects.map((project, index) => {
          return (
            <div className="flex items-center mr-2" key={index}>
              <li key={index} className="flex-1 flex">
                <Button
                  component={Link}
                  to={`/project/${project.board_id}`}
                  startIcon={<HomeIcon />}
                  fullWidth
                  style={{}}
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
