import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import { Chip, Typography } from "@mui/material";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LabTabs from "../Tabs/LabTabs";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AssigneUserSelect from "../assign/AssigneUserSelect";
import { formattedDate } from "../../utils/formatDate";
import AssigneeUserNotSelect from "../assign/AssigneUserNotSelected";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";

// Define types for props
type Anchor = "top" | "left" | "bottom" | "right";

interface User {
  member_id: number;
  member_name: string;
}

interface ItemData {
  assignees: User[];
  priority: "High" | "Medium" | "Low";
  end_date?: string; // assuming date is in string format
}

interface DrawerRightProps {
  children: React.ReactNode;
  itemData?: ItemData;
}

export default function DrawerRight({ children, itemData }: DrawerRightProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [assignee, setAssignee] = React.useState<User[]>([]);
  const [notSelectedAssigne, setNotSelectedAssigne] = React.useState<User[]>(
    []
  );

  const [reactQuillEdit, setReactQuillEdit] = React.useState<string>("");
  const axiosInstance = useCustomAxios();
  const [state, setState] = React.useState({ right: true });
  const assignees = itemData?.assignees || [];
  React.useEffect(() => {
    if (itemData)
      if (itemData.assignees) {
        setAssignee(itemData.assignees);
      }
  }, [assignees]);

  const assigneeSavedTodb = (
    notSelectedAssigne: any,
    cardId: number | null
  ) => {
    const assigneeObj = notSelectedAssigne;
    try {
      axiosInstance.post(urls.addAssignees, { data: { assigneeObj, cardId } });
      setNotSelectedAssigne([]);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      const path = location.pathname;
      const match = path.match(/(\d+)$/);
      const cardId = match ? parseInt(match[0], 10) : null;
      assigneeSavedTodb(notSelectedAssigne, cardId);
      setState({ ...state, [anchor]: open });
      navigate(-1);
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : "600px",
      }}
      role="presentation"
    >
      <div className="p-3 min-h-32 text-4xl line-height leading-normal ml-4">
        Designing Data Intensive Application
      </div>
      <div className="gap-28 p-2 ml-4">
        <div className="flex justify-between">
          <Box className="flex items-center w-1/2">
            <AdjustOutlinedIcon />
            <ListItem>Status</ListItem>
          </Box>
          <Box className="w-3/4">
            <ListItem>
              <Chip
                size="small"
                label={itemData?.priority ? itemData.priority : ""}
                sx={{
                  marginInlineEnd: 3,
                  backgroundColor:
                    itemData?.priority && itemData.priority === "High"
                      ? "#EF9A9A"
                      : itemData?.priority && itemData.priority === "Medium"
                        ? "#FFF59D"
                        : itemData?.priority && itemData.priority === "Low"
                          ? "#A5D6A7"
                          : "",
                }}
              />
            </ListItem>
          </Box>
        </div>
        {itemData?.end_date && itemData.end_date && (
          <div className="flex justify-between">
            <Box className="flex items-center w-1/2">
              <EventOutlinedIcon />
              <ListItem>Due Date</ListItem>
            </Box>
            <Box className="w-3/4">
              <ListItem>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: 14,
                  }}
                >
                  {formattedDate(itemData.end_date)}
                </Typography>
              </ListItem>
            </Box>
          </div>
        )}
        <div className="flex justify-between">
          <Box className="flex items-center w-1/2">
            <StyleOutlinedIcon />
            <ListItem>Tags</ListItem>
          </Box>
          <Box className="w-3/4 flex-wrap">
            <ListItem className="flex-wrap">
              <Chip
                size="small"
                label="High"
                sx={{ marginInlineEnd: 3, borderRadius: 0, padding: 1, mb: 1 }}
              />
            </ListItem>
          </Box>
        </div>
        <div className="flex justify-between items-center">
          <Box className="flex items-center w-1/2">
            <PeopleAltOutlinedIcon />
            <ListItem>Assignees</ListItem>
          </Box>
          <Box className="w-3/4 flex overflow-hidden">
            {itemData?.assignees && itemData.assignees.length ? (
              <AssigneUserSelect
                assignee={assignee}
                setAssignee_id={setAssignee}
              />
            ) : (
              <AssigneeUserNotSelect
                selectedAssignee={notSelectedAssigne}
                setAssignee_id={setNotSelectedAssigne}
              />
            )}
          </Box>
        </div>
        <div className="flex justify-between items-center">
          <Box className="flex items-center w-1/2">
            <PeopleAltOutlinedIcon />
            <ListItem>Description</ListItem>
          </Box>
        </div>
      </div>
      {children}
      <LabTabs />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
