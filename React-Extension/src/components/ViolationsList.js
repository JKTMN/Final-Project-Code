import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button, Divider } from "@mui/material";
import ViolationModal from "./ViolationModal";

/**
 * The ViolationList components displays the list of violations found in the audit.
 * It displays the id, impact, and description of each violation in a list of custom cards.
 * @param {*} Violations - The list of violations received from the audit.
 * @returns The rendered ViolationsList component.
 * 
 * @see https://mui.com/material-ui/react-box/
 * @see https://mui.com/material-ui/react-card/
 * @see https://mui.com/material-ui/react-typography/
 */
const ViolationsList = ({ violations }) => {
  const [open, setOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState(null);

  const handleOpen = (violation) => {
    setSelectedViolation(violation);  
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedViolation(null);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'center', pt: 1 }}>
        Violations List
      </Typography>

      {violations.length === 0 ? (
        <Typography>No violations found!</Typography>
      ) : (
        violations.map((violation, index) => (
          <Card 
            key={index} 
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
                onClick={() => handleOpen(violation)}>
                Fix This Violation
              </Button>
            </Box>
          </Card>
        ))
      )}
      <Divider sx={{ marginTop: 2 }} />
      <ViolationModal open={open} handleClose={handleClose} violation={selectedViolation} />
    </Box>
  );
};

export default ViolationsList;