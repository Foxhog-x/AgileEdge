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
import React, { ReactElement } from "react";
import useFetchAvatars from "../hooks/projectCustomhook/useFetchAvatars";

type props = {
  children: React.ReactNode;
};
function Layout({ children }: props) {
  const { avatars } = useFetchAvatars();
  return (
    <>
      <ThemeProvider theme={modernTheme}>
        <Paper>
          <div className="flex min-h-full  shadow-md ">
            <div
              className="hidden sm:flex flex-col min-h-screen max-w-80"
              // style={{ backgroundColor: "#1E1E1E" }}
            >
              <ProfileImage />
              <NavButton />
            </div>
            <div className="flex-1 overflow-hidden">
              <Header avatars={avatars} />
              <div className="h-screen overflow-x-auto">
                {React.Children.map(children as ReactElement, (child) =>
                  React.cloneElement(child, { avatars })
                )}
              </div>
            </div>
          </div>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default Layout;
