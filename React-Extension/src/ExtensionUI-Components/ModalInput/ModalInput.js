/* global chrome */
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { handleHealthCheck } from '../../functions/handleHealthCheck';
import { validURL } from '../../functions/utilityFunctions';

const modalStyle = {
  position: 'fixed',
  top: '20px',
  left: '20px',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 3,
  zIndex: 9999
};

/**
 * ModalOverlay Component
 * 
 * This component renders a modal overlay that allows the user to input a URL manually or use the current tab's URL.
 * It provides a text field for manual URL input and two buttons: one to run the audit with the entered URL and another to use the current tab's URL.
 * There is also a button to open the image caption generator.
 * @param {Boolean} open - Indicates whether the modal is open or closed.
 * @param {Function} onClose - Callback function to close the modal.
 * 
 * @returns {JSX.Element} The rendered ModalOverlay component.
 * 
 * @see https://developer.chrome.com/docs/extensions/reference/api/tabs
 * @see https://developer.chrome.com/docs/extensions/reference/api/storage
 * @see https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 */
const ModalOverlay = ({ open, onClose }) => {
  const [url, setUrl] = useState('');
  const [isServerOnline, setIsServerOnline] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const checkServerStatus = async () => {
      const isOnline = await handleHealthCheck();
      setIsServerOnline(isOnline);
    };

    checkServerStatus();
  }, [open, url]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const getCurrentTabUrl = (callback) => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        callback(tabs[0]?.url || '');
      });
    } else {
      callback(window.location.href);
    }
  };

  const handleManualSubmit = () => {
    if (!isServerOnline) {
      window.alert('Server is offline. Please check the server status or try again later.');
      return;
    }
    const finalUrl = url.trim();
    try {
      if (!validURL(finalUrl)) {
        window.alert('Please enter a valid URL (including http:// or https:// with a proper domain).');
      } else {
        storeAndOpen(finalUrl);
      }
    } catch (error) {
      console.error('Error in URL validation:', error);
      window.alert('An error occurred while validating the URL. Please try again.');
    }
  };

  const handleUseCurrentUrl = () => {
    if (!isServerOnline) {
      window.alert('Server is offline. Please check the server status or try again later.');
      return;
    }
    getCurrentTabUrl((currentUrl) => {
      if (currentUrl && validURL(currentUrl)) {
        storeAndOpen(currentUrl);
      } else {
        window.alert('Current tab URL is invalid or unavailable.');
      }
    });
  };

  const handleOpenCaptionGenerator = () => {
    if (chrome?.tabs?.create) {
      chrome.tabs.create({
        url: chrome.runtime.getURL('index.html#/main-ui/alt-text-generator/')
      });
    }
    onClose();
  };

  const handleOpenManualGuides = () => {
    if (chrome?.tabs?.create) {
      chrome.tabs.create({
        url: chrome.runtime.getURL('index.html#/main-ui/guides/')
      });
    }
    onClose();
  };

  const storeAndOpen = (targetUrl) => {
    if (chrome?.storage?.local) {
      chrome.storage.local.set({ extensionUrl: targetUrl }, () => {
        if (chrome?.tabs?.create) {
          chrome.tabs.create({
            url: chrome.runtime.getURL('index.html#/main-ui')
          });
        }
      });
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="modal-title" variant="h6">Accessibility Report</Typography>
          <IconButton
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mt: 2 }} id="modal-description">
          <TextField
            id="manual-url-input"
            inputRef={inputRef}
            label="Enter a URL"
            variant="outlined"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{ mb: 2 }}
            aria-describedby="url-instructions"
          />
          <Typography id="url-instructions" sx={{ mb: 2 }} variant="body2">
            Include https:// or http:// and a valid domain.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            onClick={handleManualSubmit}
            sx={{ mb: 1 }}
            aria-label="Run audit with the entered URL"
          >
            Run Audit
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={handleUseCurrentUrl}
            aria-label="Use the current tab's URL for the audit"
          >
            Use Current URL
          </Button>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Typography id="modal-title-2" variant="h6">Or use one of the other tools:</Typography>
        <Button
          sx={{ my: 2}}
          variant="outlined"
          fullWidth
          onClick={handleOpenCaptionGenerator}
          aria-label="Open the alt text generator tool"
        >
          Open Alt-text Generator
        </Button>

        <Button
          sx={{ my: 1}}
          variant="outlined"
          fullWidth
          onClick={handleOpenManualGuides}
          aria-label="Open the manual guides page"
        >
          Open Manual Guides
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalOverlay;