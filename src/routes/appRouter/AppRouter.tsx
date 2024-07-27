import { Route, Routes } from "react-router-dom";
import Loginpage from "../../pages/loginpage";
import Layout from "../../Layout/Layout";
import Contentpage from "../../pages/contentpage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Contentpage />
          </Layout>
        }
      />
      <Route path="login" element={<Loginpage />} />
    </Routes>
  );
};
