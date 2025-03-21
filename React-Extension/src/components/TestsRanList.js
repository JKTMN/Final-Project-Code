import React from "react";
import { Box, Typography, Card, CardContent, CardActions, Button } from "@mui/material";

const testsRanData = [
  {
    id: 1,
    title: "Test 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
  },
  {
    id: 2,
    title: "Test 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
  },
  {
    id: 3,
    title: "Test 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
  },
  {
    id: 4,
    title: "Test 4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
  },
  {
    id: 5,
    title: "Test 5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
  },
];

const TestsRanList = () => {
  return (
    <Box sx={{ padding: 2, height: "100%", overflow: "hidden" }}>
      <Typography variant="h4" sx={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 2 }}>
        Tests Ran
      </Typography>

      <Box
        sx={{
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
        }}
      >
        {testsRanData.length === 0 ? (
          <Typography sx={{ color: "#98989A", fontStyle: "italic" }}>No tests ran!</Typography>
        ) : (
          testsRanData.map((test) => (
            <Card
              key={test.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 2,
                backgroundColor: "#FFFFFF",
                padding: 2,
                borderRadius: 2,
                boxShadow: 1,
                width: "90%",
                maxWidth: 400,
                textAlign: "center",
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

              <CardActions>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#21A0C0",
                    color: "white",
                    "&:hover": { backgroundColor: "#1984a0" },
                  }}
                >
                  View Test
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default TestsRanList;