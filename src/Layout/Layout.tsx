import Avatar from "@mui/material/Avatar";
import NavButton from "../components/NavButton";
import Header from "./Header";
import { ProfileImage } from "../components/ProfileImage";
import { ThemeProvider } from "@mui/material/styles";
import {
  lightTheme,
  darkTheme,
  cozyTheme,
  minimalTheme,
  modernTheme,
  basicWhitetheme,
  transperentTheme,
} from "../themes/muiTheme";
import { Box, Paper } from "@mui/material";

type props = {
  children: React.ReactNode;
};

function Layout({ children }: props) {
  return (
    <>
      <ThemeProvider theme={modernTheme}>
        <Paper>
          <Box className="flex min-h-full  shadow-md ">
            <Box
              className="hidden sm:flex flex-col min-h-screen"
              // style={{ backgroundColor: "#1E1E1E" }}
            >
              <ProfileImage />
              <NavButton />
            </Box>
            <Box className="container ">
              <Header />
              {children}
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default Layout;
