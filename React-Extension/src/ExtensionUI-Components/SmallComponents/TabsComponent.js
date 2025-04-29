import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

/**
 * TabsComponent Component
 * 
 * This component is responsible for rendering a set of tabs that allow the user to switch between different lists of audit results.
 * It also handles the selection of a specific list and updates the parent component accordingly.
 * 
 * @param {Function} setChosenList - Function to set the selected list in the parent component.
 * @param {Array} tabLabels - Array of tab labels and their corresponding counts.
 * 
 * @returns The rendered TabsComponent.
 */
const TabsComponent = ({ setChosenList, tabLabels }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));


  useEffect(() => {
    setChosenList(tabLabels[value][0]);
  }, [value, setChosenList, tabLabels]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTabStyles = (isSelected) => ({
    minWidth: 'auto',
    padding: isMobile ? '8px 12px' : '12px 20px',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    boxShadow: theme.shadows[1],
    backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.background.paper,
    '&:hover': {
      backgroundColor: isSelected ? theme.palette.primary.dark : theme.palette.primary.light,
    },
    height: 'auto',
    mb: 1
  });

  const getNumberStyles = (isSelected) => ({
    fontWeight: 600,
    fontSize: isMobile ? '16px' : '18px',
    color: isSelected ? theme.palette.common.white : theme.palette.text.primary,
  });

  const getLabelStyles = (isSelected) => ({
    fontWeight: 500,
    fontSize: isMobile ? '12px' : '14px',
    color: isSelected ? theme.palette.common.white : theme.palette.text.primary,
    paddingBottom: '2px',
  });

  return (
    <Box sx={{ 
      p: isMobile ? 2 : 3,
      width: '100%',
      maxWidth: '1200px',
      mx: 'auto'
    }}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        variant={isMobile ? "scrollable" : "fullWidth"}
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile
        sx={{
          '& .MuiTabs-indicator': {
            display: 'none',
          },
          '& .MuiTabs-flexContainer': {
            justifyContent: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '8px' : '12px',
            alignItems: 'flex-end',
          },
          width: '100%',
          height: '100%',
          p: 1,
        }}
      >
      {tabLabels.map(([label, count], index) => (
        <Tab
          key={index}
          label={
            <Box sx={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center",
              padding: '6px 0',
            }}>
              <Typography sx={getNumberStyles(value === index)}>
                {count}
              </Typography>
              <Typography sx={getLabelStyles(value === index)}>
                {label} 
              </Typography>
            </Box>
          }
          sx={getTabStyles(value === index)}
        />
      ))}
      </Tabs>
    </Box>
  );
};

export default TabsComponent;