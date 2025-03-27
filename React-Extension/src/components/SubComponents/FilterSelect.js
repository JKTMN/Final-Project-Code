import React, { useState } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";


/**
 * This component renders a select dropdwonn for filtering violations.
 * It takes an array of filters and a function to set the selected filter.
 * The selected filter is stored in the component's state and updated when the user selects a new filter.
 * @param {object} Filters - The filters to be displayed in the select dropdown.
 * @param {function} setFilter - The function to set the selected filter. 
 * @returns The rendered FilterSelect component.
 * 
 * @see https://mui.com/material-ui/react-select/
 */
const FilterSelect = ({ filters, setFilter }) => {
  const [selectedValue, setSelectedValue] = useState("all");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    setFilter(newValue);
  };

  return (
    <Box sx={{ width: 150 }} size="small">
      <FormControl fullWidth>
        <Select
          labelId="filter-violations-select-label"
          id="filter-violations-select"
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
        >
          {filters.map((filter, index) => (
            <MenuItem key={index} value={filter}>
              {filter === "all" ? "All" : filter}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterSelect;