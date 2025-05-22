// GuideCardContent.js
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Box, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const GuideCardContent = ({ 
  content, 
  currentIndex, 
  onPrev, 
  onNext 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: theme.shape.borderRadius,
        '&:hover': { boxShadow: theme.shadows[6] },
        transition: 'box-shadow 0.3s'
      }}
      aria-live="polite"
    >
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {content[currentIndex].title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {content[currentIndex].body}
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          // height: '50vh',
          mt: 4
        }}>
          <IconButton
            onClick={onPrev}
            aria-label="Previous guide"
            size={isMobile ? 'small' : 'medium'}
          >
            <KeyboardArrowLeft />
          </IconButton>

          <Typography variant="caption">
            {currentIndex + 1} / {content.length}
          </Typography>

          <IconButton
            onClick={onNext}
            aria-label="Next guide"
            size={isMobile ? 'small' : 'medium'}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GuideCardContent;