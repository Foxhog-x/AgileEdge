import { Route, Routes } from "react-router-dom";

import Homepage from "../../pages/homepage";
import Loginpage from "../../pages/loginpage";
import Layout from "../../Layout/Layout";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="login" element={<Loginpage />} />
    </Routes>
  );
};
