import { Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Card, IconButton } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Chip } from "@mui/material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import CardActions from "@mui/material/CardActions";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTaskFormStore } from "../../store/useTaskFormStore";
export const CardOutline = ({
  column_id,
  column_name,
  column_position, //its for me to understand actually i do not need it because we are using dnd index management
  items,
}) => {
  const { openTaskDialog } = useTaskFormStore();
  const navigate = useNavigate();
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    ></Box>
  );
  const handleNavigate = (cardId) => {
    navigate(`/card/${cardId}`);
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
          <Chip
            size="small"
            label={item.priority}
            sx={{ marginInlineEnd: 3 }}
          />
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
          {item.description} <br />
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
          {item.end_date}
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
              onClick={() => handleNavigate(item.card_id)}
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
    <Droppable droppableId={column_id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="flex justify-between items-center mb-4 p-2 ">
            <h3>{column_name}</h3>
            <IconButton onClick={() => openTaskDialog(column_id, column_name)}>
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="items-container flex flex-col items-center gap-4 border border-red-400">
            {items.map((item, index) => (
              <Draggable
                draggableId={item.card_id}
                index={index}
                key={item.card_id}
              >
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
