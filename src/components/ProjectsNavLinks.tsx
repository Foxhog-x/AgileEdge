import { Button, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
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
export default function ProjectsNavLinks() {
  const { projects, refresh, setRefresh } = useFetchProjects();
  const { addToast } = useToastStore();
  const axiosInstance = useCustomAxios();
  const { projectId, saveProjectId } = useManageIdStore();
  const { openProjectDialog } = useProjectDialog();
  const [editProject, setEditProject] = useState("");
  const [open, setOpen] = useState(false);
  const handleDeleteProject = async (project_Id: number) => {
    const confirmation = confirm("Do you really want to delete this");

    if (confirmation) {
      try {
        await axiosInstance.delete(urls.deleteProject, {
          data: { project_Id },
        });
        addToast("Deleted", "success");
        setRefresh(!refresh);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  const handleEdit = (id, currentName) => {
    saveProjectId(id);
    setEditProject(currentName);
    setOpen(true);
  };
  const handleEditSubmit = async () => {
    const project_Id = projectId;
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
                  startIcon={<HomeIcon />}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",

                    height: 30,
                    gap: 1,
                    padding: 1,
                    mb: 1,

                    alignItems: "center",

                    "&:hover": {
                      backgroundColor: "secondary.main",
                    },
                  }}
                >
                  <Link to={`/project/${project.project_id}`}>
                    {project?.name}
                  </Link>
                </Button>
                <>
                  <IconButton
                    className="relative bottom-1.5"
                    onClick={() => handleEdit(project.project_id, project.name)}
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
