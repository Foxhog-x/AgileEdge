import { alpha, createTheme } from "@mui/material";

const lightThemeWithSoftColors = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Header color
    },
    background: {
      default: "#f5f5f5", // Main board content color
      paper: "#ffffff", // Card background color
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff", // Left sidebar color
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1976d2", // Header color
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          backgroundColor: "#e3f2fd", // List column color
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff", // Card color
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const basicWhitetheme = createTheme({
  palette: {
    primary: {
      main: "#yourPrimaryColor",
    },
    secondary: {
      main: "#yourSecondaryColor",
    },
  },
  typography: {
    fontFamily: "YourCustomFont",
  },
  // ... other theme customizations
});

const cozyTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff7043",
    },
    secondary: {
      main: "#ffca28",
    },
    background: {
      default: "#fff8e1",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Georgia, serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
          borderRadius: "12px",
        },
      },
    },
  },
});

const modernTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#673ab7",
    },
    secondary: {
      main: "#ff5722",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        },
      },
    },
  },
});

const minimalTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#607d8b",
    },
    secondary: {
      main: "#8d6e63",
    },
    background: {
      default: "#eceff1",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Helvetica, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        },
      },
    },
  },
});

const transperentTheme = createTheme({
  palette: {
    background: {
      default: `url('../assets/kindpng_1262350.png')`,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white", // Inherited from text.primary
          backgroundColor: "transperent", // Adjust the violet color as needed
        },
      },
    },
  },
  // Other theme customizations
});
export {
  lightThemeWithSoftColors,
  basicWhitetheme,
  cozyTheme,
  minimalTheme,
  modernTheme,
  darkTheme,
  lightTheme,
  transperentTheme,
};
