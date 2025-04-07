import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import ResultsModalScreen1 from '../small components/ResultsModalScreen1';
import ResultsModalScreen2 from '../small components/ResultsModalScreen2';
import { filterFrameworkContent } from '../../functions/filterFrameworkContent';
import ResultsModalScreen3 from '../small components/ResultsModalScreen3';
import { removeHyphen } from '../../functions/utilityFunctions';
import InformationButton from '../small components/InformationButton';

/**
 * This component displays a modal with the details of a violation.
 * It displays information about the violation, including its impact, technical analysis, fixes, and best practices.
 * The modal has three pages, which can be navigated using the "Next" and "Back" buttons.
 * 
 * @param {*} open - The state of the modal.
 * @param {*} handleClose - The function to close the modal.
 * @param {*} listItem - The violation object to display.
 * @returns The rendered modal component.
 * 
 * @see https://mui.com/material-ui/react-modal/
 */
const ResultsModal = ({ open, handleClose, listItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [frameworkContent, setFrameworkContent] = useState(null);

  const { issue_explanation, wcag_guidelines, impact, technical_analysis, fixes, best_practices, code_examples, resources } = frameworkContent || {};

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handleBack = () => setCurrentPage((prev) => prev - 1);

  useEffect(() => {
    if (!open) {
      setCurrentPage(1);
    }
  }, [open]);
  
  useEffect(() => {
      if (listItem) {
          const frameworkContent = filterFrameworkContent(listItem.id);
          setFrameworkContent(frameworkContent);
          console.log("Framework Content", frameworkContent);
      }
  }, [listItem]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '55%',
          minHeight: '60%',
          border: '2px',
          borderRadius: 4,
          boxShadow: 24,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          px: 2,
          py: 3,
          display: 'flex',
          flexDirection:'column',
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, alignSelf: 'center', textTransform: 'capitalize' }}>
          {removeHyphen(listItem?.id)}
        </Typography>

        {currentPage === 1 ? (
          <ResultsModalScreen1 listItem={listItem} issue_explanation={issue_explanation} impact={impact}/>
        ) : currentPage === 2 ? (
          <ResultsModalScreen2 technical_analysis={technical_analysis} best_practices={best_practices} />
        ) : (
          <ResultsModalScreen3 listItem={listItem} fixes={fixes} code_examples={code_examples} />
        )}

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'column' }}>
          <Box sx={{  display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%', flexDirection: 'row', gap : 2 }}>
            <InformationButton />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold'}}>For more information please visit:</Typography>
            {/* <Typography sx={{ color: 'blue'}}>{resources[0].url}</Typography> */}
            </Box>
          </Box>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
            <Button 
              variant="contained"
              disabled={currentPage === 1}
              sx={{
                backgroundColor: '#21A0C0',
                color: 'white',
                '&:hover': { backgroundColor: '#1984a0' },
                flexGrow: 1,
                marginRight: 1,
              }}
              onClick={handleBack}
            >
              Back
            </Button>
              
            {currentPage < 3  ? (
              <Button
                variant="contained"
                sx={{ 
                  backgroundColor: '#21A0C0',
                  color: 'white',
                  '&:hover': { backgroundColor: '#1984a0' },
                  flexGrow: 1,
                  marginLeft: 1,
                }}
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#C02132',
                  color: 'white',
                  '&:hover': { backgroundColor: '#9B1828' },
                  flexGrow: 1,
                  marginLeft: 1,
                }}
                onClick={handleClose}
              >
                Close
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResultsModal;