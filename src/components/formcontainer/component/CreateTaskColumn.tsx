import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useCustomAxios from "../../../services/apiServices/customAxios/customAxios";
import { useToastStore } from "../../../store/useToastStore";
import { urls } from "../../../services/apiServices/urls/urls";
import { useManageIdStore } from "../../../store/useManageIdStore";
import useBackdropStore from "../../../store/useBackdropStore";
import useRefetchProjectDetails from "../../../store/useRefetchProjectDetails";
interface CreateTaskColumnProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function CreateTaskColumn({
  open,
  setOpen,
}: CreateTaskColumnProps) {
  const axiosInstance = useCustomAxios();
  const { addToast } = useToastStore();
  const { board_Id } = useManageIdStore();
  const [createTaskColumn, setCreateTaskColumn] = React.useState("");
  const { showBackdrop, hideBackdrop } = useBackdropStore();
  const { toggleRefetch } = useRefetchProjectDetails();
  const handleClose = () => {
    setOpen(false);
    setCreateTaskColumn("");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    if (!createTaskColumn.trim()) {
      addToast("Project name cannot be empty", "error");
      return;
    }
    e.preventDefault();
    const data = {
      boardId: board_Id,
      columnName: createTaskColumn,
    };
    try {
      showBackdrop();
      await axiosInstance.post(urls.addColumn, data);
      toggleRefetch();
      hideBackdrop();
      setCreateTaskColumn("");
      setOpen(false);
      addToast("Successfully Created", "success");
    } catch (error) {
      console.log(error);
      hideBackdrop();
      addToast(" error while creating column", "error");
      setCreateTaskColumn("");
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Create Task Column</DialogTitle>
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
              required
              fullWidth
              sx={{ mt: 2 }}
              name="createTaskColumn"
              label={"Create Task Column"}
              variant="outlined"
              onChange={(e) => setCreateTaskColumn(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ padding: 2 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
