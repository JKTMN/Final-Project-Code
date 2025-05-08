/* global chrome */
import React, { useState, useEffect } from 'react';
import { Box, Grid, useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ImageUploadForm from '../ScreenComponents/ImageUploadForm';
import WebsiteCaptionForm from '../ScreenComponents/WebsiteCaptionForm';
import CaptionOutput from '../ScreenComponents/CaptionOutput';
import CaptionCarouselOutput from '../ScreenComponents/CaptionCarouselOutput';
import { generateCaptionFromFile, generateCaptionFromUrl, generateCaptionsFromWebsiteURL } from '../../functions/handleCaptionApiCall';

/**
 * CaptionGenerator component
 * 
 * This component renders the caption generator UI, allowing users to upload an image, enter an Image URL, or enter a website URL to generate captions for images.
 * It handles file uploads, URL inputs, and displays the generated captions.
 * 
 * @returns The rendered CaptionGenerator component.
 */
const AltTextGenerator = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [storedUrl, setStoredUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [batchCaptions, setBatchCaptions] = useState([]);

  useEffect(() => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get(['extensionUrl'], (result) => {
        setStoredUrl(result.extensionUrl || '');
        setWebsiteUrl(result.extensionUrl || '');
      });
    }
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreviewSrc(URL.createObjectURL(uploadedFile));
      setImageUrl('');
      setCaption('');
    }
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setPreviewSrc(e.target.value);
    setFile(null);
    setCaption('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setCaption('');
    setBatchCaptions([]);
    try {
      const data = file
        ? await generateCaptionFromFile(file)
        : await generateCaptionFromUrl(imageUrl);
      setCaption(data.caption || 'No caption received.');
    } catch (error) {
      setCaption(error.message || 'Error generating caption.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!caption) return;
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWebsiteSubmit = async () => {
    setLoading(true);
    setCaption('');
    setBatchCaptions([]);
    try {
      const results = await generateCaptionsFromWebsiteURL(websiteUrl);
      setBatchCaptions(results);
      console.log('Batch Captions:', results);
    } catch (error) {
      setCaption(error.message || 'Error generating captions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      <Typography variant="h4" fontWeight={600} mb={2} textAlign="center">
        Alt-Text Generator
      </Typography>
      <Box sx={{ pl: isMobile ? 0 : '80px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <ImageUploadForm
              imageUrl={imageUrl}
              handleUrlChange={handleUrlChange}
              handleFileChange={handleFileChange}
              file={file}
              handleSubmit={handleSubmit}
              loading={loading}
            />
            <WebsiteCaptionForm
              websiteUrl={websiteUrl}
              setWebsiteUrl={setWebsiteUrl}
              handleWebsiteSubmit={handleWebsiteSubmit}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            {loading ? (
              <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px dashed',
                borderRadius: 2
              }}>
                <Typography>Generating Alt-texts...</Typography>
              </Box>
            ) : (
              <>
                {batchCaptions.length > 0 ? (
                  <CaptionCarouselOutput data={batchCaptions} theme={theme} isMobile={isMobile}/>
                ) : caption ? (
                  <CaptionOutput
                    previewSrc={previewSrc}
                    caption={caption}
                    copied={copied}
                    handleCopy={handleCopy}
                    theme={theme}
                    isMobile={isMobile}
                  />
                ) : (
                  <Box sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px dashed',
                    borderRadius: 2
                  }}>
                    <Typography color="textSecondary">
                      Your generated alt-text will appear here
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AltTextGenerator;