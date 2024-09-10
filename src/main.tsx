import ReactDOM from "react-dom/client";
import "./index.css";
import { AppRouter } from "./routes/appRouter/AppRouter.tsx";
import { BrowserRouter } from "react-router-dom";
import SimpleBackdrop from "../src/components/backdrop";
import { SimpleSnackbar } from "./components/toast/SimpleSnackbar.tsx";
import WelcomeMessage from "./components/WelcomeMessage.tsx";
<link href="./output.css" rel="stylesheet"></link>;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SimpleBackdrop />
    <SimpleSnackbar />
    <WelcomeMessage />
    <AppRouter />
  </BrowserRouter>
);
