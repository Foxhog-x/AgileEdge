import Avatar from "@mui/material/Avatar";
import NavButton from "../components/NavButton";
import Header from "./Header";
import React from "react";
import { ProfileImage } from "../components/ProfileImage";

type props = {
  children: React.ReactNode;
};

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
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
function Layout({ children }: props) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="flex min-h-full flex-1">
          <div className="hidden sm:flex flex-col min-h-screen min-w-80 ">
            <ProfileImage />
            <NavButton />
          </div>
          <div className="container ">
            <Header />
            {children}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default Layout;
