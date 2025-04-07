import React from 'react';
import {Box,Typography,List,ListItem} from '@mui/material';

/**
 * The ResultsModalScreen2 component displays an analysis of the rule and best practices.
 * @param {Object} technical_analysis - An analysis of the rule.
 * @param {Object} best_practices - The best practices for this rule.
 * 
 * @returns The rendered ResultsModalScreen2 component.
 */
const ResultsModalScreen2 = ({ technical_analysis, best_practices }) => {

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
        py: 1,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        gap: 2,
        }}
    > 
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      <List sx={{ width: '100%'}}>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold'}}>
        Common Causes:
        </Typography>
        {technical_analysis.common_causes.map((item, index) => (
            <ListItem sx={{ pl: 0}}>
              <Typography variant="body" sx={{ textTransform: 'capitalize', color: 'text.primary' }}>
                • {item}
              </Typography>
            </ListItem>
        ))}
      </List>
      <List sx={{ width: '100%'}}>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold'}}>
        Best Practices:
        </Typography>
        {best_practices.map((item, index) => (
            <ListItem sx={{ pl: 0}}>
              <Typography variant="body" sx={{ textTransform: 'capitalize', color: 'text.primary' }}>
                • {item}
              </Typography>
            </ListItem>
        ))}
      </List>
    </Box>
    </Box>
  );
};

export default ResultsModalScreen2;