import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Divider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { removeHyphen } from "../../functions/utilityFunctions";

/**
 * ResultsList Component
 * 
 * A component that displays a list of results in a card format.
 * It filters the list based on the provided filter and displays the results in a horizontal scrollable view.
 * 
 * @param {String} title - The title of the results list.
 * @param {Array} listData - The data to be displayed in the results list.
 * @param {String} chosenList - The currently selected list.
 * @param {String} filter - The filter to be applied to the list data.
 *  
 * @returns The rendered ResultsList component.
 */
const ResultsList = ({ title, listData, chosenList, filter }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filteredList, setFilteredList] = useState(listData);

  useEffect(() => {
    if (filter === "all" || !filter) {
      setFilteredList(listData);
    } else {
      setFilteredList(listData.filter(listItem => listItem.tags.includes(filter)));
    }
  }, [filter, listData, chosenList]);

  const getCardStyles = () => ({
    minWidth: isMobile ? 220 : 280,
    maxWidth: 320,
    height: isMobile ? 240 : 280,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    p: 2,
    transition: theme.transitions.create('transform'),
    "&:hover": { 
      transform: "scale(1.03)",
      boxShadow: theme.shadows[4],
    },
    flexShrink: 0
  });

  return (
    <Box sx={{ 
      p: isMobile ? 1 : 2,
      width: '100%',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
    }}>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        sx={{ 
          textAlign: "center", 
          mb: 2,
          color: theme.palette.text.primary,
          fontWeight: 600
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: isMobile ? 2 : 3,
          py: "10px",
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { 
            display: 'none'
          },
          '&:hover': {
            '&::-webkit-scrollbar': {
              display: 'block',
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.primary.main,
              borderRadius: '3px',
            },
          },
          justifyContent: filteredList.length === 0 ? "center" : "flex-start",
          alignItems: "center",
        }}
      >
        {filteredList.length === 0 ? (
          <Typography 
            variant="h6" 
            sx={{ color: theme.palette.text.secondary, textAlign: "center", p: 3 }}
          >
            No results found for {title}.
          </Typography>
        ) : (
          filteredList.map((item) => (
            <Card key={item.id} sx={getCardStyles()}>
              <CardContent sx={{ p: 1 }}>
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"} 
                  sx={{ 
                    fontWeight: 600, 
                    textAlign: "center",
                    mb: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap", 
                  }}
                >
                  {removeHyphen(item.id)}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                  <strong>Impact:</strong>
                  <Typography variant="body1" sx={{ 
                    color: 
                      item.impact === "N/A" || item.impact === "minor" ? "green" :
                      item.impact === "moderate" ? "orange" :
                      item.impact === "serious" ? "red" :
                      item.impact === "critical" ? "darkred" : "black", 
                    textTransform: "capitalize",
                    display: "inline",
                    ml: 0.5
                  }}>
                    {item.impact}
                  </Typography>
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    textAlign: "center",
                    fontSize: isMobile ? '0.8rem' : '0.95rem',
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                    width: "80%",
                    "&:hover": { 
                      backgroundColor: theme.palette.primary.dark 
                    },
                    borderRadius: theme.shape.borderRadius,
                    py: isMobile ? 0.5 : 1,
                  }}
                >
                  View More
                </Button>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ResultsList;