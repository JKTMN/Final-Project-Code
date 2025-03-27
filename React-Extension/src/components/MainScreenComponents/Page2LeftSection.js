import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button, Divider } from "@mui/material";
import BarChartTemplate from "../SubComponents/BarChartTemplate";

const Page2LeftSection = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                Left Section
            </Typography>
            <BarChartTemplate title="Graph 1" />
            <BarChartTemplate title="Graph 2" />
        </Box>
    );
};

export default Page2LeftSection;