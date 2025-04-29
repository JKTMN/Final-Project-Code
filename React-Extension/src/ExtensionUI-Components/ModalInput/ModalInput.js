/* global chrome */
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

const validURL = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
};

/**
 * ModalOverlay Component
 * 
 * This component renders a modal overlay that allows the user to input a URL manually or use the current tab's URL.
 * It provides a text field for manual URL input and two buttons: one to run the audit with the entered URL and another to use the current tab's URL.
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
    const finalUrl = url.trim();
    if (!finalUrl || !validURL(finalUrl)) {
      alert('Please enter a valid URL (including http:// or https:// with a proper domain).');
      return;
    }
    storeAndOpen(finalUrl);
  };

  const handleUseCurrentUrl = () => {
    getCurrentTabUrl((currentUrl) => {
      if (currentUrl && validURL(currentUrl)) {
        storeAndOpen(currentUrl);
      } else {
        alert('Current tab URL is invalid or unavailable.');
      }
    });
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
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Accessibility Report</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            label="Enter a URL"
            variant="outlined"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button 
            variant="contained" 
            fullWidth
            onClick={handleManualSubmit}
            sx={{ mb: 1 }}
          >
            Run Audit
          </Button>

          <Button 
            variant="outlined" 
            fullWidth
            onClick={handleUseCurrentUrl}
          >
            Use Current URL
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalOverlay;
