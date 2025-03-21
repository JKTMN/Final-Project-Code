import React from "react";
import { Box, Typography } from "@mui/material";

const CenterSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, marginBottom: 2 }}>
        Title
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          border: "2px solid #23222F",
          borderRadius: "16px",
          padding: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Typography variant="body1" sx={{ color: "#23222F" }}>
          Content goes here
        </Typography>
      </Box>
    </Box>
  );
};

export default CenterSection;