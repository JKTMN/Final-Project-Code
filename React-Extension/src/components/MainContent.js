import React from "react";
import { Box } from "@mui/material";
import ViolationsList from "./ViolationsList";
import TestsRanList from "./TestsRanList";
import CenterSection from "./CenterSection";

/**
 * This is the MainContent component that displays the main content of the app.
 * It contains the ViolationsList, CenterSection, and TestsRanList components.
 * @param {*} violations The list of violations found.
 * @param {*} testsRan The list of tests ran. 
 * @param {*} URL The URL of the audited page. 
 * 
 * @returns The rendered MainContent component.
 * @see https://mui.com/material-ui/customization/how-to-customize/
 */
const MainContent = ({ violations, testsRan, loading, error, url }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "calc(100vh - 115px)", overflow: "hidden" }}>
      <Box sx={{ width: "25%", px: 3, pt: 1.5, maxHeight: "100%", overflowY: "auto", direction: "rtl", "& > *": {direction: "ltr"} }}>
        <ViolationsList violations={violations} />
      </Box>

      <Box sx={{ width: "50%", padding: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <CenterSection url={url}/>
      </Box>

      <Box sx={{ width: "25%", px: 3, pt: 1.5, maxHeight: "100%", overflowY: "auto" }}>
        <TestsRanList testsRan={testsRan} />
      </Box>
    </Box>
  );
};

export default MainContent;