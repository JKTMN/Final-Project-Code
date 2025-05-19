import React, { useState, useEffect, useRef } from "react";
import { Modal, Box, Typography, Button, Divider, useTheme, useMediaQuery } from "@mui/material";
import ResultsModalScreen1 from '../ModalScreens/ResultsModalScreen1';
import ResultsModalScreen2 from '../ModalScreens/ResultsModalScreen2';
import ResultsModalScreen3 from '../ModalScreens/ResultsModalScreen3';
import { filterFrameworkContent } from '../../functions/filterFrameworkContent';
import { removeHyphen } from '../../functions/utilityFunctions';
import InformationButton from '../SmallComponents/InformationButton';

const ResultsModal = ({ open, handleClose, listItem }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const contentRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [frameworkContent, setFrameworkContent] = useState(null);

  const { issue_explanation, impact, technical_analysis, best_practices, fixes, code_examples, resources } = frameworkContent || {};

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handleBack = () => setCurrentPage((prev) => prev - 1);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.focus({ preventScroll: true });
    }
  }, [currentPage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentPage < 3) handleNext();
      if (e.key === 'ArrowLeft' && currentPage > 1) handleBack();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  useEffect(() => {
    if (!open) {
      setCurrentPage(1);
    }
  }, [open]);

  useEffect(() => {
    if (listItem) {
      const fetchedContent = filterFrameworkContent(listItem.id);
      setFrameworkContent(fetchedContent);
    }
  }, [listItem]);

  return (
    <Modal
      role="dialog"
      aria-modal="true"
      aria-labelledby="results-modal-title"
      aria-describedby={`results-modal-page-${currentPage}-content`}
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '90%' : isTablet ? '70%' : '50%',
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: theme.palette.background.paper,
          border: `2px solid ${theme.palette.primary.main}`,
          boxShadow: 24,
          borderRadius: 4,
          p: isMobile ? 2 : 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          aria-live="polite"
          sx={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            margin: '-1px',
            padding: 0,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            border: 0
          }}
        >
          {`Page ${currentPage} of 3: ${
            currentPage === 1 ? 'Issue Details' : 
            currentPage === 2 ? 'Technical Analysis' : 
            'Fixes and Examples'
          }`}
        </Box>

        <Typography 
          id="results-modal-title"
          variant={isMobile ? "h5" : "h4"} 
          component="h2"
          sx={{ 
            textAlign: "center", 
            fontWeight: 700, 
            color: theme.palette.text.primary,
            textTransform: "capitalize"
          }}
        >
          {listItem ? removeHyphen(listItem.id) : ''}
        </Typography>

        <Divider />

        <Box 
          tabIndex={-1}
          ref={contentRef}
          aria-live="polite"
          sx={{ outline: 'none' }}
        >
          {currentPage === 1 && (
            <ResultsModalScreen1 
              page={currentPage}
              listItem={listItem}
              issue_explanation={issue_explanation}
              impact={impact}
            />
          )}
          {currentPage === 2 && (
            <ResultsModalScreen2 
              page={currentPage}
              technical_analysis={technical_analysis}
              best_practices={best_practices}
            />
          )}
          {currentPage === 3 && (
            <ResultsModalScreen3 
              page={currentPage}
              listItem={listItem}
              fixes={fixes}
              code_examples={code_examples}
            />
          )}
        </Box>

        <Divider />
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <InformationButton toolTip="Click the link below to find out more!" />
          
          {resources && resources.length > 0 && (
            <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
              For more information please visit: {" "}
              <a 
                href={resources[currentPage - 1]?.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: 'underline',
                }}
              >
                {resources[currentPage - 1]?.url}
              </a>
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, gap: 2 }}>
          <Button
            variant="contained"
            disabled={currentPage === 1}
            aria-label={`Previous page (${currentPage - 1} of 3)`}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
              flexGrow: 1,
            }}
            onClick={handleBack}
          >
            Back
          </Button>

          {currentPage < 3 ? (
            <Button
              variant="contained"
              aria-label={`Next page (${currentPage + 1} of 3)`}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': { backgroundColor: theme.palette.primary.dark },
                flexGrow: 1,
              }}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              aria-label="Close modal"
              sx={{
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                '&:hover': { backgroundColor: theme.palette.error.dark },
                flexGrow: 1,
              }}
              onClick={handleClose}
            >
              Close
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ResultsModal;