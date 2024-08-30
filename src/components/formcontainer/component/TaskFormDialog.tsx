import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTaskFormStore } from "../../../store/useTaskFormStore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import AssigneUserSelect from "../../assign/AssigneUserSelect";
import "dayjs/locale/en-gb";
import useCustomAxios from "../../../services/apiServices/customAxios/customAxios";
import { useToastStore } from "../../../store/useToastStore";
import { useParams } from "react-router-dom";
import { urls } from "../../../services/apiServices/urls/urls";
import { date } from "zod";
import AssigneeUserNotSelect from "../../assign/AssigneUserNotSelected";
export const TaskFormDialog = ({ fetchProjectDetails }) => {
  const { boardId } = useParams<{ boardId: string }>();
  const axiosInstance = useCustomAxios();
  const { addToast } = useToastStore();
  const { taskDialog, columnId, columnName, closeTaskDialog } =
    useTaskFormStore();
  const [priority, setPriority] = React.useState("");
  const [taskTitle, setTaskTitle] = React.useState("");
  const [endDate, setEndDate] = React.useState(null);
  const [assignee_id, setAssignee_id] = React.useState([]);

  const handleClose = () => {
    closeTaskDialog();
  };
  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskTitle || taskTitle.trim() === "") {
      addToast("no task title", "error");
      return;
    }
    if (endDate === null) {
      addToast("No endDate added", "info");
    }
    const formattedStartDate = new Date().toISOString().split("T")[0];

    try {
      await axiosInstance.post(urls.createCard, {
        data: {
          columnId: columnId,
          cardName: taskTitle,
          endDate: endDate,
          startDate: formattedStartDate,
          cardPriority: priority,
          assigneeArray: assignee_id,
        },
      });
      addToast("Successfully Created", "success");
      fetchProjectDetails(boardId);
      setTaskTitle("");
      setAssignee_id([]);
      closeTaskDialog();
    } catch (error) {
      console.log(error);
      addToast(error, "error");
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={taskDialog}
        onClose={handleClose}
        fullWidth={true}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;

            handleClose();
          },
        }}
      >
        <DialogTitle>{columnName}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            padding: 4,
          }}
        >
          <TextField
            autoFocus
            required
            margin="dense"
            id="task"
            name="TaskName"
            label="Task Title"
            type="text"
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTaskTitle(e.target.value);
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              label="Priority"
              onChange={handleChange}
            >
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Low"}>Low</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              format="DD-MM-YYYY"
              value={endDate ? dayjs(endDate) : null} // Ensure value is a Dayjs object
              onChange={(date: Dayjs | null) => {
                if (date && dayjs(date).isValid()) {
                  const formattedDate = dayjs(date).format("YYYY-MM-DD"); //
                  setEndDate(formattedDate);
                }
              }}
            />
          </LocalizationProvider>
          <AssigneeUserNotSelect setAssignee_id={setAssignee_id} />
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
