import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useCustomAxios from "../../../services/apiServices/customAxios/customAxios";
import { useProjectDialog } from "../../../store/useProjectDialog";
import { useToastStore } from "../../../store/useToastStore";
import { urls } from "../../../services/apiServices/urls/urls";
import useBackdropStore from "../../../store/useBackdropStore";
interface CreateProjectFormProps {
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}
export default function CreateProjectForm({
  refresh,
  setRefresh,
}: CreateProjectFormProps) {
  const axiosInstance = useCustomAxios();
  const { addToast } = useToastStore();
  const { projectDialog, closeProjectDialog } = useProjectDialog();
  const [createBoard, setCreateBoard] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { showBackdrop, hideBackdrop } = useBackdropStore();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    if (!createBoard.trim()) {
      addToast("Project name cannot be empty", "error");
      return;
    }
    e.preventDefault();
    const data = {
      projectName: createBoard,
      projectDescription: description,
    };
    try {
      showBackdrop();
      await axiosInstance.post(urls.createProject, data);
      setRefresh(!refresh);
      hideBackdrop();
      addToast("Successfully Created", "success");
    } catch (error) {
      hideBackdrop();
      console.log(error);
      addToast("error while creating project", "error");
    }
    setCreateBoard("");
    setDescription("");
    closeProjectDialog();
  };

  return (
    <React.Fragment>
      <Dialog
        open={projectDialog}
        onClose={closeProjectDialog}
        fullWidth={true}
      >
        <DialogTitle>Create Project</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              padding: 2,
            }}
          >
            <TextField
              autoFocus
              required
              fullWidth
              sx={{ mt: 2 }}
              name="createProject"
              label={"Create Project"}
              variant="outlined"
              onChange={(e) => setCreateBoard(e.target.value)}
            />
            <TextField
              className="w-full text-sm font-normal font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
              aria-label="empty textarea"
              placeholder="Description.... Optional"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button onClick={closeProjectDialog}>Cancel</Button>
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
