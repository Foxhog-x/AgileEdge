import Avatar from "@mui/material/Avatar";
import NavButton from "../components/NavButton";
import Header from "./Header";
import React from "react";
import { ProfileImage } from "../components/ProfileImage";

type props = {
  children: React.ReactNode;
};

function Layout({ children }: props) {
  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="hidden sm:flex flex-col min-h-screen min-w-80 ">
          <ProfileImage />
          <NavButton />
        </div>

        <div className="container flex flex-col flex-1 max-w-full  ">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
