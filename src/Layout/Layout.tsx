import Header from "./Header";
import { ThemeProvider } from "@mui/material/styles";
import { basicWhitetheme } from "../themes/muiTheme";
import { Box, Paper } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import useFetchAvatars from "../hooks/projectCustomhook/useFetchAvatars";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const avatars = useFetchAvatars();
  const [show, setShow] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === "/mytasks") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [location]);

  useEffect(() => {
    const option = localStorage.getItem("filterBy");
    if (option === null || option === undefined) {
      localStorage.setItem("filterBy", "All Task");
      setSelectedOption("All Task");
    } else {
      setSelectedOption(option);
    }
  }, []);

  // Render null or a fallback UI if selectedOption is empty
  if (!selectedOption) {
    return null; // or a fallback UI
  }

  return (
    <>
      <ThemeProvider theme={basicWhitetheme}>
        <Paper>
          <Box className="flex min-h-full overflow-hidden shadow-md ">
            <Box
              className={`${
                showSidebar ? "" : "hidden"
              } sm:flex flex-col min-h-screen max-w-72`}
            >
              <Sidebar setShowSidebar={setShowSidebar} />
            </Box>
            <Box className="flex-1 overflow-hidden">
              <Header
                avatars={avatars}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />

              <Box className="h-[92vh] overflow-x-auto">
                {React.Children.map(children as ReactElement, (child) =>
                  React.cloneElement(child, {
                    avatars,
                    show,
                    selectedOption,
                    setSelectedOption,
                  })
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default Layout;
