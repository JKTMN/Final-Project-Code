import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

/**
 * This component displays a modal with the details of a violation.
 * It displays the id, impact, and description of the violation.
 * @param {*} open - The state of the modal.
 * @param {*} handleClose - The function to close the modal.
 * @param {*} violation - The violation object to display.
 * @returns The rendered modal component.
 * 
 * @see https://mui.com/material-ui/react-modal/
 */
const ViolationModal = ({ open, handleClose, violation }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          border: '2px',
          borderRadius: 4,
          boxShadow: 24,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          p: 4,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f4f4f4',
            height: '50px',
            width: '45%',
            borderRadius: '8px',
            bgcolor: 'background.paper',
            padding: 2,
            boxShadow: 2,
          }}
        >
          {violation && violation.nodes && violation.nodes.length > 0 && violation.nodes[0].html ? (
            <iframe srcdoc={violation.nodes[0].html} width="100%" height="100%" />
          ) : (
            <Typography>No HTML content available for rendering.</Typography>
          )}
        </Box>

        <Box
          sx={{
            width: '60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            gap: 2,
          }}
        >
          {violation && (
            <>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                Found Violation: {violation.id}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <strong>Impact:</strong> {violation.impact}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <strong>Description:</strong> {violation.description}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <strong>Help:</strong> {violation.help}
              </Typography>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', justifyItems: 'center', width: '100%' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#21A0C0',
                    color: 'white',
                    '&:hover': { backgroundColor: '#1984a0' },
                    flexGrow: 1,
                    marginRight: 1,
                  }}
                  onClick={handleClose}
                >
                  Close
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    '&:hover': { backgroundColor: '#45a049' },
                    flexGrow: 1,
                    marginLeft: 1,
                  }}
                  onClick={null}
                >
                  Next
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ViolationModal;