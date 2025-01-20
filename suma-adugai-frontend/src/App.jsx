import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import "./App.css";
import { Navbar } from "./component/Navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./Theme/DarkTheme";
import Home from "./component/Home/Home";

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar />
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
