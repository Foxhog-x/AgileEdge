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
export default function CreateTaskColumn({ open, setOpen }) {
  const axiosInstance = useCustomAxios();
  const { addToast } = useToastStore();
  const { boardId } = useManageIdStore();
  const [createTaskColumn, setCreateTaskColumn] = React.useState("");

  const handleClose = () => {
    setOpen(false);
    setCreateTaskColumn("");
    console.log(boardId);
  };

  const handleSubmit = async (e) => {
    if (!createTaskColumn.trim()) {
      addToast("Project name cannot be empty", "error");
      return;
    }
    e.preventDefault();
    const data = {
      boardId: boardId,
      columnName: createTaskColumn,
    };
    try {
      await axiosInstance.post(urls.addColumn, data);
      addToast("Successfully Created", "success");
      setCreateTaskColumn("");
      setOpen(false);
    } catch (error) {
      console.log(error);
      addToast(error.message, "error");
      setCreateTaskColumn("");
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Create Task Column</DialogTitle>
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
      </Dialog>
    </React.Fragment>
  );
}
