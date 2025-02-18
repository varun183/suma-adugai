import "./index.css";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./Theme/DarkTheme";
import CustomerRoutes from "./Routers/CustomerRoutes";
import SearchPage from "./customers/pages/SearchPage/SearchPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Auth/authThunks";
import store from "./State/Store/store";
import Menu from "./customers/pages/Menu/Menu";
import Routers from "./Routers/Routes";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [auth.jwt]);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Routers />
      </ThemeProvider>
    </>
  );
}

export default App;
