import React, { useState } from 'react';
import { Switch, FormControlLabel, FormGroup } from '@mui/material';
import InformationButton from '../small components/InformationButton';


/**
 * A switch component used for enabling/disabling the highlight of violations within the iframe
 * rendering the webpage.
 * @param {function} setViolationHighlight - A function to set the highlight state of violations.
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
            Highlight {selectedValue} <InformationButton item={`Highlighting ${selectedValue}`}/>
            </span>}
            labelPlacement="top"
            onChange={handleChange}
            />
        </FormGroup>
    );
};

export default HighlightSwitch;