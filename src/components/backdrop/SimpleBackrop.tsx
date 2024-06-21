import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useBackdropStore from "../../store/useBackdropStore";
export default function SimpleBackdrop() {
  const { backdrop, hideBackdrop } = useBackdropStore();
  const handleClose = () => {
    hideBackdrop();
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdrop}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
