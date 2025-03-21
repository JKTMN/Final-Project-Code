import React from "react";
import { Box, Typography } from "@mui/material";
import WebIframe from "./WebIframe";

const CenterSection = ({ url }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 2, textAlign: "center" }}>
        Title
      </Typography>
        <WebIframe url={url} />
    </Box>
  );
};

export default CenterSection;
