import NavButton from "../components/NavButton";
import Header from "./Header";
import { ProfileImage } from "../components/ProfileImage";
import { ThemeProvider } from "@mui/material/styles";
import {
  // cozyTheme,
  // minimalTheme,
  // modernTheme,
  basicWhitetheme,
  // transperentTheme,
} from "../themes/muiTheme";
import { Box, Paper } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import useFetchAvatars from "../hooks/projectCustomhook/useFetchAvatars";
import { useLocation } from "react-router-dom";

type props = {
  children: React.ReactNode;
};
function Layout({ children }: props) {
  const avatars = useFetchAvatars();
  const [show, setShow] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/mytasks") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [location]);
  return (
    <>
      <ThemeProvider theme={basicWhitetheme}>
        <Paper>
          <Box className="flex min-h-full overflow-hidden  shadow-md ">
            <Box
              className="hidden sm:flex flex-col min-h-screen max-w-72"
              // style={{ backgroundColor: "#1E1E1E" }}
            >
              <ProfileImage />
              <NavButton />
            </Box>
            <Box className="flex-1 overflow-hidden">
              <Header avatars={avatars} />
              {show && (
                <Box className="h-screen overflow-x-auto">
                  {React.Children.map(children as ReactElement, (child) =>
                    React.cloneElement(child, { avatars })
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default Layout;
