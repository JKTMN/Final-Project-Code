import React, { useState, useEffect } from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import ResultsList from "../MainScreenComponents/ResultsList";
import TestsRanList from "../MainScreenComponents/TestsRanList";
import CenterSection from "../MainScreenComponents/CenterSection";
import InformationButton from "../small components/InformationButton";
import PageSelect from "../small components/PageSelect";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * This is the MainContent component that displays the main content of the app.
 * It contains the ViolationsList, CenterSection, and TestsRanList components.
 * @param {*} violations The list of violations found.
 * @param {*} testsRan The list of tests ran. 
 * @param {*} URL The URL of the audited page. 
 * 
 * @returns The rendered MainContent component.
 * @see https://mui.com/material-ui/customization/how-to-customize/
 */
const Page1Report = ({ passes, violations, incomplete, inapplicable, testsRan, loading, error, url }) => {
  const [componentHightlight, setComponentHighlight] = useState(false);
  const [renderedUrl, setRenderedUrl] = useState(url);
  const [listData, setListData] = useState(violations);

  useEffect(() => {
    if (componentHightlight) {
      alert("Highlighting components is enabled. Click on the component list item to see more details.");
    }
  }, [componentHightlight]);

  const listOptions = [
    {label: "Passes", value: "passes"},
    {label: "Violations", value: "violations"},
    {label: "Incomplete", value: "incomplete"},
    {label: "Inapplicable", value: "inapplicable"},
    ];
  const [selectedValue, setSelectedValue] = useState(listOptions[1].value);

  const handleListChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (selectedValue === "passes") {
      setListData([...passes]);
    }
    else if (selectedValue === "incomplete") {
      setListData([...incomplete]);
    } else if (selectedValue === "inapplicable") {
      setListData([...inapplicable]);
    }
    else {
      setListData([...violations]);
    }
  }, [selectedValue, passes, violations, incomplete, inapplicable]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "calc(100vh - 115px)", overflow: "hidden" }}>
      <Box sx={{ width: "30%", px: 3, pt: 1.5, maxHeight: "100%", overflowY: "auto", direction: "rtl", "& > *": {direction: "ltr"} }}>
        <Box sx={{display: "flex", justifyContent: "center", pt: 1}}>
          <Select
            value={selectedValue}
            onChange={handleListChange}
            displayEmpty
            IconComponent={(props) => <ExpandMoreIcon {...props} sx={{ fontSize: 26, marginLeft: 1, position: "relative" }} />}
            sx={{ width: 160, 
              height: 40,
              textAlign: "center",
              bgcolor: "transparent" }}
              renderValue={(selected) => {
                const selectedOption = listOptions.find(option => option.value === selected);
                return (
                  <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center', py: 2}}>
                    {selectedOption?.label}
                  </Typography>
                );
              }}
            >
              {listOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                  </MenuItem>
              ))}
            </Select>
          </Box>
         <ResultsList listData={listData} setComponentHighlight={setComponentHighlight} selectedValue={selectedValue} />
      </Box>

      <Box sx={{ width: '1px', height: '100%', bgcolor: 'divider', mx: 0.5 }} />

      <Box sx={{ width: "50%", px: 3, pt: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, textAlign: "center", flexDirection: "row", gap: 2 }}>
          <Typography variant="h3" sx={{ marginBottom: 1, fontWeight: 'bold', textAlign: 'center', pt: 2,}}>
            Choose which page to display:
          </Typography>
          <PageSelect pages={[]} setRenderedUrl={setRenderedUrl}/> {/*Once all pages are audited pass array or urls here, pass setPage state*/}
          </Box>
        <CenterSection url={url}/>
      </Box>
      
      <Box sx={{ width: '1px', height: '100%', bgcolor: 'divider', mx: 0.5 }} />

      <Box sx={{ width: "30%", px: 3, pt: 1.5, maxHeight: "100%", overflowY: "auto" }}>
        <TestsRanList testsRan={testsRan} />
      </Box>
    </Box>
  );
};

export default Page1Report;