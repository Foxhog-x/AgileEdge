import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({ progress }: any) {
  const getColor = (progress: number) => {
    if (progress < 50) return "primary"; // Blue (default)
    if (progress < 100) return "warning"; // Yellow
    return "success"; // Green
  };

  return (
    <Box sx={{ width: `99%` }}>
      <LinearProgressWithLabel
        value={parseInt(progress)}
        color={getColor(progress)}
      />
    </Box>
  );
}
