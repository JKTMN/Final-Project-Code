import React from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip } from "@mui/material";

const InformationButton = ({ onClick, item }) => {
    return (
        <Tooltip title={`Find out more about ${item}`} placement="top" arrow>
            <InfoOutlinedIcon color="active" onClick={onClick}/>
        </Tooltip>
    );
};

export default InformationButton;