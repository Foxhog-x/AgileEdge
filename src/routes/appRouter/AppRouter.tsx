import { Route, Routes } from "react-router-dom";

import Layout from "../../Layout/Layout";
import Board from "../../pages/contentpage";
import DrawerRight from "../../components/drawer/DrawerRight";
import CalendarpageWrapper from "../../pages/calendar/CalendarpageWrapper";
import Protected from "../../pages/protectedpage/Protected";
import Loginpage from "../../pages/Loginpage";
import Userprofilepage from "../../pages/profilepage/Userprofilepage";
import Homepage from "../../pages/homepage";
import Signuppage from "../../pages/signuppage/Signuppage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route
          path="/project/:boardId"
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
              <DrawerRight />
            </Layout>
          }
        />
        <Route
          path="/calendar"
          element={
            <Layout>
              <CalendarpageWrapper />
            </Layout>
          }
        />
        <Route path="/userProfile" element={<Userprofilepage />} />
        <Route
          path="/"
          element={
            <Layout>
              <Homepage />
            </Layout>
          }
        />
        <Route
          path="/mytasks"
          element={
            <Layout>
              <Board />
            </Layout>
          }
        />
      </Route>

      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<Signuppage />} />
    </Routes>
  );
};
