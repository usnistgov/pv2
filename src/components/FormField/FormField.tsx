import React, {ReactElement, useState} from "react";

// Library Imports
import {InputAdornment, TextField, Tooltip} from "@material-ui/core";
import {InputProps as StandardInputProps} from "@material-ui/core/Input/Input";
import {mdiInformation} from "@mdi/js";
import {Icon as MdiIcon} from "@mdi/react";

// User Imports
import {ReduxGetSet} from "../../Utils";

// Stylesheets
import "../Info.sass";

export interface FormFieldProps<T> {
    // Label to display in TextField.
    label: string;

    // Yup schema to validate input against.
    schema: any;

    // The redux value to get and set.
    value: ReduxGetSet<T>;

    // Displays required asterisk if true.
    required?: boolean;

    // The type for the input field. Default is text.
    type?: string;

    // Text to display at the beginning of the input field.
    startAdornment?: string;

    // Text ot display at the end of the input field.
    endAdornment?: string;

    // Text to display in tooltip
    tooltip?: string;

    // Information icon text
    info?: string;
}

/*
 * FormField is a convenience wrapper around the Material-UI TextField. It handles
 * input validation and errors dynamically as the user types, and assigns input
 * directly to the provided redux store object if valid.
 */
export default function FormField<T>(props: FormFieldProps<T>): ReactElement {
    // Error state
    const [hasError, setHasError] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    /*
     * Returns the start or end adornments based on the props.
     */
    function getInputProps(): StandardInputProps {
        let inputProps: StandardInputProps = {};

        if (props.startAdornment !== undefined) {
            inputProps['startAdornment'] = <InputAdornment position={"start"}>{props.startAdornment}</InputAdornment>
        }
        if (props.endAdornment !== undefined) {
            inputProps['endAdornment'] = <InputAdornment position={"end"}>{props.endAdornment}</InputAdornment>
        }

        return inputProps;
    }

    const field = (
        <TextField fullWidth
                   type={props.type}
                   required={props.required}
                   error={hasError}
                   helperText={errorMessages}
                   label={props.label}
                   defaultValue={props.value.get()}
                   variant={"filled"}
                   onChange={(event) => {
                       props.schema.validate(event.target.value)
                           .finally(() => {
                               props.value.set(props.schema.cast(event.target.value));
                               setHasError(false);
                               setErrorMessages([]);
                           })
                           .catch((schemaError: { errors: any; }) => {
                               setHasError(true);
                               setErrorMessages(schemaError.errors);
                           });
                   }}
                   InputProps={getInputProps()}
        />
    );

    const withTooltip = props.tooltip ? <Tooltip title={props.tooltip}>{field}</Tooltip> : field;

    return (props.info ?
            <div className={"with-icon"}>
                {withTooltip}
                <Tooltip title={props.info}>
                    <MdiIcon className={"icon"} path={mdiInformation} size={1.2} color={'#898989'}/>
                </Tooltip>
            </div>
            : withTooltip
    );
}
