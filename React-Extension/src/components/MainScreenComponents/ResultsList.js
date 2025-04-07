import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Divider } from "@mui/material";
import ResultsModal from "../SubComponents/ResultsModal";
import { removeHyphen } from "../../functions/utilityFunctions";
import FilterSelect from "../SubComponents/FilterSelect";
import HighlightSwitch from "../SubComponents/HighlightSwitch";

/**
 * The ResultsList component displays the list different lists of violations, passes etc found in the audit.
 * It displays the id, impact, and description of each results in a list of custom cards.
 * The user can filter the results based on their tags.
 * Each card has a button that opens a modal with more details about the results.
 * 
 * @param {Object} listData - The Results found in the audit.
 * @param {String} selectedValue - The selected value for the result type.
 * 
 * @returns {JSX.Element} - The ResultsList component.
 * 
 * @see https://mui.com/material-ui/react-card/
 * @see https://www.dhiwise.com/post/reactjs-filter-array-of-objects-effortless-data-handling
 */
const ResultsList = ({ listData, setViolationHighlight, selectedValue }) => {
  const [open, setOpen] = useState(false);
  const [selectedListItem, setSelectedListItem] = useState(null);
  const [filteredList, setFilteredList] = useState(listData);
  const [filters, setFilters] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleOpen = (listItem) => {
    setSelectedListItem(listItem);  
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedListItem(null);
  };

  useEffect(() => {
    const uniqueTags = [...new Set(listData.flatMap(listItem => listItem.tags))];
    setFilters(uniqueTags);
  }, [listData]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredList(listData);
    } else {
      setFilteredList(listData.filter(listItem => listItem.tags.includes(filter)));
    }
  }, [filter, listData, selectedValue]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "center", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", gap: 2 }}>
          <FilterSelect filters={["all", ...filters]} setFilter={setFilter} width={135}/>
          <HighlightSwitch setViolationHighlight={setViolationHighlight} selectedValue={selectedValue}/>
        </Box>
      </Box>

      {filteredList.length === 0 ? (
      <Typography variant="h4" sx={{ justifySelf: 'center', mt: 1 }}>
        No {selectedValue} found!
      </Typography>
    ) : (
      <>
        <Typography variant="h4" sx={{ justifySelf: 'center', mt: 2, mb: 2 }}>
          <strong>{filteredList.length}</strong> {selectedValue} found!
        </Typography>
        
        {filteredList.map((listItem, index) => (
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
                {removeHyphen(listItem.id)}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                <strong>Impact:</strong>
                <Typography variant="body1" sx={{ color: 
                  listItem.impact === "N/A" ? "green" :
                  listItem.impact === "minor" ? "green" :
                  listItem.impact === "moderate" ? "orange" :
                  listItem.impact === "serious" ? "red" :
                  listItem.impact === "critical" ? "darkred" : "black", textTransform: "capitalize"
                }}> {listItem.impact}</Typography>
              </Typography>

              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                <strong>Description:</strong> {listItem.description}
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
                onClick={() => handleOpen(listItem)}
              >
                View More Details
              </Button>
            </Box>
          </Card>
        ))}
      </>
    )}
      <Divider sx={{ marginTop: 2 }} />
      <ResultsModal open={open} handleClose={handleClose} listItem={selectedListItem} />
    </Box>
  );
};

export default ResultsList;