import React, { useState } from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Box } from "@mui/material";
import NavSwitch from "../SubComponents/NavSwitch";
import { removeScheme } from "../../functions/utilityFunctions";

/**
 * This component is a header for the webpage which displays a title and input form for the user to enter a URL.
 * @param {*} onSubmit The function to call when the user submits a URL.
 * @returns The rendered header component.
 * 
 * @see https://mui.com/material-ui/react-app-bar/
 */
const TopBar = ({ onSubmit, setActivePage }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (url) {
      onSubmit(url);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#23222F", padding: 2 }}>
      <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        <NavSwitch setActivePage={setActivePage}/>

        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
          }}
        >
          {url ? `Auditing: ${removeScheme(url)}` : "Accessibility Auditor"}
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

      </Toolbar>
    </AppBar>
  );
};

export default TopBar;