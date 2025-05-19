import React from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import InformationButton from '../SmallComponents/InformationButton';

/**
 * WebsiteCaptionForm component
 * This component allows users to enter a website URL to generate captions for images found on that website.
 * It includes a text field for URL input and a button to submit the request.
 * If the user submitted a URL for auditing, it will be displayed in the text field as a default value.
 * * @param {string} websiteUrl - The URL of the website.
 * * @param {function} setWebsiteUrl - Function to set the website URL state.
 * * @param {function} handleWebsiteSubmit - Function to handle the form submission.
 * * @param {boolean} loading - Flag to indicate if the form is in a loading state.
 * 
 * @returns The rendered WebsiteCaptionForm component.
 */
const WebsiteCaptionForm = ({ websiteUrl, setWebsiteUrl, handleWebsiteSubmit, loading }) => (
  <Card sx={{ mt: 4 }}>
    <CardContent>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        mb: 2 
      }}>
        <Typography variant="h6" gutterBottom>
          Generate alt-text for Your Website
        </Typography>
        <InformationButton 
          onclick={null}
          toolTip="Notice: some images may not work due to restrictions. If you encounter issues, please try using the image upload feature." 
        />
      </Box>
      <TextField
        fullWidth
        label="Website URL"
        variant="outlined"
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box textAlign="center">
        <Button
          variant="contained"
          onClick={handleWebsiteSubmit}
          disabled={!websiteUrl.trim()}
        >
          {loading ? 'Loading...' : 'Generate Alt-text For Your Website'}
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default WebsiteCaptionForm;