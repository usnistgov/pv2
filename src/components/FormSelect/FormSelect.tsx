import React, {ReactElement} from "react";

// Library Imports
import {FormControl, InputLabel, MenuItem, Select, Tooltip} from "@material-ui/core";

// User Imports
import {ReduxGetSet} from "../../Utils";

// Stylesheets
import "./FormSelect.sass";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiInformation} from "@mdi/js";

// Stylesheets
import "../Info.sass";

export interface FormSelectProps {
    // Label to display in the input field.
    label: string;

    // The redux value to get and set to.
    value: ReduxGetSet<string>;

    // The list of options to select from.
    options: string[];

    // Denotes whether this field is required or not.
    required?: boolean;

    // Text to display as a tooltip
    tooltip?: string;

    // Information icon text
    info?: string;
}

/*
 * FromSelect creates a Select element with the given options and is connected to the given
 * redux object.
 */
export default function FormSelect({label, value, options, required, tooltip, info}: FormSelectProps): ReactElement {
    const field = (
        <FormControl fullWidth variant={"filled"}>
            <InputLabel id={label}>{label}</InputLabel>
            <Select className={"form-select-left-align"}
                    fullWidth
                    required={required}
                    labelId={label}
                    value={value.get()}
                    id={label}
                    onChange={(event) => {
                        value.set(event.target.value as string)
                    }}>
                {options.map((option, index) => <MenuItem value={option} key={index}>{option}</MenuItem>)}
            </Select>
        </FormControl>
    );

    const withTooltip = tooltip ? <Tooltip title={tooltip}>{field}</Tooltip> : field;

    return (info ?
            <div className={"with-icon"}>
                {withTooltip}
                <Tooltip title={info}>
                    <MdiIcon className={"icon"} path={mdiInformation} size={1.2} color={'#898989'}/>
                </Tooltip>
            </div>
            : withTooltip
    );
}
