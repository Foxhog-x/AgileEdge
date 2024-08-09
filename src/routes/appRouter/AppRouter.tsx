import { Route, Routes } from "react-router-dom";

import Layout from "../../Layout/Layout";
import Board from "../../pages/contentpage";
import DrawerRight from "../../components/drawer/DrawerRight";
import { ReactquillContainer } from "../../components/reactquill/ReactquillContainer";
import CalendarpageWrapper from "../../pages/calendar/CalendarpageWrapper";

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
      <Route path="/calendar" element={<CalendarpageWrapper />} />
    </Routes>
  );
};
