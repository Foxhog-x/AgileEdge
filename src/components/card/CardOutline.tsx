import { Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Card, Icon, IconButton, Paper } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Chip } from "@mui/material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import CardActions from "@mui/material/CardActions";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTaskFormStore } from "../../store/useTaskFormStore";
export const CardOutline = ({ name, items, id }) => {
  const { openTaskDialog } = useTaskFormStore();
  const navigate = useNavigate();
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    ></Box>
  );
  const handleNavigate = (cardId) => {
    navigate("/card/cardId");
  };
  const card = (item) => (
    <>
      <CardContent>
        <Typography
          display={"flex"}
          justifyContent={"space-between"}
          component={"div"}
          padding={0}
          mb={1}
          height={25}
        >
          <Chip size="small" label="High" sx={{ marginInlineEnd: 3 }} />
          <IconButton sx={{ position: "relative", bottom: 5 }}>+</IconButton>
        </Typography>

        <Typography
          variant="h5"
          component="div"
          sx={{
            mb: 1.5,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
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
          Something here description. This text might be longer, but it will be
          truncated. hjksdhkfhsdkhfk <br />
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
        }}
      >
        <Typography
          component={"div"}
          sx={{
            display: "flex",
            marginTop: 2,
          }}
        >
          <Avatar sx={{ height: 30, width: 30 }} />
          <Avatar sx={{ height: 30, width: 30 }} />
        </Typography>
        <Box>
          <Link
            to={`/card/5`}
            state={{ someData: "Your data here" }}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "transparent",
                color: "black",
              }}
              onClick={() => handleNavigate(5)}
              ///here we give the cardId</Box>
            >
              View
            </Button>
          </Link>
        </Box>
      </CardActions>
    </>
  );

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="flex justify-between items-center mb-4 p-2 ">
            <h3>{name}</h3>
            <IconButton onClick={() => openTaskDialog(id, name)}>
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="items-container flex flex-col items-center gap-4 border border-blue-100">
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => {
                  return (
                    <Box
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      sx={{ minWidth: 320 }}
                    >
                      <Card
                        variant="outlined"
                        sx={{
                          maxWidth: 320,
                          minHeight: 200, // Set minimum height
                          maxHeight: 250, // Set maximum height
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          overflow: "hidden",
                        }}
                      >
                        {card(item)}
                      </Card>

                      {/* <Box
                        border={1}
                        minHeight={250}
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
                          <Typography
                            variant="h6"
                            component="div"
                            minHeight={75}
                          >
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
                      </Box> */}
                    </Box>
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
