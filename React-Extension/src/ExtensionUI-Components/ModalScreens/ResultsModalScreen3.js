import React from 'react';
import { Box, Typography, List, ListItem, Divider, Paper } from '@mui/material';

/**
 * The ResultsModalScreen3 component displays the code examples and shows how to fix the issue.
 * @param {Object} fixes - The fixes for the issue with step descriptions.
 * @param {Object} code_examples - Two code examples, one before and one after the fix.
 * 
 * @returns The rendered ResultsModalScreen3 component.
 */
const ResultsModalScreen3 = ({ fixes, code_examples }) => {
  const isFixesArray = Array.isArray(fixes);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
        <Paper elevation={3} sx={{ p: 2, flex: 1, minWidth: '45%', bgcolor: 'grey.100' }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Before
          </Typography>
          <Box
            component="pre"
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: 'Monospace',
              fontSize: '0.875rem',
              p: 1,
              borderRadius: 1,
              bgcolor: 'background.paper',
              overflow: 'auto',
            }}
          >
            {code_examples?.before || "No example available."}
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 2, flex: 1, minWidth: '45%', bgcolor: 'grey.100' }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            After
          </Typography>
          <Box
            component="pre"
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: 'Monospace',
              fontSize: '0.875rem',
              p: 1,
              borderRadius: 1,
              bgcolor: 'background.paper',
              overflow: 'auto',
            }}
          >
            {code_examples?.after || "No example available."}
          </Box>
        </Paper>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          How to Fix
        </Typography>
        <List dense disablePadding>
          {isFixesArray && fixes.length > 0 ? (
            fixes.map((item, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <Typography variant="body1" color="text.secondary">
                  • {item.step}
                </Typography>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="text.disabled">
              No fix steps available.
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default ResultsModalScreen3;