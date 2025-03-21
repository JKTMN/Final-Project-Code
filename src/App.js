import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import TopBar from "./components/TopBar";
import MainContent from "./components/MainContent";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <MainContent />
    </ThemeProvider>
  );
}

export default App;
