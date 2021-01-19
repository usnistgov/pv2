import {ReactElement} from "react";

import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

import {ReduxGetSet} from "../Utils";

import "./FormSelect.css";


export interface FormSelectProps {
    // Label to display in the input field.
    label: string;

    // The redux value to get and set to.
    value: ReduxGetSet<string>;

    // The list of options to select from.
    options: string[];

    // Denotes whether this field is required or not.
    required?: boolean;
}

/*
 * FromSelect creates a Select element with the given options and is connected to the given
 * redux object.
 */
export default function FormSelect({label, value, options, required}: FormSelectProps): ReactElement {
    return (
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
                {options.map(option => <MenuItem value={option}>{option}</MenuItem>)}
            </Select>
        </FormControl>
    );
}
