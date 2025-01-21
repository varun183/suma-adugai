import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import "./App.css";
import { Navbar } from "./customers/components/Navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./Theme/DarkTheme";
import Home from "./customers/pages/Home/Home";
import Menu from "./customers/pages/Menu/Menu";

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar />
        {/*<Home />*/}
        <Menu />
      </ThemeProvider>
    </>
  );
}

export default App;
