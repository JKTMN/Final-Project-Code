import React from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip } from "@mui/material";

/**
 * The InformationButton component renders an information icon with a tooltip.
 * 
 * @param {String} toolTip - The tooltip text to be displayed on hover 
 * @returns The rendered InformationButton component
 */
const InformationButton = ({ onClick, toolTip }) => {
    return (
        <Tooltip title={toolTip} placement="top" arrow>
            <InfoOutlinedIcon color="active" onClick={onClick}/>
        </Tooltip>
    );
};

export default InformationButton;