import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Chip } from "@mui/material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const onClickCardFunction = () => {
  console.log("works");
};
const card = (
  <React.Fragment>
    <CardActionArea onClick={onClickCardFunction}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <Chip size="small" label="High" sx={{ marginInlineEnd: 3 }} />
          <Chip
            label={"Dashboard"}
            sx={{ borderRadius: 0, height: 20, padding: 0, marginInlineEnd: 1 }}
          />
        </Typography>
        <Typography variant="h5" component="div">
          Accessibility audit
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
          Details about this item can go here but are truncated after a certain
          length
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
    </CardActionArea>
    <CardActions
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 1,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Avatar sx={{ height: 30, width: 30 }} />
        <Avatar sx={{ height: 30, width: 30 }} />
      </Box>
      <Box>
        <Button variant="outlined">Comments</Button>
      </Box>
    </CardActions>
  </React.Fragment>
);

export default function CardOutline() {
  return (
    <Box sx={{ width: 320, minWidth: 275, maxWidth: 320, padding: 2 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
