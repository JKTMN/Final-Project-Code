import React, { useState } from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Box } from "@mui/material";

/**
 * This component is a header for the webpage which displays a title and input form for the user to enter a URL.
 * @param {*} onSubmit The function to call when the user submits a URL.
 * @returns The rendered header component.
 * 
 * @see https://mui.com/material-ui/react-app-bar/
 */
const TopBar = ({ onSubmit }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (url) {
      onSubmit(url);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#23222F", padding: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
              placeholder="Enter URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#21A0C0", color: "white", "&:hover": { backgroundColor: "#1984a0" } }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;