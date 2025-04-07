import React from 'react';
import {Box,Typography,List,ListItem } from '@mui/material';

/**
 * The ResultsModalScreen3 component displays the code examples and shows how to fix the issue.
 * @param {Object} fixes - The fixes for the issue with a description.
 * @param {Object} code_examples - Two code examples, one before and one after the fix.
 * 
 * @returns The rendered ResultsModalScreen3 component.
 */
const ResultsModalScreen3 = ({fixes, code_examples}) => {

  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      <Box sx={{width: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        gap: 2, }}>
          <Typography variant="h4" flexWrap sx={{ fontWeight: 'bold', mb: 2 }}>
              {code_examples.before}
          </Typography>
      </Box>
      <Box sx={{width: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        gap: 2, }}>
          <Typography variant="h4" flexWrap sx={{ fontWeight: 'bold', mb: 2 }}>
              {code_examples.after}
          </Typography>
      </Box>
    </Box>
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
      <List sx={{ width: '100%'}}>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold'}}>
        Common Causes:
        </Typography>
        {fixes.map((item, index) => (
            <ListItem sx={{ pl: 0}}>
              <Typography variant="body" sx={{ textTransform: 'capitalize', color: 'text.primary' }}>
                • {item.step}
              </Typography>
            </ListItem>
        ))}
      </List>
    </Box>
    </>
  );
};

export default ResultsModalScreen3;