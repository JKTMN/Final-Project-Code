import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button, Divider } from "@mui/material";
import TestsRanModal from "../SubComponents/TestsRanModal";

/**
 * The TestsRanList component displays a list of tests that were ran in the audit.
 * It displays the title and description of each test in a list of custom cards.
 * @param {*} testsRan The list of tests that were ran received from the audit.
 * @returns The rendered TestsRanList component.
 * 
 * @see https://mui.com/material-ui/react-box/
 * @see https://mui.com/material-ui/react-card/
 * @see https://mui.com/material-ui/react-typography/
 */
const TestsRanList = ({ testsRan }) => {
  const [open, setOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const handleOpen = (test) => {
    setSelectedTest(test);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTest(null);
  };

  return (
    <Box>
      <Typography variant="h3" sx={{marginBottom: 2, fontWeight: 'bold', textAlign: 'center'}}>
        Tests Ran
      </Typography>

        {testsRan.length === 0 ? (
          <Typography variant="h4" sx={{justifySelf: 'center', mt: 4}}>No tests ran!</Typography>
        ) : (
          testsRan.map((test) => (
            <Card
              key={test.id}
              sx={{
                marginBottom: 2,
                borderRadius: "16px",
                boxShadow: 3,
                px: 2,
                pb: 2,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 180,
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, color: "#23222F", mb: 0.5, textTransform: 'capitalize' }}>
                  {test.title}
                </Typography>
                <Typography variant="body" >
                  {test.description}
                </Typography>
              </CardContent>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#21A0C0",
                    color: "white",
                    width: '50%',
                    "&:hover": { backgroundColor: "#1984a0" },
                    borderRadius: "8px",
                  }}
                  onClick={() => handleOpen(test)}>
                  View Test
                </Button>
              </Box>
            </Card>
          ))
        )}
      <Divider sx={{ marginTop: 2 }} />
      <TestsRanModal open={open} handleClose={handleClose} test={selectedTest} />
    </Box>
  );
};

export default TestsRanList;