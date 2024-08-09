import React, { useEffect, useState } from "react";

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
import { io } from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";
export default function CommentSection({ currentTab }) {
  const location = useLocation();
  const { cardId } = useParams();
  const { someData } = location.state || {};

  console.log("Card ID:", cardId);
  console.log("State:", someData);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJfaWQiOjgsIm1lbWJlcl9uYW1lIjoiU3dhcGFuaWwgUGF0aWwiLCJlbWFpbCI6Im9ua2FycGF0aWw0NDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiJ3d3BiciIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTcyMzA1MzIwN30.lVFPm5brfsrpZnmuS8XwGgJOU8WOPLM9fIeP5mTISao";
  const [socket, setSocket] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState([]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      socket.emit("chat message", comment.trim());
      console.log(users);
      setComment("");
    }
  };

  useEffect(() => {
    const tempSocket = io("http://localhost:8000", {
      query: { token },
    });
    tempSocket.emit("join card", { cardId: 1 });

    tempSocket.on("connect to namespace", (namespace) => {
      const nsSocket = io(namespace);

      nsSocket.on("user joined", ({ userName }) => {
        setUsers((prevUsers) => [...prevUsers, userName]);
      });

      nsSocket.on("user left", ({ userName }) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user !== userName));
      });

      nsSocket.on("chat message", (data) => {
        setComments((prev) => [...prev, data]);
      });

      setSocket(nsSocket);
      return () => {
        nsSocket.disconnect();
      };
    });

    return () => {
      tempSocket.off("connect to namespace");
    };
  }, [cardId]);
  console.log(comments);
  return (
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
                  {comment.userName?.charAt(0).toUpperCase()}
                </Avatar>
                <div className="flex flex-col">
                  <span>{comment.userName}</span>
                  <ListItemText>{}</ListItemText>
                </div>
              </ListItemAvatar>
              <ListItemText primary={comment.message} />
            </ListItem>
          ))}
        </div>
      </List>
    </div>
  );
}
