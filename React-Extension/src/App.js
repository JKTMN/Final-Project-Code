import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import TopBar from "./components/Screens/TopBar";
import { handleAxeApiCall } from "./functions/handleAxeApiCall";
import Page1Report from "./components/Screens/Page1Report";
import Page2Metrics from "./components/Screens/Page2Metrics";
import Page3Frameworks from "./components/Screens/Page3Frameworks";

/**
 * @file This s the main entry point for the React app.
 * It contains the root component and handles the app structure, routing, and rendering.
 * 
 * @returns The rendered React app.
 * @see https://react.dev/reference/react/useState
 */
function App() {
  const [passes, setPasses] = useState([]);
  const [violations, setViolations] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [inapplicable, setInapplicable] = useState([]);
  const [testsRan, setTestsRan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUrl, setUrl] = useState("");
  const [activePage, setActivePage] = useState("page1")

  const handleApiCall = async (url) => {
    setLoading(true);
    setError(null);
    setUrl(url);
    try {
      const { passes, violations, incomplete, inapplicable, testsRan } = await handleAxeApiCall(url, setLoading, setError);
      setPasses(passes);
      setViolations(violations);
      setIncomplete(incomplete);
      setInapplicable(inapplicable);
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
      <TopBar onSubmit={handleApiCall} setActivePage={setActivePage}/>
      {activePage === "page1" ? (
        <Page1Report passes={passes} violations={violations} incomplete={incomplete} inapplicable={inapplicable} testsRan={testsRan} loading={loading} error={error} url={newUrl} />
      ) : activePage === "page2" ? (
        <Page2Metrics />
      ) : (
        <Page3Frameworks />
      )}
    </ThemeProvider>
  );
}

export default App;