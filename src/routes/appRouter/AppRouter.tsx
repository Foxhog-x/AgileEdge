import { Route, Routes } from "react-router-dom";

import Layout from "../../Layout/Layout";
import Board from "../../pages/contentpage";
import DrawerRight from "../../components/drawer/DrawerRight";
import { ReactquillContainer } from "../../components/reactquill/ReactquillContainer";
import { Calendar } from "@fullcalendar/core";
import Calender from "../../pages/calender/Calender";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/card/:cardId" />
      <Route
        path="/"
        element={
          <Layout>
            <Board />
            <DrawerRight>
              <ReactquillContainer />
            </DrawerRight>
          </Layout>
        }
      />
      <Route path={"/calender"} element={<Calender />} />
    </Routes>
  );
};
