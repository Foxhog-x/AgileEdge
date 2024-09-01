import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import Subtasks from "../subtask/Subtasks";
import { AddCircleOutline } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { useToastStore } from "../../store/useToastStore";
import useRefetchProgessStore from "../../store/useRefectchProgressStore";
import Summary from "../subtask/Summary";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface SubtaskProps {
  card_id: number;
  subtask_id: number;
  checked: boolean;
  description: string;
}
export default function LabTabs() {
  const axiosInstance = useCustomAxios();
  const { toggleRefetch } = useRefetchProgessStore();
  const { addToast } = useToastStore();
  const location = useLocation();
  const cardId = location.pathname.replace("/card/", "").trim();
  const [value, setValue] = React.useState(0);
  const [subTaskInput, setSubTaskInput] = useState<String>("");
  const [subTasksData, setSubTasksData] = React.useState<SubtaskProps[]>([]);
  const fetchSubTasks = async () => {
    try {
      const response = await axiosInstance.get(urls.getSubTasks);
      console.log(response.data.result, "sub");
      setSubTasksData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchSubTasks();
  }, []);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleSubTasksCheckbox = async (id: number) => {
    const copySubTasks = [...subTasksData];
    copySubTasks.map((subtask) => {
      if (subtask.subtask_id === id) {
        subtask.checked = !subtask.checked;
      }
      return subtask;
    });

    try {
      await axiosInstance.put(urls.updateSubTaskChecked, { id });
      addToast("Updated", "success");
      toggleRefetch();
    } catch (error) {
      console.log(error);
      addToast("error.message in subtask", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubTaskInput("");
    try {
      await axiosInstance.post(urls.addSubTask, {
        data: { cardId: cardId, checked: false, description: subTaskInput },
      });
      addToast("subTask created", "success");
      fetchSubTasks();
      toggleRefetch();
    } catch (error) {
      console.log(error);

      setSubTaskInput("");
    }
  };

  const handleSubTaskDelete = (subtask_id: number) => {
    const confirmation = confirm("Do you really want to delete this subtask");
    if (!confirmation) {
      return;
    }
    const copySubTasks = [...subTasksData];
    const updatedSubTasks = copySubTasks.filter((subtask) => {
      if (subtask.subtask_id !== subtask_id) return subtask;
    });
    setSubTasksData(updatedSubTasks);

    try {
      axiosInstance.delete(urls.deleteSubTask, { params: { subtask_id } });
      addToast("Successfully Deleted", "success");
      toggleRefetch();
    } catch (error) {
      console.log(error);
      addToast("error occured while deleting", "error");
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {/* <Tab label="Task Summary" {...a11yProps(0)} /> */}
          <Tab label="Subtasks" {...a11yProps(0)} />
        </Tabs>
      </Box>
      {/* <CustomTabPanel value={value} index={0}>
        <Summary />
      </CustomTabPanel> */}
      <CustomTabPanel value={value} index={0}>
        <div className="flex flex-col justify-between shadow-md min-h-72 p-2">
          <div className="rounded-md p-2 mt-2 ">
            {subTasksData &&
              subTasksData.map((subtask, index) => {
                if (subtask.card_id === parseInt(cardId)) {
                  return (
                    <Subtasks
                      key={index}
                      {...subtask}
                      handleSubTasksCheckbox={handleSubTasksCheckbox}
                      handleSubTaskDelete={handleSubTaskDelete}
                    />
                  );
                }
              })}
          </div>
          <div>
            <form onSubmit={handleSubmit} className="rounded-lg flex p-2">
              <input
                name="description"
                placeholder="type here ..."
                className="w-full p-2 border rounded-lg"
                value={subTaskInput as string}
                onChange={(e) => setSubTaskInput(e.target.value)}
              />
              <Button type="submit">
                <IconButton>
                  <AddCircleOutline />
                </IconButton>
              </Button>
            </form>
          </div>
        </div>
        {/* <CommentSection value={value} /> */}
      </CustomTabPanel>
    </Box>
  );
}
