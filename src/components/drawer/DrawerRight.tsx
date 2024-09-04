import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import { Chip, CircularProgress, Typography } from "@mui/material";
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
import { ReactquillContainer } from "../reactquill/ReactquillContainer";
import { getLocationUrl } from "../../utils/getUrlLocation";
import { useToastStore } from "../../store/useToastStore";

// Define types for props
type Anchor = "top" | "left" | "bottom" | "right";

interface User {
  member_id: number;
  member_name: string;
}

export default function DrawerRight() {
  const navigate = useNavigate();
  const location = useLocation();
  const [assignee, setAssignee] = React.useState<User[]>([]);
  const [notSelectedAssigne, setNotSelectedAssigne] = React.useState<User[]>(
    []
  );
  const [hasChanges, setHasChanges] = React.useState(false); // Track changes
  const { itemData } = location.state || {};
  const [reactQuillEdit, setReactQuillEdit] = React.useState<
    string | undefined
  >(undefined);
  const { addToast } = useToastStore();
  const [newQuillValues, setNewQuillValues] = React.useState<string>("");
  const axiosInstance = useCustomAxios();
  const [state, setState] = React.useState({ right: true });

  React.useEffect(() => {
    const getQuillData = async (cardId: any) => {
      try {
        const response = await axiosInstance.post(urls.getQuillData, {
          cardId,
        });
        const data = response.data.result;
        if (data.length > 0) {
          setReactQuillEdit(data[0].htmlContent);
        } else {
          setReactQuillEdit("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getQuillData(getLocationUrl(location.pathname));
  }, [axiosInstance]);
  React.useEffect(() => {
    if (itemData.assignees) {
      setAssignee(itemData.assignees);
    }
  }, [itemData.assignees]);

  const assigneeSavedTodb = (
    notSelectedAssigne: any,
    cardId: number | null
  ) => {
    const assigneeObj = notSelectedAssigne;
    try {
      axiosInstance.post(urls.addAssignees, { data: { assigneeObj, cardId } });
      setNotSelectedAssigne([]);
      addToast("saved", "success");
    } catch (error) {
      console.log(error);
      addToast("Error", "error");
    }
  };
  const descriptionSavedTodb = async (cardId: any) => {
    console.log(reactQuillEdit, "reactquilledit");
    try {
      await axiosInstance.post(urls.quillCardSave, { cardId, newQuillValues });
      setNewQuillValues("");
      addToast("updated", "success");
    } catch (error) {
      console.log(error);
      addToast("error", "error");
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

      assigneeSavedTodb(notSelectedAssigne, getLocationUrl(location.pathname));

      if (hasChanges) {
        descriptionSavedTodb(getLocationUrl(location.pathname));
      }

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
        {itemData.name}
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
        {/* <div className="flex justify-between">
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
        </div> */}
        <div className="flex justify-between items-center">
          <Box className="flex items-center w-1/2">
            <PeopleAltOutlinedIcon />
            <ListItem>Assignees</ListItem>
          </Box>
          <Box className="w-3/4 flex overflow-hidden">
            {itemData?.assignees && itemData?.assignees.length ? (
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
      {reactQuillEdit !== undefined ? (
        <ReactquillContainer
          hasChanges={hasChanges}
          setHasChanges={setHasChanges}
          reactQuillEdit={reactQuillEdit}
          setReactQuillEdit={setReactQuillEdit}
          setNewQuillValues={setNewQuillValues}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // Light background color
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <div className="flex justify-end p-2 mr-2">
        {/* <Button>Create Task Summary</Button> */}
      </div>
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
