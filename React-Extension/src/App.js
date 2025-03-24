import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import TopBar from "./components/TopBar";
import MainContent from "./components/MainContent";
import { handleAxeApiCall } from "./functions/handleAxeApiCall";

/**
 * @file This s the main entry point for the React app.
 * It contains the root component and handles the app structure, routing, and rendering.
 * 
 * @returns The rendered React app.
 * @see https://react.dev/reference/react/useState
 */
function App() {
  const [violations, setViolations] = useState([]);
  const [testsRan, setTestsRan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUrl, setUrl] = useState("");

  const handleApiCall = async (url) => {
    setLoading(true);
    setError(null);
    setUrl(url);
    try {
      const { violations, testsRan } = await handleAxeApiCall(url, setLoading, setError);
      setViolations(violations);
      setTestsRan(testsRan);
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
      <MainContent violations={violations} testsRan={testsRan} loading={loading} error={error} url={newUrl}/>
    </ThemeProvider>
  );
}

export default App;