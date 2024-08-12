import { Route, Routes } from "react-router-dom";

import Layout from "../../Layout/Layout";
import Board from "../../pages/contentpage";
import DrawerRight from "../../components/drawer/DrawerRight";
import { ReactquillContainer } from "../../components/reactquill/ReactquillContainer";
import CalendarpageWrapper from "../../pages/calendar/CalendarpageWrapper";
import Protected from "../../pages/protectedpage/Protected";
import Loginpage from "../../pages/loginpage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route
          path="/"
          element={
            <Layout>
              <Board />
            </Layout>
          }
        />
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
        <Route path="/calendar" element={<CalendarpageWrapper />} />
      </Route>
      <Route path="/login" element={<Loginpage />} />
    </Routes>
  );
};
