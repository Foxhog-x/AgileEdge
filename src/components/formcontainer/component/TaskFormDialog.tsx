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
import dayjs from "dayjs";
import AssigneUserSelect from "../../assign/AssigneUserSelect";
import "dayjs/locale/en-gb";
import useCustomAxios from "../../../services/apiServices/customAxios/customAxios";
import { urls } from "../../../services/apiServices/urls/urls";
import { useToastStore } from "../../../store/useToastStore";
export const TaskFormDialog = () => {
  const axiosInstance = useCustomAxios();
  const { addToast } = useToastStore();
  const { taskDialog, columnId, columnName, closeTaskDialog } =
    useTaskFormStore();
  const [priority, setPriority] = React.useState("");
  const [taskFormCard, setTaskFormCard] = React.useState({
    taskTitle: "",
    priority: "",
    endDate: "",
    assignee_id: [],
  });
  const handleClose = () => {
    closeTaskDialog();
  };
  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
    setTaskFormCard((prev) => {
      return { ...prev, priority: event.target.value as string };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedEndDate = dayjs(taskFormCard.endDate).format("YYYY-MM-DD");
    const formattedStartDate = dayjs().format("YYYY-MM-DD");
    console.log(taskFormCard);
    try {
      await axiosInstance.post(urls.createCard, {
        data: {
          columnId: columnId,
          cardName: taskFormCard.taskTitle,
          endDate: formattedEndDate,
          startDate: formattedStartDate,
          cardPriority: taskFormCard.priority,
        },
      });
      addToast("Successfully Created", "success");
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
            console.log(email);
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
              setTaskFormCard((prev) => {
                return { ...prev, taskTitle: e.target.value };
              });
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
              defaultValue={dayjs()}
              format="DD-MM-YYYY"
              onChange={(date: Date | any) => {
                setTaskFormCard((prev) => {
                  return {
                    ...prev,
                    endDate: date,
                  };
                });
              }}
            />
          </LocalizationProvider>
          <AssigneUserSelect setCardDataAssign={setTaskFormCard} />
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