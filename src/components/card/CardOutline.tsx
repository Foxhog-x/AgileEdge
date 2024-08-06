import { Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Icon, IconButton, Paper } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Chip } from "@mui/material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import CardActions from "@mui/material/CardActions";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Component } from "react";
export const CardOutline = ({ name, items, id }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="flex justify-between items-center mb-4  p-2 ">
            <h3>{name}</h3>
            <IconButton>+</IconButton>
          </div>
          <div className="items-container flex flex-col items-center gap-4">
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => {
                  return (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <Box
                        border={1}
                        minHeight={300}
                        maxWidth={320}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"space-between"}
                        borderRadius={5}
                      >
                        <CardContent sx={{ paddingLeft: 2, paddingTop: 0 }}>
                          <Typography
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"baseline"}
                          >
                            <Chip
                              size="small"
                              label="High"
                              sx={{ marginInlineEnd: 3 }}
                            />
                            <IconButton>+</IconButton>
                          </Typography>
                          <Typography variant="h5" component="div">
                            {item.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              mb: 1.5,
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 2,
                            }}
                          >
                            Details about this item can go here but are
                            truncated after a certain length
                            <br />
                          </Typography>
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              fontSize: 14,
                            }}
                          >
                            <EventOutlinedIcon />
                            Feb 24, 2024
                          </Typography>
                        </CardContent>

                        <CardActions
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 2,
                          }}
                        >
                          <Box sx={{ display: "flex", marginTop: 2 }}>
                            <Avatar sx={{ height: 30, width: 30 }} />
                            <Avatar sx={{ height: 30, width: 30 }} />
                          </Box>
                          <Box>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "transparent",
                                color: "black",
                              }}
                            >
                              Comments
                            </Button>
                          </Box>
                        </CardActions>
                      </Box>
                    </div>
                  );
                }}
              </Draggable>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
