import { Route, Routes } from "react-router-dom";

import Layout from "../../Layout/Layout";
import Board from "../../pages/contentpage";
import DrawerRight from "../../components/drawer/DrawerRight";
import { ReactquillContainer } from "../../components/reactquill/ReactquillContainer";
import { Calendar } from "@fullcalendar/core";
import Calender from "../../pages/calender/Calender";
import EventDialog from "../../pages/calender/EventDialog";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/card/:cardId"
        element={
          <Layout>
            <Board />
            <DrawerRight>
              <ReactquillContainer />
            </DrawerRight>
          </Layout>
        }
      />
      <Route
        path="/"
        element={
          <Layout>
            <Board />
          </Layout>
        }
      />
      <Route path={"/calender"} element={<Calender />}>
 
      </Route>
    </Routes>
  );
};
