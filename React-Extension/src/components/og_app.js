import React, { useEffect, useState } from "react";
import { ThemeProvider, CssBaseline, Typography, Box } from "@mui/material";
import theme from "../theme";
import TopBar from "./Screens/TopBar";
import { handleAxeApiCall } from "../functions/handleAxeApiCall";
import Page1Report from "./Screens/Page1Report";
import Page2Metrics from "./Screens/Page2Metrics";
import Page3Frameworks from "./Screens/Page3Frameworks";
import LoadingScreen from "./Screens/LoadingScreen";
import { useLocation } from "react-router-dom";

/**
 * @file This s the main entry point for the React app.
 * It contains the root component and handles the app structure, routing, and rendering.
 * 
 * @returns The rendered React app.
 * @see https://react.dev/reference/react/useState
 */
function OG_app({ url }) {
  const [passes, setPasses] = useState([]);
  const [violations, setViolations] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [inapplicable, setInapplicable] = useState([]);
  const [testsRan, setTestsRan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUrl, setUrl] = useState("");
  const [activePage, setActivePage] = useState("page1");
  const [dataLoaded, setDataLoaded] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryUrl = queryParams.get("url");

  const handleApiCall = async (targetUrl) => {
    setLoading(true);
    setError(null);
    setUrl(targetUrl); // Update for display
    try {
      setDataLoaded(false);
      const { passes, violations, incomplete, inapplicable, testsRan } =
        await handleAxeApiCall(targetUrl, setLoading, setError);
      setPasses(passes);
      setViolations(violations);
      setIncomplete(incomplete);
      setInapplicable(inapplicable);
      setTestsRan(testsRan);
      setDataLoaded(true);
    } catch (err) {
      setError("Error fetching the violations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (queryUrl) {
      alert("Auditing: " + queryUrl);
      handleApiCall(queryUrl);
    } else {
      alert("Please enter a URL to audit.");
    }
  }, [queryUrl]);
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar setActivePage={setActivePage} url={url} />
      {!dataLoaded && !loading ? (
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 115px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
            Enter a URL to get started
          </Typography>
        </Box>
      ) : loading ? (
        <LoadingScreen />
      ) : dataLoaded && activePage === "page1" ? (
        <Page1Report
          passes={passes}
          violations={violations}
          incomplete={incomplete}
          inapplicable={inapplicable}
          testsRan={testsRan}
          loading={loading}
          error={error}
          url={newUrl}
        />
      ) : activePage === "page2" ? (
        <Page2Metrics />
      ) : (
        <Page3Frameworks />
      )}
    </ThemeProvider>
  );
}

export default OG_app;
