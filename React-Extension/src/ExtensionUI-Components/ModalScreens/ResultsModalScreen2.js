import React from 'react';
import { Box, Typography, List, ListItem, Divider } from '@mui/material';

/**
 * The ResultsModalScreen2 component displays an analysis of the rule and best practices.
 * @param {Object} technical_analysis - An analysis of the rule.
 * @param {Array} best_practices - The best practices for this rule.
 * 
 * @returns The rendered ResultsModalScreen2 component.
 */
const ResultsModalScreen2 = ({ technical_analysis, best_practices }) => {
  const isCommonCausesArray = Array.isArray(technical_analysis?.common_causes);
  const isBestPracticesArray = Array.isArray(best_practices);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Common Causes
        </Typography>
        <List dense disablePadding>
          {isCommonCausesArray && technical_analysis.common_causes.length > 0 ? (
            technical_analysis.common_causes.map((cause, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <Typography variant="body1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                  • {cause}
                </Typography>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="text.disabled">
              No common causes available.
            </Typography>
          )}
        </List>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Best Practices
        </Typography>
        <List dense disablePadding>
          {isBestPracticesArray && best_practices.length > 0 ? (
            best_practices.map((practice, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <Typography variant="body1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                  • {practice}
                </Typography>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="text.disabled">
              No best practices available.
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default ResultsModalScreen2;