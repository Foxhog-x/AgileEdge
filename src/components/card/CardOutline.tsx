import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Box, Card, IconButton } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Chip } from "@mui/material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTaskFormStore } from "../../store/useTaskFormStore";
import {
  formattedDate,
  getMuiColorBasedOnTimeLeft,
  timeLeftFromNow,
} from "../../utils/formatDate";
import Divider from "@mui/material/Divider";
import BasicMenu from "./BasicMenu";
import LinearWithValueLabel from "../muix/LinearWithValueLabel";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

interface User {
  member_id: number;
  member_name: string;
}
interface CardData {
  assignees: User[];
  card_id: string;
  card_column_id: string;
  column_position: number | string;
  description: string;
  end_date: Date;
  name: string;
  priority: string;
}

interface ProjectData {
  column_id: string;
  column_name: string;
  column_position: number | string;
  items: CardData[];
}

interface ProgressData {
  card_id: number;
  completed_subtasks: string;
  completion_percentage: string;
  task_name: string;
  total_subtasks: number;
}
interface Avatar {
  member_id: number;
  avatar: string;
  member_name?: string;
}

interface CardOutlineProps {
  progress: ProgressData[];
  avatars: Avatar[];
  column_id: string;
  column_name: string;
  sortedData: ProjectData[];
  setSortedData: React.Dispatch<React.SetStateAction<ProjectData[]>>;
  items: CardData[];
}
type ItemProps = {
  assignees: User[] | null;
  card_id: string;
  card_column_id: string;
  column_position: number | string;
  description: string;
  end_date: Date;
  name: string;
  priority: string;
};
const CardOutline = ({
  progress,
  avatars,
  column_id,
  column_name,
  sortedData,
  setSortedData,
  // column_position, //its for me to understand actually i do not need it because we are using dnd index management
  items,
}: CardOutlineProps) => {
  const { openTaskDialog } = useTaskFormStore();
  const card = (item: ItemProps) => {
    const timeColor = getMuiColorBasedOnTimeLeft(item.end_date);
    // const [header, content] = item.name.split(":").map((part) => part.trim());
    return (
      <>
        <CardContent
          sx={{
            padding: "16px",
            height: "130px",
            overflowY: "hidden",
          }}
        >
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
              sx={{
                marginInlineEnd: 3,
                backgroundColor:
                  item.priority === "High"
                    ? "#EF9A9A"
                    : item.priority === "Medium"
                    ? "#FFF59D"
                    : item.priority === "Low"
                    ? "#A5D6A7"
                    : "",
              }}
            />

            <BasicMenu
              card_Id={item.card_id}
              sortedData={sortedData}
              setSortedData={setSortedData}
              column_id={column_id}
            />
          </Typography>
          <Typography
            component="div"
            className="text-3xl"
            sx={{
              mb: 1.5,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
              fontSize: 18,
            }}
          >
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
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
            {item.end_date && item?.end_date ? (
              <EventOutlinedIcon />
            ) : (
              <span>""</span>
            )}
            <span>{formattedDate(item.end_date)}</span>
          </Typography>
        </CardContent>
        {progress &&
          item.card_id &&
          progress?.map((cardProgress, index) => {
            if (cardProgress?.card_id === parseInt(item?.card_id)) {
              return (
                <LinearWithValueLabel
                  key={index}
                  progress={cardProgress?.completion_percentage}
                />
              );
            } else {
              return <div className="h-5"></div>;
            }
          })}

        <Divider />
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 1,
          }}
        >
          <Typography
            component={"div"}
            sx={{
              display: "flex",
              marginTop: 2,
            }}
          >
            {item.assignees?.map((user: User | undefined | null) => {
              if (!user) return null;
              return avatars.map((userAvatar: Avatar, index: Number) => {
                if (user.member_id === userAvatar.member_id) {
                  return (
                    <Avatar
                      key={index as number}
                      sx={{ height: 30, width: 30 }}
                      src={`data:image/jpeg;base64,${userAvatar?.avatar}`}
                    >
                      {user?.member_name.slice(0, 1)}
                    </Avatar>
                  );
                }
              });
            })}
          </Typography>
          <Box style={{ display: "flex", gap: 20 }}>
            <Typography
              component={"div"}
              sx={{
                display: "flex",
                marginTop: 2,
                gap: 1,
              }}
            >
              <AccessTimeOutlinedIcon fontSize="small" color={timeColor} />
              <small>{timeLeftFromNow(item.end_date)}</small>
            </Typography>

            <Link
              to={`/card/${item.card_id}`}
              state={{ itemData: item }}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "transparent",
                  color: "black",
                }}

                ///here we give the cardId</Box>
              >
                View
              </Button>
            </Link>
          </Box>
        </CardActions>
      </>
    );
  };

  return (
    <Droppable droppableId={column_id} type="column">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="flex justify-between items-center mb-4 p-3 shadow-md ">
            <h3>{column_name}</h3>
            <IconButton onClick={() => openTaskDialog(column_id, column_name)}>
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="items-container flex flex-col items-center gap-2 border rounded-lg">
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
                          minHeight: 230,
                          maxHeight: 260,
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
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default CardOutline;
