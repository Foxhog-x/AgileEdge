import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";

import {
  Avatar,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

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

export default function LabTabs() {
  const [value, setValue] = React.useState(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment.trim()]);
      setComment("");
    }
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="max-w-full flex flex-col-reverse">
          <Paper elevation={3} className="p-4">
            <TextField
              label="Add a comment"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={comment}
              onChange={handleCommentChange}
              className="mb-2"
            />
            <div className="flex justify-end">
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={handleCommentSubmit}
              >
                Send
              </Button>
            </div>
          </Paper>
          <List>
            <div className="border">
              {comments.map((comment, index) => (
                <ListItem
                  key={index}
                  alignItems="flex-start"
                  className="mb-2 flex flex-col border justify-start"
                >
                  <ListItemAvatar className="flex gap-2 items-center ">
                    <Avatar className="relative bottom-1">
                      {comment.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="flex flex-col">
                      <span>Onkar Patil</span>
                      <ListItemText secondary=" 2 hours ago" />
                    </div>
                  </ListItemAvatar>
                  <ListItemText primary={comment} />
                </ListItem>
              ))}
            </div>
          </List>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
