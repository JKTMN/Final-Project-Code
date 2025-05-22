import React from "react";
import { Box, CircularProgress, Typography, Fade } from "@mui/material";

/**
 * A loading screen component that displays a circular progress indicator and a message.
 * @returns The LoadingScreen component.
 * 
 * @see https://mui.com/material-ui/react-progress/
 */
const LoadingScreen = () => {
    return (
        <Fade in timeout={900}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "100vw",
            backgroundColor: 'background.default',
          }}
        >
          <CircularProgress size={60} color="primary" />
          <Typography variant="h6" sx={{ mt: 2 }}>
              Loading, please wait...
          </Typography>
        </Box>
      </Fade>
    );
};

export default LoadingScreen;