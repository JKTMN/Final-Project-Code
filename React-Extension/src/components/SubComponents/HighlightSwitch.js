import React, { useState } from 'react';
import { Switch, FormControlLabel, FormGroup } from '@mui/material';


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
const HighlightSwitch = ({ setViolationHighlight }) => {
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        setViolationHighlight(event.target.checked);
    };

    return (
        <FormGroup sx={{ display: 'flex', alignItems: 'center', ml: 2, flexDirection: 'column', gap: 1 }}>
            <FormControlLabel 
            control={<Switch defaultChecked />} label="Highlight Violations"
            labelPlacement="top"
            onChange={handleChange}
            />
        </FormGroup>
    );
};

export default HighlightSwitch;