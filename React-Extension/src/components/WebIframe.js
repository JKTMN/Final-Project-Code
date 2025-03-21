import React from 'react';
import { Box } from "@mui/material";

const WebIframe = ({url}) => {
    return (
        <Box
        sx={{
            width: "100%",
            height: "100%",
            border: "2px solid #23222F",
            borderRadius: "16px",
            padding: 2,
        }}
        >
            <iframe
            src={url}
            width="100%"
            height="100%"
            title="Embedded Website"
            style={{border: 'none'}}
            ></iframe>
        </Box>
    );
};

export default WebIframe;