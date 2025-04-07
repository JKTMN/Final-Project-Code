import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * The ResultsModalScreen1 component displays the impact and description of an issue.
 * @param {Object} listItem - The list item containing information about the issue.
 * @param {Object} issue_explanation - The explanation of the issue.
 * @param {Object} impact - The impact of the issue with a description.
 * 
 * @returns The rendered ResultsModalScreen1 component.
 */
const ResultsModalScreen1 = ({listItem, issue_explanation, impact}) => {
    return (
        <Box
            sx={{
            width: '100%',
            minHeight: '85%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            px: 3,
            py: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            gap: 2,
            }}
        > 
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <strong>Impact:</strong>
            <Typography
            variant="body1"
            component="span"
            sx={{
                color:
                listItem.impact === "N/A" ? "green" :
                listItem.impact === "minor" ? "green" :
                listItem.impact === "moderate" ? "orange" :
                listItem.impact === "serious" ? "red" :
                listItem.impact === "critical" ? "darkred" : "black",
                textTransform: "capitalize"
            }}
            >
            {listItem.impact}
            </Typography>
            </Typography>
        </Box>
        <Typography>
        <strong>Description:</strong> {issue_explanation}
        </Typography>
        <Typography variant="body1" color="text.secondary">
            <strong>Why this matters:</strong> {impact.description}
        </Typography>
    </Box>
    );
};

export default ResultsModalScreen1;