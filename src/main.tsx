import ReactDOM from "react-dom/client";
import "./index.css";
import { AppRouter } from "./routes/appRouter/AppRouter.tsx";
import { BrowserRouter } from "react-router-dom";
import SimpleBackdrop from "../src/components/backdrop";
import { SimpleSnackbar } from "./components/toast/SimpleSnackbar.tsx";
import FormContainer from "./components/formcontainer/FormContainer.tsx";
<link href="./output.css" rel="stylesheet"></link>;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SimpleBackdrop />
    <SimpleSnackbar />
    <FormContainer />
    <AppRouter />
  </BrowserRouter>
);
