import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { Avatar, Chip, IconButton, Stack, Typography } from "@mui/material";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { ReactquillContainer } from "../reactquill/ReactquillContainer";
import LabTabs from "../Tabs/LabTabs";
type Anchor = "top" | "left" | "bottom" | "right";

export default function DrawerRight() {
  const [state, setState] = React.useState({
    right: true,
  });

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

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : "600px",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="p-3 min-h-32 text-4xl line-height leading-normal ml-4 ">
        Designing Data Intensive Application
      </div>
      <div className=" gap-28 p-2 ml-4">
        <div className="flex justify-between">
          <Box className="flex items-center w-1/2 ">
            <AdjustOutlinedIcon />
            <ListItem>Status</ListItem>
          </Box>
          <Box className="w-3/4">
            <ListItem>High</ListItem>
          </Box>
        </div>
        <div className="flex justify-between">
          <Box className="flex items-center w-1/2 ">
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
                Feb 24, 2024
              </Typography>
            </ListItem>
          </Box>
        </div>
        <div className="flex justify-between">
          <Box className="flex items-center w-1/2 ">
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
          <Box className="flex items-center w-1/2 ">
            <PeopleAltOutlinedIcon />
            <ListItem>Assignees</ListItem>
          </Box>
          <Box className="w-3/4 flex  overflow-hidden">
            <ListItem className="flex-wrap gap-2">
              <Chip
                avatar={
                  <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
                }
                label="Avatar"
                variant="outlined"
                onDelete={() => "hello"}
              />
              <Chip
                avatar={
                  <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
                }
                label="Avatar"
                variant="outlined"
                onDelete={() => "hello"}
              />
            </ListItem>
          </Box>
        </div>
      </div>
      <ReactquillContainer />
      <LabTabs />
    </Box>
  );
  {
    /* <Box className=" flexitems-center ">
            <AdjustOutlinedIcon />
            <ListItem>Status</ListItem>
          </Box>
          <Box>
            <ListItem>High</ListItem>
          </Box> */
  }
  return (
    <div>
      {(["left", "right", "top", "bottom"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer("right", true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
