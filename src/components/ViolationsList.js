import React from "react";
import { Box, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";

const violationsData = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/200/300?random=1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/200/300?random=2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/200/300?random=3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/200/300?random=4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
  },
  {
    id: 5,
    imageUrl: "https://picsum.photos/200/300?random=5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed.",
  },
];

const ViolationsList = () => {
  return (
    <Box sx={{ padding: 2, height: "100%", overflow: "hidden" }}>
      <Typography variant="h2" sx={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 2 }}>
        Violations Found
      </Typography>

      <Box
        sx={{
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
        }}
      >
        {violationsData.length === 0 ? (
          <Typography sx={{ color: "#98989A", fontStyle: "italic" }}>No violations found!</Typography>
        ) : (
          violationsData.map((violation) => (
            <Card
              key={violation.id}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                backgroundColor: "#FFFFFF",
                padding: 1,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <CardMedia
                component="img"
                image={violation.imageUrl}
                alt="Violation"
                sx={{ width: 80, height: 80, borderRadius: 2, objectFit: "cover" }}
              />

              <CardContent sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ color: "#23222F", wordWrap: "break-word", whiteSpace: "normal" }}>
                  {violation.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#21A0C0",
                    color: "white",
                    mt: 2,
                    "&:hover": { backgroundColor: "#1984a0" },
                  }}
                >
                  Take Action
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ViolationsList;