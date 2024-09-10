import Header from "./Header";
import { ThemeProvider } from "@mui/material/styles";
import { basicWhitetheme } from "../themes/muiTheme";
import { Box, Paper } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import useFetchAvatars from "../hooks/projectCustomhook/useFetchAvatars";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const location = useLocation();
  const avatars = useFetchAvatars();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [overflowY, setOverflowY] = useState<boolean>(false);
  useEffect(() => {
    const option = localStorage.getItem("filterBy");
    if (option === null || option === undefined) {
      localStorage.setItem("filterBy", "All Task");
      setSelectedOption("All Task");
    } else {
      setSelectedOption(option);
    }
    if (location.pathname === "/dashboard") {
      setOverflowY(true);
    } else {
      setOverflowY(false);
    }
  }, [location.pathname]);

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

              <Box
                className={`h-[92vh] overflow-x-auto ${
                  overflowY ? "overflow-y-auto" : ""
                }`}
              >
                {React.Children.map(children as ReactElement, (child) =>
                  React.cloneElement(child, {
                    avatars,

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
