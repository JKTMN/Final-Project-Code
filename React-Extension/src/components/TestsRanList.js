import React from "react";
import { Box, Typography, Card, CardContent, Button, Divider } from "@mui/material";

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
  return (
    <Box>
      <Typography variant="h4" sx={{marginBottom: 2, fontWeight: 'bold', textAlign: 'center'}}>
        Tests Ran
      </Typography>

        {testsRan.length === 0 ? (
          <Typography>No tests ran!</Typography>
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
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#23222F" }}>
                  {test.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#98989A" }}>
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
                >
                  View Test
                </Button>
              </Box>
            </Card>
          ))
        )}
      <Divider sx={{ marginTop: 2 }} />
    </Box>
  );
};

export default TestsRanList;