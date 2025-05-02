import React from 'react';
import { Box, Typography, Paper, IconButton, Divider, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

/**
 * CaptionOutput component
 * This component displays the caption output for the uploaded image or image URL.
 * It includes a preview of the image, the generated caption, and an option to copy the caption.
 * @param {previewSrc} - The source URL of the image preview.
 * @param {caption} - The generated caption for the image.
 * @param {copied} - Flag to indicate if the caption has been copied.
 * @param {handleCopy} - Function to handle the copy action.
 * @param {theme} - The theme object for styling.
 * @param {isMobile} - Flag to determine if the device is mobile.
 * 
 * @returns The rendered CaptionOutput component.
 */
const CaptionOutput = ({ previewSrc, caption, copied, handleCopy, theme, isMobile }) => (
  <Paper
    elevation={2}
    sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      minHeight: isMobile ? 'auto' : 'calc(100vh - 220px)',
    }}
  >
    {previewSrc ? (
      <>
        <Box
          component="img"
          src={previewSrc}
          alt="Uploaded preview"
          sx={{
            width: '100%',
            maxHeight: 300,
            objectFit: 'contain',
            borderRadius: theme.shape.borderRadius,
            mb: 2,
          }}
        />

        <Box
          sx={{
            p: 2,
            backgroundColor: theme.palette.grey[100],
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            mb: 1, //2
          }}
        >
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            {caption || 'Caption will appear here'}
          </Typography>
          {caption && (
            <Tooltip title={copied ? 'Copied!' : 'Copy caption'}>
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {caption && (
          <>
            <Divider sx={{ my: 1 }} /> {/*2*/}
            <Typography variant="subtitle1" gutterBottom> 2
              Example usage in HTML:
            </Typography>
            <Box
              component="pre"
              sx={{
                backgroundColor: theme.palette.grey[200],
                p: 2,
                borderRadius: 1,
                overflowX: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              }}
            >
              {`<img src="example.jpg" alt="${caption}" />`}
            </Box>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Use the <code>alt</code> attribute to describe the image. It improves accessibility
              for screen reader users and helps search engines understand your content.
            </Typography>
          </>
        )}
      </>
    ) : (
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        sx={{ mt: 5 }}
      >
        Image preview and caption will appear here after submission.
      </Typography>
    )}
  </Paper>
);

export default CaptionOutput;