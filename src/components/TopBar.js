import React from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Box } from "@mui/material";

const TopBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#23222F", padding: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
        <Typography variant="h1" sx={{ color: "#F5F5F5", fontSize: "1.75rem", position: "absolute", left: 20 }}>
          Dashboard
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="body1" sx={{ color: "#F5F5F5", fontWeight: 600, marginBottom: "4px" }}>
            Enter a URL
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "#F5F5F5", padding: "6px", borderRadius: "8px" }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter text..."
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
            />
            <Button variant="contained" sx={{ backgroundColor: "#21A0C0", color: "white", "&:hover": { backgroundColor: "#1984a0" } }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;