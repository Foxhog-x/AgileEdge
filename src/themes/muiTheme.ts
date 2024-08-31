import { createTheme } from "@mui/material";

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
      mode: "light", // Explicitly setting the mode to light
      primary: {
        main: "#1a73e8", // A vibrant blue color for primary elements
      },
      secondary: {
        main: "#ff7043", // A complementary warm color for secondary elements
      },
      background: {
        default: "#f5f5f5", // A light gray background for a softer look
        paper: "#ffffff",  // Keeping paper components white for clarity
      },
      text: {
        primary: "#333333", // Dark gray for primary text, ensuring readability
        secondary: "#555555", // Slightly lighter gray for secondary text
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // A modern sans-serif font for a clean look
      h1: {
        fontFamily: "'Merriweather', serif", // A serif font for headings to add elegance
        fontWeight: 700,
        fontSize: "2.5rem",
        color: "#1a73e8", // Primary color for heading text
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
        color: "#333333", // Primary text color for body text
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            padding: "10px 20px", // Comfortable padding for better button feel
            borderRadius: "8px", // Rounded corners for a modern look
            color: "#ffffff", // Ensure button text is white for contrast
            backgroundColor: "#1a73e8", // Primary button background color
            '&:hover': {
              backgroundColor: "#155bb5", // Darker shade on hover
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for depth
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for better depth
            borderRadius: "12px", // Rounded corners for a polished look
            padding: "5px", // Add padding for better content spacing
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff", // White app bar to blend with the background
            color: "#1a73e8", // Primary color for app bar text
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow to define the app bar
          },
        },
      },
    },
  });
  

const cozyTheme = createTheme({
 
    palette: {
      mode: "light",
      primary: {
        main: "#ff7043", // Vibrant primary color
      },
      secondary: {
        main: "#ffca28", // Bright secondary color
      },
      background: {
        default: "#fff3e0", // Slightly lighter background for better contrast
        paper: "#ffffff",  // Keeping paper white for clean, contrasting content areas
      },
    },
    typography: {
      fontFamily: "Georgia, serif", // Classic serif font for a traditional feel
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            padding: "8px 16px", // Comfortable padding for the button
            borderRadius: "8px", // More rounded corners for a softer look
            color: "#ffffff", // Ensure text is white
            backgroundColor: "#ff7043", // Primary background color
            '&:hover': {
              backgroundColor: "#f4511e", // Darker hover background for better visibility
              color: "#ffffff", // Keep text white on hover
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)", // Add a stronger shadow for better visibility
              border: "1px solid #d84315", // Define the button's edges more clearly
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)", // Slightly deeper shadow for better depth
            borderRadius: "12px", // Maintain the rounded corners
            '&:hover': {
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.25)", // Stronger shadow on hover for emphasis
            },
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
      main: "#455a64", // Darker shade for better contrast
    },
    secondary: {
      main: "#6d4c41", // Darker shade for better contrast
    },
    background: {
      default: "#f1f3f4", // Slightly lighter for better text contrast
      paper: "#fafafa",  // Slightly lighter for better text contrast
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
          padding: "8px 16px", // Add more padding for better button feel
          borderRadius: "6px", // Slightly more rounded for a softer look
          color: "#ffffff", // Ensure text is white
          backgroundColor: "#455a64", // Primary background color
          '&:hover': {
            backgroundColor: "#607d8b", // Slightly lighter on hover for better visibility
            color: "#ffffff", // Keep text white on hover
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Add shadow for better visibility
            border: "1px solid #37474f", // Add border for better definition
          },
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
  lightTheme,
  transperentTheme,
};
