import React from "react";
import { Box, Typography, Card, CardContent, Button, Divider } from "@mui/material";

const ViolationsList = ({ violations }) => {
  return (
    <Box>
      <Typography variant="h4" component="div" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'center' }}>
        Violations List
      </Typography>

      {violations.length === 0 ? (
        <Typography>No violations found.</Typography>
      ) : (
        violations.map((violation, index) => (
          <Card 
            key={index} 
            sx={{
              marginBottom: 2,
              borderRadius: "16px",
              boxShadow: 3,
              padding: 2,
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
            <CardContent 
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexGrow: 1,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {violation.id}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                <strong>Impact:</strong> {violation.impact}
              </Typography>

              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                <strong>Description:</strong> {violation.description}
              </Typography>
            </CardContent>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button 
                variant="contained" 
                sx={{ 
                  backgroundColor: "#21A0C0", 
                  color: "white", 
                  width: "50%",
                  "&:hover": { backgroundColor: "#1984a0" },
                  borderRadius: "8px", 
                }}
                onClick={() => alert(`Fixing violation: ${violation.id}`)}
              >
                Fix This Violation
              </Button>
            </Box>
          </Card>
        ))
      )}

      <Divider sx={{ marginTop: 2 }} />
    </Box>
  );
};

export default ViolationsList;