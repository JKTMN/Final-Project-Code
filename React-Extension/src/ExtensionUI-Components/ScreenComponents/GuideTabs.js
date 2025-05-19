import React from 'react';
import { Tabs, Tab, useTheme } from '@mui/material';

const GuideTabs = ({ value, onChange }) => {
  const theme = useTheme();

  return (
    <Tabs 
      value={value}
      onChange={onChange}
      aria-label="Guide categories"
      variant="fullWidth"
      sx={{ 
        mb: 4,
        '& .MuiTabs-indicator': {
          height: 3,
          backgroundColor: theme.palette.primary.main,
        },
        '& .MuiTab-root': {
          textTransform: 'none',
          fontSize: '1rem',
          color: theme.palette.text.secondary,
          padding: '12px 24px',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.action.hover,
          },
          '&.Mui-selected': {
            color: theme.palette.primary.main,
            fontWeight: 600,
          }
        },
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Tab 
        label="Keyboard Navigation" 
        id="tab-0"
        aria-controls="tabpanel-0"
        sx={{
          minHeight: 48,
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            borderRadius: theme.shape.borderRadius
          }
        }}
      />
      <Tab 
        label="Screen Reader" 
        id="tab-1"
        aria-controls="tabpanel-1"
        sx={{
          minHeight: 48,
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            borderRadius: theme.shape.borderRadius
          }
        }}
      />
    </Tabs>
  );
};

export default GuideTabs;