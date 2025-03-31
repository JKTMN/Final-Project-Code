import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ViolationsList from "../MainScreenComponents/ViolationsList";
import TestsRanList from "../MainScreenComponents/TestsRanList";
import CenterSection from "../MainScreenComponents/CenterSection";

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
const Page1Report = ({ violations, testsRan, loading, error, url }) => {
  const [violationHightlight, setViolationHighlight] = useState(false);

  useEffect(() => {
    if (violationHightlight) {
      alert("Highlighting violations is enabled. Click on the violation to see more details.");
    }
  }, [violationHightlight]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "calc(100vh - 115px)", overflow: "hidden" }}>
      <Box sx={{ width: "30%", px: 3, pt: 1.5, maxHeight: "100%", overflowY: "auto", direction: "rtl", "& > *": {direction: "ltr"} }}>
        <ViolationsList violations={violations} setViolationHighlight={setViolationHighlight} />
      </Box>

      <Box sx={{ width: '1px', height: '100%', bgcolor: 'divider', mx: 0.5 }} />

      <Box sx={{ width: "50%", px: 3, pt: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <CenterSection url={url}/>
      </Box>
      
      <Box sx={{ width: '1px', height: '100%', bgcolor: 'divider', mx: 0.5 }} />

      <Box sx={{ width: "30%", px: 3, pt: 1.5, maxHeight: "100%", overflowY: "auto" }}>
        <TestsRanList testsRan={testsRan} />
      </Box>
    </Box>
  );
};

export default Page1Report;