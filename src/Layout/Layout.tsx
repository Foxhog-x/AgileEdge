import { Button, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="flex max-h-full">
        <div className="flex flex-col h-screen min-w-80 bg-red-500">
          <div className="flex items-center gap-4 py-6 px-6">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 50, height: 50 }}
            />
            <h2 className="text-2xl">Onkar</h2>
          </div>
          <div className="px-6">
            <ul className="flex flex-col gap-2 border p-3">
              <li>
                <Button
                  startIcon={<HomeIcon />}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    height: 30,
                    mb: 1,
                    "&:hover": {
                      backgroundColor: "secondary.main",
                    },
                  }}
                >
                  Home
                </Button>
              </li>
              <li>
                <Button
                  startIcon={<HomeIcon />}
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    height: 30,
                    mb: 1,

                    "&:hover": {
                      backgroundColor: "secondary.main",
                    },
                  }}
                >
                  Home
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-black">jhelk</div>
      </div>
    </>
  );
}

export default Layout;
