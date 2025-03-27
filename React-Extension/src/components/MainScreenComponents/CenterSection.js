import React from "react";
import { Box, Typography } from "@mui/material";
import WebIframe from "../SubComponents/WebIframe";

/**
 * This component renders the queried url for audit in an iframe in the centre of the page.
 * @param {*} url - The queried url for audit and render. 
 * @returns The rendered iframe displaying the queried url.
 * 
 */
const CenterSection = ({ url }) => {
  return (
    <Box sx={{ width: "100%",height: "100%",}}>
      <WebIframe url={url} />
    </Box>
  );
};

export default CenterSection;