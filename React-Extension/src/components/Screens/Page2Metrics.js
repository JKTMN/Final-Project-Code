import { Box, Typography } from '@mui/material';
import React from "react";
import Page2LeftSection from '../MainScreenComponents/Page2LeftSection';
import CenterSection from '../MainScreenComponents/CenterSection';

const Page2Metrics = () => {

    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "calc(100vh - 115px)", overflow: "hidden" }}>
        <Box sx={{ width: "30%", px: 3, pt: 1.5, maxHeight: "100%", overflowY: "auto", direction: "rtl", "& > *": {direction: "ltr"} }}>
          <Page2LeftSection />
        </Box>
  
        <Box sx={{ width: '1px', height: '100%', bgcolor: 'divider', mx: 0.5 }} />
  
        <Box sx={{ width: "50%", px: 3, pt: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <CenterSection url={"https://www.bucss.net"}/>
        </Box>
        
        <Box sx={{ width: '1px', height: '100%', bgcolor: 'divider', mx: 0.5 }} />
  
        <Box sx={{ width: "30%", px: 3, pt: 1.5, maxHeight: "100%", overflowY: "auto" }}>
          <Page2LeftSection />
        </Box>
      </Box>
    );
};

export default Page2Metrics;