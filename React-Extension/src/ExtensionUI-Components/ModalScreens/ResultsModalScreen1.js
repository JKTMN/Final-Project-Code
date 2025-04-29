import React from 'react';
import { Box, Typography, Divider, useTheme } from '@mui/material';

/**
 * The ResultsModalScreen1 component displays the impact and description of an issue.
 * @param {Object} listItem - The list item containing information about the issue.
 * @param {string} issue_explanation - The explanation of the issue.
 * @param {Object} impact - The impact of the issue with a description.
 * 
 * @returns The rendered ResultsModalScreen1 component.
 */
const ResultsModalScreen1 = ({ listItem, issue_explanation, impact }) => {
  const theme = useTheme();

  const getImpactColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'n/a':
      case 'minor':
        return theme.palette.success.main;
      case 'moderate':
        return theme.palette.warning.main;
      case 'serious':
        return theme.palette.error.main;
      case 'critical':
        return theme.palette.error.dark;
      default:
        return theme.palette.text.primary;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Impact
        </Typography>
        <Typography variant="body1" sx={{ color: getImpactColor(listItem?.impact), textTransform: 'capitalize', fontWeight: 600 }}>
          {listItem?.impact || "Unknown"}
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Description
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {issue_explanation || "No description available."}
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Why This Matters
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {impact?.description || "No additional information provided."}
        </Typography>
      </Box>
    </Box>
  );
};

export default ResultsModalScreen1;