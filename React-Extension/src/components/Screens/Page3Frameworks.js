import { Typography, Box } from "@mui/material";
import React from "react";

/**
 * The Page3Frameworks Screen component.
 * @returns 
 */
const Page3Frameworks = () => {

    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "calc(100vh - 115px)", overflow: "hidden" }}>
        <Box sx={{ width: "30%", px: 3, pt: 1.5, maxHeight: "100%", overflowY: "auto", direction: "rtl", "& > *": {direction: "ltr"} }}>
            <Box sx={{bgcolor: 'green'}}></Box>
        </Box>
  
        <Box sx={{ width: '1px', height: '100%', bgcolor: 'divider', mx: 0.5 }} />
  
        <Box sx={{ width: "50%", px: 3, pt: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{bgcolor: 'blue'}}></Box>
        </Box>
        
        <Box sx={{ width: '1px', height: '100%', bgcolor: 'divider', mx: 0.5 }} />
  
        <Box sx={{ width: "30%", px: 3, pt: 1.5, maxHeight: "100%", overflowY: "auto" }}>
          <Box sx={{bgcolor: 'red'}}></Box>
        </Box>
      </Box>
    );
};

export default Page3Frameworks;