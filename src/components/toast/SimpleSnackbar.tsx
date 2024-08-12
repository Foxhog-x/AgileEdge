import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useToastStore } from "../../store/useToastStore";

export const SimpleSnackbar = () => {
  const { toasts, removeToast } = useToastStore();
  //   const action = (
  //     <React.Fragment>
  //       <Button color="secondary" size="small" onClick={handleClose}>
  //         UNDO
  //       </Button>
  //       <IconButton
  //         size="small"
  //         aria-label="close"
  //         color="inherit"
  //         onClick={handleClose}
  //       >

  //       </IconButton>
  //     </React.Fragment>
  //   );

  return (
    <div style={{ zIndex: 9999 }}>
      {toasts.map((toast) => {
        return (
          <Snackbar
            key={toast.id}
            open={true}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={() => removeToast(toast.id)}
          >
            <Alert onClose={() => removeToast(toast.id)} severity={toast.type}>
              {toast.message}
            </Alert>
          </Snackbar>
        );
      })}
    </div>
  );
};
