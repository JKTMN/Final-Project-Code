import React, { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import WebIframe from "../SmallComponents/WebIframe";
import HighlightSwitch from "../SmallComponents/HighlightSwitch";

/**
 * DashboardRight Component
 * 
 * This component is responsible for rendering the right side of the dashboard.
 * It includes a switch to highlight violations and an iframe to display the webpage.
 * 
 * @param {String} url - The URL to be displayed in the iframe.
 * @param {String} chosenList - The selected list of violations to be highlighted. 
 * @returns The rendered DashboardRight component.
 */
const DashboardRight = ({ url, chosenList, auditResults }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [violationHightlght, setViolationHighlight] = useState(false); //default to true

  return (
    <Box
    role="region"
    aria-label="Rendered webpage preview"
    tabIndex={0} 
    sx={{ 
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      px: isMobile ? 1 : 2,
      pt: isMobile ? 1 : 4,
      pb: isMobile ? 1 : 2,
    }}>
      <Box sx={{
        flex: 1,
        overflow: "hidden",
      }}>
        <WebIframe url={url} />
      </Box>
    </Box>
  );
};

export default DashboardRight;