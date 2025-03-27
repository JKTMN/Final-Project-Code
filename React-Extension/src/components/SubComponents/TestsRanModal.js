import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

/**
 * This component displays a modal with the details of a test.
 * It displays the title and description of the test.
 * 
 * @param {boolean} open - The state of the modal.
 * @param {function} handleClose - The function to close the modal.
 * @param {object} test - The test object to display.
 * @returns The rendered modal component.
 * 
 * @see https://mui.com/material-ui/react-modal/
 */
const TestsRanModal = ({ open, handleClose, test }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    borderRadius: 4,
                    boxShadow: 24,
                    bgcolor: 'background.default',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                {test && (
                    <>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: '#23222F',
                                mb: 0.5,
                                textTransform: 'capitalize',
                                textAlign: 'center',
                            }}
                        >
                            {test.title}
                        </Typography>

                        <Typography variant="body1" textAlign="center">
                            {test.description}
                        </Typography>

                        <Box
                            sx={{
                                mt: 3,
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
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
                                onClick={() => {}}
                            >
                                Next
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default TestsRanModal;