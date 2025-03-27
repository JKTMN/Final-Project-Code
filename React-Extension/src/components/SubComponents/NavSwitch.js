import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";

/**
 * This component is used for switching between different pages in the application.
 * It takes a function to set the active page and manages the local view state.
 * The component renders three boxes representing different pages, and the active page is highlighted.
 * @param {function} setActivePage - The function to set the active page.
 * @returns The rendered NavSwitch component.
 */
const NavSwitch = ({ setActivePage }) => {
    const [view, setLocalView] = useState("page1");
    const theme = useTheme();

    const handleViewChange = (newView) => {
        setLocalView(newView);
        setActivePage(newView);
    };

    return (
        <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "hidden",
        width: "auto",
        p: 2}}>
            
        {["page1", "page2", "page3"].map((page, index) => (
            <Box
            key={page}
            id={page}
            sx={{
                border: 1,
                borderRadius: 1,
                p: 1,
                m: 0.5,
                cursor: "pointer",
                bgcolor: view === page ? theme.palette.active.main : theme.palette.inactive.main,
                transition: "background-color 0.3s ease",
            }} onClick={() => handleViewChange(page)}>

                <Typography>
                    {page === "page1" ? "Report" : page === "page2" ? "Metrics" : "Frameworks"}
                </Typography>
            </Box>
        ))}
        </Box>
    );
};

export default NavSwitch;
