import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Divider, Tooltip, useTheme, useMediaQuery } from '@mui/material';
import { ChevronLeft, ChevronRight, ContentCopy } from '@mui/icons-material';

/**
 * CaptionCarouselOutput component
 * This component displays a carousel of images with captions.
 * Users can navigate through the images and copy the captions.
 * @param {Object} data - The data object containing image URLs and captions.
 * @param {Object} theme - The theme object for styling.
 * @param {boolean} isMobile - Flag to determine if the device is mobile.
 *  
 * @returns The rendered CaptionCarouselOutput component.
 */
const CaptionCarouselOutput = ({ data, theme, isMobile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === data.length - 1 ? 0 : prev + 1));
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(data[currentIndex].caption);
  };

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Card sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="textSecondary">No captions available</Typography>
      </Card>
    );
  }

  const current = data[currentIndex];

  return (
    <Card
      elevation={2}
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        minHeight: isMobile ? 'auto' : 'calc(100vh - 220px)',
        width: '100%',
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mb: 2
          }}
        >
          <IconButton onClick={handlePrev} aria-label="previous image">
            <ChevronLeft fontSize={isSmallScreen ? 'medium' : 'large'} />
          </IconButton>

          <Box
            component="img"
            src={current.src}
            alt={current.caption}
            sx={{
              width: '100%',
              maxHeight: 300,
              objectFit: 'contain',
              borderRadius: theme.shape.borderRadius,
              flexGrow: 1,
            }}
          />

          <IconButton onClick={handleNext} aria-label="next image">
            <ChevronRight fontSize={isSmallScreen ? 'medium' : 'large'} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
          {data.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: index === currentIndex ? 'primary.main' : 'action.disabled',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  bgcolor: index === currentIndex ? 'primary.dark' : 'action.hover'
                }
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            p: 2,
            backgroundColor: theme.palette.grey[100],
            borderRadius: 1,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, flexGrow: 1 }}>
            {current.caption}
          </Typography>
          <Tooltip title="Copy caption">
            <IconButton
              onClick={handleCopyCaption}
              size="small"
              sx={{ ml: 1 }}
              aria-label="copy caption"
            >
              <ContentCopy fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="subtitle2" gutterBottom>
          Example usage in HTML:
          </Typography>
          <Box
            component="pre"
            sx={{
              whiteSpace: 'pre-wrap',
              backgroundColor: theme.palette.grey[200],
              p: 0.5,
              borderRadius: 1,
              fontSize: '0.85rem',
            }}
          >
            {`<img src="example.png" alt="${current.caption}"/>`}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Use the <code>alt</code> attribute to describe the image. It improves accessibility
          for screen reader users and helps search engines understand your content.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CaptionCarouselOutput;