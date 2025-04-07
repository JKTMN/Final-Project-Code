import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

/**
 * A loading screen component that displays a circular progress indicator and a message.
 * @returns The LoadingScreen component.
 * 
 * @see https://mui.com/material-ui/react-progress/
 */
const LoadingScreen = () => {
    return (
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            bgcolor: "#f4f4f4",
        }}
        >
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
            Loading, please wait...
        </Typography>
        </Box>
    );
};

export default LoadingScreen;