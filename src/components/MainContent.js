import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import ViolationsList from "./ViolationsList";
import TestsRanList from "./TestsRanList";
import CenterSection from "./CenterSection";

const MainContent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "calc(100vh - 115px)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "25%",
          padding: 2,
          maxHeight: "100%",
          overflowY: "auto",
        }}
      >
        <ViolationsList />
      </Box>

      <Box
        sx={{
          width: "50%",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CenterSection />
      </Box>

      <Box
        sx={{
          width: "25%",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TestsRanList />
      </Box>
    </Box>
  );
};

export default MainContent;
