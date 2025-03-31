import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Divider } from "@mui/material";
import ViolationModal from "../SubComponents/ViolationModal";
import { removeHyphen } from "../../functions/utilityFunctions";
import FilterSelect from "../SubComponents/FilterSelect";
import HighlightSwitch from "../SubComponents/HighlightSwitch";

/**
 * The ViolationList component displays the list of violations found in the audit.
 * It displays the id, impact, and description of each violation in a list of custom cards.
 * The user can filter the violations based on their tags.
 * Each card has a button that opens a modal with more details about the violation.
 * 
 * @param {Object} Violations - The violations found in the audit.
 * 
 * @returns {JSX.Element} - The ViolationList component.
 * 
 * @see https://mui.com/material-ui/react-card/
 * @see https://www.dhiwise.com/post/reactjs-filter-array-of-objects-effortless-data-handling
 */
const ViolationsList = ({ violations, setViolationHighlight }) => {
  const [open, setOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [filteredViolations, setFilteredViolations] = useState(violations);
  const [filters, setFilters] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleOpen = (violation) => {
    setSelectedViolation(violation);  
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedViolation(null);
  };

  useEffect(() => {
    const uniqueTags = [...new Set(violations.flatMap(violation => violation.tags))];
    setFilters(uniqueTags);
  }, [violations]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredViolations(violations);
    } else {
      setFilteredViolations(violations.filter(violation => violation.tags.includes(filter)));
    }
  }, [filter, violations]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, textAlign: "center", flexDirection: "column" }}>
        <Typography variant="h3" sx={{ marginBottom: 1, fontWeight: 'bold', textAlign: 'center', pt: 2,}}>
          Violations List
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", gap: 2 }}>
          <FilterSelect filters={["all", ...filters]} setFilter={setFilter} />
          <HighlightSwitch setViolationHighlight={setViolationHighlight}/>
        </Box>
      </Box>

      {filteredViolations.length === 0 ? (
        <Typography variant="h4" sx={{ justifySelf: 'center', mt: 4 }}>No violations found!</Typography>
      ) : (
        filteredViolations.map((violation, index) => (
          <Card 
            key={index} 
            sx={{
              marginBottom: 2,
              borderRadius: "16px",
              boxShadow: 3,
              px: 2,
              pb: 2,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
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
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1, textTransform: "capitalize", textDecoration: "underline" }}>
                {removeHyphen(violation.id)}
              </Typography>

              <Typography variant="body" color="text.secondary" sx={{ marginBottom: 1 }}>
                <strong>Impact:</strong>
                <Typography variant="body" sx={{ color: 
                  violation.impact === "minor" ? "green" :
                  violation.impact === "moderate" ? "orange" :
                  violation.impact === "serious" ? "red" :
                  violation.impact === "critical" ? "darkred" : "black", textTransform: "capitalize"
                }}> {violation.impact}</Typography>
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
                onClick={() => handleOpen(violation)}
              >
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