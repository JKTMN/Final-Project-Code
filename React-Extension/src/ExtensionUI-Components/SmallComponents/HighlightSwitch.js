import React, { useState } from 'react';
import { Switch, FormControlLabel, FormGroup } from '@mui/material';
import InformationButton from '../SmallComponents/InformationButton';

/**
 * A switch component used for enabling/disabling the highlight of violations within the iframe
 * rendering the webpage.
 * @param {function} setViolationHighlight - A function to set the highlight state of elements.
 * @param {string} selectedValue - The type of element to highlight.
 * @returns The rendered HighlightSwitch component.
 * 
 * @see https://mui.com/material-ui/react-switch/
 * @see https://mui.com/material-ui/api/form-control/
 * @see https://mui.com/material-ui/api/form-group/
 * @see https://mui.com/material-ui/api/form-label/
 */
const HighlightSwitch = ({ setViolationHighlight, selectedValue }) => {
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        setViolationHighlight(event.target.checked);
    };

    return (
        <FormGroup sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 1, pt: 2 }}>
            <FormControlLabel 
            control={<Switch defaultChecked />} 
            label={<span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            Highlight {selectedValue} <InformationButton toolTip={`Find out more about Highlighting ${selectedValue}`}/>
            </span>}
            labelPlacement="start"
            onChange={handleChange}
            />
        </FormGroup>
    );
};

export default HighlightSwitch;