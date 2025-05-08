// import React, { useState, useEffect } from "react";
// import { Box, FormControl, MenuItem, Select } from "@mui/material";

// /**
//  * This component renders a select dropdown for filtering violations.
//  * It takes an array of filters and a function to set the selected filter.
//  * The selected filter is stored in the component's state and updated when the user selects a new filter.
//  * @param {object} Filters - The filters to be displayed in the select dropdown.
//  * @param {function} setFilter - The function to set the selected filter. 
//  * @param {Int} width - The width of the select dropdown.
//  * @returns The rendered FilterSelect component.
//  * 
//  * @see https://mui.com/material-ui/react-select/
//  */
// const FilterSelect = ({ filters, setFilter, width }) => {
//   const [selectedValue, setSelectedValue] = useState("all");

//   const handleChange = (event) => {
//     const newValue = event.target.value;
//     setSelectedValue(newValue);
//     setFilter(newValue);
//   };

//   return (
//     <Box sx={{ width: {width} }} size="small">
//       <FormControl fullWidth size="small">
//         <Select
//           labelId="filter-violations-select-label"
//           id="filter-violations-select"
//           value={selectedValue}
//           onChange={handleChange}
//           displayEmpty
//         >
//           {filters.map((filter, index) => (
//             <MenuItem key={index} value={filter}>
//               {filter === "all" ? "All" : filter}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default FilterSelect;

import React, { useState } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";

/**
 * A dropdown for selecting a filter from a list of options.
 *
 * @param {Object} props
 * @param {string[]} props.filters - Array of filter options (e.g., 'all', 'minor', 'critical').
 * @param {function} props.setFilter - Callback to update the selected filter.
 * @param {number|string} props.width - CSS width value for the dropdown (e.g., '100%', 200).
 * @returns {JSX.Element} The rendered FilterSelect component.
 */
const FilterSelect = ({ filters, setFilter, width }) => {
  const [selectedValue, setSelectedValue] = useState("all");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    setFilter(newValue);
  };

  return (
    <Box sx={{ width }}>
      <FormControl fullWidth size="small">
        <Select
          id="filter-violations-select"
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Filter Violations" }}
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