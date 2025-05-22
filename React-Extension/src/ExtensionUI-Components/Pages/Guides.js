import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import GuideTabs from '../ScreenComponents/GuideTabs';
import GuideContent from '../ScreenComponents/GuideContent';
import { filterManualGuides } from '../../functions/filterManualGuides';

const Guides = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedTab, setSelectedTab] = useState(0);
  const [content] = useState(filterManualGuides());
  const headingRef = useRef(null);

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  const currentGuide = content[Object.keys(content)[selectedTab]];

  return (
    <Box sx={{ 
      p: isMobile ? 2 : 3,
      maxWidth: 1440,
      margin: '0 auto'
    }}>
      <Typography 
        ref={headingRef}
        tabIndex={-1}
        variant="h4" 
        component="h1"
        fontWeight={600} 
        mb={4} 
        textAlign="center"
        sx={{ color: theme.palette.text.primary }}
      >
        Accessibility Guides
      </Typography>
      
      <Box sx={{ pl: isMobile ? 0 : '80px' }}>
        <GuideTabs 
          value={selectedTab} 
          onChange={(e, v) => handleTabChange(v)} 
        />

        <Box 
          role="region"
          aria-labelledby={`tab-${selectedTab}`}
          sx={{ mt: 4 }}
        >
          <GuideContent 
            topic={currentGuide[0]} 
            isMobile={isMobile}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Guides;