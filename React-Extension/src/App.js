import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import TopBar from "./components/TopBar";
import MainContent from "./components/MainContent";
import axios from "axios";

function App() {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUrl, setUrl] = useState("");

  const handleApiCall = async (url) => {
    setLoading(true);
    setError(null);
    setUrl(url);

    try {
      const response = await axios.post("http://localhost:3001/api/audit", { url });
      setViolations(response.data.violations);
    } catch (err) {
      setError("Error fetching the violations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar onSubmit={handleApiCall} />
      <MainContent violations={violations} loading={loading} error={error} url={newUrl}/>
    </ThemeProvider>
  );
}

export default App;