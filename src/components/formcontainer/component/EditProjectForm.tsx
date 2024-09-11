import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useBackdropStore from "../../../store/useBackdropStore";
interface EditProjectFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editProject: string;
  setEditProject: (value: string) => void;
  handleEditSubmit: () => void;
}
export default function EditProjectForm({
  setOpen,
  open,
  editProject,
  setEditProject,
  handleEditSubmit,
}: EditProjectFormProps) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditProject(e.target.value);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Create Project</DialogTitle>
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
            value={editProject}
            name="createProject"
            label={"Create Project"}
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit" onClick={handleEditSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
