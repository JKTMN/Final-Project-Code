import React from 'react';
import { Box, Typography, List, ListItem, Divider } from '@mui/material';

/**
 * The ResultsModalScreen2 component displays an analysis of the rule and best practices.
 * @param {Object} technical_analysis - An analysis of the rule.
 * @param {Array} best_practices - The best practices for this rule.
 * 
 * @returns The rendered ResultsModalScreen2 component.
 */
const ResultsModalScreen2 = ({ page, technical_analysis, best_practices }) => {
  const isCommonCausesArray = Array.isArray(technical_analysis?.common_causes);
  const isBestPracticesArray = Array.isArray(best_practices);

  return (
    <Box
      id={`results-modal-page-${page}-content`}
      role="region"
      aria-labelledby="results-modal-title"
      aria-live="polite"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Box>
        <Typography variant="h6" component="h3" id={`causes-heading-${page}`}>
          Common Causes
        </Typography>
        <List aria-labelledby={`causes-heading-${page}`} dense disablePadding>
          {isCommonCausesArray && technical_analysis.common_causes.length > 0 ? (
            technical_analysis.common_causes.map((cause, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <Typography variant="body1" color="text.secondary">
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
        <Typography variant="h6" component="h3" id={`practices-heading-${page}`}>
          Best Practices
        </Typography>
        <List aria-labelledby={`practices-heading-${page}`} dense disablePadding>
          {isBestPracticesArray && best_practices.length > 0 ? (
            best_practices.map((practice, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <Typography variant="body1" color="text.secondary">
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