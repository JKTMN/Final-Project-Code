import React, { useState } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";

/**
 * PageSelect component allows the user to select a page from a dropdown menu.
 * It updates the selected page and calls the setRenderedUrl function to update the displayed page.
 * 
 * @param {object} Filters - The filters to be displayed in the select dropdown.
 * @param {function} setFilter - The function to set the selected filter. 
 * @returns The rendered FilterSelect component.
 * 
 * @see https://mui.com/material-ui/react-select/
 */
const PageSelect = ({ pages, setRenderedUrl }) => {
  const [selectedValue, setSelectedValue] = useState("Home");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    setRenderedUrl(newValue);
  };

  return (
    <Box sx={{ width: 100, pt: 1}} size="small">
      <FormControl fullWidth size="small" >
        <Select
          labelId="displayed-page-select-label"
          id="display-page-select"
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
        >
          {pages.map((page, index) => (
            <MenuItem key={index} value={page}>
              {page === "all" ? "All" : page}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PageSelect;