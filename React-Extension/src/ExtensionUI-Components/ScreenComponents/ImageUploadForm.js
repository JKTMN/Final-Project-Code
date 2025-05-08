import React from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import InformationButton from '../SmallComponents/InformationButton';

/**
 * ImageUploadForm component
 * This component allows users to upload an image or enter an image URL to generate captions.
 * It includes a file input for image uploads and a text field for URL input.
 * @param {string} imageUrl - The URL of the image.
 * @param {function} handleUrlChange - Function to handle changes in the URL input field.
 * @param {function} handleFileChange - Function to handle file selection.
 * @param {File} file - The selected image file.
 * @param {function} handleSubmit - Function to handle the form submission.
 * @param {boolean} loading - Flag to indicate if the form is in a loading state.
 * 
 * @returns The rendered ImageUploadForm component.
 */
const ImageUploadForm = ({ imageUrl, handleUrlChange, handleFileChange, file, handleSubmit, loading}) => (
<Card>
    <CardContent>
    <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        mb: 2 
    }}>
        <Typography variant="h6" gutterBottom>
        Upload or Enter Image URL
        </Typography>
        <InformationButton 
        onclick={null}
        toolTip="Please ensure the image URL is publicly accessible and ends with .jpg, .jpeg, .png or .webp" 
        />
    </Box>

    <TextField
        fullWidth
        label="Image URL"
        variant="outlined"
        value={imageUrl}
        onChange={handleUrlChange}
        sx={{ mb: 2 }}
    />

    <Typography textAlign="center" variant="body2" mb={1}>
        or upload an image file
    </Typography>

    <Box sx={{ textAlign: 'center', mb: 1 }}>
        <Button variant="outlined" component="label">
        Choose File
        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>
        {file && (
        <Typography variant="body2" sx={{ mt: 1, wordBreak: 'break-word' }}>
            {file.name}
        </Typography>
        )}
    </Box>

    <Box textAlign="center" mt={3}>
        <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!(file || imageUrl) || loading}
        >
        {loading ? 'Loading...' : 'Generate Alt-text'}
        </Button>
    </Box>
    </CardContent>
</Card>
);

export default ImageUploadForm;